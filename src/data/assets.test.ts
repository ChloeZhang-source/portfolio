import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
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

function pngSize(buf: Buffer) {
	assert.equal(buf.subarray(1, 4).toString('ascii'), 'PNG');
	return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf: Buffer) {
	assert.equal(buf.subarray(0, 3).toString('hex'), 'ffd8ff');
	let i = 2;
	while (i + 9 < buf.length) {
		if (buf[i] !== 0xff) break;
		while (i < buf.length && buf[i] === 0xff) i += 1;
		if (i >= buf.length) break;
		const marker = buf[i];
		if (marker === 0xda || marker === 0xd9) break;
		if (marker >= 0xd0 && marker <= 0xd7) {
			i += 1;
			continue;
		}
		const len = buf.readUInt16BE(i + 1);
		if ((marker >= 0xc0 && marker <= 0xc3) || marker === 0xc9) {
			return { width: buf.readUInt16BE(i + 6), height: buf.readUInt16BE(i + 4) };
		}
		i += 1 + len;
	}
	throw new Error('JPEG SOF not found');
}

function sha256(buf: Buffer) {
	return createHash('sha256').update(buf).digest('hex');
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

test('WeChat QR is exported at display size, not a full-resolution scan', async () => {
	const { site } = await import('./site.ts');
	const image = await readFile(toPublicFile(site.wechatQrSrc));
	const { width, height } = pngSize(image);

	assert.ok(width >= 120 && width <= 240, `QR width should be 120–240px, got ${width}`);
	assert.ok(height >= 120 && height <= 240, `QR height should be 120–240px, got ${height}`);
	assert.ok(image.byteLength < 80_000, 'QR should stay well under the original 228KB scan');
});

test('js-yaml is declared as a test devDependency', async () => {
	const pkg = JSON.parse(await readFile(join(here, '../../package.json'), 'utf8')) as {
		devDependencies?: Record<string, string>;
	};

	assert.equal(typeof pkg.devDependencies?.['js-yaml'], 'string');
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

test('work screenshots are capped near 1600px wide', async () => {
	const hrefs = [
		'/work/speaking/cover.jpg',
		'/work/speaking/gallery-1.jpg',
		'/work/speaking/gallery-2.jpg',
		'/work/speaking/gallery-3.jpg',
		'/work/interview/cover.jpg',
		'/work/interview/gallery-1.jpg',
		'/work/interview/gallery-2.jpg',
		'/work/interview/gallery-3.jpg',
	];

	for (const href of hrefs) {
		const file = await readFile(toPublicFile(href));
		const { width } = jpegSize(file);
		assert.ok(width <= 1600, `${href} width should be ≤1600, got ${width}`);
		assert.ok(file.byteLength < 600_000, `${href} should stay web-sized`);
	}
});

test('interview cover is not the same file as gallery-1', async () => {
	const cover = await readFile(toPublicFile('/work/interview/cover.jpg'));
	const gallery1 = await readFile(toPublicFile('/work/interview/gallery-1.jpg'));

	assert.notEqual(sha256(cover), sha256(gallery1));
});
