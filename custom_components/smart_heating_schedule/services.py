"""Actions (services) for automations and scripts."""

from __future__ import annotations

from homeassistant.components.climate import DOMAIN as CLIMATE_DOMAIN
from homeassistant.const import ATTR_ENTITY_ID
from homeassistant.core import (
    HomeAssistant,
    ServiceCall,
    ServiceResponse,
    SupportsResponse,
    callback,
)
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.service import async_extract_entity_ids
import voluptuous as vol

from .const import (
    DOMAIN,
    PROFILE_AWAY,
    PROFILE_HOME,
    SERVICE_GET_SCHEDULE,
    SERVICE_RESUME_SCHEDULE,
    SERVICE_SET_SCHEDULE,
)
from .engine import ScheduleEngine
from .models import default_room, week_from_dict

GET_SCHEDULE_SCHEMA = vol.Schema({vol.Required(ATTR_ENTITY_ID): cv.entity_domain(CLIMATE_DOMAIN)})
SET_SCHEDULE_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_ENTITY_ID): cv.entity_domain(CLIMATE_DOMAIN),
        vol.Optional("enabled"): cv.boolean,
        vol.Optional(PROFILE_HOME): dict,
        vol.Optional(PROFILE_AWAY): dict,
    }
)


def get_engine(hass: HomeAssistant) -> ScheduleEngine:
    """Return the engine of the loaded config entry."""
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if not entries:
        raise ServiceValidationError(translation_domain=DOMAIN, translation_key="not_loaded")
    return entries[0].runtime_data


@callback
def async_setup_services(hass: HomeAssistant) -> None:
    """Register the integration's actions."""

    async def resume_schedule(call: ServiceCall) -> None:
        engine = get_engine(hass)
        for entity_id in await async_extract_entity_ids(call):
            await engine.async_resume(entity_id)

    async def get_schedule(call: ServiceCall) -> ServiceResponse:
        engine = get_engine(hass)
        entity_id = call.data[ATTR_ENTITY_ID]
        if (room := engine.store.rooms.get(entity_id)) is None:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="room_not_found",
                translation_placeholders={"entity_id": entity_id},
            )
        return {**room.as_dict(), "unit": engine.store.unit}

    async def set_schedule(call: ServiceCall) -> None:
        engine = get_engine(hass)
        entity_id = call.data[ATTR_ENTITY_ID]
        try:
            weeks = {
                profile: week_from_dict(call.data[profile])
                for profile in (PROFILE_HOME, PROFILE_AWAY)
                if profile in call.data
            }
        except vol.Invalid as err:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="invalid_schedule",
                translation_placeholders={"error": str(err)},
            ) from err
        if entity_id not in engine.store.rooms:
            room = default_room(entity_id, engine.store.unit)
            room.enabled = call.data.get("enabled", True)
            room.home = weeks.get(PROFILE_HOME, room.home)
            room.away = weeks.get(PROFILE_AWAY, room.away)
            await engine.async_set_room(room)
            return
        await engine.async_update_room(
            entity_id,
            enabled=call.data.get("enabled"),
            home=weeks.get(PROFILE_HOME),
            away=weeks.get(PROFILE_AWAY),
        )

    hass.services.async_register(DOMAIN, SERVICE_RESUME_SCHEDULE, resume_schedule)
    hass.services.async_register(
        DOMAIN,
        SERVICE_GET_SCHEDULE,
        get_schedule,
        schema=GET_SCHEDULE_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
    hass.services.async_register(
        DOMAIN, SERVICE_SET_SCHEDULE, set_schedule, schema=SET_SCHEDULE_SCHEMA
    )
