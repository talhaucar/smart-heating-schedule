import { mdiMinus, mdiPlus } from "@mdi/js";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { temperatureColor } from "../colors";
import { fireEvent, safeCustomElement } from "../ha";
import { clamp, formatTemperature, type Limits } from "../temperature";

/** Big − 20.0° + control, like Tado's temperature picker. */
@safeCustomElement("shs-temperature-stepper")
export class TemperatureStepper extends LitElement {
  @property({ type: Number }) value = 20;
  @property({ attribute: false }) limits: Limits = { min: 5, max: 30, step: 0.5 };
  @property() unit = "°C";
  @property() language = "en";
  @property() lowerLabel = "Lower";
  @property() raiseLabel = "Raise";

  private _change(direction: number) {
    const value = clamp(this.value + direction * this.limits.step, this.limits);
    if (value !== this.value) fireEvent(this, "value-changed", { value });
  }

  private _keydown(ev: KeyboardEvent) {
    const direction = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[ev.key];
    if (direction) {
      ev.preventDefault();
      this._change(direction);
    }
  }

  protected render() {
    const { min, max, step } = this.limits;
    return html`
      <ha-icon-button
        .path=${mdiMinus}
        .label=${this.lowerLabel}
        ?disabled=${this.value <= min}
        @click=${() => this._change(-1)}
      ></ha-icon-button>
      <div
        class="value"
        role="spinbutton"
        tabindex="0"
        aria-valuemin=${min}
        aria-valuemax=${max}
        aria-valuenow=${this.value}
        aria-valuetext=${formatTemperature(this.value, this.unit, step, false, this.language)}
        style="--block-color:${temperatureColor(this.value, this.unit)}"
        @keydown=${this._keydown}
      >
        ${formatTemperature(this.value, this.unit, step, false, this.language)}
      </div>
      <ha-icon-button
        .path=${mdiPlus}
        .label=${this.raiseLabel}
        ?disabled=${this.value >= max}
        @click=${() => this._change(1)}
      ></ha-icon-button>
    `;
  }

  static styles = css`
    :host {
      align-items: center;
      display: flex;
      gap: 16px;
      justify-content: center;
    }
    ha-icon-button {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      border-radius: 50%;
      --mdc-icon-button-size: 48px;
    }
    .value {
      border-radius: 8px;
      color: color-mix(in srgb, var(--block-color) var(--shs-text-mix, 100%), black);
      font-size: 48px;
      font-variant-numeric: tabular-nums;
      font-weight: 600;
      min-width: 3.6em;
      outline: none;
      text-align: center;
    }
    .value:focus-visible {
      outline: 2px solid var(--primary-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-temperature-stepper": TemperatureStepper;
  }
}
