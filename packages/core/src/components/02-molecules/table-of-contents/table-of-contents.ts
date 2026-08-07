import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { CtTableOfContentsItem } from './table-of-contents-item.js';
import './table-of-contents-item.js';

export type TableOfContentsTheme = 'light' | 'dark';
export type TableOfContentsPosition = 'before' | 'after' | 'prepend' | 'append';

/**
 * A Generative UI-ready Table of Contents component based on CivicTheme, rendering a
 * heading plus a list of anchor links to sections elsewhere on the page.
 *
 * Links are composed via `ct-table-of-contents-item` light-DOM children (each carrying
 * just `text`/`url`), the same parent-renders-the-chrome shape as `ct-breadcrumb`/
 * `ct-accordion`, rather than a JSON `links` prop — array/object props aren't allowed
 * anyway (attributes stay plain strings/booleans).
 *
 * Architecture note (documented best-effort choice, no upstream `civictheme:*` composed
 * dependency to defer to): upstream CivicTheme actually ships **two** distinct behaviors
 * under this one component:
 *   1. Explicit `links` passed in (Twig `links` slot / Storybook's `TableOfContents`
 *      story) — a static, server-rendered list. This is the mode ported here.
 *   2. "Automatic" mode (Storybook's `TableOfContentsAutomatic` story, driven by
 *      `table-of-contents.js`): given no `links`, a runtime script scans the *entire
 *      document* for headings matching an `anchor_selector` within a `scope_selector`,
 *      generates ids for any that lack one, and injects a rendered TOC as a DOM sibling
 *      via `insertAdjacentHTML` at a `position` relative to that scope element.
 *
 * Mode 2 is intentionally NOT implemented here. It depends on mutating *other* elements
 * living outside this component's own shadow root/light-DOM children (assigning `id`
 * attributes to arbitrary page headings, then inserting a sibling element next to an
 * unrelated `scope_selector` target) — behavior that cannot be expressed as this
 * component's own deterministic render output from its own attributes/children, which
 * is the invariant every other ported component in this repo relies on. It's also not a
 * plain-string/boolean-attribute-safe shape for an LLM to target: `anchor_selector`/
 * `scope_selector` are arbitrary CSS selectors whose result depends on page content the
 * component doesn't own, not a fixed schema boundary. The `anchor_selector`/
 * `scope_selector` props are therefore omitted; only the explicit-links mode is exposed.
 *
 * Upstream's `title` prop (the "On this page" label) is exposed here as `heading`
 * instead — `title` is already a native `HTMLElement` property/attribute (tooltip text)
 * that a Lit `@property() title` would collide with.
 *
 * Pure styling/markup composition, no interactive state: this never needs a Zag.js
 * machine, since a table of contents has no open/close, selection, or multi-step
 * behavior to drive — it's a static list of links.
 */
@customElement('ct-table-of-contents')
export class CtTableOfContents extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-table-of-contents {
      width: 100%;
    }
    @media (max-width: 991px) {
      .ct-table-of-contents {
        margin-top: 1.5rem;
      }
    }
    @media (min-width: 768px) {
      .ct-table-of-contents {
        width: max-content;
        max-width: var(--ct-table-of-contents-max-width);
        min-width: var(--ct-table-of-contents-min-width);
      }
    }

    .ct-table-of-contents--position-before,
    .ct-table-of-contents--position-prepend {
      margin-bottom: 2rem;
    }
    .ct-table-of-contents--position-after,
    .ct-table-of-contents--position-append {
      margin-top: 2rem;
    }

    .ct-table-of-contents__title {
      font-size: var(--ct-typography-heading-4-font-size);
      line-height: var(--ct-typography-heading-4-line-height);
      font-family: var(--ct-typography-heading-4-font-name);
      font-weight: var(--ct-typography-heading-4-font-weight);
      letter-spacing: var(--ct-typography-heading-4-letter-spacing);
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    .ct-table-of-contents__links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .ct-table-of-contents__link {
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-family: var(--ct-typography-label-extra-small-font-name);
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
      display: block;
      position: relative;
      padding: 0.5rem 1rem 0.5rem 1.25rem;
      border: 0;
      border-style: solid;
      text-decoration: none;
    }
    .ct-table-of-contents__link::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: -0.0625rem;
      bottom: -0.0625rem;
      left: -0.0625rem;
      width: 0.25rem;
    }
    .ct-table-of-contents__link:active {
      outline: 0 !important;
      border-radius: 0 var(--ct-table-of-contents-link-active-border-radius) var(--ct-table-of-contents-link-active-border-radius) 0;
    }
    .ct-table-of-contents__link:focus-visible {
      z-index: 1;
    }

    /* Theme: light */
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__title {
      color: var(--ct-table-of-contents-light-title-color);
    }
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link {
      color: var(--ct-table-of-contents-light-link-color);
      background-color: var(--ct-table-of-contents-light-link-background-color);
    }
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link::before {
      background-color: var(--ct-table-of-contents-light-link-stripe-background-color);
    }
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link:hover,
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link:focus-visible,
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link:active {
      background-color: var(--ct-table-of-contents-light-link-hover-background-color);
      color: var(--ct-table-of-contents-light-link-hover-color);
    }
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link:hover::before,
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link:focus-visible::before,
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link:active::before {
      background-color: var(--ct-table-of-contents-light-link-hover-stripe-background-color);
    }
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link:active {
      border-color: var(--ct-table-of-contents-light-link-hover-border-color);
      border-width: 0.0625rem;
      border-left-width: 0;
      padding-top: 0.4375rem;
      padding-bottom: 0.4375rem;
    }
    .ct-table-of-contents.ct-theme-light .ct-table-of-contents__link:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
    }

    /* Theme: dark */
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__title {
      color: var(--ct-table-of-contents-dark-title-color);
    }
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link {
      color: var(--ct-table-of-contents-dark-link-color);
      background-color: var(--ct-table-of-contents-dark-link-background-color);
    }
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link::before {
      background-color: var(--ct-table-of-contents-dark-link-stripe-background-color);
    }
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link:hover,
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link:focus-visible,
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link:active {
      background-color: var(--ct-table-of-contents-dark-link-hover-background-color);
      color: var(--ct-table-of-contents-dark-link-hover-color);
    }
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link:hover::before,
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link:focus-visible::before,
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link:active::before {
      background-color: var(--ct-table-of-contents-dark-link-hover-stripe-background-color);
    }
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link:active {
      border-color: var(--ct-table-of-contents-dark-link-hover-border-color);
      border-width: 0.0625rem;
      border-left-width: 0;
      padding-top: 0.4375rem;
      padding-bottom: 0.4375rem;
    }
    .ct-table-of-contents.ct-theme-dark .ct-table-of-contents__link:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-dark);
    }
  `;

  /** Theme variation (light or dark). */
  @property({ type: String }) theme: TableOfContentsTheme = 'light';

  /** Heading text shown above the links (upstream's `title` prop; renamed to avoid colliding with the native `title`/tooltip attribute). */
  @property({ type: String }) heading = '';

  /** Where this component sits relative to the content it's a table of contents for — controls spacing (margin) only. */
  @property({ type: String }) position: TableOfContentsPosition = 'before';

  /** Additional CSS classes appended to the root element. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _items(): CtTableOfContentsItem[] {
    return Array.from(this.querySelectorAll(':scope > ct-table-of-contents-item')) as CtTableOfContentsItem[];
  }

  render() {
    const items = this._items();

    if (items.length === 0) {
      return nothing;
    }

    const classes = {
      'ct-table-of-contents': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-table-of-contents--position-${this.position}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)}>
        ${this.heading ? html`<h2 class="ct-table-of-contents__title">${this.heading}</h2>` : nothing}
        <ul class="ct-table-of-contents__links">
          ${items.map(
            (item) => html`
              <li class="ct-table-of-contents__link-item">
                <a class="ct-table-of-contents__link" href=${item.url}>${item.text}</a>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-table-of-contents': CtTableOfContents;
  }
}
