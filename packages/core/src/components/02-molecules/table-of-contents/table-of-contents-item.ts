import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single link of a `ct-table-of-contents`. This element carries only its own data
 * (link text and target URL/anchor) — all visible chrome (the wrapping `<div>`,
 * optional `heading`, and the `<ul>`/`<li>`/`<a>` list) is rendered by the parent
 * `ct-table-of-contents`, which reads its `ct-table-of-contents-item` children to
 * build the list. It renders nothing itself.
 */
@customElement('ct-table-of-contents-item')
export class CtTableOfContentsItem extends LitElement {
  @property({ type: String }) text = '';
  @property({ type: String }) url = '';

  createRenderRoot() {
    // No shadow root, no visible output — pure data carrier read by the parent via
    // querySelectorAll, mirroring `ct-breadcrumb-item`/`ct-accordion-item`.
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-table-of-contents-item': CtTableOfContentsItem;
  }
}
