import { defineCollection, reference } from 'astro:content';
import { image } from 'astro/content/image';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import * as v from 'valibot';

const authors = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/authors' }),
	schema: v.object({
		name: v.string(),
		bio: v.string(),
	}),
});

const zodPosts = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/zod-posts' }),
	schema: z.object({
		title: z.string(),
		published: z.coerce.date(),
		tags: z.array(z.string()).default([]),
	}),
});

const valibotPosts = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/valibot-posts' }),
	schema: v.object({
		title: v.string(),
		draft: v.optional(v.boolean(), false),
		author: v.pipe(v.string(), v.transform((id) => reference('authors', id))),
	}),
});

const imagePosts = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/image-posts' }),
	schema: (context) =>
		z.object({
			title: z.string(),
			cover: z
				.string()
				.transform(async (src) => await image(context, { src }))
				.refine((cover) => (cover.width ?? 0) >= 1, 'cover image must have a width'),
		}),
});

const legacyApiPosts = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/legacy-api-posts' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			cover: image(),
			author: reference('authors'),
		}),
});

const settings = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/settings' }),
	schema: z.object({
		title: z.string(),
		maxItems: z.number().int().min(1),
	}),
});

export const collections = { authors, zodPosts, valibotPosts, imagePosts, legacyApiPosts, settings };
