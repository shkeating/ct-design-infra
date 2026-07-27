import { z } from 'zod';

export const SelectSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  name: z.string().optional().describe('DOM name attribute for the select control.'),
  multiple: z.boolean().optional().default(false).describe('Whether to allow multiple selections.'),
  invalid: z.boolean().optional().default(false).describe('Whether the select is invalid (sets aria-invalid and the invalid visual state).'),
  disabled: z.boolean().optional().default(false).describe('Whether the select is disabled.'),
  required: z.boolean().optional().default(false).describe('Whether the select is required.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
  ariaLabel: z
    .string()
    .optional()
    .describe(
      'Accessible name, forwarded to the internal <select>. Native `for`/`id` label association cannot cross this component\'s shadow boundary, so this is the supported way to name it.',
    ),
});

export type SelectProps = z.infer<typeof SelectSchema>;

export const SelectOptionSchema = z.object({
  label: z.string().describe('The option text shown to the user.'),
  value: z.string().optional().describe('The option value submitted with the form.'),
  selected: z.boolean().optional().default(false).describe('Whether this option is selected by default.'),
  disabled: z.boolean().optional().default(false).describe('Whether this option is disabled.'),
});

export type SelectOptionProps = z.infer<typeof SelectOptionSchema>;

export const SelectOptgroupSchema = z.object({
  label: z.string().describe('The option group label.'),
  disabled: z.boolean().optional().default(false).describe('Whether the entire group is disabled.'),
});

export type SelectOptgroupProps = z.infer<typeof SelectOptgroupSchema>;
