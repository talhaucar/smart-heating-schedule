"""Persistent storage for schedules and scheduler runtime state."""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
import voluptuous as vol

from .const import (
    PRESENCE_AUTO,
    PRESENCE_MODES,
    RUNTIME_STORAGE_KEY,
    RUNTIME_STORAGE_VERSION,
    SAVE_DELAY,
    STORAGE_KEY,
    STORAGE_VERSION,
)
from .models import RoomSchedule, convert_week, room_from_dict

_LOGGER = logging.getLogger(__name__)


class ScheduleStore:
    """Holds room schedules (user data) and runtime state (scheduler bookkeeping).

    They are kept in two files so frequent runtime writes never touch the
    schedules the user edited.
    """

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the store."""
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._runtime_store: Store[dict[str, Any]] = Store(
            hass, RUNTIME_STORAGE_VERSION, RUNTIME_STORAGE_KEY
        )
        self.unit: str = hass.config.units.temperature_unit
        self.rooms: dict[str, RoomSchedule] = {}
        self.presence_mode: str = PRESENCE_AUTO
        # entity_id -> {"key": segment key, "profile": ..., "temperature": ...}
        self.last_applied: dict[str, dict[str, Any]] = {}

    async def async_load(self) -> None:
        """Load data from disk, converting temperatures if the unit system changed."""
        data = await self._store.async_load() or {}
        stored_unit = data.get("unit", self.unit)
        converted = False
        for entity_id, raw in data.get("rooms", {}).items():
            try:
                room = room_from_dict(raw)
            except (vol.Invalid, KeyError) as err:
                _LOGGER.error("Ignoring invalid stored schedule for %s: %s", entity_id, err)
                continue
            if stored_unit != self.unit:
                room.home = convert_week(room.home, stored_unit, self.unit)
                room.away = convert_week(room.away, stored_unit, self.unit)
                converted = True
            self.rooms[room.entity_id] = room

        runtime = await self._runtime_store.async_load() or {}
        if runtime.get("presence_mode") in PRESENCE_MODES:
            self.presence_mode = runtime["presence_mode"]
        if not converted:
            self.last_applied = dict(runtime.get("last_applied", {}))
        else:
            _LOGGER.info("Converted schedules from %s to %s", stored_unit, self.unit)
            self.async_schedule_save()

    def async_schedule_save(self) -> None:
        """Save the schedules soon."""
        self._store.async_delay_save(self._data_to_save, SAVE_DELAY)

    def async_schedule_runtime_save(self) -> None:
        """Save the runtime state soon."""
        self._runtime_store.async_delay_save(self._runtime_to_save, SAVE_DELAY)

    def _data_to_save(self) -> dict[str, Any]:
        return {
            "unit": self.unit,
            "rooms": {entity_id: room.as_dict() for entity_id, room in self.rooms.items()},
        }

    def _runtime_to_save(self) -> dict[str, Any]:
        return {"presence_mode": self.presence_mode, "last_applied": self.last_applied}

    async def async_flush(self) -> None:
        """Write both files now, e.g. before the entry is reloaded."""
        await self._store.async_save(self._data_to_save())
        await self._runtime_store.async_save(self._runtime_to_save())

    async def async_remove(self) -> None:
        """Delete the files from disk."""
        await self._store.async_remove()
        await self._runtime_store.async_remove()
