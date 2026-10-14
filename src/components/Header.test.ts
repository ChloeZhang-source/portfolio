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
	assert.match(source, /navHrefForChapter\(/);
	assert.match(source, /resolveScrolledChapter/);
	assert.doesNotMatch(source, /resolveActiveChapter/);
	assert.match(source, /SIDE_CHAPTER_SELECTORS/);
	assert.match(source, /querySelector\(['"]#contact['"]\)/);
	assert.doesNotMatch(source, /navHrefForChapter\(['"]contact['"]\)/);
	assert.match(source, /aria-current/);
	assert.match(source, /nav-current/);
	assert.match(source, /var\(--color-amber-ink\)/);
	assert.doesNotMatch(source, /nav-current::after\s*\{[^}]*background:\s*var\(--color-amber\)\s*;/s);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
	assert.doesNotMatch(source, /\.site-header(?:__nav)?\s*\{[^}]*display:\s*none/s);
	assert.match(source, /\.site-header__nav a\s*\{[^}]*min-height:\s*44px/s);
	assert.match(source, /\.site-header__nav a\s*\{[^}]*padding:\s*0\.85rem\s+0\.2rem/s);
	assert.doesNotMatch(source, /720px/);
});

test('wide viewports inset the header with the shared spine page pad', async () => {
	const source = await readFile(join(here, 'Header.astro'), 'utf8');

	assert.match(source, /\.site-header\s*\{[^}]*padding:\s*0\.85rem\s+var\(--page-pad\)/s);
	assert.match(
		source,
		/@media\s*\(\s*min-width:\s*1100px\s*\)\s*\{[^}]*\.site-header\s*\{[^}]*padding-inline:\s*var\(--page-pad-wide\)/s,
	);
});

test('narrow header shrinks nav type, keeps one line, and hides the contact link', async () => {
	const source = await readFile(join(here, 'Header.astro'), 'utf8');
	const narrow = source.match(/@media\s*\(\s*max-width:\s*639px\s*\)\s*\{([\s\S]*?)\n\t\}/);
	assert.ok(narrow, 'expected a 639px header block');
	const block = narrow[1];

	assert.match(block, /\.site-header\s*\{[^}]*padding-block:\s*0\.4rem/s);
	assert.match(block, /\.site-header\s*\{[^}]*gap:\s*0\.35rem\s+0\.5rem/s);
	assert.match(block, /\.site-header__nav\s*\{[^}]*flex-wrap:\s*nowrap/s);
	assert.match(block, /\.site-header__nav\s*\{[^}]*gap:\s*0\.4rem\s+0\.75rem/s);
	assert.match(block, /\.site-header__nav a\s*\{[^}]*font-size:\s*0\.8rem/s);
	assert.match(block, /a\[href\$=["']#contact["']\]\s*\{[^}]*display:\s*none/s);
	assert.doesNotMatch(source, /联系/);
	assert.doesNotMatch(source, /max-width:\s*640px/);
	assert.doesNotMatch(source, /max-width:\s*720px/);
});
