import { z } from 'zod';

export const PopoverSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  triggerText: z.string().describe("Visible text of the popover's trigger link."),
  triggerUrl: z.string().optional().describe('Optional destination URL for the trigger link.'),
  triggerNewWindow: z.boolean().optional().default(false).describe('Opens the trigger link in a new window/tab.'),
  triggerExternal: z.boolean().optional().default(false).describe('Indicates the trigger link is external.'),
  group: z
    .string()
    .optional()
    .describe(
      'Group name for mutually-exclusive popovers - opening one closes every other ct-popover sharing the ' +
        'same group name.',
    ),
  content: z
    .string()
    .describe(
      'Trusted, already-sanitized HTML for the popover panel body, rendered via unsafeHTML. Callers must not ' +
        'pass unsanitized user input.',
    ),
  contentTop: z.string().optional().describe('Trusted HTML rendered above `content` in the panel.'),
  contentBottom: z.string().optional().describe('Trusted HTML rendered below `content` in the panel.'),
  open: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Renders the panel open on load instead of the default closed state. Not part of upstream CivicTheme; ' +
        'the popover remains a normal, closeable disclosure afterward.',
    ),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type PopoverProps = z.infer<typeof PopoverSchema>;
