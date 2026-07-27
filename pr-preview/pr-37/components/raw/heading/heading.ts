import { LitElement, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { BreakpointM } from '@ct-infra/tokens';

export type HeadingTheme = 'light' | 'dark';
export type HeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

const VALID_LEVELS: HeadingLevel[] = ['1', '2', '3', '4', '5', '6'];

/**
 * A Generative UI-ready Heading component based on CivicTheme. Renders a semantic
 * `<h1>`-`<h6>` element (chosen via the `level` attribute) styled from the shared
 * typography scale, with a light/dark theme-driven heading color.
 */
@customElement('ct-heading')
export class CtHeading extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-heading {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      font-family: var(--ct-typography-family-heading, sans-serif);
    }

    .ct-heading.ct-theme-light {
      color: var(--ct-heading-light-color);
    }
    .ct-heading.ct-theme-dark {
      color: var(--ct-heading-dark-color);
    }

    /* Level-driven typography, sourced from the shared heading type scale
       (--ct-typography-heading-<level>-*). CivicTheme applies this to bare
       h1-h6 selectors via a global base stylesheet, which can't reach into
       this component's shadow root, so it's ported here per level instead. */
    .ct-heading--level-1 {
      font-size: var(--ct-typography-heading-1-font-size);
      line-height: var(--ct-typography-heading-1-line-height);
      font-weight: var(--ct-typography-heading-1-font-weight);
      letter-spacing: var(--ct-typography-heading-1-letter-spacing);
    }
    .ct-heading--level-2 {
      font-size: var(--ct-typography-heading-2-font-size);
      line-height: var(--ct-typography-heading-2-line-height);
      font-weight: var(--ct-typography-heading-2-font-weight);
      letter-spacing: var(--ct-typography-heading-2-letter-spacing);
    }
    .ct-heading--level-3 {
      font-size: var(--ct-typography-heading-3-font-size);
      line-height: var(--ct-typography-heading-3-line-height);
      font-weight: var(--ct-typography-heading-3-font-weight);
      letter-spacing: var(--ct-typography-heading-3-letter-spacing);
    }
    .ct-heading--level-4 {
      font-size: var(--ct-typography-heading-4-font-size);
      line-height: var(--ct-typography-heading-4-line-height);
      font-weight: var(--ct-typography-heading-4-font-weight);
      letter-spacing: var(--ct-typography-heading-4-letter-spacing);
    }
    .ct-heading--level-5 {
      font-size: var(--ct-typography-heading-5-font-size);
      line-height: var(--ct-typography-heading-5-line-height);
      font-weight: var(--ct-typography-heading-5-font-weight);
      letter-spacing: var(--ct-typography-heading-5-letter-spacing);
    }
    .ct-heading--level-6 {
      font-size: var(--ct-typography-heading-6-font-size);
      line-height: var(--ct-typography-heading-6-line-height);
      font-weight: var(--ct-typography-heading-6-font-weight);
      letter-spacing: var(--ct-typography-heading-6-letter-spacing);
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-heading--level-1 {
        font-size: var(--ct-typography-heading-1-font-size-desktop);
        line-height: var(--ct-typography-heading-1-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-1-letter-spacing-desktop);
      }
      .ct-heading--level-2 {
        font-size: var(--ct-typography-heading-2-font-size-desktop);
        line-height: var(--ct-typography-heading-2-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-2-letter-spacing-desktop);
      }
      .ct-heading--level-3 {
        font-size: var(--ct-typography-heading-3-font-size-desktop);
        line-height: var(--ct-typography-heading-3-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-3-letter-spacing-desktop);
      }
      .ct-heading--level-4 {
        font-size: var(--ct-typography-heading-4-font-size-desktop);
        line-height: var(--ct-typography-heading-4-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-4-letter-spacing-desktop);
      }
      .ct-heading--level-5 {
        font-size: var(--ct-typography-heading-5-font-size-desktop);
        line-height: var(--ct-typography-heading-5-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-5-letter-spacing-desktop);
      }
      /* Level 6 has no desktop override upstream - stays at its base size. */
    }
  `;

  /**
   * Theme variation: light or dark. Drives the heading color.
   */
  @property({ type: String }) theme: HeadingTheme = 'light';

  /**
   * Heading content (text).
   */
  @property({ type: String }) content = '';

  /**
   * Heading level (1-6). Determines both the rendered tag (`<h1>`-`<h6>`)
   * and the typography scale step applied.
   */
  @property({ type: String }) level: HeadingLevel = '2';

  /**
   * Additional custom CSS classes.
   */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    const level = VALID_LEVELS.includes(this.level) ? this.level : '2';
    const tag = unsafeStatic(`h${level}`);

    const classes = {
      'ct-heading': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-heading--level-${level}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    if (!this.content) {
      return nothing;
    }

    return html`<${tag} class=${classMap(classes)} data-component-name="heading">${this.content}<slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-heading': CtHeading;
  }
}
