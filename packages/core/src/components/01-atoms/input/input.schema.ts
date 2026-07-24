import { z } from 'zod';

export const InputSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  type: z
    .string()
    .optional()
    .default('text')
    .describe('Input type (text, email, password, number, tel, url, search, color, date, etc.).'),
  name: z.string().optional().describe("DOM name attribute — required for the input to participate in form submission."),
  id: z
    .string()
    .optional()
    .describe(
      'DOM id. Does not create a working label association across shadow-DOM boundaries — use `ariaLabel` for an accessible name instead.',
    ),
  value: z.string().optional().describe('The input value.'),
  placeholder: z.string().optional().describe('Placeholder text.'),
  invalid: z.boolean().optional().default(false).describe('Whether the input is in an invalid state.'),
  disabled: z.boolean().optional().default(false).describe('Whether the input is disabled.'),
  required: z.boolean().optional().default(false).describe('Whether the input is required.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
  ariaLabel: z.string().optional().describe('Overrides the accessible name (recommended, since this component renders no visible label of its own).'),
});

export type InputProps = z.infer<typeof InputSchema>;
