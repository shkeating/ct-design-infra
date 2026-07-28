import { z } from 'zod';

export const TabsSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  verticalSpacing: z
    .enum(['top', 'bottom', 'both', 'none'])
    .optional()
    .default('none')
    .describe('Vertical spacing position.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type TabsProps = z.infer<typeof TabsSchema>;

export const TabsItemSchema = z.object({
  heading: z.string().describe('The tab trigger\'s visible text, shown in the tablist.'),
  selected: z.boolean().optional().default(false).describe('Whether this tab is selected by default.'),
  disabled: z.boolean().optional().default(false).describe('Disables selecting this tab.'),
  panelId: z
    .string()
    .optional()
    .describe('Optional stable id for this panel; falls back to a generated instance-scoped value.'),
});

export type TabsItemProps = z.infer<typeof TabsItemSchema>;
