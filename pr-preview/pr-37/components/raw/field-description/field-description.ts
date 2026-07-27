import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type FieldDescriptionTheme = 'light' | 'dark';
export type FieldDescriptionSize = 'large' | 'regular';

/**
 * A Generative UI-ready Field Description component based on CivicTheme, used
 * to render supplementary hint/help text below a form field (e.g. format
 * guidance), distinct from `ct-label` (the field's identifying label) and
 * `ct-field-message` (validation/status feedback for the field).
 */
@customElement('ct-field-description')
export class CtFieldDescription extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-field-description {
      display: block;
      box-sizing: border-box;
      margin-bottom: var(--ct-spacing-particle-100);
      font-size: var(--ct-typography-text-regular-font-size);
      line-height: var(--ct-typography-text-regular-line-height);
      font-family: var(--ct-typography-text-regular-font-name);
      font-weight: var(--ct-typography-text-regular-font-weight);
      letter-spacing: var(--ct-typography-text-regular-letter-spacing);
    }

    .ct-field-description--large {
      font-size: var(--ct-typography-text-large-font-size);
      line-height: var(--ct-typography-text-large-line-height);
      font-family: var(--ct-typography-text-large-font-name);
      font-weight: var(--ct-typography-text-large-font-weight);
      letter-spacing: var(--ct-typography-text-large-letter-spacing);
    }

    .ct-field-description.ct-theme-light {
      color: var(--ct-field-description-light-color);
    }
    .ct-field-description.ct-theme-light ::slotted(a:not(.ct-link)) {
      color: inherit;
    }

    .ct-field-description.ct-theme-dark {
      color: var(--ct-field-description-dark-color);
    }
    .ct-field-description.ct-theme-dark ::slotted(a:not(.ct-link)) {
      color: inherit;
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: FieldDescriptionTheme = 'light';

  /** Description size: large or regular. */
  @property({ type: String }) size: FieldDescriptionSize = 'regular';

  /** The description's text content. */
  @property({ type: String }) content = '';

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    // Mirrors the reference twig's `{% if content is not empty %}` guard — a
    // field description with no content renders nothing.
    if (!this.content) {
      return nothing;
    }

    const size: FieldDescriptionSize = this.size === 'large' ? 'large' : 'regular';

    const classes = {
      'ct-field-description': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-field-description--${size}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)} data-component-name="field-description">
        ${this.content}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-field-description': CtFieldDescription;
  }
}
