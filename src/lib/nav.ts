import { stripBase, withBase } from './paths.ts';

const NAV_PATH_BY_CHAPTER = {
	home: '/#home',
	work: '/#work',
	experience: '/#experience',
} as const;

export const NAV_HREF_BY_CHAPTER = {
	home: withBase(NAV_PATH_BY_CHAPTER.home),
	work: withBase(NAV_PATH_BY_CHAPTER.work),
	experience: withBase(NAV_PATH_BY_CHAPTER.experience),
} as const;

export type NavChapter = keyof typeof NAV_PATH_BY_CHAPTER;

export function navHrefForChapter(chapter: NavChapter, baseUrl?: string): string {
	return withBase(NAV_PATH_BY_CHAPTER[chapter], baseUrl);
}

export function navCurrentHref(pathname: string, hash = '', baseUrl?: string): string {
	const path = stripBase(pathname, baseUrl);
	if (/^\/work(\/|$)/.test(path)) {
		return navHrefForChapter('work', baseUrl);
	}

	const section = hash.replace(/^#/, '');
	if (section === 'work') {
		return navHrefForChapter('work', baseUrl);
	}

	if (section === 'experience' || section === 'contact') {
		return navHrefForChapter('experience', baseUrl);
	}

	return navHrefForChapter('home', baseUrl);
}
