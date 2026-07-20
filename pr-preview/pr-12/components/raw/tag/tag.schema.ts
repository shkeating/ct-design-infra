import { z } from 'zod';

export const TagSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  variant: z.enum(['primary', 'secondary', 'tertiary']).optional().default('primary').describe('Visual style variant.'),
  label: z.string().describe('Tag content/label.'),
  icon: z.string().optional().describe('Name of the icon to display alongside the label.'),
  iconPlacement: z.enum(['before', 'after']).optional().default('after').describe('Position of the icon relative to the label.'),
  url: z.string().optional().describe('Optional URL — when set, the tag renders as a link instead of a span.'),
  newWindow: z.boolean().optional().default(false).describe('Opens the link in a new tab/window (only applies when url is set).'),
  external: z.boolean().optional().default(false).describe('Marks the link as external, appending an external-link icon.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type TagProps = z.infer<typeof TagSchema>;
