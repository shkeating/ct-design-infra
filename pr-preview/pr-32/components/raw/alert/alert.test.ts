import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import './alert';
import type { CtAlert } from './alert';

describe('ct-alert', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtAlert>(html`<ct-alert heading="Test Heading" description="Test description"></ct-alert>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Heading');
    expect(el.shadowRoot!.textContent).to.include('Test description');
  });

  it('defaults to the information type and light theme', async () => {
    const el = await fixture<CtAlert>(html`<ct-alert heading="Info"></ct-alert>`);
    const wrapper = el.shadowRoot!.querySelector('.ct-alert');
    expect(wrapper).to.exist;
    expect(wrapper!.classList.contains('ct-theme-light')).to.be.true;
    expect(wrapper!.classList.contains('ct-alert--information')).to.be.true;
    expect(wrapper!.getAttribute('role')).to.equal('alert');
  });

  it('renders the type-specific icon', async () => {
    const el = await fixture<CtAlert>(html`<ct-alert type="warning" heading="Warning"></ct-alert>`);
    const icon = el.shadowRoot!.querySelector('ct-icon');
    expect(icon).to.exist;
    expect(icon!.getAttribute('name')).to.equal('exclamation-mark-2');
  });

  it('renders a dismiss control by default and hides on dismiss', async () => {
    const el = await fixture<CtAlert>(html`<ct-alert heading="Dismiss me" identifier="alert-1"></ct-alert>`);
    const dismissButton = el.shadowRoot!.querySelector('ct-button');
    expect(dismissButton).to.exist;

    setTimeout(() => (dismissButton as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true })));
    const { detail } = await oneEvent(el, 'ct-alert-dismiss');
    expect(detail.identifier).to.equal('alert-1');

    expect(el.shadowRoot!.querySelector('.ct-alert')).to.not.exist;
  });

  it('omits the dismiss control when no-dismiss is set', async () => {
    const el = await fixture<CtAlert>(html`<ct-alert heading="No dismiss" no-dismiss></ct-alert>`);
    expect(el.shadowRoot!.querySelector('ct-button')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-alert heading="Accessible Alert" description="Accessible description"></ct-alert>`);
    await expect(el).to.be.accessible();
  });
});
