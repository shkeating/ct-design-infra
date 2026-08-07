import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointL } from '@ct-infra/tokens';
import '../../00-base/item-list/item-list.js';
import '../../00-base/item-list/item-list-item.js';
import '../../01-atoms/tag/tag.js';
import type { CtTagListItem } from './tag-list-item.js';
import './tag-list-item.js';

export type TagListTheme = 'light' | 'dark';
export type TagListVerticalSpacing = 'none' | 'top' | 'bottom' | 'both';

/**
 * A Generative UI-ready Tag List component based on CivicTheme, composing the already-ported
 * `ct-item-list` (horizontal, small-gap layout) and `ct-tag` (individual tag chrome) rather than
 * re-implementing either — mirrors upstream `tag-list.twig`'s own `civictheme:item-list` /
 * `civictheme:tag` includes.
 *
 * Tags are composed via `ct-tag-list-item` light-DOM children rather than a JSON `tags` prop
 * (array/object props aren't allowed — plain strings/booleans only), the same parent-renders-
 * the-chrome shape as `ct-accordion`/`ct-social-links`. Each item is wrapped in a
 * `ct-item-list-item` and rendered as a `ct-tag` in this element's own shadow root.
 *
 * Upstream wraps its *entire* markup — including the `content_top`/`content_bottom` slots — in
 * `{% if tags is not empty %}`, so this component renders nothing at all unless at least one
 * `ct-tag-list-item` child is present, same as `ct-item-list`/`ct-social-links` render nothing
 * with zero items.
 *
 * There is no compiled `tag-list.css` upstream (checked via the GitHub contents API — the
 * directory has no `.css` file at all, only `.twig`/`.component.yml`/`.stories.js`/`.test.js`),
 * so this component contributes no styling of its own beyond the two shared utility classes
 * upstream's Twig actually applies to the wrapper (`ct-theme-<theme>` and, unlike
 * `ct-accordion`/`ct-attachment`/`ct-callout`/`ct-iframe`/`ct-next-steps`'s `ct-vertical-spacing-
 * inset--*`, the *margin*, not padding, variant `ct-vertical-spacing--<type>` — confirmed against
 * `tag-list.twig`'s own `vertical_spacing_class` line, which upstream genuinely spells without
 * `-inset`). All visible chrome/color/typography comes from the composed `ct-item-list`/`ct-tag`.
 */
@customElement('ct-tag-list')
export class CtTagList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* Vertical spacing utility (mirrors CivicTheme's shared, not-yet-ported
       .ct-vertical-spacing--* utility class from 00-base/spacing — the margin
       variant, not the padding/"-inset" variant other ported components use;
       see class doc comment above for why the base value is computed rather
       than reconciled against a resolved --ct-tag-list-* variable). */
    .ct-tag-list.ct-vertical-spacing--top {
      margin-top: var(--ct-tag-list-vertical-spacing);
    }
    .ct-tag-list.ct-vertical-spacing--bottom {
      margin-bottom: var(--ct-tag-list-vertical-spacing);
    }
    .ct-tag-list.ct-vertical-spacing--both {
      margin-top: var(--ct-tag-list-vertical-spacing);
      margin-bottom: var(--ct-tag-list-vertical-spacing);
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-tag-list.ct-vertical-spacing--top {
        margin-top: calc(var(--ct-tag-list-vertical-spacing) * 2);
      }
      .ct-tag-list.ct-vertical-spacing--bottom {
        margin-bottom: calc(var(--ct-tag-list-vertical-spacing) * 2);
      }
      .ct-tag-list.ct-vertical-spacing--both {
        margin-top: calc(var(--ct-tag-list-vertical-spacing) * 2);
        margin-bottom: calc(var(--ct-tag-list-vertical-spacing) * 2);
      }
    }
  `;

  /** Theme variation: light or dark. Becomes each tag's default theme unless a tag overrides it. */
  @property({ type: String }) theme: TagListTheme = 'light';

  /** Vertical spacing position: none, top, bottom, or both. */
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: TagListVerticalSpacing = 'none';

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _items(): CtTagListItem[] {
    return Array.from(this.querySelectorAll(':scope > ct-tag-list-item')) as CtTagListItem[];
  }

  private _hasSlotted(slotName: string): boolean {
    return this.querySelector(`:scope > [slot="${slotName}"]`) !== null;
  }

  render() {
    const items = this._items();

    // Upstream: `{% if tags is not empty %}` wraps the entire component, including the
    // content_top/content_bottom slots — no tags means nothing renders at all.
    if (items.length === 0) {
      return nothing;
    }

    const hasContentTop = this._hasSlotted('content-top');
    const hasContentBottom = this._hasSlotted('content-bottom');

    const classes = {
      'ct-tag-list': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-vertical-spacing--${this.verticalSpacing}`]: this.verticalSpacing !== 'none',
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)} data-component-name="tag-list">
        ${hasContentTop
          ? html`<div class="ct-tag-list__content-top"><slot name="content-top"></slot></div>`
          : nothing}
        <ct-item-list direction="horizontal" size="small" modifier-class="ct-tag-list__content">
          ${items.map((item) => this._renderItem(item))}
        </ct-item-list>
        ${hasContentBottom
          ? html`<div class="ct-tag-list__content-bottom"><slot name="content-bottom"></slot></div>`
          : nothing}
      </div>
    `;
  }

  private _renderItem(item: CtTagListItem) {
    return html`
      <ct-item-list-item>
        <ct-tag
          theme=${item.theme ?? this.theme}
          variant=${item.variant}
          label=${item.content}
          icon=${ifDefined(item.icon || undefined)}
          icon-placement=${item.iconPlacement}
          url=${ifDefined(item.url || undefined)}
          ?new-window=${item.isNewWindow}
          ?external=${item.external}
        ></ct-tag>
      </ct-item-list-item>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-tag-list': CtTagList;
  }
}
