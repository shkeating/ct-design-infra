import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../label/label.js';

export type RadioTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Radio component based on CivicTheme — a native
 * `<input type="radio">` paired with a composed `ct-label` for its visible
 * text, mirroring CivicTheme's own `radio.twig` (which includes
 * `civictheme:label` the same way, passing `size: 'small'`).
 *
 * Known shadow-DOM composition caveats (see `wcag-data/radio.json` for the
 * full accounting — no upstream wcag-data exists for radio, this file was
 * written from scratch following `wcag-data/label.json`'s worked example):
 *
 * - `ct-label`'s own `<label for="...">` renders inside `ct-label`'s OWN
 *   shadow root, so the `for`/`id` reference can never resolve across the
 *   shadow boundary to this component's `<input>` — unlike upstream Twig,
 *   where both render into one flat DOM tree. To keep the accessible name
 *   and "click label text to select" behavior working despite this, the
 *   component (a) mirrors `label`/`ariaLabel` onto the input's own
 *   `aria-label`, and (b) manually forwards clicks on the composed
 *   `ct-label` to the input.
 * - `ct-label`'s default text color token (`--ct-label-light/dark-color`,
 *   the "heading" color role) differs from what CivicTheme's own radio CSS
 *   wants for its option text (`--ct-radio-light/dark-*-color`, the "body"
 *   color role, which also shifts on hover/checked/invalid). `ct-label`
 *   happens to read its color from a CSS custom property, and custom
 *   properties (unlike other styles) *do* inherit across shadow
 *   boundaries — so this component overrides `--ct-label-light-color` /
 *   `--ct-label-dark-color` on the wrapping element around `<ct-label>`
 *   rather than fighting encapsulation.
 * - Multiple `<ct-radio>` elements sharing the same `name` do NOT
 *   automatically form a native browser radio-button group: the HTML
 *   standard scopes a "radio button group" to controls sharing both `name`
 *   and *the same node tree*, and each `<ct-radio>`'s `<input>` lives in a
 *   separate shadow root. Native mutual exclusivity and arrow-key roving
 *   between grouped radios are both native-browser behaviors that this
 *   breaks. This component includes a best-effort mitigation — enforcing
 *   mutual exclusivity in JS on `change` — but arrow-key roving is not
 *   reproduced. A future `ct-radio-group` molecule (mirroring the
 *   `ct-accordion`/`ct-accordion-item` parent+child pattern) is the real
 *   fix; out of scope for this single-atom port.
 */
@customElement('ct-radio')
export class CtRadio extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-radio {
      appearance: none;
      margin: 0;
      border-radius: 50%;
      border-style: solid;
      box-sizing: border-box;
      height: 1.625rem;
      width: 1.625rem;
      border-width: 0.0625rem;
      cursor: pointer;
      vertical-align: top;
    }

    .ct-radio[disabled] {
      opacity: var(--ct-radio-disabled-opacity);
      pointer-events: none;
    }

    .ct-radio:hover {
      border-width: 0.125rem;
    }

    .ct-radio:checked {
      border-width: 0.187525rem;
    }

    .ct-radio:checked:hover {
      border-width: 0.187525rem;
    }

    .ct-radio:checked::before {
      content: '';
      display: block;
      border-radius: 50%;
      width: 0.8750625rem;
      height: 0.8750625rem;
      margin: 0.18744375rem 0.18744375rem;
      transform: scale(0);
      animation: radio-grow var(--ct-radio-animation-duration) forwards;
    }

    @keyframes radio-grow {
      to {
        transform: scale(1);
      }
    }

    .ct-radio:focus-visible {
      outline-style: solid;
      outline-width: var(--ct-radio-outline-width);
      outline-offset: var(--ct-radio-outline-offset);
    }

    /* The visible label is a composed <ct-label>, not a native sibling
       <label> — see the class doc comment for why its color is overridden
       via a CSS custom property instead of a normal declaration, and why
       its own margin-bottom (meant for label-above-a-field usage) is
       cancelled here for label-beside-a-radio usage. */
    .ct-radio__label-wrap {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      margin-left: 0.5rem;
      vertical-align: top;
      --ct-label-light-color: var(--ct-radio-light-color);
      --ct-label-dark-color: var(--ct-radio-dark-color);
    }

    .ct-radio__label-wrap ct-label {
      margin-bottom: 0;
    }

    .ct-radio:disabled ~ .ct-radio__label-wrap {
      opacity: var(--ct-radio-disabled-opacity);
      pointer-events: none;
    }

    .ct-radio:not(.ct-radio--is-invalid):hover ~ .ct-radio__label-wrap,
    .ct-radio:not(.ct-radio--is-invalid) ~ .ct-radio__label-wrap:hover {
      --ct-label-light-color: var(--ct-radio-light-hover-color);
      --ct-label-dark-color: var(--ct-radio-dark-hover-color);
    }

    .ct-radio:not(.ct-radio--is-invalid):checked ~ .ct-radio__label-wrap {
      --ct-label-light-color: var(--ct-radio-light-checked-color);
      --ct-label-dark-color: var(--ct-radio-dark-checked-color);
    }

    .ct-radio:not(.ct-radio--is-invalid):checked:hover ~ .ct-radio__label-wrap,
    .ct-radio:not(.ct-radio--is-invalid):checked ~ .ct-radio__label-wrap:hover {
      --ct-label-light-color: var(--ct-radio-light-checked-hover-color);
      --ct-label-dark-color: var(--ct-radio-dark-checked-hover-color);
    }

    .ct-radio.ct-radio--is-invalid ~ .ct-radio__label-wrap,
    .ct-radio.ct-radio--is-invalid:hover ~ .ct-radio__label-wrap,
    .ct-radio.ct-radio--is-invalid ~ .ct-radio__label-wrap:hover {
      --ct-label-light-color: var(--ct-radio-light-invalid-color);
      --ct-label-dark-color: var(--ct-radio-dark-invalid-color);
    }

    /* Light theme */
    .ct-radio.ct-theme-light:focus-visible {
      outline-color: var(--ct-radio-light-outline-color);
    }
    .ct-radio.ct-theme-light:not(.ct-radio--is-invalid) {
      border-color: var(--ct-radio-light-border-color);
      background-color: var(--ct-radio-light-background-color);
    }
    .ct-radio.ct-theme-light:not(.ct-radio--is-invalid):hover {
      border-color: var(--ct-radio-light-hover-border-color);
      background-color: var(--ct-radio-light-hover-background-color);
    }
    .ct-radio.ct-theme-light:not(.ct-radio--is-invalid):checked {
      border-color: var(--ct-radio-light-checked-border-color);
      background-color: var(--ct-radio-light-checked-background-color);
    }
    .ct-radio.ct-theme-light:not(.ct-radio--is-invalid):checked:hover {
      border-color: var(--ct-radio-light-checked-hover-border-color);
      background-color: var(--ct-radio-light-checked-hover-background-color);
    }
    .ct-radio.ct-theme-light:not(.ct-radio--is-invalid):checked:hover::before {
      background-color: var(--ct-radio-light-checked-hover-border-color);
    }
    .ct-radio.ct-theme-light:not(.ct-radio--is-invalid):checked::before {
      background-color: var(--ct-radio-light-checked-border-color);
    }
    .ct-radio.ct-theme-light.ct-radio--is-invalid {
      border-color: var(--ct-radio-light-invalid-border-color);
      background-color: var(--ct-radio-light-invalid-background-color);
    }
    .ct-radio.ct-theme-light.ct-radio--is-invalid:checked::before {
      background-color: var(--ct-radio-light-invalid-border-color);
    }

    /* Dark theme */
    .ct-radio.ct-theme-dark:focus-visible {
      outline-color: var(--ct-radio-dark-outline-color);
    }
    .ct-radio.ct-theme-dark:not(.ct-radio--is-invalid) {
      border-color: var(--ct-radio-dark-border-color);
      background-color: var(--ct-radio-dark-background-color);
    }
    .ct-radio.ct-theme-dark:not(.ct-radio--is-invalid):hover {
      border-color: var(--ct-radio-dark-hover-border-color);
      background-color: var(--ct-radio-dark-hover-background-color);
    }
    .ct-radio.ct-theme-dark:not(.ct-radio--is-invalid):checked {
      border-color: var(--ct-radio-dark-checked-border-color);
      background-color: var(--ct-radio-dark-checked-background-color);
    }
    .ct-radio.ct-theme-dark:not(.ct-radio--is-invalid):checked:hover {
      border-color: var(--ct-radio-dark-checked-hover-border-color);
      background-color: var(--ct-radio-dark-checked-hover-background-color);
    }
    .ct-radio.ct-theme-dark:not(.ct-radio--is-invalid):checked:hover::before {
      background-color: var(--ct-radio-dark-checked-hover-border-color);
    }
    .ct-radio.ct-theme-dark:not(.ct-radio--is-invalid):checked::before {
      background-color: var(--ct-radio-dark-checked-border-color);
    }
    .ct-radio.ct-theme-dark.ct-radio--is-invalid {
      border-color: var(--ct-radio-dark-invalid-border-color);
      background-color: var(--ct-radio-dark-invalid-background-color);
    }
    .ct-radio.ct-theme-dark.ct-radio--is-invalid:checked::before {
      background-color: var(--ct-radio-dark-invalid-border-color);
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: RadioTheme = 'light';

  /** DOM `name` attribute — required for the radio to participate in a group. */
  @property({ type: String }) name = '';

  /**
   * DOM `id` attribute. Passed through to the composed `ct-label`'s `for`,
   * matching upstream — but see the class doc comment: this does not
   * establish a working cross-shadow-root label association on its own.
   */
  @property({ type: String, reflect: true }) override id = '';

  /** The radio's DOM `value`. */
  @property({ type: String }) value = '';

  /** Visible label text, rendered via a composed `ct-label`. */
  @property({ type: String }) label = '';

  /** Whether the radio is checked. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Whether the radio is required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Whether the radio is in an invalid state. */
  @property({ type: Boolean, attribute: 'invalid' }) invalid = false;

  /** Whether the radio is disabled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * Overrides the accessible name. Defaults to `label`'s text when unset —
   * see the class doc comment for why `aria-label` (not the composed
   * `ct-label`'s `for`/`id`) is this component's only reliable way to
   * expose an accessible name.
   */
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    if (this.checked && this.name) {
      // Best-effort mitigation for the cross-shadow-root radio-grouping gap
      // documented in the class doc comment: the browser won't do this for
      // us since each <ct-radio>'s <input> lives in its own shadow root.
      document.querySelectorAll<CtRadio>('ct-radio').forEach((el) => {
        if (el !== this && el.name === this.name) {
          el.checked = false;
        }
      });
    }
  }

  private _handleLabelClick = () => {
    if (this.disabled) {
      return;
    }
    this.shadowRoot?.querySelector('input')?.click();
  };

  render() {
    if (!this.name || !this.id) {
      return nothing;
    }

    const classes = {
      'ct-radio': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-radio--is-invalid': this.invalid,
      [this.modifierClass]: !!this.modifierClass,
    };

    const accessibleName = this.ariaLabel || this.label || undefined;

    const labelHtml = this.label
      ? html`
          <span class="ct-radio__label-wrap" @click=${this._handleLabelClick}>
            <ct-label theme=${this.theme} content=${this.label} size="small" for=${this.id}></ct-label>
          </span>
        `
      : nothing;

    return html`
      <input
        type="radio"
        class=${classMap(classes)}
        data-component-name="radio"
        name=${this.name}
        id=${this.id}
        value=${this.value}
        aria-label=${ifDefined(accessibleName)}
        aria-invalid=${this.invalid ? 'true' : nothing}
        ?checked=${this.checked}
        ?required=${this.required}
        ?disabled=${this.disabled}
        @change=${this._handleChange}
      />${labelHtml}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-radio': CtRadio;
  }
}
