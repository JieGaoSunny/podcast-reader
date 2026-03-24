import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    source_url: z.string().url(),
    channel: z.string(),
    guest: z.string().optional(),
    guest_title: z.string().optional(),
    thumbnail: z.string().url(),
    tags: z.array(z.string()).default([]),
    duration: z.string().optional(),
    reading_time: z.number().optional(),
    volume: z.string().optional(),
    draft: z.boolean().default(false),
    layout: z.string().optional(),
    illustration: z.string().optional(),
  }),
});

export const collections = { posts };
