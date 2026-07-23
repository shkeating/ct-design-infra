import { html, fixture, expect } from '@open-wc/testing';
import './button.js';

describe('ct-button', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-button label="Test Label"></ct-button>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Label');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-button label="Accessible Label"></ct-button>`);
    await expect(el).to.be.accessible();
  });

  it('lets aria-label override the accessible name for icon-only buttons', async () => {
    const el = await fixture(html`<ct-button icon="download" aria-label="Download report"></ct-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-label')).to.equal('Download report');
    await expect(el).to.be.accessible();
  });
});
