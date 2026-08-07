import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../../01-atoms/button/button.js';

/**
 * A Generative UI-ready Back to Top component based on CivicTheme.
 *
 * Composes the real `ct-button` (icon-only, `kind="link"`) and, via `ct-button`,
 * `ct-icon` (`up-arrow`) — this component owns only the fixed positioning,
 * scroll-driven visibility, and click-to-return-to-top behavior around them.
 *
 * Upstream (`civictheme/uikit`) drives this with two small vanilla-JS behaviors
 * rather than a Zag.js state machine, so this port re-implements the same two
 * behaviors directly instead of pulling in the Zag adapter:
 * - `00-base/scrollspy/scrollspy.js`: toggles a `.ct-scrollspy-scrolled` class
 *   (here, the `scrolled` reactive state) once `window.scrollY` passes
 *   `data-scrollspy-offset` (here, `scrollOffset`).
 * - `00-base/skip-to-target/skip-to-target.js`: on click, prevents the default
 *   hash navigation and instead focuses + `scrollIntoView`s the target element
 *   directly, briefly toggling its `tabindex` so non-focusable targets (e.g. a
 *   `<div id="top">`) can still receive focus. Ported verbatim, including using
 *   `scrollIntoView(true)` (instant unless a page-level `scroll-behavior: smooth`
 *   applies) rather than an explicit `{ behavior: 'smooth' }` — upstream doesn't
 *   force smooth scrolling either, so this intentionally doesn't invent one.
 *
 * `target`/`scrollOffset`/`icon`/`label` are exposed as configurable props
 * (upstream hardcodes `#top`, `400`, `up-arrow`, and a visually-hidden "Return
 * focus to the top of the page" span respectively) since plain string/number/
 * boolean props are this system's GenUI boundary — `label` here is used as the
 * composed button's `aria-label` (the button is icon-only, no visible text),
 * which is functionally equivalent to upstream's visually-hidden span.
 *
 * `back-to-top.config.json`'s default Fractal preview context sets
 * `scrollOffset` to `-1` rather than upstream's real default of `400` — purely
 * so the (otherwise scroll-gated, `display: none` by default) button is
 * actually visible in a static preview/screenshot without simulating a page
 * scroll, the same reasoning `ct-tooltip`'s `open: true` default preview
 * context documents for itself.
 */
@customElement('ct-back-to-top')
export class CtBackToTop extends LitElement {
  static styles = css`
    @media print {
      .ct-back-to-top {
        display: none !important;
      }
    }

    .ct-back-to-top {
      display: none;
      position: fixed;
      right: var(--ct-back-to-top-space-right);
      bottom: var(--ct-back-to-top-space-bottom);
    }

    .ct-back-to-top.ct-scrollspy-scrolled {
      display: block;
    }

    /*
     * ct-button's own shadow root can't be reached by selector from here, but
     * CSS custom properties set on the ct-button element (or an ancestor of it,
     * within *this* component's own shadow tree) still inherit down into it —
     * that's the one bridge across the shadow boundary this component relies on.
     * Overriding --ct-button-border-radius (which ct-button's base rule already
     * references) makes the composed button fully round like upstream's pill-
     * shaped back-to-top button, without modifying the shared ct-button component.
     *
     * ct-button's per-size *padding* (0.5rem 2rem for size="small") is a literal
     * in ct-button's own stylesheet, not exposed via a custom property the way
     * border-radius is — so unlike border-radius, it can't be bridged the same
     * way. Flagged limitation: the composed button renders as a wide pill
     * (~84px x 36px) rather than upstream's compact ~32px icon-only circle.
     * Still comfortably clears the 24x24px CSS pixel WCAG 2.5.8 target-size
     * minimum, just wider than upstream's own design. Fixing this exactly would
     * mean adding a padding custom property to ct-button itself (out of scope
     * for this port of a separate, already-merged, shared component).
     */
    ct-button {
      --ct-button-border-radius: var(--ct-back-to-top-button-border-radius);
    }
  `;

  /** Additional custom CSS classes, matching upstream's `modifier_class`. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * CSS selector for the element to scroll to and focus on click. Upstream
   * hardcodes `#top`; exposed here as a plain string so a consumer can point
   * it at whatever their page uses as its top anchor.
   */
  @property({ type: String }) target = '#top';

  /**
   * Window scroll position (in pixels) past which the button becomes visible.
   * Mirrors upstream's `data-scrollspy-offset` (default `400`).
   */
  @property({ type: Number, attribute: 'scroll-offset' }) scrollOffset = 400;

  /** Name of the icon rendered inside the button. Upstream always uses `up-arrow`. */
  @property({ type: String }) icon = 'up-arrow';

  /**
   * Accessible name for the icon-only button. Upstream renders this as a
   * visually-hidden `<span>` inside the button; passed through as `aria-label`
   * on the composed `ct-button` instead, which is the established icon-only
   * accessible-name pattern already used elsewhere in this system (see
   * `ct-button`'s own `aria-label` override).
   */
  @property({ type: String }) label = 'Return focus to the top of the page';

  @state() private scrolled = false;

  private readonly _onScroll = (): void => {
    this.scrolled = window.scrollY > this.scrollOffset;
  };

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('scroll', this._onScroll, { passive: true });
    // Evaluate immediately so a page that loads already scrolled past the
    // threshold (e.g. a deep link) shows the button right away, rather than
    // waiting for the next scroll event.
    this._onScroll();
  }

  disconnectedCallback(): void {
    document.removeEventListener('scroll', this._onScroll);
    super.disconnectedCallback();
  }

  private _handleClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const targetEl = document.querySelector(this.target);
    if (!targetEl) {
      return;
    }

    // Ported from upstream's skip-to-target.js: briefly make the target
    // focusable (it may not naturally be, e.g. a plain <div id="top">), focus
    // and scroll to it, then remove it from the normal tab order again.
    targetEl.setAttribute('tabindex', '1');
    (targetEl as HTMLElement).focus();
    targetEl.scrollIntoView(true);
    targetEl.setAttribute('tabindex', '-1');
  }

  render() {
    const classes = {
      'ct-back-to-top': true,
      'ct-scrollspy-scrolled': this.scrolled,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)} data-component-name="back-to-top">
        <ct-button
          theme="light"
          kind="link"
          url=${this.target}
          icon=${this.icon}
          icon-placement="before"
          size="small"
          variant="primary"
          aria-label=${this.label}
          modifier-class="ct-back-to-top__button"
          @click=${(e: Event) => this._handleClick(e)}
        ></ct-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-back-to-top': CtBackToTop;
  }
}
