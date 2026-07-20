import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../icon/icon.js';

export type ContentLinkTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Content Link component based on CivicTheme.
 * The inline link atom used within body text/paragraphs — distinct from the
 * standalone `ct-link` atom (different class prefix, no icon prop, no
 * active/disabled states). External links get a trailing "upper-right-arrow"
 * `ct-icon`, grouped with the last word so it never wraps onto its own line.
 */
@customElement('ct-content-link')
export class CtContentLink extends LitElement {
  static styles = css`
    :host {
      display: inline;
    }

    .ct-content-link {
      display: inline;
      cursor: pointer;
      box-sizing: border-box;
      text-decoration: underline;
      text-decoration-thickness: 0.0625rem;
      text-underline-offset: 0.1875rem;
      padding: 0.1875rem 0 0.125rem;
      word-break: break-word;
    }

    .ct-content-link:hover {
      text-decoration: none;
      padding: 0.1875rem 0 0.25rem;
    }

    /* Theme: light (also the default when no theme is specified upstream) */
    .ct-content-link.ct-theme-light {
      color: var(--ct-content-link-light-color);
    }
    .ct-content-link.ct-theme-light:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
    }
    .ct-content-link.ct-theme-light:hover {
      background-color: var(--ct-content-link-light-hover-background-color);
      color: var(--ct-content-link-light-hover-color);
    }
    .ct-content-link.ct-theme-light:visited {
      color: var(--ct-content-link-light-visited-color);
    }
    .ct-content-link.ct-theme-light:visited:hover {
      color: var(--ct-content-link-light-visited-hover-color);
    }

    /* Theme: dark */
    .ct-content-link.ct-theme-dark {
      color: var(--ct-content-link-dark-color);
    }
    .ct-content-link.ct-theme-dark:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-dark);
    }
    .ct-content-link.ct-theme-dark:hover {
      background-color: var(--ct-content-link-dark-hover-background-color);
      color: var(--ct-content-link-dark-hover-color);
    }
    .ct-content-link.ct-theme-dark:visited {
      color: var(--ct-content-link-dark-visited-color);
    }
    .ct-content-link.ct-theme-dark:visited:hover {
      color: var(--ct-content-link-dark-visited-hover-color);
    }

    .ct-content-link__icon {
      display: inline-block;
      vertical-align: middle;
    }

    .ct-content-link__text {
      vertical-align: middle;
    }

    /* Keeps the trailing external-link icon grouped with the last word so it never wraps alone. */
    .ct-content-link__group {
      white-space: nowrap;
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
  `;

  /** Theme variation (light or dark). */
  @property({ type: String }) theme: ContentLinkTheme = 'light';

  /** Link text. */
  @property({ type: String }) text = '';

  /** Link URL. */
  @property({ type: String }) url?: string;

  /** Link title attribute. */
  @property({ type: String, attribute: 'title' }) linkTitle?: string;

  /** Whether to open in a new window. */
  @property({ type: Boolean, attribute: 'new-window' }) newWindow = false;

  /** Whether the link is external — renders a trailing "upper-right-arrow" icon. */
  @property({ type: Boolean }) external = false;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * Mirrors CivicTheme's text-icon sub-component as content-link calls it:
   * no configurable icon, just an optional trailing external-link indicator
   * grouped with the last word, plus a visually-hidden "opens in new tab" cue.
   */
  private renderContent() {
    const newWindowHtml = this.newWindow
      ? html`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>`
      : nothing;

    if (!this.external) {
      return html`<span class="ct-content-link__text">${this.text}</span>${newWindowHtml}`;
    }

    const words = this.text.trim().split(/\s+/);
    const lastWord = words[words.length - 1] ?? '';
    const leadWords = words.slice(0, -1).join(' ');
    const externalIcon = html`<ct-icon class="ct-content-link__icon" name="upper-right-arrow"></ct-icon>`;

    return html`
      <span class="ct-content-link__text">${leadWords} </span
      ><span class="ct-content-link__group"><span class="ct-content-link__text">${lastWord}</span> ${externalIcon}</span
      >${newWindowHtml}
    `;
  }

  render() {
    if (!this.text) {
      return nothing;
    }

    const classes = {
      'ct-content-link': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-content-link--external': this.external,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <a
        class=${classMap(classes)}
        data-component-name="content-link"
        href=${ifDefined(this.url)}
        title=${ifDefined(this.linkTitle)}
        target=${ifDefined(this.newWindow ? '_blank' : undefined)}
        rel=${ifDefined(this.newWindow ? 'noopener noreferrer' : undefined)}
      >
        ${this.renderContent()}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-content-link': CtContentLink;
  }
}
