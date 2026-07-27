import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointM } from '@ct-infra/tokens';
import '../../01-atoms/image/image.js';

export type SubjectCardTheme = 'light' | 'dark';

/**
 * A Generative UI-ready SubjectCard component based on CivicTheme: an image
 * card with an overlaid title, optionally linked, used in card-grid listings.
 *
 * Composition notes (documented best-effort choices for the non-interactive
 * port, per the parallel-porting fallback rules):
 *
 * - Upstream's `image: {url, alt}` and `link: {url, is_new_window}` props are
 *   flattened to `image-url`/`image-alt` and `link-url`/`link-new-window`
 *   (array/object attributes aren't allowed - plain strings/booleans only).
 * - `civictheme:image` is reused directly via `ct-image` for the card image,
 *   per this port's explicit instruction to compose the real element rather
 *   than fall back to a plain `<img>` (it was already ported/merged as
 *   `01-atoms/image`).
 * - Upstream's `title` is declared as a *slot* in `subject-card.component.yml`
 *   (not a prop), but the twig only ever interpolates it as plain text
 *   (`{{ title }}`, optionally wrapped in an `<a>`) - never rich markup, so
 *   it's modeled here as a plain string property rather than a slot. It's
 *   named `heading` instead of `title`, though, because `title` already
 *   exists on `HTMLElement` (the native tooltip-text attribute) - reflecting
 *   a same-named Lit property to that attribute would paint an unintended
 *   native browser tooltip over the whole card on hover. `ct-accordion-item`
 *   already established `heading` as this system's name for "plain text
 *   playing a title role," so it's reused here for the same reason.
 * - The `image_over` slot *is* free-form overlay content (not guaranteed to
 *   be plain text upstream), so it stays a genuine named slot
 *   (`image-over`). Its wrapper (`.ct-subject-card__image__over`) carries no
 *   CSS in the upstream compiled stylesheet either way, so it's always
 *   rendered rather than conditionally toggled on slot content.
 * - `is_title_click` -> `title-click`: whether only the title text is
 *   clickable instead of the whole card (`ct-subject-card--card-clickable`
 *   is added, and the whole-card click affordance via
 *   `.ct-subject-card__title-link::before` is enabled, only when there's a
 *   link AND `title-click` is false).
 * - FLAGGED (documented limitation/workaround, and a real bug found and
 *   fixed here that an existing precedent on main does *not* fix): upstream's
 *   compiled CSS sizes the card image via a plain `.ct-subject-card__content
 *   img { height: 100%; width: 100%; object-fit: cover }` descendant
 *   selector. Because `ct-image` renders its `<img>` inside its own shadow
 *   root, a selector written in `ct-subject-card`'s shadow CSS cannot cross
 *   that boundary to reach it - `ct-banner` has this exact same gap already
 *   (`.ct-banner__featured-image__wrapper img` in `banner.ts`, reaching into
 *   the same `ct-image` shadow root - `banner.ts` has no `overflow: hidden`
 *   on that wrapper either, so it likely has this port's overflow bug too;
 *   not verified live against a running banner preview since that's outside
 *   this port's scope). The rule is ported
 *   verbatim below for parity with upstream/precedent, and the `ct-image`
 *   *host* element (reachable, unlike its internal `<img>`) is sized to fill
 *   `.ct-subject-card__image`. That alone isn't enough, though: without true
 *   `object-fit: cover`, the inner `<img>` renders at its natural aspect
 *   ratio (confirmed via `getBoundingClientRect()` during verification -
 *   e.g. 820x447 inside a 820x224 container) and visibly overflows the card
 *   into the page content below it. `overflow: hidden` is added to
 *   `.ct-subject-card` (not present upstream, not needed there) to clip
 *   that overflow - the visual result approximates `object-position: top`
 *   rather than upstream's centered crop, since the oversized image simply
 *   gets truncated at the container edge instead of being resampled. True
 *   centered `object-fit: cover` cropping of the raster image still isn't
 *   achievable without a CSS Part/custom-property hook on the shared
 *   `ct-image` component - out of scope for this port; flagging for a
 *   follow-up that touches `ct-image` deliberately (and should probably fix
 *   `ct-banner`'s overflow too) rather than as an incidental side effect
 *   here.
 */
@customElement('ct-subject-card')
export class CtSubjectCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-subject-card {
      position: relative;
      border-radius: var(--ct-subject-card-border-radius);
      width: 100%;
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
      /* Not present upstream - added to compensate for the shadow-DOM
         object-fit gap documented in the class doc comment above. Upstream
         never needs this because its own object-fit: cover always sizes
         the img to exactly fill its container; our composed ct-image
         can't be cropped that way from outside its shadow root, so without
         this the image renders at its natural aspect ratio and visibly
         overflows the card into whatever follows it on the page. */
      overflow: hidden;
    }

    .ct-subject-card:hover {
      outline: 1px solid transparent;
    }

    .ct-subject-card--card-clickable {
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
    }

    .ct-subject-card--card-clickable:hover {
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
    }

    .ct-subject-card--card-clickable:active {
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
    }

    .ct-subject-card--card-clickable .ct-subject-card__title-link::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .ct-subject-card .ct-subject-card__content img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .ct-subject-card .ct-subject-card__content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: var(--ct-subject-card-image-height-mobile);
      min-width: var(--ct-subject-card-image-width-mobile);
      padding: 1rem;
      box-sizing: border-box;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-subject-card .ct-subject-card__content {
        padding: 1.5rem;
        min-height: var(--ct-subject-card-image-height-desktop);
        min-width: var(--ct-subject-card-image-width-desktop);
      }
    }

    .ct-subject-card .ct-subject-card__image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    /* Sizes the reachable ct-image host to fill its wrapper - see the class
       doc comment above for why true object-fit cropping of the inner <img>
       isn't achievable from here. */
    .ct-subject-card .ct-subject-card__image ct-image {
      display: block;
      width: 100%;
      height: 100%;
    }

    .ct-subject-card .ct-subject-card__title {
      font-size: var(--ct-typography-heading-4-font-size);
      line-height: var(--ct-typography-heading-4-line-height);
      font-family: var(--ct-typography-heading-4-font-name);
      font-weight: var(--ct-typography-heading-4-font-weight);
      letter-spacing: var(--ct-typography-heading-4-letter-spacing);
      z-index: 1;
    }

    .ct-subject-card .ct-subject-card__title-link {
      font-size: inherit;
      line-height: inherit;
      text-decoration: none;
    }

    .ct-subject-card .ct-subject-card__title-link:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
      border-radius: var(--ct-outline-border-radius);
    }

    .ct-subject-card .ct-subject-card__title-link:hover {
      text-decoration: underline;
    }

    .ct-subject-card .ct-subject-card__title-link:visited {
      color: inherit;
    }

    /* Light theme */
    .ct-subject-card.ct-theme-light {
      background-color: var(--ct-subject-card-light-background-color);
    }

    .ct-subject-card.ct-theme-light.ct-subject-card--card-clickable:hover {
      outline-color: var(--ct-subject-card-light-hover-outline-color);
    }

    .ct-subject-card.ct-theme-light.ct-subject-card--card-clickable:hover .ct-subject-card__title-link {
      color: var(--ct-subject-card-light-title-hover-color);
    }

    .ct-subject-card.ct-theme-light:not(.ct-subject-card--card-clickable) .ct-subject-card__title-link:hover {
      color: var(--ct-subject-card-light-title-hover-color);
    }

    .ct-subject-card.ct-theme-light .ct-subject-card__title,
    .ct-subject-card.ct-theme-light .ct-subject-card__title-link {
      color: var(--ct-subject-card-light-title-color);
    }

    .ct-subject-card.ct-theme-light .ct-subject-card__image {
      opacity: var(--ct-subject-card-light-image-opacity);
    }

    /* Dark theme */
    .ct-subject-card.ct-theme-dark {
      background-color: var(--ct-subject-card-dark-background-color);
    }

    .ct-subject-card.ct-theme-dark.ct-subject-card--card-clickable:hover {
      outline-color: var(--ct-subject-card-dark-hover-outline-color);
    }

    .ct-subject-card.ct-theme-dark.ct-subject-card--card-clickable:hover .ct-subject-card__title-link {
      color: var(--ct-subject-card-dark-title-hover-color);
    }

    .ct-subject-card.ct-theme-dark:not(.ct-subject-card--card-clickable) .ct-subject-card__title-link:hover {
      color: var(--ct-subject-card-dark-title-hover-color);
    }

    .ct-subject-card.ct-theme-dark .ct-subject-card__title,
    .ct-subject-card.ct-theme-dark .ct-subject-card__title-link {
      color: var(--ct-subject-card-dark-title-color);
    }

    .ct-subject-card.ct-theme-dark .ct-subject-card__image {
      opacity: var(--ct-subject-card-dark-image-opacity);
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: SubjectCardTheme = 'light';

  /** Card title (rendered as the visible heading text). Renders nothing when empty (matches upstream). */
  @property({ type: String }) heading = '';

  /** Card image URL. Composed via `ct-image`; omit to render the card without an image. */
  @property({ type: String, attribute: 'image-url' }) imageUrl?: string;

  /** Card image alt text. */
  @property({ type: String, attribute: 'image-alt' }) imageAlt = '';

  /** Card link URL. When set, the title becomes a link (and the whole card is clickable unless `title-click` is set). */
  @property({ type: String, attribute: 'link-url' }) linkUrl?: string;

  /** Whether the card link opens in a new window/tab. */
  @property({ type: Boolean, attribute: 'link-new-window' }) linkNewWindow = false;

  /** Whether only the title text is clickable instead of the whole card. */
  @property({ type: Boolean, attribute: 'title-click' }) titleClick = false;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.heading) {
      return nothing;
    }

    const withLink = !!this.linkUrl;
    const withImage = !!this.imageUrl;
    const isCardClickable = withLink && !this.titleClick;

    const classes = {
      'ct-subject-card': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-subject-card--with-image': withImage,
      'ct-subject-card--card-clickable': isCardClickable,
      [this.modifierClass]: !!this.modifierClass,
    };

    const titleContent = withLink
      ? html`<a
          class="ct-subject-card__title-link"
          href=${this.linkUrl}
          target=${ifDefined(this.linkNewWindow ? '_blank' : undefined)}
          >${this.heading}</a
        >`
      : this.heading;

    return html`
      <div class=${classMap(classes)} data-component-name="subject-card">
        <div class="ct-subject-card__content">
          ${withImage
            ? html`
                <div class="ct-subject-card__image">
                  <ct-image theme=${this.theme} url=${ifDefined(this.imageUrl)} alt=${this.imageAlt}></ct-image>
                </div>
              `
            : nothing}
          <div class="ct-subject-card__image__over">
            <slot name="image-over"></slot>
          </div>
          <div class="ct-subject-card__title">${titleContent}</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-subject-card': CtSubjectCard;
  }
}
