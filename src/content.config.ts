import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* Events — one Markdown file per event; the body is the description. */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    startTime: z.string().optional(),
    location: z.string(),
    address: z.string().optional(),
    entryFee: z.string().optional(),
    hosts: z.string().optional(),
    registrationUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    imageLabel: z.string().optional(),
  }),
});

/* Board & advisory members — one Markdown file per person; body is the bio. */
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      group: z.enum(['leadership', 'advisory']).default('advisory'),
      order: z.number(),
      isVeteran: z.boolean().default(false),
      branch: z.string().optional(),
      portrait: image().optional(),
    }),
});

/* Programs / services — one Markdown file per service; body is the detail. */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.string(),
    order: z.number(),
    imageLabel: z.string().optional(),
  }),
});

/* Honor Roll — one Markdown file per honoree; body is the tribute. */
const honorees = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/honorees' }),
  schema: z.object({
    name: z.string(),
    branch: z.string(),
    era: z.string(),
    years: z.string().optional(),
    order: z.number().default(0),
  }),
});

/* Testimonials — data file (Veterans Corner video testimonies). */
const testimonials = defineCollection({
  loader: file('./src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    branch: z.string(),
    quote: z.string().optional(),
    videoUrl: z.string().url().optional(),
    order: z.number(),
  }),
});

/* Sponsors — data file (homepage sponsor wall). */
const sponsors = defineCollection({
  loader: file('./src/content/sponsors.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().url().optional(),
    tier: z.enum(['partner', 'sponsor', 'supporter']).default('sponsor'),
  }),
});

/* Gallery — data file; each entry is a captioned photo slot. */
const gallery = defineCollection({
  loader: file('./src/content/gallery.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    caption: z.string(),
    year: z.string().optional(),
  }),
});

export const collections = { events, team, services, honorees, testimonials, sponsors, gallery };
