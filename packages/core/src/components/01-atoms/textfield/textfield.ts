import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type TextfieldTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Textfield component based on CivicTheme — a
 * single-line `<input type="text">` with light/dark theming, hover/focus,
 * disabled and invalid states. Mirrors the upstream `textfield.twig`: it
 * renders nothing without a `name`.
 *
 * `ct-textfield` renders only the input itself (no visible label), matching
 * upstream. Pair it with `ct-label` (`for`/`id`) for an accessible name, or
 * set `aria-label` directly when no visible label is present — see
 * `wcag-data/textfield.json`'s 4.1.2 entry.
 */
@customElement('ct-textfield')
export class CtTextfield extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-textfield {
      appearance: none;
      margin: 0;
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-family: var(--ct-typography-label-small-font-name);
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
    }

    .ct-textfield[disabled] {
      opacity: var(--ct-textfield-disabled-opacity);
      pointer-events: none;
    }

    .ct-textfield {
      border-radius: var(--ct-textfield-border-radius);
      border-style: solid;
      border-width: 0.0625rem;
      padding: 0.8125rem 1rem;
      width: 100%;
      box-sizing: border-box;
    }

    .ct-textfield:focus-visible {
      outline-style: solid;
      outline-width: var(--ct-textfield-outline-width);
      outline-offset: var(--ct-textfield-outline-offset);
    }

    /* Light theme */
    .ct-textfield.ct-theme-light:focus-visible {
      outline-color: var(--ct-textfield-light-outline-color);
    }

    .ct-textfield.ct-theme-light:not(.ct-textfield--is-invalid) {
      color: var(--ct-textfield-light-color);
      border-color: var(--ct-textfield-light-border-color);
      background-color: var(--ct-textfield-light-background-color);
    }
    .ct-textfield.ct-theme-light:not(.ct-textfield--is-invalid)::placeholder {
      color: var(--ct-textfield-light-color);
    }
    .ct-textfield.ct-theme-light:not(.ct-textfield--is-invalid):hover {
      color: var(--ct-textfield-light-hover-color);
      border-color: var(--ct-textfield-light-hover-border-color);
      background-color: var(--ct-textfield-light-hover-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-textfield-light-hover-border-color);
    }
    .ct-textfield.ct-theme-light:not(.ct-textfield--is-invalid):focus-visible {
      color: var(--ct-textfield-light-focus-color);
      border-color: var(--ct-textfield-light-focus-border-color);
      background-color: var(--ct-textfield-light-focus-background-color);
    }

    .ct-textfield.ct-theme-light.ct-textfield--is-invalid {
      color: var(--ct-textfield-light-invalid-color);
      border-color: var(--ct-textfield-light-invalid-border-color);
      background-color: var(--ct-textfield-light-invalid-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-textfield-light-invalid-border-color);
    }
    .ct-textfield.ct-theme-light.ct-textfield--is-invalid::placeholder {
      color: var(--ct-textfield-light-invalid-color);
    }

    /* Dark theme */
    .ct-textfield.ct-theme-dark:focus-visible {
      outline-color: var(--ct-textfield-dark-outline-color);
    }

    .ct-textfield.ct-theme-dark:not(.ct-textfield--is-invalid) {
      color: var(--ct-textfield-dark-color);
      border-color: var(--ct-textfield-dark-border-color);
      background-color: var(--ct-textfield-dark-background-color);
    }
    .ct-textfield.ct-theme-dark:not(.ct-textfield--is-invalid)::placeholder {
      color: var(--ct-textfield-dark-color);
    }
    .ct-textfield.ct-theme-dark:not(.ct-textfield--is-invalid):hover {
      color: var(--ct-textfield-dark-hover-color);
      border-color: var(--ct-textfield-dark-hover-border-color);
      background-color: var(--ct-textfield-dark-hover-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-textfield-dark-hover-border-color);
    }
    .ct-textfield.ct-theme-dark:not(.ct-textfield--is-invalid):focus-visible {
      color: var(--ct-textfield-dark-focus-color);
      border-color: var(--ct-textfield-dark-focus-border-color);
      background-color: var(--ct-textfield-dark-focus-background-color);
    }

    .ct-textfield.ct-theme-dark.ct-textfield--is-invalid {
      color: var(--ct-textfield-dark-invalid-color);
      border-color: var(--ct-textfield-dark-invalid-border-color);
      background-color: var(--ct-textfield-dark-invalid-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-textfield-dark-invalid-border-color);
    }
    .ct-textfield.ct-theme-dark.ct-textfield--is-invalid::placeholder {
      color: var(--ct-textfield-dark-invalid-color);
    }
  `;

  /** Theme variation (light or dark). */
  @property({ type: String }) theme: TextfieldTheme = 'light';

  /** DOM `name` attribute — required for the field to render, mirroring upstream `textfield.twig`. */
  @property({ type: String }) name = '';

  /** Initial value of the field. */
  @property({ type: String }) value = '';

  /** Placeholder text shown when the field is empty. */
  @property({ type: String }) placeholder = '';

  /** Whether the field is in an invalid/error state. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Disables the field. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Marks the field as required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * DOM `id` — set this to pair the field with an external `ct-label for=""`
   * (or any `<label for="">`), since `ct-textfield` renders no label of its
   * own. Overrides the native `HTMLElement.id` so it participates in Lit's
   * reactive update cycle like any other property.
   */
  @property({ type: String, reflect: true }) override id = '';

  /**
   * Overrides the accessible name. `ct-textfield` has no visible label of its
   * own (see class doc) — set this when the field isn't paired with an
   * external `<label for="">`/`ct-label`, otherwise the field has no
   * accessible name at all. Typed nullable to match `LitElement`'s native
   * `ARIAMixin` override shape.
   */
  @property({ type: String, attribute: 'aria-label', reflect: true }) override ariaLabel: string | null = null;

  render() {
    // Mirrors upstream textfield.twig: `{% if name is not empty %}`.
    if (!this.name) {
      return nothing;
    }

    const classes = {
      'ct-textfield': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-textfield--is-invalid': this.invalid,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <input
        type="text"
        class=${classMap(classes)}
        name=${this.name}
        id=${ifDefined(this.id || undefined)}
        value=${ifDefined(this.value || undefined)}
        placeholder=${ifDefined(this.placeholder || undefined)}
        ?disabled=${this.disabled}
        ?required=${this.required}
        aria-invalid=${ifDefined(this.invalid ? 'true' : undefined)}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-textfield': CtTextfield;
  }
}
