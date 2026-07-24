import { html, fixture, expect } from '@open-wc/testing';
import './basic-content';

describe('ct-basic-content', () => {
  it('renders provided HTML content', async () => {
    const el = await fixture(html`<ct-basic-content content="<h2>Heading</h2><p>Body text</p>"></ct-basic-content>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.querySelector('h2')).to.exist;
    expect(el.shadowRoot!.querySelector('p')!.textContent).to.include('Body text');
  });

  it('wraps content in a centered container by default', async () => {
    const el = await fixture(html`<ct-basic-content content="<p>Text</p>"></ct-basic-content>`);
    expect(el.shadowRoot!.querySelector('.ct-basic-content__container')).to.exist;
  });

  it('omits the container wrapper when flush', async () => {
    const el = await fixture(html`<ct-basic-content content="<p>Text</p>" flush></ct-basic-content>`);
    expect(el.shadowRoot!.querySelector('.ct-basic-content__container')).to.not.exist;
  });

  it('applies the dark theme class', async () => {
    const el = await fixture(html`<ct-basic-content content="<p>Text</p>" theme="dark"></ct-basic-content>`);
    expect(el.shadowRoot!.querySelector('.ct-theme-dark')).to.exist;
  });

  it('renders nothing without content', async () => {
    const el = await fixture(html`<ct-basic-content></ct-basic-content>`);
    expect(el.shadowRoot!.querySelector('.ct-basic-content')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-basic-content
        content="<h2>Accessible section</h2><p>A paragraph with an <a href='#'>accessible link</a>.</p>"
      ></ct-basic-content>`,
    );
    await expect(el).to.be.accessible();
  });
});
