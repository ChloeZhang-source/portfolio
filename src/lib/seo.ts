const DEFAULT_TITLE_SUFFIX = 'AI 教育产品经理';

export function resolveDocumentTitle(customTitle: string | undefined, name: string): string {
	const trimmed = customTitle?.trim();
	return trimmed ? trimmed : `${name} · ${DEFAULT_TITLE_SUFFIX}`;
}

export function absoluteOgImageUrl(siteOrigin: string | URL, imagePath: string): string {
	return new URL(imagePath, siteOrigin).href;
}
