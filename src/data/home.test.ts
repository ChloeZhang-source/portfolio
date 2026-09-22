import assert from 'node:assert/strict';
import { test } from 'node:test';

test('homeCopy locks homepage chrome labels from the plan', async () => {
	const { homeCopy } = await import('./home.ts');

	assert.equal(homeCopy.heroWorkLabel, '查看作品');
	assert.equal(homeCopy.heroWorkHref, '#work');
	assert.equal('heroContactLabel' in homeCopy, false);
	assert.equal('heroContactHref' in homeCopy, false);
	assert.equal('workSectionTitle' in homeCopy, false);
	assert.equal('exploreLede' in homeCopy, false);
	assert.equal(homeCopy.workCaseLabel, '阅读案例 →');
	assert.equal(homeCopy.workDemoLabel, '查看访问说明');
	assert.equal(
		homeCopy.workThesis,
		'两个作品，同一个判断：把走不完的流程，收敛成一轮能走完的闭环。',
	);
	assert.equal(homeCopy.judgmentsTitle, '过程中的几个判断');
	assert.equal(
		homeCopy.judgmentsNote,
		'决定这两个产品长什么样的，不是功能清单，是下面这几个取舍。',
	);
	assert.equal(homeCopy.nowTitle, '现在');
	assert.equal(homeCopy.aboutTitle, '关于');
	assert.equal('experienceTitle' in homeCopy, false);
	assert.equal(homeCopy.contactMailLabel, '发邮件');
	assert.doesNotMatch(JSON.stringify(homeCopy), /立即体验|Try now|免费注册/);
});
