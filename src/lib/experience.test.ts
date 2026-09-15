import assert from 'node:assert/strict';
import { test } from 'node:test';
import { site } from '../data/site.ts';

test('splitExperiencePeriod puts 至今 on the second line and marks the role current', async () => {
	const { splitExperiencePeriod } = await import('./experience.ts');

	assert.deepEqual(splitExperiencePeriod('2024.03 — 至今'), {
		start: '2024.03 —',
		end: '至今',
		current: true,
	});
});

test('splitExperiencePeriod stacks a closed range as start / end without a dash', async () => {
	const { splitExperiencePeriod } = await import('./experience.ts');

	assert.deepEqual(splitExperiencePeriod('2022.07 — 2023.12'), {
		start: '2022.07',
		end: '2023.12',
		current: false,
	});
});

test('every site.experience period splits into a two-line rail label', async () => {
	const { splitExperiencePeriod } = await import('./experience.ts');

	for (const item of site.experience) {
		const when = splitExperiencePeriod(item.period);
		assert.ok(when.start.length > 0);
		assert.ok(when.end.length > 0);
		assert.match(item.period, when.end === '至今' ? /至今/ : new RegExp(when.end.replace('.', '\\.')));
	}

	assert.equal(splitExperiencePeriod(site.experience[0].period).current, false);
	assert.ok(site.experience.slice(1).every((item) => !splitExperiencePeriod(item.period).current));
});
