import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('homepage hash picks Home / Work / About / Contact, and case pages stay on Work', async () => {
	const { navCurrentHref } = await import('./nav.ts');

	assert.equal(navCurrentHref('/'), '/#home');
	assert.equal(navCurrentHref('/', ''), '/#home');
	assert.equal(navCurrentHref('/', '#home'), '/#home');
	assert.equal(navCurrentHref('/', '#work'), '/#work');
	assert.equal(navCurrentHref('/', '#about'), '/#about');
	assert.equal(navCurrentHref('/', '#contact'), '/#contact');
	assert.equal(navCurrentHref('/', '#experience'), '/#about');
	assert.equal(navCurrentHref('/work/speaking'), '/#work');
	assert.equal(navCurrentHref('/work/interview', '#demo'), '/#work');
	assert.equal(navCurrentHref('/work/speaking/'), '/#work');
});

test('nav hrefs cover contact while side atmosphere stays on three chapters', async () => {
	const { navHrefForChapter } = await import('./nav.ts');
	const { SIDE_CHAPTERS } = await import('./side-atmosphere.ts');

	assert.deepEqual([...SIDE_CHAPTERS], ['home', 'work', 'about']);
	assert.equal(navHrefForChapter('home'), '/#home');
	assert.equal(navHrefForChapter('work'), '/#work');
	assert.equal(navHrefForChapter('about'), '/#about');
	assert.equal(navHrefForChapter('contact'), '/#contact');
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
		navCurrentHref('/portfolio/', '#about', '/portfolio/'),
		withBase('/#about', '/portfolio/'),
	);
});
