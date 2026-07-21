import { html, fixture, expect } from '@open-wc/testing';
import './label.js';
import type { CtLabel } from './label.js';

describe('ct-label', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-label content="Test Label"></ct-label>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Label');
  });

  it('renders a label element by default', async () => {
    const el = await fixture<CtLabel>(html`<ct-label content="Test Label"></ct-label>`);
    expect(el.shadowRoot!.querySelector('label.ct-label')).to.exist;
  });

  it('renders a legend element when tag is "legend"', async () => {
    const el = await fixture<CtLabel>(html`<ct-label content="Test Label" tag="legend"></ct-label>`);
    expect(el.shadowRoot!.querySelector('legend.ct-label')).to.exist;
    expect(el.shadowRoot!.querySelector('label.ct-label')).to.not.exist;
  });

  it('applies the for attribute when tag is "label"', async () => {
    const el = await fixture<CtLabel>(html`<ct-label content="Email" for="email-field"></ct-label>`);
    const label = el.shadowRoot!.querySelector('label.ct-label')!;
    expect(label.getAttribute('for')).to.equal('email-field');
  });

  it('does not apply the for attribute when tag is "legend"', async () => {
    const el = await fixture<CtLabel>(html`<ct-label content="Email" tag="legend" for="email-field"></ct-label>`);
    const legend = el.shadowRoot!.querySelector('legend.ct-label')!;
    expect(legend.hasAttribute('for')).to.be.false;
  });

  it('shows the required text when required is set', async () => {
    const el = await fixture<CtLabel>(html`<ct-label content="Email" required></ct-label>`);
    const required = el.shadowRoot!.querySelector('.ct-label__required');
    expect(required).to.exist;
    expect(required!.textContent).to.equal('(required)');
  });

  it('uses custom required text when provided', async () => {
    const el = await fixture<CtLabel>(
      html`<ct-label content="Email" required required-text="(mandatory)"></ct-label>`,
    );
    const required = el.shadowRoot!.querySelector('.ct-label__required');
    expect(required!.textContent).to.equal('(mandatory)');
  });

  it('applies the theme and size classes', async () => {
    const el = await fixture<CtLabel>(
      html`<ct-label content="Test Label" theme="dark" size="large"></ct-label>`,
    );
    const label = el.shadowRoot!.querySelector('.ct-label')!;
    expect(label.classList.contains('ct-theme-dark')).to.be.true;
    expect(label.classList.contains('ct-label--large')).to.be.true;
  });

  it('renders nothing when content is empty', async () => {
    const el = await fixture<CtLabel>(html`<ct-label></ct-label>`);
    expect(el.shadowRoot!.querySelector('.ct-label')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-label content="Accessible Label"></ct-label>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility audits when required', async () => {
    const el = await fixture(html`<ct-label content="Accessible Label" required></ct-label>`);
    await expect(el).to.be.accessible();
  });
});
