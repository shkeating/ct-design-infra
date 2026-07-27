import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type InputTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Input component based on CivicTheme — a bare, unlabelled
 * form control (`<input>`). Pairing it with an accessible name is the
 * implementer's responsibility: see the `aria-label` property below, and the
 * caveat in `wcag-data/input.json` about `<label for>` not working across
 * separate custom elements' shadow roots. `civictheme:field` (not yet ported)
 * is expected to be the molecule that composes this with `ct-label` /
 * `ct-field-message` correctly.
 */
@customElement('ct-input')
export class CtInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-input {
      appearance: none;
      margin: 0;
      box-sizing: border-box;
      width: 100%;
      border-radius: var(--ct-input-border-radius);
      border-style: solid;
      border-width: 0.0625rem;
      padding: 0.8125rem 1rem;
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-family: var(--ct-typography-label-small-font-name, var(--ct-typography-family-body, sans-serif));
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
    }

    .ct-input[disabled] {
      opacity: var(--ct-input-disabled-opacity);
      pointer-events: none;
    }

    .ct-input[type='color'] {
      padding: 0.40625rem 0.5rem;
      width: 2.875rem;
    }

    .ct-input[type='button'],
    .ct-input[type='reset'],
    .ct-input[type='submit'] {
      appearance: button;
    }

    .ct-input[type='number']::-webkit-inner-spin-button,
    .ct-input[type='number']::-webkit-outer-spin-button {
      height: auto;
    }

    .ct-input[type='search'] {
      appearance: textfield;
      outline-offset: -2px;
    }

    .ct-input[type='search']::-webkit-search-decoration {
      appearance: none;
    }

    .ct-input::-webkit-file-upload-button {
      appearance: button;
      font: inherit;
    }

    .ct-input:focus-visible {
      outline-style: solid;
      outline-width: var(--ct-input-outline-width);
      outline-offset: var(--ct-input-outline-offset);
    }

    /* Light theme */
    .ct-input.ct-theme-light:focus-visible {
      outline-color: var(--ct-input-light-outline-color);
    }
    .ct-input.ct-theme-light:not(.ct-input--is-invalid) {
      color: var(--ct-input-light-color);
      border-color: var(--ct-input-light-border-color);
      background-color: var(--ct-input-light-background-color);
    }
    .ct-input.ct-theme-light:not(.ct-input--is-invalid)::placeholder {
      color: var(--ct-input-light-color);
    }
    .ct-input.ct-theme-light:not(.ct-input--is-invalid):hover {
      color: var(--ct-input-light-hover-color);
      border-color: var(--ct-input-light-hover-border-color);
      background-color: var(--ct-input-light-hover-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-input-light-hover-border-color);
    }
    .ct-input.ct-theme-light:not(.ct-input--is-invalid):focus-visible {
      color: var(--ct-input-light-focus-color);
      border-color: var(--ct-input-light-focus-border-color);
      background-color: var(--ct-input-light-focus-background-color);
    }
    .ct-input.ct-theme-light.ct-input--is-invalid {
      color: var(--ct-input-light-invalid-color);
      border-color: var(--ct-input-light-invalid-border-color);
      background-color: var(--ct-input-light-invalid-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-input-light-invalid-border-color);
    }
    .ct-input.ct-theme-light.ct-input--is-invalid::placeholder {
      color: var(--ct-input-light-invalid-color);
    }

    /* Dark theme */
    .ct-input.ct-theme-dark:focus-visible {
      outline-color: var(--ct-input-dark-outline-color);
    }
    .ct-input.ct-theme-dark:not(.ct-input--is-invalid) {
      color: var(--ct-input-dark-color);
      border-color: var(--ct-input-dark-border-color);
      background-color: var(--ct-input-dark-background-color);
      color-scheme: dark;
    }
    .ct-input.ct-theme-dark:not(.ct-input--is-invalid)::placeholder {
      color: var(--ct-input-dark-color);
    }
    .ct-input.ct-theme-dark:not(.ct-input--is-invalid):hover {
      color: var(--ct-input-dark-hover-color);
      border-color: var(--ct-input-dark-hover-border-color);
      background-color: var(--ct-input-dark-hover-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-input-dark-hover-border-color);
    }
    .ct-input.ct-theme-dark:not(.ct-input--is-invalid):focus-visible {
      color: var(--ct-input-dark-focus-color);
      border-color: var(--ct-input-dark-focus-border-color);
      background-color: var(--ct-input-dark-focus-background-color);
    }
    .ct-input.ct-theme-dark.ct-input--is-invalid {
      color: var(--ct-input-dark-invalid-color);
      border-color: var(--ct-input-dark-invalid-border-color);
      background-color: var(--ct-input-dark-invalid-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-input-dark-invalid-border-color);
    }
    .ct-input.ct-theme-dark.ct-input--is-invalid::placeholder {
      color: var(--ct-input-dark-invalid-color);
    }
  `;

  /** Theme variation. */
  @property({ type: String }) theme: InputTheme = 'light';

  /** Input type (text, email, password, number, tel, url, search, color, date, etc.). */
  @property({ type: String }) type = 'text';

  /** DOM `name` attribute — required for the input to participate in form submission. */
  @property({ type: String }) name = '';

  /**
   * DOM `id` attribute. Note: because this renders into a shadow root, an
   * external `<label for="...">` referencing this id will NOT establish a
   * working programmatic association — `for`/`id` matching does not pierce
   * shadow-DOM boundaries. Use the `aria-label` property for a reliable
   * accessible name until a cross-root association mechanism exists. This
   * is intentionally still exposed since a plain DOM id remains useful for
   * same-document tooling/testing hooks.
   */
  @property({ type: String, reflect: true }) override id = '';

  /** The input's value. */
  @property({ type: String }) value = '';

  /** Placeholder text. */
  @property({ type: String }) placeholder = '';

  /** Whether the input is in an invalid state. */
  @property({ type: Boolean, attribute: 'invalid' }) invalid = false;

  /** Whether the input is disabled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether the input is required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * Overrides the accessible name. This is the only reliable way to give
   * this component an accessible name on its own — see the `id` property's
   * doc comment for why an external `<label for>` cannot reach across the
   * shadow boundary into this component's rendered `<input>`.
   */
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

  render() {
    const classes = {
      'ct-input': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-input--is-invalid': this.invalid,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <input
        type=${this.type || 'text'}
        class=${classMap(classes)}
        data-component-name="input"
        name=${ifDefined(this.name || undefined)}
        id=${ifDefined(this.id || undefined)}
        value=${ifDefined(this.value || undefined)}
        placeholder=${ifDefined(this.placeholder || undefined)}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
        aria-invalid=${this.invalid ? 'true' : nothing}
        ?disabled=${this.disabled}
        ?required=${this.required}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-input': CtInput;
  }
}
