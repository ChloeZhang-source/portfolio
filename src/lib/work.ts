import { withBase } from './paths.ts';

export type WorkAccess = 'public' | 'demo';

export function workCaseHref(slug: string, baseUrl?: string): string {
	return withBase(`/work/${slug}`, baseUrl);
}

export function showCaseDemo(work: {
	access: WorkAccess;
	demoNotes?: string;
	demoAccount?: string;
	demoPassword?: string;
}): boolean {
	return work.access === 'demo' && Boolean(work.demoNotes);
}

export function caseProductCta(work: {
	access: WorkAccess;
	productUrl?: string;
	ctaLabel: string;
}) {
	if (work.access === 'demo') {
		return {
			href: '#gallery',
			label: work.ctaLabel,
			external: false,
		};
	}

	return {
		href: work.productUrl ?? '',
		label: work.ctaLabel,
		external: true,
	};
}

export function otherCaseWork<T extends { slug: string }>(works: T[], currentSlug: string): T | undefined {
	return works.find((work) => work.slug !== currentSlug);
}
