import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

import "../components/dialog";
import "../components/temperature-stepper";
import { formatMinutes } from "../format";
import { fireEvent, safeCustomElement } from "../ha";
import type { Localize } from "../localize";
import { DAY, SLOT, deleteBlock, insertBlock, toSegments, updateBlock } from "../schedule";
import { renderSwitch, sharedStyles } from "../styles";
import { clamp, defaultTemperature, type Limits } from "../temperature";
import type { Block } from "../types";

/**
 * Edit, add or delete a time block. Fires `save` with the new block list of
 * the day, or `closed` when cancelled.
 */
@safeCustomElement("shs-block-dialog")
export class BlockDialog extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ attribute: false }) blocks: Block[] = [];
  /** The block being edited, or null to add one. */
  @property({ attribute: false }) index: number | null = null;
  @property() unit = "°C";
  @property({ attribute: false }) limits: Limits = { min: 5, max: 30, step: 0.5 };
  @property({ type: Boolean }) canTurnOff = true;
  @property({ type: Boolean }) h12 = false;
  @property() language = "en";
  @property({ attribute: false }) localize!: Localize;

  @state() private _start = 0;
  @state() private _end = DAY;
  @state() private _heating = true;
  @state() private _temperature = 20;

  protected willUpdate(changed: PropertyValues) {
    if (changed.has("open") && this.open) this._reset();
  }

  private _reset() {
    const segments = toSegments(this.blocks);
    if (this.index !== null) {
      const segment = segments[this.index];
      this._start = segment.start;
      this._end = segment.end;
      this._heating = segment.temperature !== null;
      this._temperature = clamp(segment.temperature ?? defaultTemperature(this.unit), this.limits);
      return;
    }
    // New block: two hours in the middle of the longest block.
    const longest = segments.reduce((a, b) => (b.end - b.start > a.end - a.start ? b : a));
    const length = Math.min(120, longest.end - longest.start);
    const middle = longest.start + (longest.end - longest.start) / 2;
    this._start = Math.max(longest.start, Math.floor((middle - length / 2) / 60) * 60);
    this._end = Math.min(DAY, this._start + length);
    this._heating = true;
    this._temperature = clamp(defaultTemperature(this.unit), this.limits);
  }

  private get _isFirst() {
    return this.index === 0;
  }

  private get _isLast() {
    return this.index !== null && this.index === this.blocks.length - 1;
  }

  private get _valid() {
    return this._end - this._start >= SLOT;
  }

  private _save() {
    const temperature = this._heating ? this._temperature : null;
    const blocks =
      this.index === null
        ? insertBlock(this.blocks, this._start, this._end, temperature)
        : updateBlock(this.blocks, this.index, this._start, this._end, temperature);
    fireEvent(this, "save", { blocks });
  }

  private _delete() {
    if (this.index !== null) fireEvent(this, "save", { blocks: deleteBlock(this.blocks, this.index) });
  }

  private _timeSelect(label: string, value: number, from: number, to: number, disabled: boolean, onChange: (v: number) => void) {
    const options: number[] = [];
    for (let minutes = from; minutes <= to; minutes += SLOT) options.push(minutes);
    return html`<label class="field">
      <span>${label}</span>
      <select
        .value=${String(value)}
        ?disabled=${disabled}
        @change=${(ev: Event) => onChange(Number((ev.target as HTMLSelectElement).value))}
      >
        ${options.map(
          (minutes) =>
            html`<option value=${minutes} ?selected=${minutes === value}>
              ${formatMinutes(minutes, this.h12)}
            </option>`,
        )}
      </select>
    </label>`;
  }

  protected render() {
    const offLabel = this.localize(this.canTurnOff ? "block.off" : "block.frost");
    return html`<shs-dialog
      .open=${this.open}
      .heading=${this.localize(this.index === null ? "block.add" : "block.edit")}
      @closed=${() => fireEvent(this, "closed")}
    >
      <div class="times">
        ${this._timeSelect(this.localize("block.start"), this._start, 0, DAY - SLOT, this._isFirst, (v) => {
          this._start = v;
        })}
        <span class="dash">–</span>
        ${this._timeSelect(this.localize("block.end"), this._end, SLOT, DAY, this._isLast, (v) => {
          this._end = v;
        })}
      </div>
      ${this._valid ? nothing : html`<p class="error">${this.localize("block.invalid")}</p>`}

      <div class="row">
        <span>${this.localize("block.heating")}</span>
        ${renderSwitch(this._heating, (checked) => (this._heating = checked), this.localize("block.heating"))}
      </div>

      <div class="temperature">
        ${this._heating
          ? html`<shs-temperature-stepper
              .value=${this._temperature}
              .limits=${this.limits}
              .unit=${this.unit}
              .language=${this.language}
              .lowerLabel=${this.localize("block.lower")}
              .raiseLabel=${this.localize("block.raise")}
              @value-changed=${(ev: CustomEvent) => (this._temperature = ev.detail.value)}
            ></shs-temperature-stepper>`
          : html`<div class="off">${offLabel}</div>`}
      </div>

      ${this.index === null ? html`<p class="secondary hint">${this.localize("block.overlap")}</p>` : nothing}

      ${this.index !== null && this.blocks.length > 1
        ? html`<button slot="secondary" class="text-button danger" @click=${this._delete}>
            ${this.localize("block.delete")}
          </button>`
        : nothing}
      <button slot="actions" class="text-button" @click=${() => fireEvent(this, "closed")}>
        ${this.localize("common.cancel")}
      </button>
      <button slot="actions" class="filled-button" ?disabled=${!this._valid} @click=${this._save}>
        ${this.localize(this.index === null ? "common.add" : "common.save")}
      </button>
    </shs-dialog>`;
  }

  static styles = [
    sharedStyles,
    css`
      .times {
        align-items: flex-end;
        display: flex;
        gap: 12px;
      }
      .dash {
        color: var(--secondary-text-color);
        padding-bottom: 12px;
      }
      .field {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 6px;
        color: var(--secondary-text-color);
        font-size: 13px;
      }
      select {
        appearance: none;
        background: var(--input-fill-color, color-mix(in srgb, var(--primary-text-color) 6%, transparent));
        border: none;
        border-bottom: 1px solid var(--input-idle-line-color, var(--secondary-text-color));
        border-radius: 4px 4px 0 0;
        color: var(--primary-text-color);
        font: inherit;
        font-size: 17px;
        font-variant-numeric: tabular-nums;
        padding: 12px;
      }
      select:focus {
        border-bottom: 2px solid var(--primary-color);
        outline: none;
      }
      select:disabled {
        color: var(--disabled-text-color);
      }
      option {
        background: var(--card-background-color);
      }
      .row {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
      }
      .temperature {
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 88px;
        margin-top: 16px;
      }
      .off {
        color: var(--secondary-text-color);
        font-size: 32px;
        font-weight: 600;
      }
      .hint {
        font-size: 13px;
        margin: 16px 0 0;
      }
      .error {
        font-size: 13px;
        margin: 8px 0 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-block-dialog": BlockDialog;
  }
}
