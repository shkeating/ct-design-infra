import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single option of a `ct-select` (or of a `ct-select-optgroup` nested inside one).
 * This element carries only its own data (label/value/selected/disabled) — the parent
 * `ct-select` reads it via `querySelectorAll` and renders a real `<option>` inside its own
 * shadow-DOM `<select>` from that data, rather than this element being displayed itself.
 * Native `<select>`/`<option>` distribution does not support light-DOM slotting the way
 * `ct-accordion-item`'s panel body does, so — like `ct-breadcrumb-item` — this renders
 * nothing (`createRenderRoot` returns `this`, no shadow root, no visible output).
 */
@customElement('ct-select-option')
export class CtSelectOption extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;

  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-select-option': CtSelectOption;
  }
}
