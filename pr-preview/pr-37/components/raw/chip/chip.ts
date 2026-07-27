import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type ChipTheme = 'light' | 'dark';
export type ChipKind = 'default' | 'input' | 'link';
export type ChipSize = 'large' | 'regular' | 'small';

/**
 * A Generative UI-ready Chip component based on CivicTheme, used for filters,
 * tags and input-driven selections. Renders as a `<span>` by default, a
 * `<label>` wrapping a visually-hidden `<input type="radio">` when
 * `kind="input"` (for filter-chip-style single selection), or an `<a>` when
 * `kind="link"` and a `url` is provided.
 */
@customElement('ct-chip')
export class CtChip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-chip {
      display: inline-block;
      box-sizing: border-box;
      cursor: pointer;
      border-style: solid;
      border-width: var(--ct-chip-border-width, 0.0625rem);
      border-radius: 3rem;
      text-decoration: none;
      outline-offset: var(--ct-button-outline-offset, 0.125rem);
      outline-width: var(--ct-button-outline-width, 0.1875rem);
      transition: all var(--ct-button-animation-duration, 0.25s) ease;
      font-family: var(--ct-typography-family-heading, sans-serif);
    }

    .ct-chip:focus-visible,
    .ct-chip:hover,
    .ct-chip:active {
      text-decoration: none;
    }

    .ct-chip[disabled] {
      text-decoration: none;
      pointer-events: none;
      user-select: none;
      opacity: 50%;
    }

    /* Sizes */
    .ct-chip--large {
      font-size: var(--ct-typography-label-large-font-size);
      line-height: var(--ct-typography-label-large-line-height);
      font-family: var(--ct-typography-label-large-font-name);
      font-weight: var(--ct-typography-label-large-font-weight);
      letter-spacing: var(--ct-typography-label-large-letter-spacing);
      padding: 1rem 3rem;
    }

    .ct-chip--regular {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      padding: 0.875rem 2.5rem;
    }

    .ct-chip--small {
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-family: var(--ct-typography-label-small-font-name);
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
      padding: 0.5rem 2rem;
    }

    /* Light theme */
    .ct-chip.ct-theme-light {
      background-color: var(--ct-chip-light-background-color);
      border-color: var(--ct-chip-light-border-color);
      color: var(--ct-chip-light-color);
    }
    .ct-chip.ct-theme-light:hover {
      background-color: var(--ct-chip-light-hover-background-color);
      border-color: var(--ct-chip-light-hover-border-color);
      color: var(--ct-chip-light-hover-color);
    }
    .ct-chip.ct-theme-light:focus-visible,
    .ct-chip.ct-theme-light:focus-within {
      outline-color: var(--ct-chip-light-focus-outline-color);
      outline-style: solid;
    }
    .ct-chip.ct-theme-light.active,
    .ct-chip.ct-theme-light.active:active,
    .ct-chip.ct-theme-light:active {
      background-color: var(--ct-chip-light-selected-background-color);
      border-color: var(--ct-chip-light-selected-border-color);
      color: var(--ct-chip-light-selected-color);
    }
    .ct-chip.ct-theme-light.active:hover {
      background-color: var(--ct-chip-light-selected-hover-background-color);
      border-color: var(--ct-chip-light-selected-hover-border-color);
      color: var(--ct-chip-light-selected-hover-color);
    }

    /* Dark theme */
    .ct-chip.ct-theme-dark {
      background-color: var(--ct-chip-dark-background-color);
      border-color: var(--ct-chip-dark-border-color);
      color: var(--ct-chip-dark-color);
    }
    .ct-chip.ct-theme-dark:hover {
      background-color: var(--ct-chip-dark-hover-background-color);
      border-color: var(--ct-chip-dark-hover-border-color);
      color: var(--ct-chip-dark-hover-color);
    }
    .ct-chip.ct-theme-dark:focus-visible,
    .ct-chip.ct-theme-dark:focus-within {
      outline-color: var(--ct-chip-dark-focus-outline-color);
      outline-style: solid;
    }
    .ct-chip.ct-theme-dark.active,
    .ct-chip.ct-theme-dark.active:active,
    .ct-chip.ct-theme-dark:active {
      background-color: var(--ct-chip-dark-selected-background-color);
      border-color: var(--ct-chip-dark-selected-border-color);
      color: var(--ct-chip-dark-selected-color);
    }
    .ct-chip.ct-theme-dark.active:hover {
      background-color: var(--ct-chip-dark-selected-hover-background-color);
      border-color: var(--ct-chip-dark-selected-hover-border-color);
      color: var(--ct-chip-dark-selected-hover-color);
    }

    /* kind="input": the native control is visually hidden — the surrounding
       label carries all visible chip styling, driven by the "active" class. */
    .ct-chip__input {
      position: absolute;
      clip: rect(0.0625rem, 0.0625rem, 0.0625rem, 0.0625rem);
      overflow: hidden;
      height: 1px;
      width: 1px;
      white-space: nowrap;
    }

    .ct-chip__text {
      vertical-align: middle;
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: ChipTheme = 'light';

  /** Chip kind: a static span, a radio-input-backed label, or a link. */
  @property({ type: String }) kind: ChipKind = 'default';

  /** Chip size. */
  @property({ type: String }) size: ChipSize = 'regular';

  /** Chip text. */
  @property({ type: String }) content = '';

  /** URL, used when `kind="link"`. */
  @property({ type: String }) url?: string;

  /** Aria-label, used when `kind="link"`. */
  @property({ type: String }) label?: string;

  /** Whether the chip is selected (for filter-chip-style usage). */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Disables the chip and dims it to 50% opacity. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    if (!this.content) {
      return nothing;
    }

    const kind: ChipKind = ['default', 'input', 'link'].includes(this.kind) ? this.kind : 'default';
    const size: ChipSize = ['large', 'regular', 'small'].includes(this.size) ? this.size : 'regular';

    const classes = {
      'ct-chip': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-chip--${kind}`]: true,
      [`ct-chip--${size}`]: true,
      active: this.selected,
    };

    const textHtml = html`<span class="ct-chip__text">${this.content}</span>`;

    if (kind === 'input') {
      return html`
        <label class=${classMap(classes)} data-component-name="chip">
          <input
            class="ct-chip__input"
            type="radio"
            ?checked=${this.selected}
            ?disabled=${this.disabled}
          />
          ${textHtml}
        </label>
      `;
    }

    if (kind === 'link' && this.url) {
      return html`
        <a
          href=${this.url}
          class=${classMap(classes)}
          aria-label=${ifDefined(this.label || undefined)}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
          data-component-name="chip"
        >
          ${textHtml}
        </a>
      `;
    }

    return html`
      <span class=${classMap(classes)} ?disabled=${this.disabled} data-component-name="chip">
        ${textHtml}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-chip': CtChip;
  }
}
