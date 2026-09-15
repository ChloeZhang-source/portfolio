import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('CaseHero is visible h1 → media → caption facts → product CTA → optional #demo → gallery windows', async () => {
	const source = await readFile(join(here, 'CaseHero.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/case['"]/);
	assert.match(source, /caseProductCta/);
	assert.match(source, /showCaseDemo/);
	assert.match(source, /resultFactsFor/);
	assert.match(source, /<h1>\{work\.title\}<\/h1>/);
	assert.match(source, /\.case-hero h1\s*\{[^}]*font-size:\s*1\.35rem/s);
	assert.match(source, /\.case-hero h1\s*\{[^}]*font-weight:\s*500/s);
	assert.doesNotMatch(source, /\.case-hero h1\s*\{[^}]*font-family:/s);
	assert.match(source, /withBase\(work\.cover\)/);
	assert.match(source, /work\.cover/);
	assert.match(source, /withBase\(work\.video\)/);
	assert.match(source, /work\.video/);
	assert.match(source, /id=["']demo["']/);
	assert.match(source, /id=["']gallery["']/);
	assert.match(source, /work\.gallery/);
	assert.match(source, /WindowBar/);
	assert.match(source, /caption=\{work\.title\}/);
	assert.match(source, /caption=\{shot\.caption\}/);
	assert.match(source, /alt=\{shot\.alt\}/);
	assert.match(source, /src=\{withBase\(shot\.src\)\}/);
	assert.match(source, /work\.demoNotes/);
	assert.match(source, /caseCopy\.accessTitle/);
	assert.match(source, /caseCopy\.walkthroughLabel/);
	assert.match(source, /caseCopy\.requestLabel/);
	assert.match(source, /withBase\(caseCopy\.requestHref\)/);
	assert.match(source, /product\.external/);
	assert.match(source, /target=["']_blank["']/);
	assert.match(source, /rel=["']noopener noreferrer["']/);
	assert.match(source, /新窗口/);
	assert.match(source, /\bcontrols\b/);
	assert.match(source, /matchMedia/);
	assert.match(source, /prefers-reduced-motion:\s*no-preference/);
	assert.match(source, /\.autoplay\s*=\s*true/);
	assert.doesNotMatch(source, /<video[^>]*\bautoplay\b/i);

	const template = source.slice(source.lastIndexOf('---'));
	const order = [
		'<h1>{work.title}</h1>',
		'work.cover',
		'case-hero__facts',
		'product.href',
		'id="demo"',
		'id="gallery"',
		'shot.caption',
		'shot.alt',
	];
	let cursor = -1;
	for (const token of order) {
		const at = template.indexOf(token, cursor + 1);
		assert.ok(at > cursor, `expected ${token} after previous CaseHero field`);
		cursor = at;
	}

	assert.doesNotMatch(source, /work\.summaryEn/);
	assert.doesNotMatch(source, /caseCopy\.demoEn/);
	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /class=["']result-number["']/);
	assert.doesNotMatch(source, /demoAccount|demoPassword|DEMO_ACCOUNT|DEMO_PASSWORD/);
	assert.doesNotMatch(source, /clipboard|data-copy-demo|复制密码/);
	assert.doesNotMatch(source, /立即体验|Try now|免费注册/);
	assert.doesNotMatch(source, /hello@example\.com/);
});

test('walkthrough link in #demo is only rendered when the product CTA is external', async () => {
	const source = await readFile(join(here, 'CaseHero.astro'), 'utf8');
	const demoBlock = source.slice(source.indexOf('id="demo"'), source.indexOf('id="gallery"'));

	assert.match(demoBlock, /product\.external/);
	assert.match(demoBlock, /product\.external[\s\S]{0,400}caseCopy\.walkthroughLabel/);
	assert.match(demoBlock, /caseCopy\.requestLabel/);
});
