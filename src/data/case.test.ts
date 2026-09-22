import assert from 'node:assert/strict';
import { test } from 'node:test';

test('caseCopy locks result facts, demo English, and WeChat pointer', async () => {
	const { caseCopy, resultFactsFor } = await import('./case.ts');

	assert.deepEqual(caseCopy.resultFacts.speaking, ['公开内测中', '无需登录', '100+ 轮次']);
	assert.deepEqual(caseCopy.resultFacts.interview, [
		'前司正式招聘流程',
		'已完成 50+ 场',
		'不开放登录',
	]);
	assert.equal(caseCopy.demoEn, 'Built for teacher hiring at my previous company. No public login.');
	assert.equal(caseCopy.accessTitle, '访问说明');
	assert.equal(caseCopy.walkthroughLabel, '看流程截图');
	assert.equal(caseCopy.walkthroughHref, '#gallery');
	assert.equal(caseCopy.requestLabel, '约 20 分钟讲解');
	assert.equal(caseCopy.requestHref, '/#contact');
	assert.equal(caseCopy.otherWorkPrefix, '看另一个作品：');
	assert.equal(caseCopy.mailLabel, '邮件说两句');
	assert.equal(caseCopy.wechatSeeHome, '首页有微信');
	assert.equal(caseCopy.wechatHref, '/#contact');
	assert.doesNotMatch(JSON.stringify(caseCopy), /立即体验|Try now|免费注册/);
	assert.doesNotMatch(JSON.stringify(caseCopy), /复制密码|Demo account|演示可试用|题库生成|模拟面试/);
	assert.doesNotMatch(JSON.stringify(caseCopy), /核心闭环|预约讲解|真实环境不开放登录/);

	assert.deepEqual(resultFactsFor('speaking', 'fallback'), caseCopy.resultFacts.speaking);
	assert.deepEqual(resultFactsFor('unknown', 'fallback'), ['fallback']);
});
