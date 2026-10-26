"""Tests for sending temperatures to different kinds of thermostats."""

from __future__ import annotations

from typing import Any

from homeassistant.components.climate import ClimateEntityFeature, HVACMode
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import async_mock_service

from custom_components.smart_heating_schedule.climate_control import (
    async_apply_temperature,
)

ENTITY = "climate.test"


def set_state(hass: HomeAssistant, state: str, **attrs: Any):
    hass.states.async_set(ENTITY, state, attrs)
    return hass.states.get(ENTITY)


async def test_sets_temperature(hass: HomeAssistant, heat_state: dict) -> None:
    calls = async_mock_service(hass, "climate", "set_temperature")
    state = set_state(hass, HVACMode.HEAT, **heat_state)
    assert await async_apply_temperature(hass, state, 20, "°C")
    assert calls[0].data == {"entity_id": ENTITY, "temperature": 20}


async def test_skips_when_already_there(hass: HomeAssistant, heat_state: dict) -> None:
    calls = async_mock_service(hass, "climate", "set_temperature")
    state = set_state(hass, HVACMode.HEAT, **heat_state)
    assert not await async_apply_temperature(hass, state, 17, "°C")
    assert not calls


async def test_switches_out_of_auto_and_off(hass: HomeAssistant, heat_state: dict) -> None:
    calls = async_mock_service(hass, "climate", "set_temperature")
    for mode in (HVACMode.AUTO, HVACMode.OFF):
        state = set_state(hass, mode, **heat_state)
        assert await async_apply_temperature(hass, state, 17, "°C")
        assert calls[-1].data["hvac_mode"] == HVACMode.HEAT


async def test_clamps_to_limits(hass: HomeAssistant, heat_state: dict) -> None:
    calls = async_mock_service(hass, "climate", "set_temperature")
    state = set_state(hass, HVACMode.HEAT, **heat_state)
    await async_apply_temperature(hass, state, 30, "°C")
    assert calls[0].data["temperature"] == 25


async def test_off_block(hass: HomeAssistant, heat_state: dict) -> None:
    calls = async_mock_service(hass, "climate", "set_hvac_mode")
    state = set_state(hass, HVACMode.HEAT, **heat_state)
    assert await async_apply_temperature(hass, state, None, "°C")
    assert calls[0].data == {"entity_id": ENTITY, "hvac_mode": HVACMode.OFF}
    state = set_state(hass, HVACMode.OFF, **heat_state)
    assert not await async_apply_temperature(hass, state, None, "°C")


async def test_off_without_off_mode_uses_frost_protection(
    hass: HomeAssistant, heat_state: dict
) -> None:
    calls = async_mock_service(hass, "climate", "set_temperature")
    state = set_state(hass, HVACMode.HEAT, **{**heat_state, "hvac_modes": [HVACMode.HEAT]})
    await async_apply_temperature(hass, state, None, "°C")
    assert calls[0].data["temperature"] == 5


async def test_range_only_device(hass: HomeAssistant) -> None:
    calls = async_mock_service(hass, "climate", "set_temperature")
    state = set_state(
        hass,
        HVACMode.HEAT_COOL,
        hvac_modes=[HVACMode.OFF, HVACMode.HEAT_COOL],
        min_temp=45,
        max_temp=90,
        target_temp_low=60,
        target_temp_high=66,
        supported_features=ClimateEntityFeature.TARGET_TEMPERATURE_RANGE,
    )
    await async_apply_temperature(hass, state, 68, "°F")
    assert calls[0].data == {
        "entity_id": ENTITY,
        "target_temp_low": 68,
        "target_temp_high": 69,
    }


async def test_auto_only_device(hass: HomeAssistant, heat_state: dict) -> None:
    calls = async_mock_service(hass, "climate", "set_temperature")
    state = set_state(
        hass, HVACMode.OFF, **{**heat_state, "hvac_modes": [HVACMode.OFF, HVACMode.AUTO]}
    )
    await async_apply_temperature(hass, state, 19, "°C")
    assert calls[0].data["hvac_mode"] == HVACMode.AUTO
    state = set_state(
        hass, HVACMode.AUTO, **{**heat_state, "hvac_modes": [HVACMode.OFF, HVACMode.AUTO]}
    )
    await async_apply_temperature(hass, state, 19, "°C")
    assert "hvac_mode" not in calls[1].data


async def test_fahrenheit_defaults(hass: HomeAssistant) -> None:
    calls = async_mock_service(hass, "climate", "set_temperature")
    state = set_state(
        hass,
        HVACMode.HEAT,
        hvac_modes=[HVACMode.HEAT],
        supported_features=ClimateEntityFeature.TARGET_TEMPERATURE,
    )
    await async_apply_temperature(hass, state, None, "°F")
    assert calls[0].data["temperature"] == 41
