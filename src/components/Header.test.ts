import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Header links the name home, renders site.nav, and has no resume CTA', async () => {
	const source = await readFile(join(here, 'Header.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /site\.name/);
	assert.match(source, /withBase\(['"]\/['"]\)/);
	assert.match(source, /withBase\(item\.href\)/);
	assert.match(source, /site\.nav/);
	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /site\.resumeDownloadName/);
	assert.doesNotMatch(source, /site\.resumeLabel/);
	assert.doesNotMatch(source, /site-header__resume/);
	assert.match(source, /navCurrentHref/);
	assert.match(source, /navHrefForChapter/);
	assert.match(source, /resolveActiveChapter/);
	assert.match(source, /SIDE_CHAPTER_SELECTORS/);
	assert.match(source, /#contact/);
	assert.match(source, /navHrefForChapter\(['"]contact['"]\)/);
	assert.match(source, /aria-current/);
	assert.match(source, /nav-current/);
	assert.match(source, /var\(--color-amber-ink\)/);
	assert.doesNotMatch(source, /nav-current::after\s*\{[^}]*background:\s*var\(--color-amber\)\s*;/s);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
	assert.doesNotMatch(source, /display:\s*none/);
});

test('wide viewports inset the header with the shared spine page pad', async () => {
	const source = await readFile(join(here, 'Header.astro'), 'utf8');

	assert.match(source, /\.site-header\s*\{[^}]*padding:\s*0\.85rem\s+var\(--page-pad\)/s);
	assert.match(
		source,
		/@media\s*\(\s*min-width:\s*1101px\s*\)\s*\{[^}]*\.site-header\s*\{[^}]*padding-inline:\s*var\(--page-pad-wide\)/s,
	);
});
