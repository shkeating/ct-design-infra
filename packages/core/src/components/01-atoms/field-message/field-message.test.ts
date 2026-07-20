import { html, fixture, expect } from '@open-wc/testing';
import './field-message.js';

describe('ct-field-message', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-field-message content="Test message"></ct-field-message>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test message');
  });

  it('renders nothing when content is empty', async () => {
    const el = await fixture(html`<ct-field-message></ct-field-message>`);
    expect(el.shadowRoot!.querySelector('.ct-field-message')).to.not.exist;
  });

  it('defaults to the information type and renders its icon', async () => {
    const el = await fixture(html`<ct-field-message content="Heads up"></ct-field-message>`);
    const icon = el.shadowRoot!.querySelector('ct-icon');
    expect(icon).to.exist;
    expect(icon!.getAttribute('name')).to.equal('information-mark');
  });

  it('maps each type to its CivicTheme icon', async () => {
    const cases: Array<[string, string]> = [
      ['error', 'close-outline'],
      ['warning', 'exclamation-mark-3'],
      ['success', 'approve'],
      ['information', 'information-mark'],
    ];

    for (const [type, iconName] of cases) {
      const el = await fixture(html`<ct-field-message type=${type} content="Message"></ct-field-message>`);
      const icon = el.shadowRoot!.querySelector('ct-icon');
      expect(icon!.getAttribute('name')).to.equal(iconName);
    }
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-field-message type="error" content="Accessible message"></ct-field-message>`);
    await expect(el).to.be.accessible();
  });
});
