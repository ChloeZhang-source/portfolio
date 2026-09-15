import assert from 'node:assert/strict';
import { test } from 'node:test';

test('site.ts exports the locked job-search copy and required fields', async () => {
	const { site } = await import('./site.ts');

	assert.equal(site.headlineRole, 'AI 教育产品经理');
	assert.equal(site.headlineProof, '从 0 到 1 做过口语陪练和面试系统');
	assert.equal(
		site.headline,
		'AI 教育产品经理，从 0 到 1 做过口语陪练和面试系统',
	);
	assert.equal(site.headline, `${site.headlineRole}，${site.headlineProof}`);
	assert.equal(
		site.headlineEn,
		'Product manager in AI education. Built two 0-to-1 products: AI speaking practice and an AI interview system.',
	);
	assert.deepEqual(site.statusLines, [
		'目前优先考虑 AI 教育方向',
		'也关注对话式 / 智能体产品机会',
	]);
	assert.equal(
		site.status,
		'目前优先考虑 AI 教育方向，也关注对话式 / 智能体产品机会',
	);
	assert.equal(site.status, site.statusLines.join('，'));
	assert.equal(
		site.statusEn,
		'Prioritizing AI education roles; also open to conversational / agent products.',
	);
	assert.equal(site.updatedAt, '2026-09');

	assert.equal(typeof site.name, 'string');
	assert.ok(site.name.length > 0);
	assert.ok(Array.isArray(site.facts));
	assert.ok(site.facts.length >= 1 && site.facts.length <= 2);

	assert.equal(typeof site.email, 'string');
	assert.equal(typeof site.resumeHref, 'string');
	assert.equal(typeof site.resumeDownloadName, 'string');
	assert.ok(site.resumeDownloadName.endsWith('-AI教育产品经理.pdf'));
	assert.equal(site.resumeLabel, '下载简历');
	assert.equal(site.wechatHint, '微信 · 约时间');
	assert.equal(typeof site.wechatQrSrc, 'string');
	assert.equal(typeof site.avatarSrc, 'string');

	assert.equal(typeof site.about, 'string');
	const aboutChars = [...site.about.replace(/\s/g, '')].length;
	assert.ok(aboutChars >= 80 && aboutChars <= 120, `about should be 80–120 chars, got ${aboutChars}`);
	assert.match(site.about, /阿里云大模型 ACP/);
	assert.match(site.about, /CAIE/);
	assert.equal(site.acpCert.src, '/certs/alibaba-acp-llm.jpg');
	assert.equal(site.acpCert.label, '查看 ACP 证书');
	assert.equal(site.acpCert.closeLabel, '关闭');
	assert.match(site.acpCert.alt, /阿里云大模型 ACP/);
	assert.match(site.acpCert.alt, /ACP26260802754212/);
	assert.doesNotMatch(site.acpCert.alt, /CAIE|身份证/);
	assert.ok(Array.isArray(site.aboutSkillsPrimary));
	assert.ok(Array.isArray(site.aboutSkillsSecondary));
	assert.ok(site.aboutSkillsPrimary.length > 0);

	assert.ok(Array.isArray(site.experience));
	assert.ok(site.experience.length >= 1);
	for (const item of site.experience) {
		assert.equal(typeof item.org, 'string');
		assert.equal(typeof item.role, 'string');
		assert.equal(typeof item.period, 'string');
		assert.ok(Array.isArray(item.bullets));
		assert.ok(item.bullets.length <= 3);
	}
	assert.match(site.experience[0].bullets.join(''), /线上老师招聘面试系统/);

	assert.equal(site.phone, undefined);
	assert.equal(site.github, undefined);
	assert.doesNotMatch(site.statusEn, /open to any AI role/i);

	assert.deepEqual(
		site.nav.map((item) => item.label),
		['首页', '作品', '经历'],
	);
	assert.deepEqual(
		site.nav.map((item) => item.href),
		['/#home', '/#work', '/#experience'],
	);
});
