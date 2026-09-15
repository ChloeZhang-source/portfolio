import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('default document title is {name} · AI 教育产品经理', async () => {
	const { resolveDocumentTitle } = await import('./seo.ts');

	assert.equal(resolveDocumentTitle(undefined, '姓名'), '姓名 · AI 教育产品经理');
});

test('custom title overrides the default document title', async () => {
	const { resolveDocumentTitle } = await import('./seo.ts');

	assert.equal(
		resolveDocumentTitle('works collection preview', '姓名'),
		'works collection preview',
	);
});

test('blank custom title falls back to the default document title', async () => {
	const { resolveDocumentTitle } = await import('./seo.ts');

	assert.equal(resolveDocumentTitle('', '姓名'), '姓名 · AI 教育产品经理');
	assert.equal(resolveDocumentTitle('   ', '姓名'), '姓名 · AI 教育产品经理');
});

test('absolute OG image URL is resolved against the GitHub Pages origin plus base', async () => {
	const { absoluteOgImageUrl } = await import('./seo.ts');
	const { withBase } = await import('./paths.ts');

	assert.equal(
		absoluteOgImageUrl(
			'https://chloezhang-source.github.io',
			withBase('/avatar.jpg', '/portfolio/'),
		),
		'https://chloezhang-source.github.io/portfolio/avatar.jpg',
	);
	assert.equal(
		absoluteOgImageUrl(
			new URL('https://chloezhang-source.github.io/'),
			withBase('/work/speaking/cover.jpg', '/portfolio/'),
		),
		'https://chloezhang-source.github.io/portfolio/work/speaking/cover.jpg',
	);
});

test('astro config points site and base at the GitHub Pages project site', async () => {
	const source = await readFile(join(here, '../../astro.config.mjs'), 'utf8');

	assert.match(source, /site:\s*['"]https:\/\/chloezhang-source\.github\.io['"]/);
	assert.match(source, /base:\s*['"]\/portfolio\/['"]/);
	assert.doesNotMatch(source, /example\.com/);
});

test('GitHub Pages workflow tests, builds, and publishes dist/', async () => {
	const source = await readFile(join(here, '../../.github/workflows/pages.yml'), 'utf8');

	assert.match(source, /npm ci/);
	assert.match(source, /npm test/);
	assert.match(source, /npm run build/);
	assert.match(source, /\bdist\/?/);
	assert.match(source, /push:/);
	assert.match(source, /\bmain\b/);
});
