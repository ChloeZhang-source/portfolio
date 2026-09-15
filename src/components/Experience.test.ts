import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Experience is a compact timeline from site.experience, not the chapter hash target', async () => {
	const source = await readFile(join(here, 'Experience.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.doesNotMatch(source, /id=["']experience["']/);
	assert.match(source, /homeCopy\.experienceTitle/);
	assert.match(source, /site\.experience/);
	assert.match(source, /splitExperiencePeriod/);
	assert.match(source, /item\.org/);
	assert.match(source, /item\.role/);
	assert.match(source, /item\.period/);
	assert.match(source, /item\.bullets/);
	assert.match(source, /experience__rail/);
	assert.match(source, /experience__when/);
	assert.match(source, /experience__entry--now/);
	assert.match(source, /WindowBar/);
	assert.match(source, /window__bar|WindowBar/);
	assert.match(source, /class=["']window["']|class=["']window /);
	assert.match(source, /window--notes/);
	assert.match(source, /caption=["']经历["']/);
	assert.match(source, /\.experience h2\s*\{[^}]*font-size:\s*1\.25rem/s);
	assert.match(source, /\.experience h2\s*\{[^}]*letter-spacing:\s*0\.02em/s);
	assert.doesNotMatch(source, /\.experience h2\s*\{[^}]*font-family:/s);
	assert.doesNotMatch(source, /\.experience h3\s*\{[^}]*font-family:/s);
	assert.doesNotMatch(source, /\.experience h2\s*\{[^}]*font-size:\s*1\.62em/s);
	assert.match(source, /--exp-ink-3:\s*#6f6c66/);
	assert.doesNotMatch(source, /--exp-ink-3:\s*#8a857a/);
	assert.match(source, /--rail-pad:\s*136px/);
	assert.match(source, /max-width:\s*44\.9rem/);
	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
});
