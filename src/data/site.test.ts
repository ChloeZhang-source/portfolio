import assert from 'node:assert/strict';
import { test } from 'node:test';

test('site.ts exports the locked portfolio copy and required fields', async () => {
	const { site } = await import('./site.ts');

	assert.equal(
		site.headlinePath,
		'翻硕出身 · 前互联网教育主管 · 现在用 AI 当开发工具',
	);
	assert.equal(site.headlineRole, '把想法，跑成闭环');
	assert.equal(
		site.headlineProof,
		'张晓雪 Chloe｜把模糊的需求写成规则，让 AI 去执行',
	);
	assert.equal(
		site.headline,
		'把想法，跑成闭环张晓雪 Chloe｜把模糊的需求写成规则，让 AI 去执行',
	);
	assert.equal(site.headline, `${site.headlineRole}${site.headlineProof}`);
	assert.equal(
		site.headlineEn,
		"A liberal-arts graduate who doesn't write code. I shipped two AI products people actually use.",
	);
	assert.equal(site.documentTitle, '张晓雪 · 文科生转 AI 的作品集｜口语陪练与面试系统');
	assert.equal(
		site.metaDescription,
		'文科生，不写代码，我用 AI 当开发工具把两个产品做出来。做的事只有一件：把门槛拿掉，把标准写下来。口语陪练打开就能练；面试系统在前司跑完 50+ 场，评分可复评。',
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
	assert.equal(site.aboutStory.length, 3);
	assert.equal(
		site.aboutStory[0],
		'翻硕背景，曾负责互联网教育相关业务。如今我不写业务代码，工作方式是定义规则、梳理流程，借助 AI 工具完成产品落地。',
	);
	assert.equal(
		site.aboutStory[1],
		'AI 会严格执行指令，因此一旦提示词不够清晰，它就会自行补全假设。这个观察，慢慢构成我做产品的底层逻辑：先验证完整闭环，再考虑架构与扩张。',
	);
	assert.equal(
		site.aboutStory[2],
		'比起一次搭完整系统，我更倾向先交出能被人用的一版，再用真实使用反馈改假设。口语陪练最初没有账号体系，面试系统起步也只是一套简易评分表。我做的是把想法推到别人能用。',
	);

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
		what: '不做打卡和排行榜',
		cost: '少了一条「坚持练下去」的激励，用户走完一轮就离开了。',
	});

	assert.deepEqual(site.now, {
		doing: '在把面试系统的评分标准整理成一套可复用的模板',
		learning: '在补基础的产品分析方法，也在学怎么把 prompt 写清楚、改得动',
		thinking: '非技术背景做产品，天花板到底在哪一层——我还没想清楚',
	});

	assert.deepEqual(site.brandManifesto, [
		'不设注册墙，不做打卡和排行榜，不拿别人的对话做演示。',
		'三样都不靠，产品还站得住，才算做成。',
		'站不站得住，看它能不能被复评。',
	]);

	assert.deepEqual(site.contactInvite, [
		'如果你手上的流程卡在门口，或者标准只在几个人的脑子里，欢迎来信。',
		'聊聊项目实践里那些卡在逻辑或资源上的问题。',
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
