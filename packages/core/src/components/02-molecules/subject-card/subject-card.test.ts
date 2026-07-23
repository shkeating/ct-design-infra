import { html, fixture, expect } from '@open-wc/testing';
import './subject-card';
import '../../01-atoms/image/image';
import type { CtSubjectCard } from './subject-card';

describe('ct-subject-card', () => {
  it('renders the heading text', async () => {
    const el = await fixture<CtSubjectCard>(html`<ct-subject-card heading="Test Subject"></ct-subject-card>`);
    expect(el.shadowRoot!.textContent).to.include('Test Subject');
  });

  it('renders nothing when heading is empty', async () => {
    const el = await fixture<CtSubjectCard>(html`<ct-subject-card></ct-subject-card>`);
    expect(el.shadowRoot!.querySelector('.ct-subject-card')).to.not.exist;
  });

  it('applies the theme class', async () => {
    const el = await fixture<CtSubjectCard>(html`<ct-subject-card heading="Themed" theme="dark"></ct-subject-card>`);
    expect(el.shadowRoot!.querySelector('.ct-subject-card')!.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('renders the title as a link when link-url is set, and marks the card clickable', async () => {
    const el = await fixture<CtSubjectCard>(
      html`<ct-subject-card heading="Linked" link-url="https://example.com"></ct-subject-card>`,
    );
    const link = el.shadowRoot!.querySelector('a.ct-subject-card__title-link') as HTMLAnchorElement;
    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('https://example.com');
    expect(el.shadowRoot!.querySelector('.ct-subject-card')!.classList.contains('ct-subject-card--card-clickable')).to.be
      .true;
  });

  it('renders the title as plain text when no link-url is set', async () => {
    const el = await fixture<CtSubjectCard>(html`<ct-subject-card heading="Unlinked"></ct-subject-card>`);
    expect(el.shadowRoot!.querySelector('a.ct-subject-card__title-link')).to.not.exist;
    expect(el.shadowRoot!.textContent).to.include('Unlinked');
  });

  it('does not mark the card clickable when title-click is set, even with a link', async () => {
    const el = await fixture<CtSubjectCard>(
      html`<ct-subject-card heading="Title only" link-url="https://example.com" title-click></ct-subject-card>`,
    );
    expect(el.shadowRoot!.querySelector('.ct-subject-card')!.classList.contains('ct-subject-card--card-clickable')).to.be
      .false;
    expect(el.shadowRoot!.querySelector('a.ct-subject-card__title-link')).to.exist;
  });

  it('opens the link in a new window when link-new-window is set', async () => {
    const el = await fixture<CtSubjectCard>(
      html`<ct-subject-card heading="New window" link-url="https://example.com" link-new-window></ct-subject-card>`,
    );
    const link = el.shadowRoot!.querySelector('a.ct-subject-card__title-link') as HTMLAnchorElement;
    expect(link.getAttribute('target')).to.equal('_blank');
  });

  it('composes ct-image when image-url is set', async () => {
    const el = await fixture<CtSubjectCard>(
      html`<ct-subject-card heading="With image" image-url="/test.jpg" image-alt="A test image"></ct-subject-card>`,
    );
    const image = el.shadowRoot!.querySelector('ct-image');
    expect(image).to.exist;
    expect(image!.getAttribute('url')).to.equal('/test.jpg');
    expect(image!.getAttribute('alt')).to.equal('A test image');
  });

  it('does not render ct-image when image-url is empty', async () => {
    const el = await fixture<CtSubjectCard>(html`<ct-subject-card heading="No image"></ct-subject-card>`);
    expect(el.shadowRoot!.querySelector('ct-image')).to.not.exist;
  });

  it('applies additional modifier classes', async () => {
    const el = await fixture<CtSubjectCard>(
      html`<ct-subject-card heading="Modified" modifier-class="custom-class"></ct-subject-card>`,
    );
    expect(el.shadowRoot!.querySelector('.ct-subject-card')!.classList.contains('custom-class')).to.be.true;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-subject-card
        heading="Accessible subject card"
        image-url="/test.jpg"
        image-alt="A test image"
        link-url="https://example.com"
      ></ct-subject-card>`,
    );
    await expect(el).to.be.accessible();
  });
});
