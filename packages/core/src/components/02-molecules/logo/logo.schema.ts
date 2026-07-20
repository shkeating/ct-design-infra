import { z } from 'zod';

export const LogoSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  type: z
    .enum(['default', 'stacked', 'inline', 'inline-stacked'])
    .optional()
    .default('default')
    .describe('Logo display type. "default" renders only the primary logo; the others also render a secondary logo with a divider stripe.'),
  url: z.string().optional().describe('Optional URL that wraps the logo in a link (e.g. back to the homepage).'),
  title: z
    .string()
    .optional()
    .default('Click to go to the homepage')
    .describe('Title attribute rendered on the wrapping link (only used when `url` is set).'),
  primaryMobileUrl: z.string().optional().describe('Primary logo image URL for mobile viewports.'),
  primaryMobileAlt: z.string().optional().describe('Primary logo image alt text for mobile viewports.'),
  primaryDesktopUrl: z.string().optional().describe('Primary logo image URL for desktop viewports (>=992px).'),
  primaryDesktopAlt: z.string().optional().describe('Primary logo image alt text for desktop viewports.'),
  secondaryMobileUrl: z
    .string()
    .optional()
    .describe('Secondary logo image URL for mobile viewports. Only rendered when `type` is not "default".'),
  secondaryMobileAlt: z.string().optional().describe('Secondary logo image alt text for mobile viewports.'),
  secondaryDesktopUrl: z
    .string()
    .optional()
    .describe('Secondary logo image URL for desktop viewports (>=992px). Only rendered when `type` is not "default".'),
  secondaryDesktopAlt: z.string().optional().describe('Secondary logo image alt text for desktop viewports.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type LogoProps = z.infer<typeof LogoSchema>;
