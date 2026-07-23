import { z } from 'zod';

export const TooltipSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  position: z
    .enum([
      'auto',
      'auto-start',
      'auto-end',
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ])
    .optional()
    .default('auto')
    .describe(
      "Preferred popup position relative to the trigger. 'auto'/'auto-start'/'auto-end' are " +
        "resolved to the closest 'bottom*' placement with automatic flip-to-top fallback " +
        '(the underlying floating-ui positioning engine has no auto-placement concept).',
    ),
  icon: z.string().optional().default('information-mark').describe('Name of the icon shown in the trigger button.'),
  iconSize: z
    .enum(['extra-large', 'large', 'regular', 'small', 'extra-small'])
    .optional()
    .default('large')
    .describe('Size of the trigger icon.'),
  label: z
    .string()
    .describe(
      'Accessible name for the trigger button, also shown as its native title. Named `label` ' +
        "rather than upstream's `title` slot to avoid colliding with the host element's global " +
        '`title` HTML attribute (which would otherwise trigger a second, native browser tooltip).',
    ),
  content: z.string().describe('Text shown inside the tooltip popup when open.'),
  open: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Renders the popup open on load instead of the default closed state. Not part of ' +
        'upstream CivicTheme; the tooltip remains a normal, closeable popup afterward.',
    ),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type TooltipProps = z.infer<typeof TooltipSchema>;
