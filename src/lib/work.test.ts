import assert from 'node:assert/strict';
import { test } from 'node:test';

test('workCaseHref is a case-page path, not a product URL', async () => {
	const { workCaseHref } = await import('./work.ts');

	assert.equal(workCaseHref('speaking'), '/work/speaking');
	assert.equal(workCaseHref('interview'), '/work/interview');
});

test('homepage card helpers are gone; case pages keep caseProductCta', async () => {
	const work = await import('./work.ts');

	assert.equal('workCardEnglish' in work, false);
	assert.equal('workSecondaryCta' in work, false);
	assert.equal(typeof work.caseProductCta, 'function');
});

test('showCaseDemo is true only for demo works with access notes', async () => {
	const { showCaseDemo } = await import('./work.ts');

	assert.equal(showCaseDemo({ access: 'public', demoNotes: '访问说明' }), false);
	assert.equal(showCaseDemo({ access: 'demo' }), false);
	assert.equal(
		showCaseDemo({ access: 'demo', demoAccount: 'DEMO_ACCOUNT', demoPassword: 'DEMO_PASSWORD' }),
		false,
	);
	assert.equal(showCaseDemo({ access: 'demo', demoNotes: '不提供公开账号。' }), true);
});

test('caseProductCta opens the product URL in a new tab with the work ctaLabel', async () => {
	const { caseProductCta } = await import('./work.ts');

	assert.deepEqual(
		caseProductCta({
			access: 'public',
			productUrl: 'https://example.com/speaking',
			ctaLabel: '打开产品',
		}),
		{
			href: 'https://example.com/speaking',
			label: '打开产品',
			external: true,
		},
	);
});

test('demo case product CTA stays on #gallery and never opens a live admin', async () => {
	const { caseProductCta } = await import('./work.ts');

	const cta = caseProductCta({
		access: 'demo',
		slug: 'interview',
		productUrl: 'https://mianshi.zhan.com/#/admin',
		ctaLabel: '看流程',
	});

	assert.deepEqual(cta, {
		href: '#gallery',
		label: '看流程',
		external: false,
	});
	assert.doesNotMatch(cta.href, /mianshi\.zhan\.com|https?:\/\//);
});

test('otherCaseWork links to the other case and skips a missing peer', async () => {
	const { otherCaseWork, workCaseHref } = await import('./work.ts');

	const speaking = { slug: 'speaking', title: '口语陪练' };
	const interview = { slug: 'interview', title: '面试系统' };

	assert.deepEqual(otherCaseWork([speaking, interview], 'speaking'), interview);
	assert.deepEqual(otherCaseWork([speaking, interview], 'interview'), speaking);
	assert.equal(otherCaseWork([speaking], 'speaking'), undefined);
	assert.equal(workCaseHref('interview'), '/work/interview');
});
