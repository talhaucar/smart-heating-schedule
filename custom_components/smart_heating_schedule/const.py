"""Constants for Smart Heating Schedule."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "smart_heating_schedule"
TITLE: Final = "Smart Heating Schedule"

STORAGE_KEY: Final = DOMAIN
STORAGE_VERSION: Final = 1
RUNTIME_STORAGE_KEY: Final = f"{DOMAIN}.runtime"
RUNTIME_STORAGE_VERSION: Final = 1
SAVE_DELAY: Final = 1

PANEL_URL_PATH: Final = "smart-heating-schedule"
PANEL_COMPONENT: Final = "smart-heating-schedule-panel"
PANEL_ICON: Final = "mdi:radiator"
PANEL_FILENAME: Final = "smart-heating-schedule-panel.js"
STATIC_URL: Final = "/smart_heating_schedule_static"

CONF_PRESENCE_ENTITY: Final = "presence_entity"
CONF_ADMIN_ONLY: Final = "admin_only"
DEFAULT_PRESENCE_ENTITY: Final = "zone.home"
PRESENCE_DOMAINS: Final = [
    "zone",
    "person",
    "group",
    "device_tracker",
    "binary_sensor",
    "input_boolean",
]
PRESENCE_DEBOUNCE: Final = 5

PROFILE_HOME: Final = "home"
PROFILE_AWAY: Final = "away"
PROFILES: Final = [PROFILE_HOME, PROFILE_AWAY]

PRESENCE_AUTO: Final = "auto"
PRESENCE_MODES: Final = [PRESENCE_AUTO, PROFILE_HOME, PROFILE_AWAY]

WEEKDAYS: Final = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

SLOT_MINUTES: Final = 15
MINUTES_PER_DAY: Final = 24 * 60

SIGNAL_UPDATED: Final = f"{DOMAIN}_updated"
SIGNAL_ROOM_ADDED: Final = f"{DOMAIN}_room_added"
SIGNAL_ROOM_REMOVED: Final = f"{DOMAIN}_room_removed_{{}}"

ATTR_PROFILE: Final = "profile"
ATTR_BLOCK_START: Final = "block_start"
ATTR_BLOCK_END: Final = "block_end"
ATTR_NEXT_TEMPERATURE: Final = "next_temperature"
ATTR_HEATING_OFF: Final = "heating_off"
ATTR_PENDING: Final = "pending"
ATTR_OVERRIDDEN: Final = "overridden"
ATTR_LAST_ERROR: Final = "last_error"

SERVICE_RESUME_SCHEDULE: Final = "resume_schedule"
SERVICE_GET_SCHEDULE: Final = "get_schedule"
SERVICE_SET_SCHEDULE: Final = "set_schedule"
