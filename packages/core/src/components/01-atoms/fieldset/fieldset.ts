import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../label/label.js';
import '../paragraph/paragraph.js';
import '../field-message/field-message.js';
import type { FieldMessageType } from '../field-message/field-message.js';

export type FieldsetTheme = 'light' | 'dark';
export type FieldsetDescriptionDisplay = 'before' | 'after' | 'invisible';
export type FieldsetMessageType = FieldMessageType;

const VALID_DESCRIPTION_DISPLAYS: FieldsetDescriptionDisplay[] = ['before', 'after', 'invisible'];
const VALID_MESSAGE_TYPES: FieldsetMessageType[] = ['error', 'information', 'warning', 'success'];

/**
 * A Generative UI-ready Fieldset component based on CivicTheme, for grouping
 * related form elements under a shared `<legend>`, with an optional
 * description, a validation/status message, and prefix/suffix content around
 * the grouped fields.
 *
 * Renders a native `<fieldset>` as its own shadow-root wrapper element (this
 * is a distinct component from the `field` molecule at `02-molecules/field`,
 * which also uses a literal `<fieldset>` wrapper but only for checkbox/radio
 * option groups - that molecule is not in scope here).
 *
 * Composes the already-ported `ct-label` (`tag="legend"`), `ct-paragraph`
 * (description) and `ct-field-message` (validation/status message)
 * components internally, mirroring upstream `fieldset.twig`'s own
 * `civictheme:label` / `civictheme:paragraph` / `civictheme:field-message`
 * includes, rather than re-implementing any of their styling here. Grouped
 * form fields themselves are light-DOM children projected through the
 * default slot (upstream's `fields` slot).
 *
 * Deviation from upstream, made non-interactively while porting (see
 * docs/parallel-porting.md): the rendered `<legend>` for this group actually
 * lives two shadow-tree levels down (`ct-fieldset`'s shadow root renders a
 * `<ct-label tag="legend">` child, which in turn renders the real `<legend>`
 * tag inside `ct-label`'s own separate shadow root). The HTML spec's
 * fieldset-accessible-name algorithm requires the `<legend>` to be a literal
 * DOM *child* of the `<fieldset>`, which this nested-shadow-root structure
 * does not satisfy, so a browser cannot be relied on to compute the group's
 * accessible name from it. As a defensive fix, this component also mirrors
 * `legend` into an `aria-label` on the native `<fieldset>` itself, so the
 * accessible name is always correct regardless of that shadow-DOM nesting
 * edge case (`aria-label` always wins the accessible-name computation, so
 * this is safe even if a given browser's flattened accessibility tree does
 * also find the nested legend).
 *
 * No `wcag-data/fieldset.json` exists yet (upstream has none either); this
 * component was built against general WCAG guidance for fieldset/legend
 * grouping semantics (legend as the group's accessible name, proper
 * nesting) rather than a cross-checked file.
 */
@customElement('ct-fieldset')
export class CtFieldset extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-fieldset {
      display: block;
      box-sizing: border-box;
      border: none;
      margin: 0;
      padding: 1rem 0;
    }

    /* Legend (rendered as a light-DOM ct-label child of the native
       <fieldset>, tagged "legend" - see class-doc deviation above for why
       the upstream ".ct-fieldset legend" selector can't be used verbatim). */
    .ct-fieldset__legend {
      display: block;
      float: left;
      width: 100%;
    }
    .ct-fieldset__legend + * {
      clear: left;
    }

    .ct-fieldset__wrapper > *:not(:last-child) {
      margin-bottom: 1rem;
    }

    /* Forward-compatible: the "field" molecule (02-molecules/field, out of
       scope for this port) renders its host element with a "ct-field" class.
       Once it exists, adjacent fields slotted into ".ct-fieldset__fields"
       get upstream's 2rem gap instead of the 1rem default above. */
    .ct-fieldset__fields ::slotted(.ct-field:not(:last-child)) {
      margin-bottom: 2rem;
    }

    /* A nested ct-fieldset slotted inside another ct-fieldset's fields gets
       a decorative left stripe, matching upstream's ".ct-fieldset
       .ct-fieldset" rule - expressed here via ::slotted() since the nested
       instance is a light-DOM child assigned through this shadow root's own
       <slot>, not a same-shadow-tree descendant. */
    .ct-fieldset__fields ::slotted(ct-fieldset) {
      display: block;
      margin-top: 2rem;
      border-left: solid var(--ct-fieldset-stripe-width);
      padding-left: calc(1.5rem - var(--ct-fieldset-stripe-width));
    }
    .ct-fieldset.ct-theme-light .ct-fieldset__fields ::slotted(ct-fieldset) {
      border-color: var(--ct-fieldset-light-stripe-border-color);
    }
    .ct-fieldset.ct-theme-dark .ct-fieldset__fields ::slotted(ct-fieldset) {
      border-color: var(--ct-fieldset-dark-stripe-border-color);
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
  @property({ type: String }) theme: FieldsetTheme = 'light';

  /** Legend text for the fieldset. Nothing is rendered when this is empty. */
  @property({ type: String }) legend = '';

  /**
   * Trusted HTML description for the fieldset, rendered via `ct-paragraph`.
   * Mirrors CivicTheme's own `description` prop; callers are responsible for
   * sanitizing this HTML before passing it.
   */
  @property({ type: String }) description = '';

  /** Description position: before the fields, after them, or visually hidden. */
  @property({ type: String, attribute: 'description-display' }) descriptionDisplay: FieldsetDescriptionDisplay =
    'before';

  /** Validation/status message content, rendered via `ct-field-message`. */
  @property({ type: String }) message = '';

  /** Message type: error, information, warning, or success. */
  @property({ type: String, attribute: 'message-type' }) messageType: FieldsetMessageType = 'error';

  /** Whether the fieldset (and its legend) is marked as required. */
  @property({ type: Boolean }) required = false;

  /** Text shown within the legend when `required` is set. */
  @property({ type: String, attribute: 'required-text' }) requiredText = '';

  /**
   * Trusted HTML rendered before the grouped fields (e.g. an introductory
   * note or icon). Rendered as-is via `unsafeHTML`; callers must sanitize
   * this HTML before passing it.
   */
  @property({ type: String }) prefix = '';

  /**
   * Trusted HTML rendered after the grouped fields. Rendered as-is via
   * `unsafeHTML`; callers must sanitize this HTML before passing it.
   */
  @property({ type: String }) suffix = '';

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * Mirrors the reference twig's `{% if fields is not empty %}` guard: the
   * `.ct-fieldset__fields` wrapper (and its spacing) is only rendered when
   * this fieldset actually has slotted field children, checked the same way
   * `ct-callout`'s `_hasSlotted` helper does - synchronously against light-DOM
   * children already present at render time.
   */
  private _hasFields(): boolean {
    return this.children.length > 0;
  }

  render() {
    const theme: FieldsetTheme = this.theme === 'dark' ? 'dark' : 'light';
    const descriptionDisplay: FieldsetDescriptionDisplay = VALID_DESCRIPTION_DISPLAYS.includes(this.descriptionDisplay)
      ? this.descriptionDisplay
      : 'before';
    const messageType: FieldsetMessageType = VALID_MESSAGE_TYPES.includes(this.messageType)
      ? this.messageType
      : 'error';

    const classes = {
      'ct-fieldset': true,
      [`ct-theme-${theme}`]: true,
      'ct-fieldset--required': this.required,
      [this.modifierClass]: !!this.modifierClass,
    };

    const showDescriptionBefore = !!this.description && (descriptionDisplay === 'before' || descriptionDisplay === 'invisible');
    const showDescriptionAfter = !!this.description && descriptionDisplay === 'after';
    const hasFields = this._hasFields();

    const descriptionBeforeClasses = {
      'ct-fieldset__description': true,
      'ct-fieldset__description--invisible': descriptionDisplay === 'invisible',
      'ct-visually-hidden': descriptionDisplay === 'invisible',
      'ct-fieldset__description--before': descriptionDisplay === 'before',
    };

    return html`
      <fieldset class=${classMap(classes)} aria-label=${ifDefined(this.legend || undefined)} data-component-name="fieldset">
        ${this.legend
          ? html`<ct-label
              class="ct-fieldset__legend"
              modifier-class="ct-fieldset__legend"
              theme=${theme}
              tag="legend"
              size="large"
              content=${this.legend}
              ?required=${this.required}
              required-text=${ifDefined(this.requiredText || undefined)}
            ></ct-label>`
          : nothing}

        <div class="ct-fieldset__wrapper">
          ${showDescriptionBefore
            ? html`<div class=${classMap(descriptionBeforeClasses)}>
                <ct-paragraph theme=${theme} content=${this.description}></ct-paragraph>
              </div>`
            : nothing}
          ${this.message
            ? html`<ct-field-message
                theme=${theme}
                type=${messageType}
                content=${this.message}
                modifier-class="ct-fieldset__message"
              ></ct-field-message>`
            : nothing}
          ${this.prefix ? html`<div class="ct-fieldset__prefix">${unsafeHTML(this.prefix)}</div>` : nothing}
          ${hasFields ? html`<div class="ct-fieldset__fields"><slot></slot></div>` : nothing}
          ${this.suffix ? html`<div class="ct-fieldset__suffix">${unsafeHTML(this.suffix)}</div>` : nothing}
          ${showDescriptionAfter
            ? html`<div class="ct-fieldset__description ct-fieldset__description--after">
                <ct-paragraph theme=${theme} content=${this.description}></ct-paragraph>
              </div>`
            : nothing}
        </div>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-fieldset': CtFieldset;
  }
}
