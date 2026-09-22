import { z } from 'astro/zod';

export const worksSchema = z
	.object({
		title: z.string(),
		slug: z.string(),
		tagline: z.string(),
		description: z.string(),
		role: z.string(),
		result: z.string(),
		transferable: z.string(),
		summaryEn: z.string(),
		summaryEnShort: z.string().optional(),
		cover: z.string(),
		video: z.string().optional(),
		gallery: z.array(
			z.object({
				image: z.string(),
				alt: z.string(),
				caption: z.string(),
			}),
		),
		productUrl: z.string().url().optional(),
		ctaLabel: z.enum(['直接开练', '看脱敏流程']),
		access: z.enum(['public', 'demo']),
		demoNotes: z.string().optional(),
		order: z.number().int(),
	})
	.superRefine((value, ctx) => {
		if (value.access === 'public' && !value.productUrl) {
			ctx.addIssue({
				code: 'custom',
				path: ['productUrl'],
				message: 'public works need a product URL',
			});
		}

		if (value.access === 'demo' && !value.demoNotes) {
			ctx.addIssue({
				code: 'custom',
				path: ['demoNotes'],
				message: 'demo works need access notes',
			});
		}
	});

export type Work = z.infer<typeof worksSchema>;
