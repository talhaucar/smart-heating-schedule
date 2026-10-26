import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { temperatureColor } from "../colors";
import { formatMinutes } from "../format";
import { DAY, toSegments } from "../schedule";
import { formatTemperature } from "../temperature";
import type { Block } from "../types";
import { safeCustomElement } from "../ha";

/** A day as a coloured timeline, like the bars in Tado's smart schedule. */
@safeCustomElement("shs-schedule-bar")
export class ScheduleBar extends LitElement {
  @property({ attribute: false }) blocks: Block[] = [];
  @property() unit = "°C";
  @property({ type: Number }) step = 0.5;
  @property() language = "en";
  @property({ attribute: false }) offLabel = "Off";
  @property({ type: Boolean }) h12 = false;
  /** Minutes since midnight to mark as "now", or null. */
  @property({ attribute: false }) now: number | null = null;

  protected render() {
    const segments = toSegments(this.blocks);
    return html`
      <div class="bar">
        ${segments.map((segment) => {
          const label =
            segment.temperature === null
              ? this.offLabel
              : formatTemperature(segment.temperature, this.unit, this.step, false, this.language);
          return html`<div
            class="block ${segment.temperature === null ? "off" : ""}"
            style="flex-grow:${segment.end - segment.start};--block-color:${temperatureColor(
              segment.temperature,
              this.unit,
            )}"
          >
            <span>${label}</span>
          </div>`;
        })}
        ${this.now === null
          ? nothing
          : html`<div class="now" style="left:${(this.now / DAY) * 100}%"></div>`}
      </div>
      <div class="ticks" aria-hidden="true">
        ${[0, 480, 960, DAY].map((minutes) => html`<span>${formatMinutes(minutes, this.h12, true)}</span>`)}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .bar {
      display: flex;
      gap: 3px;
      height: var(--shs-bar-height, 28px);
      position: relative;
    }
    .block {
      align-items: center;
      container-type: inline-size;
      background: color-mix(
        in srgb,
        var(--block-color) var(--shs-block-mix, 45%),
        var(--ha-card-background, var(--card-background-color, #fff))
      );
      color: color-mix(in srgb, var(--block-color) var(--shs-text-mix, 100%), black);
      display: flex;
      flex-basis: 0;
      font-size: var(--shs-bar-font-size, 14px);
      font-weight: 700;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
    }
    .block span {
      overflow: hidden;
      padding: 0 8px;
      text-overflow: clip;
    }
    /* Hide labels that do not fit instead of cutting them off. */
    @container (max-width: 46px) {
      .block span {
        visibility: hidden;
      }
    }
    .block:first-of-type {
      border-radius: 4px 0 0 4px;
    }
    .block:last-of-type {
      border-radius: 0 4px 4px 0;
    }
    .block:only-of-type {
      border-radius: 4px;
    }
    .block.off {
      font-weight: 500;
    }
    .now {
      background: var(--primary-text-color);
      border-radius: 1px;
      bottom: -3px;
      position: absolute;
      top: -3px;
      transform: translateX(-1px);
      width: 2px;
    }
    .ticks {
      color: var(--secondary-text-color);
      display: flex;
      font-size: 13px;
      justify-content: space-between;
      margin-top: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-schedule-bar": ScheduleBar;
  }
}
