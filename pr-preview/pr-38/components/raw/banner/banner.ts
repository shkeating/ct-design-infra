import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointXs, BreakpointS, BreakpointM, BreakpointL, BreakpointXl, BreakpointXxl } from '@ct-infra/tokens';
import '../../01-atoms/heading/heading.js';
import '../../01-atoms/image/image.js';
import '../../02-molecules/breadcrumb/breadcrumb.js';

export type BannerTheme = 'light' | 'dark';
export type BannerBackgroundBlendMode =
  | 'normal'
  | 'color'
  | 'color-burn'
  | 'color-dodge'
  | 'darken'
  | 'difference'
  | 'exclusion'
  | 'hard-light'
  | 'hue'
  | 'lighten'
  | 'luminosity'
  | 'multiply'
  | 'overlay'
  | 'saturation'
  | 'screen'
  | 'soft-light';

/**
 * A Generative UI-ready Banner component based on CivicTheme, the large hero
 * region typically used at the top of a page: an optional breadcrumb trail, a
 * site-section eyebrow, a title, several free-form content areas, a featured
 * image, and an optional full-bleed background image.
 *
 * Composition notes (documented best-effort choices for the non-interactive
 * port, per the parallel-porting fallback rules):
 *
 * - `civictheme:heading` is reused directly for `site-section` (level 5) and
 *   `title` (level 1) - both are plain strings on this element, matching
 *   `ct-attachment`'s precedent of instantiating `<ct-heading>` internally
 *   rather than re-implementing heading markup/typography here.
 * - `civictheme:image` is reused directly for the featured image via flat
 *   `featured-image-url`/`featured-image-alt` props (mirrors upstream's
 *   `featured_image: {url, alt}`).
 * - `civictheme:breadcrumb` is **not** reused via flat props, because its own
 *   data shape is an array of links - already modeled upstream (and in this
 *   repo's `ct-breadcrumb`) as repeatable `ct-breadcrumb-item` children, not
 *   a prop this element could mirror without reintroducing an array/object
 *   prop (disallowed - attributes stay plain strings/booleans). Instead this
 *   element exposes a named `breadcrumb` slot: the consumer composes their
 *   own `<ct-breadcrumb>` (with its own `ct-breadcrumb-item` children) and
 *   slots it in. This keeps `ct-breadcrumb` reused as-is rather than
 *   duplicating its markup/behavior, at the cost of the caller wiring the
 *   breadcrumb element themselves instead of passing banner-level attributes
 *   for it. Layout spacing that upstream applies via a `modifier_class` on
 *   the breadcrumb's own root is applied here via `::slotted()` instead.
 * - `background_image` is intentionally **not** routed through `ct-image`:
 *   upstream itself doesn't do this either - it paints the background image
 *   directly via inline `style="background-image: url(...)"` on
 *   `.ct-banner__inner` (plus a visually-hidden `role="img"` span for the alt
 *   text), which is a fundamentally different rendering mode (CSS background,
 *   not an `<img>`) than the `<img>` element `ct-image` renders.
 * - `background_image_blend_mode` upstream is a `ct-background--<mode>`
 *   utility class per mode, each of which does nothing but set the literal
 *   CSS `background-blend-mode` property (no token indirection). Applied
 *   here as an inline style alongside the background image instead of 16
 *   near-identical modifier classes - behaviorally identical, fewer moving
 *   parts.
 * - The upstream `container`/`row`/`col-xxs-12 col-m-6` Bootstrap-style grid
 *   has no shared/global counterpart ported into this system yet (checked -
 *   `ct-basic-content` is the only other consumer of these classes, and it
 *   only reproduces the single-column `.container` case as a layout no-op).
 *   Banner needs an actual two-column split when a featured image is present,
 *   so a small scoped flex-based `.ct-banner__row`/`.ct-banner__col--split`
 *   substitute is implemented locally here rather than a shared grid system.
 *   The `.container` max-width steps are copied verbatim from
 *   `ct-basic-content`'s (non-token-backed upstream) implementation for
 *   consistency between organisms.
 */
@customElement('ct-banner')
export class CtBanner extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-banner {
      position: relative;
    }

    .ct-banner__wrapper {
      position: relative;
    }

    .ct-banner__inner {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      padding-top: 1.5rem;
      padding-bottom: 5rem;
    }
    @media print {
      .ct-banner__inner {
        padding-top: 1rem;
        padding-bottom: 1.5rem;
      }
    }

    /* Container: mirrors CivicTheme's .container max-width steps verbatim -
       see ct-basic-content for the same, non-token-backed upstream values. */
    .ct-banner__container {
      margin: 0 auto;
      max-width: calc(100vw - 3rem);
      box-sizing: border-box;
      padding: 0 1rem;
    }
    @media (min-width: ${unsafeCSS(BreakpointXs)}) {
      .ct-banner__container {
        max-width: 320px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointS)}) {
      .ct-banner__container {
        max-width: 528px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-banner__container {
        max-width: 720px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-banner__container {
        max-width: 896px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointXl)}) {
      .ct-banner__container {
        max-width: 1184px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointXxl)}) {
      .ct-banner__container {
        max-width: 1248px;
      }
    }

    /* Scoped row/col substitute for upstream's Bootstrap-style grid (see class
       doc comment) - a plain full-width block by default, splitting to two
       equal columns at the 'm' breakpoint only for rows that need it. */
    .ct-banner__row {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    .ct-banner__row:last-child {
      margin-bottom: 0;
    }
    /* Collapses rows whose slot(s) have no assigned content, mirroring
       upstream's "{% if content_topN is not empty %}" gating around each
       row - see _checkSlot/_onSlotChange below for how emptiness is
       detected (a plain CSS :empty check on the wrapper doesn't work here,
       since the wrapper always contains the <slot> element itself). */
    .ct-banner__row--empty {
      display: none;
    }
    .ct-banner__col {
      flex: 0 0 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-banner__col--split {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }

    .ct-banner__breadcrumb-slot,
    .ct-banner__content-top1,
    .ct-banner__content-top2,
    .ct-banner__content-top3,
    .ct-banner__content-middle,
    .ct-banner__content,
    .ct-banner__content-bottom,
    .ct-banner__content-below {
      display: block;
    }

    ::slotted(ct-breadcrumb) {
      margin-bottom: 2rem;
      display: block;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      ::slotted(ct-breadcrumb) {
        margin-bottom: 3rem;
      }
    }

    .ct-banner__site-section {
      margin-bottom: 1rem;
    }

    .ct-banner__title {
      margin-bottom: 1rem;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-banner__title {
        margin-bottom: 1.5rem;
      }
    }

    .ct-banner__content-below {
      margin-top: 1rem;
    }

    .ct-banner__featured-image__wrapper {
      box-sizing: border-box;
      width: var(--ct-banner-featured-image-width);
      display: none;
    }
    .ct-banner__featured-image__wrapper img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-banner__featured-image__wrapper {
        display: block;
        position: absolute;
        bottom: 0;
        top: 0;
        right: 0;
      }
    }

    /* Decorative variant */
    .ct-banner--decorative .ct-banner__inner {
      clip-path: var(--ct-banner-decorative-mobile-clip-path);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-banner--decorative .ct-banner__inner {
        padding-top: 4rem;
        padding-bottom: 4rem;
        clip-path: var(--ct-banner-decorative-desktop-clip-path);
      }
    }
    @media print {
      .ct-banner--decorative .ct-banner__inner {
        padding-top: 1rem;
        padding-bottom: 1.5rem;
      }
    }
    .ct-banner--decorative .ct-banner__content-below {
      margin-top: -1rem;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-banner--decorative .ct-banner__featured-image__wrapper {
        bottom: 0;
        top: auto;
        height: 100%;
        max-height: 37.5rem;
        padding-top: 4rem;
      }
    }
    .ct-banner--decorative .ct-banner__featured-image {
      clip-path: var(--ct-banner-featured-image-clip-path);
    }

    /* Theme: light */
    .ct-theme-light .ct-banner__inner {
      background-color: var(--ct-banner-light-background-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-theme-light.ct-banner--decorative .ct-banner__featured-image__wrapper {
        filter: drop-shadow(-1rem -1rem 0 var(--ct-banner-light-featured-image-shadow-color));
      }
    }

    /* Theme: dark */
    .ct-theme-dark .ct-banner__inner {
      background-color: var(--ct-banner-dark-background-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-theme-dark.ct-banner--decorative .ct-banner__featured-image__wrapper {
        filter: drop-shadow(-1rem -1rem 0 var(--ct-banner-dark-featured-image-shadow-color));
      }
    }

    /* Visually-hidden background-image alt text carrier, matching upstream's
       bare <span role="img" aria-label="...">. */
    .ct-banner__background-image-alt {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: BannerTheme = 'light';

  /** Whether to show the decorative clipped-edge variant. */
  @property({ type: Boolean, attribute: 'is-decorative' }) isDecorative = false;

  /** Site section eyebrow text, rendered as a level-5 heading above the title. */
  @property({ type: String, attribute: 'site-section' }) siteSection = '';

  /** Banner title, rendered as a level-1 heading. */
  @property({ type: String }) title = '';

  /** Featured image URL (rendered via `ct-image`, absolutely positioned alongside the content). */
  @property({ type: String, attribute: 'featured-image-url' }) featuredImageUrl?: string;

  /** Featured image alt text. */
  @property({ type: String, attribute: 'featured-image-alt' }) featuredImageAlt = '';

  /** Full-bleed background image URL, painted via CSS `background-image` (not an `<img>`). */
  @property({ type: String, attribute: 'background-image-url' }) backgroundImageUrl?: string;

  /** Background image alt text, exposed via a visually-hidden `role="img"` span (matches upstream). */
  @property({ type: String, attribute: 'background-image-alt' }) backgroundImageAlt = '';

  /** Background image blend mode. Defaults to 'normal'. */
  @property({ type: String, attribute: 'background-image-blend-mode' }) backgroundImageBlendMode: BannerBackgroundBlendMode =
    'normal';

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * Tracks which named slots currently have assigned, non-whitespace content,
   * keyed by slot name. Used to collapse a row's margin when its slot(s) are
   * unused, matching upstream's `{% if content_topN is not empty %}` gates
   * around each content-area row (Lit has no synchronous way to know this
   * ahead of first paint - `slotchange` plus an explicit `firstUpdated` sweep
   * is how it's detected instead).
   */
  @state() private _slotHasContent: Record<string, boolean> = {};

  private _checkSlot(slot: HTMLSlotElement) {
    const name = slot.name;
    const hasContent = slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        return !!node.textContent?.trim();
      }
      return false;
    });

    if (this._slotHasContent[name] !== hasContent) {
      this._slotHasContent = { ...this._slotHasContent, [name]: hasContent };
    }
  }

  private _onSlotChange(e: Event) {
    this._checkSlot(e.target as HTMLSlotElement);
  }

  firstUpdated() {
    this.shadowRoot?.querySelectorAll('slot[name]').forEach((slot) => this._checkSlot(slot as HTMLSlotElement));
  }

  render() {
    const hasFeaturedImage = !!this.featuredImageUrl;
    const hasSlot = (name: string) => !!this._slotHasContent[name];

    const rootClasses = {
      'ct-banner': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-banner--decorative': this.isDecorative,
      [this.modifierClass]: !!this.modifierClass,
    };

    const innerStyles = this.backgroundImageUrl
      ? {
          'background-image': `url('${this.backgroundImageUrl}')`,
          'background-blend-mode': this.backgroundImageBlendMode,
        }
      : {};

    const colClasses = (split: boolean) => ({
      'ct-banner__col': true,
      'ct-banner__col--split': split && hasFeaturedImage,
    });

    return html`
      <div class=${classMap(rootClasses)}>
        <div class="ct-banner__wrapper">
          <div class="ct-banner__inner" style=${styleMap(innerStyles)}>
            ${this.backgroundImageUrl && this.backgroundImageAlt
              ? html`<span class="ct-banner__background-image-alt" role="img" aria-label=${this.backgroundImageAlt}> </span>`
              : nothing}

            <div class="ct-banner__container">
              <div class=${classMap({ 'ct-banner__row': true, 'ct-banner__row--empty': !hasSlot('content-top1') })}>
                <div class="ct-banner__col">
                  <div class="ct-banner__content-top1">
                    <slot name="content-top1" @slotchange=${this._onSlotChange}></slot>
                  </div>
                </div>
              </div>

              <div
                class=${classMap({
                  'ct-banner__row': true,
                  'ct-banner__row--empty': !hasSlot('breadcrumb') && !hasSlot('content-top2'),
                })}
              >
                <div class=${classMap(colClasses(true))}>
                  <div class="ct-banner__breadcrumb-slot">
                    <slot name="breadcrumb" @slotchange=${this._onSlotChange}></slot>
                  </div>
                </div>
                <div class="ct-banner__col ct-banner__col--split">
                  <div class="ct-banner__content-top2">
                    <slot name="content-top2" @slotchange=${this._onSlotChange}></slot>
                  </div>
                </div>
              </div>

              <div class=${classMap({ 'ct-banner__row': true, 'ct-banner__row--empty': !hasSlot('content-top3') })}>
                <div class="ct-banner__col">
                  <div class="ct-banner__content-top3">
                    <slot name="content-top3" @slotchange=${this._onSlotChange}></slot>
                  </div>
                </div>
              </div>

              ${this.siteSection
                ? html`
                    <div class="ct-banner__row">
                      <div class="ct-banner__col">
                        <ct-heading
                          theme=${this.theme}
                          content=${this.siteSection}
                          level="5"
                          modifier-class="ct-banner__site-section"
                        ></ct-heading>
                      </div>
                    </div>
                  `
                : nothing}

              ${this.title
                ? html`
                    <div class="ct-banner__row">
                      <div class=${classMap(colClasses(true))}>
                        <ct-heading
                          theme=${this.theme}
                          content=${this.title}
                          level="1"
                          modifier-class="ct-banner__title"
                        ></ct-heading>
                      </div>
                    </div>
                  `
                : nothing}

              <div class=${classMap({ 'ct-banner__row': true, 'ct-banner__row--empty': !hasSlot('content-middle') })}>
                <div class=${classMap(colClasses(true))}>
                  <div class="ct-banner__content-middle">
                    <slot name="content-middle" @slotchange=${this._onSlotChange}></slot>
                  </div>
                </div>
              </div>

              <div class=${classMap({ 'ct-banner__row': true, 'ct-banner__row--empty': !hasSlot('content') })}>
                <div class=${classMap(colClasses(true))}>
                  <div class="ct-banner__content">
                    <slot name="content" @slotchange=${this._onSlotChange}></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>

          ${hasFeaturedImage
            ? html`
                <div class="ct-banner__featured-image__wrapper">
                  <ct-image
                    theme=${this.theme}
                    url=${ifDefined(this.featuredImageUrl)}
                    alt=${this.featuredImageAlt}
                    modifier-class="ct-banner__featured-image"
                  ></ct-image>
                </div>
              `
            : nothing}
        </div>

        <div class="ct-banner__container">
          <div class=${classMap({ 'ct-banner__row': true, 'ct-banner__row--empty': !hasSlot('content-below') })}>
            <div class="ct-banner__col">
              <div class="ct-banner__content-below">
                <slot name="content-below" @slotchange=${this._onSlotChange}></slot>
              </div>
            </div>
          </div>
        </div>

        <div class="ct-banner__container">
          <div class=${classMap({ 'ct-banner__row': true, 'ct-banner__row--empty': !hasSlot('content-bottom') })}>
            <div class="ct-banner__col">
              <div class="ct-banner__content-bottom">
                <slot name="content-bottom" @slotchange=${this._onSlotChange}></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-banner': CtBanner;
  }
}
