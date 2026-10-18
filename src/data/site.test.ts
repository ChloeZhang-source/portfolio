import assert from 'node:assert/strict';
import { test } from 'node:test';

test('site.ts exports the locked portfolio copy and required fields', async () => {
	const { site } = await import('./site.ts');

	assert.equal(site.headlineRole, '先闭环可用，再迭代完美');
	assert.equal(
		site.headlineSub,
		'前互联网教育行业主管，聚焦 AI 产品落地：拆解需求、定义规则、搭建流程，让想法先成为可用产品。',
	);
	assert.equal(site.headline, `${site.headlineRole}${site.headlineSub}`);
	assert.equal(site.headlinePath, undefined);
	assert.equal(site.headlineProof, undefined);
	assert.equal(
		site.headlineEn,
		"A liberal-arts graduate who doesn't write code. I ship usable product loops with AI as the production tool.",
	);
	assert.equal(site.documentTitle, '张晓雪 · 先闭环可用，再迭代完美｜口语陪练与面试系统');
	assert.equal(
		site.metaDescription,
		'翻硕背景，前互联网教育人。依托 AI 将模糊需求固化为可执行规则。作品解决同一件事：让私有经验与口头标准，变成可复现、可落地的系统。口语陪练约 300 人次体验；面试系统 50+ 场真实招聘。',
	);
	assert.notEqual(site.metaDescription, site.headline);
	assert.notEqual(site.metaDescription, site.headlineRole);
	assert.equal(site.updatedAt, '2026-09');

	assert.equal(typeof site.name, 'string');
	assert.ok(site.name.length > 0);

	assert.equal(typeof site.email, 'string');
	assert.equal(typeof site.resumeHref, 'string');
	assert.equal(typeof site.resumeDownloadName, 'string');
	assert.equal(site.resumeDownloadName, `${site.name}.pdf`);
	assert.equal(site.resumeLabel, '下载简历');
	assert.equal(site.wechatHint, '扫码添加微信，继续交流');
	assert.equal(typeof site.wechatQrSrc, 'string');
	assert.equal(typeof site.avatarSrc, 'string');
	assert.equal(site.ogImage, '/og-home.png');

	assert.equal('about' in site, false);
	assert.equal(site.aboutStory.length, 3);
	assert.equal(site.aboutStory[0], '张晓雪 Chloe，翻硕背景，前互联网教育行业主管，聚焦 AI 产品落地。');
	assert.equal(
		site.aboutStory[1],
		'我负责拆解需求、定义规则、搭建流程并验证产品闭环，以 AI 推动想法成为可用产品。',
	);
	assert.equal(
		site.aboutStory[2],
		'我擅长把模糊的业务经验转成清晰、可执行、可复用的产品系统：先验证最小闭环，再根据真实反馈迭代。',
	);

	assert.equal(site.judgments.length, 4);
	assert.deepEqual(site.judgments[0], {
		what: '先闭环，后账号',
		cost: '少了用户画像与留存数据，换来低门槛体验和更快验证。',
	});
	assert.deepEqual(site.judgments[1], {
		what: '演示仅用脱敏数据',
		cost: '演示细节有所减少，但用户安全优先于展示效果。',
	});
	assert.deepEqual(site.judgments[2], {
		what: '先立规则，后做功能',
		cost: '上线更慢，前期需要人工兜底，换取合规与稳定。',
	});
	assert.deepEqual(site.judgments[3], {
		what: '放弃功利化激励体系',
		cost: '少了短期留存抓手，避免用攀比驱动学习与练习。',
	});

	assert.deepEqual(site.now, {
		doing: '沉淀面试评分体系，打磨可通用、可复用的标准化产品模板。',
		learning: '系统化产品分析方法，精进精准、可控、可迭代的 AI 指令设计能力。',
		thinking: '非技术背景的产品创作者，如何用规则、逻辑与落地力建立长期竞争力。',
	});

	assert.equal(site.brandManifesto, undefined);

	assert.deepEqual(site.contactInvite, [
		'欢迎围绕 AI 落地、产品流程与系统设计交流项目中的实际问题与解法。',
	]);

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
		['首页', '作品', '关于', '联系'],
	);
	assert.deepEqual(
		site.nav.map((item) => item.href),
		['/#home', '/#work', '/#about', '/#contact'],
	);
});
