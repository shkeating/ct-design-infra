import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * A single item of a `ct-item-list`. Upstream CivicTheme's `item-list.twig` treats each item as
 * opaque HTML content with no per-item metadata (unlike `ct-accordion-item`'s `heading`/`expanded`/
 * `disabled`), so this element carries no props of its own — it exists purely so `ct-item-list` has
 * a light-DOM child to enumerate and slot into the `<li class="ct-item-list__item">` it renders for
 * each item in its own shadow root.
 */
@customElement('ct-item-list-item')
export class CtItemListItem extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-item-list-item': CtItemListItem;
  }
}
