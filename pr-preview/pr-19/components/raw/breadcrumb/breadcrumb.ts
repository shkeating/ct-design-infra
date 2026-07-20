import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../link/link.js';
import '../icon/icon.js';
import type { CtBreadcrumbItem } from './breadcrumb-item.js';
import './breadcrumb-item.js';

export type BreadcrumbTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Breadcrumb component based on CivicTheme, showing the
 * hierarchical path of pages leading to the current one.
 *
 * Crumbs are composed via `ct-breadcrumb-item` light-DOM children (each carrying
 * just `text`/`url`) rather than a JSON `links` prop, keeping this element's own
 * attributes plain strings/booleans. All chrome — the `<nav>`, crumb links
 * (via `ct-link`), separators (via `ct-icon`), and the final "current page"
 * treatment — is rendered here from those children's data.
 *
 * Pure styling/markup composition, no interactive state: unlike `ct-accordion`
 * this never needs a Zag.js machine, since a breadcrumb trail has no open/close,
 * selection, or multi-step behavior to drive.
 */
@customElement('ct-breadcrumb')
export class CtBreadcrumb extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-breadcrumb {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
    }

    /* Reset shared by both crumb lists, matching CivicTheme's ct-item-list base rule. */
    .ct-breadcrumb__links {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0;
      padding: 0;
      border: 0;
      list-style: none;
      column-gap: 1rem;
      row-gap: 1rem;
    }

    /* The link and its trailing separator sit flush against each other (CivicTheme
       concatenates them into one item-list entry rather than two flex children with
       a gap between) — this only centers them vertically against each other. */
    .ct-breadcrumb__links li {
      display: flex;
      align-items: center;
    }

    /* Full trail: hidden on narrow viewports (a compact "back" link is shown instead —
       see .ct-breadcrumb__links--mobile below), shown from the m breakpoint (768px) up.
       No gap between crumbs — separators between them supply the visual spacing. */
    .ct-breadcrumb__links--full {
      display: none;
      column-gap: unset;
      row-gap: unset;
    }
    @media (min-width: 768px) {
      .ct-breadcrumb__links--full {
        display: flex;
      }
    }

    /* Mobile-only compact "back to parent" link, hidden from the m breakpoint up.
       Upstream's breadcrumb.twig applies a show-xxs-flex utility class here that does not
       actually exist in CivicTheme's compiled CSS (only show-xxs/show-xxs-table do) —
       flagged per the porting fallback rule; the visible intent (flex, mobile-only) is
       unambiguous from the paired hide-m, so it's implemented directly here instead. */
    .ct-breadcrumb__links--mobile {
      display: flex;
    }
    @media (min-width: 768px) {
      .ct-breadcrumb__links--mobile {
        display: none;
      }
    }

    .ct-breadcrumb__links__link--active {
      text-decoration: none;
      cursor: default;
    }

    a.ct-breadcrumb__links__link--active {
      cursor: pointer;
    }
    a.ct-breadcrumb__links__link--active:is(:hover, :focus-visible) {
      text-decoration: underline;
    }
    a.ct-breadcrumb__links__link--active:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      border-radius: var(--ct-outline-border-radius);
    }

    /* Theme: light */
    .ct-breadcrumb.ct-theme-light .ct-breadcrumb__links__separator {
      color: var(--ct-breadcrumb-light-color);
    }
    .ct-breadcrumb.ct-theme-light .ct-breadcrumb__links__link--active {
      color: var(--ct-breadcrumb-light-active-color);
    }
    .ct-breadcrumb.ct-theme-light a.ct-breadcrumb__links__link--active:focus-visible {
      outline-color: var(--ct-outline-light);
    }

    /* Theme: dark */
    .ct-breadcrumb.ct-theme-dark .ct-breadcrumb__links__separator {
      color: var(--ct-breadcrumb-dark-color);
    }
    .ct-breadcrumb.ct-theme-dark .ct-breadcrumb__links__link--active {
      color: var(--ct-breadcrumb-dark-active-color);
    }
    .ct-breadcrumb.ct-theme-dark a.ct-breadcrumb__links__link--active:focus-visible {
      outline-color: var(--ct-outline-dark);
    }
  `;

  @property({ type: String }) theme: BreadcrumbTheme = 'light';
  @property({ type: Boolean, attribute: 'active-is-link' }) activeIsLink = false;
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _items(): CtBreadcrumbItem[] {
    return Array.from(this.querySelectorAll(':scope > ct-breadcrumb-item')) as CtBreadcrumbItem[];
  }

  /** The full desktop trail: every crumb, separated by a `right-arrow-1` icon. */
  private renderFullLinks(items: CtBreadcrumbItem[]) {
    const lastIndex = items.length - 1;

    return html`
      <ul class="ct-breadcrumb__links ct-breadcrumb__links--full">
        ${items.map((item, index) => {
          const isLast = index === lastIndex;
          const showSeparator = !isLast;

          return html`
            <li>
              ${isLast ? this.renderActiveCrumb(item) : this.renderCrumbLink(item)}
              ${showSeparator
                ? html`<ct-icon
                    class="ct-breadcrumb__links__separator"
                    name="right-arrow-1"
                  ></ct-icon>`
                : nothing}
            </li>
          `;
        })}
      </ul>
    `;
  }

  /** Compact mobile trail: just a "back to parent" link, shown below the `m` breakpoint. */
  private renderMobileLink(items: CtBreadcrumbItem[]) {
    if (items.length < 2) {
      return nothing;
    }

    const parent = items[items.length - 2];

    return html`
      <ul class="ct-breadcrumb__links ct-breadcrumb__links--mobile">
        <li>
          <ct-link
            theme=${this.theme}
            label=${parent.text}
            url=${ifDefined(parent.url)}
            icon="left-arrow"
            icon-placement="before"
          ></ct-link>
        </li>
      </ul>
    `;
  }

  /** A non-active crumb: a normal `ct-link`. */
  private renderCrumbLink(item: CtBreadcrumbItem) {
    return html`
      <ct-link
        theme=${this.theme}
        label=${item.text}
        url=${ifDefined(item.url)}
        modifier-class="ct-breadcrumb__links__link"
      ></ct-link>
    `;
  }

  /**
   * The final crumb (current page). Rendered as plain text unless `active-is-link`
   * is set and the crumb has a URL, in which case it's a real link so it stays
   * navigable — but styled identically (CivicTheme's `--active-color` token), and
   * still marked `aria-current="location"` either way.
   */
  private renderActiveCrumb(item: CtBreadcrumbItem) {
    if (!this.activeIsLink || !item.url) {
      return html`<span class="ct-breadcrumb__links__link--active" aria-current="location">${item.text}</span>`;
    }

    return html`
      <a
        class="ct-breadcrumb__links__link--active"
        href=${item.url}
        aria-current="location"
      >${item.text}</a
      >
    `;
  }

  render() {
    const items = this._items();

    if (items.length === 0) {
      return nothing;
    }

    const classes = {
      'ct-breadcrumb': true,
      [`ct-theme-${this.theme}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <nav class=${classMap(classes)} aria-label="breadcrumb">
        ${this.renderMobileLink(items)} ${this.renderFullLinks(items)}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-breadcrumb': CtBreadcrumb;
  }
}
