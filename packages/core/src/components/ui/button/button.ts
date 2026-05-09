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
    /* Base styles and variables for the button should be provided via global CSS/tokens, 
       but we can include minimal encapsulation styles if needed.
       For now, we rely on the global CivicTheme CSS being present or imported. */
    .ct-button {
      /* Placeholder for component-specific encapsulation if not using global CSS */
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
