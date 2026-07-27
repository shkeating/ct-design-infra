import { z } from 'zod';

export const TextareaSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  name: z
    .string()
    .describe('DOM `name` attribute. Required — the component renders nothing when this is empty.'),
  id: z.string().optional().describe('DOM `id` attribute.'),
  value: z.string().optional().describe("The textarea's current value."),
  placeholder: z.string().optional().describe('Placeholder text.'),
  rows: z.number().optional().describe('Display rows count.'),
  isInvalid: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether the textarea is in an invalid state. Sets aria-invalid="true".'),
  isDisabled: z.boolean().optional().default(false).describe('Whether the textarea is disabled.'),
  isRequired: z.boolean().optional().default(false).describe('Whether the textarea is required.'),
  ariaLabel: z
    .string()
    .optional()
    .describe(
      'Accessible name override, for use when this textarea has no associated ct-label. Passed straight through as aria-label; prefer a real associated label where possible.',
    ),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type TextareaProps = z.infer<typeof TextareaSchema>;
