import assert from 'node:assert/strict';
import { test } from 'node:test';
import { workImageSize } from './work-image.ts';

test('workImageSize returns intrinsic pixels for known screenshots', () => {
	assert.deepEqual(workImageSize('/work/speaking/cover.jpg'), { width: 1600, height: 870 });
	assert.deepEqual(workImageSize('/work/interview/cover.jpg'), { width: 1600, height: 858 });
	assert.deepEqual(workImageSize('/work/interview/gallery-1.jpg'), { width: 1600, height: 1223 });
	assert.deepEqual(workImageSize('/work/unknown.jpg'), { width: 1600, height: 900 });
});
