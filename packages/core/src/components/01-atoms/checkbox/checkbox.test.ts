import { html, fixture, expect } from '@open-wc/testing';
import './checkbox';
import '../label/label';

describe('ct-checkbox', () => {
  it('renders a native checkbox input when name and id are set', async () => {
    const el = await fixture(html`<ct-checkbox name="terms" id="terms" label="I agree"></ct-checkbox>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    const input = el.shadowRoot!.querySelector('input[type="checkbox"]');
    expect(input).to.exist;
    expect(input!.getAttribute('name')).to.equal('terms');
    expect(input!.getAttribute('id')).to.equal('terms');
  });

  it('renders nothing when name or id is empty, mirroring the reference twig guard', async () => {
    const noName = await fixture(html`<ct-checkbox id="terms" label="I agree"></ct-checkbox>`);
    expect(noName.shadowRoot!.querySelector('input')).to.not.exist;

    const noId = await fixture(html`<ct-checkbox name="terms" label="I agree"></ct-checkbox>`);
    expect(noId.shadowRoot!.querySelector('input')).to.not.exist;
  });

  it('composes a real ct-label element for its caption', async () => {
    const el = await fixture(
      html`<ct-checkbox name="terms" id="terms" label="I agree to the terms"></ct-checkbox>`,
    );
    const label = el.shadowRoot!.querySelector('ct-label');
    expect(label).to.exist;
    expect(label!.getAttribute('content')).to.equal('I agree to the terms');
    expect(label!.getAttribute('for')).to.equal('terms');
  });

  it('renders no ct-label when label is empty', async () => {
    const el = await fixture(html`<ct-checkbox name="terms" id="terms"></ct-checkbox>`);
    expect(el.shadowRoot!.querySelector('ct-label')).to.not.exist;
  });

  it('reflects checked, required, invalid and disabled states', async () => {
    const el = await fixture(
      html`<ct-checkbox
        name="terms"
        id="terms"
        label="I agree"
        is-checked
        is-required
        is-invalid
        is-disabled
      ></ct-checkbox>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.hasAttribute('checked')).to.be.true;
    expect(input.hasAttribute('required')).to.be.true;
    expect(input.hasAttribute('disabled')).to.be.true;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
    expect(input.classList.contains('ct-checkbox--is-invalid')).to.be.true;
  });

  it('defaults the accessible name from label when aria-label is unset', async () => {
    const el = await fixture(
      html`<ct-checkbox name="terms" id="terms" label="I agree to the terms"></ct-checkbox>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-label')).to.equal('I agree to the terms');
  });

  it('lets an explicit aria-label override the default', async () => {
    const el = await fixture(
      html`<ct-checkbox
        name="terms"
        id="terms"
        label="I agree to the terms"
        aria-label="Accept terms and conditions"
      ></ct-checkbox>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-label')).to.equal('Accept terms and conditions');
  });

  it('passes accessibility audits with a composed label', async () => {
    const el = await fixture(
      html`<ct-checkbox name="terms" id="terms" label="I agree to the terms and conditions"></ct-checkbox>`,
    );
    await expect(el).to.be.accessible();
  });
});
