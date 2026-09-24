import assert from 'node:assert/strict';
import { test } from 'node:test';

test('site.ts exports the locked portfolio copy and required fields', async () => {
	const { site } = await import('./site.ts');

	assert.equal(site.headlineRole, '先闭环可用，再迭代完美');
	assert.equal(
		site.headlineSub,
		'翻硕背景 / 前互联网教育行业主管。依托 AI 为生产工具，将模糊需求固化为可执行规则，把想法落地成可复用的产品闭环。',
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
		'翻硕背景，前互联网教育人。依托 AI 将模糊需求固化为可执行规则。作品解决同一件事：让私有经验与口头标准，变成可复现、可落地的系统。口语陪练 100+ 轮；面试系统 50+ 场真实招聘。',
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
	assert.equal(site.resumeLabel, '简历');
	assert.equal(site.wechatHint, '微信');
	assert.equal(typeof site.wechatQrSrc, 'string');
	assert.equal(typeof site.avatarSrc, 'string');
	assert.equal(site.ogImage, '/og-home.png');

	assert.equal('about' in site, false);
	assert.equal(site.aboutStory.length, 5);
	assert.equal(site.aboutStory[0], '张晓雪 Chloe，翻硕背景，前互联网教育人。');
	assert.equal(
		site.aboutStory[1],
		'我不写业务代码，核心工作是拆解复杂需求、定义执行规则、搭建落地流程、验证产品闭环，以 AI 为核心工具完成从想法到产品的完整落地。',
	);
	assert.equal(
		site.aboutStory[2],
		'我的产品底层逻辑源于对 AI 的长期观察：机器精准执行指令，所有混乱、偏差与失效，皆来自人类需求的模糊与规则的缺失。',
	);
	assert.equal(
		site.aboutStory[3],
		'因此我坚持先验证最小闭环，再搭建完整架构。优先交付可用产品，用真实反馈修正假设，再逐层迭代、扩张能力。',
	);
	assert.equal(
		site.aboutStory[4],
		'我的核心优势，是把模糊的业务经验，变成清晰、可执行、可复用的产品系统。',
	);

	assert.equal(site.judgments.length, 4);
	assert.deepEqual(site.judgments[0], {
		what: '先闭环，后账号',
		cost: '牺牲数据沉淀与用户画像，换取更低的落地门槛与更快的场景验证。',
	});
	assert.deepEqual(site.judgments[1], {
		what: '演示仅用脱敏数据',
		cost: '适度降低演示说服力，始终将用户安全置于展示效果之上。',
	});
	assert.deepEqual(site.judgments[2], {
		what: '先立规则，后做功能',
		cost: '拉长上线周期，以局部人工兜底，换取系统长期合规性与稳定性。',
	});
	assert.deepEqual(site.judgments[3], {
		what: '放弃功利化激励体系',
		cost: '舍弃短期留存抓手。拒绝用攀比机制驱动行为，保留学习与练习的纯粹性。',
	});

	assert.deepEqual(site.now, {
		doing: '沉淀面试评分体系，打磨可通用、可复用的标准化产品模板。',
		learning: '系统化产品分析方法，精进精准、可控、可迭代的 AI 指令设计能力。',
		thinking:
			'非技术背景创作者，如何以规则、逻辑与落地力，构建长期不可替代的产品竞争力。',
	});

	assert.equal(site.brandManifesto, undefined);

	assert.deepEqual(site.contactInvite, [
		'欢迎与深耕 AI 落地、产品流程搭建、系统逻辑打磨的同行交流，探讨项目落地中的瓶颈、取舍与解法。',
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
