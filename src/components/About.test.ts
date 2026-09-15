import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('About is #about with body copy and primary skills before secondary', async () => {
	const source = await readFile(join(here, 'About.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.match(source, /id=["']about["']/);
	assert.match(source, /homeCopy\.aboutTitle/);
	assert.match(source, /site\.about/);
	assert.match(source, /site\.aboutSkillsPrimary/);
	assert.match(source, /site\.aboutSkillsSecondary/);

	const primary = source.indexOf('site.aboutSkillsPrimary');
	const secondary = source.indexOf('site.aboutSkillsSecondary');
	assert.ok(source.indexOf('site.about') < primary);
	assert.ok(primary < secondary);

	assert.match(source, /\.about h2\s*\{[^}]*letter-spacing:\s*0\.02em/s);
	assert.doesNotMatch(source, /\.about h2\s*\{[^}]*font-family:/s);
	assert.match(source, /about__skills--primary\s*\{[^}]*font-weight:\s*500/s);
	assert.match(source, /about__skills--primary\s*\{[^}]*color:\s*var\(--color-text\)/s);
	assert.match(source, /about__skills--secondary\s*\{[^}]*color:\s*var\(--color-muted\)/s);
	assert.match(source, /about__skills--secondary\s*\{[^}]*font-size:\s*var\(--font-size-muted\)/s);
	assert.match(source, /about__skills\s*\{[^}]*display:\s*flex/s);
	assert.doesNotMatch(source, /about__skills[^{]*\{[^}]*border-radius:\s*999px/s);
	assert.doesNotMatch(source, /about__skills[^{]*\{[^}]*border:/s);

	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /tel:|github\.com/i);
});

test('About opens a paper-backed ACP preview dialog, not a CAIE image or 16:9 window', async () => {
	const source = await readFile(join(here, 'About.astro'), 'utf8');

	assert.match(source, /site\.acpCert/);
	assert.match(source, /site\.acpCert\.label/);
	assert.match(source, /withBase\(site\.acpCert\.src\)/);
	assert.match(source, /site\.acpCert\.src/);
	assert.match(source, /site\.acpCert\.alt/);
	assert.match(source, /<dialog/);
	assert.match(source, /showModal/);
	assert.match(source, /method=["']dialog["']/);
	assert.match(source, /target=["']_blank["']/);
	assert.match(source, /object-fit:\s*contain/);
	assert.match(source, /var\(--color-bg\)/);
	assert.doesNotMatch(source, /window__screen/);
	assert.doesNotMatch(source, /aspect-ratio:\s*16\s*\/\s*9/);
	assert.doesNotMatch(source, /caie|CAIE\.jpg|identity|身份证|429005/i);
});
