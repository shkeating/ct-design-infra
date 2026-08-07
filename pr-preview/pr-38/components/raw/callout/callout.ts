import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointL, BreakpointM } from '@ct-infra/tokens';
import '../../01-atoms/heading/heading.js';
import '../../01-atoms/paragraph/paragraph.js';
import '../../01-atoms/button/button.js';
import '../../00-base/item-list/item-list.js';
import type { CtCalloutLink } from './callout-link.js';
import './callout-link.js';

export type CalloutTheme = 'light' | 'dark';
export type CalloutVerticalSpacing = 'top' | 'bottom' | 'both' | 'none';

const VALID_SPACING: CalloutVerticalSpacing[] = ['top', 'bottom', 'both', 'none'];

/**
 * A Generative UI-ready Callout component based on CivicTheme, for highlighting important
 * information with a title, content and links. Composes the already-ported `ct-heading`
 * (title), `ct-paragraph` (content) and `ct-item-list` + `ct-button` (links) components
 * internally, mirroring upstream `callout.twig`'s own `civictheme:heading` / `civictheme:paragraph`
 * / `civictheme:item-list` / `civictheme:button` includes, rather than re-implementing any of
 * their styling here.
 *
 * Deviations from upstream, made non-interactively while porting (see docs/parallel-porting.md):
 * - Upstream's Twig `title` prop is exposed here as the `heading` attribute instead. `title` is
 *   a global HTML attribute that triggers the browser's native hover tooltip on any element
 *   (custom elements included) purely from its presence - keeping the upstream name would have
 *   silently given every `ct-callout` a native tooltip duplicating its own heading text.
 * - Upstream unconditionally wraps its markup in a `.container > .row > .col-xxs-12` grid
 *   scaffold. The compiled `callout.css` defines zero rules for any of those three classes -
 *   they exist purely for Drupal's page-level grid system, which this component library doesn't
 *   model (see `ct-basic-content`'s `is-contained` container for the one place a container *is*
 *   reproduced, gated behind an explicit prop upstream provides for it). `ct-callout` has no such
 *   prop upstream, and it's normally composed inside a page region that already provides layout
 *   width, so the grid scaffold is omitted rather than duplicating an unconditional centered
 *   max-width container inside every instance.
 * - Upstream's `--ct-callout-stripe-width` resolves to `var(--ct-stripe-size)` with no other
 *   participants; per the same simplification `ct-accordion` already established, this component
 *   references `var(--ct-stripe-size)` directly rather than adding a redundant alias token.
 *
 * Links are composed via `ct-callout-link` light-DOM children rather than a JSON `links` prop
 * (array/object props aren't allowed - plain strings/booleans only), matching the
 * `ct-accordion`/`ct-accordion-item` and `ct-item-list`/`ct-item-list-item` parent+child shape.
 */
@customElement('ct-callout')
export class CtCallout extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-callout__wrapper {
      border-radius: var(--ct-callout-border-radius);
      padding: 1.5rem 1.5rem;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: relative;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-callout__wrapper {
        padding: 1.5rem 2.5rem 2rem 1.5rem;
      }
    }

    .ct-callout__wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: var(--ct-stripe-size);
      border-top-left-radius: var(--ct-callout-border-radius);
      border-bottom-left-radius: var(--ct-callout-border-radius);
      transition: width 0.25s;
    }

    .ct-callout__inner {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Vertical spacing utility (mirrors CivicTheme's global .ct-vertical-spacing-inset--*
       utility classes - not present in callout.css itself, ported the same way
       ct-attachment/ct-accordion scope it to their own root class, using the same
       spacing.particle tokens as ct-attachment since upstream's base.css values
       (1.5rem mobile / 3rem desktop) match --ct-spacing-particle-300/600 exactly). */
    .ct-callout.ct-vertical-spacing-inset--top {
      padding-top: var(--ct-spacing-particle-300);
    }
    .ct-callout.ct-vertical-spacing-inset--bottom {
      padding-bottom: var(--ct-spacing-particle-300);
    }
    .ct-callout.ct-vertical-spacing-inset--both {
      padding-top: var(--ct-spacing-particle-300);
      padding-bottom: var(--ct-spacing-particle-300);
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-callout.ct-vertical-spacing-inset--top {
        padding-top: var(--ct-spacing-particle-600);
      }
      .ct-callout.ct-vertical-spacing-inset--bottom {
        padding-bottom: var(--ct-spacing-particle-600);
      }
      .ct-callout.ct-vertical-spacing-inset--both {
        padding-top: var(--ct-spacing-particle-600);
        padding-bottom: var(--ct-spacing-particle-600);
      }
    }

    /* Theme: light */
    .ct-callout.ct-theme-light .ct-callout__wrapper {
      background-color: var(--ct-callout-light-background-color);
    }
    .ct-callout.ct-theme-light .ct-callout__wrapper::before {
      background-color: var(--ct-callout-light-stripe-background-color);
    }

    /* Theme: dark */
    .ct-callout.ct-theme-dark .ct-callout__wrapper {
      background-color: var(--ct-callout-dark-background-color);
    }
    .ct-callout.ct-theme-dark .ct-callout__wrapper::before {
      background-color: var(--ct-callout-dark-stripe-background-color);
    }
  `;

  /**
   * Theme variation: light or dark. Drives the background and accent-stripe colors.
   */
  @property({ type: String }) theme: CalloutTheme = 'light';

  /**
   * Vertical spacing position (top, bottom, both, or none).
   */
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: CalloutVerticalSpacing = 'none';

  /**
   * Heading text, rendered via `ct-heading` at level 4. Named `heading` rather than upstream's
   * `title` to avoid colliding with the global HTML `title` attribute (see class doc comment).
   */
  @property({ type: String }) heading = '';

  /**
   * Trusted HTML content, rendered via `ct-paragraph`. Mirrors CivicTheme's `content` Twig slot;
   * callers are responsible for sanitizing this HTML before passing it.
   */
  @property({ type: String }) content = '';

  /**
   * Additional custom CSS classes.
   */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _links(): CtCalloutLink[] {
    return Array.from(this.querySelectorAll(':scope > ct-callout-link')) as CtCalloutLink[];
  }

  private _hasSlotted(slotName: string): boolean {
    return this.querySelector(`:scope > [slot="${slotName}"]`) !== null;
  }

  render() {
    const theme: CalloutTheme = this.theme === 'dark' ? 'dark' : 'light';
    const verticalSpacing = VALID_SPACING.includes(this.verticalSpacing) ? this.verticalSpacing : 'none';

    const classes = {
      'ct-callout': true,
      [`ct-theme-${theme}`]: true,
      [`ct-vertical-spacing-inset--${verticalSpacing}`]: verticalSpacing !== 'none',
      [this.modifierClass]: !!this.modifierClass,
    };

    const links = this._links();
    const hasContentTop = this._hasSlotted('content-top');
    const hasContentBottom = this._hasSlotted('content-bottom');
    const hasHeading = !!this.heading;
    const hasContent = !!this.content;

    return html`
      <div class=${classMap(classes)} data-component-name="callout">
        <div class="ct-callout__wrapper">
          ${
            hasContentTop
              ? html`<div class="ct-callout__content-top"><slot name="content-top"></slot></div>`
              : nothing
          }
          ${
            hasHeading || hasContent
              ? html`
                  <div class="ct-callout__inner">
                    ${hasHeading
                      ? html`<ct-heading theme=${theme} level="4" content=${this.heading} modifier-class="ct-callout__title"></ct-heading>`
                      : nothing}
                    ${hasContent
                      ? html`<ct-paragraph theme=${theme} content=${this.content} no-margin modifier-class="ct-callout__content"></ct-paragraph>`
                      : nothing}
                  </div>
                `
              : nothing
          }
          ${
            links.length
              ? html`
                  <ct-item-list size="small" modifier-class="ct-callout__links">
                    ${links.map(
                      (link, index) => html`
                        <ct-item-list-item>
                          <ct-button
                            theme=${theme}
                            kind="link"
                            variant=${index > 0 ? 'secondary' : 'primary'}
                            label=${link.text}
                            url=${ifDefined(link.url)}
                            ?external=${link.external}
                            ?new-window=${link.newWindow}
                          ></ct-button>
                        </ct-item-list-item>
                      `,
                    )}
                  </ct-item-list>
                `
              : nothing
          }
          ${
            hasContentBottom
              ? html`<div class="ct-callout__content-bottom"><slot name="content-bottom"></slot></div>`
              : nothing
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-callout': CtCallout;
  }
}
