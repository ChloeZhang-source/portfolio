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
	assert.doesNotMatch(source, /padStart\s*\(\s*2\s*,\s*['"]0['"]\s*\)/);
	assert.match(source, /判断一/);
	assert.match(source, /判断二/);
	assert.match(source, /判断三/);
	assert.match(source, /判断四/);
	assert.match(source, /\.judgments__list li:before\s*\{[^}]*width:\s*8px/s);
	assert.match(source, /\.judgments__list li:before\s*\{[^}]*height:\s*8px/s);
	assert.match(source, /\.judgments__list li:before\s*\{[^}]*background:\s*var\(--color-amber-ink\)/s);
	assert.match(source, /\.judgments__no\s*\{[^}]*color:\s*var\(--c-amber-text\)/s);
	assert.doesNotMatch(source, /\.judgments__no\s*\{[^}]*color:\s*var\(--color-amber-ink\)/s);
	assert.match(source, /\.now dt\s*\{[^}]*color:\s*var\(--c-amber-text\)/s);
	assert.doesNotMatch(source, /\.now dt\s*\{[^}]*color:\s*var\(--color-amber-ink\)/s);
	assert.match(source, /\.judgments__list:before\s*\{[^}]*width:\s*1px/s);
	assert.match(source, /\.judgments__list:before\s*\{[^}]*background:\s*var\(--color-rule\)/s);
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

	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /site\.resumeDownloadName/);
	assert.doesNotMatch(source, /site\.resumeLabel/);
	assert.doesNotMatch(source, /about__resume/);

	assert.doesNotMatch(source, /id=["']about["']/);
	assert.doesNotMatch(source, /aboutSkillsPrimary|aboutSkillsSecondary|acpCert/);
	assert.doesNotMatch(source, /<dialog/);
	assert.doesNotMatch(source, /showModal/);
	assert.doesNotMatch(source, /about__skills|about__cert|about__dialog/);
	assert.doesNotMatch(source, /<script/);

	assert.match(source, /\.about h2\s*\{[^}]*letter-spacing:\s*0\.02em/s);
	assert.match(source, /\.judgments__what\s*\{[^}]*font-weight:\s*500/s);
	assert.doesNotMatch(source, /\.judgments__what\s*\{[^}]*font-weight:\s*600/s);
	assert.match(source, /\.now dd\s*\{[^}]*font-size:\s*var\(--text-body\)/s);
	assert.match(source, /\.now dd\s*\{[^}]*line-height:\s*var\(--leading-body\)/s);
	assert.doesNotMatch(source, /\.now dd\s*\{[^}]*font-size:\s*0\.95rem/s);
	assert.match(source, /grid-template-columns:\s*var\(--label-col\)\s+1fr/);
	assert.doesNotMatch(source, /grid-template-columns:\s*5\.5rem/);
	assert.match(source, /@media\s*\(\s*max-width:\s*639px\s*\)\s*\{[^}]*grid-template-columns:\s*1fr/s);
	assert.doesNotMatch(source, /width\s*<=\s*520px/);
	assert.doesNotMatch(source, /\.about h2\s*\{[^}]*font-family:/s);
	assert.match(source, /text-align:\s*left/);
	assert.match(source, /2\.4rem/);
	assert.match(source, /var\(--color-amber-ink\)/);

	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
	assert.doesNotMatch(source, /caie|CAIE\.jpg|identity|身份证|429005/i);
});
