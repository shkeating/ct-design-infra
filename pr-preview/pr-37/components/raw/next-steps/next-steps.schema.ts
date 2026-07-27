import { z } from 'zod';

export const NextStepsSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  heading: z
    .string()
    .describe(
      'Next step title text. Rendered as a level-4 heading; becomes a link (with a trailing arrow icon) when linkUrl is set.',
    ),
  content: z.string().optional().describe("Next step body content, rendered via ct-paragraph."),
  linkUrl: z.string().optional().describe("URL for the next step's call-to-action link. When set, heading renders as a link instead of plain text."),
  linkNewWindow: z.boolean().optional().default(false).describe('Opens the link in a new window/tab.'),
  linkExternal: z.boolean().optional().default(false).describe('Marks the link as external (adds the external-link icon/affordance).'),
  verticalSpacing: z
    .enum(['top', 'bottom', 'both', 'none'])
    .optional()
    .default('none')
    .describe('Vertical spacing position: top, bottom, both, or none.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type NextStepsProps = z.infer<typeof NextStepsSchema>;
