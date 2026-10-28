"""The scheduler: decides when to send which temperature to which room."""

from __future__ import annotations

import asyncio
from copy import deepcopy
from datetime import datetime
from enum import StrEnum
import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import (
    CALLBACK_TYPE,
    Context,
    Event,
    EventStateChangedData,
    HomeAssistant,
    callback,
)
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import entity_registry as er, issue_registry as ir
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import (
    async_call_later,
    async_track_point_in_time,
    async_track_state_change_event,
)
from homeassistant.helpers.start import async_at_started
from homeassistant.util import dt as dt_util
import voluptuous as vol

from .climate_control import async_apply_temperature, follows_temperature
from .const import (
    CONF_PRESENCE_ENTITY,
    DEFAULT_PRESENCE_ENTITY,
    DOMAIN,
    PRESENCE_AUTO,
    PRESENCE_DEBOUNCE,
    PROFILE_AWAY,
    PROFILE_HOME,
    SIGNAL_ROOM_ADDED,
    SIGNAL_ROOM_REMOVED,
    SIGNAL_UPDATED,
)
from .models import RoomSchedule, WeekSchedule, default_room
from .presence import is_home
from .resolver import Segment, segment_at
from .store import ScheduleStore

_LOGGER = logging.getLogger(__name__)

RETRY_DELAY = 300


class Reason(StrEnum):
    """Why a room is being evaluated."""

    STARTUP = "startup"
    TRANSITION = "transition"
    PRESENCE = "presence"
    EDIT = "edit"
    RETRY = "retry"
    FORCE = "force"


class ScheduleEngine:
    """Applies room schedules to climate entities.

    Commands are only sent when the target changes (a block boundary, a
    presence change or an edit), so manual changes on a thermostat are kept
    until the next block and cloud APIs are not called needlessly.
    """

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, store: ScheduleStore) -> None:
        """Initialize the engine."""
        self.hass = hass
        self.entry = entry
        self.store = store
        self.presence_entity: str = entry.options.get(CONF_PRESENCE_ENTITY, DEFAULT_PRESENCE_ENTITY)
        self.profile: str = PROFILE_HOME
        self.segments: dict[str, Segment] = {}
        self.pending: set[str] = set()
        self.overridden: set[str] = set()
        self._sent_at: dict[str, datetime] = {}
        self.errors: dict[str, str] = {}
        self._started = False
        self._timers: dict[str, CALLBACK_TYPE] = {}
        self._retries: dict[str, CALLBACK_TYPE] = {}
        self._locks: dict[str, asyncio.Lock] = {}
        self._unsubs: list[CALLBACK_TYPE] = []
        self._climate_unsub: CALLBACK_TYPE | None = None
        self._presence_debounce: CALLBACK_TYPE | None = None

    # ------------------------------------------------------------------
    # Lifecycle

    async def async_start(self) -> None:
        """Start tracking presence and schedule the rooms."""
        self.profile = self._compute_profile()
        self._unsubs.append(
            async_track_state_change_event(
                self.hass, [self.presence_entity], self._presence_changed
            )
        )
        self._unsubs.append(
            self.hass.bus.async_listen(er.EVENT_ENTITY_REGISTRY_UPDATED, self._registry_updated)
        )
        self._track_climate_entities()
        for entity_id in self.store.rooms:
            self._update_segment(entity_id, dt_util.now())
        self._unsubs.append(async_at_started(self.hass, self._async_at_started))

    async def _async_at_started(self, _hass: HomeAssistant) -> None:
        self._started = True
        self._check_missing_entities()
        await asyncio.gather(
            *(
                self.async_evaluate(entity_id, Reason.STARTUP)
                for entity_id in list(self.store.rooms)
            )
        )

    async def async_stop(self) -> None:
        """Cancel all timers and listeners."""
        for unsub in (
            *self._unsubs,
            *self._timers.values(),
            *self._retries.values(),
        ):
            unsub()
        self._unsubs.clear()
        self._timers.clear()
        self._retries.clear()
        if self._climate_unsub:
            self._climate_unsub()
            self._climate_unsub = None
        if self._presence_debounce:
            self._presence_debounce()
            self._presence_debounce = None

    # ------------------------------------------------------------------
    # Presence

    @property
    def presence_mode(self) -> str:
        """Return the presence mode: auto, home or away."""
        return self.store.presence_mode

    @property
    def detected_home(self) -> bool | None:
        """Return what the presence entity says, None if unknown."""
        return is_home(self.hass.states.get(self.presence_entity))

    def _compute_profile(self) -> str:
        if self.store.presence_mode != PRESENCE_AUTO:
            return self.store.presence_mode
        # Unknown presence is treated as home: better warm than cold.
        return PROFILE_AWAY if self.detected_home is False else PROFILE_HOME

    @callback
    def _presence_changed(self, _event: Event[EventStateChangedData]) -> None:
        if self._presence_debounce:
            self._presence_debounce()
        self._presence_debounce = async_call_later(
            self.hass, PRESENCE_DEBOUNCE, self._presence_settled
        )

    @callback
    def _presence_settled(self, _now: datetime) -> None:
        self._presence_debounce = None
        self._async_update_profile()

    @callback
    def _async_update_profile(self) -> None:
        profile = self._compute_profile()
        if profile != self.profile:
            _LOGGER.debug("Switching to %s schedule", profile)
            self.profile = profile
            for entity_id in list(self.store.rooms):
                self.hass.async_create_task(self.async_evaluate(entity_id, Reason.PRESENCE))
        self._notify()

    async def async_set_presence_mode(self, mode: str) -> None:
        """Set the presence mode (auto follows the presence entity)."""
        self.store.presence_mode = mode
        self.store.async_schedule_runtime_save()
        self._async_update_profile()

    # ------------------------------------------------------------------
    # Evaluating and applying

    async def async_evaluate(self, entity_id: str, reason: Reason) -> None:
        """Work out the current segment of a room and apply it when needed."""
        lock = self._locks.setdefault(entity_id, asyncio.Lock())
        async with lock:
            room = self.store.rooms.get(entity_id)
            if room is None:
                return
            segment = self._update_segment(entity_id, dt_util.now())
            if segment is not None and self._started:
                await self._async_apply(room, segment, reason)
            self._update_overridden(entity_id)
            self._notify()

    def _update_segment(self, entity_id: str, now: datetime) -> Segment | None:
        """Recalculate the current segment and (re)schedule the next transition."""
        if timer := self._timers.pop(entity_id, None):
            timer()
        room = self.store.rooms.get(entity_id)
        if room is None or not room.enabled:
            self.segments.pop(entity_id, None)
            return None
        segment = segment_at(room.week(self.profile), now)
        self.segments[entity_id] = segment
        if segment.end is not None:
            self._timers[entity_id] = async_track_point_in_time(
                self.hass, self._transition_job(entity_id), segment.end
            )
        return segment

    def _transition_job(self, entity_id: str) -> Any:
        @callback
        def _transition(_now: datetime) -> None:
            self._timers.pop(entity_id, None)
            self.hass.async_create_task(self.async_evaluate(entity_id, Reason.TRANSITION))

        return _transition

    async def _async_apply(self, room: RoomSchedule, segment: Segment, reason: Reason) -> None:
        entity_id = room.entity_id
        target = {
            "key": f"{self.profile}|{segment.key}",
            "profile": self.profile,
            "temperature": segment.temperature,
        }
        last = self.store.last_applied.get(entity_id)
        if reason is not Reason.FORCE and last:
            if last["key"] == target["key"]:
                return
            if (
                reason is Reason.EDIT
                and last["profile"] == target["profile"]
                and last["temperature"] == target["temperature"]
            ):
                # The current block was moved but still wants the same
                # temperature: keep any manual change on the thermostat.
                self._remember(entity_id, target)
                return

        if retry := self._retries.pop(entity_id, None):
            retry()
        state = self.hass.states.get(entity_id)
        if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
            _LOGGER.debug("%s is unavailable, applying when it is back", entity_id)
            self.pending.add(entity_id)
            return

        try:
            if await async_apply_temperature(
                self.hass,
                state,
                segment.temperature,
                self.store.unit,
                Context(),
            ):
                self._sent_at[entity_id] = dt_util.utcnow()
        except (HomeAssistantError, vol.Invalid, ValueError) as err:
            _LOGGER.warning("Could not apply schedule to %s: %s", entity_id, err)
            self.errors[entity_id] = str(err)
            self.pending.add(entity_id)
            self._retries[entity_id] = async_call_later(
                self.hass, RETRY_DELAY, self._retry_job(entity_id)
            )
            return

        self.pending.discard(entity_id)
        self.errors.pop(entity_id, None)
        self._remember(entity_id, target)

    def _retry_job(self, entity_id: str) -> Any:
        @callback
        def _retry(_now: datetime) -> None:
            self._retries.pop(entity_id, None)
            self.hass.async_create_task(self.async_evaluate(entity_id, Reason.RETRY))

        return _retry

    def _remember(self, entity_id: str, target: dict[str, Any]) -> None:
        self.store.last_applied[entity_id] = target
        self.store.async_schedule_runtime_save()

    # ------------------------------------------------------------------
    # Climate entity tracking

    def _track_climate_entities(self) -> None:
        if self._climate_unsub:
            self._climate_unsub()
            self._climate_unsub = None
        if self.store.rooms:
            self._climate_unsub = async_track_state_change_event(
                self.hass, list(self.store.rooms), self._climate_changed
            )

    @callback
    def _climate_changed(self, event: Event[EventStateChangedData]) -> None:
        entity_id = event.data["entity_id"]
        new_state = event.data["new_state"]
        if (
            entity_id in self.pending
            and new_state is not None
            and new_state.state not in (STATE_UNAVAILABLE, STATE_UNKNOWN)
        ):
            self.hass.async_create_task(self.async_evaluate(entity_id, Reason.RETRY))
        elif self._update_overridden(entity_id):
            self._notify()

    def _update_overridden(self, entity_id: str) -> bool:
        """Check whether a room was changed by hand; return whether that changed."""
        was_overridden = entity_id in self.overridden
        if self._is_overridden(entity_id):
            self.overridden.add(entity_id)
        else:
            self.overridden.discard(entity_id)
        return was_overridden != (entity_id in self.overridden)

    def _is_overridden(self, entity_id: str) -> bool:
        """Return whether the thermostat no longer follows the block it was set to."""
        segment = self.segments.get(entity_id)
        last = self.store.last_applied.get(entity_id)
        state = self.hass.states.get(entity_id)
        sent_at = self._sent_at.get(entity_id)
        return (
            self._started
            and segment is not None
            and entity_id not in self.pending
            and last is not None
            and last["key"] == f"{self.profile}|{segment.key}"
            and state is not None
            and state.state not in (STATE_UNAVAILABLE, STATE_UNKNOWN)
            # Cloud thermostats can report the new setpoint a while after the
            # command: only a state reported since then counts as a change.
            and (sent_at is None or state.last_updated >= sent_at)
            and not follows_temperature(state, segment.temperature, self.store.unit)
        )

    # ------------------------------------------------------------------
    # Room management (used by the panel and services)

    def _require_room(self, entity_id: str) -> RoomSchedule:
        if (room := self.store.rooms.get(entity_id)) is None:
            raise RoomNotFoundError(entity_id)
        return room

    async def async_add_room(self, entity_id: str) -> RoomSchedule:
        """Start scheduling a climate entity with the default schedule."""
        if entity_id in self.store.rooms:
            return self.store.rooms[entity_id]
        room = default_room(entity_id, self.store.unit)
        self._set_room(room)
        await self.async_evaluate(entity_id, Reason.EDIT)
        return room

    async def async_remove_room(self, entity_id: str) -> None:
        """Stop scheduling a climate entity and forget its schedule."""
        self._require_room(entity_id)
        del self.store.rooms[entity_id]
        for timers in (self._timers, self._retries):
            if unsub := timers.pop(entity_id, None):
                unsub()
        self.segments.pop(entity_id, None)
        self.store.last_applied.pop(entity_id, None)
        self.pending.discard(entity_id)
        self.overridden.discard(entity_id)
        self._sent_at.pop(entity_id, None)
        self.errors.pop(entity_id, None)
        self.store.async_schedule_save()
        self.store.async_schedule_runtime_save()
        self._track_climate_entities()
        ir.async_delete_issue(self.hass, DOMAIN, f"entity_missing_{entity_id}")
        async_dispatcher_send(self.hass, SIGNAL_ROOM_REMOVED.format(entity_id))
        self._notify()

    async def async_update_room(
        self,
        entity_id: str,
        *,
        enabled: bool | None = None,
        home: WeekSchedule | None = None,
        away: WeekSchedule | None = None,
    ) -> RoomSchedule:
        """Change a room's schedule and/or enabled flag."""
        room = self._require_room(entity_id)
        was_enabled = room.enabled
        if enabled is not None:
            room.enabled = enabled
        if home is not None:
            room.home = home
        if away is not None:
            room.away = away
        self.store.async_schedule_save()
        if room.enabled and not was_enabled:
            await self.async_evaluate(entity_id, Reason.FORCE)
        else:
            await self.async_evaluate(entity_id, Reason.EDIT)
        return room

    async def async_set_room(self, room: RoomSchedule) -> None:
        """Create or replace a room schedule."""
        existing = self.store.rooms.get(room.entity_id)
        if existing is None:
            self._set_room(room)
            await self.async_evaluate(room.entity_id, Reason.EDIT)
            return
        await self.async_update_room(
            room.entity_id, enabled=room.enabled, home=room.home, away=room.away
        )

    async def async_copy_room(self, source: str, targets: list[str]) -> None:
        """Copy the home and away schedule of one room to other rooms."""
        room = self._require_room(source)
        for target in targets:
            if target == source:
                continue
            existing = self.store.rooms.get(target)
            await self.async_set_room(
                RoomSchedule(
                    entity_id=target,
                    enabled=existing.enabled if existing else True,
                    home=deepcopy(room.home),
                    away=deepcopy(room.away),
                )
            )

    async def async_resume(self, entity_id: str) -> None:
        """Re-apply the current block now, overriding manual changes."""
        self._require_room(entity_id)
        await self.async_evaluate(entity_id, Reason.FORCE)

    def _set_room(self, room: RoomSchedule) -> None:
        self.store.rooms[room.entity_id] = room
        self.store.async_schedule_save()
        self._track_climate_entities()
        async_dispatcher_send(self.hass, SIGNAL_ROOM_ADDED, room.entity_id)

    # ------------------------------------------------------------------
    # Entity registry: renamed or removed climate entities

    @callback
    def _registry_updated(self, event: Event[er.EventEntityRegistryUpdatedData]) -> None:
        data = event.data
        entity_id = data["entity_id"]
        if data["action"] == "update" and (old := data.get("old_entity_id")):
            if old in self.store.rooms:
                self._rename_room(old, entity_id)
        elif data["action"] == "remove" and entity_id in self.store.rooms:
            self._create_missing_issue(entity_id)
        elif data["action"] == "create":
            ir.async_delete_issue(self.hass, DOMAIN, f"entity_missing_{entity_id}")

    def _rename_room(self, old: str, new: str) -> None:
        _LOGGER.info("Climate entity %s was renamed to %s", old, new)
        room = self.store.rooms.pop(old)
        room.entity_id = new
        self.store.rooms[new] = room
        if last := self.store.last_applied.pop(old, None):
            self.store.last_applied[new] = last
        self.store.async_schedule_save()
        self.store.async_schedule_runtime_save()
        # Entities and listeners are keyed on the entity id: start over.
        self.hass.config_entries.async_schedule_reload(self.entry.entry_id)

    def _check_missing_entities(self) -> None:
        registry = er.async_get(self.hass)
        for entity_id in self.store.rooms:
            if self.hass.states.get(entity_id) is None and registry.async_get(entity_id) is None:
                self._create_missing_issue(entity_id)

    def _create_missing_issue(self, entity_id: str) -> None:
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            f"entity_missing_{entity_id}",
            is_fixable=True,
            severity=ir.IssueSeverity.WARNING,
            translation_key="entity_missing",
            translation_placeholders={"entity_id": entity_id},
            data={"entity_id": entity_id},
        )

    # ------------------------------------------------------------------
    # State for entities and the panel

    def room_status(self, entity_id: str) -> dict[str, Any]:
        """Return the live status of a room."""
        segment = self.segments.get(entity_id)
        return {
            "profile": self.profile,
            "temperature": segment.temperature if segment else None,
            "start": segment.start.isoformat() if segment and segment.start else None,
            "end": segment.end.isoformat() if segment and segment.end else None,
            "next_temperature": segment.next_temperature if segment and segment.end else None,
            "pending": entity_id in self.pending,
            "overridden": entity_id in self.overridden,
            "last_error": self.errors.get(entity_id),
        }

    def as_dict(self) -> dict[str, Any]:
        """Return everything the panel needs."""
        return {
            "unit": self.store.unit,
            "presence": {
                "mode": self.presence_mode,
                "profile": self.profile,
                "entity_id": self.presence_entity,
                "detected_home": self.detected_home,
            },
            "rooms": [
                {**room.as_dict(), "status": self.room_status(entity_id)}
                for entity_id, room in self.store.rooms.items()
            ],
        }

    @callback
    def _notify(self) -> None:
        async_dispatcher_send(self.hass, SIGNAL_UPDATED)


class RoomNotFoundError(ServiceValidationError):
    """Raised when a climate entity has no schedule."""

    def __init__(self, entity_id: str) -> None:
        """Initialize the error."""
        super().__init__(
            translation_domain=DOMAIN,
            translation_key="room_not_found",
            translation_placeholders={"entity_id": entity_id},
        )
