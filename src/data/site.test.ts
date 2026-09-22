import assert from 'node:assert/strict';
import { test } from 'node:test';

test('site.ts exports the locked portfolio copy and required fields', async () => {
	const { site } = await import('./site.ts');

	assert.equal(
		site.headlinePath,
		'翻硕出身 · 前互联网教育主管 · 不写代码 · 现在用 AI 当开发工具',
	);
	assert.equal(site.headlineRole, '文科生，不写代码，我把两个 AI 产品推到了有人用。');
	assert.equal(
		site.headlineProof,
		'口语陪练公开内测，打开就能练完一轮；教师招聘面试系统已在前司跑完 50+ 场。',
	);
	assert.equal(
		site.headline,
		'文科生，不写代码，我把两个 AI 产品推到了有人用。口语陪练公开内测，打开就能练完一轮；教师招聘面试系统已在前司跑完 50+ 场。',
	);
	assert.equal(site.headline, `${site.headlineRole}${site.headlineProof}`);
	assert.equal(
		site.headlineEn,
		"A liberal-arts graduate who doesn't write code. I shipped two AI products people actually use.",
	);
	assert.equal(site.documentTitle, '张晓雪 · 文科生转 AI 的作品集｜口语陪练与面试系统');
	assert.equal(
		site.metaDescription,
		'文科生，不写代码，我用 AI 当开发工具，把两个产品推到了有人用：口语陪练公开内测、打开就能练完一轮；教师招聘面试系统已在前司跑完 50+ 场真实招聘。这里写清每个判断的取舍。',
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
	assert.equal(site.aboutStory.length, 4);
	assert.match(site.aboutStory[1], /^2025年11月之后/);
	assert.ok(site.aboutStory[3].includes('从 0 推到能用'));

	assert.equal(site.judgments.length, 4);
	assert.deepEqual(site.judgments[0], {
		what: '先做闭环，后做账号',
		cost: '拿不到留存数据，也做不了用户画像。迭代只能靠我自己一轮一轮试。',
	});
	assert.deepEqual(site.judgments[1], {
		what: '演示只用脱敏数据',
		cost: '展示的说服力打了折。我没法用真实对话证明效果，只能用界面说明流程。',
	});
	assert.deepEqual(site.judgments[2], {
		what: '先写权限和隐私，再做后台功能',
		cost: '上线更慢。前几十场只能半人工兜底，我没法一次交出一个完整的系统。',
	});
	assert.deepEqual(site.judgments[3], {
		what: '先不做复杂成长曲线',
		cost: '少了一条「坚持练下去」的钩子，用户走完一轮就离开了',
	});

	assert.deepEqual(site.now, {
		doing: '在把面试系统的评分标准整理成一套可复用的模板',
		learning: '在补基础的产品分析方法，也在学怎么把 prompt 写得可维护',
		thinking: '非技术背景做产品，天花板到底在哪一层——我还没想清楚',
	});

	assert.equal(
		site.contactInvite,
		'如果你也在用 AI 做东西，或者想知道非技术背景怎么把想法推到能用——直接发邮件给我，我很想听你卡在哪一步。',
	);

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
