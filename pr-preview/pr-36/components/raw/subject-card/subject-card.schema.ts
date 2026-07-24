import { z } from 'zod';

export const SubjectCardSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  heading: z
    .string()
    .optional()
    .default('')
    .describe('Card title (rendered as the visible heading text). Renders nothing when empty.'),
  imageUrl: z.string().optional().describe('Card image URL. Composed via ct-image; omit to render the card without an image.'),
  imageAlt: z.string().optional().default('').describe('Card image alt text.'),
  linkUrl: z
    .string()
    .optional()
    .describe('Card link URL. When set, the title becomes a link (and the whole card is clickable unless titleClick is set).'),
  linkNewWindow: z.boolean().optional().default(false).describe('Whether the card link opens in a new window/tab.'),
  titleClick: z.boolean().optional().default(false).describe('Whether only the title text is clickable instead of the whole card.'),
  modifierClass: z.string().optional().default('').describe('Additional custom CSS classes.'),
});

export type SubjectCardProps = z.infer<typeof SubjectCardSchema>;
