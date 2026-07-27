import { html, fixture, expect } from '@open-wc/testing';
import type { CtTooltip } from './tooltip.js';
import './tooltip.js';

describe('ct-tooltip', () => {
  it('renders nothing when content is empty', async () => {
    const el = (await fixture(html`<ct-tooltip label="No content"></ct-tooltip>`)) as CtTooltip;
    expect(el.shadowRoot!.textContent!.trim()).to.equal('');
  });

  it('renders a trigger button with the icon and accessible name', async () => {
    const el = (await fixture(
      html`<ct-tooltip label="More info" content="Extra detail."></ct-tooltip>`,
    )) as CtTooltip;
    const trigger = el.shadowRoot!.querySelector('.ct-tooltip__button');
    expect(trigger).to.exist;
    expect(trigger!.getAttribute('aria-label')).to.equal('More info');
    expect(trigger!.getAttribute('title')).to.equal('More info');
    expect(trigger!.querySelector('ct-icon')).to.exist;
  });

  it('keeps the popup hidden until opened', async () => {
    const el = (await fixture(
      html`<ct-tooltip label="More info" content="Extra detail."></ct-tooltip>`,
    )) as CtTooltip;
    const description = el.shadowRoot!.querySelector('.ct-tooltip__description');
    expect(description!.hasAttribute('hidden')).to.be.true;
  });

  it('renders the popup open when the `open` attribute is set', async () => {
    const el = (await fixture(
      html`<ct-tooltip label="More info" content="Extra detail." open></ct-tooltip>`,
    )) as CtTooltip;
    const description = el.shadowRoot!.querySelector('.ct-tooltip__description');
    expect(description!.hasAttribute('hidden')).to.be.false;
    expect(description!.textContent).to.include('Extra detail.');
  });

  it('composes the real ct-button as the dismiss control', async () => {
    const el = (await fixture(
      html`<ct-tooltip label="More info" content="Extra detail." open></ct-tooltip>`,
    )) as CtTooltip;
    const closeButton = el.shadowRoot!.querySelector('.ct-tooltip__description__close ct-button');
    expect(closeButton).to.exist;
    expect(closeButton!.getAttribute('icon')).to.equal('cancel');
  });

  it('closes when the dismiss control is clicked', async () => {
    const el = (await fixture(
      html`<ct-tooltip label="More info" content="Extra detail." open></ct-tooltip>`,
    )) as CtTooltip;
    const closeButton = el.shadowRoot!.querySelector(
      '.ct-tooltip__description__close ct-button',
    ) as HTMLElement;
    closeButton.click();
    await el.updateComplete;
    const description = el.shadowRoot!.querySelector('.ct-tooltip__description');
    expect(description!.hasAttribute('hidden')).to.be.true;
  });

  it('passes accessibility audits when closed', async () => {
    const el = await fixture(html`<ct-tooltip label="Accessible label" content="Detail."></ct-tooltip>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility audits when open', async () => {
    const el = await fixture(
      html`<ct-tooltip label="Accessible label" content="Detail." open></ct-tooltip>`,
    );
    await expect(el).to.be.accessible();
  });
});
