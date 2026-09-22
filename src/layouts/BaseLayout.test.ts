import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('BaseLayout wires SEO helpers, named slots, and viewport scale', async () => {
	const source = await readFile(join(here, 'BaseLayout.astro'), 'utf8');

	assert.match(source, /import\s+['"]\.\.\/styles\/global\.css['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /resolveDocumentTitle/);
	assert.match(source, /absoluteOgImageUrl/);
	assert.match(source, /withBase/);
	assert.match(source, /site\.name/);
	assert.match(source, /site\.headline/);
	assert.match(source, /site\.ogImage/);
	assert.match(source, /site\.headlineRole/);
	assert.doesNotMatch(source, /ogImage\s*=\s*site\.avatarSrc/);

	assert.match(source, /content=["']width=device-width,\s*initial-scale=1["']/);
	assert.match(source, /name=["']description["']/);
	assert.match(source, /property=["']og:title["']/);
	assert.match(source, /property=["']og:description["']/);
	assert.match(source, /property=["']og:image["']/);
	assert.match(source, /property=["']og:image:width["']/);
	assert.match(source, /property=["']og:image:height["']/);
	assert.match(source, /property=["']og:image:alt["']/);
	assert.match(source, /content=\{ogImageWidth\}/);
	assert.match(source, /content=\{ogImageHeight\}/);
	assert.match(source, /content=\{ogImageAlt\}/);
	assert.match(source, /ogImageWidth\s*=\s*['"]1200['"]/);
	assert.match(source, /ogImageHeight\s*=\s*['"]630['"]/);
	assert.match(source, /property=["']og:url["']/);
	assert.match(source, /property=["']og:type["']/);
	assert.match(source, /content=["']website["']/);
	assert.match(source, /rel=["']canonical["']/);
	assert.match(source, /rel=["']icon["']/);
	assert.match(source, /favicon\.svg/);
	assert.match(source, /absoluteOgImageUrl\(\s*Astro\.site\s*,\s*withBase\(ogImage\)\s*\)/);
	assert.doesNotMatch(source, /example\.com/);

	assert.match(source, /<slot\s+name=["']header["']\s*\/>/);
	assert.match(source, /<slot\s+name=["']footer["']\s*\/>/);
	assert.match(source, /href=["']#main["']/);
	assert.match(source, /跳到正文/);
	assert.match(source, /<main\s+id=["']main["']\s+tabindex=["']-1["']>/);
	assert.match(source, /<main[\s\S]*<slot\s*\/>[\s\S]*<\/main>/);

	const skipAt = source.indexOf('href="#main"');
	const mainAt = source.indexOf('<main');
	assert.ok(skipAt > -1 && skipAt < mainAt, 'skip link must sit before main');

	assert.doesNotMatch(source, /Header\.astro|Footer\.astro|Contact\.astro/);
	assert.doesNotMatch(source, /hello@example\.com/);
});

test('BaseLayout self-hosts a heading Noto Serif SC subset', async () => {
	const source = await readFile(join(here, 'BaseLayout.astro'), 'utf8');

	assert.match(source, /rel=["']preload["']/);
	assert.match(source, /as=["']font["']/);
	assert.match(source, /withBase\(['"]\/fonts\/noto-serif-sc-title\.woff2['"]\)/);
	assert.match(source, /url\("\$\{titleFontHref\}"\)/);
	assert.doesNotMatch(source, /url\(["']\{titleFontHref\}["']\)/);
	assert.match(source, /@font-face/);
	assert.match(source, /font-family:\s*["']Noto Serif SC["']/);
	assert.match(source, /font-display:\s*swap/);
	assert.match(source, /glyphs for page headings/);
	assert.doesNotMatch(source, /hero role only/);
	assert.doesNotMatch(source, /fonts\.google|fonts\.gstatic|@import/);

	const headingText = [
		'文科生，不写代码，我把两个 AI 产品推到了有人用。',
		'两个作品，同一个判断：把走不完的流程，收敛成一轮能走完的闭环。',
		'关于',
		'过程中的几个判断',
		'现在',
		'联系',
		'口语陪练',
		'面试系统',
		'问题',
		'洞察',
		'方案',
		'我做了什么',
		'结果与反思',
		'未找到页面',
	].join('');
	const range = [...new Set([...headingText].map((ch) => ch.codePointAt(0)))]
		.sort((a, b) => a - b)
		.map((n) => `U+${n.toString(16).toUpperCase()}`)
		.join(', ');

	assert.match(source, new RegExp(`unicode-range:\\s*${range.replace(/[+,]/g, '\\$&')}`));
});

test('public favicon is a paper-window mark with a hairline and amber dot', async () => {
	const source = await readFile(join(here, '../../public/favicon.svg'), 'utf8');

	assert.match(source, /<svg[\s\S]*<\/svg>/);
	assert.match(source, /#f4f3ef|#F4F3EF/);
	assert.match(source, /#e4e1d8|#E4E1D8/);
	assert.match(source, /#c29857|#C29857/);
});
