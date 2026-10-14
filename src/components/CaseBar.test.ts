import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('CaseBar links the other case, mail, and home WeChat — no resume or status', async () => {
	const source = await readFile(join(here, 'CaseBar.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/case['"]/);
	assert.doesNotMatch(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.match(source, /otherCaseWork/);
	assert.match(source, /workCaseHref/);
	assert.match(source, /mailtoHref/);
	assert.match(source, /caseCopy\.otherWorkPrefix/);
	assert.match(source, /caseCopy\.mailLabel/);
	assert.doesNotMatch(source, /homeCopy\.contactMailLabel/);
	assert.match(source, /site\.email/);
	assert.match(source, /caseCopy\.wechatSeeHome/);
	assert.match(source, /withBase\(caseCopy\.wechatHref\)/);
	assert.match(source, /caseCopy\.wechatHref/);
	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /site\.resumeLabel/);
	assert.doesNotMatch(source, /site\.status/);
	assert.doesNotMatch(source, /wechatQrSrc|wechat-qr/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /DEMO_ACCOUNT|DEMO_PASSWORD/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
	assert.match(source, /<a class=["']btn["'] href=\{workCaseHref\(other\.slug\)\}>/);
	assert.equal(source.match(/class=["']btn["']/g)?.length, 1);
	assert.match(source, /<a href=\{mailtoHref\(site\.email\)\}>\{caseCopy\.mailLabel\}<\/a>/);
	assert.match(source, /<a href=\{withBase\(caseCopy\.wechatHref\)\}>\{caseCopy\.wechatSeeHome\}<\/a>/);
	assert.match(source, /\.case-bar a:not\(\.btn\)\s*\{[^}]*color:\s*var\(--color-muted\)/s);
	assert.match(source, /\.case-bar\s*\{[^}]*border-top:\s*1px\s+solid\s+var\(--c-hairline\)/s);
	assert.doesNotMatch(source, /color:\s*var\(--color-accent\)/);
});
