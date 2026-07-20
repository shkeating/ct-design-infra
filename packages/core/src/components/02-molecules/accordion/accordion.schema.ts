import { z } from 'zod';

export const AccordionSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  expandAll: z.boolean().optional().default(false).describe('Whether all panels are expanded by default.'),
  singleOpen: z.boolean().optional().default(false).describe('Whether only one panel can be expanded at a time.'),
  withBackground: z.boolean().optional().default(false).describe('Whether to display with a background.'),
  verticalSpacing: z
    .enum(['top', 'bottom', 'both', 'none'])
    .optional()
    .default('none')
    .describe('Vertical spacing position.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type AccordionProps = z.infer<typeof AccordionSchema>;

export const AccordionItemSchema = z.object({
  heading: z.string().describe('The panel title, shown in the trigger button.'),
  expanded: z.boolean().optional().default(false).describe('Whether this panel is expanded by default.'),
  disabled: z.boolean().optional().default(false).describe('Disables toggling this panel.'),
});

export type AccordionItemProps = z.infer<typeof AccordionItemSchema>;
