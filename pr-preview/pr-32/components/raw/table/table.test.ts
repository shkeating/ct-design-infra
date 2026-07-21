import { html, fixture, expect } from '@open-wc/testing';
import './table';

const HEADER = '<th scope="col">Name</th><th scope="col">Role</th>';
const ROWS =
  '<tr><td data-title="Name">Ada Lovelace</td><td data-title="Role">Engineer</td></tr>' +
  '<tr><td data-title="Name">Grace Hopper</td><td data-title="Role">Architect</td></tr>';
const FOOTER = '<th scope="col">Total</th><th scope="col">2 roles</th>';

describe('ct-table', () => {
  it('renders header, body rows, and footer', async () => {
    const el = await fixture(
      html`<ct-table header=${HEADER} rows=${ROWS} footer=${FOOTER}></ct-table>`,
    );
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.querySelector('table.ct-table')).to.exist;
    expect(el.shadowRoot!.querySelectorAll('thead th')).to.have.lengthOf(2);
    expect(el.shadowRoot!.querySelectorAll('tbody tr')).to.have.lengthOf(2);
    expect(el.shadowRoot!.querySelectorAll('tfoot th')).to.have.lengthOf(2);
    expect(el.shadowRoot!.querySelector('tbody td')!.textContent).to.include('Ada Lovelace');
  });

  it('renders a caption when provided', async () => {
    const el = await fixture(html`<ct-table caption="Team directory" rows=${ROWS}></ct-table>`);
    expect(el.shadowRoot!.querySelector('caption')!.textContent).to.equal('Team directory');
  });

  it('applies caption-after positioning as a modifier class', async () => {
    const el = await fixture(
      html`<ct-table caption="Team directory" caption-position="after" rows=${ROWS}></ct-table>`,
    );
    expect(el.shadowRoot!.querySelector('.ct-table--caption-after')).to.exist;
  });

  it('applies the dark theme class', async () => {
    const el = await fixture(html`<ct-table theme="dark" rows=${ROWS}></ct-table>`);
    expect(el.shadowRoot!.querySelector('.ct-theme-dark')).to.exist;
  });

  it('applies the striped modifier class', async () => {
    const el = await fixture(html`<ct-table striped rows=${ROWS}></ct-table>`);
    expect(el.shadowRoot!.querySelector('.ct-table--striped')).to.exist;
  });

  it('applies the data-table modifier class', async () => {
    const el = await fixture(html`<ct-table data-table rows=${ROWS}></ct-table>`);
    expect(el.shadowRoot!.querySelector('.ct-table--data')).to.exist;
  });

  it('omits thead/tfoot when header/footer are not provided', async () => {
    const el = await fixture(html`<ct-table rows=${ROWS}></ct-table>`);
    expect(el.shadowRoot!.querySelector('thead')).to.not.exist;
    expect(el.shadowRoot!.querySelector('tfoot')).to.not.exist;
  });

  it('renders nothing without header, rows, footer, or caption', async () => {
    const el = await fixture(html`<ct-table></ct-table>`);
    expect(el.shadowRoot!.querySelector('table')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-table caption="Team directory" header=${HEADER} rows=${ROWS} footer=${FOOTER}></ct-table>`,
    );
    await expect(el).to.be.accessible();
  });
});
