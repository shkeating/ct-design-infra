import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointM, BreakpointL } from '@ct-infra/tokens';
import '../../01-atoms/heading/heading.js';
import '../../00-base/icon/icon.js';
import '../../01-atoms/link/link.js';
import type { CtAttachmentFile } from './attachment-file.js';
import './attachment-file.js';

export type AttachmentTheme = 'light' | 'dark';
export type AttachmentVerticalSpacing = 'top' | 'bottom' | 'both' | 'none';

/**
 * A Generative UI-ready Attachment component based on CivicTheme, for surfacing a titled
 * group of downloadable files (name, extension, size, last-updated date, per-file icon).
 *
 * Files are composed via `ct-attachment-file` light-DOM children rather than a JSON `files`
 * prop, keeping this element's own attributes plain strings/booleans. All visible chrome
 * (wrapper, heading, links list, per-file icon/link/metadata) renders in this element's
 * shadow root from data read off each child.
 */
@customElement('ct-attachment')
export class CtAttachment extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-attachment.ct-attachment--with-background {
        padding-left: var(--ct-attachment-space-horizontal);
        padding-right: var(--ct-attachment-space-horizontal);
      }
    }

    .ct-attachment.ct-vertical-spacing-inset--top {
      padding-top: var(--ct-spacing-particle-300);
    }
    .ct-attachment.ct-vertical-spacing-inset--bottom {
      padding-bottom: var(--ct-spacing-particle-300);
    }
    .ct-attachment.ct-vertical-spacing-inset--both {
      padding-top: var(--ct-spacing-particle-300);
      padding-bottom: var(--ct-spacing-particle-300);
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-attachment.ct-vertical-spacing-inset--top {
        padding-top: var(--ct-spacing-particle-600);
      }
      .ct-attachment.ct-vertical-spacing-inset--bottom {
        padding-bottom: var(--ct-spacing-particle-600);
      }
      .ct-attachment.ct-vertical-spacing-inset--both {
        padding-top: var(--ct-spacing-particle-600);
        padding-bottom: var(--ct-spacing-particle-600);
      }
    }

    .ct-attachment__wrapper {
      box-sizing: border-box;
      border: solid 0.0625rem;
      border-radius: var(--ct-attachment-border-radius);
      padding: 1.5rem;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-attachment__wrapper {
        padding: 2rem;
      }
    }

    .ct-attachment__content-top:empty,
    .ct-attachment__content-bottom:empty {
      display: none;
    }

    .ct-attachment__inner {
      margin-bottom: 1rem;
    }

    .ct-attachment__title {
      margin-bottom: 1rem;
    }

    .ct-attachment__content {
      margin: 0 0 1rem;
      font-size: var(--ct-typography-text-small-font-size);
      line-height: var(--ct-typography-text-small-line-height);
      font-family: var(--ct-typography-text-small-font-name);
      font-weight: var(--ct-typography-text-small-font-weight);
      letter-spacing: var(--ct-typography-text-small-letter-spacing);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-attachment__content {
        font-size: var(--ct-typography-text-small-desktop-font-size);
        line-height: var(--ct-typography-text-small-desktop-line-height);
      }
    }

    .ct-attachment__links {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
      row-gap: var(--ct-spacing-particle-200);
    }

    .ct-attachment__links__item {
      display: flex;
      align-items: flex-start;
      gap: 0 var(--ct-spacing-particle-100);
    }

    .ct-attachment__links__link__icon {
      flex: none;
    }

    .ct-attachment__links__link__extension {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      text-transform: uppercase;
    }

    .ct-attachment__links__link__changed {
      margin: 0;
      font-size: var(--ct-typography-text-small-font-size);
      line-height: var(--ct-typography-text-small-line-height);
      font-family: var(--ct-typography-text-small-font-name);
      font-weight: var(--ct-typography-text-small-font-weight);
      letter-spacing: var(--ct-typography-text-small-letter-spacing);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-attachment__links__link__changed {
        font-size: var(--ct-typography-text-small-desktop-font-size);
        line-height: var(--ct-typography-text-small-desktop-line-height);
      }
    }

    /* Light theme */
    .ct-attachment.ct-theme-light {
      color: var(--ct-color-light-body);
    }
    .ct-attachment.ct-theme-light.ct-attachment--with-background {
      background-color: var(--ct-color-light-background);
    }
    .ct-attachment.ct-theme-light .ct-attachment__wrapper {
      border-color: var(--ct-color-light-border-light);
      background-color: var(--ct-color-light-background-light);
    }

    /* Dark theme */
    .ct-attachment.ct-theme-dark {
      color: var(--ct-color-dark-body);
    }
    .ct-attachment.ct-theme-dark.ct-attachment--with-background {
      background-color: var(--ct-color-dark-background);
    }
    .ct-attachment.ct-theme-dark .ct-attachment__wrapper {
      border-color: var(--ct-color-dark-border);
      background-color: var(--ct-color-dark-background);
    }
  `;

  @property({ type: String }) theme: AttachmentTheme = 'light';
  @property({ type: String }) title = '';
  @property({ type: String }) content = '';
  @property({ type: Boolean, attribute: 'with-background' }) withBackground = false;
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: AttachmentVerticalSpacing = 'none';
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _files(): CtAttachmentFile[] {
    return Array.from(this.querySelectorAll(':scope > ct-attachment-file')) as CtAttachmentFile[];
  }

  render() {
    const files = this._files();

    // Mirrors upstream's `{% if files is not empty %}` gate around the whole component -
    // an attachment with no files has nothing useful to render.
    if (files.length === 0) {
      return nothing;
    }

    const classes = {
      'ct-attachment': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-attachment--with-background': this.withBackground,
      [`ct-vertical-spacing-inset--${this.verticalSpacing}`]: this.verticalSpacing !== 'none',
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)}>
        <div class="ct-attachment__wrapper">
          <div class="ct-attachment__content-top"><slot name="content-top"></slot></div>
          ${this.title || this.content
            ? html`
                <div class="ct-attachment__inner">
                  ${this.title
                    ? html`<ct-heading theme=${this.theme} level="4" content=${this.title} modifier-class="ct-attachment__title"></ct-heading>`
                    : nothing}
                  ${this.content ? html`<p class="ct-attachment__content">${this.content}</p>` : nothing}
                </div>
              `
            : nothing}
          <ul class="ct-attachment__links">
            ${files.map((file) => this.renderFile(file))}
          </ul>
          <div class="ct-attachment__content-bottom"><slot name="content-bottom"></slot></div>
        </div>
      </div>
    `;
  }

  private renderFile(file: CtAttachmentFile) {
    const icon = file.icon || 'download-file';

    // Upstream nests the "(ext, size)" text inside the same clickable text run as the file
    // name, because its `link` include accepts a rich text blob. `ct-link`'s `label` is a
    // plain string (props stay plain strings/booleans throughout this system), so it can't
    // receive that nested span - rendered here as an adjacent, non-clickable span instead,
    // right after the link, keeping the upstream uppercase treatment.
    const extensionText =
      file.ext && file.size
        ? `(${file.ext}, ${file.size})`
        : file.ext || file.size
          ? `(${file.ext || file.size})`
          : '';

    return html`
      <li class="ct-attachment__links__item">
        <ct-icon class="ct-attachment__links__link__icon" name=${icon} size="large"></ct-icon>
        <div class="ct-attachment__links__link__wrapper">
          <ct-link
            theme=${this.theme}
            label=${file.name}
            url=${ifDefined(file.url)}
            title="Download ${file.name}"
            modifier-class="ct-attachment__links__link"
          ></ct-link>
          ${extensionText ? html`<span class="ct-attachment__links__link__extension">${extensionText}</span>` : nothing}
          ${file.changed ? html`<p class="ct-attachment__links__link__changed">LAST UPDATED: ${file.changed}</p>` : nothing}
        </div>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-attachment': CtAttachment;
  }
}
