import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('WindowBar is a quiet caption bar with three decorative lights', async () => {
	const source = await readFile(join(here, 'WindowBar.astro'), 'utf8');

	assert.match(source, /caption:\s*string/);
	assert.match(source, /class=["']window__bar["']/);
	assert.match(source, /class=["']window__lights["']/);
	assert.match(source, /aria-hidden/);
	assert.match(source, /\{caption\}/);

	const lights = source.match(/<i><\/i>/g);
	assert.equal(lights?.length, 3);
	assert.ok(
		source.indexOf('window__lights') < source.indexOf('{caption}'),
		'lights sit before the caption',
	);
});
