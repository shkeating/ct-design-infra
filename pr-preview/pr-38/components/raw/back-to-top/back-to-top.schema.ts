import { z } from 'zod';

export const BackToTopSchema = z.object({
  modifierClass: z.string().optional().describe('Additional CSS classes.'),
  target: z
    .string()
    .optional()
    .describe('CSS selector for the element to scroll to and focus on click. Defaults to "#top".'),
  scrollOffset: z
    .number()
    .optional()
    .describe('Window scroll position (in pixels) past which the button becomes visible. Defaults to 400.'),
  icon: z.string().optional().describe('Name of the icon rendered inside the button. Defaults to "up-arrow".'),
  label: z
    .string()
    .optional()
    .describe(
      'Accessible name for the icon-only button (there is no visible text). Defaults to "Return focus to the top of the page".',
    ),
});

export type BackToTopProps = z.infer<typeof BackToTopSchema>;
