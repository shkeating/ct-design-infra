import { z } from 'zod';

export const RadioSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  name: z.string().describe('DOM name attribute — required for the radio to participate in a group.'),
  id: z
    .string()
    .describe(
      "DOM id. Passed through to the composed ct-label's `for`, but does not create a working label association across shadow-DOM boundaries — use `ariaLabel` for a reliable accessible name instead.",
    ),
  value: z.string().optional().describe("The radio's DOM value."),
  label: z.string().optional().describe('Visible label text, rendered via a composed ct-label.'),
  checked: z.boolean().optional().default(false).describe('Whether the radio is checked.'),
  required: z.boolean().optional().default(false).describe('Whether the radio is required.'),
  invalid: z.boolean().optional().default(false).describe('Whether the radio is in an invalid state.'),
  disabled: z.boolean().optional().default(false).describe('Whether the radio is disabled.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
  ariaLabel: z.string().optional().describe("Overrides the accessible name. Defaults to `label`'s text when unset."),
});

export type RadioProps = z.infer<typeof RadioSchema>;
