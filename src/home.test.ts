import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('homepage slots Header, Footer, and Contact without hardcoding contact data', async () => {
	const source = await readFile(join(here, 'pages', 'index.astro'), 'utf8');

	assert.match(source, /Header\.astro/);
	assert.match(source, /Footer\.astro/);
	assert.match(source, /Contact\.astro/);
	assert.match(source, /slot=["']header["']/);
	assert.match(source, /slot=["']footer["']/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
});

test('homepage chapters are Home → Explore #work → About (About + Contact)', async () => {
	const source = await readFile(join(here, 'pages', 'index.astro'), 'utf8');

	assert.match(source, /Hero\.astro/);
	assert.match(source, /WorkCard\.astro/);
	assert.match(source, /About\.astro/);
	assert.doesNotMatch(source, /Experience\.astro/);
	assert.match(source, /getCollection\(['"]works['"]\)/);
	assert.match(source, /id=["']work["']/);
	const aboutChapter = source.match(/<section\b[^>]*chapter--about[^>]*>/);
	assert.ok(aboutChapter, 'about chapter wrapper must exist');
	assert.match(aboutChapter[0], /id=["']about["']/);
	assert.match(source, /\.chapter--about[^{]*\{[^}]*scroll-margin-top:\s*6rem/s);
	assert.match(source, /chapter__kicker">作品</);
	assert.match(source, /homeCopy\.workThesis/);
	assert.match(source, /class=["']chapter__thesis["']/);
	assert.match(source, /homeCopy\.workLede/);
	assert.match(source, /class=["']chapter__lede["']/);
	assert.match(source, /chapter__kicker">关于</);
	assert.doesNotMatch(source, /chapter__kicker">Explore</);
	assert.doesNotMatch(source, /chapter__kicker">Experience</);
	assert.doesNotMatch(source, /chapter__kicker">经历</);
	assert.doesNotMatch(source, /chapter--experience/);
	assert.doesNotMatch(source, /id=["']experience["']/);

	const hero = source.indexOf('<Hero');
	const work = source.indexOf('id="work"') >= 0 ? source.indexOf('id="work"') : source.indexOf("id='work'");
	const thesis = source.indexOf('homeCopy.workThesis');
	const lede = source.indexOf('homeCopy.workLede');
	const cards = source.indexOf('<WorkCard');
	const about = source.indexOf('<About');
	const contact = source.indexOf('<Contact');

	assert.match(source, /<Hero\s+works=\{works\.map/);
	assert.doesNotMatch(source, /exhibit=\{works\[0\]/);

	assert.ok(hero >= 0 && work > hero, 'Hero must precede #work');
	assert.ok(thesis > work, 'work thesis must render inside #work');
	assert.ok(lede > thesis, 'work lede must follow thesis');
	assert.ok(cards > lede, 'WorkCard must follow work lede');
	assert.ok(about > cards, 'About must follow work cards');
	assert.ok(contact > about, 'Contact must follow About');

	assert.doesNotMatch(source, /demoAccount|demoPassword|DEMO_ACCOUNT|DEMO_PASSWORD/);
	assert.doesNotMatch(source, /立即体验|Try now|免费注册/);
});

test('homepage mounts SideAtmosphere beside the existing Home / Explore / About chapters', async () => {
	const source = await readFile(join(here, 'pages', 'index.astro'), 'utf8');

	assert.match(source, /SideAtmosphere\.astro/);
	assert.match(source, /<SideAtmosphere\s*\/>/);
	assert.match(source, /chapter--about/);
});

test('homepage injects Person + WebSite + ItemList JSON-LD', async () => {
	const source = await readFile(join(here, 'pages', 'index.astro'), 'utf8');

	assert.match(source, /buildHomeJsonLd/);
	assert.match(source, /jsonLd=\{/);
	assert.doesNotMatch(source, /xiaohongshu|小红书/);
});

test('homepage chapters share the ruler divider, not ink-wash strokes', async () => {
	const source = await readFile(join(here, 'pages', 'index.astro'), 'utf8');

	assert.match(source, /ChapterRule\.astro/);
	assert.match(source, /<ChapterRule/g);
	assert.equal(source.match(/<ChapterRule/g)?.length, 2);
	assert.doesNotMatch(source, /InkWash|ink-wash/);
});
