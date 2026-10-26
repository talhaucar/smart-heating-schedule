"""Base entities."""

from __future__ import annotations

from homeassistant.core import callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.device import async_entity_id_to_device
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity import Entity

from .const import DOMAIN, SIGNAL_ROOM_REMOVED, SIGNAL_UPDATED, TITLE
from .engine import ScheduleEngine


class SmartHeatingEntity(Entity):
    """An entity that refreshes whenever the scheduler changes."""

    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, engine: ScheduleEngine) -> None:
        """Initialize the entity."""
        self.engine = engine

    async def async_added_to_hass(self) -> None:
        """Subscribe to scheduler updates."""
        self.async_on_remove(
            async_dispatcher_connect(self.hass, SIGNAL_UPDATED, self._handle_update)
        )

    @callback
    def _handle_update(self) -> None:
        self.async_write_ha_state()


class GlobalEntity(SmartHeatingEntity):
    """An entity on the integration's own service device."""

    def __init__(self, engine: ScheduleEngine, key: str) -> None:
        """Initialize the entity."""
        super().__init__(engine)
        entry_id = engine.entry.entry_id
        self._attr_translation_key = key
        self._attr_unique_id = f"{entry_id}_{key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry_id)},
            name=TITLE,
            entry_type=DeviceEntryType.SERVICE,
        )


class RoomEntity(SmartHeatingEntity):
    """An entity for one scheduled climate entity, shown on that thermostat's device."""

    def __init__(self, engine: ScheduleEngine, climate_entity_id: str, key: str) -> None:
        """Initialize the entity."""
        super().__init__(engine)
        self.climate_entity_id = climate_entity_id
        self._attr_translation_key = key
        registry_entry = er.async_get(engine.hass).async_get(climate_entity_id)
        # The registry id survives entity id renames; YAML entities have none.
        stable_id = registry_entry.id if registry_entry else climate_entity_id
        self._attr_unique_id = f"{engine.entry.entry_id}_{stable_id}_{key}"
        if device := async_entity_id_to_device(engine.hass, climate_entity_id):
            # Show up on the thermostat's own device page.
            self.device_entry = device
        else:
            self._attr_device_info = DeviceInfo(
                identifiers={(DOMAIN, stable_id)},
                name=_friendly_name(engine, climate_entity_id),
                entry_type=DeviceEntryType.SERVICE,
            )

    async def async_added_to_hass(self) -> None:
        """Remove this entity when its room is removed."""
        await super().async_added_to_hass()
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                SIGNAL_ROOM_REMOVED.format(self.climate_entity_id),
                self._async_room_removed,
            )
        )

    async def _async_room_removed(self) -> None:
        registry = er.async_get(self.hass)
        if registry.async_get(self.entity_id):
            registry.async_remove(self.entity_id)
        else:
            await self.async_remove(force_remove=True)


def _friendly_name(engine: ScheduleEngine, entity_id: str) -> str:
    if state := engine.hass.states.get(entity_id):
        return state.name
    return entity_id
