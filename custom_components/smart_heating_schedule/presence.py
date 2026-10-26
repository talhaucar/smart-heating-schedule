"""Decide whether anyone is home from a Home Assistant entity."""

from __future__ import annotations

from homeassistant.const import STATE_HOME, STATE_ON, STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import State


def is_home(state: State | None) -> bool | None:
    """Return True when home, False when away, None when presence is unknown.

    - ``zone``: the state is the number of people in the zone.
    - ``binary_sensor`` / ``input_boolean``: ``on`` means someone is home.
    - ``person`` / ``device_tracker`` / ``group``: ``home`` (or ``on`` for
      groups of binary entities) means someone is home.
    """
    if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
        return None
    if state.domain == "zone":
        try:
            return float(state.state) > 0
        except ValueError:
            return None
    if state.domain in ("binary_sensor", "input_boolean"):
        return state.state == STATE_ON
    return state.state in (STATE_HOME, STATE_ON)
