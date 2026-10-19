import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Hero centers identity and links four folders to about, cases, and contact', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/lib\/work['"]/);
	assert.match(source, /from\s+['"]\.\.\/lib\/work-image['"]/);
	assert.match(source, /from\s+['"]\.\.\/lib\/paths['"]/);
	assert.doesNotMatch(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.doesNotMatch(source, /SpeakingExhibit/);
	assert.doesNotMatch(source, /Annotation/);
	assert.doesNotMatch(source, /heroMarginNotes/);
	assert.match(source, /id=["']home["']/);
	assert.match(source, /aria-labelledby=["']hero-title["']/);
	assert.match(source, /id=["']hero-title["']/);
	assert.match(source, /class=["']hero__title["']>\{site\.headlineRole\}<\/h1>/);
	assert.match(source, /class=["']hero__name["']>\{site\.name\}<\/p>/);
	assert.match(source, /个人作品集 · 2026/);
	assert.match(source, /前互联网教育行业主管，专注 AI 产品落地与流程设计。/);
	assert.match(source, /href=["']#work["']/);
	assert.match(source, /打开一份作品，看看我是如何让想法落地/);
	assert.match(source, /workCaseHref\(['"]speaking['"]\)/);
	assert.match(source, /workCaseHref\(['"]interview['"]\)/);
	assert.match(source, /withBase\(['"]\/#about['"]\)/);
	assert.match(source, /withBase\(['"]\/#contact['"]\)/);
	assert.match(source, /withBase\(site\.avatarSrc\)/);
	assert.match(source, /\/work\/speaking\/cover\.jpg/);
	assert.match(source, /\/work\/interview\/cover\.jpg/);
	assert.match(source, /workImageSize/);
	assert.match(source, /hero__folder--about/);
	assert.match(source, /hero__folder--interview/);
	assert.match(source, /hero__folder--speaking/);
	assert.match(source, /hero__folder--contact/);
	assert.match(source, /aria-label=["']关于我：经历、判断与正在做的事["']/);
	assert.match(source, /aria-label=["']面试系统：让面试过程可复评["']/);
	assert.match(source, /aria-label=["']口语陪练：打开即练习，无需注册["']/);
	assert.match(source, /aria-label=["']联系：聊聊 AI 落地与产品流程["']/);
	assert.match(source, /\.hero__title\s*\{[^}]*font-family:\s*var\(--font-serif\)/s);
	assert.match(source, /\.hero__title\s*\{[^}]*letter-spacing:\s*var\(--tracking-display-1\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*font-size:\s*var\(--text-lead\)/s);
	assert.match(source, /\.hero__center\s*\{[^}]*text-align:\s*center/s);
	assert.match(source, /text-wrap:\s*balance/);
	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /site\.headlineEn/);
	assert.doesNotMatch(source, /misprint|hero__beat|hero__exhibit|hero__notes/);
	assert.doesNotMatch(source, /httpsaitalk\.win/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);

	const order = [
		'hero__eyebrow',
		'site.headlineRole',
		'site.name',
		'hero__hint',
		'hero__folder--about',
		'hero__folder--interview',
		'hero__folder--speaking',
		'hero__folder--contact',
	];
	let cursor = -1;
	for (const token of order) {
		const at = source.indexOf(token, cursor + 1);
		assert.ok(at > cursor, `expected ${token} after previous hero field`);
		cursor = at;
	}
});

test('Hero keeps the running head and folder motion respects reduced motion', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(source, /class=["']running-head["'][^>]*aria-hidden=["']true["']/);
	assert.match(source, /作品集 · \{site\.name\}/);
	assert.match(source, /\.hero\s*\{[^}]*position:\s*relative/s);
	assert.match(source, /@keyframes\s+hero-center-in/);
	assert.match(source, /@keyframes\s+hero-folder-arrive/);
	assert.match(source, /@keyframes\s+hero-folder-float/);
	assert.match(source, /animation:\s*hero-folder-float\s+var\(--float-duration\)/);
	assert.match(
		source,
		/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)[\s\S]*\.hero__folder[\s\S]*animation:\s*none/,
	);
	assert.match(source, /@media\s*\(\s*max-width:\s*760px\s*\)/);
	assert.match(source, /@media\s*\(\s*max-width:\s*420px\s*\)/);
	assert.doesNotMatch(source, /\.running-head\s*\{[^}]*font-style:\s*italic/s);
	assert.doesNotMatch(source, /_serif500\.ttf/);
	assert.doesNotMatch(source, /hero-rise|hero-misprint-align|hero__beat/);
});
