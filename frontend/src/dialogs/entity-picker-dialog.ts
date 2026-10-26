import { mdiThermostat } from "@mdi/js";
import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

import "../components/dialog";
import { areaName, entityName, fireEvent, safeCustomElement } from "../ha";
import type { Localize } from "../localize";
import { sharedStyles } from "../styles";
import type { HomeAssistant } from "../types";

/**
 * Pick climate entities. In `multiple` mode (copy schedule to rooms) it has
 * checkboxes and a confirm button; otherwise a click picks one entity.
 * Fires `picked` ({entityIds}) or `closed`.
 */
@safeCustomElement("shs-entity-picker-dialog")
export class EntityPickerDialog extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) open = false;
  @property() heading = "";
  @property() description = "";
  @property() emptyText = "";
  @property() confirmLabel = "";
  @property({ type: Boolean }) multiple = false;
  @property({ attribute: false }) entityIds: string[] = [];
  @property({ attribute: false }) localize!: Localize;

  @state() private _selected = new Set<string>();

  protected willUpdate(changed: PropertyValues) {
    if (changed.has("open") && this.open) this._selected = new Set();
  }

  private _toggle(entityId: string, checked: boolean) {
    const selected = new Set(this._selected);
    if (checked) selected.add(entityId);
    else selected.delete(entityId);
    this._selected = selected;
  }

  private _pick(entityIds: string[]) {
    fireEvent(this, "picked", { entityIds });
  }

  protected render() {
    const items = [...this.entityIds].sort((a, b) =>
      entityName(this.hass, a).localeCompare(entityName(this.hass, b)),
    );
    return html`<shs-dialog .open=${this.open} .heading=${this.heading} @closed=${() => fireEvent(this, "closed")}>
      ${this.description ? html`<p class="secondary">${this.description}</p>` : nothing}
      ${items.length
        ? html`<ul>
            ${items.map((entityId) => {
              const area = areaName(this.hass, entityId);
              const label = html`<span class="name">${entityName(this.hass, entityId)}</span>
                <span class="secondary">${area ? `${area} · ` : ""}${entityId}</span>`;
              return html`<li>
                ${this.multiple
                  ? html`<label class="item">
                      <input
                        type="checkbox"
                        .checked=${this._selected.has(entityId)}
                        @change=${(ev: Event) => this._toggle(entityId, (ev.target as HTMLInputElement).checked)}
                      />
                      <span class="text">${label}</span>
                    </label>`
                  : html`<button class="item" @click=${() => this._pick([entityId])}>
                      <ha-svg-icon .path=${mdiThermostat}></ha-svg-icon>
                      <span class="text">${label}</span>
                    </button>`}
              </li>`;
            })}
          </ul>`
        : html`<p class="secondary">${this.emptyText}</p>`}
      <button slot="actions" class="text-button" @click=${() => fireEvent(this, "closed")}>
        ${this.localize("common.cancel")}
      </button>
      ${this.multiple
        ? html`<button
            slot="actions"
            class="filled-button"
            ?disabled=${!this._selected.size}
            @click=${() => this._pick([...this._selected])}
          >
            ${this.confirmLabel}
          </button>`
        : nothing}
    </shs-dialog>`;
  }

  static styles = [
    sharedStyles,
    css`
      p {
        margin: 0 0 12px;
      }
      ul {
        list-style: none;
        margin: 0 -8px;
        padding: 0;
      }
      .item {
        align-items: center;
        background: none;
        border: none;
        border-radius: 8px;
        box-sizing: border-box;
        color: inherit;
        cursor: pointer;
        display: flex;
        font: inherit;
        gap: 16px;
        padding: 10px 8px;
        text-align: start;
        width: 100%;
      }
      .item:hover,
      .item:focus-visible {
        background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
        outline: none;
      }
      input {
        accent-color: var(--primary-color);
        height: 18px;
        width: 18px;
      }
      ha-svg-icon {
        color: var(--state-climate-heat-color, var(--state-icon-color));
        flex-shrink: 0;
      }
      .text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .text .secondary {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "shs-entity-picker-dialog": EntityPickerDialog;
  }
}
