import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single crumb of a `ct-breadcrumb`. This element carries only its own data
 * (link text and, optionally, a URL) — all visible chrome (the `<nav>`, the
 * `ct-link`/`ct-icon` rendering, separators, and the active/current-page state)
 * is rendered by the parent `ct-breadcrumb`, which reads its `ct-breadcrumb-item`
 * children to build the trail. It renders nothing itself.
 */
@customElement('ct-breadcrumb-item')
export class CtBreadcrumbItem extends LitElement {
  @property({ type: String }) text = '';
  @property({ type: String }) url?: string;

  createRenderRoot() {
    // No shadow root, no visible output — this element is a pure data carrier
    // read by the parent via querySelectorAll, mirroring `ct-accordion-item`.
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-breadcrumb-item': CtBreadcrumbItem;
  }
}
