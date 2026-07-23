import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BreakpointM } from '@ct-infra/tokens';

export type ParagraphTheme = 'light' | 'dark';
export type ParagraphSize = 'extra-large' | 'large' | 'regular' | 'small';

const VALID_SIZES: ParagraphSize[] = ['extra-large', 'large', 'regular', 'small'];

/**
 * A Generative UI-ready Paragraph component based on CivicTheme. Renders a
 * single block of rich-text content (paragraphs, headings, links, lists,
 * blockquotes, tables, images) with CivicTheme's typography/spacing rules,
 * a light/dark theme and a size variant.
 *
 * `content` is trusted, already-sanitized HTML (mirrors CivicTheme's own
 * `content` Twig prop, typically rendered from a CMS's WYSIWYG/text-format
 * field) rather than plain text - it is rendered via `unsafeHTML`, so
 * callers must not pass unsanitized user input.
 *
 * This component reuses the `basic-content.*` / `table.*` / `content-link.*`
 * token namespaces rather than introducing a `paragraph.*` one: upstream's
 * compiled `paragraph.css` references exactly the same `--ct-basic-content-*`,
 * `--ct-table-*` and `--ct-content-link-*` custom properties as the
 * `ct-basic-content` component (which ported those namespaces first) -
 * there is no `--ct-paragraph-*` variable anywhere in the upstream CSS.
 */
@customElement('ct-paragraph')
export class CtParagraph extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-paragraph {
      display: block;
      margin-bottom: 0.5rem;
      font-size: var(--ct-typography-text-regular-font-size);
      line-height: var(--ct-typography-text-regular-line-height);
      font-family: var(--ct-typography-text-regular-font-name);
      font-weight: var(--ct-typography-text-regular-font-weight);
      letter-spacing: var(--ct-typography-text-regular-letter-spacing);
    }
    .ct-paragraph--no-margin {
      margin-bottom: 0;
    }

    .ct-paragraph hr {
      box-sizing: content-box;
      height: 0;
      overflow: visible;
    }

    .ct-paragraph code,
    .ct-paragraph kbd,
    .ct-paragraph samp,
    .ct-paragraph pre {
      font-family: monospace;
      font-size: 1em;
    }

    .ct-paragraph abbr[title] {
      border-bottom: none;
      text-decoration: underline;
      text-decoration: underline dotted;
    }

    .ct-paragraph b,
    .ct-paragraph strong {
      font-weight: bolder;
    }

    .ct-paragraph small {
      font-size: 80%;
    }

    .ct-paragraph sub,
    .ct-paragraph sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }
    .ct-paragraph sub {
      bottom: -0.25em;
    }
    .ct-paragraph sup {
      top: -0.5em;
    }

    /* Headings */
    .ct-paragraph h1,
    .ct-paragraph h2,
    .ct-paragraph h3,
    .ct-paragraph h4,
    .ct-paragraph h5,
    .ct-paragraph h6 {
      margin: 0;
    }
    .ct-paragraph h1 {
      font-size: var(--ct-typography-heading-1-font-size);
      line-height: var(--ct-typography-heading-1-line-height);
      font-family: var(--ct-typography-heading-1-font-name);
      font-weight: var(--ct-typography-heading-1-font-weight);
      letter-spacing: var(--ct-typography-heading-1-letter-spacing);
      margin-bottom: 1.5rem;
    }
    .ct-paragraph h2 {
      font-size: var(--ct-typography-heading-2-font-size);
      line-height: var(--ct-typography-heading-2-line-height);
      font-family: var(--ct-typography-heading-2-font-name);
      font-weight: var(--ct-typography-heading-2-font-weight);
      letter-spacing: var(--ct-typography-heading-2-letter-spacing);
      margin-bottom: 1.5rem;
    }
    .ct-paragraph h3 {
      font-size: var(--ct-typography-heading-3-font-size);
      line-height: var(--ct-typography-heading-3-line-height);
      font-family: var(--ct-typography-heading-3-font-name);
      font-weight: var(--ct-typography-heading-3-font-weight);
      letter-spacing: var(--ct-typography-heading-3-letter-spacing);
      margin-bottom: 1rem;
    }
    .ct-paragraph h4 {
      font-size: var(--ct-typography-heading-4-font-size);
      line-height: var(--ct-typography-heading-4-line-height);
      font-family: var(--ct-typography-heading-4-font-name);
      font-weight: var(--ct-typography-heading-4-font-weight);
      letter-spacing: var(--ct-typography-heading-4-letter-spacing);
      margin-bottom: 1rem;
    }
    .ct-paragraph h5 {
      font-size: var(--ct-typography-heading-5-font-size);
      line-height: var(--ct-typography-heading-5-line-height);
      font-family: var(--ct-typography-heading-5-font-name);
      font-weight: var(--ct-typography-heading-5-font-weight);
      letter-spacing: var(--ct-typography-heading-5-letter-spacing);
      margin-bottom: 0.5rem;
    }
    .ct-paragraph h6 {
      font-size: var(--ct-typography-heading-6-font-size);
      line-height: var(--ct-typography-heading-6-line-height);
      font-family: var(--ct-typography-heading-6-font-name);
      font-weight: var(--ct-typography-heading-6-font-weight);
      letter-spacing: var(--ct-typography-heading-6-letter-spacing);
      margin-bottom: 0.5rem;
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-paragraph h1 {
        margin-bottom: 2rem;
      }
      .ct-paragraph h2 {
        margin-bottom: 2rem;
      }
      .ct-paragraph h3 {
        margin-bottom: 1.5rem;
      }
      .ct-paragraph h4 {
        margin-bottom: 1.5rem;
      }
      .ct-paragraph h5 {
        margin-bottom: 1rem;
      }
      .ct-paragraph h6 {
        margin-bottom: 1rem;
      }
    }

    /* Paragraphs (nested <p> elements within the rendered content) */
    .ct-paragraph p {
      margin-top: var(--ct-basic-content-vertical-spacing);
      margin-bottom: var(--ct-basic-content-vertical-spacing);
    }
    .ct-paragraph p:first-child {
      margin-top: 0;
    }
    .ct-paragraph:last-child p:last-child {
      margin-bottom: 0;
    }

    /* Links (a raw <a> inside prose content; ct-button/ct-link elements are
       excluded upstream since they carry their own complete styling). */
    .ct-paragraph a:not(.ct-button):not(.ct-link) {
      text-decoration: underline;
      text-decoration-thickness: 0.0625rem;
      text-underline-offset: 0.1875rem;
      padding: 0.1875rem 0 0.125rem;
      word-break: break-word;
    }
    .ct-paragraph a:not(.ct-button):not(.ct-link):hover {
      text-decoration: none;
      padding: 0.1875rem 0 0.25rem;
    }

    /* Blockquote */
    .ct-paragraph blockquote {
      font-size: var(--ct-typography-quote-font-size);
      line-height: var(--ct-typography-quote-line-height);
      font-family: var(--ct-typography-quote-font-name);
      font-weight: var(--ct-typography-quote-font-weight);
      letter-spacing: var(--ct-typography-quote-letter-spacing);
      position: relative;
      margin: 0;
      margin-top: var(--ct-basic-content-vertical-spacing);
      margin-bottom: var(--ct-basic-content-vertical-spacing);
      padding: 1rem 1.5rem;
      display: grid;
      border-radius: var(--ct-basic-content-blockquote-border-radius);
    }
    .ct-paragraph blockquote::before {
      content: '';
      width: 0.375rem;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      border-radius: var(--ct-basic-content-blockquote-border-radius);
    }
    .ct-paragraph blockquote p {
      font-size: var(--ct-typography-quote-font-size);
      line-height: var(--ct-typography-quote-line-height);
      font-family: var(--ct-typography-quote-font-name);
      font-weight: var(--ct-typography-quote-font-weight);
      letter-spacing: var(--ct-typography-quote-letter-spacing);
      margin-bottom: 0;
    }
    .ct-paragraph blockquote cite {
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-family: var(--ct-typography-label-extra-small-font-name);
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
      padding-top: 1rem;
      font-style: normal;
      display: block;
    }
    .ct-paragraph blockquote cite::before {
      content: '-';
      margin-right: 0.25rem;
    }

    /* Lists (custom markers - .ct-item-list is a different, separately
       ported component, so plain lists are excluded from that styling). */
    .ct-paragraph ul:not(.ct-item-list) {
      margin-top: var(--ct-basic-content-vertical-spacing);
      margin-bottom: var(--ct-basic-content-vertical-spacing);
      padding: 0;
      list-style: none;
    }
    .ct-paragraph ul:not(.ct-item-list) > li {
      position: relative;
      padding-left: calc(var(--ct-basic-content-list-marker-width) + var(--ct-basic-content-list-marker-margin));
    }
    .ct-paragraph ul:not(.ct-item-list) > li::before {
      content: '';
      position: absolute;
      text-align: center;
      width: 0.4375rem;
      height: 0.4375rem;
      border-radius: 100%;
      top: 0.6875rem;
      left: 0.6875rem;
    }
    .ct-paragraph ol:not(.ct-item-list) {
      margin-top: var(--ct-basic-content-vertical-spacing);
      margin-bottom: var(--ct-basic-content-vertical-spacing);
      counter-reset: ordered_counter;
      padding: 0;
      list-style: none;
    }
    .ct-paragraph ol:not(.ct-item-list) > li {
      counter-increment: ordered_counter;
      padding-left: calc(var(--ct-basic-content-list-marker-width) + var(--ct-basic-content-list-marker-margin));
    }
    .ct-paragraph ol:not(.ct-item-list) > li::before {
      content: counter(ordered_counter);
      display: inline-block;
      text-align: center;
      width: var(--ct-basic-content-list-marker-width);
      margin-left: calc(var(--ct-basic-content-list-marker-width) * -1 - var(--ct-basic-content-list-marker-margin));
      margin-right: var(--ct-basic-content-list-marker-margin);
    }

    /* Images / figures */
    .ct-paragraph img {
      height: auto;
      max-width: 100%;
      margin-top: calc(var(--ct-basic-content-vertical-spacing) * 2);
      margin-bottom: calc(var(--ct-basic-content-vertical-spacing) * 2);
    }
    .ct-paragraph figure {
      margin-top: calc(var(--ct-basic-content-vertical-spacing) * 2);
      margin-bottom: calc(var(--ct-basic-content-vertical-spacing) * 2);
    }
    .ct-paragraph figure img {
      margin-top: 0;
      margin-bottom: 0;
    }

    /* Table (no dedicated ct-table component exists yet - this reproduces
       CivicTheme's generic table styling for a bare <table> pasted into
       rich content, reusing the table.* tokens introduced for basic-content). */
    .ct-paragraph table {
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
    .ct-paragraph table thead,
    .ct-paragraph table tfoot {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
    }
    .ct-paragraph table tr th,
    .ct-paragraph table tr td {
      padding: 0.75rem 1.5rem;
      vertical-align: var(--ct-table-cell-vertical-align);
    }
    .ct-paragraph table caption {
      text-align: left;
      padding: 0.75rem 0;
      font-size: var(--ct-typography-label-large-font-size);
      line-height: var(--ct-typography-label-large-line-height);
      font-family: var(--ct-typography-label-large-font-name);
      font-weight: var(--ct-typography-label-large-font-weight);
      letter-spacing: var(--ct-typography-label-large-letter-spacing);
    }
    .ct-paragraph table.ct-table--caption-after {
      caption-side: bottom;
    }
    .ct-paragraph table.ct-table--caption-after caption {
      font-size: var(--ct-typography-text-small-font-size);
      line-height: var(--ct-typography-text-small-line-height);
      font-family: var(--ct-typography-text-small-font-name);
      font-weight: var(--ct-typography-text-small-font-weight);
      letter-spacing: var(--ct-typography-text-small-letter-spacing);
    }

    @media (max-width: 767px) {
      .ct-paragraph table:not(.ct-table--data) thead,
      .ct-paragraph table:not(.ct-table--data) tfoot {
        position: absolute;
        clip: rect(0.0625rem, 0.0625rem, 0.0625rem, 0.0625rem);
        overflow: hidden;
        height: 1px;
        width: 1px;
        white-space: nowrap;
      }
      .ct-paragraph table:not(.ct-table--data) tbody tr {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .ct-paragraph table:not(.ct-table--data) tbody tr td {
        border: 0;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: stretch;
      }
      .ct-paragraph table:not(.ct-table--data) tbody tr td::before {
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
      .ct-paragraph table:not(.ct-table--data) tr th,
      .ct-paragraph table:not(.ct-table--data) tr td {
        padding: 0.75rem 0.5rem;
      }
    }

    /* Size variants */
    .ct-paragraph.ct-paragraph--extra-large {
      font-size: var(--ct-typography-text-extra-large-font-size);
      line-height: var(--ct-typography-text-extra-large-line-height);
      font-family: var(--ct-typography-text-extra-large-font-name);
      font-weight: var(--ct-typography-text-extra-large-font-weight);
      letter-spacing: var(--ct-typography-text-extra-large-letter-spacing);
    }
    .ct-paragraph.ct-paragraph--large {
      font-size: var(--ct-typography-text-large-font-size);
      line-height: var(--ct-typography-text-large-line-height);
      font-family: var(--ct-typography-text-large-font-name);
      font-weight: var(--ct-typography-text-large-font-weight);
      letter-spacing: var(--ct-typography-text-large-letter-spacing);
    }
    .ct-paragraph.ct-paragraph--regular {
      font-size: var(--ct-typography-text-regular-font-size);
      line-height: var(--ct-typography-text-regular-line-height);
      font-family: var(--ct-typography-text-regular-font-name);
      font-weight: var(--ct-typography-text-regular-font-weight);
      letter-spacing: var(--ct-typography-text-regular-letter-spacing);
    }
    .ct-paragraph.ct-paragraph--small {
      font-size: var(--ct-typography-text-small-font-size);
      line-height: var(--ct-typography-text-small-line-height);
      font-family: var(--ct-typography-text-small-font-name);
      font-weight: var(--ct-typography-text-small-font-weight);
      letter-spacing: var(--ct-typography-text-small-letter-spacing);
    }

    /* Theme: light */
    .ct-paragraph.ct-theme-light {
      color: var(--ct-basic-content-light-base-color);
    }
    .ct-paragraph.ct-theme-light h1 {
      color: var(--ct-basic-content-light-heading-1-color);
    }
    .ct-paragraph.ct-theme-light h2 {
      color: var(--ct-basic-content-light-heading-2-color);
    }
    .ct-paragraph.ct-theme-light h3 {
      color: var(--ct-basic-content-light-heading-3-color);
    }
    .ct-paragraph.ct-theme-light h4 {
      color: var(--ct-basic-content-light-heading-4-color);
    }
    .ct-paragraph.ct-theme-light h5 {
      color: var(--ct-basic-content-light-heading-5-color);
    }
    .ct-paragraph.ct-theme-light h6 {
      color: var(--ct-basic-content-light-heading-6-color);
    }
    .ct-paragraph.ct-theme-light a:not(.ct-button):not(.ct-link) {
      color: var(--ct-content-link-light-color);
    }
    .ct-paragraph.ct-theme-light a:not(.ct-button):not(.ct-link):focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
    }
    .ct-paragraph.ct-theme-light a:not(.ct-button):not(.ct-link):hover {
      background-color: var(--ct-content-link-light-hover-background-color);
      color: var(--ct-content-link-light-hover-color);
    }
    .ct-paragraph.ct-theme-light a:not(.ct-button):not(.ct-link):visited {
      color: var(--ct-content-link-light-visited-color);
    }
    .ct-paragraph.ct-theme-light a:not(.ct-button):not(.ct-link):visited:hover {
      color: var(--ct-content-link-light-visited-hover-color);
    }
    .ct-paragraph.ct-theme-light blockquote {
      color: var(--ct-basic-content-light-blockquote-color);
      background-color: var(--ct-basic-content-light-blockquote-background-color);
    }
    .ct-paragraph.ct-theme-light blockquote::before {
      background-color: var(--ct-basic-content-light-blockquote-stripe-background-color);
    }
    .ct-paragraph.ct-theme-light blockquote cite {
      color: var(--ct-basic-content-light-blockquote-color);
    }
    .ct-paragraph.ct-theme-light ul:not(.ct-item-list) > li {
      color: var(--ct-basic-content-light-ul-li-color);
    }
    .ct-paragraph.ct-theme-light ul:not(.ct-item-list) > li::before {
      background-color: var(--ct-basic-content-light-ul-li-marker-color);
    }
    .ct-paragraph.ct-theme-light ol:not(.ct-item-list) > li {
      color: var(--ct-basic-content-light-ol-li-color);
    }
    .ct-paragraph.ct-theme-light ol:not(.ct-item-list) > li::before {
      color: var(--ct-basic-content-light-ol-li-marker-color);
    }
    .ct-paragraph.ct-theme-light table {
      color: var(--ct-table-light-color);
      background-color: var(--ct-table-light-background-color);
    }
    .ct-paragraph.ct-theme-light table thead {
      color: var(--ct-table-light-header-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-paragraph.ct-theme-light table thead {
        border-bottom: solid 0.0625rem var(--ct-table-light-header-border-color);
      }
    }
    .ct-paragraph.ct-theme-light table thead tr:last-child {
      border-bottom: solid 0.125rem var(--ct-table-light-header-border-color);
    }
    .ct-paragraph.ct-theme-light table tfoot {
      color: var(--ct-table-light-footer-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-paragraph.ct-theme-light table tfoot {
        border-top: solid 0.0625rem var(--ct-table-light-footer-border-color);
      }
    }
    .ct-paragraph.ct-theme-light table tfoot tr:last-child {
      border-top: solid 0.125rem var(--ct-table-light-footer-border-color);
    }
    .ct-paragraph.ct-theme-light table tbody tr {
      border-bottom: solid 0.0625rem var(--ct-table-light-border-color);
    }
    .ct-paragraph.ct-theme-light table caption {
      color: var(--ct-table-light-caption-color);
    }
    .ct-paragraph.ct-theme-light table.ct-table--data {
      border-top: solid 0.0625rem var(--ct-table-light-footer-border-color);
    }
    .ct-paragraph.ct-theme-light table.ct-table--striped tbody tr:nth-child(odd) {
      background: var(--ct-table-light-row-odd-background-color);
    }
    .ct-paragraph.ct-theme-light table.ct-table--striped tbody tr:nth-child(odd) td {
      color: var(--ct-table-light-row-odd-color);
    }
    .ct-paragraph.ct-theme-light table.ct-table--striped tbody tr:nth-child(even) {
      background: var(--ct-table-light-row-even-background-color);
    }
    .ct-paragraph.ct-theme-light table.ct-table--striped tbody tr:nth-child(even) td {
      color: var(--ct-table-light-row-even-color);
    }

    /* Theme: dark */
    .ct-paragraph.ct-theme-dark {
      color: var(--ct-basic-content-dark-base-color);
    }
    .ct-paragraph.ct-theme-dark h1 {
      color: var(--ct-basic-content-dark-heading-1-color);
    }
    .ct-paragraph.ct-theme-dark h2 {
      color: var(--ct-basic-content-dark-heading-2-color);
    }
    .ct-paragraph.ct-theme-dark h3 {
      color: var(--ct-basic-content-dark-heading-3-color);
    }
    .ct-paragraph.ct-theme-dark h4 {
      color: var(--ct-basic-content-dark-heading-4-color);
    }
    .ct-paragraph.ct-theme-dark h5 {
      color: var(--ct-basic-content-dark-heading-5-color);
    }
    .ct-paragraph.ct-theme-dark h6 {
      color: var(--ct-basic-content-dark-heading-6-color);
    }
    .ct-paragraph.ct-theme-dark a:not(.ct-button):not(.ct-link) {
      color: var(--ct-content-link-dark-color);
    }
    .ct-paragraph.ct-theme-dark a:not(.ct-button):not(.ct-link):focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-dark);
    }
    .ct-paragraph.ct-theme-dark a:not(.ct-button):not(.ct-link):hover {
      background-color: var(--ct-content-link-dark-hover-background-color);
      color: var(--ct-content-link-dark-hover-color);
    }
    .ct-paragraph.ct-theme-dark a:not(.ct-button):not(.ct-link):visited {
      color: var(--ct-content-link-dark-visited-color);
    }
    .ct-paragraph.ct-theme-dark a:not(.ct-button):not(.ct-link):visited:hover {
      color: var(--ct-content-link-dark-visited-hover-color);
    }
    .ct-paragraph.ct-theme-dark blockquote {
      color: var(--ct-basic-content-dark-blockquote-color);
      background-color: var(--ct-basic-content-dark-blockquote-background-color);
    }
    .ct-paragraph.ct-theme-dark blockquote::before {
      background-color: var(--ct-basic-content-dark-blockquote-stripe-background-color);
    }
    .ct-paragraph.ct-theme-dark blockquote cite {
      color: var(--ct-basic-content-dark-blockquote-color);
    }
    .ct-paragraph.ct-theme-dark ul:not(.ct-item-list) > li {
      color: var(--ct-basic-content-dark-ul-li-color);
    }
    .ct-paragraph.ct-theme-dark ul:not(.ct-item-list) > li::before {
      background-color: var(--ct-basic-content-dark-ul-li-marker-color);
    }
    .ct-paragraph.ct-theme-dark ol:not(.ct-item-list) > li {
      color: var(--ct-basic-content-dark-ol-li-color);
    }
    .ct-paragraph.ct-theme-dark ol:not(.ct-item-list) > li::before {
      color: var(--ct-basic-content-dark-ol-li-marker-color);
    }
    .ct-paragraph.ct-theme-dark table {
      color: var(--ct-table-dark-color);
      background-color: var(--ct-table-dark-background-color);
    }
    .ct-paragraph.ct-theme-dark table thead {
      color: var(--ct-table-dark-header-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-paragraph.ct-theme-dark table thead {
        border-bottom: solid 0.0625rem var(--ct-table-dark-header-border-color);
      }
    }
    .ct-paragraph.ct-theme-dark table thead tr:last-child {
      border-bottom: solid 0.125rem var(--ct-table-dark-header-border-color);
    }
    .ct-paragraph.ct-theme-dark table tfoot {
      color: var(--ct-table-dark-footer-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-paragraph.ct-theme-dark table tfoot {
        border-top: solid 0.0625rem var(--ct-table-dark-footer-border-color);
      }
    }
    .ct-paragraph.ct-theme-dark table tfoot tr:last-child {
      border-top: solid 0.125rem var(--ct-table-dark-footer-border-color);
    }
    .ct-paragraph.ct-theme-dark table tbody tr {
      border-bottom: solid 0.0625rem var(--ct-table-dark-border-color);
    }
    .ct-paragraph.ct-theme-dark table caption {
      color: var(--ct-table-dark-caption-color);
    }
    .ct-paragraph.ct-theme-dark table.ct-table--data {
      border-top: solid 0.0625rem var(--ct-table-dark-footer-border-color);
    }
    .ct-paragraph.ct-theme-dark table.ct-table--striped tbody tr:nth-child(odd) {
      background: var(--ct-table-dark-row-odd-background-color);
    }
    .ct-paragraph.ct-theme-dark table.ct-table--striped tbody tr:nth-child(odd) td {
      color: var(--ct-table-dark-row-odd-color);
    }
    .ct-paragraph.ct-theme-dark table.ct-table--striped tbody tr:nth-child(even) {
      background: var(--ct-table-dark-row-even-background-color);
    }
    .ct-paragraph.ct-theme-dark table.ct-table--striped tbody tr:nth-child(even) td {
      color: var(--ct-table-dark-row-even-color);
    }
  `;

  /**
   * Theme variation: light or dark. Drives heading/link/table/blockquote colors.
   */
  @property({ type: String }) theme: ParagraphTheme = 'light';

  /**
   * Trusted HTML content (paragraphs, headings, links, lists, blockquotes,
   * tables, images) - rendered as-is via `unsafeHTML`. Mirrors CivicTheme's
   * `content` Twig prop; callers are responsible for sanitizing this HTML
   * before passing it, exactly as with the original Drupal component.
   */
  @property({ type: String }) content = '';

  /**
   * Paragraph size: extra-large, large, regular, or small.
   */
  @property({ type: String }) size: ParagraphSize = 'regular';

  /**
   * Disables the default bottom margin.
   */
  @property({ type: Boolean, attribute: 'no-margin' }) noMargin = false;

  /**
   * Additional custom CSS classes.
   */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.content) {
      return nothing;
    }

    const theme: ParagraphTheme = this.theme === 'dark' ? 'dark' : 'light';
    const size: ParagraphSize = VALID_SIZES.includes(this.size) ? this.size : 'regular';

    const classes = {
      'ct-paragraph': true,
      [`ct-theme-${theme}`]: true,
      [`ct-paragraph--${size}`]: true,
      'ct-paragraph--no-margin': this.noMargin,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html` <div class=${classMap(classes)} data-component-name="paragraph">${unsafeHTML(this.content)}</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-paragraph': CtParagraph;
  }
}
