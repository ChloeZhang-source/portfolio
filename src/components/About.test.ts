import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('About keeps short copy and a quiet resume link, without skills or ACP', async () => {
	const source = await readFile(join(here, 'About.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.match(source, /homeCopy\.aboutTitle/);
	assert.match(source, /site\.about/);
	assert.match(source, /site\.resumeHref/);
	assert.match(source, /site\.resumeDownloadName/);
	assert.match(source, /site\.resumeLabel/);
	assert.match(source, /download=\{site\.resumeDownloadName\}/);

	assert.doesNotMatch(source, /id=["']about["']/);
	assert.doesNotMatch(source, /aboutSkillsPrimary|aboutSkillsSecondary|acpCert/);
	assert.doesNotMatch(source, /<dialog/);
	assert.doesNotMatch(source, /showModal/);
	assert.doesNotMatch(source, /about__skills|about__cert|about__dialog/);

	assert.match(source, /\.about h2\s*\{[^}]*letter-spacing:\s*0\.02em/s);
	assert.doesNotMatch(source, /\.about h2\s*\{[^}]*font-family:/s);
	assert.match(source, /\.about__resume a\s*\{[^}]*color:\s*var\(--color-muted\)/s);
	assert.match(source, /\.about__resume a\s*\{[^}]*font-size:\s*var\(--font-size-muted\)/s);

	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
	assert.doesNotMatch(source, /caie|CAIE\.jpg|identity|身份证|429005/i);
});
