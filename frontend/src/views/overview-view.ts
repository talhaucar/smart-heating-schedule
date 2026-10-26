import { mdiFire, mdiHome, mdiMapMarkerRadius, mdiMenu, mdiPlus, mdiThermostat, mdiWalk } from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { addRoom, saveRoom, setPresenceMode } from "../api";
import "../components/schedule-bar";
import "../components/segment-control";
import "../dialogs/entity-picker-dialog";
import { uses12h, zonedTime } from "../format";
import { areaName, entityName, fireEvent, navigate, safeCustomElement, showToast } from "../ha";
import type { Localize } from "../localize";
import { blocksForWeekday } from "../schedule";
import { roomStatusText } from "../status";
import { renderSwitch, sharedStyles, toolbarStyles } from "../styles";
import { formatTemperature, limitsFor } from "../temperature";
import type { HomeAssistant, PanelState, PresenceMode, Room } from "../types";

/** All scheduled thermostats with today's timeline, plus the Home/Away control. */
@safeCustomElement("shs-overview-view")
export class OverviewView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) state!: PanelState;
  @property() prefix = "";
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) localize!: Localize;

  @state() private _addOpen = false;

  private get _readOnly() {
    return !this.hass.user?.is_admin;
  }

  private async _call(promise: Promise<unknown>) {
    try {
      await promise;
    } catch (err: any) {
      showToast(this, this.localize("error.save", { error: err?.message ?? String(err) }));
    }
  }

  private async _add(entityId: string) {
    this._addOpen = false;
    try {
      await addRoom(this.hass, entityId);
      navigate(`${this.prefix}/room/${entityId}`);
    } catch (err: any) {
      showToast(this, this.localize("error.save", { error: err?.message ?? String(err) }));
    }
  }

  private _presenceText(): string {
    const { presence } = this.state;
    if (presence.mode !== "auto") return this.localize("presence.forced");
    if (presence.detected_home === null) return this.localize("presence.detected_unknown");
    return this.localize(presence.detected_home ? "presence.detected_home" : "presence.detected_away");
  }

  protected render() {
    const showMenu = this.narrow || this.hass.dockedSidebar === "always_hidden";
    const scheduled = new Set(this.state.rooms.map((room) => room.entity_id));
    const available = Object.keys(this.hass.states).filter(
      (id) => id.startsWith("climate.") && !scheduled.has(id),
    );
    return html`
      <div class="toolbar">
        ${showMenu
          ? html`<ha-icon-button
              .path=${mdiMenu}
              .label=${"Menu"}
              @click=${() => fireEvent(this, "hass-toggle-menu")}
            ></ha-icon-button>`
          : nothing}
        <div class="title">${this.localize("title")}</div>
      </div>

      <div class="content">
        <ha-card class="presence">
          <div class="presence-header">
            <h2>${this.localize("presence.label")}</h2>
            <span class="secondary">${this._presenceText()}</span>
          </div>
          <shs-segment-control
            .label=${this.localize("presence.label")}
            .value=${this.state.presence.mode}
            .disabled=${this._readOnly}
            .options=${[
              { value: "auto", label: this.localize("presence.auto"), icon: mdiMapMarkerRadius },
              { value: "home", label: this.localize("presence.home"), icon: mdiHome },
              { value: "away", label: this.localize("presence.away"), icon: mdiWalk },
            ]}
            @value-changed=${(ev: CustomEvent) =>
              this._call(setPresenceMode(this.hass, ev.detail.value as PresenceMode))}
          ></shs-segment-control>
        </ha-card>

        ${this.state.rooms.length
          ? html`<div class="rooms">${this.state.rooms.map((room) => this._renderRoom(room))}</div>`
          : html`<ha-card class="empty">
              <ha-svg-icon .path=${mdiThermostat}></ha-svg-icon>
              <h2>${this.localize("overview.empty_title")}</h2>
              <p class="secondary">${this.localize("overview.empty_text")}</p>
            </ha-card>`}
        ${this._readOnly
          ? html`<p class="secondary notice">${this.localize("read_only")}</p>`
          : html`<div class="add">
              <button class="filled-button" @click=${() => (this._addOpen = true)}>
                <ha-svg-icon .path=${mdiPlus}></ha-svg-icon>${this.localize("overview.add")}
              </button>
            </div>`}
      </div>

      <shs-entity-picker-dialog
        .hass=${this.hass}
        .open=${this._addOpen}
        .heading=${this.localize("overview.choose")}
        .emptyText=${this.localize("overview.no_thermostats")}
        .entityIds=${available}
        .localize=${this.localize}
        @closed=${() => (this._addOpen = false)}
        @picked=${(ev: CustomEvent) => this._add(ev.detail.entityIds[0])}
      ></shs-entity-picker-dialog>
    `;
  }

  private _renderRoom(room: Room) {
    const stateObj = this.hass.states[room.entity_id];
    const unit = this.state.unit;
    const limits = limitsFor(stateObj, unit);
    const language = this.hass.locale.language;
    const h12 = uses12h(this.hass);
    const now = zonedTime(new Date(), this.hass.config.time_zone);
    const week = room[this.state.presence.profile];
    const blocks = blocksForWeekday(week, now.weekday);
    const status = roomStatusText(room, this.localize, {
      unit,
      step: limits.step,
      h12,
      language,
      timeZone: this.hass.config.time_zone,
    });
    const current = stateObj?.attributes.current_temperature;
    const target = stateObj?.attributes.temperature;
    const heating = stateObj?.attributes.hvac_action === "heating";
    const area = areaName(this.hass, room.entity_id);
    const open = () => navigate(`${this.prefix}/room/${room.entity_id}`);

    return html`<ha-card class="room ${room.enabled ? "" : "disabled"}">
      <div class="room-header">
        <button class="room-title" @click=${open}>
          <span class="name">${entityName(this.hass, room.entity_id)}</span>
          ${area ? html`<span class="secondary area">${area}</span>` : nothing}
        </button>
        ${renderSwitch(
          room.enabled,
          (enabled) => this._call(saveRoom(this.hass, room.entity_id, { enabled })),
          this.localize("room.enabled"),
          this._readOnly,
        )}
      </div>
      <button class="room-body" @click=${open} aria-label=${entityName(this.hass, room.entity_id)}>
        <div class="climate">
          ${typeof current === "number"
            ? html`<span class="current">${formatTemperature(current, unit, 0.1, false, language)}</span>`
            : nothing}
          ${stateObj && stateObj.state !== "unavailable"
            ? html`<span class="secondary target">
                ${heating ? html`<ha-svg-icon class="flame" .path=${mdiFire}></ha-svg-icon>` : nothing}
                ${stateObj.state === "off"
                  ? this.localize("room.off")
                  : typeof target === "number"
                    ? formatTemperature(target, unit, limits.step, false, language)
                    : typeof stateObj.attributes.target_temp_low === "number"
                      ? `${formatTemperature(stateObj.attributes.target_temp_low, unit, limits.step, false, language)} – ${formatTemperature(stateObj.attributes.target_temp_high, unit, limits.step, false, language)}`
                      : nothing}
              </span>`
            : html`<span class="secondary">${this.hass.states[room.entity_id]?.state ?? "—"}</span>`}
        </div>
        <shs-schedule-bar
          .blocks=${blocks}
          .unit=${unit}
          .step=${limits.step}
          .language=${language}
          .offLabel=${this.localize("room.off")}
          .h12=${h12}
          .now=${room.enabled ? now.minutes : null}
        ></shs-schedule-bar>
        <div class="status ${status.error ? "error" : "secondary"}">${status.text}</div>
      </button>
    </ha-card>`;
  }

  static styles = [
    sharedStyles,
    toolbarStyles,
    css`
      :host {
        display: block;
      }
      .content {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 0 auto;
        max-width: 1200px;
        padding: 16px 16px 32px;
      }
      h2 {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
      }
      .presence {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }
      .presence-header {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .presence shs-segment-control {
        max-width: 480px;
      }
      .rooms {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      }
      .room {
        display: flex;
        flex-direction: column;
        padding: 12px 16px 16px;
      }
      .room.disabled shs-schedule-bar {
        opacity: 0.45;
      }
      .room-header {
        align-items: center;
        display: flex;
        gap: 8px;
        justify-content: space-between;
      }
      .room-title,
      .room-body {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font: inherit;
        padding: 0;
        text-align: start;
      }
      .room-title {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0;
        padding: 4px 0;
      }
      .room-title:focus-visible,
      .room-body:focus-visible {
        border-radius: 4px;
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
      }
      .name {
        font-size: 18px;
        font-weight: 500;
      }
      .area {
        font-size: 13px;
      }
      .room-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .climate {
        align-items: baseline;
        display: flex;
        gap: 12px;
        margin-top: 4px;
      }
      .current {
        font-size: 32px;
        font-weight: 400;
      }
      .target {
        align-items: center;
        display: inline-flex;
        gap: 4px;
        font-size: 16px;
      }
      .flame {
        color: var(--state-climate-heat-color, #ff8100);
        --mdc-icon-size: 18px;
      }
      .status {
        font-size: 14px;
      }
      .empty {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 32px 16px;
        text-align: center;
      }
      .empty ha-svg-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 48px;
      }
      .empty p {
        margin: 0;
      }
      .add {
        display: flex;
        justify-content: center;
      }
      .add .filled-button {
        align-items: center;
        display: inline-flex;
        gap: 8px;
      }
      .notice {
        margin: 0;
        text-align: center;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-overview-view": OverviewView;
  }
}
