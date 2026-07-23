import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type ImageTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Image component based on CivicTheme, rendering a
 * single `<img>` with a theme class. Mirrors the upstream `image.twig`:
 * renders nothing when `url` is empty, and passes `width`/`height` straight
 * through as HTML attributes (native intrinsic sizing) rather than styling
 * them, matching upstream behavior exactly.
 *
 * NOTE: upstream CivicTheme ships no compiled CSS for this atom at all —
 * `packages/sdc/components/01-atoms/image/` has no `image.css`, and no
 * `.ct-image` selector appears anywhere in `civictheme.base.css`. Composite
 * components (card, banner, etc.) define their *own* image-sizing tokens
 * (e.g. `--ct-promo-card-image-aspect-ratio`) scoped to their own layout, but
 * the base atom itself is unstyled beyond the browser default. `static
 * styles` below is therefore a deliberately minimal, token-free responsive-
 * image baseline (block display + fluid scaling so it doesn't overflow its
 * container) rather than a "port rule-for-rule" of a reference that doesn't
 * exist. No `packages/tokens/src/components/image.json` was added for the
 * same reason — there is no resolved value to reconcile.
 */
@customElement('ct-image')
export class CtImage extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      max-width: 100%;
    }

    .ct-image {
      display: block;
      max-width: 100%;
      height: auto;
    }
  `;

  /** Theme variation: light or dark. Carried through as a class for parity with upstream markup; the base atom has no theme-specific CSS. */
  @property({ type: String }) theme: ImageTheme = 'light';

  /** Image URL. Renders nothing when empty (matches upstream). */
  @property({ type: String }) url?: string;

  /** Image alt text. Provide meaningful text unless the image is purely decorative. */
  @property({ type: String }) alt = '';

  /** Image width (intrinsic, in pixels). Passed through as the native `width` attribute. */
  @property({ type: Number }) width?: number;

  /** Image height (intrinsic, in pixels). Passed through as the native `height` attribute. */
  @property({ type: Number }) height?: number;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.url) {
      return nothing;
    }

    const classes = {
      'ct-image': true,
      [`ct-theme-${this.theme}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <img
        class=${classMap(classes)}
        src=${this.url}
        alt=${this.alt}
        width=${ifDefined(this.width)}
        height=${ifDefined(this.height)}
        data-component-name="image"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-image': CtImage;
  }
}
