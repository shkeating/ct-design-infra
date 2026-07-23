import { z } from 'zod';

export const SearchSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().describe('Theme variation (light or dark).'),
  label: z.string().optional().describe('Text for the search link.'),
  url: z.string().optional().describe('Search page URL.'),
  modifierClass: z.string().optional().describe('Additional CSS classes.'),
});

export type SearchProps = z.infer<typeof SearchSchema>;
