import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('speaking exhibit shows the product frames and links to the case', async () => {
	const source = await readFile(join(here, 'SpeakingExhibit.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/lib\/speaking-exhibit['"]/);
	assert.doesNotMatch(source, /from\s+['"]\.\.\/lib\/work['"]/);
	assert.doesNotMatch(source, /workCaseHref/);
	assert.doesNotMatch(source, /caseLabel/);
	assert.match(source, /withBase\(step\.image\)/);
	assert.match(source, /workImageSize\(step\.image\)/);
	assert.match(source, /createExhibitSession/);
	assert.match(source, /class=["']window exhibit["']/);
	assert.match(source, /caption=\{speakingExhibit\.caption\}/);
	assert.match(source, /\{speakingExhibit\.note\}/);
	assert.match(source, /WindowBar/);
	assert.doesNotMatch(source, /<a class=["']window["']/);
	assert.match(source, /aria-live=["']polite["']/);
	assert.match(source, /aria-pressed/);
	assert.match(source, /data-step=\{step\.key\}/);
	assert.match(source, /data-frame-image=\{step\.key\}/);
	assert.match(source, /data-page-indicator/);
	assert.match(source, /speakingExhibit\.steps\.findIndex/);
	assert.match(source, /padStart\(2, '0'\)/);
	assert.match(source, /alt=\{step\.alt\}/);
	assert.doesNotMatch(source, /httpsaitalk\.win/);
	assert.doesNotMatch(source, /\bfetch\s*\(/);
	assert.doesNotMatch(source, /真机演示/);
	assert.doesNotMatch(source, /data-pause|togglePause|barMotion|data-fill/);
	assert.doesNotMatch(source, /font-style:\s*italic/);
	assert.doesNotMatch(source, /box-shadow/);
	assert.doesNotMatch(source, /animation:[^;\n]*infinite/);
});

test('exhibit steps are touch sized and do not paint amber text', async () => {
	const source = await readFile(join(here, 'SpeakingExhibit.astro'), 'utf8');

	assert.match(source, /\.exhibit__chip\s*\{[^}]*min-height:\s*44px/s);
	assert.match(source, /\.exhibit__page-button\s*\{[^}]*min-height:\s*44px/s);
	assert.match(source, /@media\s*\(\s*hover:\s*hover\s*\)/);
	assert.match(source, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);
	assert.match(source, /\.exhibit__frame\s+\[hidden\]\s*\{[^}]*display:\s*none/s);
	assert.doesNotMatch(source, /\.exhibit__chip\s*\{[^}]*color:\s*var\(--c-amber/s);
	assert.doesNotMatch(source, /\.exhibit__note\s*\{[^}]*color:\s*var\(--c-amber/s);
	assert.doesNotMatch(source, /\.exhibit__caption\s*\{[^}]*color:\s*var\(--c-amber/s);
});
