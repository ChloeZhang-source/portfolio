import assert from 'node:assert/strict';
import { test } from 'node:test';

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

test('absolute OG image URL is resolved against the site origin', async () => {
	const { absoluteOgImageUrl } = await import('./seo.ts');

	assert.equal(
		absoluteOgImageUrl('https://example.com', '/avatar.jpg'),
		'https://example.com/avatar.jpg',
	);
	assert.equal(
		absoluteOgImageUrl(new URL('https://example.com/'), '/work/speaking/cover.jpg'),
		'https://example.com/work/speaking/cover.jpg',
	);
});
