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
	assert.equal(homeCopy.workCaseLabels.speaking, '查看案例 →');
	assert.equal(homeCopy.workCaseLabels.interview, '查看案例 →');
	assert.equal(homeCopy.workDemoLabel, '查看访问说明');
	assert.equal(homeCopy.workThesis, '把经验和标准变成可用、可复核的产品流程。');
	assert.equal(homeCopy.judgmentsTitle, '产品决策｜四项取舍原则');
	assert.equal(homeCopy.judgmentsNote, '每项选择都有收益，也有代价。');
	assert.deepEqual(homeCopy.workLede, [
		'我先找出实际使用中的阻力，再把解决办法落进产品：口语陪练减少开练前的步骤，面试系统让评估过程可回看。',
	]);
	assert.equal(homeCopy.workIdentity, '产品负责人 · 独立开发 · AI 产品落地');
	assert.equal(homeCopy.workClosing, '关于我：经历、产品判断与当前关注。');
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
