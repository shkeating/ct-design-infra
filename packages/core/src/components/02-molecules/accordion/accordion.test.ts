import { html, fixture, expect } from '@open-wc/testing';
import type { CtAccordion } from './accordion.js';
import './accordion.js';
import './accordion-item.js';

const markup = html`
  <ct-accordion>
    <ct-accordion-item heading="First panel" expanded>
      <p>First content</p>
    </ct-accordion-item>
    <ct-accordion-item heading="Second panel">
      <p>Second content</p>
    </ct-accordion-item>
    <ct-accordion-item heading="Disabled panel" disabled>
      <p>Disabled content</p>
    </ct-accordion-item>
  </ct-accordion>
`;

describe('ct-accordion', () => {
  it('renders a trigger button per panel with the panel heading', async () => {
    const el = (await fixture(markup)) as CtAccordion;
    const buttons = el.shadowRoot!.querySelectorAll('.ct-accordion__panels__panel__header__button');
    expect(buttons.length).to.equal(3);
    expect(buttons[0].textContent).to.include('First panel');
  });

  it('expands a panel marked `expanded` by default and collapses the rest', async () => {
    const el = (await fixture(markup)) as CtAccordion;
    const buttons = el.shadowRoot!.querySelectorAll('button');
    expect(buttons[0].getAttribute('aria-expanded')).to.equal('true');
    expect(buttons[1].getAttribute('aria-expanded')).to.equal('false');
  });

  it('toggles a panel open on trigger click', async () => {
    const el = (await fixture(markup)) as CtAccordion;
    const trigger = el.shadowRoot!.querySelectorAll('button')[1];
    // The accordion machine only acts on a click once it has seen focus on the trigger
    // (mirroring a real user click, which focuses the button before the click fires) —
    // a bare `.click()` is a synthetic DOM call that skips that focus step.
    trigger.focus();
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('button')[1].getAttribute('aria-expanded')).to.equal('true');
  });

  it('does not toggle a disabled panel', async () => {
    const el = (await fixture(markup)) as CtAccordion;
    const trigger = el.shadowRoot!.querySelectorAll('button')[2];
    expect(trigger.disabled).to.be.true;
    trigger.focus();
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('button')[2].getAttribute('aria-expanded')).to.equal('false');
  });

  it('expands every panel when expand-all is set', async () => {
    const el = (await fixture(html`
      <ct-accordion expand-all>
        <ct-accordion-item heading="A"><p>A</p></ct-accordion-item>
        <ct-accordion-item heading="B"><p>B</p></ct-accordion-item>
      </ct-accordion>
    `)) as CtAccordion;
    const buttons = el.shadowRoot!.querySelectorAll('button');
    expect(buttons[0].getAttribute('aria-expanded')).to.equal('true');
    expect(buttons[1].getAttribute('aria-expanded')).to.equal('true');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
