import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single link of a `ct-social-links` list. Carries the link's own data — icon identifier,
 * destination URL, and an optional accessible name / tooltip — while all visible chrome (the
 * underlying `ct-button`, the `ct-item-list` wrapper, the with-border styling) is rendered by
 * the parent `ct-social-links`, which reads its `ct-social-links-item` children to build the
 * list. This mirrors `ct-accordion-item`/`ct-item-list-item`'s parent-renders-the-chrome shape
 * rather than a JSON `items` prop (array/object props aren't allowed — plain strings/booleans
 * only, so a model can emit each link the same way it emits any other element).
 *
 * Default slot content is optional and mirrors upstream CivicTheme's `icon_html` prop: when
 * provided, the parent projects it in place of the named `icon` (e.g. a custom inline SVG or an
 * `<img>`), matching the upstream Twig's icon_html-takes-precedence-over-icon behavior.
 */
@customElement('ct-social-links-item')
export class CtSocialLinksItem extends LitElement {
  /** Icon identifier, passed straight through to the underlying `ct-button`'s `icon` prop. */
  @property({ type: String }) icon?: string;

  /** Destination URL for the link. */
  @property({ type: String }) url = '';

  /**
   * Accessible name / tooltip for this link (e.g. "Facebook"). Upstream leaves this optional, but
   * the rendered button is icon-only with no visible text of its own — omitting it leaves the
   * link without an accessible name (see the architecture note in `social-links.ts`).
   */
  @property({ type: String, attribute: 'link-title' }) linkTitle?: string;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-social-links-item': CtSocialLinksItem;
  }
}
