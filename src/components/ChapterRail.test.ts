import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('ChapterRail is a fixed four-item scale with an amber active tick', async () => {
	const source = await readFile(join(here, 'ChapterRail.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /site\.nav\.map/);
	assert.match(source, /navCurrentHref/);
	assert.match(source, /withBase\(item\.href\)/);
	assert.match(source, /<nav\b[^>]*class=["']rail["']/);
	assert.match(source, /aria-label=["']章节["']/);
	assert.doesNotMatch(source, /aria-hidden/);
	assert.match(source, /data-active/);
	assert.match(source, /aria-current/);
	assert.match(source, /resolveScrolledChapter/);
	assert.match(source, /SIDE_CHAPTER_SELECTORS/);
	assert.match(source, /#contact/);
	assert.match(source, /navHrefForChapter\(/);
	assert.match(source, /\.rail\s*\{[^}]*position:\s*fixed/s);
	assert.match(source, /\.rail\s*\{[^}]*z-index:\s*var\(--z-rail\)/s);
	assert.match(source, /\.rail\s*\{[^}]*top:\s*50%/s);
	assert.match(source, /\.rail a\s*\{[^}]*opacity:\s*\.55/s);
	assert.match(source, /\.rail a\s*\{[^}]*color:\s*var\(--c-muted\)/s);
	assert.match(source, /\.rail a\s*\{[^}]*font-family:\s*var\(--font-mono\)/s);
	assert.match(source, /\.rail a\s*\{[^}]*font-size:\s*var\(--text-micro\)/s);
	assert.match(source, /\.rail a\s*\{[^}]*min-height:\s*44px/s);
	assert.match(source, /\.rail a\s*\{[^}]*justify-content:\s*flex-end/s);
	assert.match(source, /\.rail a::after\s*\{[^}]*width:\s*18px/s);
	assert.match(source, /\.rail a::after\s*\{[^}]*height:\s*1px/s);
	assert.match(source, /\.rail a::after\s*\{[^}]*background:\s*var\(--c-rule\)/s);
	assert.match(source, /\.rail a\[data-active\]\s*\{[^}]*opacity:\s*1/s);
	assert.match(source, /\.rail a\[data-active\]\s*\{[^}]*color:\s*var\(--c-ink\)/s);
	assert.match(source, /\.rail a\[data-active\]::after\s*\{[^}]*width:\s*34px/s);
	assert.match(source, /\.rail a\[data-active\]::after\s*\{[^}]*background:\s*var\(--c-amber-ink\)/s);
	assert.match(source, /var\(--dur-2\)/);
	assert.match(source, /var\(--ease-out\)/);
	assert.match(
		source,
		/@media\s*\(\s*max-width:\s*1099px\s*\)\s*\{[^}]*\.rail\s*\{[^}]*display:\s*none/s,
	);
	assert.doesNotMatch(source, /box-shadow/);
	assert.doesNotMatch(source, /font-style:\s*italic/);
	assert.doesNotMatch(source, /side-atmosphere__rail--right/);
	assert.match(source, /prefers-reduced-motion:\s*reduce/);
});
