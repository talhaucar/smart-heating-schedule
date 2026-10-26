"""Schedule data model and validation.

A day is a list of back-to-back blocks covering 00:00-24:00: the first block
starts at 00:00, every block ends where the next one starts and the last one
ends at midnight. A block temperature of ``None`` means heating off.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from itertools import pairwise
import math
from typing import Any

from homeassistant.const import UnitOfTemperature
from homeassistant.util.unit_conversion import TemperatureConverter
import voluptuous as vol

from .const import (
    MINUTES_PER_DAY,
    PROFILE_AWAY,
    PROFILE_HOME,
    SLOT_MINUTES,
    WEEKDAYS,
)

# Sanity bounds; device specific limits are applied when a block is sent.
MIN_TEMPERATURE = -50.0
MAX_TEMPERATURE = 150.0

# (start minute, temperature in °C) for the default schedules.
_DEFAULT_HOME_C = [(0, 18.0), (7 * 60, 20.0), (22 * 60, 18.0)]
_DEFAULT_AWAY_C = [(0, 16.0)]
_DEFAULT_HOME_F = [(0, 64.0), (7 * 60, 68.0), (22 * 60, 64.0)]
_DEFAULT_AWAY_F = [(0, 61.0)]


@dataclass(slots=True, frozen=True)
class Block:
    """A time block. ``start`` is in minutes since midnight."""

    start: int
    temperature: float | None

    def as_dict(self) -> dict[str, Any]:
        """Return the JSON representation."""
        return {"start": format_minutes(self.start), "temperature": self.temperature}


@dataclass(slots=True)
class WeekSchedule:
    """A weekly schedule: the blocks of each day, keyed ``mon`` to ``sun``."""

    days: dict[str, list[Block]]

    def blocks_for_weekday(self, weekday: int) -> list[Block]:
        """Return the blocks for a weekday (0 = Monday)."""
        return self.days[WEEKDAYS[weekday]]

    def as_dict(self) -> dict[str, Any]:
        """Return the JSON representation."""
        return {
            "days": {
                day: [block.as_dict() for block in blocks] for day, blocks in self.days.items()
            }
        }


@dataclass(slots=True)
class RoomSchedule:
    """The schedule of one climate entity."""

    entity_id: str
    enabled: bool
    home: WeekSchedule
    away: WeekSchedule = field(repr=False)

    def week(self, profile: str) -> WeekSchedule:
        """Return the week schedule for a profile."""
        return self.away if profile == PROFILE_AWAY else self.home

    def as_dict(self) -> dict[str, Any]:
        """Return the JSON representation."""
        return {
            "entity_id": self.entity_id,
            "enabled": self.enabled,
            PROFILE_HOME: self.home.as_dict(),
            PROFILE_AWAY: self.away.as_dict(),
        }


def parse_time(value: str) -> int:
    """Parse ``HH:MM`` into minutes since midnight."""
    hours, minutes = value.split(":")
    return int(hours) * 60 + int(minutes)


def format_minutes(minutes: int) -> str:
    """Format minutes since midnight as ``HH:MM``."""
    return f"{minutes // 60:02d}:{minutes % 60:02d}"


def _validate_time(value: Any) -> str:
    if not isinstance(value, str):
        raise vol.Invalid("time must be a string in HH:MM format")
    try:
        minutes = parse_time(value)
    except ValueError as err:
        raise vol.Invalid(f"invalid time: {value}") from err
    if not 0 <= minutes < MINUTES_PER_DAY or len(value) != 5:
        raise vol.Invalid(f"invalid time: {value}")
    if minutes % SLOT_MINUTES:
        raise vol.Invalid(f"time must be on a {SLOT_MINUTES} minute boundary: {value}")
    return value


def _validate_temperature(value: Any) -> float | None:
    if value is None:
        return None
    if isinstance(value, bool):
        raise vol.Invalid("temperature must be a number or null")
    try:
        temperature = float(value)
    except (TypeError, ValueError) as err:
        raise vol.Invalid("temperature must be a number or null") from err
    if not math.isfinite(temperature) or not (MIN_TEMPERATURE <= temperature <= MAX_TEMPERATURE):
        raise vol.Invalid(f"temperature out of range: {value}")
    return round(temperature, 2)


def _validate_day(blocks: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if not blocks:
        raise vol.Invalid("a day needs at least one time block")
    starts = [parse_time(block["start"]) for block in blocks]
    if starts[0] != 0:
        raise vol.Invalid("the first time block must start at 00:00")
    for previous, current in pairwise(starts):
        if current - previous < SLOT_MINUTES:
            raise vol.Invalid(
                f"time blocks must be in order and at least {SLOT_MINUTES} minutes long"
            )
    return blocks


BLOCK_SCHEMA = vol.Schema(
    {
        vol.Required("start"): _validate_time,
        vol.Required("temperature"): _validate_temperature,
    }
)
DAY_SCHEMA = vol.All([BLOCK_SCHEMA], _validate_day)
WEEK_SCHEMA = vol.Schema(
    {vol.Required("days"): vol.Schema({vol.Required(day): DAY_SCHEMA for day in WEEKDAYS})}
)


def day_from_dict(blocks: list[dict[str, Any]]) -> list[Block]:
    """Build blocks from validated JSON."""
    return [Block(parse_time(block["start"]), block["temperature"]) for block in blocks]


def week_from_dict(data: dict[str, Any]) -> WeekSchedule:
    """Validate and build a week schedule from JSON."""
    data = WEEK_SCHEMA(data)
    return WeekSchedule(days={day: day_from_dict(data["days"][day]) for day in WEEKDAYS})


def room_from_dict(data: dict[str, Any]) -> RoomSchedule:
    """Validate and build a room schedule from JSON."""
    return RoomSchedule(
        entity_id=data["entity_id"],
        enabled=bool(data.get("enabled", True)),
        home=week_from_dict(data[PROFILE_HOME]),
        away=week_from_dict(data[PROFILE_AWAY]),
    )


def default_week(profile: str, unit: str) -> WeekSchedule:
    """Return the default week schedule for a profile in a unit."""
    fahrenheit = unit == UnitOfTemperature.FAHRENHEIT
    if profile == PROFILE_AWAY:
        template = _DEFAULT_AWAY_F if fahrenheit else _DEFAULT_AWAY_C
    else:
        template = _DEFAULT_HOME_F if fahrenheit else _DEFAULT_HOME_C
    return WeekSchedule(
        days={
            day: [Block(start, temperature) for start, temperature in template] for day in WEEKDAYS
        }
    )


def default_room(entity_id: str, unit: str) -> RoomSchedule:
    """Return a new room schedule with default blocks."""
    return RoomSchedule(
        entity_id=entity_id,
        enabled=True,
        home=default_week(PROFILE_HOME, unit),
        away=default_week(PROFILE_AWAY, unit),
    )


def convert_week(week: WeekSchedule, from_unit: str, to_unit: str) -> WeekSchedule:
    """Convert all temperatures of a week to another unit.

    Values are rounded to 0.5 °C or 1 °F, the usual thermostat steps.
    """
    step = 1.0 if to_unit == UnitOfTemperature.FAHRENHEIT else 0.5

    def convert(value: float | None) -> float | None:
        if value is None:
            return None
        converted = TemperatureConverter.convert(value, from_unit, to_unit)
        return round(round(converted / step) * step, 2)

    return WeekSchedule(
        days={
            day: [Block(block.start, convert(block.temperature)) for block in blocks]
            for day, blocks in week.days.items()
        }
    )
