import { html, fixture, expect } from '@open-wc/testing';
import type { CtSelect } from './select.js';
import './select.js';
import './select-option.js';
import './select-optgroup.js';

const markup = html`
  <ct-select name="fruit" aria-label="Choose a fruit">
    <ct-select-option label="Apple" value="apple" selected></ct-select-option>
    <ct-select-option label="Banana" value="banana"></ct-select-option>
    <ct-select-option label="Cherry" value="cherry" disabled></ct-select-option>
  </ct-select>
`;

describe('ct-select', () => {
  it('renders a native select with an option per ct-select-option child', async () => {
    const el = (await fixture(markup)) as CtSelect;
    const select = el.shadowRoot!.querySelector('select')!;
    expect(select).to.exist;
    const options = select.querySelectorAll('option');
    expect(options.length).to.equal(3);
    expect(options[0].textContent).to.equal('Apple');
    expect(options[0].value).to.equal('apple');
    expect(options[0].selected).to.be.true;
    expect(options[2].disabled).to.be.true;
  });

  it('forwards name, multiple, disabled, required and aria-label to the internal select', async () => {
    const el = (await fixture(html`
      <ct-select name="fruit" multiple required aria-label="Choose fruits">
        <ct-select-option label="Apple" value="apple"></ct-select-option>
      </ct-select>
    `)) as CtSelect;
    const select = el.shadowRoot!.querySelector('select')!;
    expect(select.getAttribute('name')).to.equal('fruit');
    expect(select.multiple).to.be.true;
    expect(select.required).to.be.true;
    expect(select.getAttribute('aria-label')).to.equal('Choose fruits');
  });

  it('sets aria-invalid and the invalid class when invalid', async () => {
    const el = (await fixture(html`
      <ct-select aria-label="Choose a fruit" invalid>
        <ct-select-option label="Apple" value="apple"></ct-select-option>
      </ct-select>
    `)) as CtSelect;
    const select = el.shadowRoot!.querySelector('select')!;
    expect(select.getAttribute('aria-invalid')).to.equal('true');
    expect(select.classList.contains('ct-select--is-invalid')).to.be.true;
  });

  it('groups options via ct-select-optgroup into a real optgroup', async () => {
    const el = (await fixture(html`
      <ct-select aria-label="Choose a fruit or vegetable">
        <ct-select-optgroup label="Fruits">
          <ct-select-option label="Apple" value="apple"></ct-select-option>
          <ct-select-option label="Banana" value="banana"></ct-select-option>
        </ct-select-optgroup>
        <ct-select-optgroup label="Vegetables" disabled>
          <ct-select-option label="Carrot" value="carrot"></ct-select-option>
        </ct-select-optgroup>
      </ct-select>
    `)) as CtSelect;
    const select = el.shadowRoot!.querySelector('select')!;
    const groups = select.querySelectorAll('optgroup');
    expect(groups.length).to.equal(2);
    expect(groups[0].getAttribute('label')).to.equal('Fruits');
    expect(groups[0].querySelectorAll('option').length).to.equal(2);
    expect(groups[1].disabled).to.be.true;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
