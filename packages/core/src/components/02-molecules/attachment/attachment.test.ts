import { html, fixture, expect } from '@open-wc/testing';
import type { CtAttachment } from './attachment.js';
import './attachment.js';
import './attachment-file.js';

const markup = html`
  <ct-attachment theme="light" title="Attachments" content="Some supporting text.">
    <ct-attachment-file
      name="Document.doc"
      ext="doc"
      size="42.88 KB"
      changed="2022-01-01"
      icon="word-file"
      url="https://example.com/document.doc"
    ></ct-attachment-file>
    <ct-attachment-file
      name="Document.pdf"
      ext="pdf"
      size="42.82 KB"
      icon="pdf-file"
      url="https://example.com/document.pdf"
    ></ct-attachment-file>
    <ct-attachment-file name="Document" url="https://example.com/document"></ct-attachment-file>
  </ct-attachment>
`;

describe('ct-attachment', () => {
  it('renders one link item per ct-attachment-file child', async () => {
    const el = (await fixture(markup)) as CtAttachment;
    const items = el.shadowRoot!.querySelectorAll('.ct-attachment__links__item');
    expect(items.length).to.equal(3);
  });

  it('renders the title (via ct-heading) and content', async () => {
    const el = (await fixture(markup)) as CtAttachment;
    // The title renders through a nested <ct-heading>, whose text lives in its own shadow
    // root - not reachable via el.shadowRoot.textContent, which doesn't pierce nested
    // shadow boundaries. Check the heading's `content` prop directly instead.
    const heading = el.shadowRoot!.querySelector('ct-heading');
    expect(heading).to.exist;
    expect((heading as HTMLElement & { content: string }).content).to.equal('Attachments');
    expect(el.shadowRoot!.textContent).to.include('Some supporting text.');
  });

  it('renders a download link per file with the correct href and accessible title', async () => {
    const el = (await fixture(markup)) as CtAttachment;
    const link = el.shadowRoot!.querySelector('ct-link');
    expect(link).to.exist;
    await (link as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete;
    const anchor = link!.shadowRoot!.querySelector('a')!;
    expect(anchor.getAttribute('href')).to.equal('https://example.com/document.doc');
    expect(anchor.getAttribute('title')).to.equal('Download Document.doc');
  });

  it('shows extension and size when both are present, and falls back to whichever is present', async () => {
    const el = (await fixture(markup)) as CtAttachment;
    const extensions = Array.from(el.shadowRoot!.querySelectorAll('.ct-attachment__links__link__extension')).map(
      (node) => node.textContent,
    );
    expect(extensions).to.include('(doc, 42.88 KB)');
    expect(extensions).to.include('(pdf, 42.82 KB)');
  });

  it('defaults a file with no icon to the download-file icon', async () => {
    const el = (await fixture(markup)) as CtAttachment;
    const icons = el.shadowRoot!.querySelectorAll('ct-icon');
    expect(icons[2].getAttribute('name')).to.equal('download-file');
  });

  it('renders nothing when it has no ct-attachment-file children', async () => {
    const el = await fixture(html`<ct-attachment title="Empty"></ct-attachment>`);
    expect(el.shadowRoot!.textContent!.trim()).to.equal('');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
