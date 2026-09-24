import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const HOME_DOCUMENT_TITLE = '张晓雪 · 文科生转 AI 的作品集｜口语陪练与面试系统';

test('default document title is SEO option A homepage title', async () => {
	const { resolveDocumentTitle } = await import('./seo.ts');

	assert.equal(resolveDocumentTitle(undefined, HOME_DOCUMENT_TITLE), HOME_DOCUMENT_TITLE);
});

test('custom title overrides the default document title', async () => {
	const { resolveDocumentTitle } = await import('./seo.ts');

	assert.equal(
		resolveDocumentTitle('works collection preview', HOME_DOCUMENT_TITLE),
		'works collection preview',
	);
});

test('blank custom title falls back to the default document title', async () => {
	const { resolveDocumentTitle } = await import('./seo.ts');

	assert.equal(resolveDocumentTitle('', HOME_DOCUMENT_TITLE), HOME_DOCUMENT_TITLE);
	assert.equal(resolveDocumentTitle('   ', HOME_DOCUMENT_TITLE), HOME_DOCUMENT_TITLE);
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

test('home JSON-LD is Person + WebSite + ItemList with locked sameAs', async () => {
	const { buildHomeJsonLd } = await import('./seo.ts');

	const graph = buildHomeJsonLd();
	assert.equal(graph['@context'], 'https://schema.org');
	assert.ok(Array.isArray(graph['@graph']));
	assert.equal(graph['@graph'].length, 3);

	const [person, website, itemList] = graph['@graph'];

	assert.equal(person['@type'], 'Person');
	assert.equal(person['@id'], 'https://chloezhang-source.github.io/portfolio/#person');
	assert.equal(person.name, '张晓雪');
	assert.equal(person.alternateName, 'Chloe');
	assert.equal(person.jobTitle, 'AI 产品设计');
	assert.equal(
		person.description,
		'文科生，不写代码，我用 AI 当开发工具，把两个产品推到了有人用。',
	);
	assert.equal(person.url, 'https://chloezhang-source.github.io/portfolio/');
	assert.deepEqual(person.sameAs, [
		'https://httpsaitalk.win/',
		'https://github.com/chloezhang-source',
	]);
	assert.ok(!JSON.stringify(person.sameAs).includes('xiaohongshu'));
	assert.ok(!JSON.stringify(person.sameAs).includes('小红书'));

	assert.equal(website['@type'], 'WebSite');
	assert.equal(website['@id'], 'https://chloezhang-source.github.io/portfolio/#website');
	assert.equal(website.name, '张晓雪 · 作品集');
	assert.equal(website.inLanguage, 'zh-CN');
	assert.deepEqual(website.author, {
		'@id': 'https://chloezhang-source.github.io/portfolio/#person',
	});

	assert.equal(itemList['@type'], 'ItemList');
	assert.equal(itemList.name, '作品');
	assert.equal(itemList.itemListElement.length, 2);
	assert.equal(itemList.itemListElement[0].item['@type'], 'CreativeWork');
	assert.equal(itemList.itemListElement[0].item.name, 'AI 口语陪练');
	assert.equal(
		itemList.itemListElement[0].item.url,
		'https://chloezhang-source.github.io/portfolio/work/speaking/',
	);
	assert.equal(itemList.itemListElement[1].item.name, '教师招聘面试系统');
	assert.equal(
		itemList.itemListElement[1].item.url,
		'https://chloezhang-source.github.io/portfolio/work/interview/',
	);
});

test('case JSON-LD is CreativeWork pointing at the shared Person @id', async () => {
	const { buildCaseJsonLd } = await import('./seo.ts');

	const speaking = buildCaseJsonLd({
		name: 'AI 口语陪练',
		url: 'https://chloezhang-source.github.io/portfolio/work/speaking/',
		description: '练口语卡在开口之前——所以我拆了注册墙，让第一轮先成立。',
	});

	assert.equal(speaking['@context'], 'https://schema.org');
	assert.equal(speaking['@type'], 'CreativeWork');
	assert.equal(speaking.name, 'AI 口语陪练');
	assert.equal(speaking.url, 'https://chloezhang-source.github.io/portfolio/work/speaking/');
	assert.equal(speaking.inLanguage, 'zh-CN');
	assert.deepEqual(speaking.author, {
		'@id': 'https://chloezhang-source.github.io/portfolio/#person',
	});
});
