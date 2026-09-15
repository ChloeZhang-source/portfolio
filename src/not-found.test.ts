import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('404 page uses BaseLayout, Chinese copy, and a withBase home link', async () => {
	const source = await readFile(join(here, 'pages', '404.astro'), 'utf8');

	assert.match(source, /BaseLayout/);
	assert.match(source, /Header\.astro/);
	assert.match(source, /Footer\.astro/);
	assert.match(source, /from\s+['"]\.\.\/lib\/paths['"]/);
	assert.match(source, /title=["']未找到页面["']/);
	assert.match(source, /<h1>\s*未找到页面\s*<\/h1>/);
	assert.match(source, /这个地址没有对应页面/);
	assert.match(source, /withBase\(['"]\/['"]\)/);
	assert.match(source, /回到首页/);
	assert.match(source, /class=["']chapter["']/);
	assert.match(source, /class=["']btn["']/);
	assert.match(source, /slot=["']header["']/);
	assert.match(source, /slot=["']footer["']/);
	assert.doesNotMatch(source, /404:\s*Not Found/);
	assert.doesNotMatch(source, /Not Found/);
	assert.doesNotMatch(source, /hello@example\.com/);
});
