import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BreakpointL, BreakpointM } from '@ct-infra/tokens';
import '../../01-atoms/heading/heading.js';
import '../../01-atoms/link/link.js';
import '../../01-atoms/paragraph/paragraph.js';

export type NextStepsTheme = 'light' | 'dark';
export type NextStepsVerticalSpacing = 'top' | 'bottom' | 'both' | 'none';

const VALID_VERTICAL_SPACINGS: NextStepsVerticalSpacing[] = ['top', 'bottom', 'both', 'none'];

/**
 * A Generative UI-ready Next Steps component based on CivicTheme, highlighting a
 * single prominent call-to-action ("next step") a user should take from the
 * current page.
 *
 * Ported from upstream's `next-step` (singular) SDC component - this repo's tag/
 * token/wcag-data name is plural (`ct-next-steps`) to match `wcag-data/next-steps.json`.
 *
 * Composes already-ported atoms rather than re-implementing their markup/styling:
 * `ct-heading` (the title, level 4, plain-text case), `ct-link` (the title becomes
 * a link, with a trailing `right-arrow-2` icon, when `link-url` is set) and
 * `ct-paragraph` (the body content). Upstream's `content_top`/`content_bottom`
 * Twig slots (free-form, not text props) are exposed as real named slots so
 * callers can project arbitrary markup - neither has any dedicated styling in the
 * upstream compiled CSS (no `--ct-next-step(s)-content-(top|bottom)-*` variable
 * exists), so no CSS is needed for them here beyond the plain wrapper divs
 * upstream uses.
 *
 * Known composition limitation (flagged rather than worked around by editing a
 * shared atom): upstream's Twig renders the linked-title case by passing the
 * *rendered link markup* as `civictheme:heading`'s `content` prop, so the link
 * inherits the heading's typography via plain CSS cascade in one flat DOM tree.
 * `ct-heading` here only accepts a plain-text `content` string (rendered via a
 * text binding, and its `render()` bails to `nothing` entirely when `content` is
 * empty - see `heading.ts`), so it cannot host a nested `<ct-link>` as its real
 * content; each custom element's Shadow DOM also prevents this component's own
 * stylesheet from reaching into either child's internals regardless (the same
 * boundary `attachment.ts` already accepts for its `modifier-class` passed into
 * `ct-heading`). So the linked-title case renders a native `<h4>` here directly
 * (reusing `ct-link` for the link itself, not `ct-heading`) instead of nesting
 * `ct-link` inside `ct-heading`. Net effect: the linked title's font size/weight
 * come from `ct-link`'s own built-in label-regular type scale rather than
 * inheriting the heading-5 scale like upstream - a minor visual deviation from
 * pixel parity, not a functional gap.
 */
@customElement('ct-next-steps')
export class CtNextSteps extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-next-step {
      position: relative;
      width: 100%;
    }

    .ct-next-step__wrapper {
      display: block;
      position: relative;
      box-sizing: border-box;
      border-width: 0.0625rem;
      border-style: solid;
      padding: 1.5rem 1rem 1.5rem calc(1rem + var(--ct-next-steps-stripe-width));
      border-radius: var(--ct-next-steps-border-radius);
    }

    .ct-next-step__wrapper::before {
      content: '';
      position: absolute;
      top: -0.0625rem;
      bottom: -0.0625rem;
      left: -0.0625rem;
      width: calc(var(--ct-next-steps-stripe-width) + 0.0625rem);
      border-top-left-radius: var(--ct-next-steps-border-radius);
      border-bottom-left-radius: var(--ct-next-steps-border-radius);
      transition: width 0.25s;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-next-step__wrapper {
        padding: 1.5rem 1.5rem 1.5rem calc(1.5rem + var(--ct-next-steps-stripe-width));
      }
    }

    /* Applies fully to the native <h4> rendered directly for the linked-title
       case; passed as modifier-class to ct-heading for the plain-text case too,
       where (per the class doc comment above) it can't reach ct-heading's
       shadow root and is a harmless no-op there. */
    .ct-next-step__title {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      font-size: var(--ct-typography-heading-5-font-size);
      line-height: var(--ct-typography-heading-5-line-height);
      font-family: var(--ct-typography-heading-5-font-name);
      font-weight: var(--ct-typography-heading-5-font-weight);
      letter-spacing: var(--ct-typography-heading-5-letter-spacing);
    }

    .ct-next-step__title__link {
      display: flex;
      align-items: center;
      column-gap: 1rem;
    }

    .ct-next-step__content {
      margin-top: 1rem;
    }

    /* Theme: light */
    .ct-next-step.ct-theme-light .ct-next-step__wrapper {
      color: var(--ct-next-steps-light-border-color);
      background-color: var(--ct-next-steps-light-background-color);
    }
    .ct-next-step.ct-theme-light .ct-next-step__wrapper::before {
      background-color: var(--ct-next-steps-light-stripe-background-color);
    }

    /* Theme: dark */
    .ct-next-step.ct-theme-dark .ct-next-step__wrapper {
      color: var(--ct-next-steps-dark-border-color);
      background-color: var(--ct-next-steps-dark-background-color);
    }
    .ct-next-step.ct-theme-dark .ct-next-step__wrapper::before {
      background-color: var(--ct-next-steps-dark-stripe-background-color);
    }

    /* Vertical spacing: matches ct-accordion's ct-vertical-spacing-inset--* convention.
       Not present in next-step.css (this class comes from a shared, un-ported
       upstream utility, 00-base/spacing/spacing.scss's $ct-spacing-map), so - per
       accordion's own precedent of re-deriving this locally rather than skipping
       it - values are computed from that map's xxs/l breakpoint entries
       (ct-spacing(3) = 3 * $ct-particle = 3 * 8px = 1.5rem; ct-spacing(6) = 6 * 8px
       = 3rem) rather than invented. */
    .ct-vertical-spacing-inset--top {
      padding-top: 1.5rem;
    }
    .ct-vertical-spacing-inset--bottom {
      padding-bottom: 1.5rem;
    }
    .ct-vertical-spacing-inset--both {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-vertical-spacing-inset--top {
        padding-top: 3rem;
      }
      .ct-vertical-spacing-inset--bottom {
        padding-bottom: 3rem;
      }
      .ct-vertical-spacing-inset--both {
        padding-top: 3rem;
        padding-bottom: 3rem;
      }
    }
  `;

  /**
   * Theme variation: light or dark.
   */
  @property({ type: String }) theme: NextStepsTheme = 'light';

  /**
   * Next step title text. Rendered as a level-4 heading; becomes a link
   * (with a trailing arrow icon) when `link-url` is set.
   */
  @property({ type: String }) heading = '';

  /**
   * Next step body content, rendered via `ct-paragraph`.
   */
  @property({ type: String }) content = '';

  /**
   * URL for the next step's call-to-action link. When set, `heading` renders
   * as a `ct-link` instead of plain text.
   */
  @property({ type: String, attribute: 'link-url' }) linkUrl?: string;

  /**
   * Opens the link in a new window/tab.
   */
  @property({ type: Boolean, attribute: 'link-new-window' }) linkNewWindow = false;

  /**
   * Marks the link as external (adds the external-link icon/affordance).
   */
  @property({ type: Boolean, attribute: 'link-external' }) linkExternal = false;

  /**
   * Vertical spacing position: top, bottom, both, or none.
   */
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: NextStepsVerticalSpacing = 'none';

  /**
   * Additional custom CSS classes.
   */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.heading) {
      return nothing;
    }

    const theme: NextStepsTheme = this.theme === 'dark' ? 'dark' : 'light';
    const verticalSpacing: NextStepsVerticalSpacing = VALID_VERTICAL_SPACINGS.includes(this.verticalSpacing)
      ? this.verticalSpacing
      : 'none';

    const classes = {
      'ct-next-step': true,
      [`ct-theme-${theme}`]: true,
      [`ct-vertical-spacing-inset--${verticalSpacing}`]: verticalSpacing !== 'none',
      [this.modifierClass]: !!this.modifierClass,
    };

    // See the class doc comment: ct-heading can't host a nested ct-link as real
    // content, so the linked case renders a native <h4> reusing ct-link directly
    // instead of nesting ct-link inside ct-heading.
    const titleTemplate = this.linkUrl
      ? html`<h4 class="ct-next-step__title ct-next-step__title__link">
          <ct-link
            theme=${theme}
            label=${this.heading}
            url=${this.linkUrl}
            icon="right-arrow-2"
            icon-placement="after"
            icon-single-only
            icon-group-disabled
            ?new-window=${this.linkNewWindow}
            ?external=${this.linkExternal}
          ></ct-link>
        </h4>`
      : html`<ct-heading theme=${theme} level="4" content=${this.heading} modifier-class="ct-next-step__title"></ct-heading>`;

    return html`
      <div class=${classMap(classes)} data-component-name="next-steps">
        <div class="ct-next-step__wrapper">
          <div class="ct-next-step__content-top">
            <slot name="content-top"></slot>
          </div>

          <div class="ct-next-step__inner">
            ${titleTemplate}
            ${this.content
              ? html`<ct-paragraph theme=${theme} content=${this.content} modifier-class="ct-next-step__content"></ct-paragraph>`
              : nothing}
          </div>

          <div class="ct-next-step__content-bottom">
            <slot name="content-bottom"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-next-steps': CtNextSteps;
  }
}
