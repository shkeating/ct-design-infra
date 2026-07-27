import { z } from 'zod';

export const BannerSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  isDecorative: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether to show the decorative clipped-edge variant.'),
  siteSection: z.string().optional().describe('Site section eyebrow text, rendered as a level-5 heading above the title.'),
  title: z.string().optional().describe('Banner title, rendered as a level-1 heading.'),
  featuredImageUrl: z
    .string()
    .optional()
    .describe("Featured image URL, rendered via ct-image alongside the banner's content."),
  featuredImageAlt: z.string().optional().describe('Featured image alt text.'),
  backgroundImageUrl: z.string().optional().describe('Full-bleed background image URL, painted via CSS background-image.'),
  backgroundImageAlt: z
    .string()
    .optional()
    .describe('Background image alt text, exposed via a visually-hidden role="img" span.'),
  backgroundImageBlendMode: z
    .enum([
      'normal',
      'color',
      'color-burn',
      'color-dodge',
      'darken',
      'difference',
      'exclusion',
      'hard-light',
      'hue',
      'lighten',
      'luminosity',
      'multiply',
      'overlay',
      'saturation',
      'screen',
      'soft-light',
    ])
    .optional()
    .default('normal')
    .describe("Background image blend mode. Defaults to 'normal'."),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type BannerProps = z.infer<typeof BannerSchema>;
