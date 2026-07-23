import { html, fixture, expect } from '@open-wc/testing';
import './link.js';
import type { CtLink } from './link.js';

describe('ct-link', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtLink>(html`<ct-link label="Test Label" url="/test"></ct-link>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Label');
    const anchor = el.shadowRoot!.querySelector('a');
    expect(anchor).to.exist;
    expect(anchor!.getAttribute('href')).to.equal('/test');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture<CtLink>(html`<ct-link label="Accessible Label" url="/test"></ct-link>`);
    await expect(el).to.be.accessible();
  });

  it('marks disabled links as aria-disabled and non-focusable', async () => {
    const el = await fixture<CtLink>(html`<ct-link label="Disabled" url="/test" disabled></ct-link>`);
    const anchor = el.shadowRoot!.querySelector('a')!;
    expect(anchor.getAttribute('aria-disabled')).to.equal('true');
    expect(anchor.getAttribute('tabindex')).to.equal('-1');
  });

  it('adds target and rel when opening in a new window', async () => {
    const el = await fixture<CtLink>(html`<ct-link label="New window" url="/test" new-window></ct-link>`);
    const anchor = el.shadowRoot!.querySelector('a')!;
    expect(anchor.getAttribute('target')).to.equal('_blank');
    expect(anchor.getAttribute('rel')).to.equal('noopener noreferrer');
    expect(el.shadowRoot!.textContent).to.include('Opens in a new tab/window');
  });

  it('renders nothing when there is no label or icon', async () => {
    const el = await fixture<CtLink>(html`<ct-link></ct-link>`);
    expect(el.shadowRoot!.querySelector('a')).to.not.exist;
  });

  it('lets aria-label override the accessible name for icon-only links', async () => {
    const el = await fixture<CtLink>(html`<ct-link icon="right-arrow-1" url="/test" aria-label="Next page"></ct-link>`);
    const anchor = el.shadowRoot!.querySelector('a')!;
    expect(anchor.getAttribute('aria-label')).to.equal('Next page');
    await expect(el).to.be.accessible();
  });
});
