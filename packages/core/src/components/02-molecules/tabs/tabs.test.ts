import { html, fixture, expect } from '@open-wc/testing';
import type { CtTabs } from './tabs.js';
import './tabs.js';
import './tabs-item.js';

const markup = html`
  <ct-tabs>
    <ct-tabs-item heading="First tab" selected>
      <p>First content</p>
    </ct-tabs-item>
    <ct-tabs-item heading="Second tab">
      <p>Second content</p>
    </ct-tabs-item>
    <ct-tabs-item heading="Disabled tab" disabled>
      <p>Disabled content</p>
    </ct-tabs-item>
  </ct-tabs>
`;

describe('ct-tabs', () => {
  it('renders a trigger button per item with role=tab and the item heading', async () => {
    const el = (await fixture(markup)) as CtTabs;
    const triggers = el.shadowRoot!.querySelectorAll('[role="tab"]');
    expect(triggers.length).to.equal(3);
    expect(triggers[0].textContent).to.include('First tab');
  });

  it('renders a tablist with the correct ARIA role', async () => {
    const el = (await fixture(markup)) as CtTabs;
    const list = el.shadowRoot!.querySelector('[role="tablist"]');
    expect(list).to.exist;
  });

  it('selects the item marked `selected` by default and hides the rest', async () => {
    const el = (await fixture(markup)) as CtTabs;
    const triggers = el.shadowRoot!.querySelectorAll('[role="tab"]');
    const panels = el.shadowRoot!.querySelectorAll('[role="tabpanel"]');
    expect(triggers[0].getAttribute('aria-selected')).to.equal('true');
    expect(triggers[1].getAttribute('aria-selected')).to.equal('false');
    expect(panels[0].hasAttribute('hidden')).to.be.false;
    expect(panels[1].hasAttribute('hidden')).to.be.true;
  });

  it('switches the selected tab on trigger click', async () => {
    const el = (await fixture(markup)) as CtTabs;
    const trigger = el.shadowRoot!.querySelectorAll('[role="tab"]')[1] as HTMLButtonElement;
    // The tabs machine only acts on a click once it has seen focus on the trigger (mirroring
    // a real user click, which focuses the button before the click fires) — a bare `.click()`
    // is a synthetic DOM call that skips that focus step (see ct-accordion's equivalent test).
    trigger.focus();
    trigger.click();
    await el.updateComplete;
    const triggers = el.shadowRoot!.querySelectorAll('[role="tab"]');
    const panels = el.shadowRoot!.querySelectorAll('[role="tabpanel"]');
    expect(triggers[1].getAttribute('aria-selected')).to.equal('true');
    expect(panels[1].hasAttribute('hidden')).to.be.false;
  });

  it('does not select a disabled tab', async () => {
    const el = (await fixture(markup)) as CtTabs;
    const trigger = el.shadowRoot!.querySelectorAll('[role="tab"]')[2] as HTMLButtonElement;
    expect(trigger.disabled).to.be.true;
    trigger.focus();
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('[role="tab"]')[2].getAttribute('aria-selected')).to.equal('false');
  });

  it('defaults to the first tab when none is marked `selected`', async () => {
    const el = (await fixture(html`
      <ct-tabs>
        <ct-tabs-item heading="A"><p>A</p></ct-tabs-item>
        <ct-tabs-item heading="B"><p>B</p></ct-tabs-item>
      </ct-tabs>
    `)) as CtTabs;
    const triggers = el.shadowRoot!.querySelectorAll('[role="tab"]');
    expect(triggers[0].getAttribute('aria-selected')).to.equal('true');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
