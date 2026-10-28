import { DOMAIN, type HomeAssistant, type PanelState, type PresenceMode, type WeekSchedule } from "./types";

export const subscribeState = (
  hass: HomeAssistant,
  callback: (state: PanelState) => void,
): Promise<() => void> => hass.connection.subscribeMessage(callback, { type: `${DOMAIN}/subscribe` });

export const addRoom = (hass: HomeAssistant, entityId: string) =>
  hass.callWS({ type: `${DOMAIN}/room/add`, entity_id: entityId });

export const removeRoom = (hass: HomeAssistant, entityId: string) =>
  hass.callWS({ type: `${DOMAIN}/room/remove`, entity_id: entityId });

export const saveRoom = (
  hass: HomeAssistant,
  entityId: string,
  data: { enabled?: boolean; home?: WeekSchedule; away?: WeekSchedule },
) => hass.callWS({ type: `${DOMAIN}/room/save`, entity_id: entityId, ...data });

export const copyRoom = (hass: HomeAssistant, entityId: string, targets: string[]) =>
  hass.callWS({ type: `${DOMAIN}/room/copy`, entity_id: entityId, targets });

/** Undo manual changes: set the thermostat back to the current block. */
export const resumeRoom = (hass: HomeAssistant, entityId: string) =>
  hass.callWS({ type: `${DOMAIN}/room/resume`, entity_id: entityId });

export const setPresenceMode = (hass: HomeAssistant, mode: PresenceMode) =>
  hass.callWS({ type: `${DOMAIN}/presence/set`, mode });
