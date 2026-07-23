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
 *
 * `fill`: several upstream composites (`publication-card`, `navigation-card`,
 * `subject-card`) render a raw `<img>` with `height: 100%; width: 100%;
 * object-fit: cover` to crop-fill a sized wrapper — impossible to replicate
 * by styling `ct-image` from outside, since its `<img>` lives inside this
 * component's own shadow root and no `::part()`/custom-property hook was
 * exposed for it (each of those three components' class doc comments
 * originally flagged this as a follow-up). `fill` is that follow-up: an
 * opt-in boolean that makes both the host and its internal `<img>` stretch
 * to `100%`/`100%` with `object-fit: cover`. Off by default (`position:
 * static`, natural aspect-ratio sizing) so every existing consumer
 * (`ct-logo`, `ct-banner`) is unaffected. A consumer opting in must give the
 * *wrapper* `position: relative` and an explicit sized height — `ct-image`
 * absolutely fills whatever box it's placed in, it doesn't create one.
 */
@customElement('ct-image')
export class CtImage extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      max-width: 100%;
    }

    :host([fill]) {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      max-width: none;
    }

    .ct-image {
      display: block;
      max-width: 100%;
      height: auto;
    }

    .ct-image--fill {
      width: 100%;
      height: 100%;
      max-width: none;
      object-fit: cover;
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

  /**
   * Absolutely fills the nearest positioned wrapper and crops via
   * `object-fit: cover`, instead of the default natural aspect-ratio sizing.
   * See the class doc comment: the wrapper needs `position: relative` and an
   * explicit sized height for this to have any effect.
   */
  @property({ type: Boolean, reflect: true }) fill = false;

  render() {
    if (!this.url) {
      return nothing;
    }

    const classes = {
      'ct-image': true,
      'ct-image--fill': this.fill,
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
