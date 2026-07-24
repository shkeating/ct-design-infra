import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single link of a `ct-callout`. Mirrors upstream CivicTheme's `links` Twig prop, which is
 * an array of `{ text, url, is_new_window, is_external }` objects rather than markup - since
 * array/object props aren't allowed on Lit properties (plain strings/booleans only), each link
 * is instead a light-DOM `ct-callout-link` child carrying just that data. `ct-callout` reads its
 * `ct-callout-link` children directly and renders the actual `ct-item-list` + `ct-button` markup
 * itself (mirroring `ct-accordion`/`ct-item-list`'s parent-renders-the-chrome shape) - this
 * element has no visible rendering of its own beyond a passthrough `<slot>`.
 */
@customElement('ct-callout-link')
export class CtCalloutLink extends LitElement {
  /** Link text (rendered as the button label). */
  @property({ type: String }) text = '';

  /** Link URL. */
  @property({ type: String }) url?: string;

  /** Whether to open the link in a new window/tab. */
  @property({ type: Boolean, attribute: 'new-window' }) newWindow = false;

  /** Whether the link is external. */
  @property({ type: Boolean }) external = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-callout-link': CtCalloutLink;
  }
}
