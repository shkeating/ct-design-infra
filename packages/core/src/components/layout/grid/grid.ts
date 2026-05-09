import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * ct-grid
 * A responsive 12-column grid container.
 */
@customElement("ct-grid")
export class ctGrid extends LitElement {
  /**
   * Defines the gap size based on spacing tokens (e.g., 100, 200, 300).
   */
  @property({ type: String }) gap: "100" | "200" | "300" | "400" = "200";

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      width: 100%;
      box-sizing: border-box;
    }

    /* Mapping gaps to your particle tokens */
    :host([gap="100"]) {
      gap: var(--ct-spacing-particle-100, 8px);
    }
    :host([gap="200"]) {
      gap: var(--ct-spacing-particle-200, 16px);
    }
    :host([gap="300"]) {
      gap: var(--ct-spacing-particle-300, 24px);
    }
    :host([gap="400"]) {
      gap: var(--ct-spacing-particle-400, 32px);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
