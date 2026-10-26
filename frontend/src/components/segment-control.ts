import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { fireEvent, safeCustomElement } from "../ha";

export interface SegmentOption {
  value: string;
  label: string;
  icon?: string;
}

/** A pill shaped segmented control, like Tado's Home | Away switch. */
@safeCustomElement("shs-segment-control")
export class SegmentControl extends LitElement {
  @property({ attribute: false }) options: SegmentOption[] = [];
  @property() value = "";
  @property() label = "";
  @property({ type: Boolean, reflect: true }) small = false;
  @property({ type: Boolean }) disabled = false;

  private _select(value: string) {
    if (value !== this.value && !this.disabled) fireEvent(this, "value-changed", { value });
  }

  private _keydown(ev: KeyboardEvent) {
    const index = this.options.findIndex((option) => option.value === this.value);
    const delta = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    ev.preventDefault();
    const next = this.options[(index + delta + this.options.length) % this.options.length];
    this._select(next.value);
    this.updateComplete.then(() =>
      (this.renderRoot.querySelector("button[aria-checked=true]") as HTMLElement | null)?.focus(),
    );
  }

  protected render() {
    return html`<div class="wrapper" role="radiogroup" aria-label=${this.label} @keydown=${this._keydown}>
      ${this.options.map((option) => {
        const active = option.value === this.value;
        return html`<button
          role="radio"
          aria-checked=${active}
          tabindex=${active ? 0 : -1}
          class=${active ? "active" : ""}
          ?disabled=${this.disabled && !active}
          @click=${() => this._select(option.value)}
        >
          ${option.icon ? html`<ha-svg-icon .path=${option.icon}></ha-svg-icon>` : nothing}
          <span>${option.label}</span>
        </button>`;
      })}
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    .wrapper {
      background: var(
        --shs-segment-background,
        color-mix(in srgb, var(--primary-text-color) 10%, var(--card-background-color, #fff))
      );
      border-radius: 999px;
      display: flex;
      padding: 3px;
    }
    button {
      align-items: center;
      background: none;
      border: none;
      border-radius: 999px;
      color: var(--secondary-text-color);
      cursor: pointer;
      display: flex;
      flex: 1;
      font: inherit;
      font-size: 16px;
      font-weight: 500;
      gap: 8px;
      justify-content: center;
      min-width: 0;
      padding: 9px 12px;
      transition: background-color 0.2s, color 0.2s;
    }
    :host([small]) button {
      font-size: 14px;
      padding: 6px 8px;
    }
    button span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    button.active {
      background: var(
        --shs-segment-active-background,
        color-mix(in srgb, var(--primary-text-color) 24%, var(--card-background-color, #fff))
      );
      color: var(--primary-text-color);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    button[disabled] {
      cursor: default;
    }
    ha-svg-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-segment-control": SegmentControl;
  }
}
