import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single panel of a `ct-accordion`. This element carries panel data (heading, initial
 * expanded/disabled state) and passes its own children through as the panel body — all
 * visible chrome (header, trigger button, expand/collapse behavior) is rendered by the
 * parent `ct-accordion`, which reads its `ct-accordion-item` children to build the panel
 * list and runs the single shared Zag.js accordion machine.
 */
@customElement('ct-accordion-item')
export class CtAccordionItem extends LitElement {
  @property({ type: String }) heading = '';
  @property({ type: Boolean }) expanded = false;
  @property({ type: Boolean }) disabled = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-accordion-item': CtAccordionItem;
  }
}
