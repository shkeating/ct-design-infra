import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type LogoTheme = 'light' | 'dark';
export type LogoType = 'default' | 'stacked' | 'inline' | 'inline-stacked';

/**
 * A Generative UI-ready Logo component based on CivicTheme.
 * Displays a site logo with mobile/desktop image variants and an optional
 * secondary logo (with a divider stripe) for stacked/inline layouts.
 *
 * NOTE (parallel-porting flag): CivicTheme's `logo.twig` composes the
 * `civictheme:image` sub-component for every image it renders. `ct-image`
 * is being ported concurrently in a sibling worktree and does not exist in
 * this branch yet, so this component renders plain `<img>` tags directly
 * rather than depending on `ct-image`. Once `ct-image` lands, consider
 * refactoring this to compose it instead (its upstream CSS/markup is a
 * bare `<img class="ct-image ct-theme-x">` with no extra layout, so the
 * swap should be low-risk).
 */
@customElement('ct-logo')
export class CtLogo extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-logo {
      line-height: 0;
      display: inline-block;
    }

    .ct-logo:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
      border-radius: var(--ct-outline-border-radius);
    }

    .ct-logo.ct-theme-dark:focus-visible {
      outline-color: var(--ct-outline-dark);
    }

    .ct-logo__image {
      line-height: 0;
      display: block;
      max-height: var(--ct-logo-image-height-max-mobile);
    }

    @media (min-width: 992px) {
      .ct-logo__image {
        max-height: var(--ct-logo-image-height-max-desktop);
      }
    }

    /* Mobile image shown by default, hidden at desktop (upstream "hide-l"). */
    .ct-logo__image--desktop {
      display: none;
    }

    @media (min-width: 992px) {
      .ct-logo__image--mobile {
        display: none;
      }
      .ct-logo__image--desktop {
        display: block;
      }
    }

    /* Upstream: for "inline" type, the secondary logo's mobile image never
       renders (hide-xxs, no show-l counter-rule) — only its desktop image
       shows, since the side-by-side layout has no room for it on mobile. */
    .ct-logo--inline .ct-logo__secondary .ct-logo__image--mobile {
      display: none;
    }

    .ct-logo--stacked,
    .ct-logo--inline,
    .ct-logo--inline-stacked {
      text-align: center;
    }

    .ct-logo--stacked .ct-logo__stripe,
    .ct-logo--inline .ct-logo__stripe,
    .ct-logo--inline-stacked .ct-logo__stripe {
      display: block;
      border: 0;
      margin: 1rem 0;
      height: 0.0625rem;
      width: 100%;
    }

    @media (min-width: 992px) {
      .ct-logo--inline,
      .ct-logo--inline-stacked {
        display: flex;
        align-items: center;
      }
      .ct-logo--inline .ct-logo__stripe,
      .ct-logo--inline-stacked .ct-logo__stripe {
        align-self: stretch;
        margin: 0 1rem;
        height: auto;
        width: 0.0625rem;
      }
    }

    .ct-logo.ct-theme-light .ct-logo__stripe {
      background-color: var(--ct-logo-light-stripe-background-color);
    }

    .ct-logo.ct-theme-dark .ct-logo__stripe {
      background-color: var(--ct-logo-dark-stripe-background-color);
    }
  `;

  /** Theme variation (light or dark). */
  @property({ type: String }) theme: LogoTheme = 'light';

  /** Logo display type (default, stacked, inline, inline-stacked). */
  @property({ type: String }) type: LogoType = 'default';

  /** Optional URL that wraps the logo in a link. */
  @property({ type: String }) url?: string;

  /** Optional logo title attribute (only rendered when `url` wraps the logo). */
  @property({ type: String }) title = 'Click to go to the homepage';

  /** Primary logo, mobile image URL. */
  @property({ type: String, attribute: 'primary-mobile-url' }) primaryMobileUrl?: string;

  /** Primary logo, mobile image alt text. */
  @property({ type: String, attribute: 'primary-mobile-alt' }) primaryMobileAlt = '';

  /** Primary logo, desktop image URL. */
  @property({ type: String, attribute: 'primary-desktop-url' }) primaryDesktopUrl?: string;

  /** Primary logo, desktop image alt text. */
  @property({ type: String, attribute: 'primary-desktop-alt' }) primaryDesktopAlt = '';

  /** Secondary logo, mobile image URL (only rendered when `type` is not "default"). */
  @property({ type: String, attribute: 'secondary-mobile-url' }) secondaryMobileUrl?: string;

  /** Secondary logo, mobile image alt text. */
  @property({ type: String, attribute: 'secondary-mobile-alt' }) secondaryMobileAlt = '';

  /** Secondary logo, desktop image URL (only rendered when `type` is not "default"). */
  @property({ type: String, attribute: 'secondary-desktop-url' }) secondaryDesktopUrl?: string;

  /** Secondary logo, desktop image alt text. */
  @property({ type: String, attribute: 'secondary-desktop-alt' }) secondaryDesktopAlt = '';

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private renderImage(url: string | undefined, alt: string, breakpointClass: string) {
    if (!url) {
      return nothing;
    }
    return html`<img class="ct-logo__image ${breakpointClass}" src=${url} alt=${alt} />`;
  }

  private renderLogoGroup(groupClass: string, mobileUrl: string | undefined, mobileAlt: string, desktopUrl: string | undefined, desktopAlt: string) {
    if (!mobileUrl && !desktopUrl) {
      return nothing;
    }
    return html`
      <span class="${groupClass}">
        ${this.renderImage(mobileUrl, mobileAlt, 'ct-logo__image--mobile')}
        ${this.renderImage(desktopUrl, desktopAlt, 'ct-logo__image--desktop')}
      </span>
    `;
  }

  render() {
    const hasPrimary = !!(this.primaryMobileUrl || this.primaryDesktopUrl);
    const hasSecondary = !!(this.secondaryMobileUrl || this.secondaryDesktopUrl);

    if (!hasPrimary && !hasSecondary) {
      return nothing;
    }

    const classes = {
      'ct-logo': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-logo--${this.type}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    const showSecondary = this.type !== 'default' && hasSecondary;

    const content = html`
      ${this.renderLogoGroup('ct-logo__primary', this.primaryMobileUrl, this.primaryMobileAlt, this.primaryDesktopUrl, this.primaryDesktopAlt)}
      ${showSecondary ? html`<span class="ct-logo__stripe"></span>` : nothing}
      ${showSecondary
        ? this.renderLogoGroup('ct-logo__secondary', this.secondaryMobileUrl, this.secondaryMobileAlt, this.secondaryDesktopUrl, this.secondaryDesktopAlt)
        : nothing}
    `;

    if (this.url) {
      return html`
        <a class=${classMap(classes)} href=${this.url} title=${ifDefined(this.title)}>
          ${content}
        </a>
      `;
    }

    return html`<div class=${classMap(classes)}>${content}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-logo': CtLogo;
  }
}
