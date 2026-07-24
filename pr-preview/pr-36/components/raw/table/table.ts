import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BreakpointM } from '@ct-infra/tokens';

export type TableTheme = 'light' | 'dark';
export type TableCaptionPosition = 'before' | 'after';

/**
 * A Generative UI-ready Table component based on CivicTheme, for tabular
 * data with an optional caption, striping, and a "data table" mode that
 * keeps a conventional grid layout at narrow viewports instead of the
 * default stacked/card mobile layout.
 *
 * DOCUMENTED DESIGN DECISION: upstream CivicTheme's `table.component.yml`
 * models `header`/`rows`/`footer` as nested arrays/objects (each row an
 * array of cells, each cell optionally `{content, attributes}`). That shape
 * cannot be expressed as a plain string/boolean attribute, which is this
 * repo's hard constraint for Generative UI schemas (see CLAUDE.md). Unlike
 * `ct-accordion`/`ct-breadcrumb`'s parent+child element pattern - a good fit
 * because their repeatable unit (a panel, a crumb) needs its own chrome - a
 * table row's "chrome" is nothing more than native `<tr>`/`<td>`/`<th>`
 * markup, so reinventing `ct-table-row`/`ct-table-cell` custom elements
 * would add indirection without adding capability. Slotting real light-DOM
 * `<thead>`/`<tbody>`/`<tfoot>` was also considered and rejected: this
 * component's `static styles` (the entire visual spec, per this repo's
 * convention) lives in the shadow root, and `::slotted()` can only style the
 * top-level slotted element, not its descendants - so slotted rows/cells
 * could never pick up `.ct-table` theme/striping selectors.
 *
 * The resolution follows `ct-basic-content`'s own precedent: `header`,
 * `rows`, and `footer` are trusted, pre-rendered HTML *strings* (still a
 * plain string type at the schema boundary) rendered via `unsafeHTML` inside
 * this component's own shadow root - `header`/`footer` are the inner
 * `<th>`/`<td>` markup for a single header/footer row, and `rows` is the
 * full `<tr>...</tr>` markup for every body row. Because this renders inside
 * the shadow root rather than a slot, ordinary descendant selectors in
 * `static styles` apply to it correctly. Callers (including an LLM) are
 * responsible for the same escaping/sanitization contract as
 * `ct-basic-content`'s `content` prop.
 *
 * Trade-off this creates: upstream's Twig auto-generates each `<td>`'s
 * `data-title` attribute (used by the sub-768px stacked layout's
 * `::before` label) from `header`/`header_sanitized`. Since row markup is
 * now caller-supplied, that auto-generation is lost - a caller wanting
 * accessible mobile row labels must include `data-title="..."` on each
 * `<td>` themselves. This is flagged rather than silently dropped.
 */
@customElement('ct-table')
export class CtTable extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-table {
      width: 100%;
      border-collapse: collapse;
      border: 0;
      border-spacing: 0;
      text-align: left;
      vertical-align: middle;
      font-size: var(--ct-typography-text-regular-font-size);
      line-height: var(--ct-typography-text-regular-line-height);
      font-family: var(--ct-typography-text-regular-font-name);
      font-weight: var(--ct-typography-text-regular-font-weight);
      letter-spacing: var(--ct-typography-text-regular-letter-spacing);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-table {
        font-size: var(--ct-typography-text-regular-desktop-font-size);
        line-height: var(--ct-typography-text-regular-desktop-line-height);
      }
    }
    .ct-table thead,
    .ct-table tfoot {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
    }
    .ct-table tr th,
    .ct-table tr td {
      padding: 0.75rem 1.5rem;
      vertical-align: var(--ct-table-cell-vertical-align);
    }
    .ct-table caption {
      text-align: left;
      padding: 0.75rem 0;
      font-size: var(--ct-typography-label-large-font-size);
      line-height: var(--ct-typography-label-large-line-height);
      font-family: var(--ct-typography-label-large-font-name);
      font-weight: var(--ct-typography-label-large-font-weight);
      letter-spacing: var(--ct-typography-label-large-letter-spacing);
    }
    .ct-table.ct-table--caption-after {
      caption-side: bottom;
    }
    .ct-table.ct-table--caption-after caption {
      font-size: var(--ct-typography-text-small-font-size);
      line-height: var(--ct-typography-text-small-line-height);
      font-family: var(--ct-typography-text-small-font-name);
      font-weight: var(--ct-typography-text-small-font-weight);
      letter-spacing: var(--ct-typography-text-small-letter-spacing);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-table.ct-table--caption-after caption {
        font-size: var(--ct-typography-text-small-desktop-font-size);
        line-height: var(--ct-typography-text-small-desktop-line-height);
      }
    }

    /* Below 768px, a non-"data" table restructures into stacked cards: header/
       footer are visually hidden (but stay screen-reader-accessible), each row
       becomes a flex column, and every cell grows a data-title label taken from
       its own data-title attribute - see the class doc comment for why that
       attribute is now the caller's responsibility rather than auto-generated. */
    @media (max-width: 767px) {
      .ct-table:not(.ct-table--data) thead,
      .ct-table:not(.ct-table--data) tfoot {
        position: absolute;
        clip: rect(0.0625rem, 0.0625rem, 0.0625rem, 0.0625rem);
        overflow: hidden;
        height: 1px;
        width: 1px;
        white-space: nowrap;
      }
      .ct-table:not(.ct-table--data) tbody tr {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .ct-table:not(.ct-table--data) tbody tr td {
        border: 0;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: stretch;
      }
      .ct-table:not(.ct-table--data) tbody tr td::before {
        content: attr(data-title);
        display: table-cell;
        height: 100%;
        width: 30%;
        max-width: 6rem;
        flex-shrink: 0;
        vertical-align: middle;
        padding-right: 1rem;
        font-size: var(--ct-typography-label-regular-font-size);
        line-height: var(--ct-typography-label-regular-line-height);
        font-family: var(--ct-typography-label-regular-font-name);
        font-weight: var(--ct-typography-label-regular-font-weight);
        letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      }
      .ct-table:not(.ct-table--data) tr th,
      .ct-table:not(.ct-table--data) tr td {
        padding: 0.75rem 0.5rem;
      }
    }

    /* Theme: light */
    .ct-table.ct-theme-light {
      color: var(--ct-table-light-color);
      background-color: var(--ct-table-light-background-color);
    }
    .ct-table.ct-theme-light thead {
      color: var(--ct-table-light-header-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-table.ct-theme-light thead {
        border-bottom: solid 0.0625rem var(--ct-table-light-header-border-color);
      }
    }
    .ct-table.ct-theme-light thead tr:last-child {
      border-bottom: solid 0.125rem var(--ct-table-light-header-border-color);
    }
    .ct-table.ct-theme-light tfoot {
      color: var(--ct-table-light-footer-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-table.ct-theme-light tfoot {
        border-top: solid 0.0625rem var(--ct-table-light-footer-border-color);
      }
    }
    .ct-table.ct-theme-light tfoot tr:last-child {
      border-top: solid 0.125rem var(--ct-table-light-footer-border-color);
    }
    .ct-table.ct-theme-light tbody tr {
      border-bottom: solid 0.0625rem var(--ct-table-light-border-color);
    }
    .ct-table.ct-theme-light caption {
      color: var(--ct-table-light-caption-color);
      /* Upstream's compiled CSS leaves <caption> without its own background,
         relying on ct-table always being composed inside an already-themed
         parent section. This component has no such guarantee in isolation
         (e.g. previewed standalone, or dropped into an unthemed page), so the
         caption box is explicitly painted to match the table's own themed
         background - otherwise (found during visual verification) dark-theme
         caption text renders near-invisibly against whatever background
         happens to sit behind it instead of the table's own dark background. */
      background-color: var(--ct-table-light-background-color);
    }
    .ct-table.ct-theme-light.ct-table--data {
      border-top: solid 0.0625rem var(--ct-table-light-footer-border-color);
    }
    .ct-table.ct-theme-light.ct-table--striped tbody tr:nth-child(odd) {
      background: var(--ct-table-light-row-odd-background-color);
    }
    .ct-table.ct-theme-light.ct-table--striped tbody tr:nth-child(odd) td {
      color: var(--ct-table-light-row-odd-color);
    }
    .ct-table.ct-theme-light.ct-table--striped tbody tr:nth-child(even) {
      background: var(--ct-table-light-row-even-background-color);
    }
    .ct-table.ct-theme-light.ct-table--striped tbody tr:nth-child(even) td {
      color: var(--ct-table-light-row-even-color);
    }

    /* Theme: dark */
    .ct-table.ct-theme-dark {
      color: var(--ct-table-dark-color);
      background-color: var(--ct-table-dark-background-color);
    }
    .ct-table.ct-theme-dark thead {
      color: var(--ct-table-dark-header-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-table.ct-theme-dark thead {
        border-bottom: solid 0.0625rem var(--ct-table-dark-header-border-color);
      }
    }
    .ct-table.ct-theme-dark thead tr:last-child {
      border-bottom: solid 0.125rem var(--ct-table-dark-header-border-color);
    }
    .ct-table.ct-theme-dark tfoot {
      color: var(--ct-table-dark-footer-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-table.ct-theme-dark tfoot {
        border-top: solid 0.0625rem var(--ct-table-dark-footer-border-color);
      }
    }
    .ct-table.ct-theme-dark tfoot tr:last-child {
      border-top: solid 0.125rem var(--ct-table-dark-footer-border-color);
    }
    .ct-table.ct-theme-dark tbody tr {
      border-bottom: solid 0.0625rem var(--ct-table-dark-border-color);
    }
    .ct-table.ct-theme-dark caption {
      color: var(--ct-table-dark-caption-color);
      /* See the matching comment on the light-theme caption rule above. */
      background-color: var(--ct-table-dark-background-color);
    }
    .ct-table.ct-theme-dark.ct-table--data {
      border-top: solid 0.0625rem var(--ct-table-dark-footer-border-color);
    }
    .ct-table.ct-theme-dark.ct-table--striped tbody tr:nth-child(odd) {
      background: var(--ct-table-dark-row-odd-background-color);
    }
    .ct-table.ct-theme-dark.ct-table--striped tbody tr:nth-child(odd) td {
      color: var(--ct-table-dark-row-odd-color);
    }
    .ct-table.ct-theme-dark.ct-table--striped tbody tr:nth-child(even) {
      background: var(--ct-table-dark-row-even-background-color);
    }
    .ct-table.ct-theme-dark.ct-table--striped tbody tr:nth-child(even) td {
      color: var(--ct-table-dark-row-even-color);
    }
  `;

  /**
   * Theme variation: light or dark.
   */
  @property({ type: String }) theme: TableTheme = 'light';

  /**
   * Table caption text. Omit to render no `<caption>`.
   */
  @property({ type: String }) caption = '';

  /**
   * Caption position relative to the table body: `before` (default, matches
   * native `<caption>` placement) or `after` (visually moved below via
   * `caption-side: bottom`, in a smaller type style).
   */
  @property({ type: String, attribute: 'caption-position' }) captionPosition: TableCaptionPosition = 'before';

  /**
   * Trusted HTML for the header row's cells, e.g.
   * `<th scope="col">Name</th><th scope="col">Role</th>`. Omit to render no
   * `<thead>`. Rendered via `unsafeHTML` inside this component's shadow
   * root - see the class doc comment for the sanitization contract.
   */
  @property({ type: String }) header = '';

  /**
   * Trusted HTML for the body's `<tr>` rows, e.g.
   * `<tr><td data-title="Name">Ada</td></tr>`. Omit to render no `<tbody>`.
   * Include a `data-title` attribute on each `<td>` to get an accessible
   * label in the sub-768px stacked layout (see the class doc comment).
   */
  @property({ type: String }) rows = '';

  /**
   * Trusted HTML for the footer row's cells, mirroring `header`. Omit to
   * render no `<tfoot>`.
   */
  @property({ type: String }) footer = '';

  /**
   * Whether to alternate row background/text colors.
   */
  @property({ type: Boolean }) striped = false;

  /**
   * Whether to treat this as a dense "data" table: skips the sub-768px
   * stacked/card mobile layout, keeping a conventional scrollable grid, and
   * adds a top border matching upstream's `is_data_table`.
   */
  @property({ type: Boolean, attribute: 'data-table' }) dataTable = false;

  /**
   * Additional custom CSS classes.
   */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    const theme: TableTheme = this.theme === 'dark' ? 'dark' : 'light';
    const captionPosition: TableCaptionPosition = this.captionPosition === 'after' ? 'after' : 'before';

    if (!this.header && !this.rows && !this.footer && !this.caption) {
      return nothing;
    }

    const classes = {
      'ct-table': true,
      [`ct-theme-${theme}`]: true,
      'ct-table--caption-after': captionPosition === 'after',
      'ct-table--striped': this.striped,
      'ct-table--data': this.dataTable,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <table class=${classMap(classes)}>
        ${this.caption ? html`<caption>${this.caption}</caption>` : nothing}
        ${this.header
          ? html`<thead>
              <tr>
                ${unsafeHTML(this.header)}
              </tr>
            </thead>`
          : nothing}
        ${this.rows ? html`<tbody>${unsafeHTML(this.rows)}</tbody>` : nothing}
        ${this.footer
          ? html`<tfoot>
              <tr>
                ${unsafeHTML(this.footer)}
              </tr>
            </tfoot>`
          : nothing}
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-table': CtTable;
  }
}
