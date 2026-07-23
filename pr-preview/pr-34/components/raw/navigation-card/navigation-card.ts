import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../00-base/icon/icon.js';
import '../../01-atoms/image/image.js';
import '../../01-atoms/paragraph/paragraph.js';

export type NavigationCardTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Navigation Card component based on CivicTheme, for
 * linking out to a page with a title, optional image/icon, summary, and
 * trailing arrow affordance. Composes the already-ported `ct-icon`,
 * `ct-image`, and `ct-paragraph` components internally, mirroring upstream
 * `navigation-card.twig`'s own `civictheme:icon` / `civictheme:image` /
 * `civictheme:paragraph` includes, rather than re-implementing any of their
 * styling here.
 *
 * Deviations from upstream, made non-interactively while porting (see
 * docs/parallel-porting.md):
 * - Upstream's `image` and `link` Twig props are objects (`image.url`,
 *   `image.alt`, `link.url`, `link.text`, `link.is_new_window`,
 *   `link.is_external`). Flattened here to `image-url`/`image-alt`/
 *   `link-url`/`link-text`/`link-new-window`/`link-external` - array/object
 *   props aren't allowed (plain strings/booleans only).
 * - Upstream's compiled `navigation-card.twig` only actually *renders*
 *   `link.url` and `link.is_new_window` (the title anchor's `href` and
 *   `target`) - `link.text` and `link.is_external` are declared in
 *   `navigation-card.component.yml` but never referenced anywhere in the
 *   compiled template. `link-text` and `link-external` are still exposed
 *   here (as inert props) for schema parity with the upstream prop contract,
 *   matching upstream's own behavior exactly rather than inventing new
 *   visible uses for them.
 * - Upstream's `icon`, `title`, and `summary` are declared as Twig *slots* in
 *   `navigation-card.component.yml`, but the compiled template only ever
 *   uses them as plain string variables (`{% if icon is not empty %}`,
 *   `{{ title }}`, passed straight into `civictheme:paragraph`'s `content`
 *   prop) - never as rendered block content. Exposed here as plain string
 *   properties (`icon`, `title`, `summary`), matching how `ct-callout`
 *   (`heading`/`content`) and `ct-next-steps` (`heading`/`content`) already
 *   treat the same upstream pattern. `content-top`, `image-over`,
 *   `content-middle`, and `content-bottom` genuinely accept arbitrary markup
 *   upstream, so those remain real named `<slot>`s.
 * - Upstream's row/column layout switch is driven by an `@container
 *   (min-width: 36rem)` query on `.ct-navigation-card` itself, which requires
 *   an *ancestor* to establish the container context (an element cannot
 *   query its own inline size). `:host` sets `container-type: inline-size`
 *   so the shadow-DOM child `.ct-navigation-card` div can query the host's
 *   own size - the host is a legitimate container-query ancestor for its own
 *   shadow tree.
 * - Upstream's compiled CSS reaches into the image markup it inlines
 *   directly (`.ct-navigation-card__image img { object-fit: cover; ... }`).
 *   Composing `ct-image` instead means that `<img>` lives inside `ct-image`'s
 *   *own* shadow root, which this component's stylesheet cannot select into
 *   (`ct-image` exposes no `::part()` or sizing custom property to hook
 *   into, per `image.ts`'s own doc comment) - so `object-fit: cover` cannot
 *   be applied to it at all. An earlier attempt at absolute-filling the
 *   `ct-image` host left a *blank gap* wherever the image's own aspect ratio
 *   didn't happen to match the wrapper's (host's box stretched to fill via
 *   `height: 100%`, but the `<img>` inside it still only sizes by width,
 *   per its own `max-width: 100%; height: auto` rule - it doesn't stretch to
 *   fill a forced parent height). Flex-centering the wrapper instead scales
 *   the image to the wrapper's width and centers it vertically - a visible,
 *   intentional letterbox instead of a silent gap. Net effect: the image is
 *   never cropped and may show background on the sides/edges of the
 *   wrapper's fixed dimensions, unlike upstream's cropped fill. Same
 *   documented category of composition limitation as `ct-next-steps`'
 *   `ct-heading`/`ct-link` nesting deviation.
 */
@customElement('ct-navigation-card')
export class CtNavigationCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      container-type: inline-size;
    }

    .ct-navigation-card {
      position: relative;
      border-radius: var(--ct-navigation-card-border-radius);
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
    }

    .ct-navigation-card:hover {
      outline: 1px solid transparent;
    }

    .ct-navigation-card--card-clickable {
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
    }
    .ct-navigation-card--card-clickable:hover {
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
    }
    .ct-navigation-card--card-clickable:active {
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
    }
    .ct-navigation-card--card-clickable .ct-navigation-card__title-link::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    @container (min-width: 36rem) {
      .ct-navigation-card {
        flex-direction: row;
      }
    }

    .ct-navigation-card__image {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--ct-navigation-card-image-height-mobile);
      width: auto;
      min-width: var(--ct-navigation-card-image-width-mobile);
    }
    /* See class doc comment: ct-image's internal img can't be reached
       through its shadow boundary (no object-fit/fill-parent hook), so an
       absolute-fill of the ct-image host would stretch the box without
       actually resizing the img inside it (its own CSS sizes it by width
       alone, not by a forced parent height) - that left a blank gap
       wherever the image's own aspect ratio didn't happen to match the
       wrapper's. Flex-centering here instead scales the image to the
       wrapper's width and centers it vertically (letterboxed, not cropped)
       - an intentionally visible trade-off rather than a silent gap. */
    .ct-navigation-card__image ct-image {
      display: block;
      width: 100%;
      height: auto;
    }
    @container (min-width: 36rem) {
      .ct-navigation-card__image {
        width: var(--ct-navigation-card-image-max-width-desktop);
        min-width: var(--ct-navigation-card-image-min-width-desktop);
        height: auto;
        min-height: var(--ct-navigation-card-image-min-height-desktop);
        flex-shrink: 0;
      }
    }

    .ct-navigation-card__content {
      width: 100%;
      padding: 1.5rem;
      box-sizing: border-box;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .ct-navigation-card__icon {
      margin-bottom: 1rem;
      color: inherit;
    }
    .ct-navigation-card__icon__image {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: var(--ct-icon-size-extra-large);
      width: var(--ct-icon-size-extra-large);
      overflow: hidden;
      vertical-align: middle;
    }
    /* Same shadow-boundary limitation as the main image - see class doc comment. */
    .ct-navigation-card__icon__image ct-image {
      display: block;
      width: 100%;
      height: auto;
    }

    .ct-navigation-card__title {
      font-size: var(--ct-typography-heading-4-font-size);
      line-height: var(--ct-typography-heading-4-line-height);
      font-family: var(--ct-typography-heading-4-font-name);
      font-weight: var(--ct-typography-heading-4-font-weight);
      letter-spacing: var(--ct-typography-heading-4-letter-spacing);
    }
    .ct-navigation-card__title-link {
      font-size: inherit;
      line-height: inherit;
      text-decoration: none;
    }
    .ct-navigation-card__title-link:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
      border-radius: var(--ct-outline-border-radius);
    }
    .ct-navigation-card__title-link:hover {
      text-decoration: underline;
    }
    .ct-navigation-card__title-link:visited {
      color: inherit;
    }

    .ct-navigation-card__tags {
      margin-top: auto;
    }
    .ct-navigation-card__link-graphic {
      margin-left: auto;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 2rem;
      height: 2rem;
      pointer-events: none;
    }
    .ct-navigation-card__link-graphic::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: var(--ct-navigation-card-link-graphic-hover-opacity);
      border-radius: 100%;
    }

    /* Theme: light */
    .ct-navigation-card.ct-theme-light {
      background-color: var(--ct-navigation-card-light-background-color);
      color: var(--ct-navigation-card-light-icon-color);
    }
    .ct-navigation-card.ct-theme-light.ct-navigation-card--card-clickable:hover {
      outline-color: var(--ct-navigation-card-light-hover-outline-color);
    }
    .ct-navigation-card.ct-theme-light.ct-navigation-card--card-clickable:hover .ct-navigation-card__title-link {
      color: var(--ct-navigation-card-light-title-hover-color);
    }
    .ct-navigation-card.ct-theme-light.ct-navigation-card--card-clickable:hover .ct-navigation-card__link-graphic::before {
      background-color: var(--ct-navigation-card-light-link-graphic-hover-background-color);
    }
    .ct-navigation-card.ct-theme-light:not(.ct-navigation-card--card-clickable) .ct-navigation-card__title-link:hover {
      color: var(--ct-navigation-card-light-title-hover-color);
    }
    .ct-navigation-card.ct-theme-light .ct-navigation-card__title,
    .ct-navigation-card.ct-theme-light .ct-navigation-card__title-link {
      color: var(--ct-navigation-card-light-title-color);
    }
    .ct-navigation-card.ct-theme-light .ct-navigation-card__link-graphic {
      color: var(--ct-navigation-card-light-link-graphic-color);
    }

    /* Theme: dark */
    .ct-navigation-card.ct-theme-dark {
      background-color: var(--ct-navigation-card-dark-background-color);
      color: var(--ct-navigation-card-dark-icon-color);
    }
    .ct-navigation-card.ct-theme-dark.ct-navigation-card--card-clickable:hover {
      outline-color: var(--ct-navigation-card-dark-hover-outline-color);
    }
    .ct-navigation-card.ct-theme-dark.ct-navigation-card--card-clickable:hover .ct-navigation-card__title-link {
      color: var(--ct-navigation-card-dark-title-hover-color);
    }
    .ct-navigation-card.ct-theme-dark.ct-navigation-card--card-clickable:hover .ct-navigation-card__link-graphic::before {
      background-color: var(--ct-navigation-card-dark-link-graphic-hover-background-color);
    }
    .ct-navigation-card.ct-theme-dark:not(.ct-navigation-card--card-clickable) .ct-navigation-card__title-link:hover {
      color: var(--ct-navigation-card-dark-title-hover-color);
    }
    .ct-navigation-card.ct-theme-dark .ct-navigation-card__title,
    .ct-navigation-card.ct-theme-dark .ct-navigation-card__title-link {
      color: var(--ct-navigation-card-dark-title-color);
    }
    .ct-navigation-card.ct-theme-dark .ct-navigation-card__link-graphic {
      color: var(--ct-navigation-card-dark-link-graphic-color);
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: NavigationCardTheme = 'light';

  /** Card title text. Required for the card to render at all (matches upstream). */
  @property({ type: String }) title = '';

  /** Card summary/body content, rendered via `ct-paragraph`. */
  @property({ type: String }) summary = '';

  /** Icon name rendered above the title (see `ct-icon` for the available set). */
  @property({ type: String }) icon?: string;

  /** Card image URL. */
  @property({ type: String, attribute: 'image-url' }) imageUrl?: string;

  /** Card image alt text. */
  @property({ type: String, attribute: 'image-alt' }) imageAlt = '';

  /** Renders the image as a small inline icon (next to the title) instead of the full card image. */
  @property({ type: Boolean, attribute: 'image-as-icon' }) imageAsIcon = false;

  /** Title link URL. When set, the title becomes a link and (unless `is-title-click` is set) the whole card becomes clickable. */
  @property({ type: String, attribute: 'link-url' }) linkUrl?: string;

  /**
   * Link text. Declared for schema parity with upstream's `link.text` prop -
   * see the class doc comment: upstream's own compiled template never
   * renders this value either.
   */
  @property({ type: String, attribute: 'link-text' }) linkText?: string;

  /** Opens the title link in a new window/tab. */
  @property({ type: Boolean, attribute: 'link-new-window' }) linkNewWindow = false;

  /**
   * Marks the link as external. Declared for schema parity with upstream's
   * `link.is_external` prop - see the class doc comment: upstream's own
   * compiled template never renders this value either.
   */
  @property({ type: Boolean, attribute: 'link-external' }) linkExternal = false;

  /** Restricts the clickable area to just the title link instead of the whole card. */
  @property({ type: Boolean, attribute: 'is-title-click' }) isTitleClick = false;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _hasSlotted(slotName: string): boolean {
    return this.querySelector(`:scope > [slot="${slotName}"]`) !== null;
  }

  render() {
    if (!this.title) {
      return nothing;
    }

    const theme: NavigationCardTheme = this.theme === 'dark' ? 'dark' : 'light';
    const withImage = !!this.imageUrl;
    const withLink = !!this.linkUrl;
    const isCardClickable = withLink && !this.isTitleClick;

    const classes = {
      'ct-navigation-card': true,
      [`ct-theme-${theme}`]: true,
      'ct-navigation-card--with-image': withImage,
      'ct-navigation-card--with-link': withLink,
      'ct-navigation-card--image-as-icon': this.imageAsIcon,
      'ct-navigation-card--card-clickable': isCardClickable,
      [this.modifierClass]: !!this.modifierClass,
    };

    const hasContentTop = this._hasSlotted('content-top');
    const hasImageOver = this._hasSlotted('image-over');
    const hasContentMiddle = this._hasSlotted('content-middle');
    const hasContentBottom = this._hasSlotted('content-bottom');

    const showImage = !this.imageAsIcon && withImage;
    const showIcon = !!this.icon || (this.imageAsIcon && withImage);

    const titleContent = withLink
      ? html`<a
          class="ct-navigation-card__title-link"
          href=${this.linkUrl}
          target=${ifDefined(this.linkNewWindow ? '_blank' : undefined)}
          >${this.title}</a
        >`
      : this.title;

    return html`
      <div class=${classMap(classes)} data-component-name="navigation-card">
        ${showImage
          ? html`
              <div class="ct-navigation-card__image">
                <ct-image theme=${theme} url=${this.imageUrl} alt=${this.imageAlt}></ct-image>
                ${hasImageOver
                  ? html`<div class="ct-navigation-card__image__over"><slot name="image-over"></slot></div>`
                  : nothing}
              </div>
            `
          : nothing}

        <div class="ct-navigation-card__content">
          ${hasContentTop
            ? html`<div class="ct-navigation-card__content-top"><slot name="content-top"></slot></div>`
            : nothing}
          ${showIcon
            ? html`
                <div class="ct-navigation-card__icon">
                  ${this.icon ? html`<ct-icon name=${this.icon} size="extra-large"></ct-icon>` : nothing}
                  ${this.imageAsIcon && withImage
                    ? html`
                        <div class="ct-navigation-card__icon__image">
                          <ct-image theme=${theme} url=${this.imageUrl} alt=${this.imageAlt}></ct-image>
                        </div>
                      `
                    : nothing}
                </div>
              `
            : nothing}
          <div class="ct-navigation-card__title">${titleContent}</div>
          ${hasContentMiddle
            ? html`<div class="ct-navigation-card__content-middle"><slot name="content-middle"></slot></div>`
            : nothing}
          ${this.summary
            ? html`<ct-paragraph
                theme=${theme}
                content=${this.summary}
                no-margin
                modifier-class="ct-navigation-card__summary"
              ></ct-paragraph>`
            : nothing}
          ${hasContentBottom
            ? html`<div class="ct-navigation-card__content-bottom"><slot name="content-bottom"></slot></div>`
            : nothing}
          ${isCardClickable
            ? html`
                <div class="ct-navigation-card__tags">
                  <div class="ct-navigation-card__link-graphic">
                    <ct-icon name="right-arrow-2" size="regular"></ct-icon>
                  </div>
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-navigation-card': CtNavigationCard;
  }
}
