import { z } from 'zod';

export const LinkSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  label: z.string().optional().describe('The link text content.'),
  url: z.string().optional().describe('The destination URL.'),
  linkTitle: z.string().optional().describe('Title attribute for the link (rendered as the HTML title attribute).'),
  newWindow: z.boolean().optional().default(false).describe('If true, opens the link in a new window/tab.'),
  external: z.boolean().optional().default(false).describe('Indicates if the link is external.'),
  active: z.boolean().optional().default(false).describe('Indicates if the link represents the current/active page.'),
  disabled: z.boolean().optional().default(false).describe('Disables the link.'),
  icon: z.string().optional().describe('Name of the icon to display.'),
  iconPlacement: z.enum(['before', 'after']).optional().default('after').describe('Position of the icon.'),
  iconGroupDisabled: z
    .boolean()
    .optional()
    .default(false)
    .describe('Disables grouping the icon with the last word to prevent orphaned wrapping.'),
  iconSingleOnly: z
    .boolean()
    .optional()
    .default(false)
    .describe('Shows only one icon when both icon and external are present (external takes preference).'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
  ariaLabel: z
    .string()
    .optional()
    .describe('Overrides the accessible name. Required when icon is set without a visible label (icon-only links).'),
});

export type LinkProps = z.infer<typeof LinkSchema>;
