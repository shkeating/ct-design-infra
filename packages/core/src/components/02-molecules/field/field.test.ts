import { html, fixture, expect } from '@open-wc/testing';
import type { CtField } from './field.js';
import './field.js';
import './field-option.js';
import '../../01-atoms/select/select-option.js';

describe('ct-field', () => {
  it('renders nothing when name is empty', async () => {
    const el = (await fixture(html`<ct-field title="No name"></ct-field>`)) as CtField;
    expect(el.shadowRoot!.querySelector('.ct-field')).to.not.exist;
  });

  it('renders a ct-textfield with a composed title label by default', async () => {
    const el = (await fixture(html`<ct-field name="full_name" title="Full name" id="f1"></ct-field>`)) as CtField;
    const label = el.shadowRoot!.querySelector('ct-label')!;
    expect(label).to.exist;
    expect(label.getAttribute('for')).to.equal('f1');
    expect(label.hasAttribute('no-margin')).to.be.true;

    const control = el.shadowRoot!.querySelector('ct-textfield')!;
    expect(control).to.exist;
    expect(control.getAttribute('name')).to.equal('full_name');
    expect(control.getAttribute('id')).to.equal('f1');
    // Mirrors the title as aria-label since the composed label's `for`/`id` cannot cross the
    // separate shadow roots ct-label and ct-textfield each render their real elements into.
    expect(control.getAttribute('aria-label')).to.equal('Full name');
  });

  it('auto-generates an id when none is provided', async () => {
    const el = (await fixture(html`<ct-field name="x" title="X"></ct-field>`)) as CtField;
    expect(el.id).to.not.equal('');
    const control = el.shadowRoot!.querySelector('ct-textfield')!;
    expect(control.getAttribute('id')).to.equal(el.id);
  });

  it('adds a ct-field class to its own host element, for ct-fieldset\'s forward-compatible gap rule', async () => {
    const el = (await fixture(html`<ct-field name="x" title="X"></ct-field>`)) as CtField;
    expect(el.classList.contains('ct-field')).to.be.true;
  });

  it('renders a ct-textarea for type="textarea"', async () => {
    const el = (await fixture(html`<ct-field name="comments" title="Comments" type="textarea"></ct-field>`)) as CtField;
    expect(el.shadowRoot!.querySelector('ct-textarea')).to.exist;
    expect(el.shadowRoot!.querySelector('ct-textfield')).to.not.exist;
  });

  it('renders a ct-select composed with ct-select-option children for type="select"', async () => {
    const el = (await fixture(html`
      <ct-field name="fruit" title="Fruit" type="select">
        <ct-select-option label="Apple" value="apple"></ct-select-option>
        <ct-select-option label="Banana" value="banana"></ct-select-option>
      </ct-field>
    `)) as CtField;
    const select = el.shadowRoot!.querySelector('ct-select')!;
    expect(select).to.exist;
    expect(select.querySelectorAll('ct-select-option').length).to.equal(2);
  });

  it('wraps checkbox/radio groups in a native fieldset with a legend', async () => {
    const el = (await fixture(html`<ct-field name="agree" title="Terms" type="checkbox"></ct-field>`)) as CtField;
    const fieldset = el.shadowRoot!.querySelector('fieldset.ct-field__wrapper')!;
    expect(fieldset).to.exist;
    expect(fieldset.getAttribute('aria-label')).to.equal('Terms');
    expect(el.shadowRoot!.querySelector('ct-label[tag="legend"]')).to.exist;
  });

  it('renders a single checkbox from its own props when no ct-field-option children are present', async () => {
    const el = (await fixture(
      html`<ct-field name="agree" label="I agree" type="checkbox" id="agree-1" checked></ct-field>`,
    )) as CtField;
    const checkboxes = el.shadowRoot!.querySelectorAll('ct-checkbox');
    expect(checkboxes.length).to.equal(1);
    expect(checkboxes[0].getAttribute('name')).to.equal('agree');
    expect(checkboxes[0].hasAttribute('is-checked')).to.be.true;
  });

  it('renders one ct-checkbox per ct-field-option child, sharing the field name', async () => {
    const el = (await fixture(html`
      <ct-field name="services" title="Services" type="checkbox">
        <ct-field-option label="Waste" value="waste" id="opt-waste"></ct-field-option>
        <ct-field-option label="Libraries" value="libraries" id="opt-libraries" checked></ct-field-option>
      </ct-field>
    `)) as CtField;
    const checkboxes = el.shadowRoot!.querySelectorAll('ct-checkbox');
    expect(checkboxes.length).to.equal(2);
    expect(checkboxes[0].getAttribute('name')).to.equal('services');
    expect(checkboxes[1].getAttribute('name')).to.equal('services');
    expect(checkboxes[0].getAttribute('id')).to.equal('opt-waste');
    expect(checkboxes[1].hasAttribute('is-checked')).to.be.true;
  });

  it('renders one ct-radio per ct-field-option child, sharing the field name', async () => {
    const el = (await fixture(html`
      <ct-field name="referral" title="Referral" type="radio">
        <ct-field-option label="Search" value="search" id="opt-search"></ct-field-option>
        <ct-field-option label="Social" value="social" id="opt-social"></ct-field-option>
      </ct-field>
    `)) as CtField;
    const radios = el.shadowRoot!.querySelectorAll('ct-radio');
    expect(radios.length).to.equal(2);
    expect(radios[0].getAttribute('name')).to.equal('referral');
    expect(radios[1].getAttribute('name')).to.equal('referral');
  });

  it('falls through to ct-input for other control types', async () => {
    const el = (await fixture(html`<ct-field name="dob" title="Date of birth" type="date"></ct-field>`)) as CtField;
    const input = el.shadowRoot!.querySelector('ct-input')!;
    expect(input).to.exist;
    expect(input.getAttribute('type')).to.equal('date');
  });

  it('suppresses title/description/message/prefix/suffix for type="hidden"', async () => {
    const el = (await fixture(html`
      <ct-field
        name="token"
        title="Token"
        description="Should not show"
        message="Should not show"
        prefix="<span>pre</span>"
        suffix="<span>post</span>"
        type="hidden"
        value="abc"
      ></ct-field>
    `)) as CtField;
    expect(el.shadowRoot!.querySelector('ct-label')).to.not.exist;
    expect(el.shadowRoot!.querySelector('ct-field-description')).to.not.exist;
    expect(el.shadowRoot!.querySelector('ct-field-message')).to.not.exist;
    expect(el.shadowRoot!.querySelector('.ct-field__prefix')).to.not.exist;
    expect(el.shadowRoot!.querySelector('.ct-field__suffix')).to.not.exist;
    const input = el.shadowRoot!.querySelector('ct-input')!;
    expect(input.getAttribute('type')).to.equal('hidden');
    expect(input.getAttribute('value')).to.equal('abc');
  });

  it('renders a field-message with a generic fallback when invalid with no explicit message', async () => {
    const el = (await fixture(html`<ct-field name="email" title="Email" is-invalid></ct-field>`)) as CtField;
    const message = el.shadowRoot!.querySelector('ct-field-message')!;
    expect(message).to.exist;
    expect(message.getAttribute('type')).to.equal('error');
    expect(message.getAttribute('content')).to.include('Email');
  });

  it('renders an explicit message over the invalid fallback', async () => {
    const el = (await fixture(
      html`<ct-field name="email" title="Email" is-invalid message="Enter a valid email address."></ct-field>`,
    )) as CtField;
    const message = el.shadowRoot!.querySelector('ct-field-message')!;
    expect(message.getAttribute('content')).to.equal('Enter a valid email address.');
  });

  it('renders the description only when explicitly provided', async () => {
    const withDescription = (await fixture(
      html`<ct-field name="x" title="X" description="Some help text."></ct-field>`,
    )) as CtField;
    expect(withDescription.shadowRoot!.querySelector('ct-field-description')).to.exist;

    const withoutDescription = (await fixture(html`<ct-field name="x" title="X"></ct-field>`)) as CtField;
    expect(withoutDescription.shadowRoot!.querySelector('ct-field-description')).to.not.exist;
  });

  it('renders trusted HTML prefix and suffix content', async () => {
    const el = (await fixture(
      html`<ct-field name="x" title="X" prefix="<span>Before</span>" suffix="<span>After</span>"></ct-field>`,
    )) as CtField;
    expect(el.shadowRoot!.querySelector('.ct-field__prefix')!.innerHTML).to.include('Before');
    expect(el.shadowRoot!.querySelector('.ct-field__suffix')!.innerHTML).to.include('After');
  });

  it('applies the horizontal orientation class', async () => {
    const el = (await fixture(html`<ct-field name="x" title="X" orientation="horizontal"></ct-field>`)) as CtField;
    expect(el.shadowRoot!.querySelector('.ct-field--horizontal')).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-field name="full_name" title="Full name" description="As it appears on your ID." required-text="(required)" is-required></ct-field>`,
    );
    await expect(el).to.be.accessible();
  });

  it('passes accessibility audits for a checkbox group', async () => {
    const el = await fixture(html`
      <ct-field name="services" title="Services" type="checkbox">
        <ct-field-option label="Waste" value="waste" id="opt-waste-a11y"></ct-field-option>
        <ct-field-option label="Libraries" value="libraries" id="opt-libraries-a11y"></ct-field-option>
      </ct-field>
    `);
    await expect(el).to.be.accessible();
  });
});
