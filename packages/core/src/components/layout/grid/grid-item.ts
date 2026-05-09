/**
 * ct-grid-item
 * Manages column spanning within a ct-grid.
 */
@customElement("ct-grid-item")
export class ctGridItem extends LitElement {
  @property({ type: Number }) span = 12; // Mobile-first default
  @property({ type: Number }) spanOver768 = 6;
  @property({ type: Number }) spanOver1280 = 4;

  static styles = css`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    @media (min-width: 768px) {
      :host {
        grid-column: span var(--grid-item-span-tablet, var(--grid-item-span));
      }
    }

    @media (min-width: 1280px) {
      :host {
        grid-column: span
          var(--grid-item-span-desktop, var(--grid-item-span-tablet));
      }
    }
  `;

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("span")) {
      this.style.setProperty("--grid-item-span", this.span.toString());
    }
    if (changedProperties.has("spanOver768")) {
      this.style.setProperty(
        "--grid-item-span-tablet",
        this.spanOver768.toString(),
      );
    }
    if (changedProperties.has("spanOver1280")) {
      this.style.setProperty(
        "--grid-item-span-desktop",
        this.spanOver1280.toString(),
      );
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
