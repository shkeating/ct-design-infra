import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointM } from '@ct-infra/tokens';
import '../../01-atoms/image/image.js';
import '../../01-atoms/link/link.js';
import '../../01-atoms/paragraph/paragraph.js';
import '../../00-base/icon/icon.js';

export type PublicationCardTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Publication Card component based on CivicTheme, for surfacing a
 * downloadable publication/file with a title, optional thumbnail image, summary and filename
 * metadata. Composes the already-ported `ct-image` (thumbnail), `ct-icon` (download glyph),
 * `ct-paragraph` (summary) and `ct-link` (filename-as-link fallback) internally, mirroring
 * upstream `publication-card.twig`'s own `civictheme:image` / `civictheme:icon` /
 * `civictheme:paragraph` / `civictheme:link` includes rather than re-implementing any of their
 * styling here.
 *
 * Deviations from upstream, made non-interactively while porting (see docs/parallel-porting.md):
 * - Upstream's `image` and `file` Twig props are objects (`image.url`/`image.alt`,
 *   `file.name`/`file.url`/`file.ext`/`file.size`). Object/array props aren't allowed here
 *   (plain strings/booleans only, so an LLM can emit valid attributes) - they're flattened to
 *   `image-url`/`image-alt` and `file-name`/`file-url`/`file-ext`/`file-size`.
 * - Upstream wraps its *entire* markup in `{% if file is not empty %}` - the component renders
 *   nothing at all unless a `file` object was passed, even one with no `url`. There's no single
 *   flattened attribute that means "the file object was passed"; this port treats "any of
 *   `file-name`/`file-url`/`file-ext`/`file-size` set" as the equivalent signal, since a
 *   publication card's entire purpose is presenting a file.
 * - Upstream's `text`/`url` civictheme:link include is exposed here via `ct-link`'s own
 *   `label`/`url` attributes (this repo's `ct-link` names its text attribute `label`, not
 *   `text` - matching `ct-link`'s own already-ported API rather than upstream's Twig prop name).
 * - The five upstream Twig slots (`image_over`, `content_top`, `content_middle`, `summary`,
 *   `content_bottom`) split two ways: `summary` is upstream's `content` prop for a
 *   `civictheme:paragraph` include (trusted HTML), so it's exposed as a plain `summary` string
 *   attribute mirroring `ct-callout`'s `content` attribute. The other four are genuine free-form
 *   markup regions, so they're exposed as named slots (`image-over`, `content-top`,
 *   `content-middle`, `content-bottom`), each only rendered when actually slotted, matching
 *   `ct-callout`'s `_hasSlotted` pattern for `content-top`/`content-bottom`.
 * - Upstream's box-shadow values (`0 0.25rem 1rem rgba(0, 0, 0, 0.2)` etc.) have no matching
 *   `--ct-...` token in `civictheme.variables.css` - they're hardcoded literals in the upstream
 *   compiled CSS too, so they're ported literally here, same as `ct-tooltip`'s box-shadow.
 */
@customElement('ct-publication-card')
export class CtPublicationCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-publication-card {
      position: relative;
      border-radius: var(--ct-publication-card-border-radius);
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      /* No matching token found in civictheme.variables.css for this box-shadow —
         it is hardcoded in the upstream compiled CSS too, so ported literally
         (same convention as ct-tooltip). */
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
    }
    .ct-publication-card:hover {
      outline: 1px solid transparent;
    }
    .ct-publication-card--card-clickable {
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
    }
    .ct-publication-card--card-clickable:hover {
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
    }
    .ct-publication-card--card-clickable:active {
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
    }
    .ct-publication-card--card-clickable .ct-publication-card__title-link {
      position: relative;
    }
    .ct-publication-card--card-clickable .ct-publication-card__title-link::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-publication-card {
        flex-direction: row;
      }
    }

    .ct-publication-card__image {
      position: relative;
      height: var(--ct-publication-card-image-height-mobile);
      width: auto;
      min-width: var(--ct-publication-card-image-width-mobile);
    }
    .ct-publication-card__image ct-image {
      display: block;
      height: 100%;
      width: 100%;
    }
    .ct-publication-card__image img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-publication-card__image {
        width: var(--ct-publication-card-image-width-desktop);
        height: auto;
        min-height: var(--ct-publication-card-image-height-desktop);
        flex-shrink: 0;
      }
    }

    .ct-publication-card__content {
      width: 100%;
      padding: 1.5rem;
      box-sizing: border-box;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .ct-publication-card__title {
      font-size: var(--ct-typography-heading-4-font-size);
      line-height: var(--ct-typography-heading-4-line-height);
      font-family: var(--ct-typography-heading-4-font-name);
      font-weight: var(--ct-typography-heading-4-font-weight);
      letter-spacing: var(--ct-typography-heading-4-letter-spacing);
    }
    .ct-publication-card__title-bar {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      gap: 0.5rem;
    }
    .ct-publication-card__title-icon {
      flex-shrink: 0;
    }
    .ct-publication-card__title-link {
      font-size: inherit;
      line-height: inherit;
      text-decoration: none;
      color: inherit;
    }
    .ct-publication-card__title-link:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
      border-radius: var(--ct-outline-border-radius);
    }
    .ct-publication-card__title-link:hover {
      text-decoration: underline;
    }
    .ct-publication-card__title-link:visited {
      color: inherit;
    }

    .ct-publication-card__filename {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      padding-right: 1.5rem;
    }

    .ct-publication-card__content-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 1.5rem;
    }

    .ct-visually-hidden {
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

    /* Theme: light */
    .ct-theme-light {
      background-color: var(--ct-publication-card-light-background-color);
    }
    .ct-theme-light.ct-publication-card--card-clickable:hover {
      outline-color: var(--ct-publication-card-light-hover-outline-color);
    }
    .ct-theme-light.ct-publication-card--card-clickable:hover .ct-publication-card__title-link {
      color: var(--ct-publication-card-light-title-hover-color);
    }
    .ct-theme-light:not(.ct-publication-card--card-clickable) .ct-publication-card__title-link:hover {
      color: var(--ct-publication-card-light-title-hover-color);
    }
    .ct-theme-light .ct-publication-card__title,
    .ct-theme-light .ct-publication-card__title-link {
      color: var(--ct-publication-card-light-title-color);
    }
    .ct-theme-light .ct-publication-card__title-icon {
      color: var(--ct-publication-card-light-title-icon-color);
    }
    .ct-theme-light .ct-publication-card__filename {
      color: var(--ct-publication-card-light-filename-color);
    }

    /* Theme: dark */
    .ct-theme-dark {
      background-color: var(--ct-publication-card-dark-background-color);
    }
    .ct-theme-dark.ct-publication-card--card-clickable:hover {
      outline-color: var(--ct-publication-card-dark-hover-outline-color);
    }
    .ct-theme-dark.ct-publication-card--card-clickable:hover .ct-publication-card__title-link {
      color: var(--ct-publication-card-dark-title-hover-color);
    }
    .ct-theme-dark:not(.ct-publication-card--card-clickable) .ct-publication-card__title-link:hover {
      color: var(--ct-publication-card-dark-title-hover-color);
    }
    .ct-theme-dark .ct-publication-card__title,
    .ct-theme-dark .ct-publication-card__title-link {
      color: var(--ct-publication-card-dark-title-color);
    }
    .ct-theme-dark .ct-publication-card__title-icon {
      color: var(--ct-publication-card-dark-title-icon-color);
    }
    .ct-theme-dark .ct-publication-card__filename {
      color: var(--ct-publication-card-dark-filename-color);
    }
  `;

  /**
   * Theme variation: light or dark. Drives background/title/filename colors.
   */
  @property({ type: String }) theme: PublicationCardTheme = 'light';

  /**
   * Card title text.
   */
  @property({ type: String }) title = '';

  /**
   * Trusted HTML summary content, rendered via `ct-paragraph`. Mirrors upstream's `summary`
   * Twig slot (passed through as `civictheme:paragraph`'s `content` prop). Callers are
   * responsible for sanitizing this HTML before passing it.
   */
  @property({ type: String }) summary = '';

  /**
   * Thumbnail image URL. Flattened from upstream's `image.url` object property.
   */
  @property({ type: String, attribute: 'image-url' }) imageUrl?: string;

  /**
   * Thumbnail image alt text. Flattened from upstream's `image.alt` object property.
   */
  @property({ type: String, attribute: 'image-alt' }) imageAlt = '';

  /**
   * Downloadable file name. Flattened from upstream's `file.name` object property.
   */
  @property({ type: String, attribute: 'file-name' }) fileName?: string;

  /**
   * Downloadable file URL. Flattened from upstream's `file.url` object property.
   */
  @property({ type: String, attribute: 'file-url' }) fileUrl?: string;

  /**
   * Downloadable file extension (e.g. "pdf"). Flattened from upstream's `file.ext`.
   */
  @property({ type: String, attribute: 'file-ext' }) fileExt?: string;

  /**
   * Downloadable file size (e.g. "42.88 KB"). Flattened from upstream's `file.size`.
   */
  @property({ type: String, attribute: 'file-size' }) fileSize?: string;

  /**
   * Whether to make only the title clickable instead of the whole card.
   */
  @property({ type: Boolean, attribute: 'is-title-click' }) isTitleClick = false;

  /**
   * Description of file details for accessibility, prefixed to the visually-hidden and
   * aria-label text around the filename.
   */
  @property({ type: String, attribute: 'filename-prefix' }) filenamePrefix = 'File details:';

  /**
   * Additional custom CSS classes.
   */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _hasSlotted(slotName: string): boolean {
    return this.querySelector(`:scope > [slot="${slotName}"]`) !== null;
  }

  render() {
    const theme: PublicationCardTheme = this.theme === 'dark' ? 'dark' : 'light';

    // Upstream: `{% if file is not empty %}` wraps the entire component. There's no single
    // flattened attribute equivalent to "the file object was passed" (see class doc comment) —
    // treated here as "any file-* attribute is set".
    const hasFile = !!(this.fileName || this.fileUrl || this.fileExt || this.fileSize);
    if (!hasFile) {
      return nothing;
    }

    const withImage = !!this.imageUrl;
    const withFile = !!this.fileUrl;
    const isCardClickable = withFile && !this.isTitleClick && !!this.title;

    const hasExt = !!this.fileExt;
    const hasSize = !!this.fileSize;
    let extensionText = hasExt && hasSize ? `${this.fileExt}, ${this.fileSize}` : this.fileExt || this.fileSize || '';
    extensionText = extensionText ? `(${extensionText})` : '';
    const filenameText = this.fileName || '';
    const filename = `${filenameText} ${extensionText}`.trim();

    const classes = {
      'ct-publication-card': true,
      [`ct-theme-${theme}`]: true,
      'ct-publication-card--with-image': withImage,
      'ct-publication-card--card-clickable': isCardClickable,
      [this.modifierClass]: !!this.modifierClass,
    };

    const hasImageOver = withImage && this._hasSlotted('image-over');
    const hasContentTop = this._hasSlotted('content-top');
    const hasContentMiddle = this._hasSlotted('content-middle');
    const hasContentBottom = this._hasSlotted('content-bottom');

    const titleLabel = this.title && filename ? `${this.title}. ${this.filenamePrefix} ${filename}` : '';

    const titleContent = this.title
      ? withFile
        ? html`<a
            class="ct-publication-card__title-link"
            href=${ifDefined(this.fileUrl)}
            aria-label=${ifDefined(titleLabel || undefined)}
            >${this.title}</a
          >`
        : html`${this.title}`
      : nothing;

    return html`
      <div class=${classMap(classes)} data-component-name="publication-card">
        ${withImage
          ? html`
              <div class="ct-publication-card__image">
                <ct-image theme=${theme} url=${ifDefined(this.imageUrl)} alt=${this.imageAlt}></ct-image>
                ${hasImageOver
                  ? html`<div class="ct-publication-card__image__over"><slot name="image-over"></slot></div>`
                  : nothing}
              </div>
            `
          : nothing}
        <div class="ct-publication-card__content">
          ${hasContentTop
            ? html`<div class="ct-publication-card__content-top"><slot name="content-top"></slot></div>`
            : nothing}
          ${this.title
            ? html`
                <div class="ct-publication-card__title-bar">
                  <div class="ct-publication-card__title">${titleContent}</div>
                  <ct-icon name="download" size="regular" modifier-class="ct-publication-card__title-icon"></ct-icon>
                </div>
              `
            : nothing}
          ${hasContentMiddle
            ? html`<div class="ct-publication-card__content__middle"><slot name="content-middle"></slot></div>`
            : nothing}
          ${this.summary
            ? html`<ct-paragraph
                theme=${theme}
                content=${this.summary}
                no-margin
                modifier-class="ct-publication-card__summary"
              ></ct-paragraph>`
            : nothing}
          ${filename
            ? this.title
              ? html`
                  <div class="ct-publication-card__filename">
                    <span class="ct-visually-hidden">${this.filenamePrefix}</span>
                    ${filename}
                  </div>
                `
              : html`<ct-link
                  theme=${theme}
                  label=${filename}
                  url=${ifDefined(this.fileUrl)}
                  modifier-class="ct-publication-card__link"
                ></ct-link>`
            : nothing}
          ${hasContentBottom
            ? html`<div class="ct-publication-card__content-bottom"><slot name="content-bottom"></slot></div>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-publication-card': CtPublicationCard;
  }
}
