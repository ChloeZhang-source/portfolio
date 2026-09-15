import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Header links the name home, renders site.nav, and keeps resume download visible', async () => {
	const source = await readFile(join(here, 'Header.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /site\.name/);
	assert.match(source, /href=["']\/["']/);
	assert.match(source, /site\.nav/);
	assert.match(source, /site\.resumeHref/);
	assert.match(source, /site\.resumeDownloadName/);
	assert.match(source, /site\.resumeLabel/);
	assert.match(source, /download=\{site\.resumeDownloadName\}/);
	assert.match(source, /navCurrentHref/);
	assert.match(source, /navHrefForChapter/);
	assert.match(source, /resolveActiveChapter/);
	assert.match(source, /SIDE_CHAPTER_SELECTORS/);
	assert.match(source, /aria-current/);
	assert.match(source, /nav-current/);
	assert.match(source, /--color-amber/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
	assert.doesNotMatch(source, /display:\s*none/);
});
