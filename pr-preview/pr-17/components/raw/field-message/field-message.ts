import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../icon/icon.js';
import type { IconName } from '../icon/icon-registry.js';

export type FieldMessageTheme = 'light' | 'dark';
export type FieldMessageType = 'error' | 'information' | 'warning' | 'success';

/**
 * Maps each field-message `type` to the CivicTheme icon it renders alongside the
 * message, per the reference `field-message.twig`'s `icons` map:
 * information -> information-mark, warning -> exclamation-mark-3,
 * error -> close-outline, success -> approve.
 */
const TYPE_ICONS: Record<FieldMessageType, IconName> = {
  information: 'information-mark',
  warning: 'exclamation-mark-3',
  error: 'close-outline',
  success: 'approve',
};

/**
 * A Generative UI-ready Field Message component based on CivicTheme, used to
 * surface form field validation/status messages (error, information, warning,
 * success), each paired with a status icon via the shared `ct-icon` primitive.
 */
@customElement('ct-field-message')
export class CtFieldMessage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-field-message {
      display: block;
      box-sizing: border-box;
      border-radius: var(--ct-field-message-border-radius);
      padding: 0.5rem;
      border-width: 0.0625rem;
      border-style: solid;
      font-size: var(--ct-typography-text-regular-font-size);
      line-height: var(--ct-typography-text-regular-line-height);
      font-family: var(--ct-typography-text-regular-font-name);
      font-weight: var(--ct-typography-text-regular-font-weight);
      letter-spacing: var(--ct-typography-text-regular-letter-spacing);
    }

    @media (min-width: 768px) {
      .ct-field-message {
        font-size: var(--ct-typography-text-regular-desktop-font-size);
        line-height: var(--ct-typography-text-regular-desktop-line-height);
      }
    }

    .ct-field-message__icon {
      vertical-align: top;
      line-height: 100%;
      margin-top: 0.125rem;
    }

    @media (min-width: 768px) {
      .ct-field-message__icon {
        margin-top: 0.25rem;
      }
    }

    .ct-field-message ::slotted(a:not(ct-link)) {
      color: inherit;
    }

    /* Information */
    .ct-field-message--information.ct-theme-light {
      background-color: var(--ct-field-message-light-information-background-color);
      color: var(--ct-field-message-light-information-color);
      border-color: var(--ct-field-message-light-information-border-color);
    }
    .ct-field-message--information.ct-theme-light .ct-field-message__icon {
      color: var(--ct-field-message-light-information-icon-color);
    }
    .ct-field-message--information.ct-theme-dark {
      background-color: var(--ct-field-message-dark-information-background-color);
      color: var(--ct-field-message-dark-information-color);
      border-color: var(--ct-field-message-dark-information-border-color);
    }
    .ct-field-message--information.ct-theme-dark .ct-field-message__icon {
      color: var(--ct-field-message-dark-information-icon-color);
    }

    /* Warning */
    .ct-field-message--warning.ct-theme-light {
      background-color: var(--ct-field-message-light-warning-background-color);
      color: var(--ct-field-message-light-warning-color);
      border-color: var(--ct-field-message-light-warning-border-color);
    }
    .ct-field-message--warning.ct-theme-light .ct-field-message__icon {
      color: var(--ct-field-message-light-warning-icon-color);
    }
    .ct-field-message--warning.ct-theme-dark {
      background-color: var(--ct-field-message-dark-warning-background-color);
      color: var(--ct-field-message-dark-warning-color);
      border-color: var(--ct-field-message-dark-warning-border-color);
    }
    .ct-field-message--warning.ct-theme-dark .ct-field-message__icon {
      color: var(--ct-field-message-dark-warning-icon-color);
    }

    /* Error */
    .ct-field-message--error.ct-theme-light {
      background-color: var(--ct-field-message-light-error-background-color);
      color: var(--ct-field-message-light-error-color);
      border-color: var(--ct-field-message-light-error-border-color);
    }
    .ct-field-message--error.ct-theme-light .ct-field-message__icon {
      color: var(--ct-field-message-light-error-icon-color);
    }
    .ct-field-message--error.ct-theme-dark {
      background-color: var(--ct-field-message-dark-error-background-color);
      color: var(--ct-field-message-dark-error-color);
      border-color: var(--ct-field-message-dark-error-border-color);
    }
    .ct-field-message--error.ct-theme-dark .ct-field-message__icon {
      color: var(--ct-field-message-dark-error-icon-color);
    }

    /* Success */
    .ct-field-message--success.ct-theme-light {
      background-color: var(--ct-field-message-light-success-background-color);
      color: var(--ct-field-message-light-success-color);
      border-color: var(--ct-field-message-light-success-border-color);
    }
    .ct-field-message--success.ct-theme-light .ct-field-message__icon {
      color: var(--ct-field-message-light-success-icon-color);
    }
    .ct-field-message--success.ct-theme-dark {
      background-color: var(--ct-field-message-dark-success-background-color);
      color: var(--ct-field-message-dark-success-color);
      border-color: var(--ct-field-message-dark-success-border-color);
    }
    .ct-field-message--success.ct-theme-dark .ct-field-message__icon {
      color: var(--ct-field-message-dark-success-icon-color);
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: FieldMessageTheme = 'light';

  /** Message type: error, information, warning, or success. */
  @property({ type: String }) type: FieldMessageType = 'information';

  /** The message content. */
  @property({ type: String }) content = '';

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    // Mirrors the reference twig's `{% if content is not empty %}` guard — a
    // field message with no content renders nothing.
    if (!this.content) {
      return nothing;
    }

    const type: FieldMessageType = this.type in TYPE_ICONS ? this.type : 'information';
    const iconName = TYPE_ICONS[type];

    const classes = {
      'ct-field-message': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-field-message--${type}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)} data-component-name="field-message">
        <ct-icon class="ct-field-message__icon" name=${iconName} size="regular"></ct-icon>
        ${this.content}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-field-message': CtFieldMessage;
  }
}
