import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Contact leads with invite copy, then likeness, mail, and WeChat — no resume pill', async () => {
	const source = await readFile(join(here, 'Contact.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.match(source, /WindowBar/);
	assert.match(source, /mailtoHref/);
	assert.match(source, /id=["']contact["']/);
	assert.match(source, /site\.contactInvite/);
	assert.match(source, /contact__invite/);
	assert.match(source, /withBase\(site\.avatarSrc\)/);
	assert.match(source, /site\.avatarSrc/);
	assert.match(source, /contact__avatar/);
	assert.match(source, /alt=\{site\.name\}/);
	assert.match(source, /loading=["']lazy["']/);
	assert.match(source, /decoding=["']async["']/);
	assert.match(source, /border-radius:\s*50%/);
	assert.doesNotMatch(source, /window--portrait/);
	assert.match(source, /homeCopy\.contactMailLabel/);
	assert.match(source, /site\.email/);
	assert.match(source, /withBase\(site\.wechatQrSrc\)/);
	assert.match(source, /site\.wechatQrSrc/);
	assert.match(source, /site\.wechatHint/);
	assert.match(source, /caption=["']微信["']/);
	assert.match(source, /window/);
	assert.match(source, /--font-mono/);
	assert.match(source, /\.contact h2\s*\{[^}]*letter-spacing:\s*0\.02em/s);
	assert.doesNotMatch(source, /\.contact h2\s*\{[^}]*font-family:/s);
	assert.match(source, /text-align:\s*left/);
	assert.match(source, /var\(--color-accent\)/);
	assert.doesNotMatch(source, /class=["']btn["']/);
	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /site\.resumeDownloadName/);
	assert.doesNotMatch(source, /site\.resumeLabel/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);

	const order = ['site.contactInvite', 'site.avatarSrc', 'site.email', 'site.wechatQrSrc', 'site.wechatHint'];
	let cursor = -1;
	for (const token of order) {
		const at = source.indexOf(token, cursor + 1);
		assert.ok(at > cursor, `expected ${token} after previous contact field`);
		cursor = at;
	}
});
