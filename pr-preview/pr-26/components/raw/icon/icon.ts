import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { ICON_SOURCES, type IconName } from './icon-registry.js';

export type IconSize = 'extra-small' | 'small' | 'regular' | 'large' | 'extra-large';

/**
 * A Generative UI-ready Icon component based on CivicTheme's SVG icon set.
 * Inlines the matching SVG source so `fill: currentColor` can theme it like text;
 * defaults to a 1em box that scales with the surrounding font-size, or an explicit
 * named `size`. Always decorative (`aria-hidden`) — the consuming component/context
 * is responsible for supplying an accessible name, matching CivicTheme's own icon
 * component.
 */
@customElement('ct-icon')
export class CtIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      line-height: 0;
    }

    svg.ct-icon {
      display: inline-block;
      width: 1em;
      height: 1em;
      fill: currentColor;
      vertical-align: middle;
    }

    svg.ct-icon--size-extra-small {
      font-size: var(--ct-icon-size-extra-small);
    }
    svg.ct-icon--size-small {
      font-size: var(--ct-icon-size-small);
    }
    svg.ct-icon--size-regular {
      font-size: var(--ct-icon-size-regular);
    }
    svg.ct-icon--size-large {
      font-size: var(--ct-icon-size-large);
    }
    svg.ct-icon--size-extra-large {
      font-size: var(--ct-icon-size-extra-large);
    }
  `;

  /** Name of the icon to render (see icon-registry.ts for the full set). */
  @property({ type: String }) name?: IconName | string;

  /** Named size. Omit to inherit a 1em box sized by the surrounding font-size. */
  @property({ type: String }) size?: IconSize;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    const source = this.name ? ICON_SOURCES[this.name as IconName] : undefined;

    if (!source) {
      return nothing;
    }

    const classes = ['ct-icon', this.size ? `ct-icon--size-${this.size}` : '', this.modifierClass]
      .filter(Boolean)
      .join(' ');

    const attributedSource = source.replace(
      /^<svg /,
      `<svg class="${classes}" aria-hidden="true" role="img" `,
    );

    return html`${unsafeSVG(attributedSource)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-icon': CtIcon;
  }
}
