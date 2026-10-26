"""Send a scheduled temperature to any climate entity, based on what it supports."""

from __future__ import annotations

import logging

from homeassistant.components.climate import (
    ATTR_HVAC_MODE,
    ATTR_HVAC_MODES,
    ATTR_MAX_TEMP,
    ATTR_MIN_TEMP,
    ATTR_TARGET_TEMP_HIGH,
    ATTR_TARGET_TEMP_LOW,
    ATTR_TARGET_TEMP_STEP,
    DOMAIN as CLIMATE_DOMAIN,
    SERVICE_SET_HVAC_MODE,
    SERVICE_SET_TEMPERATURE,
    ClimateEntityFeature,
    HVACMode,
)
from homeassistant.const import (
    ATTR_ENTITY_ID,
    ATTR_SUPPORTED_FEATURES,
    ATTR_TEMPERATURE,
    UnitOfTemperature,
)
from homeassistant.core import Context, HomeAssistant, State

_LOGGER = logging.getLogger(__name__)

# Modes in which a device heats towards its setpoint, in order of preference.
HEATING_MODES = (HVACMode.HEAT, HVACMode.HEAT_COOL, HVACMode.AUTO)
_ACTIVE_HEATING_MODES = (HVACMode.HEAT, HVACMode.HEAT_COOL)

DEFAULT_LIMITS = {
    UnitOfTemperature.CELSIUS: (5.0, 30.0, 0.5),
    UnitOfTemperature.FAHRENHEIT: (41.0, 86.0, 1.0),
}


def temperature_limits(state: State, unit: str) -> tuple[float, float, float]:
    """Return (min, max, step) for a climate entity, with sensible defaults."""
    default_min, default_max, default_step = DEFAULT_LIMITS.get(
        unit, DEFAULT_LIMITS[UnitOfTemperature.CELSIUS]
    )
    attrs = state.attributes
    return (
        float(attrs.get(ATTR_MIN_TEMP, default_min)),
        float(attrs.get(ATTR_MAX_TEMP, default_max)),
        float(attrs.get(ATTR_TARGET_TEMP_STEP) or default_step),
    )


def _heating_mode(state: State) -> HVACMode | None:
    """Return the hvac mode to switch to, or None when no change is needed."""
    modes = state.attributes.get(ATTR_HVAC_MODES) or []
    if state.state in _ACTIVE_HEATING_MODES and state.state in modes:
        return None
    for mode in HEATING_MODES:
        if mode in modes:
            return None if state.state == mode else mode
    return None


async def async_apply_temperature(
    hass: HomeAssistant,
    state: State,
    temperature: float | None,
    unit: str,
    context: Context | None = None,
) -> bool:
    """Make a climate entity follow a scheduled temperature.

    ``None`` means heating off: the entity is switched off, or set to its
    minimum temperature (frost protection) when it cannot be switched off.
    Returns whether a service call was made; nothing is sent when the entity
    is already in the wanted state.
    """
    attrs = state.attributes
    entity_id = state.entity_id
    modes = attrs.get(ATTR_HVAC_MODES) or []
    min_temp, max_temp, step = temperature_limits(state, unit)

    if temperature is None:
        if HVACMode.OFF in modes:
            if state.state == HVACMode.OFF:
                return False
            await hass.services.async_call(
                CLIMATE_DOMAIN,
                SERVICE_SET_HVAC_MODE,
                {ATTR_ENTITY_ID: entity_id, ATTR_HVAC_MODE: HVACMode.OFF},
                blocking=True,
                context=context,
            )
            return True
        temperature = min_temp

    temperature = min(max(temperature, min_temp), max_temp)
    features = ClimateEntityFeature(attrs.get(ATTR_SUPPORTED_FEATURES, 0))
    hvac_mode = _heating_mode(state)
    data: dict[str, object] = {ATTR_ENTITY_ID: entity_id}

    if ClimateEntityFeature.TARGET_TEMPERATURE in features:
        if hvac_mode is None and attrs.get(ATTR_TEMPERATURE) == temperature:
            return False
        data[ATTR_TEMPERATURE] = temperature
    elif ClimateEntityFeature.TARGET_TEMPERATURE_RANGE in features:
        high = attrs.get(ATTR_TARGET_TEMP_HIGH)
        if high is None or high < temperature + step:
            high = min(max_temp, temperature + max(step, 1.0))
        if (
            hvac_mode is None
            and attrs.get(ATTR_TARGET_TEMP_LOW) == temperature
            and attrs.get(ATTR_TARGET_TEMP_HIGH) == high
        ):
            return False
        data[ATTR_TARGET_TEMP_LOW] = temperature
        data[ATTR_TARGET_TEMP_HIGH] = high
    elif hvac_mode is None:
        # No setpoint support and already heating: nothing we can change.
        return False
    else:
        await hass.services.async_call(
            CLIMATE_DOMAIN,
            SERVICE_SET_HVAC_MODE,
            {ATTR_ENTITY_ID: entity_id, ATTR_HVAC_MODE: hvac_mode},
            blocking=True,
            context=context,
        )
        return True

    if hvac_mode is not None:
        data[ATTR_HVAC_MODE] = hvac_mode
    _LOGGER.debug("Setting %s to %s", entity_id, data)
    await hass.services.async_call(
        CLIMATE_DOMAIN, SERVICE_SET_TEMPERATURE, data, blocking=True, context=context
    )
    return True
