import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('WorkCard keeps title, tagline, window, result, and one case CTA', async () => {
	const source = await readFile(join(here, 'WorkCard.astro'), 'utf8');

	assert.match(source, /workCaseHref/);
	assert.match(source, /homeCopy\.workCaseLabels\[work\.slug as keyof typeof homeCopy\.workCaseLabels\]/);
	assert.doesNotMatch(source, /homeCopy\.workCaseLabel[^s]/);
	assert.match(source, /work\.title/);
	assert.match(source, /work\.tagline/);
	assert.match(source, /work\.result/);
	assert.match(source, /withBase\(work\.cover\)/);
	assert.match(source, /work\.cover/);
	assert.match(source, /withBase\(work\.video\)/);
	assert.match(source, /work\.video/);
	assert.match(source, /WindowBar/);
	assert.match(source, /caption=\{work\.title\}/);
	assert.match(source, /\.work-card__lede\s*\{[^}]*color:\s*var\(--color-muted\)/s);
	assert.match(source, /\.work-card h2\s*\{[^}]*letter-spacing:\s*0\.02em/s);
	assert.doesNotMatch(source, /\.work-card h2\s*\{[^}]*font-family:/s);
	assert.match(source, /\.work-card\s*\{[^}]*text-align:\s*left/s);
	assert.doesNotMatch(source, /\.work-card\s*\{[^}]*justify-items:\s*center/s);
	assert.doesNotMatch(source, /\.work-card\s*\{[^}]*text-align:\s*center/s);

	const order = ['work.title', 'work.tagline', 'workCaseHref', 'work.cover', 'work.result'];
	let cursor = -1;
	for (const token of order) {
		const at = source.indexOf(token, cursor + 1);
		assert.ok(at > cursor, `expected ${token} after previous work-card field`);
		cursor = at;
	}

	const taglineAt = source.indexOf('work.tagline');
	const videoAt = source.indexOf('work.video');
	const resultAt = source.indexOf('work.result');
	const ctaHrefAt = source.indexOf('workCaseHref', resultAt);
	assert.ok(videoAt > taglineAt, 'video must sit in the window below the tagline');
	assert.ok(videoAt < resultAt, 'video must sit above the result line');
	assert.ok(ctaHrefAt > resultAt, 'reading-case CTA stays after the result line');

	assert.doesNotMatch(source, /workCardEnglish/);
	assert.doesNotMatch(source, /work\.role/);
	assert.doesNotMatch(source, /work\.transferable/);
	assert.doesNotMatch(source, /workSecondaryCta/);
	assert.doesNotMatch(source, /work-card__secondary/);
	assert.doesNotMatch(source, /demoAccount|demoPassword|DEMO_ACCOUNT|DEMO_PASSWORD/);
	assert.doesNotMatch(source, /立即体验|Try now|免费注册/);
	assert.doesNotMatch(source, /hello@example\.com/);
});

test('WorkCard window is a case link and video only autoplays without reduced motion', async () => {
	const source = await readFile(join(here, 'WorkCard.astro'), 'utf8');

	assert.match(source, /<a class=["']window["']/);
	assert.match(source, /href=\{workCaseHref\(work\.slug\)\}/);
	assert.match(source, /<a class=["']btn["'] href=\{workCaseHref\(work\.slug\)\}>/);
	assert.match(source, /matchMedia/);
	assert.match(source, /prefers-reduced-motion:\s*no-preference/);
	assert.match(source, /\.autoplay\s*=\s*true/);
	assert.match(source, /void video\.play\(\)/);
	assert.match(source, /\.work-card video/);
	assert.doesNotMatch(source, /<video[^>]*\bautoplay\b/i);
});
