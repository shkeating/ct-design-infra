import { html, fixture, expect } from '@open-wc/testing';
import './navigation-card.js';

describe('ct-navigation-card', () => {
  it('renders the title and summary', async () => {
    const el = await fixture(
      html`<ct-navigation-card title="Apply for a permit" summary="Do it online in a few minutes."></ct-navigation-card>`,
    );
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.querySelector('.ct-navigation-card__title')!.textContent).to.include('Apply for a permit');

    const paragraph = el.shadowRoot!.querySelector('ct-paragraph');
    expect(paragraph).to.exist;
    expect(paragraph!.getAttribute('content')).to.equal('Do it online in a few minutes.');
  });

  it('renders nothing when title is empty', async () => {
    const el = await fixture(html`<ct-navigation-card></ct-navigation-card>`);
    expect(el.shadowRoot!.textContent!.trim()).to.equal('');
  });

  it('renders the title as a link and makes the whole card clickable when link-url is set', async () => {
    const el = await fixture(
      html`<ct-navigation-card title="Register to vote" link-url="https://example.com" link-new-window></ct-navigation-card>`,
    );
    const link = el.shadowRoot!.querySelector('a.ct-navigation-card__title-link');
    expect(link).to.exist;
    expect(link!.getAttribute('href')).to.equal('https://example.com');
    expect(link!.getAttribute('target')).to.equal('_blank');
    expect(el.shadowRoot!.querySelector('.ct-navigation-card--card-clickable')).to.exist;
    // The trailing arrow graphic only appears when the whole card is clickable.
    expect(el.shadowRoot!.querySelector('.ct-navigation-card__link-graphic')).to.exist;
  });

  it('restricts the clickable area to the title when is-title-click is set', async () => {
    const el = await fixture(
      html`<ct-navigation-card title="Register to vote" link-url="https://example.com" is-title-click></ct-navigation-card>`,
    );
    expect(el.shadowRoot!.querySelector('.ct-navigation-card--card-clickable')).to.not.exist;
    expect(el.shadowRoot!.querySelector('.ct-navigation-card__link-graphic')).to.not.exist;
  });

  it('renders an icon when icon is set', async () => {
    const el = await fixture(html`<ct-navigation-card title="With icon" icon="megaphone"></ct-navigation-card>`);
    const icon = el.shadowRoot!.querySelector('.ct-navigation-card__icon > ct-icon');
    expect(icon).to.exist;
    expect(icon!.getAttribute('name')).to.equal('megaphone');
    expect(icon!.getAttribute('size')).to.equal('extra-large');
  });

  it('renders the image via ct-image when image-url is set', async () => {
    const el = await fixture(
      html`<ct-navigation-card title="With image" image-url="https://example.com/a.jpg" image-alt="Alt text"></ct-navigation-card>`,
    );
    const image = el.shadowRoot!.querySelector('.ct-navigation-card__image ct-image');
    expect(image).to.exist;
    expect(image!.getAttribute('url')).to.equal('https://example.com/a.jpg');
    expect(image!.getAttribute('alt')).to.equal('Alt text');
  });

  it('renders the image as a small inline icon when image-as-icon is set', async () => {
    const el = await fixture(
      html`<ct-navigation-card
        title="Image as icon"
        image-url="https://example.com/a.jpg"
        image-as-icon
      ></ct-navigation-card>`,
    );
    expect(el.shadowRoot!.querySelector('.ct-navigation-card__image')).to.not.exist;
    expect(el.shadowRoot!.querySelector('.ct-navigation-card__icon__image ct-image')).to.exist;
  });

  it('applies the dark theme class', async () => {
    const el = await fixture(html`<ct-navigation-card title="Dark example" theme="dark"></ct-navigation-card>`);
    expect(el.shadowRoot!.querySelector('.ct-theme-dark')).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-navigation-card
        title="Accessible card"
        summary="Some helpful body copy."
        link-url="https://example.com"
      ></ct-navigation-card>`,
    );
    await expect(el).to.be.accessible();
  });
});
