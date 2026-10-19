import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

const here = dirname(fileURLToPath(import.meta.url));

function parseFrontmatter(raw: string): Record<string, unknown> {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	assert.ok(match, 'MDX must start with YAML frontmatter');
	return load(match[1]) as Record<string, unknown>;
}

function headingOrder(body: string): string[] {
	return [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
}

test('works schema validates speaking (public) and interview (demo) entries', async () => {
	const { worksSchema } = await import('./works-schema.ts');

	const speaking = worksSchema.parse({
		title: '口语陪练',
		slug: 'speaking',
		tagline: '公开内测的口语练习闭环',
		homeProblem: '注册和登录让用户难以开始练习。',
		homeContribution: '拆掉注册门槛，让用户打开就能练完一轮。',
		description:
			'想练一句口语，第一步就卡在注册墙上。我把注册拆掉，让「进入、开口、回应、离开」四个动作就能练完一轮；也放弃了打卡和排行榜——打卡只能证明坚持，证明不了进步。这是完整的取舍过程。',
		role: '独立产品经理',
		result: '公开内测中，无需登录即可试用',
		transferable: '可迁移到其他对话式练习产品',
		summaryEn: 'x '.repeat(80).trim(),
		summaryEnShort: 'Public beta. No login required.',
		cover: '/work/speaking/cover.jpg',
		gallery: [{ image: '/work/speaking/1.jpg', alt: '进入练习画面：3D 陪练官与开场问候', caption: '进入练习' }],
		productUrl: 'https://example.com/speaking',
		ctaLabel: '直接开练',
		access: 'public',
		order: 1,
	});
	assert.equal(speaking.access, 'public');
	assert.equal(speaking.ctaLabel, '直接开练');

	const interview = worksSchema.parse({
		title: '面试系统',
		slug: 'interview',
		tagline: '多轮模拟面试闭环',
		homeProblem: '面试标准依赖个人经验，难以追溯和复评。',
		homeContribution: '将口头标准拆成指引、考核、录制与人工复评。',
		description:
			'面试标准装在资深老师脑子里，录像没人复看，评分表对不齐。我把一轮面试拆成设备验证、指引、分环节作答、管理端评分，并放弃让 AI 直接给结论。50+ 场，全部发生在前司真实招聘里。',
		role: '独立产品经理',
		result: '已完成 50+ 场模拟面试',
		transferable: '可迁移到多轮智能体工作流',
		summaryEn: 'x '.repeat(80).trim(),
		summaryEnShort: '50+ mock interviews completed.',
		cover: '/work/interview/cover.jpg',
		gallery: [{ image: '/work/interview/1.jpg', alt: '面试指引页：流程步骤与评分标准', caption: '面试指引' }],
		ctaLabel: '查看脱敏流程',
		access: 'demo',
		demoNotes: '本产品已在真实业务环境使用，不提供公开账号。',
		order: 2,
	});
	assert.equal(interview.access, 'demo');
	assert.equal(interview.ctaLabel, '查看脱敏流程');
	assert.equal(interview.productUrl, undefined);
	assert.equal(interview.demoAccount, undefined);
	assert.equal(interview.demoPassword, undefined);

	assert.throws(() =>
		worksSchema.parse({
			...speaking,
			access: 'closed',
		}),
	);
	assert.throws(() =>
		worksSchema.parse({
			...speaking,
			productUrl: undefined,
		}),
	);
	assert.throws(() =>
		worksSchema.parse({
			...interview,
			demoNotes: undefined,
		}),
	);
	assert.throws(() =>
		worksSchema.parse({
			...interview,
			ctaLabel: '打开演示',
		}),
	);
	assert.throws(() =>
		worksSchema.parse({
			...speaking,
			gallery: ['/work/speaking/1.jpg'],
		}),
	);
});

test('speaking and interview MDX follow the case-study narrative and preserve evidence', async () => {
	const { worksSchema } = await import('./works-schema.ts');
	const speakingHeadings = [
		'背景与目标：减少开始练习前的阻力',
		'我的职责：把练习目标拆成可用流程',
		'关键判断与取舍：先验证一轮练习能否成立',
		'方案落地：进入、表达、回应、反馈',
		'结果与验证：公开内测约 300 人次',
		'局限与复盘：补齐去重和分群观察',
	];
	const interviewHeadings = [
		'背景与目标：让标准和过程都能被复核',
		'我的职责：把口头标准变成可执行规则',
		'关键判断与取舍：规范先于速度，AI 只提供参考',
		'方案落地：从面试指引到归档复评',
		'结果与验证：完成 50+ 场真实招聘面试',
		'局限与复盘：先扩大验证，再判断能否通用',
	];

	const speakingRaw = await readFile(join(here, 'works/speaking.mdx'), 'utf8');
	const interviewRaw = await readFile(join(here, 'works/interview.mdx'), 'utf8');

	const speaking = worksSchema.parse(parseFrontmatter(speakingRaw));
	const interview = worksSchema.parse(parseFrontmatter(interviewRaw));

	assert.equal(speaking.slug, 'speaking');
	assert.equal(speaking.access, 'public');
	assert.equal(speaking.ctaLabel, '直接开练');
	assert.equal(speaking.tagline, '无需注册，打开后即可完成一轮口语练习。');
	assert.equal(
		speaking.description,
		'无需注册即可开始一轮口语练习。公开内测累计约 300 人次体验，人均对话约 15 轮。',
	);
	assert.notEqual(speaking.description, speaking.tagline);
	assert.equal(speaking.result, '截至 2026 年 9 月 · 公开内测约 300 人次体验（含重复访问） · 人均约 15 轮');
	assert.equal(speaking.homeProblem, '注册、登录和配置增加了第一次开口前的步骤。');
	assert.equal(speaking.homeContribution, '去掉注册与配置，让用户打开即进入一轮练习并获得反馈。');
	assert.equal(speaking.transferable, '先保证第一次表达发生，比先搭账号体系更关键');
	assert.match(speaking.summaryEn, /Public beta\. No login required\./);
	assert.match(speaking.summaryEn, /public-beta product interface/);
	assert.match(speaking.summaryEn, /What I learned getting it usable/);
	assert.doesNotMatch(speaking.summaryEn, /placeholders/);
	assert.doesNotMatch(speaking.summaryEn, /transfer to other/i);
	assert.doesNotMatch(speakingRaw, /立即体验|Try now|免费注册/);
	assert.doesNotMatch(speakingRaw, /可迁移到/);
	assert.doesNotMatch(speakingRaw, /做到能用时我学到的/);
	assert.doesNotMatch(speakingRaw, /^## (洞察|方案|我做了什么|结果与反思)$/m);
	assert.match(speakingRaw, /注册、登录和配置/);
	assert.match(speakingRaw, /暂时放弃用户画像与完整留存数据/);
	assert.match(speakingRaw, /专属 AI 陪练角色对话，可在中文与英文间切换/);
	assert.match(speakingRaw, /截至 2026 年 9 月，公开内测累计约 300 人次体验，人均对话约 15 轮/);
	assert.match(speakingRaw, /不代表独立用户数/);
	assert.match(speakingRaw, /7 日留存约 22%、单次会话成本约 0.35 元/);
	assert.match(speakingRaw, /不能把结果归因于某个具体设计决策/);
	assert.doesNotMatch(speakingRaw, /独立定 MVP/);
	assert.deepEqual(
		speaking.gallery.map((item) => item.caption),
		['开口对话', '即时反馈'],
	);
	assert.equal(new Set(speaking.gallery.map((item) => item.alt)).size, speaking.gallery.length);
	for (const item of speaking.gallery) {
		assert.notEqual(item.alt, '口语陪练');
		assert.notEqual(item.alt, speaking.title);
		assert.match(item.image, /^\/work\/speaking\/gallery-\d+\.jpg$/);
	}
	assert.equal(speaking.demoAccount, undefined);
	assert.equal(speaking.demoPassword, undefined);

	assert.equal(interview.slug, 'interview');
	assert.equal(interview.title, '标准化可复评面试系统');
	assert.equal(interview.homeProblem, '评分标准依赖个人经验，过程和结果都难以追溯、复评。');
	assert.equal(interview.homeContribution, '将口头标准拆成面试指引、分段考核、全程录制与人工复评。');
	assert.equal(interview.access, 'demo');
	assert.equal(interview.ctaLabel, '查看脱敏流程');
	assert.equal(
		interview.tagline,
		'把口头标准整理成可执行的面试流程，并保留录像、评分和复评记录。',
	);
	assert.equal(
		interview.description,
		'传统面试依赖个人经验，标准不可见、过程不可溯、结果不可评。将口头经验结构化为可录制、可打分、可复评、可复盘的体系。已落地 50+ 场真实教师招聘面试。',
	);
	assert.notEqual(interview.description, interview.tagline);
	assert.equal(interview.result, '截至 2026 年 9 月 · 50+ 场真实教师招聘面试 · 单一企业内部 · 全程存档');
	assert.equal(interview.transferable, '让每一轮面试都有明确标准和可复核记录');
	assert.equal(interview.productUrl, undefined);
	assert.match(interview.summaryEn, /50\+ teacher-hiring interviews completed\./);
	assert.match(interview.summaryEn, /Built for teacher hiring at my previous company\./);
	assert.match(interview.summaryEn, /Live environment\. No public login\./);
	assert.match(interview.summaryEn, /Walkthrough on this page\./);
	assert.match(interview.summaryEn, /What I learned getting it usable/);
	assert.doesNotMatch(interview.summaryEn, /demo account|Demo account|credentials|mock interview/i);
	assert.doesNotMatch(interview.summaryEn, /transfer to other/i);
	assert.equal(
		interview.demoNotes,
		'这是前公司招聘线上老师的正式流程，不是给访客试用的产品。这里只用脱敏截图说明三件事：面试指引、正式面试、管理端评分。不开放登录，也不展示真实候选人。想看完整流程，可以约一次线上讲解。',
	);
	assert.match(interview.demoNotes ?? '', /前公司招聘线上老师/);
	assert.match(interview.demoNotes ?? '', /面试指引/);
	assert.match(interview.demoNotes ?? '', /管理端评分/);
	assert.match(interview.demoNotes ?? '', /不开放登录/);
	assert.match(interview.demoNotes ?? '', /脱敏/);
	assert.match(interview.demoNotes ?? '', /想看完整流程，可以约一次线上讲解/);
	assert.doesNotMatch(interview.demoNotes ?? '', /可约 10 分钟讲解/);
	assert.doesNotMatch(interview.demoNotes ?? '', /需要演示时邮件或微信联系/);
	assert.doesNotMatch(interview.demoNotes ?? '', /Demo account|密码|账号位于|题库生成/);
	assert.doesNotMatch(interviewRaw, /立即体验|Try now|免费注册/);
	assert.doesNotMatch(interviewRaw, /DEMO_|mianshi\.zhan\.com|打开演示|可演示|demoAccount|demoPassword/);
	assert.doesNotMatch(interviewRaw, /模拟面试|题库生成到改进建议/);
	assert.doesNotMatch(interviewRaw, /考生路径|#demo/);
	assert.doesNotMatch(interviewRaw, /可迁移到/);
	assert.doesNotMatch(interviewRaw, /做到能用时我学到的/);
	assert.doesNotMatch(interviewRaw, /^## (洞察|方案|我做了什么|结果与反思)$/m);
	assert.match(interviewRaw, /传统面试依赖个人经验，标准不可见、过程不可溯、结果不可评。/);
	assert.match(interviewRaw, /候选人先完成身份校验和设备检测，再查看面试指引并分段作答/);
	assert.match(interviewRaw, /身份校验、权限和归档规则/);
	assert.match(interviewRaw, /AI 只提供参考分，不直接决定候选人结果/);
	assert.match(interviewRaw, /15 分钟知识点专项考核与屏幕共享辅助授课/);
	assert.match(interviewRaw, /截至 2026 年 9 月，系统在单一企业内部支持了 50\+ 场真实教师招聘面试/);
	assert.match(interviewRaw, /AI 初评与人工复核的最终建议一致率约 87%/);
	assert.match(interviewRaw, /较原 Excel 加录像回看流程估算下降约 60%/);
	assert.match(interviewRaw, /没有对外商业验证，不是 SaaS 产品/);
	assert.doesNotMatch(interviewRaw, /独立把评测逻辑写成 AI 参考分，接到管理端人工复核/);
	assert.doesNotMatch(interviewRaw, /我原本以为要把功能补齐/);
	assert.deepEqual(
		interview.gallery.map((item) => item.caption),
		['面试指引', '正式面试', '管理端评分'],
	);
	assert.equal(new Set(interview.gallery.map((item) => item.alt)).size, interview.gallery.length);
	for (const item of interview.gallery) {
		assert.notEqual(item.alt, '面试系统');
		assert.notEqual(item.alt, interview.title);
		assert.match(item.image, /^\/work\/interview\/gallery-\d+\.jpg$/);
	}

	const speakingWords = speaking.summaryEn.trim().split(/\s+/).length;
	const interviewWords = interview.summaryEn.trim().split(/\s+/).length;
	assert.ok(speakingWords >= 80 && speakingWords <= 120, `speaking summaryEn words: ${speakingWords}`);
	assert.ok(interviewWords >= 80 && interviewWords <= 120, `interview words: ${interviewWords}`);

	assert.deepEqual(headingOrder(speakingRaw.split(/---/)[2] ?? ''), speakingHeadings);
	assert.deepEqual(headingOrder(interviewRaw.split(/---/)[2] ?? ''), interviewHeadings);
	for (const [raw, slug] of [[speakingRaw, 'speaking'], [interviewRaw, 'interview']] as const) {
		const body = raw.split(/---/)[2] ?? '';
		assert.ok(body.indexOf(`<CaseGallery slug="${slug}" />`) > body.indexOf('## 方案落地'));
		assert.ok(body.indexOf(`<CaseGallery slug="${slug}" />`) < body.indexOf('## 结果与验证'));
	}
});
