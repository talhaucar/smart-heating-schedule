import { mdiChevronDown, mdiChevronRight, mdiChevronUp, mdiContentCopy, mdiContentPaste } from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { temperatureColor } from "../colors";
import { formatMinutes } from "../format";
import { fireEvent, safeCustomElement } from "../ha";
import type { Localize } from "../localize";
import { toSegments } from "../schedule";
import { sharedStyles } from "../styles";
import { formatTemperature } from "../temperature";
import type { Block } from "../types";
import "./schedule-bar";

/**
 * One day of a schedule: a title and timeline, which
 * expands into the list of time blocks with copy, paste and add actions.
 *
 * Events: toggle, edit-block ({index}), add-block, copy-day, paste-day.
 */
@safeCustomElement("shs-day-card")
export class DayCard extends LitElement {
  @property() heading = "";
  @property({ attribute: false }) blocks: Block[] = [];
  @property() unit = "°C";
  @property({ type: Number }) step = 0.5;
  @property() language = "en";
  @property({ type: Boolean }) h12 = false;
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: Boolean }) readOnly = false;
  @property({ type: Boolean }) canPaste = false;
  @property({ attribute: false }) now: number | null = null;
  @property({ attribute: false }) localize!: Localize;

  protected render() {
    const id = "day-" + this.heading.replace(/\W/g, "");
    return html`
      <ha-card>
        <button
          class="header"
          aria-expanded=${this.expanded}
          aria-controls="${id}-blocks"
          @click=${() => fireEvent(this, "toggle")}
        >
          <h2>${this.heading}</h2>
          <ha-svg-icon .path=${this.expanded ? mdiChevronUp : mdiChevronDown}></ha-svg-icon>
        </button>
        <shs-schedule-bar
          .blocks=${this.blocks}
          .unit=${this.unit}
          .step=${this.step}
          .language=${this.language}
          .offLabel=${this.localize("room.off")}
          .h12=${this.h12}
          .now=${this.now}
        ></shs-schedule-bar>
        ${this.expanded ? this._renderBlocks(id) : nothing}
        ${this.readOnly ? nothing : this._renderActions()}
      </ha-card>
    `;
  }

  private _renderBlocks(id: string) {
    const segments = toSegments(this.blocks);
    return html`<ul class="blocks" id="${id}-blocks">
      ${segments.map((segment, index) => {
        const times = `${formatMinutes(segment.start, this.h12)} - ${formatMinutes(segment.end, this.h12)}`;
        const temperature =
          segment.temperature === null
            ? this.localize("room.off")
            : formatTemperature(segment.temperature, this.unit, this.step, true, this.language);
        return html`<li>
          <button
            class="block"
            style="--block-color:${temperatureColor(segment.temperature, this.unit)}"
            ?disabled=${this.readOnly}
            @click=${() => fireEvent(this, "edit-block", { index })}
          >
            <span class="details">
              <span class="times">${times}</span>
              <span class="temperature">${temperature}</span>
            </span>
            ${this.readOnly ? nothing : html`<ha-svg-icon .path=${mdiChevronRight}></ha-svg-icon>`}
          </button>
        </li>`;
      })}
    </ul>`;
  }

  private _renderActions() {
    return html`<div class="actions">
      <ha-icon-button
        class="primary"
        .path=${mdiContentCopy}
        .label=${this.localize("room.copy_day")}
        @click=${() => fireEvent(this, "copy-day")}
      ></ha-icon-button>
      <ha-icon-button
        class="primary"
        .path=${mdiContentPaste}
        .label=${this.localize("room.paste_day")}
        ?disabled=${!this.canPaste}
        @click=${() => fireEvent(this, "paste-day")}
      ></ha-icon-button>
      <span class="spacer"></span>
      <button class="text-button" @click=${() => fireEvent(this, "add-block")}>
        ${this.localize("room.add_block")}
      </button>
    </div>`;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      ha-card {
        padding: 4px 16px 8px;
      }
      .header {
        align-items: center;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        font: inherit;
        justify-content: space-between;
        padding: 12px 0;
        text-align: start;
        width: 100%;
      }
      .header:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        border-radius: 4px;
      }
      h2 {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
      }
      .header ha-svg-icon {
        color: var(--secondary-text-color);
      }
      .blocks {
        display: flex;
        flex-direction: column;
        gap: 8px;
        list-style: none;
        margin: 16px 0 0;
        padding: 0;
      }
      .block {
        align-items: center;
        background: color-mix(
          in srgb,
          var(--block-color) var(--shs-block-list-mix, 16%),
          var(--ha-card-background, var(--card-background-color, #fff))
        );
        border: none;
        border-inline-start: 4px solid var(--block-color);
        border-radius: 8px;
        color: inherit;
        cursor: pointer;
        display: flex;
        font: inherit;
        padding: 14px 12px 14px 16px;
        text-align: start;
        width: 100%;
      }
      .block[disabled] {
        cursor: default;
      }
      .block:focus-visible {
        outline: 2px solid var(--primary-color);
      }
      .details {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 4px;
      }
      .times {
        font-size: 17px;
        font-variant-numeric: tabular-nums;
        font-weight: 600;
      }
      .temperature {
        color: var(--secondary-text-color);
        font-size: 15px;
      }
      .block ha-svg-icon {
        color: var(--secondary-text-color);
      }
      .actions {
        align-items: center;
        border-top: 1px solid var(--divider-color);
        display: flex;
        margin-top: 16px;
        padding-top: 4px;
      }
      .actions ha-icon-button {
        margin-inline-start: -8px;
        margin-inline-end: 8px;
      }
      .spacer {
        flex: 1;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-day-card": DayCard;
  }
}
