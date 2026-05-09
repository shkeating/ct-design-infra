import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
// Path depends on your Style Dictionary build output
import { breakpoint } from "@ct-infra/tokens";

@customElement("ct-grid-item")
export class ctGridItem extends LitElement {
  /**
   * Column span for the smallest tier (xxs/xs)
   */
  @property({ type: Number }) span = 12;

  /**
   * Column span for medium (m) and large (l) tiers
   */
  @property({ type: Number }) spanM = 6;
  @property({ type: Number }) spanL = 6;

  /**
   * Column span for extra-large (xl) and above
   */
  @property({ type: Number }) spanXl = 4;

  static styles = css`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    @media (min-width: ${unsafeCSS(breakpoint.m.$value)}) {
      :host {
        grid-column: span var(--grid-item-span-m, var(--grid-item-span));
      }
    }

    @media (min-width: ${unsafeCSS(breakpoint.l.$value)}) {
      :host {
        grid-column: span var(--grid-item-span-l, var(--grid-item-span-m));
      }
    }

    @media (min-width: ${unsafeCSS(breakpoint.xl.$value)}) {
      :host {
        grid-column: span var(--grid-item-span-xl, var(--grid-item-span-l));
      }
    }
  `;

  updated(changedProperties: Map<string, any>) {
    const props = ["span", "spanM", "spanL", "spanXl"];
    props.forEach((prop) => {
      if (changedProperties.has(prop)) {
        // Convert prop name to CSS variable suffix (e.g., spanM -> span-m)
        const cssSuffix = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
        this.style.setProperty(
          `--grid-item-${cssSuffix}`,
          (this as any)[prop].toString(),
        );
      }
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
