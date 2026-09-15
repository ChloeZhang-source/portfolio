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

test('homepage chapters are Home → Explore #work → Experience (About + timeline + Contact)', async () => {
	const source = await readFile(join(here, 'pages', 'index.astro'), 'utf8');

	assert.match(source, /Hero\.astro/);
	assert.match(source, /WorkCard\.astro/);
	assert.match(source, /About\.astro/);
	assert.match(source, /Experience\.astro/);
	assert.match(source, /getCollection\(['"]works['"]\)/);
	assert.match(source, /id=["']work["']/);
	const experienceChapter = source.match(/<section\b[^>]*chapter--experience[^>]*>/);
	assert.ok(experienceChapter, 'experience chapter wrapper must exist');
	assert.match(experienceChapter[0], /id=["']experience["']/);
	assert.match(source, /\.chapter--experience[^{]*\{[^}]*scroll-margin-top:\s*6rem/s);
	assert.match(source, /chapter__kicker">作品</);
	assert.match(source, /chapter__kicker">经历</);
	assert.doesNotMatch(source, /chapter__kicker">Explore</);
	assert.doesNotMatch(source, /chapter__kicker">Experience</);

	const hero = source.indexOf('<Hero');
	const work = source.indexOf('id="work"') >= 0 ? source.indexOf('id="work"') : source.indexOf("id='work'");
	const cards = source.indexOf('<WorkCard');
	const about = source.indexOf('<About');
	const experience = source.indexOf('<Experience');
	const contact = source.indexOf('<Contact');

	assert.match(source, /<Hero\s+works=\{works\.map/);
	assert.doesNotMatch(source, /exhibit=\{works\[0\]/);

	assert.ok(hero >= 0 && work > hero, 'Hero must precede #work');
	assert.ok(cards > work, 'WorkCard must render inside #work');
	assert.ok(about > cards, 'About must follow work cards');
	assert.ok(experience > about, 'Experience must follow About');
	assert.ok(contact > experience, 'Contact must follow Experience');

	assert.doesNotMatch(source, /demoAccount|demoPassword|DEMO_ACCOUNT|DEMO_PASSWORD/);
	assert.doesNotMatch(source, /立即体验|Try now|免费注册/);
});

test('homepage mounts SideAtmosphere beside the existing Home / Explore / Experience chapters', async () => {
	const source = await readFile(join(here, 'pages', 'index.astro'), 'utf8');

	assert.match(source, /SideAtmosphere\.astro/);
	assert.match(source, /<SideAtmosphere\s*\/>/);
	assert.match(source, /chapter--experience/);
});

test('homepage chapters share the ruler divider, not ink-wash strokes', async () => {
	const source = await readFile(join(here, 'pages', 'index.astro'), 'utf8');

	assert.match(source, /ChapterRule\.astro/);
	assert.match(source, /<ChapterRule/g);
	assert.equal(source.match(/<ChapterRule/g)?.length, 2);
	assert.doesNotMatch(source, /InkWash|ink-wash/);
});
