import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { CtSelectOption } from './select-option.js';
import type { CtSelectOptgroup } from './select-optgroup.js';
import './select-option.js';
import './select-optgroup.js';

export type SelectTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Select component based on CivicTheme.
 *
 * Options are composed via `ct-select-option` (and, for grouped options, `ct-select-optgroup`
 * wrapping further `ct-select-option`s) light-DOM children rather than a JSON `options` prop,
 * keeping this element's own attributes plain strings/booleans. Native `<select>`/`<option>`
 * distribution does not support slotting the way `ct-accordion-item`'s panel body does, so
 * — like `ct-breadcrumb`/`ct-social-links` — this element reads its children as plain data via
 * `querySelectorAll` inside its own `render()` and builds real `<option>`/`<optgroup>`
 * elements from that data, rather than projecting the child elements themselves.
 *
 * Accessible naming caveat (flagged in `wcag-data/select.json`'s 1.3.1/4.1.2 entries): the
 * real `<select>` renders inside this element's shadow root, so an external `<label for="...">`
 * in the implementer's light DOM cannot programmatically associate with it — the `for`/`id`
 * mechanism does not cross a shadow boundary, and wrapping doesn't help either since the
 * labelable descendant lives in a different shadow tree. The `aria-label` override below
 * (same pattern as `ct-button`/`ct-link`'s icon-only case) is the supported way to give this
 * component an accessible name; it is forwarded directly onto the internal `<select>`.
 */
@customElement('ct-select')
export class CtSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-select {
      appearance: none;
      margin: 0;
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-family: var(--ct-typography-label-small-font-name);
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
      width: 100%;
      min-width: calc(4.3125rem + var(--ct-font-average-character-width) * 5rem);
      border-radius: var(--ct-select-border-radius);
      border-style: solid;
      border-width: 0.0625rem;
      padding: 0.8125rem 3.3125rem 0.8125rem 1rem;
      background-position: calc(100% - 0.0625rem);
      background-repeat: no-repeat;
      background-size: 2.3125rem;
      box-sizing: border-box;
    }

    .ct-select[disabled] {
      opacity: var(--ct-select-disabled-opacity);
      pointer-events: none;
    }

    .ct-select:focus-visible {
      outline-style: solid;
      outline-width: var(--ct-select-outline-width);
      outline-offset: var(--ct-select-outline-offset);
    }

    /* Light theme */
    .ct-select.ct-theme-light {
      background-image: var(--ct-select-light-icon);
    }
    .ct-select.ct-theme-light[multiple] {
      background: none;
    }
    .ct-select.ct-theme-light:focus-visible {
      outline-color: var(--ct-select-light-outline-color);
    }
    .ct-select.ct-theme-light:not(.ct-select--is-invalid) {
      color: var(--ct-select-light-color);
      border-color: var(--ct-select-light-border-color);
      background-color: var(--ct-select-light-background-color);
    }
    .ct-select.ct-theme-light:not(.ct-select--is-invalid)::placeholder {
      color: var(--ct-select-light-color);
    }
    .ct-select.ct-theme-light:not(.ct-select--is-invalid) option:checked {
      background-color: var(--ct-select-light-option-background-color);
      color: var(--ct-select-light-option-color);
    }
    .ct-select.ct-theme-light:not(.ct-select--is-invalid):hover {
      color: var(--ct-select-light-hover-color);
      border-color: var(--ct-select-light-hover-border-color);
      background-color: var(--ct-select-light-hover-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-select-light-hover-border-color);
    }
    .ct-select.ct-theme-light:not(.ct-select--is-invalid):focus-visible {
      color: var(--ct-select-light-focus-color);
      border-color: var(--ct-select-light-focus-border-color);
      background-color: var(--ct-select-light-focus-background-color);
    }
    .ct-select.ct-theme-light.ct-select--is-invalid {
      color: var(--ct-select-light-invalid-color);
      border-color: var(--ct-select-light-invalid-border-color);
      background-color: var(--ct-select-light-invalid-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-select-light-invalid-border-color);
    }
    .ct-select.ct-theme-light.ct-select--is-invalid::placeholder {
      color: var(--ct-select-light-invalid-color);
    }

    /* Dark theme */
    .ct-select.ct-theme-dark {
      background-image: var(--ct-select-dark-icon);
    }
    .ct-select.ct-theme-dark[multiple] {
      background: none;
    }
    .ct-select.ct-theme-dark:focus-visible {
      outline-color: var(--ct-select-dark-outline-color);
    }
    .ct-select.ct-theme-dark:not(.ct-select--is-invalid) {
      color: var(--ct-select-dark-color);
      border-color: var(--ct-select-dark-border-color);
      background-color: var(--ct-select-dark-background-color);
    }
    .ct-select.ct-theme-dark:not(.ct-select--is-invalid)::placeholder {
      color: var(--ct-select-dark-color);
    }
    .ct-select.ct-theme-dark:not(.ct-select--is-invalid) option:checked {
      background-color: var(--ct-select-dark-option-background-color);
      color: var(--ct-select-dark-option-color);
    }
    .ct-select.ct-theme-dark:not(.ct-select--is-invalid):hover {
      color: var(--ct-select-dark-hover-color);
      border-color: var(--ct-select-dark-hover-border-color);
      background-color: var(--ct-select-dark-hover-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-select-dark-hover-border-color);
    }
    .ct-select.ct-theme-dark:not(.ct-select--is-invalid):focus-visible {
      color: var(--ct-select-dark-focus-color);
      border-color: var(--ct-select-dark-focus-border-color);
      background-color: var(--ct-select-dark-focus-background-color);
    }
    .ct-select.ct-theme-dark.ct-select--is-invalid {
      color: var(--ct-select-dark-invalid-color);
      border-color: var(--ct-select-dark-invalid-border-color);
      background-color: var(--ct-select-dark-invalid-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-select-dark-invalid-border-color);
    }
    .ct-select.ct-theme-dark.ct-select--is-invalid::placeholder {
      color: var(--ct-select-dark-invalid-color);
    }
  `;

  @property({ type: String }) theme: SelectTheme = 'light';
  @property({ type: String }) name = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) invalid = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  // See the class doc comment: native `for`/`id` label association cannot cross this
  // element's shadow boundary, so `aria-label` (forwarded to the internal `<select>`) is
  // the supported way to name this component — same pattern as `ct-button`/`ct-link`.
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

  private _children(): (CtSelectOption | CtSelectOptgroup)[] {
    return Array.from(this.querySelectorAll(':scope > ct-select-option, :scope > ct-select-optgroup')) as (
      | CtSelectOption
      | CtSelectOptgroup
    )[];
  }

  private renderOption(option: CtSelectOption) {
    if (!option.label) {
      return nothing;
    }
    return html`
      <option value=${option.value || ''} ?selected=${option.selected} ?disabled=${option.disabled}>${option.label}</option>
    `;
  }

  private renderChild(child: CtSelectOption | CtSelectOptgroup) {
    if (child.tagName === 'CT-SELECT-OPTGROUP') {
      const group = child as CtSelectOptgroup;
      const groupOptions = Array.from(group.querySelectorAll(':scope > ct-select-option')) as CtSelectOption[];
      return html`
        <optgroup label=${group.label} ?disabled=${group.disabled}>
          ${groupOptions.map((option) => this.renderOption(option))}
        </optgroup>
      `;
    }
    return this.renderOption(child as CtSelectOption);
  }

  render() {
    const children = this._children();

    const classes = {
      'ct-select': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-select--is-invalid': this.invalid,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <select
        class=${classMap(classes)}
        name=${ifDefined(this.name || undefined)}
        ?multiple=${this.multiple}
        ?disabled=${this.disabled}
        ?required=${this.required}
        aria-invalid=${ifDefined(this.invalid ? 'true' : undefined)}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
      >
        ${children.map((child) => this.renderChild(child))}
      </select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-select': CtSelect;
  }
}
