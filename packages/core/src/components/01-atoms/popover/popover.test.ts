import { html, fixture, expect } from '@open-wc/testing';
import type { CtPopover } from './popover.js';
import './popover.js';
import '../link/link.js';

describe('ct-popover', () => {
  it('renders nothing when content is empty', async () => {
    const el = (await fixture(html`<ct-popover trigger-text="No content"></ct-popover>`)) as CtPopover;
    expect(el.shadowRoot!.textContent!.trim()).to.equal('');
  });

  it('renders a ct-link trigger with the visible trigger text', async () => {
    const el = (await fixture(
      html`<ct-popover trigger-text="More info" content="Extra detail."></ct-popover>`,
    )) as CtPopover;
    const trigger = el.shadowRoot!.querySelector('ct-link');
    expect(trigger).to.exist;
    expect(trigger!.getAttribute('label')).to.equal('More info');
  });

  it('keeps the panel hidden until opened', async () => {
    const el = (await fixture(
      html`<ct-popover trigger-text="More info" content="Extra detail."></ct-popover>`,
    )) as CtPopover;
    const content = el.shadowRoot!.querySelector('.ct-popover__content');
    expect(content!.hasAttribute('hidden')).to.be.true;
  });

  it('renders the panel open when the `open` attribute is set', async () => {
    const el = (await fixture(
      html`<ct-popover trigger-text="More info" content="Extra detail." open></ct-popover>`,
    )) as CtPopover;
    const content = el.shadowRoot!.querySelector('.ct-popover__content');
    expect(content!.hasAttribute('hidden')).to.be.false;
    expect(content!.textContent).to.include('Extra detail.');
  });

  it('renders content-top and content-bottom as trusted HTML', async () => {
    const el = (await fixture(
      html`<ct-popover
        trigger-text="More info"
        content="Main detail."
        content-top="<strong>Top</strong>"
        content-bottom="<em>Bottom</em>"
        open
      ></ct-popover>`,
    )) as CtPopover;
    expect(el.shadowRoot!.querySelector('.ct-popover__content-top strong')).to.exist;
    expect(el.shadowRoot!.querySelector('.ct-popover__content-bottom em')).to.exist;
  });

  it('toggles open/closed when the trigger is clicked', async () => {
    const el = (await fixture(
      html`<ct-popover trigger-text="More info" content="Extra detail."></ct-popover>`,
    )) as CtPopover;
    const trigger = el.shadowRoot!.querySelector('ct-link') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await el.updateComplete;
    const content = el.shadowRoot!.querySelector('.ct-popover__content');
    expect(content!.hasAttribute('hidden')).to.be.false;
  });

  it('closes other popovers in the same group when one opens', async () => {
    const wrapper = await fixture(html`
      <div>
        <ct-popover group="g1" trigger-text="First" content="First detail." open></ct-popover>
        <ct-popover group="g1" trigger-text="Second" content="Second detail."></ct-popover>
      </div>
    `);
    const [first, second] = Array.from(wrapper.querySelectorAll('ct-popover')) as CtPopover[];
    await first.updateComplete;
    await second.updateComplete;

    expect(first.shadowRoot!.querySelector('.ct-popover__content')!.hasAttribute('hidden')).to.be.false;

    const secondTrigger = second.shadowRoot!.querySelector('ct-link') as HTMLElement;
    secondTrigger.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await first.updateComplete;
    await second.updateComplete;

    expect(second.shadowRoot!.querySelector('.ct-popover__content')!.hasAttribute('hidden')).to.be.false;
    expect(first.shadowRoot!.querySelector('.ct-popover__content')!.hasAttribute('hidden')).to.be.true;
  });

  it('passes accessibility audits when closed', async () => {
    const el = await fixture(
      html`<ct-popover trigger-text="Accessible trigger" content="Detail."></ct-popover>`,
    );
    await expect(el).to.be.accessible();
  });

  it('passes accessibility audits when open', async () => {
    const el = await fixture(
      html`<ct-popover trigger-text="Accessible trigger" content="Detail." open></ct-popover>`,
    );
    await expect(el).to.be.accessible();
  });
});
