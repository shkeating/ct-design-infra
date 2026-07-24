import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type TextareaTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Textarea component based on CivicTheme — a multi-line
 * text input form control with light/dark theming, an invalid state, and
 * disabled/required states. Mirrors the reference `textarea.twig`'s guard:
 * renders nothing when `name` is empty, since the native `<textarea>` requires
 * a `name` to be meaningfully submitted as part of a form.
 */
@customElement('ct-textarea')
export class CtTextarea extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-textarea {
      appearance: none;
      margin: 0;
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-family: var(--ct-typography-label-small-font-name, var(--ct-typography-family-body, sans-serif));
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
      box-sizing: border-box;
      border-radius: var(--ct-textarea-border-radius);
      border-style: solid;
      border-width: 0.0625rem;
      padding: 0.8125rem 1rem;
      width: 100%;
      vertical-align: bottom;
    }

    .ct-textarea[disabled] {
      opacity: var(--ct-textarea-disabled-opacity);
      pointer-events: none;
    }

    .ct-textarea:focus-visible {
      outline-style: solid;
      outline-width: var(--ct-textarea-outline-width);
      outline-offset: var(--ct-textarea-outline-offset);
    }

    /* Light theme */
    .ct-textarea.ct-theme-light:focus-visible {
      outline-color: var(--ct-textarea-light-outline-color);
    }

    .ct-textarea.ct-theme-light:not(.ct-textarea--is-invalid) {
      color: var(--ct-textarea-light-color);
      border-color: var(--ct-textarea-light-border-color);
      background-color: var(--ct-textarea-light-background-color);
    }
    .ct-textarea.ct-theme-light:not(.ct-textarea--is-invalid)::placeholder {
      color: var(--ct-textarea-light-color);
    }
    .ct-textarea.ct-theme-light:not(.ct-textarea--is-invalid):hover {
      color: var(--ct-textarea-light-hover-color);
      border-color: var(--ct-textarea-light-hover-border-color);
      background-color: var(--ct-textarea-light-hover-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-textarea-light-hover-border-color);
    }
    .ct-textarea.ct-theme-light:not(.ct-textarea--is-invalid):focus-visible {
      color: var(--ct-textarea-light-focus-color);
      border-color: var(--ct-textarea-light-focus-border-color);
      background-color: var(--ct-textarea-light-focus-background-color);
    }

    .ct-textarea.ct-theme-light.ct-textarea--is-invalid {
      color: var(--ct-textarea-light-invalid-color);
      border-color: var(--ct-textarea-light-invalid-border-color);
      background-color: var(--ct-textarea-light-invalid-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-textarea-light-invalid-border-color);
    }
    .ct-textarea.ct-theme-light.ct-textarea--is-invalid::placeholder {
      color: var(--ct-textarea-light-invalid-color);
    }

    /* Dark theme */
    .ct-textarea.ct-theme-dark:focus-visible {
      outline-color: var(--ct-textarea-dark-outline-color);
    }

    .ct-textarea.ct-theme-dark:not(.ct-textarea--is-invalid) {
      color: var(--ct-textarea-dark-color);
      border-color: var(--ct-textarea-dark-border-color);
      background-color: var(--ct-textarea-dark-background-color);
    }
    .ct-textarea.ct-theme-dark:not(.ct-textarea--is-invalid)::placeholder {
      color: var(--ct-textarea-dark-color);
    }
    .ct-textarea.ct-theme-dark:not(.ct-textarea--is-invalid):hover {
      color: var(--ct-textarea-dark-hover-color);
      border-color: var(--ct-textarea-dark-hover-border-color);
      background-color: var(--ct-textarea-dark-hover-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-textarea-dark-hover-border-color);
    }
    .ct-textarea.ct-theme-dark:not(.ct-textarea--is-invalid):focus-visible {
      color: var(--ct-textarea-dark-focus-color);
      border-color: var(--ct-textarea-dark-focus-border-color);
      background-color: var(--ct-textarea-dark-focus-background-color);
    }

    .ct-textarea.ct-theme-dark.ct-textarea--is-invalid {
      color: var(--ct-textarea-dark-invalid-color);
      border-color: var(--ct-textarea-dark-invalid-border-color);
      background-color: var(--ct-textarea-dark-invalid-background-color);
      box-shadow: inset 0 0 0 0.0625rem var(--ct-textarea-dark-invalid-border-color);
    }
    .ct-textarea.ct-theme-dark.ct-textarea--is-invalid::placeholder {
      color: var(--ct-textarea-dark-invalid-color);
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: TextareaTheme = 'light';

  /** DOM `name` attribute (required for the control to render — see class doc). */
  @property({ type: String }) name = '';

  /** DOM `id` attribute. */
  @property({ type: String }) id = '';

  /** The textarea's current value. */
  @property({ type: String }) value = '';

  /** Placeholder text. */
  @property({ type: String }) placeholder = '';

  /** Display rows count. */
  @property({ type: Number }) rows?: number;

  /** Whether the textarea is in an invalid state. Sets `aria-invalid="true"`. */
  @property({ type: Boolean, attribute: 'is-invalid' }) isInvalid = false;

  /** Whether the textarea is disabled. */
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;

  /** Whether the textarea is required. */
  @property({ type: Boolean, attribute: 'is-required' }) isRequired = false;

  /**
   * Accessible name override, for use when this textarea has no associated
   * `ct-label` (e.g. no `for`/`id` pairing in context). Passed straight
   * through as `aria-label`; prefer a real associated label where possible.
   */
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    // Mirrors the reference twig's `{% if name is not empty %}` guard.
    if (!this.name) {
      return nothing;
    }

    const classes = {
      'ct-textarea': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-textarea--is-invalid': this.isInvalid,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <textarea
        class=${classMap(classes)}
        name=${this.name}
        rows=${ifDefined(this.rows)}
        id=${ifDefined(this.id || undefined)}
        ?disabled=${this.isDisabled}
        ?required=${this.isRequired}
        aria-invalid=${ifDefined(this.isInvalid ? 'true' : undefined)}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
        placeholder=${ifDefined(this.placeholder || undefined)}
        data-component-name="textarea"
        .value=${this.value}
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-textarea': CtTextarea;
  }
}
