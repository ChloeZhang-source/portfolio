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
	assert.match(source, /site\.documentTitle/);
	assert.match(source, /site\.metaDescription/);
	assert.match(source, /site\.ogImage/);
	assert.match(source, /site\.headlineRole/);
	assert.doesNotMatch(source, /description\s*=\s*site\.headline/);
	assert.doesNotMatch(source, /resolveDocumentTitle\(\s*titleProp\s*,\s*site\.name\s*\)/);
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
	assert.match(source, /property=["']og:site_name["']/);
	assert.match(source, /content=["']张晓雪 · 作品集["']/);
	assert.match(source, /property=["']og:locale["']/);
	assert.match(source, /content=["']zh_CN["']/);
	assert.match(source, /name=["']twitter:card["']/);
	assert.match(source, /content=["']summary_large_image["']/);
	assert.match(source, /name=["']twitter:title["']/);
	assert.match(source, /content=\{ogTitle\}/);
	assert.match(source, /name=["']twitter:description["']/);
	assert.match(source, /content=\{ogDescription\}/);
	assert.match(source, /name=["']twitter:image["']/);
	assert.match(source, /content=\{ogImageAbsolute\}/);
	assert.match(source, /name=["']author["']/);
	assert.match(source, /content=\{site\.name\}/);
	assert.match(source, /name=["']theme-color["']/);
	assert.match(source, /content=["']#F4F3EF["']/);
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

	assert.match(source, /jsonLd\?:/);
	assert.match(source, /application\/ld\+json/);
	assert.match(source, /JSON\.stringify\(jsonLd\)/);
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
		'把想法，跑成闭环',
		'两个作品，同一个判断：把走不完的流程，收敛成一轮能走完的闭环。',
		'过程中的几个判断',
		'现在',
		'联系',
		'口语陪练',
		'面试系统',
		'问题：想练一句口语，第一步先要注册',
		'我的判断：先让第一轮练习能自己成立',
		'怎么做的：四个动作走完一轮',
		'我放弃了什么：打卡和排行榜',
		'结果：公开内测中，以及我学到的变化',
		'问题：面试标准装在资深老师脑子里',
		'我的判断：先把一轮面试变成可检查流程',
		'怎么做的：分环节路径和能打分的台子',
		'我放弃了什么：不让 AI 直接给结论',
		'结果：50+ 场真实招聘，以及标准先写下来',
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
