import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('About renders path story, judgments timeline, and now from site/home data', async () => {
	const source = await readFile(join(here, 'About.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.doesNotMatch(source, /homeCopy\.aboutTitle/);
	assert.match(source, /homeCopy\.judgmentsTitle/);
	assert.match(source, /homeCopy\.judgmentsNote/);
	assert.match(source, /homeCopy\.nowTitle/);
	assert.match(source, /site\.aboutStory/);
	assert.match(source, /site\.judgments/);
	assert.match(source, /site\.now/);
	assert.match(source, /site\.updatedAt/);
	assert.doesNotMatch(source, /site\.about(?![A-Za-z])/);

	assert.match(source, /class=["']about__story["']/);
	assert.match(source, /class=["']judgments["']/);
	assert.match(source, /class=["']judgments__list["']/);
	assert.match(source, /<ol\b/);
	assert.match(source, /judgments__what/);
	assert.match(source, /judgments__cost/);
	assert.match(source, /padStart\s*\(\s*2\s*,\s*['"]0['"]\s*\)/);
	assert.match(source, /代价：/);
	assert.match(source, /class=["']now["']/);
	assert.match(source, /<dl\b/);
	assert.match(source, /在做/);
	assert.match(source, /在学/);
	assert.match(source, /在思考/);
	assert.doesNotMatch(source, /<dt>在想<\/dt>/);
	assert.match(source, /now\.doing/);
	assert.match(source, /now\.learning/);
	assert.match(source, /now\.thinking/);
	assert.match(source, /now__updated/);
	assert.match(source, /最近更新于/);

	assert.doesNotMatch(source, /brandManifesto|about__manifesto/);

	assert.match(source, /site\.resumeHref/);
	assert.match(source, /site\.resumeDownloadName/);
	assert.match(source, /site\.resumeLabel/);
	assert.match(source, /download=\{site\.resumeDownloadName\}/);

	assert.doesNotMatch(source, /id=["']about["']/);
	assert.doesNotMatch(source, /aboutSkillsPrimary|aboutSkillsSecondary|acpCert/);
	assert.doesNotMatch(source, /<dialog/);
	assert.doesNotMatch(source, /showModal/);
	assert.doesNotMatch(source, /about__skills|about__cert|about__dialog/);
	assert.doesNotMatch(source, /<script/);

	assert.match(source, /\.about h2\s*\{[^}]*letter-spacing:\s*0\.02em/s);
	assert.doesNotMatch(source, /\.about h2\s*\{[^}]*font-family:/s);
	assert.match(source, /text-align:\s*left/);
	assert.match(source, /2\.4rem/);
	assert.match(source, /var\(--color-amber-ink\)/);
	assert.match(source, /\.about__resume a\s*\{[^}]*color:\s*var\(--color-muted\)/s);
	assert.match(source, /\.about__resume a\s*\{[^}]*font-size:\s*var\(--font-size-muted\)/s);

	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
	assert.doesNotMatch(source, /caie|CAIE\.jpg|identity|身份证|429005/i);
});
