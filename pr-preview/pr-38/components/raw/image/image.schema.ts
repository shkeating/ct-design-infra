import { z } from 'zod';

export const ImageSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  url: z.string().describe('Image URL. Renders nothing when empty.'),
  alt: z.string().optional().default('').describe('Image alt text. Provide meaningful text unless the image is purely decorative.'),
  width: z.number().optional().describe('Image width (intrinsic, in pixels).'),
  height: z.number().optional().describe('Image height (intrinsic, in pixels).'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
  fill: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Absolutely fills the nearest positioned wrapper and crops via object-fit: cover, instead of natural aspect-ratio sizing. Requires the wrapper to have position: relative and an explicit sized height.',
    ),
});

export type ImageProps = z.infer<typeof ImageSchema>;
