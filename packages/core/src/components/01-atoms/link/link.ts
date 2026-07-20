import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../00-base/icon/icon.js';

export type LinkTheme = 'light' | 'dark';
export type LinkIconPlacement = 'before' | 'after';

/**
 * A Generative UI-ready Link component based on CivicTheme.
 */
@customElement('ct-link')
export class CtLink extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-link {
      display: inline-block;
      cursor: pointer;
      box-sizing: border-box;
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      text-decoration: none;
      /* No matching token found in civictheme.variables.css for this padding —
         it is hardcoded in the upstream compiled CSS too, so ported literally. */
      padding: 0.1875rem 0 0.125rem;
      word-break: break-word;
    }

    .ct-link:is(:hover, :focus-visible) .ct-link__text {
      text-decoration: underline;
    }

    .ct-link:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
      border-radius: var(--ct-outline-border-radius);
    }

    .ct-link[disabled] {
      pointer-events: none;
      user-select: none;
      opacity: 50%;
    }

    .ct-link.ct-link--only-icon {
      display: inline-block;
      line-height: 0;
      /* No matching token found — hardcoded in upstream compiled CSS. */
      padding: 0.5rem;
      margin: -0.5rem;
    }

    /* Theme: light */
    .ct-link.ct-theme-light {
      color: var(--ct-color-interaction-light-background);
    }
    .ct-link.ct-theme-light:is(:hover, :focus-visible, :visited:hover, :visited:focus-visible) {
      color: var(--ct-color-interaction-light-hover-background);
    }
    .ct-link.ct-theme-light:visited {
      color: var(--ct-color-interaction-light-background);
    }
    .ct-link.ct-theme-light.ct-link--active,
    .ct-link.ct-theme-light:active {
      color: var(--ct-color-light-body);
    }

    /* Theme: dark */
    .ct-link.ct-theme-dark {
      color: var(--ct-color-interaction-dark-background);
    }
    .ct-link.ct-theme-dark:is(:hover, :focus-visible, :visited:hover, :visited:focus-visible) {
      color: var(--ct-color-interaction-dark-hover-background);
    }
    .ct-link.ct-theme-dark:visited {
      color: var(--ct-color-interaction-dark-background);
    }
    .ct-link.ct-theme-dark.ct-link--active,
    .ct-link.ct-theme-dark:active {
      color: var(--ct-color-dark-body);
    }

    .ct-link__icon {
      display: inline-block;
      vertical-align: middle;
    }

    .ct-link__text {
      vertical-align: middle;
    }

    /* Keeps a trailing icon grouped with the last word so it never wraps alone. */
    .ct-link__group {
      white-space: nowrap;
    }

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

  @property({ type: String }) theme: LinkTheme = 'light';
  @property({ type: String }) label = '';
  @property({ type: String }) url?: string;
  @property({ type: String, attribute: 'title' }) linkTitle?: string;
  @property({ type: Boolean, attribute: 'new-window' }) newWindow = false;
  @property({ type: Boolean }) external = false;
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) icon?: string;
  @property({ type: String, attribute: 'icon-placement' }) iconPlacement: LinkIconPlacement = 'after';
  @property({ type: Boolean, attribute: 'icon-group-disabled' }) iconGroupDisabled = false;
  @property({ type: Boolean, attribute: 'icon-single-only' }) iconSingleOnly = false;
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * Mirrors CivicTheme's text-icon sub-component: renders the label with an
   * optional leading/trailing icon, an external-link indicator, and groups
   * the last word with any trailing icon(s) so they never wrap onto their own line.
   */
  private renderContent() {
    const icon = this.external && this.iconSingleOnly ? 'upper-right-arrow' : this.icon;
    const hasIconOrExternal = !!icon || this.external;

    const newWindowHtml = this.newWindow
      ? html`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>`
      : nothing;

    if (!hasIconOrExternal) {
      return html`<span class="ct-link__text">${this.label}</span>${newWindowHtml}`;
    }

    const iconHtml = icon
      ? html`<ct-icon class="ct-link__icon" name=${icon}></ct-icon>`
      : nothing;

    if (!this.label) {
      return html`${iconHtml}${newWindowHtml}`;
    }

    const words = this.label.trim().split(/\s+/);
    const lastWord = words[words.length - 1] ?? '';
    const leadWords = words.slice(0, -1).join(' ');
    const showFullText = this.iconGroupDisabled || (this.iconPlacement === 'before' && !this.external);

    const beforeIcon = this.iconPlacement === 'before' ? iconHtml : nothing;
    const afterIcons = html`
      ${this.iconPlacement === 'after' ? iconHtml : nothing}
      ${this.external && !this.iconSingleOnly
        ? html`<ct-icon class="ct-link__icon ct-link__icon--external" name="upper-right-arrow"></ct-icon>`
        : nothing}
    `;

    if (showFullText) {
      return html`${beforeIcon}<span class="ct-link__text">${this.label}</span>${afterIcons}${newWindowHtml}`;
    }

    return html`
      ${beforeIcon}<span class="ct-link__text">${leadWords} </span
      ><span class="ct-link__group"><span class="ct-link__text">${lastWord}</span> ${afterIcons}</span
      >${newWindowHtml}
    `;
  }

  render() {
    const onlyIcon = !!this.icon && !this.label;
    const classes = {
      'ct-link': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-link--external': this.external,
      'ct-link--active': this.active,
      'ct-link--disabled': this.disabled,
      'ct-link--only-icon': onlyIcon,
      [this.modifierClass]: !!this.modifierClass,
    };

    if (!this.label && !this.icon) {
      return nothing;
    }

    return html`
      <a
        class=${classMap(classes)}
        data-component-name="link"
        href=${ifDefined(this.url)}
        title=${ifDefined(this.linkTitle)}
        target=${ifDefined(this.newWindow ? '_blank' : undefined)}
        rel=${ifDefined(this.newWindow ? 'noopener noreferrer' : undefined)}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
      >
        ${this.renderContent()}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-link': CtLink;
  }
}
