"""Tests for the schedule model."""

from __future__ import annotations

import pytest
import voluptuous as vol

from custom_components.smart_heating_schedule.models import (
    DAY_SCHEMA,
    Block,
    convert_week,
    default_room,
    room_from_dict,
    week_from_dict,
)


def day(*blocks: tuple[str, float | None]) -> list[dict]:
    return [{"start": start, "temperature": temperature} for start, temperature in blocks]


def test_valid_day() -> None:
    assert DAY_SCHEMA(day(("00:00", 18), ("07:15", 20.5), ("23:45", None)))


@pytest.mark.parametrize(
    "blocks",
    [
        [],
        day(("00:15", 18)),
        day(("00:00", 18), ("07:00", 20), ("06:00", 18)),
        day(("00:00", 18), ("07:00", 20), ("07:00", 18)),
        day(("00:00", 18), ("07:10", 20)),
        day(("00:00", 18), ("24:00", 20)),
        day(("00:00", 18), ("7:00", 20)),
        day(("00:00", "warm")),
        day(("00:00", True)),
        day(("00:00", 500)),
        day(("00:00", float("nan"))),
    ],
)
def test_invalid_day(blocks: list[dict]) -> None:
    with pytest.raises(vol.Invalid):
        DAY_SCHEMA(blocks)


def test_round_trip() -> None:
    room = default_room("climate.a", "°C")
    data = room.as_dict()
    assert data["home"]["days"]["sun"][1] == {
        "start": "07:00",
        "temperature": 20.0,
    }
    assert room_from_dict(data) == room


def test_week_requires_all_days() -> None:
    data = default_room("climate.a", "°C").home.as_dict()
    del data["days"]["wed"]
    with pytest.raises(vol.Invalid):
        week_from_dict(data)


def test_defaults_per_unit() -> None:
    celsius = default_room("climate.a", "°C").home.blocks_for_weekday(0)
    fahrenheit = default_room("climate.a", "°F").home.blocks_for_weekday(0)
    assert [b.temperature for b in celsius] == [18, 20, 18]
    assert [b.temperature for b in fahrenheit] == [64, 68, 64]
    assert default_room("climate.a", "°F").away.blocks_for_weekday(0) == [Block(0, 61)]


def test_convert_week() -> None:
    week = default_room("climate.a", "°C").home
    converted = convert_week(week, "°C", "°F")
    assert [b.temperature for b in converted.blocks_for_weekday(0)] == [64, 68, 64]
    back = convert_week(converted, "°F", "°C")
    assert [b.temperature for b in back.blocks_for_weekday(0)] == [18, 20, 18]
    data = week.as_dict()
    data["days"]["mon"] = day(("00:00", None))
    assert convert_week(week_from_dict(data), "°C", "°F").blocks_for_weekday(0) == [Block(0, None)]
