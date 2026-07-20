import { z } from 'zod';

export const ChipSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  kind: z.enum(['default', 'input', 'link']).optional().default('default').describe('Chip kind: a static span, a radio-input-backed label, or a link.'),
  size: z.enum(['large', 'regular', 'small']).optional().default('regular').describe('Chip size.'),
  content: z.string().describe('Chip text.'),
  url: z.string().optional().describe('URL, used when kind is "link".'),
  label: z.string().optional().describe('Aria-label, used when kind is "link".'),
  selected: z.boolean().optional().default(false).describe('Whether the chip is selected (for filter-chip-style usage).'),
  disabled: z.boolean().optional().default(false).describe('Disables the chip and dims it to 50% opacity.'),
});

export type ChipProps = z.infer<typeof ChipSchema>;
