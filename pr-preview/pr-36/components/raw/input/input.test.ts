import { html, fixture, expect } from '@open-wc/testing';
import './input.js';

describe('ct-input', () => {
  it('renders a native input with the given name/value/placeholder', async () => {
    const el = await fixture(
      html`<ct-input name="email" value="jane@example.com" placeholder="Enter your email" aria-label="Email address"></ct-input>`,
    );
    expect(el).to.exist;
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input).to.exist;
    expect(input.getAttribute('name')).to.equal('email');
    expect(input.getAttribute('value')).to.equal('jane@example.com');
    expect(input.getAttribute('placeholder')).to.equal('Enter your email');
  });

  it('defaults to type="text"', async () => {
    const el = await fixture(html`<ct-input name="q" aria-label="Search"></ct-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('type')).to.equal('text');
  });

  it('reflects the invalid state to the class and aria-invalid', async () => {
    const el = await fixture(html`<ct-input name="email" invalid aria-label="Email address"></ct-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.classList.contains('ct-input--is-invalid')).to.be.true;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
  });

  it('reflects disabled and required to the native input', async () => {
    const el = await fixture(html`<ct-input name="email" disabled required aria-label="Email address"></ct-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.be.true;
    expect(input.required).to.be.true;
  });

  it('passes accessibility audits when given an accessible name', async () => {
    const el = await fixture(html`<ct-input name="email" aria-label="Email address"></ct-input>`);
    await expect(el).to.be.accessible();
  });

  it('lets aria-label provide the accessible name', async () => {
    const el = await fixture(html`<ct-input name="email" aria-label="Email address"></ct-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-label')).to.equal('Email address');
  });
});
