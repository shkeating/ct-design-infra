import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type ButtonTheme = 'light' | 'dark';
export type ButtonKind = 'button' | 'link' | 'reset' | 'submit';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'large' | 'regular' | 'small';
export type IconPlacement = 'before' | 'after';

/**
 * A Generative UI-ready Button component based on CivicTheme.
 */
@customElement('ct-button')
export class CtButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-button {
      display: inline-block;
      cursor: pointer;
      box-sizing: border-box;
      appearance: button;
      text-decoration: none;
      border-style: solid;
      border-width: var(--ct-button-border-width, 0.125rem);
      border-radius: var(--ct-button-border-radius, 0.25rem);
      outline-offset: var(--ct-button-outline-offset, 0.125rem);
      outline-width: var(--ct-button-outline-width, 0.1875rem);
      transition: all var(--ct-button-animation-duration, 0.25s) ease;
      font-family: var(--ct-typography-family-heading, sans-serif);
      text-align: center;
    }

    .ct-button:focus-visible,
    .ct-button:hover,
    .ct-button:active {
      text-decoration: none;
    }

    .ct-button[disabled] {
      text-decoration: none;
      pointer-events: none;
      user-select: none;
      opacity: 50%;
    }

    /* Sizes */
    .ct-button--large {
      font-size: var(--ct-typography-label-large-font-size);
      line-height: var(--ct-typography-label-large-line-height);
      font-weight: var(--ct-typography-label-large-font-weight);
      letter-spacing: var(--ct-typography-label-large-letter-spacing);
      padding: 1rem 3rem;
    }

    .ct-button--regular {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      padding: 0.875rem 2.5rem;
    }

    .ct-button--small {
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
      padding: 0.5rem 2rem;
    }

    .ct-button--tertiary.ct-button--large,
    .ct-button--tertiary.ct-button--regular,
    .ct-button--tertiary.ct-button--small {
      padding: 0;
      border-color: transparent;
    }

    /* Primary */
    .ct-button--primary.ct-theme-light {
      background-color: var(--ct-color-interaction-light-background);
      border-color: var(--ct-color-interaction-light-background);
      color: var(--ct-color-interaction-light-text);
    }
    .ct-button--primary.ct-theme-light:hover {
      background-color: var(--ct-color-interaction-light-hover-background);
      border-color: var(--ct-color-interaction-light-hover-background);
      color: var(--ct-color-interaction-light-hover-text);
    }
    .ct-button--primary.ct-theme-light:active {
      background-color: var(--ct-color-interaction-light-hover-background);
      border-color: var(--ct-color-interaction-light-hover-background);
      color: var(--ct-color-interaction-light-hover-text);
    }
    .ct-button--primary.ct-theme-light:focus-visible {
      outline-color: var(--ct-color-interaction-light-focus);
      outline-style: solid;
    }

    .ct-button--primary.ct-theme-dark {
      background-color: var(--ct-color-interaction-dark-background);
      border-color: var(--ct-color-interaction-dark-background);
      color: var(--ct-color-interaction-dark-text);
    }
    .ct-button--primary.ct-theme-dark:hover {
      background-color: var(--ct-color-interaction-dark-hover-background);
      border-color: var(--ct-color-interaction-dark-hover-background);
      color: var(--ct-color-interaction-dark-hover-text);
    }
    .ct-button--primary.ct-theme-dark:active {
      background-color: var(--ct-color-interaction-dark-hover-background);
      border-color: var(--ct-color-interaction-dark-hover-background);
      color: var(--ct-color-interaction-dark-hover-text);
    }
    .ct-button--primary.ct-theme-dark:focus-visible {
      outline-color: var(--ct-color-interaction-dark-focus);
      outline-style: solid;
    }

    /* Secondary */
    .ct-button--secondary.ct-theme-light {
      background-color: transparent;
      border-color: var(--ct-color-interaction-light-background);
      color: var(--ct-color-interaction-light-background);
    }
    .ct-button--secondary.ct-theme-light:hover,
    .ct-button--secondary.ct-theme-light:active {
      background-color: transparent;
      border-color: var(--ct-color-interaction-light-hover-background);
      color: var(--ct-color-interaction-light-hover-background);
    }
    .ct-button--secondary.ct-theme-light:focus-visible {
      outline-color: var(--ct-color-interaction-light-focus);
      outline-style: solid;
    }

    .ct-button--secondary.ct-theme-dark {
      background-color: transparent;
      border-color: var(--ct-color-interaction-dark-background);
      color: var(--ct-color-interaction-dark-background);
    }
    .ct-button--secondary.ct-theme-dark:hover,
    .ct-button--secondary.ct-theme-dark:active {
      background-color: transparent;
      border-color: var(--ct-color-interaction-dark-hover-background);
      color: var(--ct-color-interaction-dark-hover-background);
    }
    .ct-button--secondary.ct-theme-dark:focus-visible {
      outline-color: var(--ct-color-interaction-dark-focus);
      outline-style: solid;
    }

    /* Tertiary */
    .ct-button--tertiary.ct-theme-light {
      background-color: transparent;
      color: var(--ct-color-interaction-light-background);
    }
    .ct-button--tertiary.ct-theme-light:hover,
    .ct-button--tertiary.ct-theme-light:active {
      background-color: transparent;
      color: var(--ct-color-interaction-light-hover-background);
    }
    .ct-button--tertiary.ct-theme-light:focus-visible {
      outline-color: var(--ct-color-interaction-light-focus);
      outline-style: solid;
    }

    .ct-button--tertiary.ct-theme-dark {
      background-color: transparent;
      color: var(--ct-color-interaction-dark-background);
    }
    .ct-button--tertiary.ct-theme-dark:hover,
    .ct-button--tertiary.ct-theme-dark:active {
      background-color: transparent;
      color: var(--ct-color-interaction-dark-hover-background);
    }
    .ct-button--tertiary.ct-theme-dark:focus-visible {
      outline-color: var(--ct-color-interaction-dark-focus);
      outline-style: solid;
    }

    .ct-button--tertiary:focus-visible,
    .ct-button--tertiary:hover,
    .ct-button--tertiary:active {
      text-decoration: none;
    }

    .ct-button__icon {
      display: inline-block;
      vertical-align: middle;
    }

    .ct-button__text {
      vertical-align: middle;
    }
  `;

  @property({ type: String }) theme: ButtonTheme = 'light';
  @property({ type: String }) kind: ButtonKind = 'button';
  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: String }) size: ButtonSize = 'regular';
  @property({ type: String }) label = '';
  @property({ type: String }) url?: string;
  @property({ type: String }) icon?: string;
  @property({ type: String, attribute: 'icon-placement' }) iconPlacement: IconPlacement = 'after';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, attribute: 'new-window' }) newWindow = false;
  @property({ type: Boolean }) external = false;
  @property({ type: Boolean }) dismissable = false;
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    const classes = {
      'ct-button': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-button--${this.variant}`]: true,
      [`ct-button--${this.size}`]: true,
      'ct-button--external': this.external,
      'ct-button--dismiss': this.dismissable,
      [this.modifierClass]: !!this.modifierClass,
    };

    const iconHtml = this.icon ? html`<span class="ct-button__icon ct-icon ct-icon--${this.icon}"></span>` : nothing;
    const textHtml = this.label ? html`<span class="ct-button__text">${this.label}</span>` : nothing;
    const innerHtml = html`
      ${this.iconPlacement === 'before' ? iconHtml : nothing}
      ${textHtml}
      <slot></slot>
      ${this.iconPlacement === 'after' ? iconHtml : nothing}
    `;

    if (this.kind === 'link') {
      return html`
        <a 
          href=${ifDefined(this.url)} 
          role="button" 
          class=${classMap(classes)} 
          data-component-name="button"
          target=${ifDefined(this.newWindow ? '_blank' : undefined)}
          rel=${ifDefined(this.newWindow ? 'noopener noreferrer' : undefined)}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
        >
          ${innerHtml}
        </a>
      `;
    }

    if (this.kind === 'submit' || this.kind === 'reset') {
      return html`
        <input 
          type=${this.kind} 
          class=${classMap(classes)} 
          data-component-name="button"
          value=${this.label}
          ?disabled=${this.disabled}
        />
      `;
    }

    // Default button
    return html`
      <button 
        type="button" 
        class=${classMap(classes)} 
        data-component-name="button"
        ?disabled=${this.disabled}
      >
        ${innerHtml}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-button': CtButton;
  }
}
