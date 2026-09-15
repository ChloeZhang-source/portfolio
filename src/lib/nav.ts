export const NAV_HREF_BY_CHAPTER = {
	home: '/#home',
	work: '/#work',
	experience: '/#experience',
} as const;

export type NavChapter = keyof typeof NAV_HREF_BY_CHAPTER;

export function navHrefForChapter(chapter: NavChapter): string {
	return NAV_HREF_BY_CHAPTER[chapter];
}

export function navCurrentHref(pathname: string, hash = ''): string {
	if (/^\/work(\/|$)/.test(pathname)) {
		return NAV_HREF_BY_CHAPTER.work;
	}

	const section = hash.replace(/^#/, '');
	if (section === 'work') {
		return NAV_HREF_BY_CHAPTER.work;
	}

	if (section === 'experience' || section === 'contact') {
		return NAV_HREF_BY_CHAPTER.experience;
	}

	return NAV_HREF_BY_CHAPTER.home;
}
