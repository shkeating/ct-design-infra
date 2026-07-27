import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreakpointL } from '@ct-infra/tokens';

export type IframeTheme = 'light' | 'dark';
export type IframeVerticalSpacing = 'top' | 'bottom' | 'both' | 'none' | '';

const VALID_SPACING: IframeVerticalSpacing[] = ['top', 'bottom', 'both', 'none'];

/**
 * A Generative UI-ready Iframe component based on CivicTheme, rendering a
 * single `<iframe>` for embedding external content (maps, videos, forms).
 * Mirrors upstream `iframe.twig` and its compiled `iframe.css` rule-for-rule:
 * `url` renders as the native `src` attribute (kept as `url` on the prop/
 * attribute surface to match `iframe.component.yml`), `width`/`height` pass
 * straight through as native attributes, and `with-background` toggles
 * side padding + a theme-scoped background color. No `civictheme:*` twig
 * includes upstream — this is a standalone leaf atom, no composition
 * dependencies.
 *
 * `vertical-spacing` ('top'|'bottom'|'both'|'none'): upstream applies this
 * via a *shared*, not-yet-ported utility class (`.ct-vertical-spacing-inset--
 * <type>`, defined in `00-base/spacing`, not in `iframe.css` itself) driven
 * by a responsive SCSS mixin (`ct-component-with-vertical-spacing`) rather
 * than a per-component resolved CSS variable — so there is no
 * `--ct-iframe-vertical-spacing` entry in `civictheme.variables.css` to
 * reconcile against directly. The value below (`--ct-iframe-vertical-
 * spacing`, computed as `ct-spacing(3)` = 8px * 3 = 1.5rem below the `l`
 * breakpoint, doubling to `ct-spacing(6)` = 3rem at/above it) was derived
 * directly from that SCSS source
 * (`00-base/mixins/_spacing.scss` + `00-base/spacing/spacing.scss`'s
 * `$ct-spacing-map`), not invented, and happens to match the resolved value
 * `02-molecules/basic-content` already uses for the exact same shared
 * utility (`basic-content.json`'s own `vertical-spacing` token) — flagged
 * here per this repo's "no matching token found, use the compiled-source
 * literal" fallback rather than silently treated as a normal token lookup.
 * Because Shadow DOM means the shared upstream utility class never reaches
 * this component's markup, the utility's rules are hand-ported into this
 * component's own `static styles` (same approach `basic-content` already
 * took for the same utility).
 *
 * `frameTitle` (native `title` attribute): **not** part of upstream
 * `iframe.component.yml`'s prop list — added here because there is no
 * `wcag-data/iframe.json` upstream (or in this repo) to check against, and
 * general WCAG guidance for embedded frames (2.4.1 Bypass Blocks / 4.1.2
 * Name, Role, Value — an iframe needs an accessible name so assistive tech
 * can identify what it contains before deciding whether to enter it) has no
 * mechanism without one. This mirrors the same documented addition
 * `ct-button`/`ct-link` made for `aria-label` when their upstream schemas
 * had no accessible-name escape hatch for icon-only usage. Focus handling
 * *inside* the embedded document is the embedded page's own responsibility
 * and outside this atom's control (same boundary `ct-video` draws around
 * caption tracks) — this component's only lever is providing the frame
 * itself with a real accessible name.
 */
@customElement('ct-iframe')
export class CtIframe extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 100%;
    }

    .ct-iframe {
      border: 0;
      box-sizing: border-box;
    }

    .ct-iframe.ct-iframe--with-background {
      padding-left: var(--ct-iframe-space-horizontal);
      padding-right: var(--ct-iframe-space-horizontal);
    }

    .ct-iframe:not([width]) {
      width: 100%;
    }

    .ct-iframe:not([height]) {
      height: 100%;
    }

    .ct-iframe.ct-theme-light.ct-iframe--with-background {
      background-color: var(--ct-iframe-light-wrapper-background-color);
    }

    .ct-iframe.ct-theme-dark.ct-iframe--with-background {
      background-color: var(--ct-iframe-dark-wrapper-background-color);
    }

    /* Vertical spacing utility (mirrors CivicTheme's shared
       .ct-vertical-spacing-inset--* utility classes from 00-base/spacing;
       see class doc comment above for why the base value is computed
       rather than reconciled against a resolved --ct-iframe-* variable). */
    .ct-iframe.ct-vertical-spacing-inset--top {
      padding-top: var(--ct-iframe-vertical-spacing);
    }
    .ct-iframe.ct-vertical-spacing-inset--bottom {
      padding-bottom: var(--ct-iframe-vertical-spacing);
    }
    .ct-iframe.ct-vertical-spacing-inset--both {
      padding-top: var(--ct-iframe-vertical-spacing);
      padding-bottom: var(--ct-iframe-vertical-spacing);
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-iframe.ct-vertical-spacing-inset--top {
        padding-top: calc(var(--ct-iframe-vertical-spacing) * 2);
      }
      .ct-iframe.ct-vertical-spacing-inset--bottom {
        padding-bottom: calc(var(--ct-iframe-vertical-spacing) * 2);
      }
      .ct-iframe.ct-vertical-spacing-inset--both {
        padding-top: calc(var(--ct-iframe-vertical-spacing) * 2);
        padding-bottom: calc(var(--ct-iframe-vertical-spacing) * 2);
      }
    }
  `;

  /** Theme variation: light or dark. Only visible when `with-background` is set. */
  @property({ type: String }) theme: IframeTheme = 'light';

  /** Iframe URL. Rendered as the native `src` attribute. Renders nothing when empty. */
  @property({ type: String }) url?: string;

  /** Iframe width (in pixels). Passed through as the native `width` attribute. */
  @property({ type: Number }) width?: number;

  /** Iframe height (in pixels). Passed through as the native `height` attribute. */
  @property({ type: Number }) height?: number;

  /**
   * Vertical spacing position: top, bottom, both, or none (default: no
   * extra inset padding, matching upstream's unset default).
   */
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: IframeVerticalSpacing = '';

  /** Whether to display with side padding + a theme-scoped background color. */
  @property({ type: Boolean, attribute: 'with-background' }) withBackground = false;

  /**
   * Accessible name for the frame, rendered as the native `title` attribute.
   * Not part of upstream's `iframe.component.yml` — added per general WCAG
   * guidance for embedded frames (2.4.1/4.1.2), since no `wcag-data/
   * iframe.json` exists to check against. Strongly recommended for every
   * real usage; left optional (rather than required) so an empty/omitted
   * value still renders a functioning iframe rather than nothing, matching
   * how this repo treats every other optional accessible-name prop.
   */
  @property({ type: String, attribute: 'title' }) frameTitle?: string;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.url) {
      return nothing;
    }

    const spacing = VALID_SPACING.includes(this.verticalSpacing) ? this.verticalSpacing : '';
    const spacingClass = spacing && spacing !== 'none' ? `ct-vertical-spacing-inset--${spacing}` : '';

    const classes = {
      'ct-iframe': true,
      [`ct-theme-${this.theme}`]: true,
      [spacingClass]: !!spacingClass,
      'ct-iframe--with-background': this.withBackground,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <iframe
        class=${classMap(classes)}
        src=${this.url}
        width=${ifDefined(this.width)}
        height=${ifDefined(this.height)}
        title=${ifDefined(this.frameTitle)}
        data-component-name="iframe"
      ></iframe>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-iframe': CtIframe;
  }
}
