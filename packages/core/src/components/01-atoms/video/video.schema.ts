import { z } from 'zod';

export const VideoSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  videoTitle: z.string().optional().describe('Video title, threaded through as the native `title` attribute.'),
  hasControls: z.boolean().optional().default(false).describe('Whether the video should show native playback controls.'),
  src: z.string().describe('Video source URL. Renders nothing when empty.'),
  type: z.string().optional().describe("Video source MIME type (e.g. 'video/mp4', 'video/webm')."),
  poster: z.string().optional().describe('Poster image URL, shown before playback starts.'),
  width: z.number().optional().describe('Video width (intrinsic, in pixels).'),
  height: z.number().optional().describe('Video height (intrinsic, in pixels).'),
  fallbackText: z
    .string()
    .optional()
    .default("Your browser doesn't support HTML5 video.")
    .describe("Message shown to browsers that don't support the HTML5 <video> element."),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type VideoProps = z.infer<typeof VideoSchema>;
