import { html, fixture, expect } from '@open-wc/testing';
import './heading.js';

describe('ct-heading', () => {
  it('renders correctly with default level (h2)', async () => {
    const el = await fixture(html`<ct-heading content="Test Heading"></ct-heading>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Heading');
    expect(el.shadowRoot!.querySelector('h2')).to.exist;
  });

  it('renders the tag matching the level attribute', async () => {
    const el = await fixture(html`<ct-heading content="Big Title" level="1"></ct-heading>`);
    expect(el.shadowRoot!.querySelector('h1')).to.exist;
    expect(el.shadowRoot!.querySelector('h1')!.textContent).to.include('Big Title');
  });

  it('falls back to level 2 for an invalid level', async () => {
    const el = await fixture(html`<ct-heading content="Fallback" level="9"></ct-heading>`);
    expect(el.shadowRoot!.querySelector('h2')).to.exist;
  });

  it('renders nothing when content is empty', async () => {
    const el = await fixture(html`<ct-heading></ct-heading>`);
    expect(el.shadowRoot!.textContent!.trim()).to.equal('');
  });

  it('applies the dark theme class', async () => {
    const el = await fixture(html`<ct-heading content="Dark Heading" theme="dark"></ct-heading>`);
    const heading = el.shadowRoot!.querySelector('.ct-theme-dark');
    expect(heading).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-heading content="Accessible Heading" level="1"></ct-heading>`);
    await expect(el).to.be.accessible();
  });
});
