import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointM } from '@ct-infra/tokens';
import '../../01-atoms/button/button.js';
import '../../00-base/icon/icon.js';

export type AlertTheme = 'light' | 'dark';
export type AlertType = 'information' | 'warning' | 'error' | 'success';

/** Maps each alert type to its CivicTheme icon, matching alert.twig's `icons` map. */
const TYPE_ICONS: Record<AlertType, string> = {
  information: 'information-mark',
  warning: 'exclamation-mark-2',
  error: 'exclamation-mark-1',
  success: 'megaphone',
};

/**
 * A Generative UI-ready Alert component based on CivicTheme. Composes
 * `ct-button` (dismiss control) and `ct-icon` (type indicator).
 *
 * Note on scope: upstream CivicTheme's `alert.js` also drives a page-level
 * `ct-alerts` container that fetches alerts from a remote endpoint and
 * persists dismissals via a cookie across the whole site. That's
 * page/application orchestration, not something a single element should own,
 * so this component only owns its own dismiss interaction: clicking the
 * dismiss button hides the element and fires a `ct-alert-dismiss`
 * `CustomEvent` (bubbling, composed) carrying `{ type, identifier }` in
 * `detail` so a consuming page can persist/re-fetch as needed.
 */
@customElement('ct-alert')
export class CtAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-alert {
      position: relative;
      box-sizing: border-box;
      padding: 1rem;
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-family: var(--ct-typography-label-extra-small-font-name);
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-alert {
        padding: 1.5rem;
      }
    }

    /*
     * Upstream's alert.css lays the title/summary out via CivicTheme's
     * bootstrap-like .container/.row/.col-* grid classes, which aren't
     * ported into this design system as reusable global CSS (they're a
     * separate ct-grid/ct-grid-item element pair with a different API).
     * This reproduces the same visual proportions and breakpoint (stacked
     * below 768px, title ~25%/summary ~75% at 768px+) with flexbox instead.
     */
    .ct-alert__inner {
      display: flex;
      flex-direction: column;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-alert__inner {
        flex-direction: row;
      }
    }

    .ct-alert__title {
      font-size: var(--ct-typography-heading-6-font-size);
      line-height: var(--ct-typography-heading-6-line-height);
      font-family: var(--ct-typography-heading-6-font-name);
      font-weight: var(--ct-typography-heading-6-font-weight);
      letter-spacing: var(--ct-typography-heading-6-letter-spacing);
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-alert__title {
        flex: 0 0 25%;
        margin-bottom: 0;
      }
    }

    .ct-alert__icon {
      display: inline-flex;
      width: 1.5rem;
      margin-right: 0.5rem;
      line-height: 100%;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-alert__icon {
        margin-right: 1rem;
      }
    }

    .ct-alert__summary {
      display: flex;
      align-items: center;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-alert__summary {
        flex: 1 1 75%;
        position: relative;
      }
    }

    .ct-alert__description {
      margin: 0;
    }

    .ct-alert__dismiss-button {
      cursor: pointer;
      margin-left: 1.5rem;
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: transparent;
      padding: 0;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-alert__dismiss-button {
        position: unset;
        align-self: center;
        margin-left: auto;
        top: 50%;
        bottom: 50%;
      }
    }

    /* Visually-hidden accessible name for the icon-only dismiss button. */
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Theme + type combinations */
    .ct-alert.ct-theme-light.ct-alert--information {
      background-color: var(--ct-alert-light-information-background-color);
      color: var(--ct-alert-light-information-color);
    }
    .ct-alert.ct-theme-light.ct-alert--information .ct-alert__icon {
      color: var(--ct-alert-light-information-icon-color);
    }

    .ct-alert.ct-theme-light.ct-alert--warning {
      background-color: var(--ct-alert-light-warning-background-color);
      color: var(--ct-alert-light-warning-color);
    }
    .ct-alert.ct-theme-light.ct-alert--warning .ct-alert__icon {
      color: var(--ct-alert-light-warning-icon-color);
    }

    .ct-alert.ct-theme-light.ct-alert--error {
      background-color: var(--ct-alert-light-error-background-color);
      color: var(--ct-alert-light-error-color);
    }
    .ct-alert.ct-theme-light.ct-alert--error .ct-alert__icon {
      color: var(--ct-alert-light-error-icon-color);
    }

    .ct-alert.ct-theme-light.ct-alert--success {
      background-color: var(--ct-alert-light-success-background-color);
      color: var(--ct-alert-light-success-color);
    }
    .ct-alert.ct-theme-light.ct-alert--success .ct-alert__icon {
      color: var(--ct-alert-light-success-icon-color);
    }

    .ct-alert.ct-theme-dark.ct-alert--information {
      background-color: var(--ct-alert-dark-information-background-color);
      color: var(--ct-alert-dark-information-color);
    }
    .ct-alert.ct-theme-dark.ct-alert--information .ct-alert__icon {
      color: var(--ct-alert-dark-information-icon-color);
    }

    .ct-alert.ct-theme-dark.ct-alert--warning {
      background-color: var(--ct-alert-dark-warning-background-color);
      color: var(--ct-alert-dark-warning-color);
    }
    .ct-alert.ct-theme-dark.ct-alert--warning .ct-alert__icon {
      color: var(--ct-alert-dark-warning-icon-color);
    }

    .ct-alert.ct-theme-dark.ct-alert--error {
      background-color: var(--ct-alert-dark-error-background-color);
      color: var(--ct-alert-dark-error-color);
    }
    .ct-alert.ct-theme-dark.ct-alert--error .ct-alert__icon {
      color: var(--ct-alert-dark-error-icon-color);
    }

    .ct-alert.ct-theme-dark.ct-alert--success {
      background-color: var(--ct-alert-dark-success-background-color);
      color: var(--ct-alert-dark-success-color);
    }
    .ct-alert.ct-theme-dark.ct-alert--success .ct-alert__icon {
      color: var(--ct-alert-dark-success-icon-color);
    }
  `;

  /** Theme variation: light or dark. Mirrors `civictheme:alert`'s `theme` prop. */
  @property({ type: String }) theme: AlertTheme = 'light';

  /** Alert type: information, warning, error, or success. */
  @property({ type: String }) type: AlertType = 'information';

  /** Alert title, rendered next to the type icon. Mirrors the upstream `title` slot. */
  @property({ type: String }) heading = '';

  /** Alert body copy. Mirrors the upstream `description` slot; rich content can also be passed via the default slot. */
  @property({ type: String }) description = '';

  /**
   * Unique identifier. Mirrors upstream's `id` prop (named `identifier` here
   * to avoid colliding with the native global `id` attribute); used for the
   * `data-alert-id` attribute and surfaced in the `ct-alert-dismiss` event detail.
   */
  @property({ type: String }) identifier = '';

  /**
   * Opt out of the dismiss ("x") control. Upstream always renders it; this
   * defaults to false (dismiss shown) to match, and is a default-false /
   * presence-toggled flag (like `disabled`/`external` on `ct-button`) rather
   * than a default-true one, since a plain HTML boolean attribute has no way
   * to represent "true by default, but explicitly false" — only presence
   * (true) vs. absence (false).
   */
  @property({ type: Boolean, attribute: 'no-dismiss' }) noDismiss = false;

  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  @state() private dismissed = false;

  private handleDismiss = () => {
    this.dismissed = true;
    this.dispatchEvent(
      new CustomEvent('ct-alert-dismiss', {
        bubbles: true,
        composed: true,
        detail: { type: this.type, identifier: this.identifier },
      }),
    );
  };

  render() {
    if (this.dismissed) {
      return nothing;
    }

    const classes = {
      'ct-alert': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-alert--${this.type}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div
        class=${classMap(classes)}
        data-alert-id=${ifDefined(this.identifier || undefined)}
        data-alert-type=${this.type}
        data-component-name="ct-alert"
        role="alert"
      >
        <div class="ct-alert__inner">
          <div class="ct-alert__title">
            <span class="ct-alert__icon">
              <ct-icon name=${TYPE_ICONS[this.type]} size="regular"></ct-icon>
            </span>
            ${this.heading}
          </div>

          <div class="ct-alert__summary">
            ${this.description ? html`<p class="ct-alert__description">${this.description}</p>` : nothing}
            <slot></slot>
            ${!this.noDismiss
              ? html`
                  <ct-button
                    kind="button"
                    theme=${this.theme}
                    variant="tertiary"
                    size="regular"
                    icon="cancel"
                    modifier-class="ct-alert__dismiss-button"
                    @click=${this.handleDismiss}
                  >
                    <span class="visually-hidden">Close ${this.type} alert</span>
                  </ct-button>
                `
              : nothing}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-alert': CtAlert;
  }

  interface HTMLElementEventMap {
    'ct-alert-dismiss': CustomEvent<{ type: AlertType; identifier: string }>;
  }
}
