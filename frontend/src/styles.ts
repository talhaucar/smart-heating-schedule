import { css, html, type TemplateResult } from "lit";

/** Styles shared by all panel elements. Everything follows the HA theme. */
export const sharedStyles = css`
  :host {
    color: var(--primary-text-color);
  }
  ha-card {
    display: block;
  }
  ha-card:not(:defined) {
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border-radius: var(--ha-card-border-radius, 12px);
    border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
  }
  .text-button {
    background: none;
    border: none;
    border-radius: 8px;
    color: var(--primary-color);
    cursor: pointer;
    font: inherit;
    font-weight: 500;
    padding: 8px 10px;
  }
  .text-button:hover:not([disabled]),
  .text-button:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    outline: none;
  }
  .text-button[disabled] {
    color: var(--disabled-text-color);
    cursor: default;
  }
  .text-button.danger {
    color: var(--error-color);
  }
  .text-button.danger:hover:not([disabled]) {
    background: color-mix(in srgb, var(--error-color) 10%, transparent);
  }
  .filled-button {
    background: var(--primary-color);
    border: none;
    border-radius: 20px;
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    font-weight: 500;
    padding: 10px 20px;
  }
  .filled-button[disabled] {
    background: var(--disabled-color, var(--disabled-text-color));
    cursor: default;
  }
  .filled-button.danger {
    background: var(--error-color);
  }
  ha-icon-button.primary {
    color: var(--primary-color);
  }
  .secondary {
    color: var(--secondary-text-color);
  }
  .error {
    color: var(--error-color);
  }
  .switch-fallback {
    accent-color: var(--primary-color);
    height: 20px;
    width: 36px;
  }
  .visually-hidden {
    clip: rect(0 0 0 0);
    height: 1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
  }
`;

/** ha-switch when it is available, a native checkbox otherwise. */
export const renderSwitch = (
  checked: boolean,
  onChange: (checked: boolean) => void,
  label: string,
  disabled = false,
): TemplateResult =>
  customElements.get("ha-switch")
    ? html`<ha-switch
        .checked=${checked}
        .disabled=${disabled}
        aria-label=${label}
        @change=${(ev: Event) => onChange((ev.target as HTMLInputElement).checked)}
      ></ha-switch>`
    : html`<input
        type="checkbox"
        role="switch"
        class="switch-fallback"
        .checked=${checked}
        ?disabled=${disabled}
        aria-label=${label}
        @change=${(ev: Event) => onChange((ev.target as HTMLInputElement).checked)}
      />`;

/** A top app bar like the ones on Home Assistant's own pages. */
export const toolbarStyles = css`
  .toolbar {
    align-items: center;
    background: var(--app-header-background-color);
    border-bottom: var(--app-header-border-bottom, none);
    box-sizing: border-box;
    color: var(--app-header-text-color, #fff);
    display: flex;
    font-size: 20px;
    gap: 4px;
    height: var(--header-height, 56px);
    padding: 0 12px;
    position: sticky;
    top: 0;
    z-index: 4;
  }
  .toolbar .title {
    flex: 1;
    margin-inline-start: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .toolbar ha-icon-button {
    color: inherit;
  }
`;
