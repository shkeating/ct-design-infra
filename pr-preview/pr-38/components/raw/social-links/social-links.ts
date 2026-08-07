import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointM } from '@ct-infra/tokens';
import '../../01-atoms/button/button.js';
import '../../00-base/item-list/item-list.js';
import '../../00-base/item-list/item-list-item.js';
import type { CtSocialLinksItem } from './social-links-item.js';
import './social-links-item.js';

export type SocialLinksTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Social Links component based on CivicTheme, composing the already-ported
 * `ct-button` (tertiary, icon-only link buttons) and `ct-item-list` (horizontal layout) rather
 * than re-implementing either.
 *
 * Links are composed via `ct-social-links-item` light-DOM children (icon/url/link-title), the
 * same parent-renders-the-chrome shape as `ct-accordion`/`ct-item-list`, rather than a JSON
 * `items` prop.
 *
 * Architecture note (documented best-effort choice): upstream CivicTheme's `--with-border`
 * modifier styles the *rendered button element itself*
 * (`.ct-social-links .ct-social-links__button { border; border-radius; padding; }`), which in a
 * flat-HTML/Twig world cascades straight onto the anchor via `modifier_class`. Here, `ct-button`
 * renders into its own shadow root, so a class (or even a CSS custom property) handed down to it
 * cannot be targeted by a descendant selector written in *this* component's shadow root —
 * piercing another component's shadow internals isn't possible without adding a new escape hatch
 * (e.g. `::part`) to `ct-button` itself, and modifying that already-merged, separately-owned
 * component is out of scope for this port (the task is to reuse it, not re-implement or extend
 * it). The substitute implemented here: wrap each `ct-button` in a `<span class="ct-social-links__
 * button">` rendered in *this* component's own shadow root, and apply the border/radius/padding
 * to that wrapper instead of to `ct-button`'s internals. Visually this produces the same padded,
 * circular-border icon button upstream ships; structurally the border lives one element out from
 * where upstream puts it. Flagged here rather than blocking on a `ct-button` change.
 */
@customElement('ct-social-links')
export class CtSocialLinks extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-social-links__button {
      display: inline-block;
      line-height: 0;
    }

    .ct-social-links.ct-theme-light .ct-social-links__button {
      color: var(--ct-color-interaction-light-background);
    }
    .ct-social-links.ct-theme-dark .ct-social-links__button {
      color: var(--ct-color-interaction-dark-background);
    }

    .ct-social-links.ct-social-links--with-border .ct-social-links__button {
      border: var(--ct-social-links-button-border-width) solid currentcolor;
      border-radius: var(--ct-social-links-button-border-radius);
      padding: var(--ct-social-links-button-padding);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-social-links.ct-social-links--with-border .ct-social-links__button {
        padding: var(--ct-social-links-button-padding-desktop);
      }
    }

    /* Visually-hidden accessible name for icon-only links (see the link-title attribute on
       ct-social-links-item) — kept in the accessibility tree and screen-reader-visible while
       remaining visually hidden, so the icon-only button still gets a real accessible name. */
    .ct-social-links__visually-hidden {
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

  /** Theme variation (light or dark). */
  @property({ type: String }) theme: SocialLinksTheme = 'light';

  /** Whether icons have a circular border around them. */
  @property({ type: Boolean, attribute: 'with-border' }) withBorder = false;

  /** Additional CSS classes appended to the root element. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _items(): CtSocialLinksItem[] {
    return Array.from(this.querySelectorAll(':scope > ct-social-links-item')) as CtSocialLinksItem[];
  }

  private _hasCustomIcon(item: CtSocialLinksItem): boolean {
    return item.innerHTML.trim().length > 0;
  }

  render() {
    const items = this._items();

    if (items.length === 0) {
      return nothing;
    }

    items.forEach((item, index) => {
      item.slot = `icon-${index}`;
    });

    const classes = {
      'ct-social-links': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-social-links--with-border': this.withBorder,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)}>
        <ct-item-list direction="horizontal" modifier-class="ct-social-links__list">
          ${items.map((item, index) => this._renderItem(item, index))}
        </ct-item-list>
      </div>
    `;
  }

  private _renderItem(item: CtSocialLinksItem, index: number) {
    const hasCustomIcon = this._hasCustomIcon(item);

    return html`
      <ct-item-list-item>
        <span class="ct-social-links__button">
          <ct-button
            theme=${this.theme}
            kind="link"
            variant="tertiary"
            url=${ifDefined(item.url || undefined)}
            icon=${ifDefined(!hasCustomIcon && item.icon ? item.icon : undefined)}
            new-window
            title=${ifDefined(item.linkTitle)}
          >
            ${hasCustomIcon ? html`<slot name=${`icon-${index}`}></slot>` : nothing}
            ${item.linkTitle ? html`<span class="ct-social-links__visually-hidden">${item.linkTitle}</span>` : nothing}
          </ct-button>
        </span>
      </ct-item-list-item>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-social-links': CtSocialLinks;
  }
}
