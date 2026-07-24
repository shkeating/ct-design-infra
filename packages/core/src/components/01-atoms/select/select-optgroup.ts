import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A group of `ct-select-option` children within a `ct-select`. Carries only the group's
 * own data (label/disabled) — the parent `ct-select` reads it via `querySelectorAll` and
 * renders a real `<optgroup>` (with its nested `<option>`s) inside its own shadow-DOM
 * `<select>` from that data. Like `ct-select-option`, this renders nothing itself.
 */
@customElement('ct-select-optgroup')
export class CtSelectOptgroup extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;

  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-select-optgroup': CtSelectOptgroup;
  }
}
