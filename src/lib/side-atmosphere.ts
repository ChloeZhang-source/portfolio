export const SIDE_CHAPTERS = ['home', 'work', 'about'] as const;

export type SideChapter = (typeof SIDE_CHAPTERS)[number];

export const SIDE_CHAPTER_SELECTORS: Record<SideChapter, string> = {
	home: '#home',
	work: '#work',
	about: '.chapter--about',
};

export const SIDE_CHAPTER_FOLIOS: Record<SideChapter, string> = {
	home: '01',
	work: '02',
	about: '03',
};

export function spineNodeY(markerTop: number, pageTop: number, pageHeight: number): number {
	if (pageHeight <= 0) {
		return 0;
	}

	return Math.min(Math.max(markerTop - pageTop, 0), pageHeight);
}

export interface SpineStation {
	top: number;
	nodeY: number;
}

export function spineCaretY(stations: readonly SpineStation[], anchor: number): number {
	if (stations.length === 0) {
		return 0;
	}

	if (anchor < stations[0].top) {
		return stations[0].nodeY;
	}

	for (let i = 0; i < stations.length - 1; i++) {
		const a = stations[i];
		const b = stations[i + 1];
		if (anchor <= b.top) {
			const span = b.top - a.top;
			if (span === 0) {
				return b.nodeY;
			}

			return a.nodeY + ((b.nodeY - a.nodeY) * (anchor - a.top)) / span;
		}
	}

	return stations[stations.length - 1].nodeY;
}

export interface ChapterBounds {
	id: SideChapter;
	top: number;
	bottom: number;
}

export function resolveActiveChapter(
	chapters: readonly ChapterBounds[],
	viewportAnchor: number,
): SideChapter {
	if (chapters.length === 0) {
		return 'home';
	}

	let active: SideChapter = chapters[0].id;
	for (const chapter of chapters) {
		if (chapter.top <= viewportAnchor) {
			active = chapter.id;
		}
	}
	return active;
}
