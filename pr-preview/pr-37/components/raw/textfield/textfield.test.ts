import { html, fixture, expect } from '@open-wc/testing';
import './textfield.js';

describe('ct-textfield', () => {
  it('renders an input with the given name', async () => {
    const el = await fixture(html`<ct-textfield name="email" aria-label="Email address"></ct-textfield>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    const input = el.shadowRoot!.querySelector('input');
    expect(input).to.exist;
    expect(input!.getAttribute('name')).to.equal('email');
    expect(input!.getAttribute('type')).to.equal('text');
  });

  it('renders nothing without a name, mirroring upstream textfield.twig', async () => {
    const el = await fixture(html`<ct-textfield aria-label="Email address"></ct-textfield>`);
    expect(el.shadowRoot!.querySelector('input')).to.not.exist;
  });

  it('reflects value, placeholder, id, disabled and required', async () => {
    const el = await fixture(
      html`<ct-textfield
        name="full-name"
        id="full-name"
        value="Ada Lovelace"
        placeholder="Your name"
        required
        aria-label="Full name"
      ></ct-textfield>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('id')).to.equal('full-name');
    expect(input.getAttribute('value')).to.equal('Ada Lovelace');
    expect(input.getAttribute('placeholder')).to.equal('Your name');
    expect(input.hasAttribute('required')).to.be.true;
  });

  it('marks the field invalid via aria-invalid and the invalid modifier class', async () => {
    const el = await fixture(
      html`<ct-textfield name="email" invalid aria-label="Email address"></ct-textfield>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
    expect(input.classList.contains('ct-textfield--is-invalid')).to.be.true;
  });

  it('disables the field', async () => {
    const el = await fixture(
      html`<ct-textfield name="email" disabled aria-label="Email address"></ct-textfield>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.hasAttribute('disabled')).to.be.true;
  });

  it('passes accessibility audits when paired with an aria-label', async () => {
    const el = await fixture(html`<ct-textfield name="email" aria-label="Email address"></ct-textfield>`);
    await expect(el).to.be.accessible();
  });
});
