import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * ct-region
 * The fundamental layout container.
 * Orchestrates vertical rhythm and constraints based on tokenized spacing.
 */
@customElement("ct-region")
export class ctRegion extends LitElement {
  @property({ type: String }) complexity: "simple" | "standard" | "complex" =
    "standard";
  @property({ type: Boolean }) fluid = false;

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      /* Consuming the tokens mapped from ctTheme variables */
      padding: var(--ct-spacing-layout-margin, 32px) 0;
      width: 100%;
    }

    .container {
      margin: 0 auto;
      padding: 0 var(--ct-spacing-layout-gutter, 16px);
      /* Complexity-based width constraints */
      max-width: var(--ct-container-max-width, 1280px);
    }

    :host([complexity="simple"]) .container {
      max-width: 800px; /* Optimized for reading/policy pages */
    }

    :host([complexity="complex"]) .container {
      max-width: 100%; /* Optimized for data-heavy dashboards */
    }
  `;

  render() {
    return html`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ct-region": ctRegion;
  }
}
