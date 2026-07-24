import { z } from 'zod';

export const TextfieldSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  name: z.string().describe('DOM name attribute — required for the field to render.'),
  value: z.string().optional().describe('Initial value of the field.'),
  placeholder: z.string().optional().describe('Placeholder text shown when the field is empty.'),
  invalid: z.boolean().optional().default(false).describe('Whether the field is in an invalid/error state.'),
  disabled: z.boolean().optional().default(false).describe('Disables the field.'),
  required: z.boolean().optional().default(false).describe('Marks the field as required.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
  id: z
    .string()
    .optional()
    .describe('DOM id — set to pair the field with an external label\'s `for` attribute (e.g. ct-label).'),
  ariaLabel: z
    .string()
    .optional()
    .describe('Overrides the accessible name. Required when the field has no paired external label.'),
});

export type TextfieldProps = z.infer<typeof TextfieldSchema>;
