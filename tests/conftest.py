"""Fixtures for Smart Heating Schedule tests."""

from __future__ import annotations

from typing import Any

from homeassistant.components.climate import ClimateEntityFeature, HVACMode
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.smart_heating_schedule.const import (
    CONF_ADMIN_ONLY,
    CONF_PRESENCE_ENTITY,
    DOMAIN,
)

CLIMATE = "climate.living_room"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: None) -> None:
    """Enable custom integrations in all tests."""


@pytest.fixture
def heat_state() -> dict[str, Any]:
    """Attributes of a typical radiator thermostat."""
    return {
        "hvac_modes": [HVACMode.OFF, HVACMode.HEAT, HVACMode.AUTO],
        "min_temp": 5,
        "max_temp": 25,
        "target_temp_step": 0.5,
        "temperature": 17,
        "supported_features": ClimateEntityFeature.TARGET_TEMPERATURE,
    }


@pytest.fixture
def config_entry(hass: HomeAssistant) -> MockConfigEntry:
    """Return a config entry added to hass."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Smart Heating Schedule",
        options={CONF_PRESENCE_ENTITY: "zone.home", CONF_ADMIN_ONLY: False},
    )
    entry.add_to_hass(hass)
    return entry


async def setup_integration(hass: HomeAssistant, entry: MockConfigEntry) -> None:
    """Set up the integration (and http, which the panel needs)."""
    assert await async_setup_component(hass, "http", {})
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
