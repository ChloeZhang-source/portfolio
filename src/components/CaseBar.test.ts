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
	assert.match(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.match(source, /otherCaseWork/);
	assert.match(source, /workCaseHref/);
	assert.match(source, /mailtoHref/);
	assert.match(source, /homeCopy\.contactMailLabel/);
	assert.match(source, /site\.email/);
	assert.match(source, /caseCopy\.wechatSeeHome/);
	assert.match(source, /caseCopy\.wechatHref/);
	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /site\.resumeLabel/);
	assert.doesNotMatch(source, /site\.status/);
	assert.doesNotMatch(source, /wechatQrSrc|wechat-qr/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /DEMO_ACCOUNT|DEMO_PASSWORD/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
});
