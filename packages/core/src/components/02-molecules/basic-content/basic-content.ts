import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BreakpointXs, BreakpointS, BreakpointM, BreakpointL, BreakpointXl, BreakpointXxl } from '@ct-infra/tokens';

export type BasicContentTheme = 'light' | 'dark';
export type BasicContentVerticalSpacing = 'top' | 'bottom' | 'both' | 'none' | '';

const VALID_SPACING: BasicContentVerticalSpacing[] = ['top', 'bottom', 'both', 'none'];

/**
 * A Generative UI-ready Basic Content component based on CivicTheme. Renders
 * general HTML content (headings, paragraphs, links, lists, blockquotes,
 * tables, images) with CivicTheme's typography/spacing rules and a
 * light/dark theme, optionally wrapped in a centered container.
 *
 * `content` is trusted, already-sanitized HTML (mirrors CivicTheme's own
 * `content` Twig slot, typically rendered from a CMS's WYSIWYG field) rather
 * than plain text - it is rendered via `unsafeHTML`, so callers must not pass
 * unsanitized user input.
 */
@customElement('ct-basic-content')
export class CtBasicContent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-basic-content {
      font-size: var(--ct-typography-text-regular-font-size);
      line-height: var(--ct-typography-text-regular-line-height);
      font-family: var(--ct-typography-text-regular-font-name);
      font-weight: var(--ct-typography-text-regular-font-weight);
      letter-spacing: var(--ct-typography-text-regular-letter-spacing);
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-basic-content {
        font-size: var(--ct-typography-text-regular-desktop-font-size);
        line-height: var(--ct-typography-text-regular-desktop-line-height);
      }
      .ct-basic-content.ct-basic-content--with-background {
        padding-left: var(--ct-basic-content-space-horizontal);
        padding-right: var(--ct-basic-content-space-horizontal);
      }
    }

    /* is-contained wrapper: mirrors CivicTheme's .container (a single
       col-xxs-12 row inside a container is a layout no-op beyond the
       container's own centering + responsive max-width, so only the
       container itself is reproduced here). Literal max-width steps are
       ported directly from civictheme.base.css - not token-backed upstream. */
    .ct-basic-content__container {
      margin: 0 auto;
      max-width: calc(100vw - 3rem);
    }
    @media (min-width: ${unsafeCSS(BreakpointXs)}) {
      .ct-basic-content__container {
        max-width: 320px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointS)}) {
      .ct-basic-content__container {
        max-width: 528px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-basic-content__container {
        max-width: 720px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-basic-content__container {
        max-width: 896px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointXl)}) {
      .ct-basic-content__container {
        max-width: 1184px;
      }
    }
    @media (min-width: ${unsafeCSS(BreakpointXxl)}) {
      .ct-basic-content__container {
        max-width: 1248px;
      }
    }

    .ct-basic-content hr {
      box-sizing: content-box;
      height: 0;
      overflow: visible;
    }

    .ct-basic-content code,
    .ct-basic-content kbd,
    .ct-basic-content samp,
    .ct-basic-content pre {
      font-family: monospace;
      font-size: 1em;
    }

    .ct-basic-content abbr[title] {
      border-bottom: none;
      text-decoration: underline;
      text-decoration: underline dotted;
    }

    .ct-basic-content b,
    .ct-basic-content strong {
      font-weight: bolder;
    }

    .ct-basic-content small {
      font-size: 80%;
    }

    .ct-basic-content sub,
    .ct-basic-content sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }
    .ct-basic-content sub {
      bottom: -0.25em;
    }
    .ct-basic-content sup {
      top: -0.5em;
    }

    /* Headings */
    .ct-basic-content h1,
    .ct-basic-content h2,
    .ct-basic-content h3,
    .ct-basic-content h4,
    .ct-basic-content h5,
    .ct-basic-content h6 {
      margin: 0;
      font-family: var(--ct-typography-family-heading, sans-serif);
    }
    .ct-basic-content h1 {
      font-size: var(--ct-typography-heading-1-font-size);
      line-height: var(--ct-typography-heading-1-line-height);
      font-weight: var(--ct-typography-heading-1-font-weight);
      letter-spacing: var(--ct-typography-heading-1-letter-spacing);
      margin-bottom: 1.5rem;
    }
    .ct-basic-content h2 {
      font-size: var(--ct-typography-heading-2-font-size);
      line-height: var(--ct-typography-heading-2-line-height);
      font-weight: var(--ct-typography-heading-2-font-weight);
      letter-spacing: var(--ct-typography-heading-2-letter-spacing);
      margin-bottom: 1.5rem;
    }
    .ct-basic-content h3 {
      font-size: var(--ct-typography-heading-3-font-size);
      line-height: var(--ct-typography-heading-3-line-height);
      font-weight: var(--ct-typography-heading-3-font-weight);
      letter-spacing: var(--ct-typography-heading-3-letter-spacing);
      margin-bottom: 1rem;
    }
    .ct-basic-content h4 {
      font-size: var(--ct-typography-heading-4-font-size);
      line-height: var(--ct-typography-heading-4-line-height);
      font-weight: var(--ct-typography-heading-4-font-weight);
      letter-spacing: var(--ct-typography-heading-4-letter-spacing);
      margin-bottom: 1rem;
    }
    .ct-basic-content h5 {
      font-size: var(--ct-typography-heading-5-font-size);
      line-height: var(--ct-typography-heading-5-line-height);
      font-weight: var(--ct-typography-heading-5-font-weight);
      letter-spacing: var(--ct-typography-heading-5-letter-spacing);
      margin-bottom: 0.5rem;
    }
    .ct-basic-content h6 {
      font-size: var(--ct-typography-heading-6-font-size);
      line-height: var(--ct-typography-heading-6-line-height);
      font-weight: var(--ct-typography-heading-6-font-weight);
      letter-spacing: var(--ct-typography-heading-6-letter-spacing);
      margin-bottom: 0.5rem;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-basic-content h1 {
        font-size: var(--ct-typography-heading-1-font-size-desktop);
        line-height: var(--ct-typography-heading-1-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-1-letter-spacing-desktop);
        margin-bottom: 2rem;
      }
      .ct-basic-content h2 {
        font-size: var(--ct-typography-heading-2-font-size-desktop);
        line-height: var(--ct-typography-heading-2-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-2-letter-spacing-desktop);
        margin-bottom: 2rem;
      }
      .ct-basic-content h3 {
        font-size: var(--ct-typography-heading-3-font-size-desktop);
        line-height: var(--ct-typography-heading-3-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-3-letter-spacing-desktop);
        margin-bottom: 1.5rem;
      }
      .ct-basic-content h4 {
        font-size: var(--ct-typography-heading-4-font-size-desktop);
        line-height: var(--ct-typography-heading-4-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-4-letter-spacing-desktop);
        margin-bottom: 1.5rem;
      }
      .ct-basic-content h5 {
        font-size: var(--ct-typography-heading-5-font-size-desktop);
        line-height: var(--ct-typography-heading-5-line-height-desktop);
        letter-spacing: var(--ct-typography-heading-5-letter-spacing-desktop);
        margin-bottom: 1rem;
      }
      .ct-basic-content h6 {
        /* Level 6 has no desktop type-scale override upstream - stays at its base size. */
        margin-bottom: 1rem;
      }
    }

    /* Paragraphs */
    .ct-basic-content p {
      margin-top: var(--ct-basic-content-vertical-spacing);
      margin-bottom: var(--ct-basic-content-vertical-spacing);
    }
    .ct-basic-content p:first-child {
      margin-top: 0;
    }
    .ct-basic-content:last-child p:last-child {
      margin-bottom: 0;
    }

    /* Links (a raw <a> inside prose content; ct-button/ct-link elements are
       excluded upstream since they carry their own complete styling). */
    .ct-basic-content a:not(.ct-button):not(.ct-link) {
      text-decoration: underline;
      text-decoration-thickness: 0.0625rem;
      text-underline-offset: 0.1875rem;
      padding: 0.1875rem 0 0.125rem;
      word-break: break-word;
    }
    .ct-basic-content a:not(.ct-button):not(.ct-link):hover {
      text-decoration: none;
      padding: 0.1875rem 0 0.25rem;
    }

    /* Blockquote */
    .ct-basic-content blockquote {
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
    .ct-basic-content blockquote::before {
      content: '';
      width: 0.375rem;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      border-radius: var(--ct-basic-content-blockquote-border-radius);
    }
    .ct-basic-content blockquote p {
      font-size: var(--ct-typography-quote-font-size);
      line-height: var(--ct-typography-quote-line-height);
      font-family: var(--ct-typography-quote-font-name);
      font-weight: var(--ct-typography-quote-font-weight);
      letter-spacing: var(--ct-typography-quote-letter-spacing);
      margin-bottom: 0;
    }
    .ct-basic-content blockquote cite {
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-family: var(--ct-typography-label-extra-small-font-name);
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
      padding-top: 1rem;
      font-style: normal;
      display: block;
    }
    .ct-basic-content blockquote cite::before {
      content: '-';
      margin-right: 0.25rem;
    }

    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-basic-content blockquote {
        font-size: var(--ct-typography-quote-font-size-desktop);
        line-height: var(--ct-typography-quote-line-height-desktop);
        letter-spacing: var(--ct-typography-quote-letter-spacing-desktop);
      }
      .ct-basic-content blockquote p {
        font-size: var(--ct-typography-quote-font-size-desktop);
        line-height: var(--ct-typography-quote-line-height-desktop);
        letter-spacing: var(--ct-typography-quote-letter-spacing-desktop);
      }
    }

    /* Lists (custom markers - .ct-item-list is a different, separately
       ported component, so plain lists are excluded from that styling). */
    .ct-basic-content ul:not(.ct-item-list) {
      margin-top: var(--ct-basic-content-vertical-spacing);
      margin-bottom: var(--ct-basic-content-vertical-spacing);
      padding: 0;
      list-style: none;
    }
    .ct-basic-content ul:not(.ct-item-list) > li {
      position: relative;
      padding-left: calc(var(--ct-basic-content-list-marker-width) + var(--ct-basic-content-list-marker-margin));
    }
    .ct-basic-content ul:not(.ct-item-list) > li::before {
      content: '';
      position: absolute;
      text-align: center;
      width: 0.4375rem;
      height: 0.4375rem;
      border-radius: 100%;
      top: 0.6875rem;
      left: 0.6875rem;
    }
    .ct-basic-content ol:not(.ct-item-list) {
      margin-top: var(--ct-basic-content-vertical-spacing);
      margin-bottom: var(--ct-basic-content-vertical-spacing);
      counter-reset: ordered_counter;
      padding: 0;
      list-style: none;
    }
    .ct-basic-content ol:not(.ct-item-list) > li {
      counter-increment: ordered_counter;
      padding-left: calc(var(--ct-basic-content-list-marker-width) + var(--ct-basic-content-list-marker-margin));
    }
    .ct-basic-content ol:not(.ct-item-list) > li::before {
      content: counter(ordered_counter);
      display: inline-block;
      text-align: center;
      width: var(--ct-basic-content-list-marker-width);
      margin-left: calc(var(--ct-basic-content-list-marker-width) * -1 - var(--ct-basic-content-list-marker-margin));
      margin-right: var(--ct-basic-content-list-marker-margin);
    }

    /* Images / figures */
    .ct-basic-content img {
      height: auto;
      max-width: 100%;
      margin-top: calc(var(--ct-basic-content-vertical-spacing) * 2);
      margin-bottom: calc(var(--ct-basic-content-vertical-spacing) * 2);
    }
    .ct-basic-content figure {
      margin-top: calc(var(--ct-basic-content-vertical-spacing) * 2);
      margin-bottom: calc(var(--ct-basic-content-vertical-spacing) * 2);
    }
    .ct-basic-content figure img {
      margin-top: 0;
      margin-bottom: 0;
    }

    /* Table (no dedicated ct-table component exists yet - this reproduces
       CivicTheme's generic table styling for a bare <table> pasted into
       rich content, using new component-scoped table.* tokens). */
    .ct-basic-content table {
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
    .ct-basic-content table thead,
    .ct-basic-content table tfoot {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
    }
    .ct-basic-content table tr th,
    .ct-basic-content table tr td {
      padding: 0.75rem 1.5rem;
      vertical-align: var(--ct-table-cell-vertical-align);
    }
    .ct-basic-content table caption {
      text-align: left;
      padding: 0.75rem 0;
      font-size: var(--ct-typography-label-large-font-size);
      line-height: var(--ct-typography-label-large-line-height);
      font-family: var(--ct-typography-label-large-font-name);
      font-weight: var(--ct-typography-label-large-font-weight);
      letter-spacing: var(--ct-typography-label-large-letter-spacing);
    }
    .ct-basic-content table.ct-table--caption-after {
      caption-side: bottom;
    }
    .ct-basic-content table.ct-table--caption-after caption {
      font-size: var(--ct-typography-text-small-font-size);
      line-height: var(--ct-typography-text-small-line-height);
      font-family: var(--ct-typography-text-small-font-name);
      font-weight: var(--ct-typography-text-small-font-weight);
      letter-spacing: var(--ct-typography-text-small-letter-spacing);
    }

    @media (max-width: 767px) {
      .ct-basic-content table:not(.ct-table--data) thead,
      .ct-basic-content table:not(.ct-table--data) tfoot {
        position: absolute;
        clip: rect(0.0625rem, 0.0625rem, 0.0625rem, 0.0625rem);
        overflow: hidden;
        height: 1px;
        width: 1px;
        white-space: nowrap;
      }
      .ct-basic-content table:not(.ct-table--data) tbody tr {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .ct-basic-content table:not(.ct-table--data) tbody tr td {
        border: 0;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: stretch;
      }
      .ct-basic-content table:not(.ct-table--data) tbody tr td::before {
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
      .ct-basic-content table:not(.ct-table--data) tr th,
      .ct-basic-content table:not(.ct-table--data) tr td {
        padding: 0.75rem 0.5rem;
      }
    }

    .ct-basic-content .ct-content-link .ct-icon {
      vertical-align: middle;
    }

    .ct-basic-content .ct-table {
      margin-bottom: var(--ct-basic-content-vertical-spacing);
    }
    .ct-basic-content .ct-table:last-child {
      margin-bottom: 0;
    }

    /* Theme: light */
    .ct-basic-content.ct-theme-light {
      color: var(--ct-basic-content-light-base-color);
    }
    .ct-basic-content.ct-theme-light h1 {
      color: var(--ct-basic-content-light-heading-1-color);
    }
    .ct-basic-content.ct-theme-light h2 {
      color: var(--ct-basic-content-light-heading-2-color);
    }
    .ct-basic-content.ct-theme-light h3 {
      color: var(--ct-basic-content-light-heading-3-color);
    }
    .ct-basic-content.ct-theme-light h4 {
      color: var(--ct-basic-content-light-heading-4-color);
    }
    .ct-basic-content.ct-theme-light h5 {
      color: var(--ct-basic-content-light-heading-5-color);
    }
    .ct-basic-content.ct-theme-light h6 {
      color: var(--ct-basic-content-light-heading-6-color);
    }
    .ct-basic-content.ct-theme-light a:not(.ct-button):not(.ct-link) {
      color: var(--ct-content-link-light-color);
    }
    .ct-basic-content.ct-theme-light a:not(.ct-button):not(.ct-link):focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
    }
    .ct-basic-content.ct-theme-light a:not(.ct-button):not(.ct-link):hover {
      background-color: var(--ct-content-link-light-hover-background-color);
      color: var(--ct-content-link-light-hover-color);
    }
    .ct-basic-content.ct-theme-light a:not(.ct-button):not(.ct-link):visited {
      color: var(--ct-content-link-light-visited-color);
    }
    .ct-basic-content.ct-theme-light a:not(.ct-button):not(.ct-link):visited:hover {
      color: var(--ct-content-link-light-visited-hover-color);
    }
    .ct-basic-content.ct-theme-light blockquote {
      color: var(--ct-basic-content-light-blockquote-color);
      background-color: var(--ct-basic-content-light-blockquote-background-color);
    }
    .ct-basic-content.ct-theme-light blockquote::before {
      background-color: var(--ct-basic-content-light-blockquote-stripe-background-color);
    }
    .ct-basic-content.ct-theme-light blockquote cite {
      color: var(--ct-basic-content-light-blockquote-color);
    }
    .ct-basic-content.ct-theme-light ul:not(.ct-item-list) > li {
      color: var(--ct-basic-content-light-ul-li-color);
    }
    .ct-basic-content.ct-theme-light ul:not(.ct-item-list) > li::before {
      background-color: var(--ct-basic-content-light-ul-li-marker-color);
    }
    .ct-basic-content.ct-theme-light ol:not(.ct-item-list) > li {
      color: var(--ct-basic-content-light-ol-li-color);
    }
    .ct-basic-content.ct-theme-light ol:not(.ct-item-list) > li::before {
      color: var(--ct-basic-content-light-ol-li-marker-color);
    }
    .ct-basic-content.ct-theme-light table {
      color: var(--ct-table-light-color);
      background-color: var(--ct-table-light-background-color);
    }
    .ct-basic-content.ct-theme-light table thead {
      color: var(--ct-table-light-header-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-basic-content.ct-theme-light table thead {
        border-bottom: solid 0.0625rem var(--ct-table-light-header-border-color);
      }
    }
    .ct-basic-content.ct-theme-light table thead tr:last-child {
      border-bottom: solid 0.125rem var(--ct-table-light-header-border-color);
    }
    .ct-basic-content.ct-theme-light table tfoot {
      color: var(--ct-table-light-footer-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-basic-content.ct-theme-light table tfoot {
        border-top: solid 0.0625rem var(--ct-table-light-footer-border-color);
      }
    }
    .ct-basic-content.ct-theme-light table tfoot tr:last-child {
      border-top: solid 0.125rem var(--ct-table-light-footer-border-color);
    }
    .ct-basic-content.ct-theme-light table tbody tr {
      border-bottom: solid 0.0625rem var(--ct-table-light-border-color);
    }
    .ct-basic-content.ct-theme-light table caption {
      color: var(--ct-table-light-caption-color);
    }
    .ct-basic-content.ct-theme-light table.ct-table--data {
      border-top: solid 0.0625rem var(--ct-table-light-footer-border-color);
    }
    .ct-basic-content.ct-theme-light table.ct-table--striped tbody tr:nth-child(odd) {
      background: var(--ct-table-light-row-odd-background-color);
    }
    .ct-basic-content.ct-theme-light table.ct-table--striped tbody tr:nth-child(odd) td {
      color: var(--ct-table-light-row-odd-color);
    }
    .ct-basic-content.ct-theme-light table.ct-table--striped tbody tr:nth-child(even) {
      background: var(--ct-table-light-row-even-background-color);
    }
    .ct-basic-content.ct-theme-light table.ct-table--striped tbody tr:nth-child(even) td {
      color: var(--ct-table-light-row-even-color);
    }
    .ct-basic-content.ct-theme-light.ct-basic-content--with-background {
      background-color: var(--ct-basic-content-light-background-color);
    }

    /* Theme: dark */
    .ct-basic-content.ct-theme-dark {
      color: var(--ct-basic-content-dark-base-color);
    }
    .ct-basic-content.ct-theme-dark h1 {
      color: var(--ct-basic-content-dark-heading-1-color);
    }
    .ct-basic-content.ct-theme-dark h2 {
      color: var(--ct-basic-content-dark-heading-2-color);
    }
    .ct-basic-content.ct-theme-dark h3 {
      color: var(--ct-basic-content-dark-heading-3-color);
    }
    .ct-basic-content.ct-theme-dark h4 {
      color: var(--ct-basic-content-dark-heading-4-color);
    }
    .ct-basic-content.ct-theme-dark h5 {
      color: var(--ct-basic-content-dark-heading-5-color);
    }
    .ct-basic-content.ct-theme-dark h6 {
      color: var(--ct-basic-content-dark-heading-6-color);
    }
    .ct-basic-content.ct-theme-dark a:not(.ct-button):not(.ct-link) {
      color: var(--ct-content-link-dark-color);
    }
    .ct-basic-content.ct-theme-dark a:not(.ct-button):not(.ct-link):focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-dark);
    }
    .ct-basic-content.ct-theme-dark a:not(.ct-button):not(.ct-link):hover {
      background-color: var(--ct-content-link-dark-hover-background-color);
      color: var(--ct-content-link-dark-hover-color);
    }
    .ct-basic-content.ct-theme-dark a:not(.ct-button):not(.ct-link):visited {
      color: var(--ct-content-link-dark-visited-color);
    }
    .ct-basic-content.ct-theme-dark a:not(.ct-button):not(.ct-link):visited:hover {
      color: var(--ct-content-link-dark-visited-hover-color);
    }
    .ct-basic-content.ct-theme-dark blockquote {
      color: var(--ct-basic-content-dark-blockquote-color);
      background-color: var(--ct-basic-content-dark-blockquote-background-color);
    }
    .ct-basic-content.ct-theme-dark blockquote::before {
      background-color: var(--ct-basic-content-dark-blockquote-stripe-background-color);
    }
    .ct-basic-content.ct-theme-dark blockquote cite {
      color: var(--ct-basic-content-dark-blockquote-color);
    }
    .ct-basic-content.ct-theme-dark ul:not(.ct-item-list) > li {
      color: var(--ct-basic-content-dark-ul-li-color);
    }
    .ct-basic-content.ct-theme-dark ul:not(.ct-item-list) > li::before {
      background-color: var(--ct-basic-content-dark-ul-li-marker-color);
    }
    .ct-basic-content.ct-theme-dark ol:not(.ct-item-list) > li {
      color: var(--ct-basic-content-dark-ol-li-color);
    }
    .ct-basic-content.ct-theme-dark ol:not(.ct-item-list) > li::before {
      color: var(--ct-basic-content-dark-ol-li-marker-color);
    }
    .ct-basic-content.ct-theme-dark table {
      color: var(--ct-table-dark-color);
      background-color: var(--ct-table-dark-background-color);
    }
    .ct-basic-content.ct-theme-dark table thead {
      color: var(--ct-table-dark-header-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-basic-content.ct-theme-dark table thead {
        border-bottom: solid 0.0625rem var(--ct-table-dark-header-border-color);
      }
    }
    .ct-basic-content.ct-theme-dark table thead tr:last-child {
      border-bottom: solid 0.125rem var(--ct-table-dark-header-border-color);
    }
    .ct-basic-content.ct-theme-dark table tfoot {
      color: var(--ct-table-dark-footer-color);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-basic-content.ct-theme-dark table tfoot {
        border-top: solid 0.0625rem var(--ct-table-dark-footer-border-color);
      }
    }
    .ct-basic-content.ct-theme-dark table tfoot tr:last-child {
      border-top: solid 0.125rem var(--ct-table-dark-footer-border-color);
    }
    .ct-basic-content.ct-theme-dark table tbody tr {
      border-bottom: solid 0.0625rem var(--ct-table-dark-border-color);
    }
    .ct-basic-content.ct-theme-dark table caption {
      color: var(--ct-table-dark-caption-color);
    }
    .ct-basic-content.ct-theme-dark table.ct-table--data {
      border-top: solid 0.0625rem var(--ct-table-dark-footer-border-color);
    }
    .ct-basic-content.ct-theme-dark table.ct-table--striped tbody tr:nth-child(odd) {
      background: var(--ct-table-dark-row-odd-background-color);
    }
    .ct-basic-content.ct-theme-dark table.ct-table--striped tbody tr:nth-child(odd) td {
      color: var(--ct-table-dark-row-odd-color);
    }
    .ct-basic-content.ct-theme-dark table.ct-table--striped tbody tr:nth-child(even) {
      background: var(--ct-table-dark-row-even-background-color);
    }
    .ct-basic-content.ct-theme-dark table.ct-table--striped tbody tr:nth-child(even) td {
      color: var(--ct-table-dark-row-even-color);
    }
    .ct-basic-content.ct-theme-dark.ct-basic-content--with-background {
      background-color: var(--ct-basic-content-dark-background-color);
    }

    /* Vertical spacing utility (mirrors CivicTheme's .ct-vertical-spacing-inset--*
       utility classes; the desktop step is exactly double the base
       --ct-basic-content-vertical-spacing token, so it's derived via calc()
       rather than a second magic literal). */
    .ct-basic-content--vertical-spacing-top {
      padding-top: var(--ct-basic-content-vertical-spacing);
    }
    .ct-basic-content--vertical-spacing-bottom {
      padding-bottom: var(--ct-basic-content-vertical-spacing);
    }
    .ct-basic-content--vertical-spacing-both {
      padding-top: var(--ct-basic-content-vertical-spacing);
      padding-bottom: var(--ct-basic-content-vertical-spacing);
    }
    .ct-basic-content--vertical-spacing-none {
      padding-top: 0;
      padding-bottom: 0;
    }
    @media (min-width: ${unsafeCSS(BreakpointL)}) {
      .ct-basic-content--vertical-spacing-top {
        padding-top: calc(var(--ct-basic-content-vertical-spacing) * 2);
      }
      .ct-basic-content--vertical-spacing-bottom {
        padding-bottom: calc(var(--ct-basic-content-vertical-spacing) * 2);
      }
      .ct-basic-content--vertical-spacing-both {
        padding-top: calc(var(--ct-basic-content-vertical-spacing) * 2);
        padding-bottom: calc(var(--ct-basic-content-vertical-spacing) * 2);
      }
    }
  `;

  /**
   * Theme variation: light or dark. Drives heading/link/table/blockquote colors.
   */
  @property({ type: String }) theme: BasicContentTheme = 'light';

  /**
   * Trusted HTML content (headings, paragraphs, lists, links, blockquotes,
   * tables, images) - rendered as-is via `unsafeHTML`. Mirrors CivicTheme's
   * `content` Twig slot; callers are responsible for sanitizing this HTML
   * before passing it, exactly as with the original Drupal component.
   */
  @property({ type: String }) content = '';

  /**
   * Disables the centered max-width container wrapper. Upstream's
   * `is_contained` prop defaults to `true` and is only turned off by an
   * explicit `false`; since HTML boolean attributes can't express an
   * explicit "false" via presence/absence, this repo's convention (every
   * other boolean prop defaults `false`) is followed by inverting the name:
   * omit the attribute for the (default, contained) case, add `flush` to
   * opt out.
   */
  @property({ type: Boolean }) flush = false;

  /**
   * Vertical spacing position: top, bottom, both, or none (default: no
   * extra inset padding, matching upstream's unset default).
   */
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: BasicContentVerticalSpacing = '';

  /**
   * Whether to display with a background.
   */
  @property({ type: Boolean, attribute: 'with-background' }) withBackground = false;

  /**
   * Additional custom CSS classes.
   */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.content) {
      return nothing;
    }

    const theme: BasicContentTheme = this.theme === 'dark' ? 'dark' : 'light';
    const spacing = VALID_SPACING.includes(this.verticalSpacing) ? this.verticalSpacing : '';

    const classes = {
      'ct-basic-content': true,
      [`ct-theme-${theme}`]: true,
      'ct-basic-content--with-background': this.withBackground,
      [`ct-basic-content--vertical-spacing-${spacing}`]: !!spacing,
      [this.modifierClass]: !!this.modifierClass,
    };

    const inner = html`${unsafeHTML(this.content)}`;

    return html`
      <div class=${classMap(classes)} data-component-name="basic-content">
        ${this.flush ? inner : html`<div class="ct-basic-content__container">${inner}</div>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-basic-content': CtBasicContent;
  }
}
