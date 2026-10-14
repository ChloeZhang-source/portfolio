import assert from 'node:assert/strict';
import { test } from 'node:test';

test('margin notes reuse the four judgments without inventing copy', async () => {
	const { aboutMarginNotes, heroMarginNotes } = await import('./marginalia.ts');
	const { site } = await import('../data/site.ts');

	assert.equal(typeof heroMarginNotes, 'function');
	assert.equal(typeof aboutMarginNotes, 'function');
	assert.deepEqual(heroMarginNotes(site.judgments), [site.judgments[0], site.judgments[3]]);
	assert.deepEqual(aboutMarginNotes(site.judgments), [site.judgments[1], site.judgments[2]]);
	assert.deepEqual(
		heroMarginNotes(site.judgments).map((note) => note.what),
		['先闭环，后账号', '放弃功利化激励体系'],
	);
	assert.deepEqual(
		aboutMarginNotes(site.judgments).map((note) => note.what),
		['演示仅用脱敏数据', '先立规则，后做功能'],
	);
});
