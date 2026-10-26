"""Websocket API used by the panel."""

from __future__ import annotations

from typing import Any

from homeassistant.components import websocket_api
from homeassistant.components.climate import DOMAIN as CLIMATE_DOMAIN
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_connect
import voluptuous as vol

from .const import DOMAIN, PRESENCE_MODES, PROFILE_AWAY, PROFILE_HOME, SIGNAL_UPDATED
from .engine import ScheduleEngine
from .models import week_from_dict

ENTITY_ID = vol.All(cv.entity_id, cv.entity_domain(CLIMATE_DOMAIN))


@callback
def async_setup_websocket(hass: HomeAssistant) -> None:
    """Register the websocket commands."""
    for command in (
        ws_subscribe,
        ws_add_room,
        ws_remove_room,
        ws_save_room,
        ws_copy_room,
        ws_set_presence_mode,
    ):
        websocket_api.async_register_command(hass, command)


def _engine(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg_id: int
) -> ScheduleEngine | None:
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if not entries:
        connection.send_error(msg_id, "not_loaded", "Smart Heating Schedule is not loaded")
        return None
    return entries[0].runtime_data


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@callback
def ws_subscribe(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Send the full state now and every time it changes."""
    if (engine := _engine(hass, connection, msg["id"])) is None:
        return

    @callback
    def _send() -> None:
        # Look the engine up again: the entry may have been reloaded.
        entries = hass.config_entries.async_loaded_entries(DOMAIN)
        if entries:
            connection.send_message(
                websocket_api.event_message(msg["id"], entries[0].runtime_data.as_dict())
            )

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_UPDATED, _send)
    connection.send_result(msg["id"])
    connection.send_message(websocket_api.event_message(msg["id"], engine.as_dict()))


async def _run(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    action: Any,
) -> None:
    if (engine := _engine(hass, connection, msg["id"])) is None:
        return
    try:
        result = await action(engine)
    except vol.Invalid as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "home_assistant_error", str(err))
    else:
        connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/room/add", vol.Required("entity_id"): ENTITY_ID}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_add_room(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Start scheduling a climate entity."""

    async def action(engine: ScheduleEngine) -> dict[str, Any]:
        return (await engine.async_add_room(msg["entity_id"])).as_dict()

    await _run(hass, connection, msg, action)


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/room/remove", vol.Required("entity_id"): ENTITY_ID}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_remove_room(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Stop scheduling a climate entity."""

    async def action(engine: ScheduleEngine) -> None:
        await engine.async_remove_room(msg["entity_id"])

    await _run(hass, connection, msg, action)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/room/save",
        vol.Required("entity_id"): ENTITY_ID,
        vol.Optional("enabled"): bool,
        vol.Optional(PROFILE_HOME): dict,
        vol.Optional(PROFILE_AWAY): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save_room(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Save (part of) a room schedule."""

    async def action(engine: ScheduleEngine) -> dict[str, Any]:
        home = week_from_dict(msg[PROFILE_HOME]) if PROFILE_HOME in msg else None
        away = week_from_dict(msg[PROFILE_AWAY]) if PROFILE_AWAY in msg else None
        room = await engine.async_update_room(
            msg["entity_id"], enabled=msg.get("enabled"), home=home, away=away
        )
        return room.as_dict()

    await _run(hass, connection, msg, action)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/room/copy",
        vol.Required("entity_id"): ENTITY_ID,
        vol.Required("targets"): [ENTITY_ID],
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_copy_room(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Copy a room's schedule to other rooms."""

    async def action(engine: ScheduleEngine) -> None:
        await engine.async_copy_room(msg["entity_id"], msg["targets"])

    await _run(hass, connection, msg, action)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/presence/set",
        vol.Required("mode"): vol.In(PRESENCE_MODES),
    }
)
@websocket_api.async_response
async def ws_set_presence_mode(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Set the presence mode, like the select entity does."""

    async def action(engine: ScheduleEngine) -> None:
        await engine.async_set_presence_mode(msg["mode"])

    await _run(hass, connection, msg, action)
