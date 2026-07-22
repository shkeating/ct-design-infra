import { html, fixture, expect } from '@open-wc/testing';
import './content-link.js';
import type { CtContentLink } from './content-link.js';

describe('ct-content-link', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtContentLink>(html`<ct-content-link text="Test Label" url="/test"></ct-content-link>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Label');
    const anchor = el.shadowRoot!.querySelector('a');
    expect(anchor).to.exist;
    expect(anchor!.getAttribute('href')).to.equal('/test');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture<CtContentLink>(html`<ct-content-link text="Accessible Label" url="/test"></ct-content-link>`);
    await expect(el).to.be.accessible();
  });

  it('renders an external-link icon and groups it with the last word', async () => {
    const el = await fixture<CtContentLink>(
      html`<ct-content-link text="Visit our partner site" url="/test" external></ct-content-link>`,
    );
    const icon = el.shadowRoot!.querySelector('ct-icon');
    expect(icon).to.exist;
    expect(icon!.getAttribute('name')).to.equal('upper-right-arrow');
    const group = el.shadowRoot!.querySelector('.ct-content-link__group');
    expect(group).to.exist;
    expect(group!.textContent).to.include('site');
  });

  it('adds target and rel and a visually-hidden cue when opening in a new window', async () => {
    const el = await fixture<CtContentLink>(
      html`<ct-content-link text="New window" url="/test" new-window></ct-content-link>`,
    );
    const anchor = el.shadowRoot!.querySelector('a')!;
    expect(anchor.getAttribute('target')).to.equal('_blank');
    expect(anchor.getAttribute('rel')).to.equal('noopener noreferrer');
    expect(el.shadowRoot!.textContent).to.include('Opens in a new tab/window');
  });

  it('renders nothing when there is no text', async () => {
    const el = await fixture<CtContentLink>(html`<ct-content-link></ct-content-link>`);
    expect(el.shadowRoot!.querySelector('a')).to.not.exist;
  });
});
