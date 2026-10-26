import { mdiArrowLeft, mdiCalendarExport, mdiDeleteOutline, mdiHome, mdiWalk } from "@mdi/js";
import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

import { copyRoom, removeRoom, saveRoom } from "../api";
import "../components/day-card";
import "../components/dialog";
import "../components/segment-control";
import "../dialogs/block-dialog";
import "../dialogs/entity-picker-dialog";
import { firstWeekday, uses12h, weekdayName, zonedTime } from "../format";
import { canTurnOff, entityName, navigate, safeCustomElement, showToast } from "../ha";
import type { Localize } from "../localize";
import { orderedDays, WEEKDAYS, withDay } from "../schedule";
import { roomStatusText } from "../status";
import { renderSwitch, sharedStyles, toolbarStyles } from "../styles";
import { limitsFor } from "../temperature";
import type { Block, HomeAssistant, PanelState, Profile, Room, WeekSchedule } from "../types";

/** Days copied with the copy button; shared by all rooms and profiles, like Tado. */
let clipboard: Block[] | null = null;

/** The schedule of one room, laid out like Tado's smart schedule screen. */
@safeCustomElement("shs-room-view")
export class RoomView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) state!: PanelState;
  @property({ attribute: false }) room!: Room;
  @property() prefix = "";
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) localize!: Localize;

  @state() private _profile: Profile = "home";
  @state() private _expanded = new Set<string>();
  @state() private _optimistic: Partial<Record<Profile, WeekSchedule>> = {};
  @state() private _canPaste = clipboard !== null;
  @state() private _blockDialog: { day: string; index: number | null } | null = null;
  @state() private _copyOpen = false;
  @state() private _removeOpen = false;

  private _initialized = false;

  protected willUpdate(changed: PropertyValues) {
    if (changed.has("room")) {
      // Fresh data from the server replaces optimistic edits.
      this._optimistic = {};
      if (!this._initialized) {
        this._initialized = true;
        this._expanded = new Set([this._today]);
      }
    }
  }

  private get _week(): WeekSchedule {
    return this._optimistic[this._profile] ?? this.room[this._profile];
  }

  private get _readOnly() {
    return !this.hass.user?.is_admin;
  }

  private get _now() {
    return zonedTime(new Date(), this.hass.config.time_zone);
  }

  private get _today(): string {
    return WEEKDAYS[this._now.weekday];
  }

  private _dayLabel(day: string): string {
    return weekdayName(this.hass.locale.language, WEEKDAYS.indexOf(day as (typeof WEEKDAYS)[number]));
  }

  private async _save(data: { enabled?: boolean } & Partial<Record<Profile, WeekSchedule>>) {
    const profiles = (["home", "away"] as Profile[]).filter((profile) => data[profile]);
    this._optimistic = { ...this._optimistic, ...Object.fromEntries(profiles.map((p) => [p, data[p]])) };
    try {
      await saveRoom(this.hass, this.room.entity_id, data);
    } catch (err: any) {
      this._optimistic = {};
      showToast(this, this.localize("error.save", { error: err?.message ?? String(err) }));
    }
  }

  private _saveWeek(week: WeekSchedule) {
    return this._save({ [this._profile]: week });
  }

  private _toggle(day: string) {
    const expanded = new Set(this._expanded);
    if (expanded.has(day)) expanded.delete(day);
    else expanded.add(day);
    this._expanded = expanded;
  }

  private _copyDay(blocks: Block[]) {
    clipboard = blocks.map((block) => ({ ...block }));
    this._canPaste = true;
    showToast(this, this.localize("room.copied"));
  }

  private async _copyToRooms(targets: string[]) {
    this._copyOpen = false;
    try {
      await copyRoom(this.hass, this.room.entity_id, targets);
    } catch (err: any) {
      showToast(this, this.localize("error.save", { error: err?.message ?? String(err) }));
    }
  }

  private async _remove() {
    this._removeOpen = false;
    try {
      await removeRoom(this.hass, this.room.entity_id);
      navigate(this.prefix, true);
    } catch (err: any) {
      showToast(this, this.localize("error.save", { error: err?.message ?? String(err) }));
    }
  }

  protected render() {
    const stateObj = this.hass.states[this.room.entity_id];
    const unit = this.state.unit;
    const limits = limitsFor(stateObj, unit);
    const h12 = uses12h(this.hass);
    const language = this.hass.locale.language;
    const week = this._week;
    const now = this._now;
    const today = this._today;
    const name = entityName(this.hass, this.room.entity_id);
    const status = roomStatusText(this.room, this.localize, {
      unit,
      step: limits.step,
      h12,
      language,
      timeZone: this.hass.config.time_zone,
    });
    const readOnly = this._readOnly;
    const dialogBlocks = this._blockDialog ? week.days[this._blockDialog.day] : [];

    return html`
      <div class="toolbar">
        <ha-icon-button
          .path=${mdiArrowLeft}
          .label=${this.localize("room.back")}
          @click=${() => navigate(this.prefix)}
        ></ha-icon-button>
        <div class="title">${name}</div>
        ${readOnly
          ? nothing
          : html`<ha-icon-button
                .path=${mdiCalendarExport}
                .label=${this.localize("room.copy_rooms")}
                @click=${() => (this._copyOpen = true)}
              ></ha-icon-button>
              <ha-icon-button
                .path=${mdiDeleteOutline}
                .label=${this.localize("room.remove")}
                @click=${() => (this._removeOpen = true)}
              ></ha-icon-button>`}
      </div>

      <div class="content">
        <ha-card class="summary">
          <div class="summary-row">
            <div>
              <div class="summary-title">${this.localize("room.enabled")}</div>
              <div class="${status.error ? "error" : "secondary"}">${status.text}</div>
            </div>
            ${renderSwitch(
              this.room.enabled,
              (enabled) => this._save({ enabled }),
              this.localize("room.enabled"),
              readOnly,
            )}
          </div>
        </ha-card>
        ${readOnly ? html`<p class="secondary notice">${this.localize("read_only")}</p>` : nothing}

        <shs-segment-control
          .label=${this.localize("presence.label")}
          .value=${this._profile}
          .options=${[
            { value: "home", label: this.localize("presence.home"), icon: mdiHome },
            { value: "away", label: this.localize("presence.away"), icon: mdiWalk },
          ]}
          @value-changed=${(ev: CustomEvent) => {
            this._profile = ev.detail.value;
            this._expanded = new Set([this._today]);
          }}
        ></shs-segment-control>

        ${orderedDays(firstWeekday(this.hass)).map((day) => {
          const blocks = week.days[day];
          return html`<shs-day-card
            .heading=${this._dayLabel(day)}
            .blocks=${blocks}
            .unit=${unit}
            .step=${limits.step}
            .language=${language}
            .h12=${h12}
            .expanded=${this._expanded.has(day)}
            .readOnly=${readOnly}
            .canPaste=${this._canPaste}
            .now=${day === today && this._profile === this.state.presence.profile ? now.minutes : null}
            .localize=${this.localize}
            @toggle=${() => this._toggle(day)}
            @edit-block=${(ev: CustomEvent) => (this._blockDialog = { day, index: ev.detail.index })}
            @add-block=${() => (this._blockDialog = { day, index: null })}
            @copy-day=${() => this._copyDay(blocks)}
            @paste-day=${() => clipboard && this._saveWeek(withDay(week, day, clipboard))}
          ></shs-day-card>`;
        })}
      </div>

      <shs-block-dialog
        .open=${this._blockDialog !== null}
        .blocks=${dialogBlocks}
        .index=${this._blockDialog?.index ?? null}
        .unit=${unit}
        .limits=${limits}
        .canTurnOff=${canTurnOff(stateObj)}
        .h12=${h12}
        .language=${language}
        .localize=${this.localize}
        @closed=${() => (this._blockDialog = null)}
        @save=${(ev: CustomEvent) => {
          const day = this._blockDialog!.day;
          this._blockDialog = null;
          this._saveWeek(withDay(week, day, ev.detail.blocks));
        }}
      ></shs-block-dialog>

      <shs-entity-picker-dialog
        multiple
        .hass=${this.hass}
        .open=${this._copyOpen}
        .heading=${this.localize("copy.title")}
        .description=${this.localize("copy.text", { name })}
        .emptyText=${this.localize("copy.nothing")}
        .confirmLabel=${this.localize("common.copy")}
        .entityIds=${Object.keys(this.hass.states).filter(
          (id) => id.startsWith("climate.") && id !== this.room.entity_id,
        )}
        .localize=${this.localize}
        @closed=${() => (this._copyOpen = false)}
        @picked=${(ev: CustomEvent) => this._copyToRooms(ev.detail.entityIds)}
      ></shs-entity-picker-dialog>

      <shs-dialog
        .open=${this._removeOpen}
        .heading=${this.localize("room.remove")}
        @closed=${() => (this._removeOpen = false)}
      >
        <p>${this.localize("room.remove_text", { name })}</p>
        <button slot="actions" class="text-button" @click=${() => (this._removeOpen = false)}>
          ${this.localize("common.cancel")}
        </button>
        <button slot="actions" class="filled-button danger" @click=${this._remove}>
          ${this.localize("common.remove")}
        </button>
      </shs-dialog>
    `;
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
        max-width: 600px;
        padding: 16px 16px 32px;
      }
      .summary {
        padding: 16px;
      }
      .summary-row {
        align-items: center;
        display: flex;
        gap: 16px;
        justify-content: space-between;
      }
      .summary-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 2px;
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
    "shs-room-view": RoomView;
  }
}
