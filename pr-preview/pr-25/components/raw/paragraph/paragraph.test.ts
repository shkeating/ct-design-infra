import { html, fixture, expect } from '@open-wc/testing';
import './paragraph';

describe('ct-paragraph', () => {
  it('renders provided content', async () => {
    const el = await fixture(html`<ct-paragraph content="Body text"></ct-paragraph>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.querySelector('.ct-paragraph')!.textContent).to.include('Body text');
  });

  it('renders nothing without content', async () => {
    const el = await fixture(html`<ct-paragraph></ct-paragraph>`);
    expect(el.shadowRoot!.querySelector('.ct-paragraph')).to.not.exist;
  });

  it('applies the regular size class by default', async () => {
    const el = await fixture(html`<ct-paragraph content="Text"></ct-paragraph>`);
    expect(el.shadowRoot!.querySelector('.ct-paragraph--regular')).to.exist;
  });

  it('applies the requested size class', async () => {
    const el = await fixture(html`<ct-paragraph content="Text" size="large"></ct-paragraph>`);
    expect(el.shadowRoot!.querySelector('.ct-paragraph--large')).to.exist;
  });

  it('applies the dark theme class', async () => {
    const el = await fixture(html`<ct-paragraph content="Text" theme="dark"></ct-paragraph>`);
    expect(el.shadowRoot!.querySelector('.ct-theme-dark')).to.exist;
  });

  it('applies the no-margin class when requested', async () => {
    const el = await fixture(html`<ct-paragraph content="Text" no-margin></ct-paragraph>`);
    expect(el.shadowRoot!.querySelector('.ct-paragraph--no-margin')).to.exist;
  });

  it('renders arbitrary trusted HTML content', async () => {
    const el = await fixture(html`<ct-paragraph content="<strong>Bold</strong> text"></ct-paragraph>`);
    expect(el.shadowRoot!.querySelector('strong')).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-paragraph content="A paragraph with an <a href='#'>accessible link</a>."></ct-paragraph>`,
    );
    await expect(el).to.be.accessible();
  });
});
