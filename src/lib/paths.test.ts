import assert from 'node:assert/strict';
import { test } from 'node:test';

test('withBase prefixes the GitHub Pages base onto public and hash paths', async () => {
	const { withBase } = await import('./paths.ts');

	assert.equal(withBase('/#about', '/portfolio/'), '/portfolio/#about');
	assert.equal(withBase('/#home', '/portfolio/'), '/portfolio/#home');
	assert.equal(withBase('/work/speaking/', '/portfolio/'), '/portfolio/work/speaking/');
	assert.equal(withBase('/resume.pdf', '/portfolio/'), '/portfolio/resume.pdf');
	assert.equal(withBase('/avatar.jpg', '/portfolio/'), '/portfolio/avatar.jpg');
	assert.equal(withBase('/fonts/noto-serif-sc-title.woff2', '/portfolio/'), '/portfolio/fonts/noto-serif-sc-title.woff2');
	assert.equal(withBase('/', '/portfolio/'), '/portfolio/');
});

test('withBase keeps a trailing slash when the path ends with one', async () => {
	const { withBase } = await import('./paths.ts');

	assert.equal(withBase('/work/speaking/', '/portfolio/'), '/portfolio/work/speaking/');
	assert.equal(withBase('/work/interview/', '/'), '/work/interview/');
});

test('withBase keeps root-relative paths when the site is served from /', async () => {
	const { withBase } = await import('./paths.ts');

	assert.equal(withBase('/#about'), '/#about');
	assert.equal(withBase('/work/interview/'), '/work/interview/');
	assert.equal(withBase('/resume.pdf', '/'), '/resume.pdf');
	assert.equal(withBase('/'), '/');
});
test('withBase leaves absolute http(s) URLs unchanged', async () => {
	const { withBase } = await import('./paths.ts');

	assert.equal(
		withBase('https://example.com/speaking', '/portfolio/'),
		'https://example.com/speaking',
	);
});

test('stripBase removes the Pages prefix so case pathnames still match /work', async () => {
	const { stripBase } = await import('./paths.ts');

	assert.equal(stripBase('/portfolio/work/speaking', '/portfolio/'), '/work/speaking');
	assert.equal(stripBase('/portfolio/work/speaking/', '/portfolio/'), '/work/speaking/');
	assert.equal(stripBase('/portfolio/', '/portfolio/'), '/');
	assert.equal(stripBase('/portfolio', '/portfolio/'), '/');
	assert.equal(stripBase('/work/speaking', '/portfolio/'), '/work/speaking');
	assert.equal(stripBase('/work/speaking', '/'), '/work/speaking');
	assert.equal(stripBase('/'), '/');
});
