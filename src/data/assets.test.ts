import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, '../../public');

function parseFrontmatter(raw: string): Record<string, unknown> {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	assert.ok(match, 'MDX must start with YAML frontmatter');
	return load(match[1]) as Record<string, unknown>;
}

function toPublicFile(href: string): string {
	assert.ok(href.startsWith('/'), `public href must be root-relative: ${href}`);
	return join(publicDir, href.slice(1));
}

async function assertPublicFile(href: string) {
	const file = toPublicFile(href);
	const info = await stat(file);
	assert.ok(info.isFile(), `${href} must be a file`);
	assert.ok(info.size > 0, `${href} must not be empty`);
}

test('resume download name is {name}-AI教育产品经理.pdf', async () => {
	const { site } = await import('./site.ts');

	assert.equal(site.resumeHref, '/resume.pdf');
	assert.equal(site.resumeDownloadName, `${site.name}-AI教育产品经理.pdf`);
});

test('heading font subset exists in public/fonts/', async () => {
	await assertPublicFile('/fonts/noto-serif-sc-title.woff2');

	const font = await readFile(toPublicFile('/fonts/noto-serif-sc-title.woff2'));
	assert.equal(font.subarray(0, 4).toString('ascii'), 'wOF2');
	assert.ok(font.byteLength < 80_000, 'title subset should stay small');
});

test('site contact media files exist in public/', async () => {
	const { site } = await import('./site.ts');

	await assertPublicFile(site.resumeHref);
	await assertPublicFile(site.wechatQrSrc);
	await assertPublicFile(site.avatarSrc);

	const resume = await readFile(toPublicFile(site.resumeHref));
	assert.equal(resume.subarray(0, 5).toString('ascii'), '%PDF-');
});

test('ACP certificate preview is a trimmed jpeg in public/certs/', async () => {
	const { site } = await import('./site.ts');

	await assertPublicFile(site.acpCert.src);

	const image = await readFile(toPublicFile(site.acpCert.src));
	assert.equal(image.subarray(0, 3).toString('hex'), 'ffd8ff');
	assert.ok(image.byteLength > 40_000, 'certificate preview should remain readable');
	assert.ok(image.byteLength < 1_200_000, 'certificate preview should stay web-sized');
});

test('speaking cover and gallery are product screenshots, not labeled stills', async () => {
	const hrefs = [
		'/work/speaking/cover.jpg',
		'/work/speaking/gallery-1.jpg',
		'/work/speaking/gallery-2.jpg',
		'/work/speaking/gallery-3.jpg',
	];

	for (const href of hrefs) {
		const file = await readFile(toPublicFile(href));
		assert.equal(file.subarray(0, 3).toString('hex'), 'ffd8ff', `${href} must be jpeg`);
		assert.ok(file.byteLength > 50_000, `${href} should be larger than a label card`);
	}
});

test('interview cover and gallery are product screenshots, not labeled stills', async () => {
	const hrefs = [
		'/work/interview/cover.jpg',
		'/work/interview/gallery-1.jpg',
		'/work/interview/gallery-2.jpg',
		'/work/interview/gallery-3.jpg',
	];

	for (const href of hrefs) {
		const file = await readFile(toPublicFile(href));
		assert.equal(file.subarray(0, 3).toString('hex'), 'ffd8ff', `${href} must be jpeg`);
		assert.ok(file.byteLength > 50_000, `${href} should be larger than a label card`);
	}
});

test('work cover, gallery, and optional video files exist in public/', async () => {
	const { worksSchema } = await import('../content/works-schema.ts');
	const slugs = ['speaking', 'interview'] as const;

	for (const slug of slugs) {
		const raw = await readFile(join(here, `../content/works/${slug}.mdx`), 'utf8');
		const work = worksSchema.parse(parseFrontmatter(raw));
		const hrefs = [work.cover, ...work.gallery.map((item) => item.image), work.video].filter(
			(href): href is string => typeof href === 'string' && href.length > 0,
		);

		assert.ok(hrefs.length >= 3, `${slug} must ship cover plus gallery`);
		for (const href of hrefs) {
			await assertPublicFile(href);
		}
	}
});
