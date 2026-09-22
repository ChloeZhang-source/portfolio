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
		role: '独立产品经理',
		result: '公开内测中，无需登录即可试用',
		transferable: '可迁移到其他对话式练习产品',
		summaryEn: 'x '.repeat(80).trim(),
		summaryEnShort: 'Public beta. No login required.',
		cover: '/work/speaking/cover.jpg',
		gallery: [{ image: '/work/speaking/1.jpg', alt: '进入练习画面：3D 陪练官与开场问候', caption: '进入练习' }],
		productUrl: 'https://example.com/speaking',
		ctaLabel: '打开产品',
		access: 'public',
		order: 1,
	});
	assert.equal(speaking.access, 'public');
	assert.equal(speaking.ctaLabel, '打开产品');

	const interview = worksSchema.parse({
		title: '面试系统',
		slug: 'interview',
		tagline: '多轮模拟面试闭环',
		role: '独立产品经理',
		result: '已完成 50+ 场模拟面试',
		transferable: '可迁移到多轮智能体工作流',
		summaryEn: 'x '.repeat(80).trim(),
		summaryEnShort: '50+ mock interviews completed.',
		cover: '/work/interview/cover.jpg',
		gallery: [{ image: '/work/interview/1.jpg', alt: '面试指引页：流程步骤与评分标准', caption: '面试指引' }],
		ctaLabel: '看流程',
		access: 'demo',
		demoNotes: '本产品已在真实业务环境使用，不提供公开账号。',
		order: 2,
	});
	assert.equal(interview.access, 'demo');
	assert.equal(interview.ctaLabel, '看流程');
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
	const requiredHeadings = ['问题', '洞察', '方案', '我做了什么', '结果与反思'];

	const speakingRaw = await readFile(join(here, 'works/speaking.mdx'), 'utf8');
	const interviewRaw = await readFile(join(here, 'works/interview.mdx'), 'utf8');

	const speaking = worksSchema.parse(parseFrontmatter(speakingRaw));
	const interview = worksSchema.parse(parseFrontmatter(interviewRaw));

	assert.equal(speaking.slug, 'speaking');
	assert.equal(speaking.access, 'public');
	assert.equal(speaking.ctaLabel, '打开产品');
	assert.equal(speaking.tagline, '练口语卡在开口之前——所以我把注册墙拆了，让第一轮先成立。');
	assert.equal(speaking.result, '公开内测中，无需登录即可试用');
	assert.equal(speaking.transferable, '先做完一轮听—说—结束，比先搭账号体系更关键');
	assert.match(speaking.summaryEn, /Public beta\. No login required\./);
	assert.match(speaking.summaryEn, /public-beta product interface/);
	assert.match(speaking.summaryEn, /What I learned getting it usable/);
	assert.doesNotMatch(speaking.summaryEn, /placeholders/);
	assert.doesNotMatch(speaking.summaryEn, /transfer to other/i);
	assert.doesNotMatch(speakingRaw, /立即体验|Try now|免费注册/);
	assert.doesNotMatch(speakingRaw, /可迁移到/);
	assert.match(speakingRaw, /做到能用时我学到的/);
	assert.match(speakingRaw, /我做的第一个判断是/);
	assert.match(speakingRaw, /先把「进入 → 开口 → 回应 → 离开」这一轮做完/);
	assert.match(speakingRaw, /没有账号就拿不到留存数据/);
	assert.match(speakingRaw, /第二个判断是\*\*演示尺度\*\*/);
	assert.match(speakingRaw, /代价是展示的说服力打了折/);
	assert.doesNotMatch(speakingRaw, /独立定 MVP/);
	assert.deepEqual(
		speaking.gallery.map((item) => item.caption),
		['进入练习', '开口对话', '即时反馈'],
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
	assert.equal(interview.access, 'demo');
	assert.equal(interview.ctaLabel, '看流程');
	assert.equal(interview.tagline, '口口相传的标准没法复评——所以我把它做成了一轮可以打分的工作流。');
	assert.equal(interview.result, '已完成 50+ 场教师招聘面试');
	assert.equal(interview.transferable, '把一轮面试做成可复评流程，比堆更多环节更管用');
	assert.equal(interview.productUrl, undefined);
	assert.match(interview.summaryEn, /50\+ teacher-hiring interviews completed\./);
	assert.match(interview.summaryEn, /Built for teacher hiring at my previous company\./);
	assert.match(interview.summaryEn, /Live environment\. No public login\./);
	assert.match(interview.summaryEn, /Walkthrough on this page\./);
	assert.match(interview.summaryEn, /What I learned getting it usable/);
	assert.doesNotMatch(interview.summaryEn, /demo account|Demo account|credentials|mock interview/i);
	assert.doesNotMatch(interview.summaryEn, /transfer to other/i);
	assert.match(interview.demoNotes ?? '', /前司招聘线上老师/);
	assert.match(interview.demoNotes ?? '', /面试指引/);
	assert.match(interview.demoNotes ?? '', /管理端评分/);
	assert.match(interview.demoNotes ?? '', /不提供登录|不提供公开账号/);
	assert.match(interview.demoNotes ?? '', /脱敏/);
	assert.match(interview.demoNotes ?? '', /需要演示时邮件或微信联系/);
	assert.doesNotMatch(interview.demoNotes ?? '', /可约 10 分钟讲解/);
	assert.doesNotMatch(interview.demoNotes ?? '', /Demo account|密码|账号位于|题库生成/);
	assert.doesNotMatch(interviewRaw, /立即体验|Try now|免费注册/);
	assert.doesNotMatch(interviewRaw, /DEMO_|mianshi\.zhan\.com|打开演示|可演示|demoAccount|demoPassword/);
	assert.doesNotMatch(interviewRaw, /模拟面试|题库生成到改进建议/);
	assert.doesNotMatch(interviewRaw, /考生路径|#demo/);
	assert.doesNotMatch(interviewRaw, /可迁移到/);
	assert.match(interviewRaw, /做到能用时我学到的/);
	assert.match(interviewRaw, /应聘老师一条分环节面试/);
	assert.match(interviewRaw, /对照 AI 参考分的评分台/);
	assert.match(interviewRaw, /不是让 AI 判分，是给面试官一个参照点/);
	assert.match(interviewRaw, /先写了权限和候选人隐私，再做后台功能/);
	assert.match(interviewRaw, /前几十场只能半人工兜底/);
	assert.match(interviewRaw, /作品集只用脱敏截图说明「指引 → 面试 → 评分」/);
	assert.doesNotMatch(interviewRaw, /独立把评测逻辑写成 AI 参考分，接到管理端人工复核/);
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
	assert.ok(interviewWords >= 80 && interviewWords <= 120, `interview summaryEn words: ${interviewWords}`);

	assert.deepEqual(headingOrder(speakingRaw.split(/---/)[2] ?? ''), requiredHeadings);
	assert.deepEqual(headingOrder(interviewRaw.split(/---/)[2] ?? ''), requiredHeadings);
});
