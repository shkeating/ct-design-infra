import { LitElement, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type LabelTheme = 'light' | 'dark';
export type LabelTag = 'label' | 'legend';
export type LabelSize = 'extra-large' | 'large' | 'regular' | 'small' | 'extra-small';

/**
 * A Generative UI-ready Label component based on CivicTheme, used to caption
 * form elements (or a `<fieldset>` via `tag="legend"`). Renders nothing when
 * `content` is empty.
 */
@customElement('ct-label')
export class CtLabel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-label {
      display: block;
      margin: 0;
      margin-bottom: 0.5rem;
      -webkit-tap-highlight-color: transparent;
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
    }

    /* Sizes */
    .ct-label--extra-large {
      font-size: var(--ct-typography-label-extra-large-font-size);
      line-height: var(--ct-typography-label-extra-large-line-height);
      font-family: var(--ct-typography-label-extra-large-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-extra-large-font-weight);
      letter-spacing: var(--ct-typography-label-extra-large-letter-spacing);
    }

    .ct-label--large {
      font-size: var(--ct-typography-label-large-font-size);
      line-height: var(--ct-typography-label-large-line-height);
      font-family: var(--ct-typography-label-large-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-large-font-weight);
      letter-spacing: var(--ct-typography-label-large-letter-spacing);
    }

    .ct-label--regular {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
    }

    .ct-label--small {
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-family: var(--ct-typography-label-small-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
    }

    .ct-label--extra-small {
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-family: var(--ct-typography-label-extra-small-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
    }

    /* Themes */
    .ct-label.ct-theme-light {
      color: var(--ct-label-light-color);
    }
    .ct-label.ct-theme-light .ct-label__required {
      color: var(--ct-label-light-required-color);
    }

    .ct-label.ct-theme-dark {
      color: var(--ct-label-dark-color);
    }
    .ct-label.ct-theme-dark .ct-label__required {
      color: var(--ct-label-dark-required-color);
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: LabelTheme = 'light';

  /** HTML tag to render: `label` or `legend`. */
  @property({ type: String }) tag: LabelTag = 'label';

  /** The label's text content. Nothing is rendered when this is empty. */
  @property({ type: String }) content = '';

  /** Label size. */
  @property({ type: String }) size: LabelSize = 'regular';

  /** Whether the label marks its associated field as required. */
  @property({ type: Boolean }) required = false;

  /** Text shown when `required` is set. Defaults to "(required)". */
  @property({ type: String, attribute: 'required-text' }) requiredText = '(required)';

  /** ID of the form element this label belongs to (maps to the `for` attribute when `tag` is "label"). */
  @property({ type: String }) for?: string;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.content) {
      return nothing;
    }

    const tag = this.tag === 'legend' ? 'legend' : 'label';
    const classes = {
      'ct-label': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-label--${this.size}`]: true,
      'ct-label--required': this.required,
      [this.modifierClass]: !!this.modifierClass,
    };

    const requiredHtml = this.required
      ? html`<span class="ct-label__required">${this.requiredText}</span>`
      : nothing;

    const tagName = unsafeStatic(tag);
    return html`
      <${tagName}
        class=${classMap(classes)}
        for=${ifDefined(tag === 'label' ? this.for : undefined)}
        data-component-name="label"
      >${this.content}${this.required ? ' ' : nothing}${requiredHtml}</${tagName}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-label': CtLabel;
  }
}
