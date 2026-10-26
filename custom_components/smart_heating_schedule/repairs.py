"""Repair flow for schedules whose climate entity no longer exists."""

from __future__ import annotations

from typing import Any

from homeassistant import data_entry_flow
from homeassistant.components.climate import DOMAIN as CLIMATE_DOMAIN
from homeassistant.components.repairs import RepairsFlow
from homeassistant.core import HomeAssistant
from homeassistant.helpers.selector import EntitySelector, EntitySelectorConfig
import voluptuous as vol

from .engine import ScheduleEngine
from .services import get_engine


class MissingEntityRepairFlow(RepairsFlow):
    """Remove the schedule or move it to another thermostat."""

    def __init__(self, entity_id: str) -> None:
        """Initialize the flow."""
        self.entity_id = entity_id

    def _placeholders(self) -> dict[str, str]:
        return {"entity_id": self.entity_id}

    async def async_step_init(
        self, user_input: dict[str, str] | None = None
    ) -> data_entry_flow.FlowResult:
        """Offer the two ways to fix it."""
        return self.async_show_menu(
            menu_options=["reassign", "remove"],
            description_placeholders=self._placeholders(),
        )

    async def async_step_remove(
        self, user_input: dict[str, str] | None = None
    ) -> data_entry_flow.FlowResult:
        """Delete the schedule."""
        if user_input is not None:
            engine = get_engine(self.hass)
            if self.entity_id in engine.store.rooms:
                await engine.async_remove_room(self.entity_id)
            return self.async_create_entry(data={})
        return self.async_show_form(step_id="remove", description_placeholders=self._placeholders())

    async def async_step_reassign(
        self, user_input: dict[str, str] | None = None
    ) -> data_entry_flow.FlowResult:
        """Move the schedule to another climate entity."""
        engine: ScheduleEngine = get_engine(self.hass)
        if user_input is not None:
            room = engine.store.rooms.get(self.entity_id)
            if room is not None:
                await engine.async_copy_room(self.entity_id, [user_input["entity_id"]])
                await engine.async_remove_room(self.entity_id)
            return self.async_create_entry(data={})
        return self.async_show_form(
            step_id="reassign",
            data_schema=vol.Schema(
                {
                    vol.Required("entity_id"): EntitySelector(
                        EntitySelectorConfig(domain=CLIMATE_DOMAIN)
                    )
                }
            ),
            description_placeholders=self._placeholders(),
        )


async def async_create_fix_flow(
    hass: HomeAssistant, issue_id: str, data: dict[str, Any] | None
) -> RepairsFlow:
    """Create the repair flow for an issue."""
    assert data is not None
    return MissingEntityRepairFlow(str(data["entity_id"]))
