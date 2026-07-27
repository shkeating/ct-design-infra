import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../label/label.js';

export type CheckboxTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Checkbox component based on CivicTheme — a single
 * `<input type="checkbox">` with light/dark theming, hover/checked/invalid/
 * disabled states, and a real composed `ct-label` for its caption text
 * (mirroring upstream `checkbox.twig`'s `{% include 'civictheme:label' %}`).
 * Renders nothing when `name` or `id` is empty, matching upstream's guard.
 *
 * **Known shadow-DOM composition gap:** `ct-label` renders its own `<label>`
 * into its own separate shadow root, nested inside this component's shadow
 * root. Because `for`/`id` reference resolution does not cross shadow-tree
 * boundaries (see `wcag-data/input.json`'s 1.3.1 entry for the same
 * limitation), the `for` passed to the composed `ct-label` cannot form a
 * native accessible-name or click-to-toggle association with this
 * component's own `<input>`, even though both elements are visually and
 * structurally composed together exactly as upstream's flat-DOM twig does.
 * Two deliberate workarounds close the practical gap:
 * - The accessible name is guaranteed by mirroring `label` into `aria-label`
 *   on the native `<input>` whenever an explicit `aria-label` isn't set.
 * - Clicking the composed `ct-label` is forwarded to `click()` the checkbox
 *   directly, restoring the toggle-on-label-click UX.
 * Per-state label *text color* sync (upstream's `.ct-checkbox + label`
 * hover/checked color rules) is not reproduced: `ct-label` sets its own
 * theme color inside its own shadow root, which a sibling selector from this
 * component's stylesheet cannot override (full style encapsulation, not just
 * an id-reference limitation). The invalid state remains visually legible
 * from the input's own border/background color change regardless.
 *
 * **Layout note:** the checkbox and its composed `ct-label` are laid out
 * side by side via `:host { display: inline-flex }`, not a sibling selector
 * forcing `display: inline` on `ct-label`. A custom element whose shadow
 * root renders block-level content (as `ct-label`'s does) gets blockified
 * in the parent's layout regardless of a `display: inline` override from
 * outside — that override computes as applied (`getComputedStyle` reports
 * `inline`) but has no effect on actual layout, since Chromium blockifies
 * based on the flattened (post-shadow-DOM) tree, not the declared `display`
 * value. Flexbox sidesteps this because flex items are blockified for the
 * flex algorithm regardless of their own declared `display`. `ct-label` is
 * also given `no-margin` here, since its own internal bottom margin (meant
 * for label-above-a-field usage) would otherwise skew `align-items: center`
 * — that margin lives inside `ct-label`'s own shadow root and can only be
 * cancelled by `ct-label` itself, hence the shared `no-margin` property.
 */
@customElement('ct-checkbox')
export class CtCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }

    .ct-checkbox {
      appearance: none;
      margin: 0;
      border-radius: var(--ct-checkbox-border-radius);
      border-style: solid;
      box-sizing: border-box;
      height: 1.625rem;
      width: 1.625rem;
      border-width: 0.0625rem;
      cursor: pointer;
      vertical-align: top;
    }

    .ct-checkbox[disabled] {
      opacity: var(--ct-checkbox-disabled-opacity);
      pointer-events: none;
    }

    .ct-checkbox + ct-label {
      cursor: pointer;
      margin-left: 0.5rem;
    }

    /* Opacity (unlike color) is a compositing effect on the whole element
       box, so dimming the composed ct-label when the checkbox is disabled
       works despite the shadow-root style-encapsulation gap noted above. */
    .ct-checkbox[disabled] + ct-label {
      opacity: var(--ct-checkbox-disabled-opacity);
      pointer-events: none;
    }

    .ct-checkbox:hover {
      border-width: 0.125rem;
    }

    .ct-checkbox:checked {
      border-width: 0.125rem;
    }

    .ct-checkbox:checked:hover {
      border-width: 0.125rem;
    }

    .ct-checkbox:checked::before {
      content: '';
      display: block;
      border-radius: calc(var(--ct-checkbox-border-radius) / 2);
      width: 1.125rem;
      height: 1.125rem;
      margin: 0.125rem auto;
      mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.9 0H17.1C17.3387 0 17.5676 0.0948211 17.7364 0.263604C17.9052 0.432387 18 0.661305 18 0.9V17.1C18 17.3387 17.9052 17.5676 17.7364 17.7364C17.5676 17.9052 17.3387 18 17.1 18H0.9C0.661305 18 0.432387 17.9052 0.263604 17.7364C0.0948211 17.5676 0 17.3387 0 17.1V0.9C0 0.661305 0.0948211 0.432387 0.263604 0.263604C0.432387 0.0948211 0.661305 0 0.9 0ZM6.48885 14.1746C6.57252 14.259 6.67206 14.326 6.78173 14.3716C6.8914 14.4173 7.00904 14.4409 7.12785 14.4409C7.24666 14.4409 7.3643 14.4173 7.47397 14.3716C7.58364 14.326 7.68318 14.259 7.76685 14.1746L15.9388 6.00264C16.1083 5.83317 16.2035 5.60331 16.2035 5.36364C16.2035 5.12397 16.1083 4.89412 15.9388 4.72464C15.7694 4.55517 15.5395 4.45996 15.2998 4.45996C15.0602 4.45996 14.8303 4.55517 14.6608 4.72464L7.12785 12.2666L4.23885 9.36864C4.06938 9.19917 3.83952 9.10396 3.59985 9.10396C3.36018 9.10396 3.13032 9.19917 2.96085 9.36864C2.79138 9.53812 2.69617 9.76797 2.69617 10.0076C2.69617 10.2473 2.79138 10.4772 2.96085 10.6466L6.48885 14.1746Z' fill='currentcolor'/%3E%3C/svg%3E%0A");
      transform: scale(0);
      animation: check-grow var(--ct-checkbox-animation-duration) forwards;
    }

    @keyframes check-grow {
      to {
        transform: scale(1);
      }
    }

    .ct-checkbox:focus-visible {
      outline-style: solid;
      outline-width: var(--ct-checkbox-outline-width);
      outline-offset: var(--ct-checkbox-outline-offset);
    }

    /* Light theme */
    .ct-checkbox.ct-theme-light:focus-visible {
      outline-color: var(--ct-checkbox-light-outline-color);
    }
    .ct-checkbox.ct-theme-light:not(.ct-checkbox--is-invalid) {
      border-color: var(--ct-checkbox-light-border-color);
      background-color: var(--ct-checkbox-light-background-color);
    }
    .ct-checkbox.ct-theme-light:not(.ct-checkbox--is-invalid):hover {
      border-color: var(--ct-checkbox-light-hover-border-color);
      background-color: var(--ct-checkbox-light-hover-background-color);
    }
    .ct-checkbox.ct-theme-light:not(.ct-checkbox--is-invalid):checked {
      border-color: var(--ct-checkbox-light-checked-border-color);
      background-color: var(--ct-checkbox-light-checked-background-color);
    }
    .ct-checkbox.ct-theme-light:not(.ct-checkbox--is-invalid):checked:hover {
      border-color: var(--ct-checkbox-light-checked-hover-border-color);
      background-color: var(--ct-checkbox-light-checked-hover-background-color);
    }
    .ct-checkbox.ct-theme-light:not(.ct-checkbox--is-invalid):checked:hover::before {
      background-color: var(--ct-checkbox-light-checked-hover-border-color);
    }
    .ct-checkbox.ct-theme-light:not(.ct-checkbox--is-invalid):checked::before {
      background-color: var(--ct-checkbox-light-checked-border-color);
    }
    .ct-checkbox.ct-theme-light.ct-checkbox--is-invalid {
      border-color: var(--ct-checkbox-light-invalid-border-color);
      background-color: var(--ct-checkbox-light-invalid-background-color);
    }
    .ct-checkbox.ct-theme-light.ct-checkbox--is-invalid:checked::before {
      background-color: var(--ct-checkbox-light-invalid-border-color);
    }

    /* Dark theme */
    .ct-checkbox.ct-theme-dark:focus-visible {
      outline-color: var(--ct-checkbox-dark-outline-color);
    }
    .ct-checkbox.ct-theme-dark:not(.ct-checkbox--is-invalid) {
      border-color: var(--ct-checkbox-dark-border-color);
      background-color: var(--ct-checkbox-dark-background-color);
    }
    .ct-checkbox.ct-theme-dark:not(.ct-checkbox--is-invalid):hover {
      border-color: var(--ct-checkbox-dark-hover-border-color);
      background-color: var(--ct-checkbox-dark-hover-background-color);
    }
    .ct-checkbox.ct-theme-dark:not(.ct-checkbox--is-invalid):checked {
      border-color: var(--ct-checkbox-dark-checked-border-color);
      background-color: var(--ct-checkbox-dark-checked-background-color);
    }
    .ct-checkbox.ct-theme-dark:not(.ct-checkbox--is-invalid):checked:hover {
      border-color: var(--ct-checkbox-dark-checked-hover-border-color);
      background-color: var(--ct-checkbox-dark-checked-hover-background-color);
    }
    .ct-checkbox.ct-theme-dark:not(.ct-checkbox--is-invalid):checked:hover::before {
      background-color: var(--ct-checkbox-dark-checked-hover-border-color);
    }
    .ct-checkbox.ct-theme-dark:not(.ct-checkbox--is-invalid):checked::before {
      background-color: var(--ct-checkbox-dark-checked-border-color);
    }
    .ct-checkbox.ct-theme-dark.ct-checkbox--is-invalid {
      border-color: var(--ct-checkbox-dark-invalid-border-color);
      background-color: var(--ct-checkbox-dark-invalid-background-color);
    }
    .ct-checkbox.ct-theme-dark.ct-checkbox--is-invalid:checked::before {
      background-color: var(--ct-checkbox-dark-invalid-border-color);
    }
  `;

  /** Theme variation: light or dark. */
  @property({ type: String }) theme: CheckboxTheme = 'light';

  /** DOM `name` attribute (required — renders nothing when empty, mirroring upstream). */
  @property({ type: String }) name = '';

  /**
   * DOM `id` attribute (required — renders nothing when empty, mirroring
   * upstream). Also passed as `for` to the composed `ct-label` — see the
   * class doc for why that association doesn't cross the shadow-DOM
   * boundary on its own.
   */
  @property({ type: String, reflect: true }) override id = '';

  /** DOM `value` attribute. */
  @property({ type: String }) value = '';

  /** Label content, rendered via a composed `ct-label`. */
  @property({ type: String }) label = '';

  /** Whether the checkbox is checked. */
  @property({ type: Boolean, attribute: 'is-checked' }) isChecked = false;

  /** Whether the checkbox is required. */
  @property({ type: Boolean, attribute: 'is-required' }) isRequired = false;

  /** Whether the checkbox is in an invalid state. Sets `aria-invalid="true"`. */
  @property({ type: Boolean, attribute: 'is-invalid' }) isInvalid = false;

  /** Whether the checkbox is disabled. */
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /**
   * Accessible name override. Defaults to `label`'s text when unset, since
   * the composed `ct-label` cannot supply the input's accessible name across
   * the shadow-DOM boundary (see class doc) — set this explicitly only when
   * it should differ from the visible `label` text.
   */
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

  private _handleLabelClick = () => {
    if (this.isDisabled) {
      return;
    }
    // ct-label's rendered <label for> lives in its own shadow root and can't
    // natively toggle this component's <input> (see class doc) — forward
    // the click manually to restore the expected UX.
    const input = this.renderRoot.querySelector('input.ct-checkbox') as HTMLInputElement | null;
    input?.click();
  };

  render() {
    // Mirrors upstream checkbox.twig's `{% if name is not empty and id is not empty %}` guard.
    if (!this.name || !this.id) {
      return nothing;
    }

    const classes = {
      'ct-checkbox': true,
      [`ct-theme-${this.theme}`]: true,
      'ct-checkbox--is-invalid': this.isInvalid,
      [this.modifierClass]: !!this.modifierClass,
    };

    const labelHtml = this.label
      ? html`
          <ct-label
            theme=${this.theme}
            content=${this.label}
            for=${this.id}
            size="small"
            modifier-class="ct-checkbox__label"
            no-margin
            @click=${this._handleLabelClick}
          ></ct-label>
        `
      : nothing;

    return html`
      <input
        type="checkbox"
        class=${classMap(classes)}
        name=${this.name}
        id=${this.id}
        value=${ifDefined(this.value || undefined)}
        ?checked=${this.isChecked}
        ?required=${this.isRequired}
        ?disabled=${this.isDisabled}
        aria-invalid=${ifDefined(this.isInvalid ? 'true' : undefined)}
        aria-label=${ifDefined(this.ariaLabel || this.label || undefined)}
        data-component-name="checkbox"
      />${labelHtml}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-checkbox': CtCheckbox;
  }
}
