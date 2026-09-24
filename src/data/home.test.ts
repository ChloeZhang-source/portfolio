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
	assert.equal(
		homeCopy.workThesis,
		'两个产品都在做同一件事：把门槛拿掉，把标准写下来。',
	);
	assert.equal(homeCopy.judgmentsTitle, '过程中的几个判断');
	assert.equal(
		homeCopy.judgmentsNote,
		'每条都付了代价。你可能不同意其中一条。',
	);
	assert.equal(
		homeCopy.workLede,
		'如果你手上的流程卡在门口，或者标准只在几个人的脑子里，下面这两个也许对你有用。',
	);
	assert.equal(homeCopy.workInvite.speaking, '你现在就能打开试一轮。');
	assert.equal('interview' in homeCopy.workInvite, false);
	assert.equal(homeCopy.nowTitle, '现在');
	assert.equal(homeCopy.aboutTitle, '关于');
	assert.equal('experienceTitle' in homeCopy, false);
	assert.equal(homeCopy.contactMailLabel, '发邮件');
	assert.doesNotMatch(JSON.stringify(homeCopy), /立即体验|Try now|免费注册/);
});
