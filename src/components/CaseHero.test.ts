import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('CaseHero is visible h1 → tagline → project summary → media → product CTA → optional #demo', async () => {
	const source = await readFile(join(here, 'CaseHero.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/case['"]/);
	assert.match(source, /caseProductCta/);
	assert.match(source, /showCaseDemo/);
	assert.match(source, /<h1>\{work\.title\}<\/h1>/);
	assert.match(source, /<p class="case-hero__tagline">\{work\.tagline\}<\/p>/);
	assert.match(source, /\.case-hero__tagline\s*\{[^}]*color:\s*var\(--color-muted\)/s);
	assert.match(source, /case-hero__summary/);
	assert.match(source, /<dt>角色<\/dt>/);
	assert.match(source, /<dt>周期<\/dt>/);
	assert.match(source, /<dt>结果<\/dt>/);
	assert.doesNotMatch(source, /<h[1-6][^>]*>\{work\.tagline\}/);
	assert.match(source, /\.case-hero h1\s*\{[^}]*font-size:\s*var\(--text-section\)/s);
	assert.match(source, /\.case-hero h1\s*\{[^}]*line-height:\s*var\(--leading-display-2\)/s);
	assert.match(source, /\.case-hero h1\s*\{[^}]*font-weight:\s*500/s);
	assert.doesNotMatch(source, /\.case-hero h1\s*\{[^}]*font-family:/s);
	assert.match(source, /withBase\(work\.cover\)/);
	assert.match(source, /work\.cover/);
	assert.match(source, /workImageSize/);
	assert.match(source, /width=\{coverSize\.width\}/);
	assert.match(source, /height=\{coverSize\.height\}/);
	assert.match(source, /decoding=["']async["']/);
	assert.match(source, /withBase\(work\.video\)/);
	assert.match(source, /work\.video/);
	assert.match(source, /id=["']demo["']/);
	assert.match(source, /WindowBar/);
	assert.match(source, /caption=\{work\.title\}/);
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
		'work.tagline',
		'case-hero__summary',
		'case-hero__media',
		'work.cover',
		'product.href',
		'id="demo"',
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
	const demoBlock = source.slice(source.indexOf('id="demo"'), source.indexOf('</section>', source.indexOf('id="demo"')));

	assert.match(demoBlock, /product\.external/);
	assert.match(demoBlock, /product\.external[\s\S]{0,400}caseCopy\.walkthroughLabel/);
	assert.match(demoBlock, /caseCopy\.requestLabel/);
});
