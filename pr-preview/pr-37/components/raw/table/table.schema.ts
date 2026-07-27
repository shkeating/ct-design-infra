import { z } from 'zod';

export const TableSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  caption: z.string().optional().describe('Table caption text. Omit to render no <caption>.'),
  captionPosition: z
    .enum(['before', 'after'])
    .optional()
    .default('before')
    .describe('Caption position relative to the table body: before (default) or after.'),
  header: z
    .string()
    .optional()
    .describe(
      'Trusted HTML for the header row cells, e.g. `<th scope="col">Name</th><th scope="col">Role</th>`. Omit to render no <thead>. Callers must sanitize this HTML before passing it.',
    ),
  rows: z
    .string()
    .optional()
    .describe(
      'Trusted HTML for the body <tr> rows, e.g. `<tr><td data-title="Name">Ada</td></tr>`. Omit to render no <tbody>. Include a data-title attribute on each <td> for accessible labels in the sub-768px stacked mobile layout. Callers must sanitize this HTML before passing it.',
    ),
  footer: z
    .string()
    .optional()
    .describe('Trusted HTML for the footer row cells, mirroring header. Omit to render no <tfoot>.'),
  striped: z.boolean().optional().default(false).describe('Whether to alternate row background/text colors.'),
  dataTable: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Whether to treat this as a dense "data" table: skips the sub-768px stacked/card mobile layout and adds a top border (upstream: is_data_table).',
    ),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type TableProps = z.infer<typeof TableSchema>;
