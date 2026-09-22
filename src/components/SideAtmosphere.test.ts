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
	assert.match(source, /\.side-atmosphere__caret\s*\{[^}]*background:\s*var\(--color-amber-ink\)/s);
	assert.doesNotMatch(
		source,
		/\.side-atmosphere__caret\s*\{[^}]*background:\s*var\(--color-amber\)\s*;/s,
	);
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

test('narrow viewports degrade the rail to a top --scroll-progress line', async () => {
	const source = await readFile(join(here, 'SideAtmosphere.astro'), 'utf8');

	assert.match(source, /side-atmosphere__progress/);
	assert.match(source, /--scroll-progress/);
	assert.match(source, /setProperty\(\s*['"]--scroll-progress['"]/);
	assert.match(source, /scaleX\(\s*var\(\s*--scroll-progress/);
	assert.match(source, /background:\s*var\(--color-amber-ink\)/);
	assert.match(source, /@media\s*\(\s*max-width:\s*1100px\s*\)/);
	assert.match(source, /\.side-atmosphere__rail[^{]*\{[^}]*display:\s*none/s);
	assert.doesNotMatch(
		source,
		/@media\s*\(\s*max-width:\s*1100px\s*\)\s*\{\s*\.side-atmosphere\s*\{[^}]*display:\s*none/s,
	);
	assert.match(source, /reduceMotion\.matches/);
});

test('rails sit outside the content shell using shared page tokens', async () => {
	const source = await readFile(join(here, 'SideAtmosphere.astro'), 'utf8');

	assert.match(source, /\.side-atmosphere__rail\s*\{[^}]*width:\s*var\(--rail-width\)/s);
	assert.match(
		source,
		/\.side-atmosphere__rail--left\s*\{[^}]*left:\s*max\(\s*var\(--page-pad\)\s*,\s*calc\(\s*50%\s*-\s*\(\s*var\(--page-max\)\s*\/\s*2\s*\)\s*-\s*var\(--rail-width\)\s*\)\s*\)/s,
	);
	assert.match(
		source,
		/\.side-atmosphere__rail--right\s*\{[^}]*right:\s*max\(\s*var\(--page-pad\)\s*,\s*calc\(\s*50%\s*-\s*\(\s*var\(--page-max\)\s*\/\s*2\s*\)\s*-\s*var\(--rail-width\)\s*\)\s*\)/s,
	);
	assert.doesNotMatch(source, /38\.5rem/);
});
