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
		'我把零散经验和复杂流程，整理成可使用、可复现、可持续迭代的产品系统。',
	]);
	assert.equal(homeCopy.workIdentity, '产品负责人 · 独立开发 · AI 产品落地');
	assert.equal(
		homeCopy.workClosing,
		'我关注的不只是功能是否完成，也包括规则、流程和使用门槛是否真正被解决。',
	);
	assert.deepEqual(homeCopy.workCaseTypes, {
		speaking: 'AI 口语练习产品',
		interview: '招聘与面试流程',
	});
	assert.deepEqual(homeCopy.workCaseNumbers, {
		speaking: '01',
		interview: '02',
	});
	assert.deepEqual(homeCopy.workProcesses.interview, ['面试指引', '分段考核', '全程录制', '人工复评']);
	assert.equal(homeCopy.workInvite.speaking, '无需登录，打开即可开始一轮练习。');
	assert.equal(homeCopy.workInvite.interview, '候选人信息已脱敏，案例页展示流程与评估方式。');
	assert.equal(homeCopy.nowTitle, '现在');
	assert.equal(homeCopy.aboutTitle, '关于');
	assert.equal('experienceTitle' in homeCopy, false);
	assert.equal(homeCopy.contactMailLabel, '发邮件');
	assert.doesNotMatch(JSON.stringify(homeCopy), /立即体验|Try now|免费注册/);
});
