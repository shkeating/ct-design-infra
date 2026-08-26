import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TagListItemTheme = 'light' | 'dark';
export type TagListItemVariant = 'primary' | 'secondary' | 'tertiary';
export type TagListItemIconPlacement = 'before' | 'after';

/**
 * A single tag of a `ct-tag-list`. Carries the tag's own data — visible text, optional
 * destination URL, and the same theme/variant/icon options `ct-tag` itself exposes — while all
 * visible chrome (the `ct-item-list` wrapper, the actual `ct-tag` element) is rendered by the
 * parent `ct-tag-list`, which reads its `ct-tag-list-item` children to build the list. This
 * mirrors `ct-accordion-item`/`ct-social-links-item`'s parent-renders-the-chrome shape rather
 * than a JSON `tags` prop (array/object props aren't allowed — plain strings/booleans only, so
 * a model can emit each tag the same way it emits any other element).
 *
 * Upstream `tag-list.component.yml` only documents `content`/`url`/`is_new_window` per tag, but
 * `tag-list.twig` merges each tag object straight into a `civictheme:tag` include, so a tag item
 * can carry any of `civictheme:tag`'s own props (its `.stories.js` fixture uses `theme`/`type`/
 * `icon` on one tag). `theme`/`variant`/`icon`/`icon-placement`/`external` are exposed here for
 * the same reason — this keeps the API generic enough for downstream consumers (event-card,
 * promo-card, snippet all compose tag-list) rather than narrowly matching only the plain-string
 * tags shown in upstream's default story.
 */
@customElement('ct-tag-list-item')
export class CtTagListItem extends LitElement {
  /** Tag content/label (upstream `content`). */
  @property({ type: String }) content = '';

  /** Optional destination URL — when set, the tag renders as a link (upstream `url`). */
  @property({ type: String }) url?: string;

  /** Opens the link in a new tab/window (upstream `is_new_window`). Only applies when `url` is set. */
  @property({ type: Boolean, attribute: 'new-window' }) isNewWindow = false;

  /**
   * Per-tag theme override. When unset, inherits the parent `ct-tag-list`'s own `theme` —
   * mirrors upstream's `{theme: theme}|merge(tag)` (the list's theme is the default, but a tag
   * object with its own `theme` key overrides it).
   */
  @property({ type: String }) theme?: TagListItemTheme;

  /** Visual style variant, passed straight through to `ct-tag`. */
  @property({ type: String }) variant: TagListItemVariant = 'primary';

  /** Name of the icon to display alongside the tag's content. */
  @property({ type: String }) icon?: string;

  /** Position of the icon relative to the content. */
  @property({ type: String, attribute: 'icon-placement' }) iconPlacement: TagListItemIconPlacement = 'after';

  /** Marks the tag as external, appending an external-link icon (passed through to `ct-tag`). */
  @property({ type: Boolean }) external = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-tag-list-item': CtTagListItem;
  }
}
