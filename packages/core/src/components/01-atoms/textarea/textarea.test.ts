import { html, fixture, expect } from '@open-wc/testing';
import './textarea';

describe('ct-textarea', () => {
  it('renders a native textarea when name is set', async () => {
    const el = await fixture(html`<ct-textarea name="message" placeholder="Enter your message"></ct-textarea>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    const textarea = el.shadowRoot!.querySelector('textarea');
    expect(textarea).to.exist;
    expect(textarea!.getAttribute('name')).to.equal('message');
    expect(textarea!.getAttribute('placeholder')).to.equal('Enter your message');
  });

  it('renders nothing when name is empty, mirroring the reference twig guard', async () => {
    const el = await fixture(html`<ct-textarea></ct-textarea>`);
    expect(el.shadowRoot!.querySelector('textarea')).to.not.exist;
  });

  it('reflects invalid, disabled and required states', async () => {
    const el = await fixture(
      html`<ct-textarea name="message" is-invalid is-disabled is-required></ct-textarea>`,
    );
    const textarea = el.shadowRoot!.querySelector('textarea')!;
    expect(textarea.getAttribute('aria-invalid')).to.equal('true');
    expect(textarea.hasAttribute('disabled')).to.be.true;
    expect(textarea.hasAttribute('required')).to.be.true;
  });

  it('passes accessibility audits with an accessible name', async () => {
    const el = await fixture(
      html`<ct-textarea name="message" aria-label="Accessible Label"></ct-textarea>`,
    );
    await expect(el).to.be.accessible();
  });
});
