import assert from 'node:assert/strict';
import { test } from 'node:test';

test('caseCopy locks result facts, demo English, and WeChat pointer', async () => {
	const { caseCopy, resultFactsFor } = await import('./case.ts');

	assert.deepEqual(caseCopy.resultFacts.speaking, ['公开内测', '无需登录', '核心闭环']);
	assert.deepEqual(caseCopy.resultFacts.interview, [
		'前司用于招聘线上老师',
		'已完成 50+ 场面试',
		'真实环境不开放登录',
	]);
	assert.equal(caseCopy.demoEn, 'Built for teacher hiring at my previous company. No public login.');
	assert.equal(caseCopy.accessTitle, '访问说明');
	assert.equal(caseCopy.walkthroughLabel, '看流程截图');
	assert.equal(caseCopy.walkthroughHref, '#gallery');
	assert.equal(caseCopy.requestLabel, '预约讲解');
	assert.equal(caseCopy.requestHref, '/#contact');
	assert.equal(caseCopy.wechatSeeHome, '回首页看微信');
	assert.equal(caseCopy.wechatHref, '/#contact');
	assert.doesNotMatch(JSON.stringify(caseCopy), /立即体验|Try now|免费注册/);
	assert.doesNotMatch(JSON.stringify(caseCopy), /复制密码|Demo account|演示可试用|题库生成|模拟面试/);

	assert.deepEqual(resultFactsFor('speaking', 'fallback'), caseCopy.resultFacts.speaking);
	assert.deepEqual(resultFactsFor('unknown', 'fallback'), ['fallback']);
});
