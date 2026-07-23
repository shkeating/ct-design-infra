import { html, fixture, expect } from '@open-wc/testing';
import type { CtPublicationCard } from './publication-card.js';
import './publication-card.js';

const markup = html`
  <ct-publication-card
    theme="light"
    title="Annual Report 2025"
    summary="<p>A summary of the report.</p>"
    image-url="https://example.com/cover.jpg"
    image-alt="Report cover"
    file-name="Annual-Report-2025.pdf"
    file-url="https://example.com/annual-report-2025.pdf"
    file-ext="pdf"
    file-size="2.4 MB"
  ></ct-publication-card>
`;

describe('ct-publication-card', () => {
  it('renders nothing when no file-* attribute is set', async () => {
    const el = (await fixture(html`<ct-publication-card title="No file here"></ct-publication-card>`)) as CtPublicationCard;
    expect(el.shadowRoot!.querySelector('.ct-publication-card')).to.not.exist;
  });

  it('renders the title as a link to the file when a file url and title are present', async () => {
    const el = (await fixture(markup)) as CtPublicationCard;
    const link = el.shadowRoot!.querySelector('.ct-publication-card__title-link');
    expect(link).to.exist;
    expect(link!.getAttribute('href')).to.equal('https://example.com/annual-report-2025.pdf');
    expect(link!.textContent).to.include('Annual Report 2025');
  });

  it('marks the card clickable when a file url and title are present and is-title-click is not set', async () => {
    const el = (await fixture(markup)) as CtPublicationCard;
    expect(el.shadowRoot!.querySelector('.ct-publication-card')!.classList.contains('ct-publication-card--card-clickable'))
      .to.be.true;
  });

  it('does not mark the card clickable when is-title-click is set', async () => {
    const el = (await fixture(html`
      <ct-publication-card title="Report" file-url="https://example.com/f.pdf" is-title-click></ct-publication-card>
    `)) as CtPublicationCard;
    expect(el.shadowRoot!.querySelector('.ct-publication-card')!.classList.contains('ct-publication-card--card-clickable'))
      .to.be.false;
  });

  it('renders a ct-image thumbnail only when image-url is set', async () => {
    const el = (await fixture(markup)) as CtPublicationCard;
    const image = el.shadowRoot!.querySelector('ct-image');
    expect(image).to.exist;
    expect(image!.getAttribute('url')).to.equal('https://example.com/cover.jpg');

    const noImage = (await fixture(
      html`<ct-publication-card title="No image" file-name="f.pdf"></ct-publication-card>`,
    )) as CtPublicationCard;
    expect(noImage.shadowRoot!.querySelector('ct-image')).to.not.exist;
  });

  it('renders the summary via ct-paragraph', async () => {
    const el = (await fixture(markup)) as CtPublicationCard;
    const paragraph = el.shadowRoot!.querySelector('ct-paragraph');
    expect(paragraph).to.exist;
    expect(paragraph!.getAttribute('content')).to.equal('<p>A summary of the report.</p>');
  });

  it('renders the download icon via ct-icon', async () => {
    const el = (await fixture(markup)) as CtPublicationCard;
    expect(el.shadowRoot!.querySelector('ct-icon[name="download"]')).to.exist;
  });

  it('renders the filename as plain text with a visually-hidden prefix when a title is present', async () => {
    const el = (await fixture(markup)) as CtPublicationCard;
    const filename = el.shadowRoot!.querySelector('.ct-publication-card__filename');
    expect(filename).to.exist;
    expect(filename!.textContent).to.include('Annual-Report-2025.pdf');
    expect(filename!.textContent).to.include('(pdf, 2.4 MB)');
    expect(filename!.querySelector('.ct-visually-hidden')!.textContent).to.equal('File details:');
  });

  it('renders the filename as a ct-link when no title is present', async () => {
    const el = (await fixture(html`
      <ct-publication-card file-name="Report.pdf" file-url="https://example.com/r.pdf" file-ext="pdf"></ct-publication-card>
    `)) as CtPublicationCard;
    expect(el.shadowRoot!.querySelector('.ct-publication-card__filename')).to.not.exist;
    const link = el.shadowRoot!.querySelector('ct-link');
    expect(link).to.exist;
    expect(link!.getAttribute('label')).to.equal('Report.pdf (pdf)');
  });

  it('renders slotted content-top/content-middle/content-bottom only when provided', async () => {
    const el = (await fixture(html`
      <ct-publication-card title="With slots" file-name="f.pdf">
        <div slot="content-top">Top</div>
        <div slot="content-middle">Middle</div>
        <div slot="content-bottom">Bottom</div>
      </ct-publication-card>
    `)) as CtPublicationCard;
    expect(el.shadowRoot!.querySelector('.ct-publication-card__content-top')).to.exist;
    expect(el.shadowRoot!.querySelector('.ct-publication-card__content__middle')).to.exist;
    expect(el.shadowRoot!.querySelector('.ct-publication-card__content-bottom')).to.exist;
  });

  it('applies the theme to the root element', async () => {
    const el = (await fixture(html`
      <ct-publication-card theme="dark" title="Dark" file-name="f.pdf"></ct-publication-card>
    `)) as CtPublicationCard;
    expect(el.shadowRoot!.querySelector('.ct-publication-card')!.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
