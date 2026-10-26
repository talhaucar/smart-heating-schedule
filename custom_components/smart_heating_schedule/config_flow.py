"""Config flow for Smart Heating Schedule."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlowWithReload,
)
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    BooleanSelector,
    EntitySelector,
    EntitySelectorConfig,
)
import voluptuous as vol

from .const import (
    CONF_ADMIN_ONLY,
    CONF_PRESENCE_ENTITY,
    DEFAULT_PRESENCE_ENTITY,
    DOMAIN,
    PRESENCE_DOMAINS,
    TITLE,
)

OPTIONS_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_PRESENCE_ENTITY): EntitySelector(
            EntitySelectorConfig(domain=PRESENCE_DOMAINS)
        ),
        vol.Required(CONF_ADMIN_ONLY): BooleanSelector(),
    }
)

DEFAULT_OPTIONS = {
    CONF_PRESENCE_ENTITY: DEFAULT_PRESENCE_ENTITY,
    CONF_ADMIN_ONLY: False,
}


class SmartHeatingScheduleConfigFlow(ConfigFlow, domain=DOMAIN):
    """Set up the integration; there is nothing to configure up front."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Confirm the setup."""
        if user_input is not None:
            return self.async_create_entry(title=TITLE, data={}, options=DEFAULT_OPTIONS)
        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlowHandler:
        """Return the options flow."""
        return OptionsFlowHandler()


class OptionsFlowHandler(OptionsFlowWithReload):
    """Choose the presence entity and who can see the panel."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Manage the options."""
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        return self.async_show_form(
            step_id="init",
            data_schema=self.add_suggested_values_to_schema(
                OPTIONS_SCHEMA, {**DEFAULT_OPTIONS, **self.config_entry.options}
            ),
        )
