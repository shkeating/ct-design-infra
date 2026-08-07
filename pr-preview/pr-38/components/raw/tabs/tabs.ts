import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { machine, connect } from '@zag-js/tabs';
import type { Props as TabsProps } from '@zag-js/tabs';
import { BreakpointL, BreakpointM } from '@ct-infra/tokens';
import { createMachineService, type MachineService } from '../../../lib/zag/create-machine-service.js';
import { domNormalizer } from '../../../lib/zag/normalize-props.js';
import type { CtTabsItem } from './tabs-item.js';
import './tabs-item.js';

export type TabsTheme = 'light' | 'dark';
export type TabsVerticalSpacing = 'top' | 'bottom' | 'both' | 'none';

let instanceCount = 0;

/**
 * A Generative UI-ready Tabs component based on CivicTheme, driven by a Zag.js state machine
 * (`@zag-js/tabs`) for tab selection and keyboard navigation (arrow keys move focus between
 * tabs, Home/End jump to the first/last, Enter/Space activates the focused tab) — the same
 * Zag-adapter-reuse pattern `ct-accordion`/`ct-popover` established (WCAG 2.1.1 Keyboard,
 * 4.1.2 Name/Role/Value).
 *
 * Panels are composed via `ct-tabs-item` light-DOM children rather than a JSON `panels`/`links`
 * prop, keeping this element's own attributes plain strings/booleans (array/object props aren't
 * allowed) — same shape as `ct-accordion`/`ct-accordion-item`. All tablist/tab/tabpanel chrome
 * renders in this element's own shadow root; each item's own children are projected in as the
 * panel body through a per-panel named slot.
 *
 * Upstream `tabs.twig` composes `civictheme:item-list` (to lay out the row of tab triggers) and
 * `civictheme:link` (styling for each trigger, since a bare anchor already gets `.ct-link`'s
 * look). This port composes **neither** for the tablist row/triggers, even though upstream
 * does — two separate, documented deviations, each flagged per this port's non-interactive
 * fallback rules:
 *
 * - `ct-item-list` was tried first for the tablist row (a plausible, low-risk-looking reuse,
 *   since item-list has no interactive semantics of its own). It was reverted after the unit
 *   test's axe accessibility check caught a real, concrete violation: item-list renders its
 *   items inside its own `<ul>`/`<li>` (each with their own implicit ARIA `list`/`listitem`
 *   roles) in a separate shadow root. The ARIA tablist pattern requires its `role="tab"`
 *   elements to be *direct* accessible-tree children of the `role="tablist"` node (axe's
 *   `aria-required-children`/`aria-required-parent` rules enforce exactly this) — the
 *   intervening `<ul>`/`<li>` layer breaks that direct relationship regardless of which element
 *   `role="tablist"` is placed on. This is a structural incompatibility, not a styling
 *   preference, so the tablist row is hand-rendered as a plain `<div role="tablist">` directly
 *   wrapping the trigger `<button>`s below (with the same flex-wrap layout item-list would have
 *   provided — moot anyway, since upstream's own `civictheme:item-list` call here passes
 *   `no_gap: true`, meaning no visible gap styling was actually in play to lose).
 * - Zag's `getTriggerProps()` returns props shaped for a native `<button>` (`role="tab"`,
 *   a per-instance roving `tabIndex` of 0 only on the selected tab, `-1` on the rest, so arrow
 *   keys — not Tab — move between them) plus `aria-selected`/`data-selected`/`data-disabled`.
 *   `ct-link` renders its own `<a>` in a separate shadow root and, unlike its existing
 *   `aria-expanded`/`aria-haspopup`/`aria-controls`/`aria-label` passthroughs (added for
 *   `ct-popover`), has no `role`/`aria-selected`/`tabindex` override hook — composing it here
 *   would mean extending a shared atom with tab-specific ARIA plumbing it has no other consumer
 *   for, versus `ct-accordion`'s panel button and `ct-tooltip`'s trigger button, which already
 *   establish the precedent of hand-rendering the native interactive element directly whenever
 *   Zag's own contract doesn't map cleanly onto a shared atom's existing surface. Upstream's own
 *   reason for reaching for `civictheme:link` is shared CSS (`.ct-link`'s typography/padding/
 *   border look), not real anchor navigation — `tabs.js`'s vanilla behavior always calls
 *   `e.preventDefault()` on click, so the `href="#panel-id"` never actually navigates. This port
 *   reproduces the identical visual result by porting the same `.ct-tabs .ct-tabs__links
 *   .ct-link` CSS rule-for-rule onto this component's own `.ct-tabs__trigger` class (scoped to
 *   this shadow root, so the class name is just an identifier — it does not depend on the
 *   `ct-link` element existing).
 */
@customElement('ct-tabs')
export class CtTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-tabs {
      box-sizing: border-box;
    }

    /* The tablist row (upstream: .ct-tabs .ct-tabs__links, rendered there via
       civictheme:item-list with no_gap: true) is a plain flex row, hand-rendered directly
       rather than composing ct-item-list — see class doc comment for why. */
    .ct-tabs__links {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      list-style: none;
      border-bottom-style: solid;
      border-bottom-width: 0.0625rem;
    }

    .ct-tabs__trigger {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      appearance: button;
      margin: 0 0 -0.0625rem;
      outline-offset: -0.1875rem;
      display: block;
      padding: 0.5rem 1rem;
      border-radius: var(--ct-tabs-link-border-radius) var(--ct-tabs-link-border-radius) 0 0;
      border: solid 0.0625rem;
      background: none;
      cursor: pointer;
      text-decoration: none;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-tabs__trigger {
        padding: 0.75rem 1rem;
      }
    }
    .ct-tabs__trigger[data-disabled] {
      cursor: not-allowed;
      opacity: 50%;
    }
    .ct-tabs__trigger:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      border-radius: var(--ct-outline-border-radius);
    }

    .ct-tabs__panels {
      margin-top: 1.5rem;
    }

    .ct-tabs__panels__panel[hidden] {
      display: none;
    }

    /* Vertical spacing utility (mirrors CivicTheme's shared .ct-vertical-spacing-inset--*
       utility classes from 00-base/spacing — see tabs.json's vertical-spacing token
       description for why the base value is computed rather than reconciled against a
       resolved --ct-tabs-* variable; same approach as ct-iframe/ct-basic-content). */
    .ct-tabs.ct-vertical-spacing-inset--top {
      padding-top: var(--ct-tabs-vertical-spacing);
    }
    .ct-tabs.ct-vertical-spacing-inset--bottom {
      padding-bottom: var(--ct-tabs-vertical-spacing);
    }
    .ct-tabs.ct-vertical-spacing-inset--both {
      padding-top: var(--ct-tabs-vertical-spacing);
      padding-bottom: var(--ct-tabs-vertical-spacing);
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-tabs.ct-vertical-spacing-inset--top {
        padding-top: calc(var(--ct-tabs-vertical-spacing) * 2);
      }
      .ct-tabs.ct-vertical-spacing-inset--bottom {
        padding-bottom: calc(var(--ct-tabs-vertical-spacing) * 2);
      }
      .ct-tabs.ct-vertical-spacing-inset--both {
        padding-top: calc(var(--ct-tabs-vertical-spacing) * 2);
        padding-bottom: calc(var(--ct-tabs-vertical-spacing) * 2);
      }
    }

    /* Light theme */
    .ct-tabs.ct-theme-light .ct-tabs__links {
      border-bottom-color: var(--ct-tabs-light-links-stripe-border-color);
    }
    .ct-tabs.ct-theme-light .ct-tabs__trigger {
      background-color: var(--ct-tabs-light-links-background-color);
      border-color: var(--ct-tabs-light-links-border-color);
      border-bottom-color: var(--ct-tabs-light-links-stripe-border-color);
      color: var(--ct-color-light-body);
    }
    .ct-tabs.ct-theme-light .ct-tabs__trigger[data-selected] {
      background-color: var(--ct-tabs-light-links-active-background-color);
      border-color: var(--ct-tabs-light-links-active-border-color);
      border-bottom-color: var(--ct-tabs-light-links-stripe-border-color);
    }
    .ct-tabs.ct-theme-light .ct-tabs__trigger:focus-visible {
      outline-color: var(--ct-outline-light);
    }
    .ct-tabs.ct-theme-light .ct-tabs__panels {
      background-color: var(--ct-tabs-light-panel-background-color);
      border-color: var(--ct-tabs-light-panel-border-color);
      color: var(--ct-color-light-body);
    }

    /* Dark theme */
    .ct-tabs.ct-theme-dark .ct-tabs__links {
      border-bottom-color: var(--ct-tabs-dark-links-stripe-border-color);
    }
    .ct-tabs.ct-theme-dark .ct-tabs__trigger {
      background-color: var(--ct-tabs-dark-links-background-color);
      border-color: var(--ct-tabs-dark-links-border-color);
      border-bottom-color: var(--ct-tabs-dark-links-stripe-border-color);
      color: var(--ct-color-dark-body);
    }
    .ct-tabs.ct-theme-dark .ct-tabs__trigger[data-selected] {
      background-color: var(--ct-tabs-dark-links-active-background-color);
      border-color: var(--ct-tabs-dark-links-active-border-color);
      border-bottom-color: var(--ct-tabs-dark-links-stripe-border-color);
    }
    .ct-tabs.ct-theme-dark .ct-tabs__trigger:focus-visible {
      outline-color: var(--ct-outline-dark);
    }
    .ct-tabs.ct-theme-dark .ct-tabs__panels {
      background-color: var(--ct-tabs-dark-panel-background-color);
      border-color: var(--ct-tabs-dark-panel-border-color);
      color: var(--ct-color-dark-body);
    }
  `;

  @property({ type: String }) theme: TabsTheme = 'light';
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: TabsVerticalSpacing = 'none';
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _tabsService?: MachineService<any>;

  private _items(): CtTabsItem[] {
    return Array.from(this.querySelectorAll(':scope > ct-tabs-item')) as CtTabsItem[];
  }

  private _value(item: CtTabsItem, index: number): string {
    return item.panelId || `${this.id}-panel-${index}`;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.id) {
      this.id = `ct-tabs-${++instanceCount}`;
    }

    const items = this._items();
    const selectedItem = items.find((item) => item.selected) ?? items[0];
    const defaultValue = selectedItem ? this._value(selectedItem, items.indexOf(selectedItem)) : null;

    const props: Partial<TabsProps> & { id: string; getRootNode: () => ShadowRoot | Document } = {
      id: this.id,
      getRootNode: () => this.shadowRoot ?? document,
      orientation: 'horizontal',
      // CivicTheme's own vanilla-JS tabs.js only ever binds a click listener to each tab
      // trigger (no focus listener) — selection changes only on click/Enter/Space activation,
      // never merely by arrow-key-driven focus. That is exactly Zag's "manual" activation mode.
      activationMode: 'manual',
      defaultValue,
      // Mirrors upstream tabs.twig's own id scheme (`link_id = panel.id ~ '-tab'`, panel div
      // `id="{{ panel.id }}"`) so ids stay stable/predictable for implementers who supply
      // their own `panel-id`.
      ids: {
        trigger: (value: string) => `${value}-tab`,
        content: (value: string) => value,
      },
    };

    this._tabsService = createMachineService(machine, () => props, () => this.requestUpdate());
    this._tabsService.start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._tabsService?.stop();
  }

  render() {
    const items = this._items();
    items.forEach((item, index) => {
      item.slot = `panel-${index}`;
    });

    if (!this._tabsService || items.length === 0) {
      return nothing;
    }

    // `connect()` expects Zag's own internal `Service<TabsSchema>` shape (a full Bindable for
    // `state`, etc.) which our simplified MachineService doesn't structurally match, even
    // though this connect implementation only reads send/context/prop/scope/computed (same
    // cast as accordion.ts/popover.ts).
    const api = connect(this._tabsService as unknown as Parameters<typeof connect>[0], domNormalizer);
    const rootProps = api.getRootProps();
    const listProps = api.getListProps();

    const classes = {
      'ct-tabs': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-vertical-spacing-inset--${this.verticalSpacing}`]: this.verticalSpacing !== 'none',
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)} id=${rootProps.id} data-orientation=${ifDefined(rootProps['data-orientation'] as string | undefined)}>
        <div
          class="ct-tabs__links"
          id=${listProps.id}
          role="tablist"
          dir=${ifDefined(listProps.dir as string | undefined)}
          aria-orientation=${ifDefined(listProps['aria-orientation'] as string | undefined)}
          data-orientation=${ifDefined(listProps['data-orientation'] as string | undefined)}
          aria-label=${ifDefined(listProps['aria-label'] as string | undefined)}
          @keydown=${listProps.onKeyDown}
        >
          ${items.map((item, index) => this.renderTrigger(api, item, index))}
        </div>

        <div class="ct-tabs__panels">${items.map((item, index) => this.renderPanel(api, item, index))}</div>
      </div>
    `;
  }

  private renderTrigger(api: ReturnType<typeof connect>, item: CtTabsItem, index: number) {
    const value = this._value(item, index);
    const triggerProps = api.getTriggerProps({ value, disabled: item.disabled });

    return html`
      <button
        type="button"
        class="ct-tabs__trigger"
        id=${triggerProps.id}
        role="tab"
        ?disabled=${triggerProps.disabled}
        data-value=${value}
        data-orientation=${ifDefined(triggerProps['data-orientation'] as string | undefined)}
        data-disabled=${ifDefined(triggerProps['data-disabled'] as string | undefined)}
        aria-disabled=${ifDefined(triggerProps['aria-disabled'] as unknown as string | undefined)}
        aria-selected=${triggerProps['aria-selected'] as unknown as string}
        data-selected=${ifDefined(triggerProps['data-selected'] as string | undefined)}
        data-focus=${ifDefined(triggerProps['data-focus'] as string | undefined)}
        aria-controls=${ifDefined(triggerProps['aria-controls'] as string | undefined)}
        data-ownedby=${triggerProps['data-ownedby']}
        tabindex=${triggerProps.tabIndex as unknown as string}
        @focus=${triggerProps.onFocus}
        @blur=${triggerProps.onBlur}
        @click=${triggerProps.onClick}
      >
        ${item.heading}
      </button>
    `;
  }

  private renderPanel(api: ReturnType<typeof connect>, item: CtTabsItem, index: number) {
    const value = this._value(item, index);
    const contentProps = api.getContentProps({ value });

    return html`
      <div
        class="ct-tabs__panels__panel"
        id=${contentProps.id}
        role="tabpanel"
        aria-labelledby=${contentProps['aria-labelledby']}
        data-orientation=${ifDefined(contentProps['data-orientation'] as string | undefined)}
        tabindex=${contentProps.tabIndex as unknown as string}
        ?hidden=${contentProps.hidden}
      >
        <slot name=${`panel-${index}`}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-tabs': CtTabs;
  }
}
