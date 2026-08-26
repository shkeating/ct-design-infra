import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single panel of a `ct-tabs`. This element carries panel data (heading, initial selected
 * state, an optional stable `panel-id`) and passes its own children through as the panel body —
 * all visible chrome (tablist, trigger buttons, tab/tabpanel ARIA wiring, keyboard navigation)
 * is rendered by the parent `ct-tabs`, which reads its `ct-tabs-item` children to build the tab
 * list and runs the single shared Zag.js tabs machine. Mirrors `ct-accordion-item`'s shape.
 *
 * `disabled` is not part of upstream CivicTheme's `panels` array (`tabs.component.yml` only
 * documents `title`/`content`/`id`/`is_selected`), but is a natural, low-risk addition here —
 * the ARIA tab pattern and Zag's tabs machine already support a disabled tab natively (`aria-
 * disabled`, skipped during arrow-key navigation), and `ct-accordion-item` already established
 * the same per-item `disabled` convention for this composite-element shape. Flagged as a
 * documented addition beyond upstream's schema.
 */
@customElement('ct-tabs-item')
export class CtTabsItem extends LitElement {
  /** The tab trigger's visible text. Mirrors upstream `panels[].title`. */
  @property({ type: String }) heading = '';

  /** Whether this tab is selected by default. Mirrors upstream `panels[].is_selected`. */
  @property({ type: Boolean }) selected = false;

  /** Disables selecting this tab. Addition beyond upstream's schema — see class doc comment. */
  @property({ type: Boolean }) disabled = false;

  /**
   * Optional stable id for this panel, mirroring upstream `panels[].id` (used to derive both
   * the panel's own id and its trigger's id, `${id}-tab`, matching `tabs.twig`'s scheme). Falls
   * back to an instance-scoped generated value in the parent `ct-tabs` when omitted.
   */
  @property({ type: String, attribute: 'panel-id' }) panelId?: string;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-tabs-item': CtTabsItem;
  }
}
