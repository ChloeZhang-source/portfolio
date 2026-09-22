import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('ChapterRule is a ruler divider: gray ends, hairline, one amber-ink center', async () => {
	const source = await readFile(join(here, 'ChapterRule.astro'), 'utf8');

	assert.match(source, /class=["']sep sep--ruler["']/);
	assert.match(source, /aria-hidden=["']true["']/);
	assert.match(source, /sep__end/);
	assert.match(source, /sep__dot/);
	assert.match(source, /sep__rule/);
	assert.match(source, /var\(--color-rule\)/);
	assert.match(source, /var\(--color-node\)/);
	assert.match(source, /var\(--color-amber-ink\)/);
	assert.match(source, /\.sep\s*\{[^}]*width:\s*100%/s);
	assert.match(source, /margin:\s*0\s+10px/);
	assert.doesNotMatch(source, /\.sep__dot\s*\{[^}]*background:\s*var\(--color-amber\)\s*;/s);
	assert.doesNotMatch(source, /feTurbulence|InkWash|ink-wash|ink-amber/);
	assert.doesNotMatch(source, /#f6d7a8|#e8b86a|#e9b37a/i);
});
