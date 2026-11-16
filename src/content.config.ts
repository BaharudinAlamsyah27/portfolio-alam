import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Teks dua bahasa: ID wajib, EN opsional (fallback ke ID jika kosong). */
const localized = z.object({
  id: z.string().default(''),
  en: z.string().default(''),
});

const category = z.enum(['web', 'mobile', 'ai', 'game', 'network', 'other']);

const socialPlatform = z.enum([
  'github',
  'linkedin',
  'instagram',
  'x',
  'youtube',
  'tiktok',
  'facebook',
  'threads',
  'whatsapp',
  'telegram',
  'email',
  'website',
  'other',
]);

const projects = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: localized,
      cover: image().optional(),
      stack: z.array(z.string()).default([]),
      category: category.default('web'),
      demoUrl: z.string().default(''),
      repoUrl: z.string().default(''),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      order: z.number().default(100),
      date: z.coerce.date(),
      status: z.enum(['selesai', 'berjalan', 'arsip']).default('selesai'),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/experience' }),
  schema: z.object({
    title: localized,
    organization: z.string(),
    kind: z.enum(['pendidikan', 'kerja', 'magang', 'lainnya']).default('lainnya'),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    current: z.boolean().default(false),
    description: localized,
  }),
});

const places = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/places' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      region: z.string().default(''),
      visitedAt: z.coerce.date().optional(),
      note: localized,
      stamp: image().optional(),
    }),
});

const profile = defineCollection({
  loader: glob({ pattern: 'profile.yaml', base: './src/content/singletons' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      nickname: z.string(),
      role: localized,
      tagline: localized,
      bio: localized,
      location: z.string().default(''),
      photo: image().optional(),
      email: z.string().default(''),
      cvUrl: z.string().default(''),
      openToWork: z.boolean().default(true),
      socials: z
        .array(
          z.object({
            platform: socialPlatform,
            label: z.string().default(''),
            url: z.string(),
          }),
        )
        .default([]),
      jogging: z
        .object({
          totalKm: z.number().default(0),
          favoriteRoute: z.string().default(''),
          note: localized.optional(),
        })
        .default({ totalKm: 0, favoriteRoute: '' }),
    }),
});

const skills = defineCollection({
  loader: glob({ pattern: 'skills.yaml', base: './src/content/singletons' }),
  schema: z.object({
    items: z
      .array(
        z.object({
          name: z.string(),
          category: z.enum(['web', 'mobile', 'ai', 'game', 'network', 'tool', 'other']).default('web'),
          level: z.enum(['dikuasai', 'didalami', 'dieksplor']),
          note: localized.optional(),
        }),
      )
      .default([]),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: 'now.yaml', base: './src/content/singletons' }),
  schema: z.object({
    updatedAt: z.coerce.date(),
    summary: localized,
    learning: z.array(z.string()).default([]),
    building: z.array(z.string()).default([]),
    exploring: z.array(z.string()).default([]),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/changelog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    version: z.string().default(''),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    summary: localized,
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const guestbook = defineCollection({
  loader: glob({ pattern: 'guestbook.yaml', base: './src/content/singletons' }),
  schema: z.object({
    entries: z
      .array(
        z.object({
          name: z.string(),
          role: z.string().default('Tamu'),
          message: z.string(),
          color: z.enum(['mustard', 'blush', 'paper', 'leaf']).default('mustard'),
          date: z.string().default('2026-11-16'),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  projects,
  experience,
  places,
  profile,
  skills,
  now,
  changelog,
  notes,
  guestbook,
};
