"""Sensors for the scheduled temperature and the active profile."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import SmartHeatingConfigEntry
from .const import (
    ATTR_BLOCK_END,
    ATTR_BLOCK_START,
    ATTR_HEATING_OFF,
    ATTR_LAST_ERROR,
    ATTR_NEXT_TEMPERATURE,
    ATTR_PENDING,
    ATTR_PROFILE,
    CONF_PRESENCE_ENTITY,
    PRESENCE_AUTO,
    PROFILES,
    SIGNAL_ROOM_ADDED,
)
from .engine import ScheduleEngine
from .entity import GlobalEntity, RoomEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: SmartHeatingConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the sensors."""
    engine = entry.runtime_data
    async_add_entities(
        [
            ActiveProfileSensor(engine),
            *(ScheduledTemperatureSensor(engine, entity_id) for entity_id in engine.store.rooms),
        ]
    )

    @callback
    def _room_added(entity_id: str) -> None:
        async_add_entities([ScheduledTemperatureSensor(engine, entity_id)])

    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_ROOM_ADDED, _room_added))


class ActiveProfileSensor(GlobalEntity, SensorEntity):
    """Whether the home or the away schedules are in use."""

    _attr_device_class = SensorDeviceClass.ENUM
    _attr_options = PROFILES

    def __init__(self, engine: ScheduleEngine) -> None:
        """Initialize the sensor."""
        super().__init__(engine, "active_profile")

    @property
    def native_value(self) -> str:
        """Return the active profile."""
        return self.engine.profile

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return how the profile was decided."""
        return {
            "presence_mode": self.engine.presence_mode,
            CONF_PRESENCE_ENTITY: self.engine.presence_entity,
            "automatic": self.engine.presence_mode == PRESENCE_AUTO,
        }


class ScheduledTemperatureSensor(RoomEntity, SensorEntity):
    """The temperature the schedule currently asks for."""

    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_suggested_display_precision = 1

    def __init__(self, engine: ScheduleEngine, climate_entity_id: str) -> None:
        """Initialize the sensor."""
        super().__init__(engine, climate_entity_id, "scheduled_temperature")
        self._attr_native_unit_of_measurement = engine.store.unit

    @property
    def available(self) -> bool:
        """Return whether the schedule is active."""
        room = self.engine.store.rooms.get(self.climate_entity_id)
        return bool(room and room.enabled)

    @property
    def native_value(self) -> float | None:
        """Return the scheduled temperature; unknown while heating is off."""
        return self.engine.room_status(self.climate_entity_id)["temperature"]

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return details about the current and next block."""
        status = self.engine.room_status(self.climate_entity_id)
        return {
            ATTR_PROFILE: status["profile"],
            ATTR_BLOCK_START: status["start"],
            ATTR_BLOCK_END: status["end"],
            ATTR_NEXT_TEMPERATURE: status["next_temperature"],
            ATTR_HEATING_OFF: status["temperature"] is None,
            ATTR_PENDING: status["pending"],
            ATTR_LAST_ERROR: status["last_error"],
        }
