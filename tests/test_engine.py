"""Tests for the scheduler engine running inside Home Assistant."""

from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any
from zoneinfo import ZoneInfo

from freezegun.api import FrozenDateTimeFactory
from homeassistant.components.climate import HVACMode
from homeassistant.const import STATE_UNAVAILABLE
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er, issue_registry as ir
from homeassistant.util.unit_system import US_CUSTOMARY_SYSTEM
import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_time_changed,
    async_mock_service,
)

from custom_components.smart_heating_schedule.const import DOMAIN, PRESENCE_DEBOUNCE

from .conftest import CLIMATE, setup_integration

TZ = ZoneInfo("Europe/Amsterdam")


@pytest.fixture(autouse=True)
async def amsterdam(hass: HomeAssistant, freezer: FrozenDateTimeFactory) -> None:
    """Run at Monday 26 October 2026 12:00 in Amsterdam, with someone home."""
    await hass.config.async_set_time_zone("Europe/Amsterdam")
    freezer.move_to(datetime(2026, 10, 26, 12, 0, tzinfo=TZ))
    hass.states.async_set("zone.home", "1")


@pytest.fixture
def calls(hass: HomeAssistant) -> list:
    """Mock the climate services."""
    calls = async_mock_service(hass, "climate", "set_temperature")
    calls_off = async_mock_service(hass, "climate", "set_hvac_mode")
    return calls, calls_off


def climate(hass: HomeAssistant, attrs: dict[str, Any], state: str = HVACMode.HEAT) -> None:
    hass.states.async_set(CLIMATE, state, attrs)


async def add_room(hass: HomeAssistant) -> None:
    engine = hass.config_entries.async_entries(DOMAIN)[0].runtime_data
    await engine.async_add_room(CLIMATE)
    await hass.async_block_till_done()


async def move_to(hass: HomeAssistant, freezer: FrozenDateTimeFactory, when: datetime) -> None:
    freezer.move_to(when)
    async_fire_time_changed(hass, when)
    await hass.async_block_till_done()


async def test_add_room_applies_and_creates_entities(
    hass: HomeAssistant, config_entry: MockConfigEntry, calls, heat_state
) -> None:
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    await add_room(hass)

    set_temperature, _ = calls
    assert set_temperature[-1].data == {"entity_id": CLIMATE, "temperature": 20.0}

    switch = hass.states.get("switch.living_room_smart_schedule")
    sensor = hass.states.get("sensor.living_room_scheduled_temperature")
    assert switch.state == "on"
    assert float(sensor.state) == 20.0
    assert sensor.attributes["unit_of_measurement"] == "°C"
    assert sensor.attributes["next_temperature"] == 18.0
    assert hass.states.get("select.smart_heating_schedule_presence_mode").state == "auto"
    assert hass.states.get("sensor.smart_heating_schedule_active_schedule").state == "home"


async def test_transition_and_manual_change(
    hass: HomeAssistant, config_entry: MockConfigEntry, freezer, calls, heat_state
) -> None:
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    await add_room(hass)
    set_temperature, _ = calls
    assert len(set_temperature) == 1

    # Someone turns the thermostat up by hand: kept until the next block.
    climate(hass, {**heat_state, "temperature": 23})
    await move_to(hass, freezer, datetime(2026, 10, 26, 21, 59, tzinfo=TZ))
    assert len(set_temperature) == 1

    await move_to(hass, freezer, datetime(2026, 10, 26, 22, 0, 1, tzinfo=TZ))
    assert set_temperature[-1].data["temperature"] == 18.0
    # 22:00 18° continues to 07:00 18° tomorrow: nothing is sent at midnight.
    await move_to(hass, freezer, datetime(2026, 10, 27, 0, 0, 1, tzinfo=TZ))
    assert len(set_temperature) == 2
    await move_to(hass, freezer, datetime(2026, 10, 27, 7, 0, 1, tzinfo=TZ))
    assert set_temperature[-1].data["temperature"] == 20.0


async def test_manual_change_is_overridden_until_resumed(
    hass: HomeAssistant, config_entry: MockConfigEntry, freezer, calls, heat_state
) -> None:
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    freezer.tick()
    await add_room(hass)
    engine = config_entry.runtime_data
    sensor = "sensor.living_room_scheduled_temperature"
    set_temperature, _ = calls

    # The thermostat has not reported the new setpoint yet: not a manual change.
    assert not engine.room_status(CLIMATE)["overridden"]
    freezer.tick()
    climate(hass, {**heat_state, "temperature": 20})
    assert not engine.room_status(CLIMATE)["overridden"]

    climate(hass, {**heat_state, "temperature": 23})
    await hass.async_block_till_done()
    assert engine.room_status(CLIMATE)["overridden"]
    assert hass.states.get(sensor).attributes["overridden"]

    freezer.tick()
    await engine.async_resume(CLIMATE)
    await hass.async_block_till_done()
    assert set_temperature[-1].data["temperature"] == 20.0
    assert not engine.room_status(CLIMATE)["overridden"]
    assert not hass.states.get(sensor).attributes["overridden"]

    # A manual change ends at the next block.
    freezer.tick()
    climate(hass, {**heat_state, "temperature": 20})
    climate(hass, {**heat_state, "temperature": 22})
    assert engine.room_status(CLIMATE)["overridden"]
    await move_to(hass, freezer, datetime(2026, 10, 26, 22, 0, 1, tzinfo=TZ))
    assert not engine.room_status(CLIMATE)["overridden"]


async def test_restart_keeps_manual_change(
    hass: HomeAssistant, config_entry: MockConfigEntry, calls, heat_state
) -> None:
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    await add_room(hass)
    set_temperature, _ = calls
    climate(hass, {**heat_state, "temperature": 23})

    assert await hass.config_entries.async_reload(config_entry.entry_id)
    await hass.async_block_till_done()
    assert len(set_temperature) == 1


async def test_presence(
    hass: HomeAssistant, config_entry: MockConfigEntry, freezer, calls, heat_state
) -> None:
    climate(hass, {**heat_state, "temperature": 20})
    await setup_integration(hass, config_entry)
    await add_room(hass)
    set_temperature, _ = calls
    assert not set_temperature  # already at 20°

    hass.states.async_set("zone.home", "0")
    await hass.async_block_till_done()
    assert not set_temperature  # debounced
    await move_to(hass, freezer, datetime(2026, 10, 26, 12, 0, PRESENCE_DEBOUNCE + 1, tzinfo=TZ))
    assert set_temperature[-1].data["temperature"] == 16.0
    assert hass.states.get("sensor.smart_heating_schedule_active_schedule").state == "away"
    climate(hass, {**heat_state, "temperature": 16})

    # Forcing Home overrides the empty zone right away.
    await hass.services.async_call(
        "select",
        "select_option",
        {"entity_id": "select.smart_heating_schedule_presence_mode", "option": "home"},
        blocking=True,
    )
    await hass.async_block_till_done()
    assert set_temperature[-1].data["temperature"] == 20.0


async def test_unavailable_then_back(
    hass: HomeAssistant, config_entry: MockConfigEntry, calls, heat_state
) -> None:
    climate(hass, {}, STATE_UNAVAILABLE)
    await setup_integration(hass, config_entry)
    await add_room(hass)
    set_temperature, _ = calls
    assert not set_temperature
    sensor = hass.states.get("sensor.living_room_scheduled_temperature")
    assert sensor.attributes["pending"] is True

    climate(hass, heat_state)
    await hass.async_block_till_done()
    assert set_temperature[-1].data["temperature"] == 20.0
    assert (
        hass.states.get("sensor.living_room_scheduled_temperature").attributes["pending"] is False
    )


async def test_edit_and_switch(
    hass: HomeAssistant, config_entry: MockConfigEntry, calls, heat_state
) -> None:
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    await add_room(hass)
    engine = config_entry.runtime_data
    set_temperature, _ = calls
    room = engine.store.rooms[CLIMATE]

    # Moving the current block's start keeps the same temperature: no command.
    home = room.home.as_dict()
    home["days"]["mon"][1]["start"] = "06:00"
    from custom_components.smart_heating_schedule.models import week_from_dict

    await engine.async_update_room(CLIMATE, home=week_from_dict(home))
    assert len(set_temperature) == 1

    home["days"]["mon"][1]["temperature"] = 21
    await engine.async_update_room(CLIMATE, home=week_from_dict(home))
    assert set_temperature[-1].data["temperature"] == 21

    await hass.services.async_call(
        "switch", "turn_off", {"entity_id": "switch.living_room_smart_schedule"}, blocking=True
    )
    assert hass.states.get("sensor.living_room_scheduled_temperature").state == "unavailable"
    await hass.services.async_call(
        "switch", "turn_on", {"entity_id": "switch.living_room_smart_schedule"}, blocking=True
    )
    await hass.async_block_till_done()
    # Turning the schedule on applies the block again, even if unchanged.
    assert len(set_temperature) == 3


async def test_remove_room_removes_entities(
    hass: HomeAssistant, config_entry: MockConfigEntry, calls, heat_state
) -> None:
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    await add_room(hass)
    await config_entry.runtime_data.async_remove_room(CLIMATE)
    await hass.async_block_till_done()
    assert hass.states.get("switch.living_room_smart_schedule") is None
    assert er.async_get(hass).async_get("switch.living_room_smart_schedule") is None


async def test_fahrenheit(
    hass: HomeAssistant, config_entry: MockConfigEntry, calls, heat_state
) -> None:
    hass.config.units = US_CUSTOMARY_SYSTEM
    climate(hass, {**heat_state, "min_temp": 41, "max_temp": 86, "target_temp_step": 1})
    await setup_integration(hass, config_entry)
    await add_room(hass)
    set_temperature, _ = calls
    assert set_temperature[-1].data["temperature"] == 68.0
    sensor = hass.states.get("sensor.living_room_scheduled_temperature")
    assert sensor.attributes["unit_of_measurement"] == "°F"
    assert float(sensor.state) == 68.0


async def test_unit_change_converts_stored_schedules(
    hass: HomeAssistant, config_entry: MockConfigEntry, hass_storage: dict, calls, heat_state
) -> None:
    from custom_components.smart_heating_schedule.models import default_room

    hass_storage[DOMAIN] = {
        "version": 1,
        "minor_version": 1,
        "key": DOMAIN,
        "data": {"unit": "°C", "rooms": {CLIMATE: default_room(CLIMATE, "°C").as_dict()}},
    }
    hass.config.units = US_CUSTOMARY_SYSTEM
    climate(hass, {**heat_state, "min_temp": 41, "max_temp": 86})
    await setup_integration(hass, config_entry)
    room = config_entry.runtime_data.store.rooms[CLIMATE]
    assert [b.temperature for b in room.home.blocks_for_weekday(0)] == [64, 68, 64]
    assert calls[0][-1].data["temperature"] == 68


async def test_rename_and_remove_climate_entity(
    hass: HomeAssistant, config_entry: MockConfigEntry, calls, heat_state
) -> None:
    registry = er.async_get(hass)
    registry.async_get_or_create("climate", "test", "abc", suggested_object_id="living_room")
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    await add_room(hass)

    registry.async_update_entity(CLIMATE, new_entity_id="climate.lounge")
    await hass.async_block_till_done()
    engine = config_entry.runtime_data
    assert list(engine.store.rooms) == ["climate.lounge"]

    registry.async_remove("climate.lounge")
    await hass.async_block_till_done()
    issue = ir.async_get(hass).async_get_issue(DOMAIN, "entity_missing_climate.lounge")
    assert issue is not None


async def test_unloaded_panel(
    hass: HomeAssistant, config_entry: MockConfigEntry, heat_state
) -> None:
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    assert "smart-heating-schedule" in hass.data["frontend_panels"]
    assert await hass.config_entries.async_unload(config_entry.entry_id)
    assert "smart-heating-schedule" not in hass.data["frontend_panels"]


async def test_constant_schedule_has_no_timer(
    hass: HomeAssistant, config_entry: MockConfigEntry, freezer, calls, heat_state
) -> None:
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    await config_entry.runtime_data.async_set_presence_mode("away")
    await add_room(hass)
    set_temperature, _ = calls
    assert set_temperature[-1].data["temperature"] == 16.0
    await move_to(hass, freezer, datetime(2026, 10, 26, 12, 0, tzinfo=TZ) + timedelta(days=3))
    assert len(set_temperature) == 1


async def test_entities_on_thermostat_device(
    hass: HomeAssistant, config_entry: MockConfigEntry, calls, heat_state
) -> None:
    from homeassistant.helpers import device_registry as dr

    other = MockConfigEntry(domain="tado")
    other.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=other.entry_id, identifiers={("tado", "zone-4")}, name="Slaapkamer"
    )
    er.async_get(hass).async_get_or_create(
        "climate", "tado", "zone-4", suggested_object_id="living_room", device_id=device.id
    )
    climate(hass, heat_state)
    await setup_integration(hass, config_entry)
    await add_room(hass)

    entry = er.async_get(hass).async_get("switch.slaapkamer_smart_schedule")
    assert entry is not None
    assert entry.device_id == device.id
