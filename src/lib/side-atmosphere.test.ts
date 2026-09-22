import assert from 'node:assert/strict';
import { test } from 'node:test';

test('active chapter is the last section whose top has crossed the viewport anchor', async () => {
	const { resolveActiveChapter } = await import('./side-atmosphere.ts');

	const chapters = [
		{ id: 'home' as const, top: 80, bottom: 900 },
		{ id: 'work' as const, top: 920, bottom: 1900 },
		{ id: 'about' as const, top: 1920, bottom: 2800 },
	];

	assert.equal(resolveActiveChapter(chapters, 256), 'home');
	assert.equal(
		resolveActiveChapter(
			[
				{ id: 'home', top: -600, bottom: 280 },
				{ id: 'work', top: 300, bottom: 1280 },
				{ id: 'about', top: 1300, bottom: 2180 },
			],
			256,
		),
		'home',
	);
	assert.equal(
		resolveActiveChapter(
			[
				{ id: 'home', top: -700, bottom: 120 },
				{ id: 'work', top: 140, bottom: 1120 },
				{ id: 'about', top: 1140, bottom: 2020 },
			],
			256,
		),
		'work',
	);
	assert.equal(
		resolveActiveChapter(
			[
				{ id: 'home', top: -1800, bottom: -980 },
				{ id: 'work', top: -960, bottom: 20 },
				{ id: 'about', top: 40, bottom: 920 },
			],
			256,
		),
		'about',
	);
});

test('about is observed on the existing chapter wrapper, not a second id', async () => {
	const { SIDE_CHAPTER_SELECTORS } = await import('./side-atmosphere.ts');

	assert.equal(SIDE_CHAPTER_SELECTORS.home, '#home');
	assert.equal(SIDE_CHAPTER_SELECTORS.work, '#work');
	assert.equal(SIDE_CHAPTER_SELECTORS.about, '.chapter--about');
});

test('missing chapters fall back to home', async () => {
	const { resolveActiveChapter } = await import('./side-atmosphere.ts');

	assert.equal(resolveActiveChapter([], 256), 'home');
});

test('chapter folios are 01 02 03 in reading order', async () => {
	const { SIDE_CHAPTERS, SIDE_CHAPTER_FOLIOS } = await import('./side-atmosphere.ts');

	assert.deepEqual(
		SIDE_CHAPTERS.map((id) => SIDE_CHAPTER_FOLIOS[id]),
		['01', '02', '03'],
	);
});

test('spine node Y is the marker offset within the page, clamped', async () => {
	const { spineNodeY } = await import('./side-atmosphere.ts');

	assert.equal(spineNodeY(180, 80, 2000), 100);
	assert.equal(spineNodeY(40, 80, 2000), 0);
	assert.equal(spineNodeY(2200, 80, 2000), 2000);
	assert.equal(spineNodeY(180, 80, 0), 0);
});

test('spine caret Y lerps between stations and parks at the ends', async () => {
	const { spineCaretY } = await import('./side-atmosphere.ts');

	const stations = [
		{ top: 80, nodeY: 40 },
		{ top: 920, nodeY: 400 },
		{ top: 1920, nodeY: 900 },
	];

	assert.equal(spineCaretY([], 256), 0);
	assert.equal(spineCaretY(stations, 20), 40);
	assert.equal(spineCaretY(stations, 80), 40);
	assert.equal(spineCaretY(stations, 920), 400);
	assert.equal(spineCaretY(stations, 500), 220);
	assert.equal(spineCaretY(stations, 1920), 900);
	assert.equal(spineCaretY(stations, 2400), 900);
});

test('spine caret Y does not divide by a zero-length station gap', async () => {
	const { spineCaretY } = await import('./side-atmosphere.ts');

	assert.equal(
		spineCaretY(
			[
				{ top: 100, nodeY: 10 },
				{ top: 100, nodeY: 50 },
			],
			100,
		),
		50,
	);
});
