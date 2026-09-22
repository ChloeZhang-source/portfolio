import assert from 'node:assert/strict';
import { test } from 'node:test';

test('site.ts exports the locked portfolio copy and required fields', async () => {
	const { site } = await import('./site.ts');

	assert.equal(site.headlineRole, '从 0 做到能用');
	assert.equal(site.headlineProof, '口语陪练与面试系统，都推到了可试用或可演示');
	assert.equal(
		site.headline,
		'从 0 做到能用，口语陪练与面试系统，都推到了可试用或可演示',
	);
	assert.equal(site.headline, `${site.headlineRole}，${site.headlineProof}`);
	assert.equal(
		site.headlineEn,
		'From zero to something you can try. Two AI education products, shipped.',
	);
	assert.equal(site.updatedAt, '2026-09');

	assert.equal(typeof site.name, 'string');
	assert.ok(site.name.length > 0);

	assert.equal(typeof site.email, 'string');
	assert.equal(typeof site.resumeHref, 'string');
	assert.equal(typeof site.resumeDownloadName, 'string');
	assert.equal(site.resumeDownloadName, `${site.name}.pdf`);
	assert.equal(site.resumeLabel, '简历');
	assert.equal(site.wechatHint, '微信');
	assert.equal(typeof site.wechatQrSrc, 'string');
	assert.equal(typeof site.avatarSrc, 'string');

	assert.equal(typeof site.about, 'string');
	const aboutChars = [...site.about.replace(/\s/g, '')].length;
	assert.ok(aboutChars >= 60 && aboutChars <= 120, `about should be 60–120 chars, got ${aboutChars}`);

	assert.equal(site.status, undefined);
	assert.equal(site.statusLines, undefined);
	assert.equal(site.statusEn, undefined);
	assert.equal(site.facts, undefined);
	assert.equal(site.experience, undefined);
	assert.equal(site.aboutSkillsPrimary, undefined);
	assert.equal(site.aboutSkillsSecondary, undefined);
	assert.equal(site.acpCert, undefined);
	assert.equal(site.phone, undefined);
	assert.equal(site.github, undefined);

	assert.deepEqual(
		site.nav.map((item) => item.label),
		['首页', '作品', '关于'],
	);
	assert.deepEqual(
		site.nav.map((item) => item.href),
		['/#home', '/#work', '/#about'],
	);
});
