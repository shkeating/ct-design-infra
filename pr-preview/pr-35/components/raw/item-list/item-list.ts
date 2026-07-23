import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BreakpointM } from '@ct-infra/tokens';
import type { CtItemListItem } from './item-list-item.js';
import './item-list-item.js';

export type ItemListDirection = 'horizontal' | 'vertical';
export type ItemListSize = 'large' | 'regular' | 'small';

/**
 * CivicTheme Item List — a generic layout primitive for rendering an arbitrary set of items
 * either horizontally or vertically with consistent, size-driven gaps. It has no color/typography
 * opinions of its own (upstream CivicTheme's item-list SCSS is gap/layout only) and no interactive
 * state, so unlike `ct-accordion` there's no Zag.js machine here.
 *
 * Items are composed via `ct-item-list-item` light-DOM children rather than a JSON `items` prop,
 * keeping this element's own attributes plain strings/booleans (array/object props aren't allowed).
 * Each child's content is wrapped in a real `<li class="ct-item-list__item">` rendered directly in
 * this element's own shadow root (mirroring `ct-accordion`'s parent-renders-the-list-chrome shape)
 * so the `<ul>`/`<li>` relationship never has an intervening custom element that could complicate
 * how assistive technology computes the list's role/size.
 */
@customElement('ct-item-list')
export class CtItemList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-item-list {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      border: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      box-sizing: border-box;
    }

    .ct-item-list.ct-item-list--horizontal {
      display: flex;
      flex-wrap: wrap;
      column-gap: var(--ct-item-list-horizontal-regular-gap);
      row-gap: var(--ct-item-list-horizontal-regular-gap);
    }
    .ct-item-list.ct-item-list--horizontal.ct-item-list--small {
      column-gap: var(--ct-item-list-horizontal-small-gap);
      row-gap: var(--ct-item-list-horizontal-small-gap);
    }
    .ct-item-list.ct-item-list--horizontal.ct-item-list--large {
      column-gap: var(--ct-item-list-horizontal-large-gap);
      row-gap: var(--ct-item-list-horizontal-large-gap);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-item-list.ct-item-list--horizontal.ct-item-list--large {
        column-gap: var(--ct-item-list-horizontal-large-gap-desktop);
        row-gap: var(--ct-item-list-horizontal-large-gap-desktop);
      }
    }
    .ct-item-list.ct-item-list--horizontal.ct-item-list--no-gap {
      gap: unset;
    }

    .ct-item-list.ct-item-list--vertical {
      display: flex;
      flex-direction: column;
      column-gap: var(--ct-item-list-vertical-regular-gap);
      row-gap: var(--ct-item-list-vertical-regular-gap);
    }
    .ct-item-list.ct-item-list--vertical.ct-item-list--small {
      column-gap: var(--ct-item-list-vertical-small-gap);
      row-gap: var(--ct-item-list-vertical-small-gap);
    }
    .ct-item-list.ct-item-list--vertical.ct-item-list--large {
      column-gap: var(--ct-item-list-vertical-large-gap);
      row-gap: var(--ct-item-list-vertical-large-gap);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-item-list.ct-item-list--vertical.ct-item-list--large {
        column-gap: var(--ct-item-list-vertical-large-gap-desktop);
        row-gap: var(--ct-item-list-vertical-large-gap-desktop);
      }
    }
    .ct-item-list.ct-item-list--vertical.ct-item-list--no-gap {
      gap: unset;
    }

    .ct-item-list__item {
      margin: 0;
      padding: 0;
    }
  `;

  /** List direction (horizontal or vertical). */
  @property({ type: String }) direction: ItemListDirection = 'horizontal';

  /** List size (large, regular, or small) — controls the gap between items. */
  @property({ type: String }) size: ItemListSize = 'regular';

  /** Whether to render without gaps between items. */
  @property({ type: Boolean, attribute: 'no-gap' }) noGap = false;

  /** Additional CSS classes appended to the root element. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _items(): CtItemListItem[] {
    return Array.from(this.querySelectorAll(':scope > ct-item-list-item')) as CtItemListItem[];
  }

  render() {
    const items = this._items();
    items.forEach((item, index) => {
      item.slot = `item-${index}`;
    });

    const classes = {
      'ct-item-list': true,
      [`ct-item-list--${this.direction}`]: true,
      [`ct-item-list--${this.size}`]: true,
      'ct-item-list--no-gap': this.noGap,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <ul class=${classMap(classes)}>
        ${items.map((_item, index) => html`<li class="ct-item-list__item"><slot name=${`item-${index}`}></slot></li>`)}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-item-list': CtItemList;
  }
}
