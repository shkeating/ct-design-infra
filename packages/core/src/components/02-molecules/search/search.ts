import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../01-atoms/link/link.js';

export type SearchTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Search component based on CivicTheme: a search-page
 * toggle rendered as a `civictheme:link` styled with a trailing magnifier icon.
 *
 * Composes the real `ct-link` element (theme, label, url, icon="magnifier",
 * icon-placement="after", icon-group-disabled) rather than falling back to a
 * plain `<a>` — `ct-link` already supports the icon/icon-placement props this
 * needs (established by button/tag).
 *
 * Upstream renders this as a nav-drawer menu item (its compiled CSS styles
 * `.ct-search__link` via `--ct-navigation-*` drawer/menu-item tokens, since in
 * the original single-DOM-tree markup that class lands on `civictheme:link`'s
 * own `<a>`). Because `ct-link` renders its `<a>` inside its own shadow root,
 * this component can't reach that element directly — the menu-item chrome
 * (background, bottom border, padding, hover/active swaps) is applied instead
 * to a wrapping `<span>` here. `:hover`/`:focus-within`/`:active` on that wrap
 * still respond correctly to interaction on `ct-link`'s internal anchor —
 * those pseudo-classes match through the composed (flattened) tree across
 * shadow boundaries per spec, same as plain `:hover` bubbling.
 *
 * The wrap intentionally does *not* re-declare `ct-link`'s own text/icon
 * color: `--ct-navigation-*-menu-color` and `--ct-color-interaction-*` both
 * alias the same `color.interaction.<theme>.*` primitives in this token set,
 * so `ct-link`'s default theme coloring already matches what the navigation
 * tokens specify — no cross-shadow-boundary override needed.
 *
 * Documented simplifications (best-effort, flagged rather than blocking):
 * - Upstream also visually hides the link text below 767px (icon-only on
 *   mobile), via a `.ct-search__link-text` span nested inside the text passed
 *   to `civictheme:link`. `ct-link`'s `label` prop is a plain string, not
 *   slotted markup, so there's no hook to wrap it in that span without
 *   modifying `ct-link` itself (a shared primitive also consumed by
 *   button/tag) — out of scope for this port, omitted here.
 * - Upstream's `[aria-expanded=true]` "active" treatment applies when this is
 *   used as a toggle for a search drawer, a state set by the not-yet-ported
 *   navigation component from outside. This port only implements the mouse
 *   `:active` (pressed) state, not a persistent expanded/active prop.
 *
 * Pure styling/composition, no interactive state of its own: this is a themed
 * link, not a toggle/expand/selection control, so no Zag.js machine applies.
 */
@customElement('ct-search')
export class CtSearch extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-search {
      display: flex;
      align-items: center;
    }

    .ct-search__link-wrap {
      display: inline-block;
      box-sizing: border-box;
      border-bottom: solid 0.25rem transparent;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: var(--ct-navigation-drawer-top-offset);
      padding-bottom: var(--ct-navigation-drawer-top-offset);
      text-align: center;
    }

    /* Theme: light */
    .ct-search.ct-theme-light .ct-search__link-wrap {
      background-color: var(--ct-navigation-light-drawer-menu-item-background-color);
      border-bottom-color: var(--ct-navigation-light-menu-item-border-color);
    }
    .ct-search.ct-theme-light .ct-search__link-wrap:is(:hover, :focus-within) {
      background-color: var(--ct-navigation-light-drawer-menu-item-hover-background-color);
      border-bottom-color: var(--ct-navigation-light-menu-item-hover-border-color);
    }
    .ct-search.ct-theme-light .ct-search__link-wrap:active {
      background-color: var(--ct-navigation-light-drawer-menu-item-active-background-color);
      border-bottom-color: var(--ct-navigation-light-menu-item-active-border-color);
    }

    /* Theme: dark */
    .ct-search.ct-theme-dark .ct-search__link-wrap {
      background-color: var(--ct-navigation-dark-drawer-menu-item-background-color);
      border-bottom-color: var(--ct-navigation-dark-menu-item-border-color);
    }
    .ct-search.ct-theme-dark .ct-search__link-wrap:is(:hover, :focus-within) {
      background-color: var(--ct-navigation-dark-drawer-menu-item-hover-background-color);
      border-bottom-color: var(--ct-navigation-dark-menu-item-hover-border-color);
    }
    .ct-search.ct-theme-dark .ct-search__link-wrap:active {
      background-color: var(--ct-navigation-dark-drawer-menu-item-active-background-color);
      border-bottom-color: var(--ct-navigation-dark-menu-item-active-border-color);
    }
  `;

  /** Theme variation (light or dark). */
  @property({ type: String }) theme: SearchTheme = 'light';

  /** Text for the search link (CivicTheme's `text` slot). */
  @property({ type: String }) label = '';

  /** Search page URL (CivicTheme's `url` slot). */
  @property({ type: String }) url?: string;

  /** Additional CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    const classes = {
      'ct-search': true,
      [`ct-theme-${this.theme}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)}>
        <span class="ct-search__link-wrap">
          <ct-link
            theme=${this.theme}
            label=${this.label}
            url=${ifDefined(this.url)}
            icon="magnifier"
            icon-placement="after"
            icon-group-disabled
            modifier-class="ct-search__link"
          ></ct-link>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-search': CtSearch;
  }
}
