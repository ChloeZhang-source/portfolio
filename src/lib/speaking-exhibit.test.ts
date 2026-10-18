import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('speaking exhibit walks the real product frames, not a scored chat', async () => {
	const source = await readFile(join(here, 'speaking-exhibit.ts'), 'utf8');
	const { speakingExhibit } = await import('./speaking-exhibit.ts');

	assert.equal(speakingExhibit.caption, '口语陪练 · 打开即用');
	assert.equal(speakingExhibit.note, '不用注册。这是一轮的形状，不是正在连线。');
	assert.equal(speakingExhibit.caseLabel, '看这一轮怎么做的 →');
	assert.equal(speakingExhibit.caseSlug, 'speaking');
	assert.deepEqual(
		speakingExhibit.steps.map((step) => step.label),
		['打开', '开口', '小结'],
	);
	assert.deepEqual(
		speakingExhibit.steps.map((step) => step.image),
		['/work/speaking/cover.jpg', '/work/speaking/gallery-2.jpg', '/work/speaking/gallery-3.jpg'],
	);
	assert.match(speakingExhibit.steps[1].text, /What are you building\?/);
	assert.match(speakingExhibit.steps[1].alt, /What are you building/);
	assert.match(speakingExhibit.steps[2].alt, /流利度、用词、语法和下一步练习/);
	assert.match(speakingExhibit.steps[2].text, /流利度、用词、语法/);
	assert.doesNotMatch(speakingExhibit.steps[2].text, /\d/);
	assert.doesNotMatch(source, /真机演示/);
	assert.doesNotMatch(source, /httpsaitalk\.win/);
	assert.doesNotMatch(source, /\bfetch\s*\(/);
	assert.doesNotMatch(source, /productUrl/);
	assert.doesNotMatch(source, /300|50\+|人均|流利度',\s*value/);
});

test('selecting a step shows that frame and ignores unknown keys', async () => {
	const { createExhibitSession } = await import('./speaking-exhibit.ts');
	const session = createExhibitSession();

	assert.equal(session.snapshot().step.key, 'open');
	assert.equal(session.snapshot().step.label, '打开');

	session.select('speak');
	assert.equal(session.snapshot().step.key, 'speak');
	assert.match(session.snapshot().step.text, /What are you building\?/);

	session.select('missing');
	assert.equal(session.snapshot().step.key, 'speak');

	session.select('summary');
	assert.equal(session.snapshot().step.key, 'summary');
	assert.equal(session.snapshot().step.image, '/work/speaking/gallery-3.jpg');
});
