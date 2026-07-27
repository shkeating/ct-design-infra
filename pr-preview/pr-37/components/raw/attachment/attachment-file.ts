import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single file entry of a `ct-attachment`. This element is a pure data carrier - it has no
 * light-DOM children to project and never renders anything itself (`display: none`); the
 * parent `ct-attachment` reads its properties (name, ext, url, size, changed, icon) directly
 * to build the visible links list in its own shadow root.
 */
@customElement('ct-attachment-file')
export class CtAttachmentFile extends LitElement {
  static styles = css`
    :host {
      display: none;
    }
  `;

  /** File name, as it should appear to the user (e.g. "Document.docx"). */
  @property({ type: String }) name = '';

  /** File extension, shown alongside size in the links list (e.g. "docx"). */
  @property({ type: String }) ext?: string;

  /** File URL the link points to. */
  @property({ type: String }) url?: string;

  /** File size, as it should appear to the user (e.g. "32.48 KB"). */
  @property({ type: String }) size?: string;

  /** File created date. Accepted for schema parity with CivicTheme's `files[].created` - not rendered upstream either. */
  @property({ type: String }) created?: string;

  /** File modified date, rendered as "LAST UPDATED: {changed}" below the link. */
  @property({ type: String }) changed?: string;

  /** Name of the `ct-icon` to render next to the link. Defaults to "download-file" when unset. */
  @property({ type: String }) icon?: string;

  render() {
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-attachment-file': CtAttachmentFile;
  }
}
