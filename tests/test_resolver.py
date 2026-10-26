"""Tests for resolving the active segment."""

from __future__ import annotations

from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from homeassistant.util import dt as dt_util
import pytest

from custom_components.smart_heating_schedule.const import WEEKDAYS
from custom_components.smart_heating_schedule.models import (
    Block,
    WeekSchedule,
    default_week,
)
from custom_components.smart_heating_schedule.resolver import segment_at

TZ = ZoneInfo("Europe/Amsterdam")


@pytest.fixture(autouse=True)
def amsterdam() -> None:
    """Resolve in a time zone with DST."""
    original = dt_util.get_default_time_zone()
    dt_util.set_default_time_zone(TZ)
    yield
    dt_util.set_default_time_zone(original)


def every_day(blocks: list[Block]) -> WeekSchedule:
    return WeekSchedule(days={day: list(blocks) for day in WEEKDAYS})


def at(*args: int) -> datetime:
    return datetime(*args, tzinfo=TZ)


def test_middle_of_block() -> None:
    week = default_week("home", "°C")  # 00:00 18, 07:00 20, 22:00 18 every day
    segment = segment_at(week, at(2026, 10, 26, 12, 0))
    assert segment.start == at(2026, 10, 26, 7, 0)
    assert segment.end == at(2026, 10, 26, 22, 0)
    assert segment.temperature == 20
    assert segment.next_temperature == 18


def test_merges_across_midnight() -> None:
    week = default_week("home", "°C")
    segment = segment_at(week, at(2026, 10, 27, 1, 0))
    # 22:00 18° continues into 00:00-07:00 18° of the next day.
    assert segment.start == at(2026, 10, 26, 22, 0)
    assert segment.end == at(2026, 10, 27, 7, 0)
    assert segment_at(week, at(2026, 10, 26, 23, 0)).key == segment.key


def test_boundary_is_inclusive_start() -> None:
    week = default_week("home", "°C")
    assert segment_at(week, at(2026, 10, 26, 7, 0)).temperature == 20
    assert segment_at(week, at(2026, 10, 26, 6, 59)).temperature == 18


def test_constant_week() -> None:
    segment = segment_at(default_week("away", "°C"), at(2026, 10, 26, 12, 0))
    assert segment.start is None
    assert segment.end is None
    assert segment.temperature == 16


def test_change_once_a_week() -> None:
    week = every_day([Block(0, 18)])
    week.days["mon"] = [Block(0, 18), Block(600, None)]
    # Thursday: the segment started after Monday's off block and lasts until next Monday.
    segment = segment_at(week, at(2026, 10, 29, 12, 0))  # Thursday
    assert segment.start == at(2026, 10, 27, 0, 0)
    assert segment.end == at(2026, 11, 2, 10, 0)
    assert segment.next_temperature is None


def test_each_day_has_its_own_blocks() -> None:
    week = default_week("home", "°C")
    week.days["sat"] = [Block(0, 21)]
    assert segment_at(week, at(2026, 10, 31, 3, 0)).temperature == 21  # Saturday
    assert segment_at(week, at(2026, 10, 30, 23, 0)).end == at(2026, 10, 31, 0, 0)


def test_dst_fall_back() -> None:
    week = every_day([Block(0, 18), Block(150, 20), Block(240, 18)])
    # 25 October 2026: clocks go back at 03:00 CEST to 02:00 CET.
    segment = segment_at(week, at(2026, 10, 25, 3, 30))
    assert segment.temperature == 20
    assert segment.end == at(2026, 10, 25, 4, 0)
    # The repeated hour (second 02:15) is after the first 02:30 boundary.
    repeated = segment_at(week, datetime(2026, 10, 25, 2, 15, fold=1, tzinfo=TZ))
    assert repeated.temperature == 20
    assert segment.end.timestamp() - repeated.start.timestamp() == 2.5 * 3600


def test_dst_spring_forward() -> None:
    week = every_day([Block(0, 18), Block(150, 20), Block(240, 18)])
    # 29 March 2026: 02:00-03:00 does not exist. The 02:30 boundary must still
    # come before the 04:00 one and segments must be in order.
    before = segment_at(week, at(2026, 3, 29, 1, 0))
    assert before.end is not None
    assert before.end < at(2026, 3, 29, 4, 0)
    later = segment_at(week, before.end + timedelta(minutes=1))
    assert later.temperature == 20
    assert later.end == at(2026, 3, 29, 4, 0)
