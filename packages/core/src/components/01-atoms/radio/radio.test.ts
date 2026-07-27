import { html, fixture, expect } from '@open-wc/testing';
import './radio.js';
import '../label/label.js';

describe('ct-radio', () => {
  it('renders a native radio input with the given name/id/value', async () => {
    const el = await fixture(
      html`<ct-radio name="contact" id="contact-email" value="email" label="Email"></ct-radio>`,
    );
    expect(el).to.exist;
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input).to.exist;
    expect(input.getAttribute('type')).to.equal('radio');
    expect(input.getAttribute('name')).to.equal('contact');
    expect(input.getAttribute('id')).to.equal('contact-email');
    expect(input.getAttribute('value')).to.equal('email');
  });

  it('renders nothing when name or id is missing', async () => {
    const el = await fixture(html`<ct-radio label="No name or id"></ct-radio>`);
    expect(el.shadowRoot!.querySelector('input')).to.not.exist;
  });

  it('composes a ct-label for its visible label text', async () => {
    const el = await fixture(
      html`<ct-radio name="contact" id="contact-email" label="Email address"></ct-radio>`,
    );
    const label = el.shadowRoot!.querySelector('ct-label')!;
    expect(label).to.exist;
    expect(label.getAttribute('content')).to.equal('Email address');
    expect(label.getAttribute('for')).to.equal('contact-email');
    expect(label.getAttribute('size')).to.equal('small');
  });

  it('mirrors label text onto the input aria-label by default', async () => {
    const el = await fixture(
      html`<ct-radio name="contact" id="contact-email" label="Email address"></ct-radio>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-label')).to.equal('Email address');
  });

  it('lets an explicit aria-label override the label text', async () => {
    const el = await fixture(
      html`<ct-radio name="contact" id="contact-email" label="Email address" aria-label="Custom name"></ct-radio>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-label')).to.equal('Custom name');
  });

  it('reflects the checked state to the native input', async () => {
    const el = await fixture(
      html`<ct-radio name="contact" id="contact-email" label="Email" checked></ct-radio>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.checked).to.be.true;
  });

  it('reflects the invalid state to the class and aria-invalid', async () => {
    const el = await fixture(
      html`<ct-radio name="contact" id="contact-email" label="Email" invalid></ct-radio>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.classList.contains('ct-radio--is-invalid')).to.be.true;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
  });

  it('reflects disabled and required to the native input', async () => {
    const el = await fixture(
      html`<ct-radio name="contact" id="contact-email" label="Email" disabled required></ct-radio>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.be.true;
    expect(input.required).to.be.true;
  });

  it('passes accessibility audits when given a label', async () => {
    const el = await fixture(
      html`<ct-radio name="contact" id="contact-email" label="Email address"></ct-radio>`,
    );
    await expect(el).to.be.accessible();
  });
});
