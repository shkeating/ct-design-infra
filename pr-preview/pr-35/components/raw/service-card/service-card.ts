import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BreakpointM } from '@ct-infra/tokens';
import '../../01-atoms/heading/heading.js';
import '../../00-base/item-list/item-list.js';
import '../../01-atoms/link/link.js';

export type ServiceCardTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Service Card component based on CivicTheme. Renders a themed,
 * stripe-accented card composing `ct-heading` (title) around consumer-supplied `content-top`,
 * `links`, and `content-bottom` slots.
 *
 * Upstream CivicTheme's `service-card.twig` builds its `links` list by looping over an array
 * prop and rendering each into a `civictheme:link`, then feeding the rendered markup array into
 * `civictheme:item-list`'s `items` prop. Array/object props aren't allowed on Lit elements here
 * (plain strings/booleans only, see project CLAUDE.md), and this repo's own `ct-item-list`
 * (packages/core/src/components/00-base/item-list/item-list.ts) already expects composition via
 * light-DOM `ct-item-list-item` children rather than an `items` array — so instead of trying to
 * reproduce the twig's array API, this component exposes a `links` slot: the consumer composes
 * their own `<ct-item-list direction="vertical">` (with `<ct-item-list-item>` children wrapping
 * `<ct-link>`) and slots the whole thing in, the same way `content-top`/`content-bottom` already
 * accept arbitrary consumer-authored markup. See `ai-examples/service-card.html` for the composed
 * shape. `ct-item-list`/`ct-link` are still imported here (not just `ct-heading`, which this
 * component renders directly) so a consumer who only imports `ct-service-card` gets working,
 * pre-registered elements to slot in.
 */
@customElement('ct-service-card')
export class CtServiceCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-service-card {
      position: relative;
      border-radius: var(--ct-service-card-border-radius);
      width: 100%;
      /* No matching token found in civictheme.variables.css for this box-shadow — it's
         hardcoded in the upstream compiled CSS too, so ported literally (same convention
         as ct-link's padding values). */
      box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
    }

    .ct-service-card::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: var(--ct-service-card-stripe-height);
      top: 0;
      border-top-left-radius: var(--ct-service-card-border-radius);
      border-top-right-radius: var(--ct-service-card-border-radius);
      transition: height 0.25s;
    }

    .ct-service-card__content {
      padding: 1.5rem;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-service-card__content {
        padding: 2rem;
      }
    }

    /* Upstream targets the rendered heading via '.ct-service-card .ct-service-card__title'
       (a modifier class on the heading's own markup, since twig has no shadow DOM). Here
       'ct-heading' is a separate custom element rendered directly in this shadow root, so
       instead this styles the <ct-heading> host element itself — text-align is an
       inherited property, so setting it here cascades into ct-heading's own shadow tree
       (an element's shadow root inherits from that same element's computed style) and reaches
       the rendered <h4> without ct-heading needing to know about this component-specific
       class at all. */
    .ct-service-card__content > ct-heading {
      text-align: center;
    }

    /* Same inheritance mechanism covers upstream's '.ct-service-card__links' (margin-top) and
       '.ct-service-card__links .ct-item-list__item' (text-align: center): the consumer's
       slotted <ct-item-list> sits in the flat tree as a child of this wrapper, so it inherits
       text-align: center down through its own shadow root's <li> elements and into whatever
       <ct-link> is slotted inside each ct-item-list-item. */
    .ct-service-card__links {
      margin-top: 1rem;
      text-align: center;
    }

    .ct-service-card.ct-theme-light {
      background-color: var(--ct-service-card-light-background-color);
    }
    .ct-service-card.ct-theme-light::before {
      background-color: var(--ct-service-card-light-stripe-background-color);
    }
    .ct-service-card.ct-theme-dark {
      background-color: var(--ct-service-card-dark-background-color);
    }
    .ct-service-card.ct-theme-dark::before {
      background-color: var(--ct-service-card-dark-stripe-background-color);
    }
  `;

  /**
   * Theme variation: light or dark. Drives the card background and stripe color.
   */
  @property({ type: String }) theme: ServiceCardTheme = 'light';

  /**
   * Card title text, rendered as an `<h4>` via `ct-heading`. Upstream CivicTheme documents
   * `title` as a slot, but it's always used as plain heading text (never arbitrary markup),
   * so it's exposed here as a plain string property instead — consistent with how every other
   * text value in this system is a prop, not a slot, and keeping it Zod-schema-validatable.
   * Mirroring upstream's own `{% if title %}` gate, the whole card renders nothing without one.
   * (This shadows the native `HTMLElement.title` tooltip property/attribute of the same name —
   * harmless here since the value is the visible heading text anyway, and matches upstream's
   * own prop name in `service-card.component.yml` rather than renaming to avoid the collision.)
   */
  @property({ type: String }) title = '';

  /**
   * Additional custom CSS classes.
   */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.title) {
      return nothing;
    }

    const classes = {
      'ct-service-card': true,
      [`ct-theme-${this.theme}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    const hasContentTop = !!this.querySelector(':scope > [slot="content-top"]');
    const hasLinks = !!this.querySelector(':scope > [slot="links"]');
    const hasContentBottom = !!this.querySelector(':scope > [slot="content-bottom"]');

    return html`
      <div class=${classMap(classes)} data-component-name="service-card">
        <div class="ct-service-card__content">
          ${hasContentTop
            ? html`<div class="ct-service-card__content-top"><slot name="content-top"></slot></div>`
            : nothing}
          <ct-heading theme=${this.theme} content=${this.title} level="4" modifier-class="ct-service-card__title"></ct-heading>
          ${hasLinks ? html`<div class="ct-service-card__links"><slot name="links"></slot></div>` : nothing}
          ${hasContentBottom
            ? html`<div class="ct-service-card__content-bottom"><slot name="content-bottom"></slot></div>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-service-card': CtServiceCard;
  }
}
