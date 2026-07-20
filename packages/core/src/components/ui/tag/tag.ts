import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type TagTheme = 'light' | 'dark';
export type TagVariant = 'primary' | 'secondary' | 'tertiary';
export type TagIconPlacement = 'before' | 'after';

/**
 * A Generative UI-ready Tag component based on CivicTheme, for labelling or
 * categorizing content. Renders as a `<span>` by default, or an `<a>` when a
 * `url` is provided.
 */
@customElement('ct-tag')
export class CtTag extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-tag {
      display: inline-block;
      box-sizing: border-box;
      border-style: solid;
      border-width: var(--ct-tag-border-width, 0.0625rem);
      border-radius: var(--ct-tag-border-radius, 0.25rem);
      font-family: var(--ct-typography-family-heading, sans-serif);
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
      text-decoration: none;
      padding: 0;
    }

    a.ct-tag {
      cursor: pointer;
    }

    .ct-tag:hover,
    .ct-tag:active,
    .ct-tag:focus-visible {
      text-decoration: none;
    }

    /* Primary and secondary carry padding; tertiary stays flush like a text label. */
    .ct-tag--primary,
    .ct-tag--secondary {
      padding: 0.25rem 0.5rem;
    }

    /* Primary */
    .ct-tag--primary.ct-theme-light {
      background-color: var(--ct-tag-light-primary-background-color);
      border-color: var(--ct-tag-light-primary-border-color);
      color: var(--ct-tag-light-primary-color);
    }
    .ct-tag--primary.ct-theme-dark {
      background-color: var(--ct-tag-dark-primary-background-color);
      border-color: var(--ct-tag-dark-primary-border-color);
      color: var(--ct-tag-dark-primary-color);
    }

    /* Secondary */
    .ct-tag--secondary.ct-theme-light {
      background-color: var(--ct-tag-light-secondary-background-color);
      border-color: var(--ct-tag-light-secondary-border-color);
      color: var(--ct-tag-light-secondary-color);
    }
    .ct-tag--secondary.ct-theme-dark {
      background-color: var(--ct-tag-dark-secondary-background-color);
      border-color: var(--ct-tag-dark-secondary-border-color);
      color: var(--ct-tag-dark-secondary-color);
    }

    /* Tertiary */
    .ct-tag--tertiary.ct-theme-light {
      background-color: var(--ct-tag-light-tertiary-background-color);
      border-color: var(--ct-tag-light-tertiary-border-color);
      color: var(--ct-tag-light-tertiary-color);
    }
    .ct-tag--tertiary.ct-theme-dark {
      background-color: var(--ct-tag-dark-tertiary-background-color);
      border-color: var(--ct-tag-dark-tertiary-border-color);
      color: var(--ct-tag-dark-tertiary-color);
    }

    /* Icon */
    .ct-tag__icon {
      display: inline-block;
      font-size: 1rem;
      vertical-align: middle;
    }

    .ct-tag--icon-before .ct-tag__icon {
      margin-right: 0.125rem;
    }

    .ct-tag--icon-after .ct-tag__icon {
      margin-left: 0.125rem;
    }

    .ct-tag__text {
      text-decoration: none;
      vertical-align: middle;
    }

    /* Screen-reader-only text (e.g. "opens in a new tab" announcements). */
    .ct-visually-hidden {
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
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: TagTheme = 'light';

  /** Visual style variant. */
  @property({ type: String }) variant: TagVariant = 'primary';

  /** Tag content/label. */
  @property({ type: String }) label = '';

  /** Name of the icon to display alongside the label. */
  @property({ type: String }) icon?: string;

  /** Position of the icon relative to the label. */
  @property({ type: String, attribute: 'icon-placement' }) iconPlacement: TagIconPlacement = 'after';

  /** Optional URL — when set, the tag renders as a link instead of a span. */
  @property({ type: String }) url?: string;

  /** Opens the link in a new tab/window (only applies when `url` is set). */
  @property({ type: Boolean, attribute: 'new-window' }) newWindow = false;

  /** Marks the link as external, appending an external-link icon. */
  @property({ type: Boolean }) external = false;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.label) {
      return nothing;
    }

    const classes = {
      'ct-tag': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-tag--${this.variant}`]: true,
      [`ct-tag--icon-${this.iconPlacement}`]: !!this.icon,
      'ct-tag--external': this.external,
      [this.modifierClass]: !!this.modifierClass,
    };

    const iconHtml = this.icon
      ? html`<span class="ct-tag__icon ct-icon ct-icon--${this.icon}"></span>`
      : nothing;
    const textHtml = html`<span class="ct-tag__text">${this.label}</span>`;
    const newWindowHtml = this.url && this.newWindow
      ? html`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>`
      : nothing;
    const externalHtml = this.external
      ? html`<span class="ct-tag__icon ct-icon ct-icon--upper-right-arrow"></span>`
      : nothing;

    const innerHtml = html`
      ${this.iconPlacement === 'before' ? iconHtml : nothing}
      ${textHtml}
      ${this.iconPlacement === 'after' ? iconHtml : nothing}
      ${newWindowHtml}
      ${externalHtml}
      <slot></slot>
    `;

    if (this.url) {
      return html`
        <a
          class=${classMap(classes)}
          href=${this.url}
          title=${this.label}
          target=${ifDefined(this.newWindow ? '_blank' : undefined)}
          aria-label=${ifDefined(this.newWindow ? 'Opens in a new tab' : undefined)}
          data-component-name="tag"
        >
          ${innerHtml}
        </a>
      `;
    }

    return html`
      <span class=${classMap(classes)} data-component-name="tag">
        ${innerHtml}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-tag': CtTag;
  }
}
