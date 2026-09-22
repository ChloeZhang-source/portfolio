import { stripBase, withBase } from './paths.ts';

const NAV_PATH_BY_CHAPTER = {
	home: '/#home',
	work: '/#work',
	about: '/#about',
} as const;

export const NAV_HREF_BY_CHAPTER = {
	home: withBase(NAV_PATH_BY_CHAPTER.home),
	work: withBase(NAV_PATH_BY_CHAPTER.work),
	about: withBase(NAV_PATH_BY_CHAPTER.about),
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

	if (section === 'about' || section === 'contact' || section === 'experience') {
		return navHrefForChapter('about', baseUrl);
	}

	return navHrefForChapter('home', baseUrl);
}
