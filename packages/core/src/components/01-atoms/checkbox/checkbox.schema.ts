import { z } from 'zod';

export const CheckboxSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  name: z
    .string()
    .describe('DOM `name` attribute. Required — the component renders nothing when this or `id` is empty.'),
  id: z.string().describe('DOM `id` attribute. Required — see `name`. Also passed as `for` to the composed ct-label.'),
  value: z.string().optional().describe('DOM `value` attribute.'),
  label: z.string().optional().describe('Label content, rendered via a composed ct-label.'),
  isChecked: z.boolean().optional().default(false).describe('Whether the checkbox is checked.'),
  isRequired: z.boolean().optional().default(false).describe('Whether the checkbox is required.'),
  isInvalid: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether the checkbox is in an invalid state. Sets aria-invalid="true".'),
  isDisabled: z.boolean().optional().default(false).describe('Whether the checkbox is disabled.'),
  ariaLabel: z
    .string()
    .optional()
    .describe("Accessible name override. Defaults to label's text when unset (see class doc for why)."),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type CheckboxProps = z.infer<typeof CheckboxSchema>;
