import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Annotation is a sans-serif margin note with a muted mono tag and no card', async () => {
	const source = await readFile(join(here, 'Annotation.astro'), 'utf8');

	assert.match(source, /class=["']annotation["']/);
	assert.match(source, /class=["']annotation__tag["']/);
	assert.match(source, /\{tag\}/);
	assert.match(source, /\{text\}/);
	assert.match(source, /\.annotation\s*\{[^}]*max-width:\s*var\(--measure-note\)/s);
	assert.match(source, /\.annotation\s*\{[^}]*padding-left:\s*12px/s);
	assert.match(source, /\.annotation\s*\{[^}]*border-left:\s*2px\s+solid\s+var\(--c-amber-ink\)/s);
	assert.match(source, /\.annotation\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
	assert.match(source, /\.annotation\s*\{[^}]*font-size:\s*var\(--text-small\)/s);
	assert.match(source, /\.annotation\s*\{[^}]*font-weight:\s*400/s);
	assert.match(source, /\.annotation\s*\{[^}]*line-height:\s*var\(--leading-body\)/s);
	assert.match(source, /\.annotation\s*\{[^}]*color:\s*var\(--c-body\)/s);
	assert.match(source, /\.annotation\s*\{[^}]*font-style:\s*normal/s);
	assert.doesNotMatch(source, /rotate\(/);
	assert.doesNotMatch(source, /\.annotation\s*\{[^}]*font-style:\s*italic/s);
	assert.doesNotMatch(source, /\.annotation[^{]*\{[^}]*box-shadow/s);
	assert.doesNotMatch(source, /\.annotation\s*\{[^}]*background/s);
	assert.doesNotMatch(source, /\.annotation\s*\{[^}]*border-radius/s);
	assert.match(source, /\.annotation__tag\s*\{[^}]*font-family:\s*var\(--font-mono\)/s);
	assert.match(source, /\.annotation__tag\s*\{[^}]*font-size:\s*var\(--text-micro\)/s);
	assert.match(source, /\.annotation__tag\s*\{[^}]*letter-spacing:\s*var\(--tracking-micro\)/s);
	assert.match(source, /\.annotation__tag\s*\{[^}]*color:\s*var\(--c-muted\)/s);
	assert.doesNotMatch(source, /\.annotation__tag\s*\{[^}]*color:\s*var\(--c-amber/s);
	assert.doesNotMatch(source, /\.annotation__tag\s*\{[^}]*color:\s*var\(--color-amber/s);
});

test('Annotation plays one pen stroke in view and rests when motion is reduced', async () => {
	const source = await readFile(join(here, 'Annotation.astro'), 'utf8');

	assert.match(source, /IntersectionObserver/);
	assert.match(source, /unobserve/);
	assert.match(source, /prefers-reduced-motion:\s*reduce/);
	assert.match(source, /matchMedia\(\s*['"]\(prefers-reduced-motion:\s*reduce\)['"]/);
	assert.match(source, /is-in/);
	assert.match(source, /@keyframes\s+annotation-pen/);
	assert.match(source, /animation:\s*annotation-pen\s+var\(--dur-3\)\s+var\(--ease-pen\)\s+forwards/);
	assert.match(source, /@keyframes\s+annotation-pen-flow/);
	assert.match(
		source,
		/@media\s*\(\s*max-width:\s*899px\s*\)[\s\S]*\.annotation\s*\{[^}]*transform:\s*none/s,
	);
	assert.match(source, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)[\s\S]*animation:\s*none/);
	assert.match(source, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)[\s\S]*opacity:\s*1/);
	assert.doesNotMatch(source, /animation-iteration-count:\s*infinite/);
	assert.doesNotMatch(source, /animation:[^;\n]*infinite/);
});
