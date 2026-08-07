import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { machine, connect } from '@zag-js/accordion';
import type { Props as AccordionProps } from '@zag-js/accordion';
import { createMachineService, type MachineService } from '../../../lib/zag/create-machine-service.js';
import { domNormalizer } from '../../../lib/zag/normalize-props.js';
import type { CtAccordionItem } from './accordion-item.js';
import './accordion-item.js';

export type AccordionTheme = 'light' | 'dark';
export type AccordionVerticalSpacing = 'top' | 'bottom' | 'both' | 'none';

let instanceCount = 0;

const chevronIcon = html`
  <svg class="ct-accordion__panels__panel__header__button__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3.5 5.5L8 10l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;

/**
 * A Generative UI-ready Accordion component based on CivicTheme, driven by a Zag.js state
 * machine for expand/collapse and keyboard navigation (WCAG 2.1.1 Keyboard, 4.1.2 Name/Role/Value).
 *
 * Panels are composed via `ct-accordion-item` light-DOM children rather than a JSON `panels`
 * prop, keeping this element's own attributes plain strings/booleans. All panel chrome
 * (header, trigger button, expand/collapse) renders in this element's shadow root; each
 * item's own children are projected in as the panel body through a per-panel named slot.
 */
@customElement('ct-accordion')
export class CtAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-accordion.ct-accordion--with-background {
      padding-left: var(--ct-accordion-space-horizontal);
      padding-right: var(--ct-accordion-space-horizontal);
    }
    @media (min-width: 992px) {
      .ct-accordion.ct-accordion--with-background {
        padding-left: var(--ct-accordion-space-horizontal-desktop);
        padding-right: var(--ct-accordion-space-horizontal-desktop);
      }
    }

    .ct-accordion.ct-vertical-spacing-inset--top {
      padding-top: var(--ct-accordion-space-horizontal);
    }
    .ct-accordion.ct-vertical-spacing-inset--bottom {
      padding-bottom: var(--ct-accordion-space-horizontal);
    }
    .ct-accordion.ct-vertical-spacing-inset--both {
      padding-top: var(--ct-accordion-space-horizontal);
      padding-bottom: var(--ct-accordion-space-horizontal);
    }

    .ct-accordion__panels {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .ct-accordion__panels__panel {
      position: relative;
      border: 0.0625rem solid;
      border-radius: var(--ct-accordion-item-border-radius);
      margin-bottom: 1rem;
    }
    .ct-accordion__panels__panel:last-child {
      margin-bottom: 0;
    }

    .ct-accordion__panels__panel::before {
      content: '';
      position: absolute;
      top: -0.0625rem;
      bottom: -0.0625rem;
      left: -0.0625rem;
      width: calc(var(--ct-stripe-size) + 0.0625rem);
      border-top-left-radius: var(--ct-accordion-item-border-radius);
      border-bottom-left-radius: var(--ct-accordion-item-border-radius);
      transition: width 0.25s;
      z-index: 1;
    }

    .ct-accordion__panels__panel__header {
      display: block;
      margin: 0;
      border-top-left-radius: var(--ct-accordion-header-border-radius);
      border-top-right-radius: var(--ct-accordion-header-border-radius);
    }

    .ct-accordion__panels__panel__header__button {
      font-size: var(--ct-typography-heading-6-font-size);
      line-height: var(--ct-typography-heading-6-line-height);
      font-family: var(--ct-typography-family-heading, sans-serif);
      font-weight: var(--ct-typography-heading-6-font-weight);
      letter-spacing: var(--ct-typography-heading-6-letter-spacing);
      appearance: button;
      border-radius: var(--ct-accordion-button-border-radius);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      text-align: left;
      margin: 0;
      padding: 1.5rem;
      width: 100%;
    }
    .ct-accordion__panels__panel__header__button[disabled] {
      cursor: not-allowed;
      opacity: 50%;
    }
    .ct-accordion__panels__panel[data-state='closed'] .ct-accordion__panels__panel__header__button {
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .ct-accordion__panels__panel__header__button__icon {
      flex: none;
      width: 1rem;
      height: 1rem;
      transition: transform 0.25s ease;
    }
    .ct-accordion__panels__panel[data-state='open'] .ct-accordion__panels__panel__header__button__icon {
      transform: rotate(180deg);
    }

    .ct-accordion__panels__panel__content {
      overflow: hidden;
    }
    .ct-accordion__panels__panel__content[hidden] {
      display: none;
    }

    .ct-accordion__panels__panel__content__inner {
      padding: 0 1.5rem 1.5rem;
    }

    /* Light theme */
    .ct-accordion.ct-theme-light {
      color: var(--ct-color-light-body);
    }
    .ct-accordion.ct-theme-light.ct-accordion--with-background {
      background-color: var(--ct-color-light-background);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel__header__button {
      background-color: var(--ct-color-light-background-light);
      color: var(--ct-color-light-heading);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel__header__button:focus-visible {
      outline-offset: var(--ct-accordion-outline-offset);
      outline-width: var(--ct-accordion-outline-width);
      outline-style: solid;
      outline-color: var(--ct-color-interaction-light-focus);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel__header__button__icon {
      color: var(--ct-color-light-interaction-background);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel {
      background-color: var(--ct-color-light-background-light);
      border-color: var(--ct-color-light-border-light);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel::before {
      background-color: var(--ct-color-light-highlight);
    }

    /* Dark theme */
    .ct-accordion.ct-theme-dark {
      color: var(--ct-color-dark-body);
    }
    .ct-accordion.ct-theme-dark.ct-accordion--with-background {
      background-color: var(--ct-color-dark-background-dark);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel__header__button {
      background-color: var(--ct-color-dark-background-light);
      color: var(--ct-color-dark-heading);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel__header__button:focus-visible {
      outline-offset: var(--ct-accordion-outline-offset);
      outline-width: var(--ct-accordion-outline-width);
      outline-style: solid;
      outline-color: var(--ct-color-interaction-dark-focus);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel__header__button__icon {
      color: var(--ct-color-dark-interaction-background);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel {
      background-color: var(--ct-color-dark-background-light);
      border-color: var(--ct-color-dark-border);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel::before {
      background-color: var(--ct-color-dark-highlight);
    }
  `;

  @property({ type: String }) theme: AccordionTheme = 'light';
  @property({ type: Boolean, attribute: 'expand-all' }) expandAll = false;
  // Boolean HTML attributes can only opt in (presence = true); a `multiple` prop defaulting
  // to true couldn't be turned off via markup. Default-false `single-open` avoids that.
  @property({ type: Boolean, attribute: 'single-open' }) singleOpen = false;
  @property({ type: Boolean, attribute: 'with-background' }) withBackground = false;
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: AccordionVerticalSpacing = 'none';
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  private _accordionService?: MachineService<any>;

  private _items(): CtAccordionItem[] {
    return Array.from(this.querySelectorAll(':scope > ct-accordion-item')) as CtAccordionItem[];
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.id) {
      this.id = `ct-accordion-${++instanceCount}`;
    }

    const items = this._items();
    const defaultValue = items
      .map((item, index) => ({ item, value: `panel-${index}` }))
      .filter(({ item }) => this.expandAll || item.expanded)
      .map(({ value }) => value);

    const props: Partial<AccordionProps> & { id: string; getRootNode: () => ShadowRoot | Document } = {
      id: this.id,
      getRootNode: () => this.shadowRoot ?? document,
      multiple: !this.singleOpen,
      collapsible: true,
      defaultValue,
    };

    this._accordionService = createMachineService(machine, () => props, () => this.requestUpdate());
    this._accordionService.start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._accordionService?.stop();
  }

  render() {
    const items = this._items();
    items.forEach((item, index) => {
      item.slot = `panel-${index}`;
    });

    if (!this._accordionService) {
      return nothing;
    }

    // `connect()` expects Zag's own internal `Service<AccordionSchema>` shape (a full
    // Bindable for `state`, etc.) which our simplified MachineService doesn't structurally
    // match, even though this connect implementation only reads send/context/prop/scope/computed.
    const api = connect(this._accordionService as unknown as Parameters<typeof connect>[0], domNormalizer);
    const rootProps = api.getRootProps();

    const classes = {
      'ct-accordion': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-accordion--with-background': this.withBackground,
      [`ct-vertical-spacing-inset--${this.verticalSpacing}`]: this.verticalSpacing !== 'none',
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <div class=${classMap(classes)} id=${rootProps.id} data-orientation=${rootProps['data-orientation']}>
        <div class="ct-accordion__content">
          <ul class="ct-accordion__panels">
            ${items.map((item, index) => this.renderPanel(api, item, `panel-${index}`))}
          </ul>
        </div>
      </div>
    `;
  }

  private renderPanel(api: ReturnType<typeof connect>, item: CtAccordionItem, value: string) {
    const itemProps = api.getItemProps({ value, disabled: item.disabled });
    const triggerProps = api.getItemTriggerProps({ value, disabled: item.disabled });
    const contentProps = api.getItemContentProps({ value, disabled: item.disabled });

    return html`
      <li
        class="ct-accordion__panels__panel"
        id=${itemProps.id}
        data-state=${itemProps['data-state']}
      >
        <div class="ct-accordion__panels__panel__header">
          <button
            type="button"
            class="ct-accordion__panels__panel__header__button"
            id=${triggerProps.id}
            aria-controls=${triggerProps['aria-controls']}
            aria-expanded=${triggerProps['aria-expanded']}
            data-controls=${triggerProps['data-controls']}
            data-ownedby=${triggerProps['data-ownedby']}
            ?disabled=${triggerProps.disabled}
            @click=${triggerProps.onClick}
            @focus=${triggerProps.onFocus}
            @blur=${triggerProps.onBlur}
            @keydown=${triggerProps.onKeyDown}
          >
            <span>${item.heading}</span>
            ${chevronIcon}
          </button>
        </div>
        <div
          class="ct-accordion__panels__panel__content"
          id=${contentProps.id}
          role="region"
          aria-labelledby=${contentProps['aria-labelledby']}
          ?hidden=${contentProps.hidden}
        >
          <div class="ct-accordion__panels__panel__content__inner">
            <slot name=${value}></slot>
          </div>
        </div>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-accordion': CtAccordion;
  }
}
