import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { machine, connect } from '@zag-js/popover';
import type { Props as ZagPopoverProps } from '@zag-js/popover';
import { createMachineService, type MachineService } from '../../../lib/zag/create-machine-service.js';
import { domNormalizer } from '../../../lib/zag/normalize-props.js';
import '../../01-atoms/link/link.js';

export type PopoverTheme = 'light' | 'dark';

let instanceCount = 0;

/**
 * Cross-instance "group" coordination for the upstream `group` prop (CivicTheme's own
 * vanilla-JS collapsible closes every other same-group instance on the page when one
 * opens - see `collapsible.js`'s `closeGroup`). Zag.js's popover machine has no built-in
 * concept of grouping across separate machine instances, so this is a small, self-contained
 * addition layered on top of it (not a modification of the Zag adapter itself) purely to
 * satisfy that documented prop. Flagged in the porting summary as a deliberate addition.
 */
const groupRegistry = new Map<string, Set<CtPopover>>();

function registerGroupMember(group: string, member: CtPopover) {
  if (!groupRegistry.has(group)) {
    groupRegistry.set(group, new Set());
  }
  groupRegistry.get(group)!.add(member);
}

function unregisterGroupMember(group: string, member: CtPopover) {
  groupRegistry.get(group)?.delete(member);
}

function closeOtherGroupMembers(group: string, opened: CtPopover) {
  groupRegistry.get(group)?.forEach((member) => {
    if (member !== opened) {
      member.closePopover();
    }
  });
}

/**
 * A Generative UI-ready Popover component based on CivicTheme, driven by a Zag.js state
 * machine (`@zag-js/popover`) for click-triggered open/close, focus management (autofocus
 * into the panel, restore focus to the trigger on close), dismissal (Escape key, outside
 * click/focus), and floating-ui-based positioning (WCAG 2.1.1 Keyboard, 2.4.11 Focus Not
 * Obscured, 4.1.2 Name/Role/Value). No `wcag-data/popover.json` exists upstream or in this
 * repo prior to this port - see the newly-added `wcag-data/popover.json` for the full
 * criterion-by-criterion review written for this port.
 *
 * Composes the real `ct-link` element for the trigger (matching upstream `popover.twig`'s
 * `{% include 'civictheme:link' %}`) rather than a bare native control. Because `ct-link`
 * renders its actual `<a>` inside its own separate shadow root, `ct-link` gained a small
 * ARIA-passthrough addition (`aria-expanded`/`aria-haspopup`/`aria-controls` overrides,
 * mirroring its existing `aria-label` override) so the Zag machine's trigger state lands on
 * the real focusable element instead of the inert outer `<ct-link>` host tag - see link.ts.
 *
 * Positioning is Zag's floating-ui-based popper (`bottom-start` placement, `flip` enabled)
 * rather than upstream's plain `position: absolute` + static-position CSS fallback (which has
 * no viewport-edge collision handling at all) - a deliberate, documented improvement in the
 * same spirit as `ct-tooltip`'s positioning, not a pixel-literal port of upstream's simpler
 * CSS. The upstream `--ct-popover-top-offset` token is applied via the positioning `gutter`
 * option instead of a `margin-top` rule to keep that offset meaningful under floating-ui.
 *
 * The upstream `group` prop (mutually-exclusive popovers) has no Zag.js equivalent since Zag
 * machines don't coordinate across instances - implemented here via a small module-level
 * registry (see `groupRegistry` above) rather than modifying the shared Zag adapter.
 */
@customElement('ct-popover')
export class CtPopover extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ct-popover {
      display: inline-block;
      position: relative;
    }

    .ct-popover__positioner {
      isolation: isolate;
    }

    .ct-popover__content {
      box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.2);
      z-index: var(--ct-popover-z-index);
      border-radius: var(--ct-popover-description-border-radius);
    }
    .ct-popover__content[hidden] {
      display: none;
    }

    .ct-popover__content__inner {
      min-width: var(--ct-popover-min-width);
      min-height: 6rem;
      padding: 1rem;
    }
    @media (min-width: 768px) {
      .ct-popover__content__inner {
        padding: 1.5rem;
      }
    }

    .ct-popover__content-top,
    .ct-popover__content-bottom {
      font-size: var(--ct-typography-text-regular-font-size);
      line-height: var(--ct-typography-text-regular-line-height);
      font-family: var(--ct-typography-text-regular-font-name);
      font-weight: var(--ct-typography-text-regular-font-weight);
      letter-spacing: var(--ct-typography-text-regular-letter-spacing);
    }
    .ct-popover__content-top {
      margin-bottom: 1rem;
    }
    .ct-popover__content-bottom {
      margin-top: 1rem;
    }

    .ct-popover.ct-theme-light .ct-popover__content {
      background-color: var(--ct-popover-light-content-background-color);
      color: var(--ct-color-light-body);
    }
    .ct-popover.ct-theme-dark .ct-popover__content {
      background-color: var(--ct-popover-dark-content-background-color);
      color: var(--ct-color-dark-body);
    }
  `;

  @property({ type: String }) theme: PopoverTheme = 'light';

  /** Visible text of the popover's trigger link. Mirrors upstream `trigger.text`. */
  @property({ type: String, attribute: 'trigger-text' }) triggerText = '';
  /** Optional destination URL for the trigger. Mirrors upstream `trigger.url`. */
  @property({ type: String, attribute: 'trigger-url' }) triggerUrl?: string;
  /** Mirrors upstream `trigger.is_new_window`. */
  @property({ type: Boolean, attribute: 'trigger-new-window' }) triggerNewWindow = false;
  /** Mirrors upstream `trigger.is_external`. */
  @property({ type: Boolean, attribute: 'trigger-external' }) triggerExternal = false;

  /**
   * Group name for mutually-exclusive popovers - opening one closes every other `ct-popover`
   * sharing the same group name. Mirrors upstream `group`; implemented via the module-level
   * registry above rather than a Zag.js machine feature.
   */
  @property({ type: String }) group = '';

  /**
   * Trusted, already-sanitized HTML for the popover panel body. Mirrors upstream's default
   * `content` slot; rendered via `unsafeHTML` (same convention as `ct-paragraph`/`ct-table`).
   * Callers must not pass unsanitized user input.
   */
  @property({ type: String }) content = '';
  /** Trusted HTML rendered above `content`. Mirrors upstream's `content_top` slot. */
  @property({ type: String, attribute: 'content-top' }) contentTop = '';
  /** Trusted HTML rendered below `content`. Mirrors upstream's `content_bottom` slot. */
  @property({ type: String, attribute: 'content-bottom' }) contentBottom = '';

  /**
   * Renders the panel open on load instead of the default closed state. Not part of upstream
   * CivicTheme; added (same convention as `ct-tooltip`'s `open`) so the panel and its tokens
   * have a way to be demonstrated in a static Fractal preview/screenshot without simulating a
   * click. The popover remains a normal, uncontrolled, closeable disclosure afterward
   * (`defaultOpen`, not a fully controlled `open`).
   */
  @property({ type: Boolean }) open = false;

  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _popoverService?: MachineService<any>;

  connectedCallback() {
    super.connectedCallback();

    if (!this.id) {
      this.id = `ct-popover-${++instanceCount}`;
    }

    if (this.group) {
      registerGroupMember(this.group, this);
    }

    const props: Partial<ZagPopoverProps> & { id: string; getRootNode: () => ShadowRoot | Document } = {
      id: this.id,
      getRootNode: () => this.shadowRoot ?? document,
      defaultOpen: this.open,
      modal: false,
      portalled: false,
      positioning: {
        placement: 'bottom-start',
        flip: true,
        gutter: 16,
      },
      onOpenChange: (details: { open: boolean }) => {
        if (details.open && this.group) {
          closeOtherGroupMembers(this.group, this);
        }
      },
    };

    this._popoverService = createMachineService(machine, () => props, () => this.requestUpdate());
    this._popoverService.start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.group) {
      unregisterGroupMember(this.group, this);
    }
    this._popoverService?.stop();
  }

  /** Closes this popover. Used by group coordination (see `groupRegistry` above). */
  closePopover(): void {
    this._popoverService?.send({ type: 'CLOSE' });
  }

  render() {
    if (!this.content || !this._popoverService) {
      return nothing;
    }

    // `connect()` expects Zag's own internal `Service<PopoverSchema>` shape, which our
    // simplified MachineService doesn't structurally match even though this connect
    // implementation only reads send/context/prop/scope/computed (see accordion.ts/tooltip.ts
    // for the same cast).
    const api = connect(this._popoverService as unknown as Parameters<typeof connect>[0], domNormalizer);
    const triggerProps = api.getTriggerProps();
    const positionerProps = api.getPositionerProps();
    const contentProps = api.getContentProps();

    const classes = {
      'ct-popover': true,
      [`ct-theme-${this.theme}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)} data-component-name="popover">
        <ct-link
          theme=${this.theme}
          label=${this.triggerText}
          modifier-class="ct-popover__link"
          url=${ifDefined(this.triggerUrl)}
          ?new-window=${this.triggerNewWindow}
          ?external=${this.triggerExternal}
          id=${triggerProps.id}
          data-state=${ifDefined(triggerProps['data-state'] as string | undefined)}
          aria-haspopup=${ifDefined(triggerProps['aria-haspopup'] as string | undefined)}
          aria-expanded=${ifDefined(String(triggerProps['aria-expanded']))}
          aria-controls=${ifDefined(triggerProps['aria-controls'] as string | undefined)}
          @click=${triggerProps.onClick}
          @pointerdown=${triggerProps.onPointerDown}
        ></ct-link>
        <div
          class="ct-popover__positioner"
          id=${positionerProps.id}
          data-scope="popover"
          data-part="positioner"
          style=${styleMap(positionerProps.style as Record<string, string>)}
        >
          <!-- aria-labelledby is wired directly to the trigger's own id rather than relying on
               Zag's contentProps['aria-labelledby'], which is only set when a getTitleProps()
               title element is rendered - not used here, since content is arbitrary trusted
               HTML rather than a structured title/description pair. The trigger's own visible
               text is always a reasonable accessible name for the panel it discloses, and
               wiring it this way fixes axe's aria-dialog-name check. -->
          <div
            class="ct-popover__content"
            id=${ifDefined(contentProps.id as string | undefined)}
            data-scope="popover"
            data-part="content"
            role=${ifDefined(contentProps.role as string | undefined)}
            tabindex=${ifDefined(contentProps.tabIndex as unknown as string | undefined)}
            aria-labelledby=${triggerProps.id}
            ?hidden=${contentProps.hidden}
            data-state=${ifDefined(contentProps['data-state'] as string | undefined)}
          >
            <div class="ct-popover__content__inner">
              ${this.contentTop
                ? html`<div class="ct-popover__content-top">${unsafeHTML(this.contentTop)}</div>`
                : nothing}
              ${unsafeHTML(this.content)}
              ${this.contentBottom
                ? html`<div class="ct-popover__content-bottom">${unsafeHTML(this.contentBottom)}</div>`
                : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-popover': CtPopover;
  }
}
