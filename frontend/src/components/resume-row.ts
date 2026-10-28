import { mdiCalendarSync } from "@mdi/js";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

import { resumeRoom } from "../api";
import { safeCustomElement, showToast } from "../ha";
import type { Localize } from "../localize";
import { sharedStyles } from "../styles";
import type { HomeAssistant } from "../types";

/** Shown when a thermostat was changed by hand: sets it back to the schedule. */
@safeCustomElement("shs-resume-row")
export class ResumeRow extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() entityId = "";
  @property({ attribute: false }) localize!: Localize;

  @state() private _busy = false;

  private async _resume() {
    this._busy = true;
    try {
      await resumeRoom(this.hass, this.entityId);
    } catch (err: any) {
      showToast(this, this.localize("error.resume", { error: err?.message ?? String(err) }));
    } finally {
      this._busy = false;
    }
  }

  protected render() {
    return html`
      <span class="secondary">${this.localize("room.overridden")}</span>
      <button class="text-button" ?disabled=${this._busy} @click=${this._resume}>
        <ha-svg-icon .path=${mdiCalendarSync}></ha-svg-icon>${this.localize("room.resume")}
      </button>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 4px 8px;
        justify-content: space-between;
      }
      .secondary {
        font-size: 14px;
      }
      .text-button {
        align-items: center;
        display: inline-flex;
        gap: 6px;
        margin-inline-end: -10px;
      }
      ha-svg-icon {
        --mdc-icon-size: 18px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-resume-row": ResumeRow;
  }
}
