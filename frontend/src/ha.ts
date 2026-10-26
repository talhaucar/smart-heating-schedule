/** Helpers for living inside the Home Assistant frontend. */
import type { HassEntity, HomeAssistant } from "./types";

export const fireEvent = (node: EventTarget, type: string, detail?: unknown): void => {
  node.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
};

/** Navigate inside Home Assistant without reloading the page. */
export const navigate = (path: string, replace = false): void => {
  if (replace) history.replaceState(null, "", path);
  else history.pushState(null, "", path);
  fireEvent(window, "location-changed", { replace });
};

/** Show a toast at the bottom of the screen, like Home Assistant does. */
export const showToast = (node: EventTarget, message: string): void => {
  fireEvent(node, "hass-notification", { message });
};

let loading: Promise<void> | undefined;

/**
 * Home Assistant loads most of its elements lazily. Creating a card makes it
 * load ha-card, ha-switch, ha-icon-button and friends, so the panel can use
 * them even when it is the first page that is opened.
 */
export const ensureHaElements = (): Promise<void> => {
  loading ??= (async () => {
    if (customElements.get("ha-card") && customElements.get("ha-switch")) return;
    const loadCardHelpers = (window as any).loadCardHelpers as (() => Promise<any>) | undefined;
    if (!loadCardHelpers) return;
    try {
      const helpers = await loadCardHelpers();
      helpers.createCardElement({ type: "entities", entities: [] });
      // A toggle row pulls in ha-switch.
      helpers.createRowElement?.({ entity: "input_boolean.smart_heating_schedule_preload" });
      await Promise.race([
        Promise.all(["ha-card", "ha-switch", "ha-icon-button"].map((tag) => customElements.whenDefined(tag))),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
    } catch {
      // The panel has CSS fallbacks for anything that did not load.
    }
  })();
  return loading;
};

/** The name of a climate entity as Home Assistant shows it. */
export const entityName = (hass: HomeAssistant, entityId: string): string => {
  const friendlyName = hass.states[entityId]?.attributes.friendly_name;
  if (friendlyName) return friendlyName;
  const deviceId = hass.entities?.[entityId]?.device_id;
  const device = deviceId ? hass.devices?.[deviceId] : undefined;
  return device?.name_by_user || device?.name || entityId;
};

export const areaName = (hass: HomeAssistant, entityId: string): string | undefined => {
  const entry = hass.entities?.[entityId];
  const areaId = entry?.area_id ?? (entry?.device_id ? hass.devices?.[entry.device_id]?.area_id : undefined);
  return areaId ? hass.areas?.[areaId]?.name : undefined;
};

export const canTurnOff = (stateObj: HassEntity | undefined): boolean =>
  !stateObj || (stateObj.attributes.hvac_modes ?? []).includes("off");

/**
 * Like Lit's @customElement, but skips names that are already defined. After
 * an update Home Assistant can load the new panel bundle into a page that
 * still has the old one, and defining an element twice would throw.
 */
export const safeCustomElement =
  (name: string) =>
  (cls: CustomElementConstructor): void => {
    if (!customElements.get(name)) customElements.define(name, cls);
  };
