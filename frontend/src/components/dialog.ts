import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";

import { fireEvent, safeCustomElement } from "../ha";

/**
 * A modal dialog styled with the Home Assistant theme. Home Assistant's own
 * dialog elements are loaded lazily and change between releases, so the
 * panel brings its own.
 */
@safeCustomElement("shs-dialog")
export class Dialog extends LitElement {
  @property() heading = "";
  @property({ type: Boolean, reflect: true }) open = false;

  private _previousFocus: Element | null = null;

  private _close() {
    fireEvent(this, "closed");
  }

  private _keydown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape" && this.open) {
      ev.stopPropagation();
      this._close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this._keydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._keydown);
  }

  protected updated(changed: PropertyValues) {
    if (!changed.has("open")) return;
    if (this.open) {
      this._previousFocus = document.activeElement;
      (this.renderRoot.querySelector(".surface") as HTMLElement | null)?.focus();
    } else if (this._previousFocus instanceof HTMLElement) {
      this._previousFocus.focus();
    }
  }

  protected render() {
    if (!this.open) return nothing;
    return html`
      <div class="scrim" @click=${this._close}></div>
      <div class="surface" role="dialog" aria-modal="true" aria-labelledby="heading" tabindex="-1">
        <h2 id="heading">${this.heading}</h2>
        <div class="content"><slot></slot></div>
        <div class="actions">
          <slot name="secondary"></slot>
          <span class="spacer"></span>
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: contents;
    }
    .scrim {
      background: var(--dialog-scrim-color, rgba(0, 0, 0, 0.4));
      inset: 0;
      position: fixed;
      z-index: 100;
    }
    .surface {
      background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
      border-radius: var(--ha-dialog-border-radius, 24px);
      box-shadow: var(--ha-dialog-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.3));
      box-sizing: border-box;
      color: var(--primary-text-color);
      display: flex;
      flex-direction: column;
      left: 50%;
      max-height: calc(100% - 32px);
      max-width: 440px;
      outline: none;
      padding: 24px;
      position: fixed;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 32px);
      z-index: 101;
    }
    h2 {
      font-size: 22px;
      font-weight: 400;
      margin: 0 0 16px;
    }
    .content {
      overflow-y: auto;
    }
    .actions {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 24px;
    }
    .spacer {
      flex: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-dialog": Dialog;
  }
}
