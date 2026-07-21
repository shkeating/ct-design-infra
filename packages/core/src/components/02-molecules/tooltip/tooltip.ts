import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { machine, connect } from '@zag-js/tooltip';
import type { Props as ZagTooltipProps, Placement } from '@zag-js/tooltip';
import { createMachineService, type MachineService } from '../../../lib/zag/create-machine-service.js';
import { domNormalizer } from '../../../lib/zag/normalize-props.js';
import type { IconSize } from '../../00-base/icon/icon.js';
import '../../00-base/icon/icon.js';
import '../../01-atoms/button/button.js';

export type TooltipTheme = 'light' | 'dark';

/**
 * Mirrors CivicTheme's `tooltip.component.yml` `position` enum, which includes Popper.js v1's
 * `auto`/`auto-start`/`auto-end` placements. The Zag.js state machine positions via
 * `@floating-ui/dom` (through `@zag-js/popper`), whose `Placement` type has no `auto` concept —
 * see the `PLACEMENT_MAP` fallback below for how these three values are resolved.
 */
export type TooltipPosition =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * `auto`/`auto-start`/`auto-end` (Popper.js v1 placements CivicTheme's own `position` prop
 * exposes) have no floating-ui equivalent. Best-effort fallback, since no one is available to
 * confirm: resolve them to the closest `bottom*` placement and rely on the `flip` middleware
 * (enabled below) to swap to `top` when there's no room — the same fallback CivicTheme's own
 * vanilla-JS implementation configured explicitly via Popper's `fallbackPlacements: ['top',
 * 'bottom']`. Flagged in the porting summary rather than blocking on it.
 */
const PLACEMENT_MAP: Record<TooltipPosition, Placement> = {
  auto: 'bottom',
  'auto-start': 'bottom-start',
  'auto-end': 'bottom-end',
  top: 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  left: 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
  right: 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
};

let instanceCount = 0;

/**
 * A Generative UI-ready Tooltip component based on CivicTheme, driven by a Zag.js state
 * machine (`@zag-js/tooltip`) for hover/focus/click open-close behavior and floating-ui-based
 * positioning (WCAG 1.4.13 Content on Hover or Focus, 2.1.1 Keyboard, 4.1.2 Name/Role/Value).
 *
 * Composes the real `ct-button` (dismiss control) and `ct-icon` (trigger glyph) elements rather
 * than reimplementing their markup, matching upstream `tooltip.twig`'s composition of
 * `civictheme:button` and `civictheme:icon`.
 *
 * Positioning/arrow rendering is re-implemented on top of floating-ui's standard rotated-square
 * arrow-tip technique (required by the Zag positioning engine) rather than CivicTheme's own
 * asymmetric CSS-border triangle hack — see the `.ct-tooltip__arrow` rule below. Visually a
 * close match (a color-matched diamond pointer sized from the same triangle-width token) but
 * not a pixel-identical port of the upstream arrow.
 */
@customElement('ct-tooltip')
export class CtTooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-tooltip {
      display: inline-block;
      position: relative;
    }

    .ct-tooltip__button {
      appearance: none;
      border: 0;
      cursor: pointer;
      position: relative;
      background-color: transparent;
      padding: 0;
      display: inline-flex;
      line-height: 0;
    }

    .ct-tooltip.ct-theme-light .ct-tooltip__button {
      color: var(--ct-tooltip-light-icon-color);
    }
    .ct-tooltip.ct-theme-light .ct-tooltip__button:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
    }
    .ct-tooltip.ct-theme-dark .ct-tooltip__button {
      color: var(--ct-tooltip-dark-icon-color);
    }
    .ct-tooltip.ct-theme-dark .ct-tooltip__button:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-dark);
    }

    .ct-tooltip__positioner {
      isolation: isolate;
    }

    .ct-tooltip__description {
      display: flex;
      align-items: flex-start;
      border-radius: var(--ct-tooltip-description-border-radius);
      width: var(--ct-tooltip-width-mobile);
      min-height: calc(var(--ct-tooltip-width-mobile) / 2);
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
      z-index: var(--ct-tooltip-z-index);
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-family: var(--ct-typography-label-extra-small-font-name);
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
    }
    @media (min-width: 768px) {
      .ct-tooltip__description {
        width: var(--ct-tooltip-width);
      }
    }
    .ct-tooltip__description[hidden] {
      display: none;
    }

    .ct-tooltip.ct-theme-light .ct-tooltip__description {
      color: var(--ct-tooltip-light-description-color);
      background-color: var(--ct-tooltip-light-description-background-color);
    }
    .ct-tooltip.ct-theme-dark .ct-tooltip__description {
      color: var(--ct-tooltip-dark-description-color);
      background-color: var(--ct-tooltip-dark-description-background-color);
    }

    .ct-tooltip__description__inner {
      padding: 1.5rem;
      flex: 1;
    }

    .ct-tooltip__description__close {
      flex: none;
      padding: 0.5rem 1rem 0.5rem 0.5rem;
    }

    /* Upstream tooltip.twig composes civictheme:button with no theme override, so the
       tertiary close button always renders in --ct-color-interaction-{light,dark}-background —
       which is the exact same color as --ct-tooltip-{light,dark}-description-background-color
       (both are aliases of the same interaction-background token). Composed faithfully, that
       makes the dismiss icon invisible against its own container (verified by screenshot: a
       #00698f icon on a #00698f background). Rather than fork ct-button or invent a different
       variant, override the custom property it reads its tertiary color from — scoped to just
       this wrapper, so only the icon's *effective inherited value* changes, not ct-button's
       source — to the description's own (guaranteed-contrasting) text color. Flagged as a
       deliberate deviation from a literal port of upstream's markup, made to fix a real
       WCAG 1.4.11 Non-text Contrast failure rather than reproduce it. */
    .ct-tooltip.ct-theme-light .ct-tooltip__description__close {
      --ct-color-interaction-light-background: var(--ct-tooltip-light-description-color);
    }
    .ct-tooltip.ct-theme-dark .ct-tooltip__description__close {
      --ct-color-interaction-dark-background: var(--ct-tooltip-dark-description-color);
    }

    /* Visually-hidden text projected into ct-button's default slot: ct-button has no
       aria-label passthrough of its own (it's a separately-owned, already-merged component),
       so an icon-only dismiss control needs its accessible name supplied this way — see the
       porting summary. */
    .ct-tooltip__visually-hidden {
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

    .ct-tooltip__arrow {
      --arrow-size: var(--ct-tooltip-triangle-width);
    }
    .ct-tooltip.ct-theme-light .ct-tooltip__arrow {
      --arrow-background: var(--ct-tooltip-light-description-background-color);
    }
    .ct-tooltip.ct-theme-dark .ct-tooltip__arrow {
      --arrow-background: var(--ct-tooltip-dark-description-background-color);
    }
  `;

  @property({ type: String }) theme: TooltipTheme = 'light';
  @property({ type: String }) position: TooltipPosition = 'auto';
  @property({ type: String }) icon = 'information-mark';
  @property({ type: String, attribute: 'icon-size' }) iconSize: IconSize = 'large';
  /**
   * Accessible name for the trigger button (also set as its native `title`). Upstream's
   * `tooltip.twig` names this slot `title`; renamed to `label` here (matching `ct-button`'s own
   * convention for its analogous text prop) because a Lit property literally named `title`
   * would be observed as the host element's global `title` HTML attribute, which browsers
   * render as a native tooltip on hover — a second, un-styled tooltip stacking on top of this
   * component's own. Documented, deliberate deviation from the upstream prop name.
   */
  @property({ type: String }) label = '';
  /** Text shown inside the tooltip popup. */
  @property({ type: String }) content = '';
  /**
   * Renders the popup open on load instead of the default hover/focus/click-triggered
   * closed state. Not part of upstream's `tooltip.component.yml` — added so the popup (and
   * the tokens driving its color/spacing/positioning) has a way to be demonstrated in a static
   * Fractal preview/screenshot without simulating a hover, matching how CivicTheme's own
   * Storybook entry always renders with default args rather than mid-interaction. The tooltip
   * remains a normal, uncontrolled, closeable popup after load (`defaultOpen`, not `open`).
   */
  @property({ type: Boolean }) open = false;
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _tooltipService?: MachineService<any>;

  connectedCallback() {
    super.connectedCallback();

    if (!this.id) {
      this.id = `ct-tooltip-${++instanceCount}`;
    }

    const props: Partial<ZagTooltipProps> & { id: string; getRootNode: () => ShadowRoot | Document } = {
      id: this.id,
      getRootNode: () => this.shadowRoot ?? document,
      interactive: true,
      defaultOpen: this.open,
      positioning: {
        placement: PLACEMENT_MAP[this.position] ?? 'bottom',
        flip: true,
        gutter: 24,
      },
    };

    this._tooltipService = createMachineService(machine, () => props, () => this.requestUpdate());
    this._tooltipService.start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._tooltipService?.stop();
  }

  render() {
    if (!this.content || !this._tooltipService) {
      return nothing;
    }

    // `connect()` expects Zag's own internal `Service<TooltipSchema>` shape, which our
    // simplified MachineService doesn't structurally match even though this connect
    // implementation only reads send/context/prop/scope/computed (see accordion.ts for the
    // same cast).
    const api = connect(this._tooltipService as unknown as Parameters<typeof connect>[0], domNormalizer);
    const triggerProps = api.getTriggerProps();
    const positionerProps = api.getPositionerProps();
    const contentProps = api.getContentProps();
    const arrowProps = api.getArrowProps();
    const arrowTipProps = api.getArrowTipProps();

    const classes = {
      'ct-tooltip': true,
      [`ct-theme-${this.theme}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)} data-component-name="tooltip">
        <button
          type="button"
          class="ct-tooltip__button"
          id=${triggerProps.id}
          data-scope="tooltip"
          data-part="trigger"
          aria-describedby=${ifDefined(triggerProps['aria-describedby'] as string | undefined)}
          aria-label=${ifDefined(this.label || undefined)}
          title=${ifDefined(this.label || undefined)}
          data-state=${ifDefined(triggerProps['data-state'] as string | undefined)}
          @click=${triggerProps.onClick}
          @focus=${triggerProps.onFocus}
          @blur=${triggerProps.onBlur}
          @pointerdown=${triggerProps.onPointerDown}
          @pointermove=${triggerProps.onPointerMove}
          @pointerover=${triggerProps.onPointerOver}
          @pointerleave=${triggerProps.onPointerLeave}
          @pointercancel=${triggerProps.onPointerCancel}
        >
          <ct-icon name=${this.icon} size=${this.iconSize}></ct-icon>
        </button>
        <div
          class="ct-tooltip__positioner"
          id=${positionerProps.id}
          data-scope="tooltip"
          data-part="positioner"
          style=${styleMap(positionerProps.style as Record<string, string>)}
        >
          <div
            class="ct-tooltip__description"
            id=${ifDefined(contentProps.id as string | undefined)}
            data-scope="tooltip"
            data-part="content"
            role=${ifDefined(contentProps.role as string | undefined)}
            ?hidden=${contentProps.hidden}
            data-state=${ifDefined(contentProps['data-state'] as string | undefined)}
            style=${styleMap(contentProps.style as Record<string, string>)}
            @pointerenter=${contentProps.onPointerEnter}
            @pointerleave=${contentProps.onPointerLeave}
          >
            <div class="ct-tooltip__description__inner">${this.content}</div>
            <div class="ct-tooltip__description__close">
              <ct-button
                theme=${this.theme}
                variant="tertiary"
                kind="button"
                icon="cancel"
                size="regular"
                @click=${() => api.setOpen(false)}
              >
                <span class="ct-tooltip__visually-hidden">Close</span>
              </ct-button>
            </div>
          </div>
          <div
            class="ct-tooltip__arrow"
            id=${arrowProps.id}
            data-scope="tooltip"
            data-part="arrow"
            style=${styleMap(arrowProps.style as Record<string, string>)}
          >
            <div
              class="ct-tooltip__arrow-tip"
              data-scope="tooltip"
              data-part="arrow-tip"
              style=${styleMap(arrowTipProps.style as Record<string, string>)}
            ></div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-tooltip': CtTooltip;
  }
}
