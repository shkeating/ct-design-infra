import { html, fixture, expect } from '@open-wc/testing';
import './fieldset.js';
import '../textfield/textfield.js';

describe('ct-fieldset', () => {
  it('renders a native fieldset wrapping its legend and fields', async () => {
    const el = await fixture(html`
      <ct-fieldset legend="Contact details">
        <ct-textfield name="full-name" aria-label="Full name"></ct-textfield>
      </ct-fieldset>
    `);
    const fieldset = el.shadowRoot!.querySelector('fieldset');
    expect(fieldset).to.exist;
    expect(fieldset!.classList.contains('ct-fieldset')).to.be.true;

    const legend = el.shadowRoot!.querySelector('ct-label');
    expect(legend).to.exist;
    expect(legend!.getAttribute('tag')).to.equal('legend');
    expect(legend!.getAttribute('content')).to.equal('Contact details');
  });

  it('mirrors the legend into aria-label on the native fieldset', async () => {
    // Guards against the shadow-DOM nesting caveat documented on the
    // component: the real <legend> lives two shadow roots deep (inside
    // ct-label's own shadow root), which the HTML fieldset/legend
    // accessible-name algorithm cannot reach, so aria-label is a required
    // fallback rather than a nice-to-have.
    const el = await fixture(html`<ct-fieldset legend="Contact details"></ct-fieldset>`);
    const fieldset = el.shadowRoot!.querySelector('fieldset');
    expect(fieldset!.getAttribute('aria-label')).to.equal('Contact details');
  });

  it('renders no legend when legend is empty', async () => {
    const el = await fixture(html`<ct-fieldset></ct-fieldset>`);
    expect(el.shadowRoot!.querySelector('ct-label')).to.not.exist;
    expect(el.shadowRoot!.querySelector('fieldset')!.hasAttribute('aria-label')).to.be.false;
  });

  it('forwards required and required-text to the composed legend', async () => {
    const el = await fixture(html`<ct-fieldset legend="Payment" required required-text="(mandatory)"></ct-fieldset>`);
    const legend = el.shadowRoot!.querySelector('ct-label')!;
    expect(legend.hasAttribute('required')).to.be.true;
    expect(legend.getAttribute('required-text')).to.equal('(mandatory)');
    expect(el.shadowRoot!.querySelector('fieldset')!.classList.contains('ct-fieldset--required')).to.be.true;
  });

  it('renders the description via ct-paragraph before the fields by default', async () => {
    const el = await fixture(html`<ct-fieldset legend="Group" description="Some helpful context."></ct-fieldset>`);
    const wrapper = el.shadowRoot!.querySelector('.ct-fieldset__wrapper')!;
    const descriptionWrapper = wrapper.querySelector('.ct-fieldset__description--before');
    expect(descriptionWrapper).to.exist;
    const paragraph = descriptionWrapper!.querySelector('ct-paragraph');
    expect(paragraph).to.exist;
    expect(paragraph!.getAttribute('content')).to.equal('Some helpful context.');
  });

  it('renders the description after the fields when description-display is "after"', async () => {
    const el = await fixture(html`
      <ct-fieldset legend="Group" description="Context after." description-display="after">
        <ct-textfield name="x" aria-label="X"></ct-textfield>
      </ct-fieldset>
    `);
    const wrapper = el.shadowRoot!.querySelector('.ct-fieldset__wrapper')!;
    const children = Array.from(wrapper.children);
    const fieldsIndex = children.findIndex((c) => c.classList.contains('ct-fieldset__fields'));
    const descriptionIndex = children.findIndex((c) => c.classList.contains('ct-fieldset__description--after'));
    expect(fieldsIndex).to.be.greaterThan(-1);
    expect(descriptionIndex).to.be.greaterThan(fieldsIndex);
  });

  it('applies a visually-hidden class when description-display is "invisible"', async () => {
    const el = await fixture(html`<ct-fieldset legend="Group" description="Hidden context." description-display="invisible"></ct-fieldset>`);
    const descriptionWrapper = el.shadowRoot!.querySelector('.ct-fieldset__description--invisible');
    expect(descriptionWrapper).to.exist;
    expect(descriptionWrapper!.classList.contains('ct-visually-hidden')).to.be.true;
  });

  it('renders a message via ct-field-message when message is set', async () => {
    const el = await fixture(html`<ct-fieldset legend="Group" message="Something went wrong." message-type="error"></ct-fieldset>`);
    const message = el.shadowRoot!.querySelector('ct-field-message');
    expect(message).to.exist;
    expect(message!.getAttribute('type')).to.equal('error');
    expect(message!.getAttribute('content')).to.equal('Something went wrong.');
  });

  it('renders no field-message when message is empty', async () => {
    const el = await fixture(html`<ct-fieldset legend="Group"></ct-fieldset>`);
    expect(el.shadowRoot!.querySelector('ct-field-message')).to.not.exist;
  });

  it('only renders the fields wrapper when it has slotted children', async () => {
    const withFields = await fixture(html`
      <ct-fieldset legend="Group">
        <ct-textfield name="x" aria-label="X"></ct-textfield>
      </ct-fieldset>
    `);
    expect(withFields.shadowRoot!.querySelector('.ct-fieldset__fields')).to.exist;

    const withoutFields = await fixture(html`<ct-fieldset legend="Group"></ct-fieldset>`);
    expect(withoutFields.shadowRoot!.querySelector('.ct-fieldset__fields')).to.not.exist;
  });

  it('renders trusted HTML prefix and suffix content', async () => {
    const el = await fixture(html`<ct-fieldset legend="Group" prefix="<p>Before</p>" suffix="<p>After</p>"></ct-fieldset>`);
    expect(el.shadowRoot!.querySelector('.ct-fieldset__prefix')!.innerHTML).to.include('Before');
    expect(el.shadowRoot!.querySelector('.ct-fieldset__suffix')!.innerHTML).to.include('After');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`
      <ct-fieldset legend="Contact details" description="We'll use these to follow up." required required-text="(required)">
        <ct-textfield name="full-name" aria-label="Full name" required></ct-textfield>
      </ct-fieldset>
    `);
    await expect(el).to.be.accessible();
  });
});
