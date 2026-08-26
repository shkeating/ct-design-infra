import { LitElement, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../01-atoms/label/label.js';
import '../../01-atoms/field-description/field-description.js';
import '../../01-atoms/field-message/field-message.js';
import '../../01-atoms/textfield/textfield.js';
import '../../01-atoms/textarea/textarea.js';
import '../../01-atoms/select/select.js';
import '../../01-atoms/checkbox/checkbox.js';
import '../../01-atoms/radio/radio.js';
import '../../01-atoms/input/input.js';
import '../../00-base/item-list/item-list.js';
import type { CtSelectOption } from '../../01-atoms/select/select-option.js';
import type { CtSelectOptgroup } from '../../01-atoms/select/select-optgroup.js';
import type { CtFieldOption } from './field-option.js';
import './field-option.js';

export type FieldTheme = 'light' | 'dark';
export type FieldType =
  | 'textfield'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'hidden'
  | 'color'
  | 'date'
  | 'email'
  | 'file'
  | 'month'
  | 'number'
  | 'password'
  | 'range'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'week'
  | 'other';
export type FieldTitleDisplay = 'visible' | 'invisible' | 'hidden';
export type FieldTitleSize = 'extra-small' | 'small' | 'regular' | 'large' | 'extra-large';
export type FieldOrientation = 'vertical' | 'horizontal';

const VALID_TITLE_DISPLAYS: FieldTitleDisplay[] = ['visible', 'invisible', 'hidden'];
const VALID_TITLE_SIZES: FieldTitleSize[] = ['extra-small', 'small', 'regular', 'large', 'extra-large'];
const GROUP_TYPES: FieldType[] = ['checkbox', 'radio'];

let instanceCount = 0;

/**
 * A Generative UI-ready Field component based on CivicTheme — the main entry point for
 * building a form field with its title/label, optional description, a single control (or a
 * repeatable checkbox/radio option group), a validation/status message, and prefix/suffix
 * content, mirroring upstream `field.twig`'s composition of `civictheme:label`,
 * `civictheme:field-description`, `civictheme:field-message`, `civictheme:item-list`, and
 * whichever control component `type` selects (`civictheme:textfield`/`textarea`/`select`/
 * `checkbox`/`radio`/`input`) — all of which are reused here as already-ported `ct-*` atoms
 * rather than reimplemented.
 *
 * **Composition, not a new control.** `type` selects which already-ported atom renders the
 * actual control:
 * - `textfield` -> `ct-textfield`, `textarea` -> `ct-textarea`, `select` -> `ct-select`
 *   (composed with `ct-select-option`/`ct-select-optgroup` light-DOM children, exactly as an
 *   implementer would use `ct-select` directly).
 * - `checkbox`/`radio` -> one or more `ct-checkbox`/`ct-radio` elements, wrapped (per upstream)
 *   in a native `<fieldset>` + `<legend>` and a composed `ct-item-list` for consistent gap
 *   spacing between options — reusing `ct-item-list` rather than hand-rolling the layout.
 *   Repeatable options are supplied as light-DOM `ct-field-option` children (this component's
 *   one genuinely new element — see below); with none supplied, a single control is rendered
 *   from this element's own `name`/`value`/`id`/`label`/`checked`.
 * - Anything else (`color`, `date`, `email`, `number`, `password`, etc., and `hidden`) falls
 *   through to `ct-input` with `type` passed straight through, mirroring upstream's own
 *   catch-all `{% else %}` branch.
 *
 * **The cross-shadow-root label association gap does NOT go away just because the label and
 * control are now composed together in one molecule.** `ct-select`/`ct-textfield`/
 * `ct-textarea`'s own docs already note that an *external* `<label for>` can't reach a control
 * rendered inside a separate custom element's shadow root. Composing `ct-label` and (say)
 * `ct-textfield` as sibling children of `ct-field`'s own shadow root does not fix this: each
 * still renders its real `<label>`/`<input>` into ITS OWN separate nested shadow root one level
 * further down, so the native `for`/`id` match still can't cross that boundary — building the
 * molecule doesn't collapse the two subtrees into one. This component applies the exact same
 * two-part mitigation already established by `ct-checkbox`/`ct-radio`/`ct-select`/
 * `ct-textfield`: pass `for`/`id` through anyway (harmless, and correct if a future
 * cross-root association mechanism ships), AND mirror the visible title/label text directly
 * onto the control's own `aria-label` so the accessible name is always correct today.
 *
 * **`no-margin` generalized.** `ct-label` already exposes `no-margin` for the checkbox/radio
 * "beside a control" composition, where the outer component (not `ct-label` itself) owns the
 * gap via its own layout. This component hits the same shape for its OWN "title stacked above
 * a control" case: `ct-field`'s stylesheet reproduces upstream's generic
 * `.ct-field > *:not(:last-child)` gap rule directly on the title/legend host element (which,
 * being a sibling in the same shadow tree, a host-level selector CAN reach), so every `ct-label`
 * this component renders is given `no-margin` to avoid doubling that gap with `ct-label`'s own
 * internal margin. `ct-field-description` has no equivalent escape hatch, so the reverse
 * applies there: this component's own generic gap rule is scoped to exclude
 * `ct-field-description`, deferring to its existing internal margin instead (see the stylesheet
 * comment above `.ct-field__wrapper > *:not(:last-child)`).
 *
 * **Not built on `ct-fieldset`.** `02-molecules/field`'s own `<fieldset>` (for a single field's
 * checkbox/radio option group) is deliberately a plain native element, not the separate
 * `ct-fieldset` molecule (which groups multiple whole `ct-field`s under one shared legend) —
 * this mirrors upstream's own twig, which never delegates to `fieldset.twig` here either. The
 * same nested-shadow-legend mitigation `ct-fieldset` already established (mirroring the legend
 * text onto the native `<fieldset>`'s own `aria-label`, since the HTML fieldset-accessible-name
 * algorithm requires a literal DOM child `<legend>`, which a `ct-label`-rendered one two shadow
 * levels down does not satisfy) is reused here for the same reason.
 *
 * **New element: `ct-field-option`.** Array/object props aren't allowed (attributes stay plain
 * strings/booleans), so upstream's `control` array (repeatable checkbox/radio items) is
 * expressed the same way `ct-accordion-item`/`ct-select-option` express their own repeatable
 * data: a light-DOM child element (`label`/`value`/`id`/`checked`/`disabled`) that carries no
 * visual output of its own. `select`'s options reuse the *existing* `ct-select-option`/
 * `ct-select-optgroup` elements directly (no new element needed there).
 *
 * **Deliberate deviations from upstream, flagged per `docs/parallel-porting.md`:**
 * - A field-level `checked` property is exposed for the single (non-grouped) checkbox/radio
 *   case. Upstream's own `control` synthesis hardcodes `is_checked: false` for the single
 *   default control with no way to override it at the top-level prop; this is a documented
 *   ergonomic addition for the common "single opt-in checkbox" pattern (e.g. "I agree to the
 *   terms"), not present upstream.
 * - Upstream's Storybook `argTypes` lists a `select_multiple` type value, but `field.twig`
 *   itself never branches on it (only `type == 'select'` is checked) — treated as a Storybook-
 *   only artifact and not implemented as a distinct type. Multi-select is instead exposed as a
 *   boolean `is-multiple` property forwarded to `ct-select`'s own `multiple`.
 * - Upstream's `description` fallback-to-error-text branch (`{% if not description and
 *   is_invalid %}`) is unreachable dead code: the enclosing `{% if (description) ... %}` guard
 *   already requires `description` to be non-empty before that inner check can run. Not
 *   replicated; `description` is shown only when explicitly provided, matching the outer guard
 *   that actually governs visibility.
 * - `connectedCallback` adds a `ct-field` class to this element's own host (in addition to the
 *   identical class its internal template applies to its shadow-root wrapper div), completing
 *   the forward-compatibility hook `ct-fieldset` left for this component: its stylesheet already
 *   has a `::slotted(.ct-field:not(:last-child))` rule, but `::slotted()` only matches a class on
 *   the slotted element itself, not one applied inside that element's own shadow root — without
 *   this, a `ct-field` slotted into a `ct-fieldset` would never actually receive the 2rem gap
 *   `ct-fieldset` already anticipated for it.
 */
@customElement('ct-field')
export class CtField extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-field {
      width: 100%;
      box-sizing: border-box;
    }

    .ct-field.ct-field--checkbox .ct-field__wrapper,
    .ct-field.ct-field--radio .ct-field__wrapper {
      border: none;
      padding: 0;
      margin: 0;
    }

    /* Generic vertical gap between this component's own top-level chrome (title, wrapper) and
       between the wrapper's own children (legend, description, prefix, control, suffix,
       message) - mirrors upstream's ".ct-field > *:not(:last-child), .ct-field__wrapper >
       *:not(:last-child)" rule verbatim. Scoped off ct-field-description below since that atom
       already carries the identical margin internally (see class doc). */
    .ct-field > *:not(:last-child),
    .ct-field__wrapper > *:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    .ct-field__wrapper > ct-field-description:not(:last-child),
    .ct-field > ct-field-description:not(:last-child) {
      margin-bottom: 0;
    }

    .ct-field ct-item-list {
      display: block;
    }

    .ct-field.ct-field--horizontal {
      display: flex;
      flex-flow: row;
      align-items: start;
      column-gap: 0.5rem;
    }
    .ct-field.ct-field--horizontal .ct-field__title-el {
      flex: 0 1 auto;
      min-width: var(--ct-field-horizontal-label-min-width);
      max-width: var(--ct-field-horizontal-label-max-width);
      margin-top: 0.9375rem;
    }
    /* Upstream also zeroes this margin-top when the horizontal field's rendered control carries
       a native "multiple" attribute (".ct-field--select[multiple] .ct-field__title"). Our
       equivalent is the "ct-field--multiple" modifier class below rather than an attribute
       selector chain, since here "multiple" lives on the composed ct-select's own host element
       one level down, not on this ".ct-field" element itself. */
    .ct-field.ct-field--horizontal.ct-field--radio .ct-field__title-el,
    .ct-field.ct-field--horizontal.ct-field--checkbox .ct-field__title-el,
    .ct-field.ct-field--horizontal.ct-field--select.ct-field--multiple .ct-field__title-el {
      margin-top: 0;
    }
    .ct-field.ct-field--horizontal .ct-field__wrapper {
      flex: 1 0 0;
      display: flex;
      flex-flow: column;
    }
    .ct-field.ct-field--horizontal .ct-field__control {
      order: 1;
    }
    .ct-field.ct-field--horizontal .ct-field__description {
      order: 2;
    }
    .ct-field.ct-field--horizontal .ct-field__message {
      order: 3;
    }

    .ct-field__prefix,
    .ct-field__suffix {
      display: block;
    }

    .ct-visually-hidden {
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
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: FieldTheme = 'light';

  /** Control type — selects which composed atom renders the field (see class doc). */
  @property({ type: String }) type: FieldType = 'textfield';

  /** Field title, rendered above the control (or as a `<legend>` for checkbox/radio groups). */
  @property({ type: String }) title = '';

  /** How to display the title: visible, invisible (visually hidden but announced), or hidden entirely. */
  @property({ type: String, attribute: 'title-display' }) titleDisplay: FieldTitleDisplay = 'visible';

  /** Title size. */
  @property({ type: String, attribute: 'title-size' }) titleSize: FieldTitleSize = 'regular';

  /**
   * Control label — only meaningful for a single (non-grouped) checkbox/radio, whose visible
   * caption is rendered beside the control rather than above it as `title` is. Falls back to
   * `title` for the accessible-name mirroring described in the class doc when unset.
   */
  @property({ type: String }) label = '';

  /** Description text, rendered via a composed `ct-field-description`. */
  @property({ type: String }) description = '';

  /** DOM `name` — required. Shared across every rendered control, including grouped checkbox/radio options. */
  @property({ type: String }) name = '';

  /** DOM `value`, for the single (non-grouped) control case. */
  @property({ type: String }) value = '';

  /** DOM `id`. Auto-generated when omitted (see `connectedCallback`), since checkbox/radio require a non-empty id to render at all. */
  @property({ type: String, reflect: true }) override id = '';

  /** Whether the control (and its group, if any) is in an invalid state. */
  @property({ type: Boolean, attribute: 'is-invalid' }) isInvalid = false;

  /** Whether the control (and its group, if any) is disabled. */
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;

  /** Whether the control (and its group, if any) is required. */
  @property({ type: Boolean, attribute: 'is-required' }) isRequired = false;

  /** Text shown within the title/legend when `is-required` is set. */
  @property({ type: String, attribute: 'required-text' }) requiredText = '';

  /** Layout orientation: title above the control (vertical) or beside it (horizontal). */
  @property({ type: String }) orientation: FieldOrientation = 'vertical';

  /** Whether a checkbox/radio option group lays its items out inline (horizontally) rather than stacked. */
  @property({ type: Boolean, attribute: 'is-inline' }) isInline = false;

  /** Placeholder text, for textfield/textarea/input-passthrough control types. */
  @property({ type: String }) placeholder = '';

  /**
   * Whether the composed `ct-select` allows multiple selections. See the class doc for why
   * this replaces upstream Storybook's unused `select_multiple` type value.
   */
  @property({ type: Boolean, attribute: 'is-multiple' }) isMultiple = false;

  /**
   * Whether the single (non-grouped) checkbox/radio control starts checked. See the class doc:
   * upstream's own control synthesis has no equivalent top-level override for this case.
   */
  @property({ type: Boolean }) checked = false;

  /** Validation/status message content, rendered via a composed `ct-field-message`. Shown automatically (with a generic fallback) when `is-invalid` is set even if this is empty. */
  @property({ type: String }) message = '';

  /** Trusted HTML rendered before the control. Callers must sanitize this HTML before passing it. */
  @property({ type: String }) prefix = '';

  /** Trusted HTML rendered after the control. Callers must sanitize this HTML before passing it. */
  @property({ type: String }) suffix = '';

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  connectedCallback() {
    super.connectedCallback();
    if (!this.id) {
      this.id = `ct-field-${++instanceCount}`;
    }
    // ct-fieldset's own stylesheet already anticipates this exact host class (see its class
    // doc's "forward-compatible" note): `.ct-fieldset__fields ::slotted(.ct-field:not(:last-child))`
    // gives adjacent fields upstream's 2rem gap instead of the 1rem default, but `::slotted()`
    // only matches a class on the slotted element itself, not one rendered inside that element's
    // own shadow root — the `.ct-field` class this component's template applies to its internal
    // wrapper div isn't visible to a `ct-fieldset` hosting this element in its default slot. Add
    // it to the host too so that integration actually activates.
    this.classList.add('ct-field');
  }

  private _fieldOptions(): CtFieldOption[] {
    return Array.from(this.querySelectorAll(':scope > ct-field-option')) as CtFieldOption[];
  }

  private _selectChildren(): (CtSelectOption | CtSelectOptgroup)[] {
    return Array.from(this.querySelectorAll(':scope > ct-select-option, :scope > ct-select-optgroup')) as (
      | CtSelectOption
      | CtSelectOptgroup
    )[];
  }

  private renderSelectChild(child: CtSelectOption | CtSelectOptgroup) {
    if (child.tagName === 'CT-SELECT-OPTGROUP') {
      const group = child as CtSelectOptgroup;
      const groupOptions = Array.from(group.querySelectorAll(':scope > ct-select-option')) as CtSelectOption[];
      return html`
        <ct-select-optgroup label=${group.label} ?disabled=${group.disabled}>
          ${groupOptions.map(
            (option) =>
              html`<ct-select-option
                label=${option.label}
                value=${option.value}
                ?selected=${option.selected}
                ?disabled=${option.disabled}
              ></ct-select-option>`,
          )}
        </ct-select-optgroup>
      `;
    }
    const option = child as CtSelectOption;
    return html`<ct-select-option
      label=${option.label}
      value=${option.value}
      ?selected=${option.selected}
      ?disabled=${option.disabled}
    ></ct-select-option>`;
  }

  render() {
    // Mirrors upstream field.twig's `{% if control[0].name is defined %}` guard, and every
    // composed control atom's own `{% if name is not empty %}`-style guard.
    if (!this.name) {
      return nothing;
    }

    const type = this.type || 'textfield';
    const isGroup = GROUP_TYPES.includes(type);
    const isHidden = type === 'hidden';
    const orientation: FieldOrientation = this.orientation === 'horizontal' ? 'horizontal' : 'vertical';
    const titleDisplay: FieldTitleDisplay = VALID_TITLE_DISPLAYS.includes(this.titleDisplay)
      ? this.titleDisplay
      : 'visible';
    const titleSize: FieldTitleSize = VALID_TITLE_SIZES.includes(this.titleSize) ? this.titleSize : 'regular';

    const classes = {
      'ct-field': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-field--${type}`]: true,
      [`ct-field--${orientation}`]: true,
      'ct-field--multiple': type === 'select' && this.isMultiple,
      'ct-field--required': this.isRequired,
      'ct-field--disabled': this.isDisabled,
      'ct-field--invalid': this.isInvalid,
      [this.modifierClass]: !!this.modifierClass,
    };

    const showOuterTitle = !!this.title && titleDisplay !== 'hidden' && !isGroup && !isHidden;
    const showLegend = !!this.title && titleDisplay !== 'hidden' && isGroup;
    const showDescription = !!this.description && !isHidden;
    const showMessage = (!!this.message || this.isInvalid) && !isHidden;
    const showPrefix = !!this.prefix && !isHidden;
    const showSuffix = !!this.suffix && !isHidden;

    // The title text used for the accessible-name mirroring described in the class doc: the
    // group legend / stacked-above label uses `title`, falling back to `label` (matches
    // upstream's own `label is not empty ? label : title` for the non-group case).
    const accessibleName = this.title || this.label || undefined;

    const titleClasses = {
      'ct-field__title-el': true,
      'ct-visually-hidden': titleDisplay === 'invisible',
    };

    const messageContent =
      this.message || (this.isInvalid ? `Field "${this.title || this.label || this.name}" has an error.` : '');

    const wrapperTag = unsafeStatic(isGroup ? 'fieldset' : 'div');

    return html`
      <div class=${classMap(classes)} data-component-name="field">
        ${showOuterTitle
          ? html`<ct-label
              class=${classMap(titleClasses)}
              theme=${this.theme}
              content=${this.title}
              for=${ifDefined(this.id || undefined)}
              size=${titleSize}
              ?required=${this.isRequired}
              required-text=${ifDefined(this.requiredText || undefined)}
              no-margin
            ></ct-label>`
          : nothing}
        <${wrapperTag}
          class="ct-field__wrapper"
          aria-label=${ifDefined(isGroup ? this.title || undefined : undefined)}
        >
          ${showLegend
            ? html`<ct-label
                class=${classMap(titleClasses)}
                theme=${this.theme}
                tag="legend"
                content=${this.title}
                ?required=${this.isRequired}
                required-text=${ifDefined(this.requiredText || undefined)}
                no-margin
              ></ct-label>`
            : nothing}
          ${showDescription
            ? html`<ct-field-description
                class="ct-field__description"
                theme=${this.theme}
                content=${this.description}
              ></ct-field-description>`
            : nothing}
          ${showPrefix ? html`<div class="ct-field__prefix">${unsafeHTML(this.prefix)}</div>` : nothing}
          <div class="ct-field__control">${this.renderControl(type, accessibleName)}</div>
          ${showSuffix ? html`<div class="ct-field__suffix">${unsafeHTML(this.suffix)}</div>` : nothing}
          ${showMessage
            ? html`<ct-field-message
                class="ct-field__message"
                theme=${this.theme}
                type=${this.isInvalid ? 'error' : 'information'}
                content=${messageContent}
              ></ct-field-message>`
            : nothing}
        </${wrapperTag}>
      </div>
    `;
  }

  private renderControl(type: FieldType, accessibleName: string | undefined) {
    switch (type) {
      case 'textfield':
        return html`<ct-textfield
          theme=${this.theme}
          name=${this.name}
          id=${this.id}
          value=${ifDefined(this.value || undefined)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          ?disabled=${this.isDisabled}
          ?required=${this.isRequired}
          ?invalid=${this.isInvalid}
          aria-label=${ifDefined(accessibleName)}
        ></ct-textfield>`;

      case 'textarea':
        return html`<ct-textarea
          theme=${this.theme}
          name=${this.name}
          id=${this.id}
          .value=${this.value}
          placeholder=${ifDefined(this.placeholder || undefined)}
          ?is-disabled=${this.isDisabled}
          ?is-required=${this.isRequired}
          ?is-invalid=${this.isInvalid}
          aria-label=${ifDefined(accessibleName)}
        ></ct-textarea>`;

      case 'select': {
        const children = this._selectChildren();
        return html`<ct-select
          theme=${this.theme}
          id=${this.id}
          name=${this.name}
          ?multiple=${this.isMultiple}
          ?disabled=${this.isDisabled}
          ?required=${this.isRequired}
          ?invalid=${this.isInvalid}
          aria-label=${ifDefined(accessibleName)}
          >${children.map((child) => this.renderSelectChild(child))}</ct-select
        >`;
      }

      case 'checkbox':
      case 'radio':
        return this.renderOptionGroup(type, accessibleName);

      default:
        // Mirrors upstream's catch-all `{% else %}` branch (civictheme:input), which also
        // covers `hidden` — the description/message/prefix/suffix suppression for `hidden` is
        // handled by the `isHidden` guards around this control, not here.
        return html`<ct-input
          theme=${this.theme}
          type=${type}
          name=${this.name}
          id=${this.id}
          value=${ifDefined(this.value || undefined)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          ?disabled=${this.isDisabled}
          ?required=${this.isRequired}
          ?invalid=${this.isInvalid}
          aria-label=${ifDefined(accessibleName)}
        ></ct-input>`;
    }
  }

  private renderOptionGroup(type: 'checkbox' | 'radio', accessibleName: string | undefined) {
    const options = this._fieldOptions();
    const direction = this.isInline ? 'horizontal' : 'vertical';

    // No ct-field-option children: render a single control from this element's own props,
    // matching upstream's synthesized single-item `control` array.
    const items =
      options.length > 0
        ? options.map((option, index) => ({
            id: option.id || `${this.id}-option-${index}`,
            value: option.value,
            label: option.label,
            checked: option.checked,
            disabled: option.disabled || this.isDisabled,
          }))
        : [
            {
              id: this.id,
              value: this.value,
              label: this.label,
              checked: this.checked,
              disabled: this.isDisabled,
            },
          ];

    return html`
      <ct-item-list direction=${direction} size="small">
        ${items.map(
          (item) => html`
            <ct-item-list-item>
              ${type === 'checkbox'
                ? html`<ct-checkbox
                    theme=${this.theme}
                    name=${this.name}
                    id=${item.id}
                    value=${ifDefined(item.value || undefined)}
                    label=${ifDefined(item.label || accessibleName)}
                    ?is-checked=${item.checked}
                    ?is-required=${this.isRequired}
                    ?is-invalid=${this.isInvalid}
                    ?is-disabled=${item.disabled}
                  ></ct-checkbox>`
                : html`<ct-radio
                    theme=${this.theme}
                    name=${this.name}
                    id=${item.id}
                    value=${ifDefined(item.value || undefined)}
                    label=${ifDefined(item.label || accessibleName)}
                    ?checked=${item.checked}
                    ?required=${this.isRequired}
                    ?invalid=${this.isInvalid}
                    ?disabled=${item.disabled}
                  ></ct-radio>`}
            </ct-item-list-item>
          `,
        )}
      </ct-item-list>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-field': CtField;
  }
}
