import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('SideAtmosphere is a chapter spine with a scroll-following caret', async () => {
	const source = await readFile(join(here, 'SideAtmosphere.astro'), 'utf8');

	assert.match(source, /aria-hidden=["']true["']/);
	assert.match(source, /pointer-events:\s*none/);
	assert.match(source, /side-atmosphere__rail--left/);
	assert.match(source, /side-atmosphere__rail--right/);
	assert.match(source, /SIDE_CHAPTERS/);
	assert.match(source, /SIDE_CHAPTER_FOLIOS/);
	assert.match(source, /data-chapter=\{id\}/);
	assert.match(source, /data-caret/);
	assert.match(source, /spineCaretY/);
	assert.match(source, /scrollHeight|offsetHeight/);
	assert.match(source, /prefers-reduced-motion/);
	assert.match(source, /matchMedia\(\s*['"]\(prefers-reduced-motion:\s*reduce\)['"]/);
	assert.doesNotMatch(source, /top:\s*0\s*!important/);
	assert.doesNotMatch(source, /\.side-atmosphere__caret[^{]*\{[^}]*transition:/s);
	assert.doesNotMatch(source, /\.side-atmosphere__node--now\s+\.side-atmosphere__dot::after/s);
	assert.doesNotMatch(source, /data-planet/);
	assert.doesNotMatch(source, /data-orbit/);
	assert.doesNotMatch(source, /@keyframes\s+side-atmosphere-orbit/);
	assert.doesNotMatch(source, /stroke-dasharray/);
	assert.doesNotMatch(source, /mask-image/);
	assert.doesNotMatch(source, /particle|parallax/i);
	assert.doesNotMatch(source, /hello@example\.com/);
});
