import assert from 'node:assert/strict';
import { test } from 'node:test';
import { workImageSize } from './work-image.ts';

test('workImageSize returns intrinsic pixels for known screenshots', () => {
	assert.deepEqual(workImageSize('/work/speaking/cover.jpg'), { width: 768, height: 432 });
	assert.deepEqual(workImageSize('/work/speaking/gallery-1.jpg'), { width: 768, height: 432 });
	assert.deepEqual(workImageSize('/work/speaking/gallery-2.jpg'), { width: 576, height: 324 });
	assert.deepEqual(workImageSize('/work/speaking/gallery-3.jpg'), { width: 960, height: 540 });
	assert.deepEqual(workImageSize('/work/interview/cover.jpg'), { width: 1600, height: 900 });
	assert.deepEqual(workImageSize('/work/interview/gallery-1.jpg'), { width: 1600, height: 1223 });
	assert.deepEqual(workImageSize('/work/unknown.jpg'), { width: 1600, height: 900 });
});
