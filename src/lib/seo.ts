const DEFAULT_TITLE_SUFFIX = 'AI 教育产品经理';

export function resolveDocumentTitle(customTitle: string | undefined, name: string): string {
	const trimmed = customTitle?.trim();
	return trimmed ? trimmed : `${name} · ${DEFAULT_TITLE_SUFFIX}`;
}

export function absoluteOgImageUrl(siteOrigin: string | URL | undefined, imagePath: string): string {
	if (!siteOrigin) {
		throw new Error('astro.config site is required for Open Graph URLs');
	}

	return new URL(imagePath, siteOrigin).href;
}
