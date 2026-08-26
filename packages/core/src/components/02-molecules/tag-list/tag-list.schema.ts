import { z } from 'zod';

export const TagListSchema = z.object({
  theme: z
    .enum(['light', 'dark'])
    .optional()
    .default('light')
    .describe("Theme variation: light or dark. Becomes each tag's default theme unless a tag overrides it."),
  verticalSpacing: z
    .enum(['none', 'top', 'bottom', 'both'])
    .optional()
    .default('none')
    .describe('Vertical spacing position: none, top, bottom, or both.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type TagListProps = z.infer<typeof TagListSchema>;

export const TagListItemSchema = z.object({
  content: z.string().describe('Tag content/label.'),
  url: z.string().optional().describe('Optional destination URL — when set, the tag renders as a link.'),
  isNewWindow: z.boolean().optional().default(false).describe('Opens the link in a new tab/window (only applies when url is set).'),
  theme: z
    .enum(['light', 'dark'])
    .optional()
    .describe("Per-tag theme override. When unset, inherits the parent ct-tag-list's own theme."),
  variant: z
    .enum(['primary', 'secondary', 'tertiary'])
    .optional()
    .default('primary')
    .describe('Visual style variant, passed straight through to ct-tag.'),
  icon: z.string().optional().describe("Name of the icon to display alongside the tag's content."),
  iconPlacement: z
    .enum(['before', 'after'])
    .optional()
    .default('after')
    .describe('Position of the icon relative to the content.'),
  external: z.boolean().optional().default(false).describe('Marks the tag as external, appending an external-link icon.'),
});

export type TagListItemProps = z.infer<typeof TagListItemSchema>;
