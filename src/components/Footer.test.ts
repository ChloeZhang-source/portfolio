import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Footer colophon keeps the update note in the version column', async () => {
	const source = await readFile(join(here, 'Footer.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /class=["']colophon["']/);
	assert.match(source, /<b>版本<\/b>/);
	assert.match(source, /updatedCaption\(site\.updatedAt\)/);
	assert.match(source, /<b>字体<\/b>Noto Serif SC 500（子集）\/ PingFang SC/);
	assert.match(source, /<b>规范<\/b>DESIGN-SYSTEM\.md/);
	assert.match(source, /\.colophon\s*\{[^}]*border-top:\s*1px\s+solid\s+var\(--c-hairline\)/s);
	assert.match(source, /\.colophon\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*1fr\)/s);
	assert.match(source, /\.colophon\s*\{[^}]*font-family:\s*var\(--font-mono\)/s);
	assert.match(source, /\.colophon\s*\{[^}]*font-size:\s*var\(--text-micro\)/s);
	assert.match(source, /\.colophon\s*\{[^}]*line-height:\s*1\.6/s);
	assert.match(source, /\.colophon b\s*\{[^}]*color:\s*var\(--c-body\)/s);
	assert.match(source, /\.colophon b\s*\{[^}]*letter-spacing:\s*var\(--tracking-micro\)/s);
	assert.match(source, /@media\s*\(\s*max-width:\s*899px\s*\)[\s\S]*\.colophon\s*\{[^}]*grid-template-columns:\s*1fr/);
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
