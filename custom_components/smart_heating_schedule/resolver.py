"""Resolve which temperature a week schedule wants at a point in time."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, time, timedelta

from homeassistant.util import dt as dt_util

from .models import WeekSchedule

# A weekly schedule repeats every 7 days, so looking 8 days back and ahead
# always finds the real start and end of the current segment.
_WINDOW_DAYS = 8


@dataclass(slots=True, frozen=True)
class Segment:
    """A stretch of time with one target temperature.

    Back-to-back blocks with the same temperature are merged, also across
    midnight, so a segment only ends when the temperature really changes.
    ``start`` and ``end`` are ``None`` when the whole week has one temperature.
    """

    start: datetime | None
    end: datetime | None
    temperature: float | None
    next_temperature: float | None

    @property
    def key(self) -> str:
        """Return a stable identifier for this segment."""
        start = self.start.isoformat() if self.start else "always"
        return f"{start}|{self.temperature}"


def _local_datetime(day: date, minutes: int) -> datetime:
    return datetime.combine(
        day,
        time(minutes // 60, minutes % 60),
        tzinfo=dt_util.get_default_time_zone(),
    )


def _boundaries(week: WeekSchedule, first: date, days: int) -> list[tuple[datetime, float | None]]:
    """Return (start, temperature) of every block in a range, merged on equal temperature."""
    merged: list[tuple[datetime, float | None]] = []
    for offset in range(days):
        day = first + timedelta(days=offset)
        for block in week.blocks_for_weekday(day.weekday()):
            if merged and merged[-1][1] == block.temperature:
                continue
            merged.append((_local_datetime(day, block.start), block.temperature))
    return merged


def segment_at(week: WeekSchedule, when: datetime) -> Segment:
    """Return the segment active at ``when``."""
    local = dt_util.as_local(when)
    # Compare timestamps: datetimes in the same zone compare by wall clock,
    # which is wrong during the repeated hour when DST ends.
    timestamp = when.timestamp()
    first = local.date() - timedelta(days=_WINDOW_DAYS)
    boundaries = _boundaries(week, first, 2 * _WINDOW_DAYS + 1)

    if len(boundaries) == 1:
        return Segment(None, None, boundaries[0][1], None)

    for index in range(len(boundaries) - 1, -1, -1):
        start, temperature = boundaries[index]
        if start.timestamp() <= timestamp:
            end, next_temperature = boundaries[index + 1]
            return Segment(start, end, temperature, next_temperature)

    # Unreachable: the window starts days before ``when``.
    raise AssertionError("segment window does not cover the requested time")
