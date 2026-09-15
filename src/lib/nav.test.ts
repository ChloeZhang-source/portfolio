import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('homepage hash picks Home / Explore / Experience, and case pages stay on Explore', async () => {
	const { navCurrentHref } = await import('./nav.ts');

	assert.equal(navCurrentHref('/'), '/#home');
	assert.equal(navCurrentHref('/', ''), '/#home');
	assert.equal(navCurrentHref('/', '#home'), '/#home');
	assert.equal(navCurrentHref('/', '#work'), '/#work');
	assert.equal(navCurrentHref('/', '#experience'), '/#experience');
	assert.equal(navCurrentHref('/', '#contact'), '/#experience');
	assert.equal(navCurrentHref('/work/speaking'), '/#work');
	assert.equal(navCurrentHref('/work/interview', '#demo'), '/#work');
	assert.equal(navCurrentHref('/work/speaking/'), '/#work');
});

test('nav hrefs share the homepage chapter ids used by side atmosphere', async () => {
	const { navHrefForChapter } = await import('./nav.ts');
	const { SIDE_CHAPTERS } = await import('./side-atmosphere.ts');

	assert.deepEqual([...SIDE_CHAPTERS], ['home', 'work', 'experience']);
	assert.equal(navHrefForChapter('home'), '/#home');
	assert.equal(navHrefForChapter('work'), '/#work');
	assert.equal(navHrefForChapter('experience'), '/#experience');
});

test('nav strips the GitHub Pages base before matching case routes', async () => {
	const source = await readFile(join(here, 'nav.ts'), 'utf8');
	const { navCurrentHref } = await import('./nav.ts');
	const { withBase } = await import('./paths.ts');

	assert.match(source, /withBase/);
	assert.match(source, /stripBase/);
	assert.equal(
		navCurrentHref('/portfolio/work/speaking', '', '/portfolio/'),
		withBase('/#work', '/portfolio/'),
	);
	assert.equal(
		navCurrentHref('/portfolio/', '#experience', '/portfolio/'),
		withBase('/#experience', '/portfolio/'),
	);
});
