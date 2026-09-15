import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { worksSchema } from './content/works-schema';

const works = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/works' }),
	schema: worksSchema, // gallery shots use `image`, not `src`
});

export const collections = { works };
