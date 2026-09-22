/** Intrinsic pixel sizes for work screenshots in public/ (used for CLS). */
const sizes: Record<string, { width: number; height: number }> = {
	'/work/speaking/cover.jpg': { width: 1600, height: 870 },
	'/work/speaking/gallery-2.jpg': { width: 1600, height: 868 },
	'/work/speaking/gallery-3.jpg': { width: 1600, height: 869 },
	'/work/interview/cover.jpg': { width: 1600, height: 858 },
	'/work/interview/gallery-1.jpg': { width: 1600, height: 1223 },
	'/work/interview/gallery-2.jpg': { width: 1600, height: 858 },
	'/work/interview/gallery-3.jpg': { width: 1600, height: 858 },
};

export function workImageSize(src: string): { width: number; height: number } {
	return sizes[src] ?? { width: 1600, height: 900 };
}
