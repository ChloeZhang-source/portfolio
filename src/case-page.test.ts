import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('case page renders MDX, CaseHero, CaseBar, and SEO from work data', async () => {
	const source = await readFile(join(here, 'pages', 'work', '[slug].astro'), 'utf8');

	assert.match(source, /getStaticPaths/);
	assert.match(source, /getCollection\(['"]works['"]\)/);
	assert.match(source, /CaseHero\.astro/);
	assert.match(source, /CaseBar\.astro/);
	assert.match(source, /Header\.astro/);
	assert.match(source, /<Content/);
	assert.match(source, /slot=["']header["']/);
	assert.match(source, /slot=["']footer["']/);
	assert.match(source, /work\.title/);
	assert.match(source, /work\.description/);
	assert.match(source, /AI 口语陪练：打开即用，无需注册｜张晓雪作品/);
	assert.match(source, /标准化可复评面试系统：50\+ 场真实招聘｜张晓雪作品/);
	assert.doesNotMatch(source, /description=\{work\.tagline\}/);
	assert.doesNotMatch(source, /title=\{`\$\{site\.name\} · \$\{work\.title\}`\}/);
	assert.match(source, /og-speaking\.jpg/);
	assert.match(source, /og-interview\.jpg/);
	assert.match(source, /ogImage=\{ogImage\}/);
	assert.match(source, /ogImageAlt=\{work\.title\}/);
	assert.doesNotMatch(source, /ogImage=\{work\.cover\}/);
	assert.match(source, /max-width:\s*42rem/);
	assert.match(source, /\.case-body\s+:global\(h2\)\s*\{[^}]*font-weight:\s*500/s);
	assert.doesNotMatch(source, /\.case-body\s+:global\(h2\)\s*\{[^}]*font-family:/s);
	assert.doesNotMatch(source, /font-weight:\s*600/);
	assert.doesNotMatch(source, /Footer\.astro/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /DEMO_ACCOUNT|DEMO_PASSWORD/);
	assert.doesNotMatch(source, /立即体验|Try now|免费注册/);
	assert.match(source, /buildCaseJsonLd/);
	assert.match(source, /jsonLd=\{/);
});
