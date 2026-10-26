"""Select to force the home or away schedules, like Tado's manual Home/Away."""

from __future__ import annotations

from homeassistant.components.select import SelectEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import SmartHeatingConfigEntry
from .const import PRESENCE_MODES
from .engine import ScheduleEngine
from .entity import GlobalEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: SmartHeatingConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the presence mode select."""
    async_add_entities([PresenceModeSelect(entry.runtime_data)])


class PresenceModeSelect(GlobalEntity, SelectEntity):
    """Auto follows the presence entity; Home and Away force a profile."""

    _attr_options = PRESENCE_MODES

    def __init__(self, engine: ScheduleEngine) -> None:
        """Initialize the select."""
        super().__init__(engine, "presence_mode")

    @property
    def current_option(self) -> str:
        """Return the presence mode."""
        return self.engine.presence_mode

    async def async_select_option(self, option: str) -> None:
        """Change the presence mode."""
        await self.engine.async_set_presence_mode(option)
