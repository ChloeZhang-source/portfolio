import assert from 'node:assert/strict';
import { test } from 'node:test';

test('homeCopy locks homepage chrome labels from the plan', async () => {
	const { homeCopy } = await import('./home.ts');

	assert.equal(homeCopy.heroWorkLabel, '查看作品');
	assert.equal(homeCopy.heroWorkHref, '#work');
	assert.equal(homeCopy.heroKicker, '作品集 · 2026');
	assert.equal(homeCopy.heroPreviews.speaking, '一轮练习，不用先注册');
	assert.equal(homeCopy.heroPreviews.interview, '一套能被复评的面试流程');
	assert.equal('heroContactLabel' in homeCopy, false);
	assert.equal('heroContactHref' in homeCopy, false);
	assert.equal('workSectionTitle' in homeCopy, false);
	assert.equal('exploreLede' in homeCopy, false);
	assert.equal('workCaseLabel' in homeCopy, false);
	assert.equal(homeCopy.workCaseLabels.speaking, '看它怎么做的 →');
	assert.equal(homeCopy.workCaseLabels.interview, '看脱敏流程 →');
	assert.equal(homeCopy.workDemoLabel, '查看访问说明');
	assert.equal(homeCopy.workThesis, '多数产品重在搭建架构，我重在拆除门槛。');
	assert.equal(homeCopy.judgmentsTitle, '产品决策｜四项取舍原则');
	assert.equal(
		homeCopy.judgmentsNote,
		'每一次产品选择，都是主动取舍。我接受优势，也承担对应的代价。',
	);
	assert.deepEqual(homeCopy.workLede, [
		'我的作品统一解决一个核心问题：让私有的经验、零散的流程、口头的标准，变成公开、可复现、可落地的系统。',
		'我优先交付最小可用版本，以真实场景验证假设，再逐步迭代扩张。不做无人使用的完美架构，只做能持续落地的有效产品。',
	]);
	assert.equal(homeCopy.workInvite.speaking, '你现在就能打开试一轮。');
	assert.equal('interview' in homeCopy.workInvite, false);
	assert.equal(homeCopy.nowTitle, '现在');
	assert.equal(homeCopy.aboutTitle, '关于');
	assert.equal('experienceTitle' in homeCopy, false);
	assert.equal(homeCopy.contactMailLabel, '发邮件');
	assert.doesNotMatch(JSON.stringify(homeCopy), /立即体验|Try now|免费注册/);
});
