import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Footer renders only the updated caption from data', async () => {
	const source = await readFile(join(here, 'Footer.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /updatedCaption/);
	assert.match(source, /site\.updatedAt/);
	assert.doesNotMatch(source, /site\.status/);
	assert.doesNotMatch(source, /mailtoHref/);
	assert.doesNotMatch(source, /site\.email/);
	assert.doesNotMatch(source, /site\.wechatQrSrc/);
	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /site\.resumeLabel/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
});
