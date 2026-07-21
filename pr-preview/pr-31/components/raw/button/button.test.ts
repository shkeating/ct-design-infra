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
});
