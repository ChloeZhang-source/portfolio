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
		description:
			'面试标准装在资深老师脑子里，录像没人复看，评分表对不齐。我把一轮面试拆成设备验证、指引、分环节作答、管理端评分，并放弃让 AI 直接给结论。50+ 场，全部发生在前司真实招聘里。',
		role: '独立产品经理',
		result: '已完成 50+ 场模拟面试',
		transferable: '可迁移到多轮智能体工作流',
		summaryEn: 'x '.repeat(80).trim(),
		summaryEnShort: '50+ mock interviews completed.',
		cover: '/work/interview/cover.jpg',
		gallery: [{ image: '/work/interview/1.jpg', alt: '面试指引页：流程步骤与评分标准', caption: '面试指引' }],
		ctaLabel: '看脱敏流程',
		access: 'demo',
		demoNotes: '本产品已在真实业务环境使用，不提供公开账号。',
		order: 2,
	});
	assert.equal(interview.access, 'demo');
	assert.equal(interview.ctaLabel, '看脱敏流程');
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

test('speaking and interview MDX match locked copy and heading order', async () => {
	const { worksSchema } = await import('./works-schema.ts');
	const speakingHeadings = [
		'问题：口语练习的最大阻碍是启动成本',
		'我的判断：打开即用，无需注册，一轮即成',
		'怎么做的：专属陪练与中英切换',
		'我放弃了什么：用户画像与留存数据',
		'结果：公开内测，100+ 轮真实对话',
	];
	const interviewHeadings = [
		'问题：标准不可见、过程不可溯、结果不可评',
		'我的判断：做成可录制、可打分、可复评、可复盘的体系',
		'怎么做的：专项考核与全程存档',
		'我放弃了什么：用效率换规范',
		'结果：50+ 场真实教师招聘',
	];

	const speakingRaw = await readFile(join(here, 'works/speaking.mdx'), 'utf8');
	const interviewRaw = await readFile(join(here, 'works/interview.mdx'), 'utf8');

	const speaking = worksSchema.parse(parseFrontmatter(speakingRaw));
	const interview = worksSchema.parse(parseFrontmatter(interviewRaw));

	assert.equal(speaking.slug, 'speaking');
	assert.equal(speaking.access, 'public');
	assert.equal(speaking.ctaLabel, '直接开练');
	assert.equal(speaking.tagline, '口语练习卡在启动成本。打开即用，无需注册，一轮即成。');
	assert.equal(
		speaking.description,
		'口语练习的最大阻碍是过高的启动成本。剥离前置流程与账号体系，实现打开即用、无需注册、一轮即成。公开内测累计 100+ 轮真实对话训练。',
	);
	assert.notEqual(speaking.description, speaking.tagline);
	assert.equal(speaking.result, '公开内测 · 100+ 轮真实对话 · 无需注册');
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
	assert.match(speakingRaw, /口语练习的最大阻碍，从来不是能力不足，是过高的启动成本。/);
	assert.match(speakingRaw, /剥离所有前置流程，去除账号体系，实现打开即用、无需注册、一轮即成。/);
	assert.match(speakingRaw, /搭载专属 AI 陪练角色，支持中英自由切换/);
	assert.match(speakingRaw, /零门槛体验，意味着放弃用户画像与留存数据/);
	assert.match(speakingRaw, /比起完整的数据体系，我更在意真实的使用发生。/);
	assert.match(speakingRaw, /已公开内测，累计 100\+ 轮真实对话训练。/);
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
	assert.equal(interview.access, 'demo');
	assert.equal(interview.ctaLabel, '看脱敏流程');
	assert.equal(
		interview.tagline,
		'标准不可见、过程不可溯、结果不可评。做成可录制、可打分、可复评的面试体系。',
	);
	assert.equal(
		interview.description,
		'传统面试依赖个人经验，标准不可见、过程不可溯、结果不可评。将口头经验结构化为可录制、可打分、可复评、可复盘的体系。已落地 50+ 场真实教师招聘面试。',
	);
	assert.notEqual(interview.description, interview.tagline);
	assert.equal(interview.result, '50+ 场真实教师招聘 · 可复评 · 全程存档');
	assert.equal(interview.transferable, '把一轮面试做成可复评流程，比堆更多环节更管用');
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
		'这是前司招聘线上老师的正式流程，不是给访客试用的产品。这里只用脱敏截图说明三件事：面试指引、正式面试、管理端评分。不开放登录，也不展示真实候选人。想看完整流程，可以约一次线上讲解。',
	);
	assert.match(interview.demoNotes ?? '', /前司招聘线上老师/);
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
	assert.match(interviewRaw, /可录制、可打分、可复评、可复盘的标准化面试体系/);
	assert.match(interviewRaw, /支持 15 分钟知识点专项考核、屏幕共享辅助授课/);
	assert.match(interviewRaw, /效率让步于规范，速度让步于底线。/);
	assert.match(interviewRaw, /已落地 50\+ 场真实教师招聘面试。/);
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
});
