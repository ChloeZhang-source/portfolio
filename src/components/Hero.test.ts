import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Hero is a short identity plus a diagonal index of both works', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.match(source, /from\s+['"]\.\.\/lib\/work['"]/);
	assert.match(source, /id=["']home["']/);
	assert.match(source, /homeCopy\.heroKicker/);
	assert.doesNotMatch(source, /chapter__kicker[^>]*>\{site\.name\}/);
	assert.doesNotMatch(source, /headlinePath|headlineProof|hero__path|hero__proof/);
	assert.match(source, /site\.headlineRole/);
	assert.match(source, /site\.headlineSub/);
	assert.match(
		source,
		/<h1 class=["']hero__role misprint["'] data-text=\{site\.headlineRole\}>\{site\.headlineRole\}<\/h1>/,
	);
	assert.match(source, /class=["']hero__sub["']/);
	assert.match(source, /site\.headlineSub\.indexOf\(['"]AI['"]\)/);
	assert.match(source, /<span class=["']lat["']>AI<\/span>/);
	assert.match(source, /homeCopy\.heroKicker\.split/);
	assert.match(source, /<span class=["']num["']>/);
	{
		const h1 = source.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/);
		assert.ok(h1, 'expected a single Hero h1');
		assert.match(h1[1], /site\.headlineRole/);
		assert.doesNotMatch(h1[1], /headlineSub|headlinePath|headlineProof/);
	}
	assert.match(source, /\.hero__role\s*\{[^}]*font-family:\s*var\(--font-serif\)/s);
	assert.match(source, /\.hero__role\s*\{[^}]*letter-spacing:\s*var\(--tracking-display-1\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*font-size:\s*var\(--text-lead\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*line-height:\s*var\(--leading-lead\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*letter-spacing:\s*var\(--tracking-lead\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*word-break:\s*keep-all/s);
	assert.doesNotMatch(source, /site\.statusLines/);
	assert.doesNotMatch(source, /site\.avatarSrc/);
	assert.doesNotMatch(source, /width=["']480["']\s+height=["']600["']/);
	assert.doesNotMatch(source, /exhibit/);
	assert.doesNotMatch(source, /site\.facts/);
	assert.doesNotMatch(source, /hero__facts/);
	assert.doesNotMatch(source, /heroWorkHref|heroWorkLabel/);
	assert.doesNotMatch(source, /heroContact/);
	assert.doesNotMatch(source, /site\.resumeHref/);
	assert.doesNotMatch(source, /site\.headlineEn/);
	assert.doesNotMatch(source, /work\.result/);
	assert.doesNotMatch(source, /work\.video/);
	assert.doesNotMatch(source, /class=["']btn["']/);
	assert.match(source, /works\.map/);
	assert.match(source, /withBase\(work\.cover\)/);
	assert.match(source, /work\.cover/);
	assert.match(source, /workImageSize/);
	assert.match(source, /decoding=["']async["']/);
	assert.doesNotMatch(source, /loading=["']lazy["']/);
	assert.match(source, /work\.title/);
	assert.match(source, /homeCopy\.heroPreviews/);
	assert.doesNotMatch(source, /work\.tagline/);
	assert.match(source, /workCaseHref\(work\.slug\)/);
	assert.match(source, /caption=\{work\.title\}/);
	assert.match(source, /window/);
	assert.doesNotMatch(source, /window--portrait/);
	assert.match(source, /WindowBar/);
	assert.doesNotMatch(source, /caption=["']首页["']/);
	assert.doesNotMatch(source, /ChapterRule/);
	assert.doesNotMatch(source, /chapter__art/);
	assert.match(source, /heroMarginNotes\(site\.judgments\)/);
	assert.match(source, /Annotation/);
	assert.match(source, /tag=\{note\.what\}/);
	assert.match(source, /text=\{note\.cost\}/);
	assert.match(source, /class=["']hero__notes["']/);
	assert.match(
		source,
		/@media\s*\(\s*min-width:\s*900px\s*\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*var\(--measure\)\)/,
	);
	assert.match(source, /hero__board/);
	assert.match(source, /hero__pair--start/);
	assert.match(source, /hero__pair--end/);
	assert.doesNotMatch(source, /hero__intro/);
	assert.doesNotMatch(source, /grid-template-areas:\s*["']lede title["']/);
	assert.doesNotMatch(source, /factLabels|产品经验|授课经验|hero__fact-k/);
	assert.doesNotMatch(source, /rgba\(245,\s*244,\s*240,\s*0\.68\)/);
	assert.doesNotMatch(source, /#f2f1ed|#f3f1ea/);
	assert.doesNotMatch(source, /InkWash|#e9b37a/i);
	assert.doesNotMatch(source, /plaster|texture|canvas-filter|url\(/i);

	assert.doesNotMatch(source, /<h1>\{site\.headline\}<\/h1>/);
	assert.match(source, /\.hero h1\s*\{/);
	assert.match(source, /\.hero h1\s*\{[^}]*font-size:\s*var\(--text-display-1\)/s);
	assert.match(source, /\.hero h1\s*\{[^}]*line-height:\s*var\(--leading-display-1\)/s);
	assert.match(source, /\.hero h1\s*\{[^}]*letter-spacing:\s*var\(--tracking-display-1\)/s);
	assert.doesNotMatch(source, /\.hero h1\s*\{[^}]*letter-spacing:\s*0\.04em/s);
	assert.match(source, /\.hero h1\s*\{[^}]*text-align:\s*left/s);
	assert.match(source, /\.chapter__kicker\s*\{[^}]*letter-spacing:\s*0\.04em/s);
	assert.doesNotMatch(source, /letter-spacing:\s*0\.28em/);
	assert.match(source, /text-wrap:\s*balance/);
	assert.doesNotMatch(source, /letter-spacing:\s*-0\.03em/);
	assert.doesNotMatch(source, /\.hero h1\s*\{[^}]*text-align:\s*center/s);

	assert.match(source, /<a class=["']window["']/);
	assert.match(source, /index === 0 \? ['"]hero__pair hero__pair--start['"] : ['"]hero__pair hero__pair--end['"]/);

	const order = [
		'homeCopy.heroKicker',
		'site.headlineRole',
		'site.headlineSub',
		'workCaseHref',
		'work.cover',
		'homeCopy.heroPreviews',
	];
	let cursor = -1;
	for (const token of order) {
		const at = source.indexOf(token, cursor + 1);
		assert.ok(at > cursor, `expected ${token} after previous hero field`);
		cursor = at;
	}

	assert.doesNotMatch(source, /hello@example\.com/);
	assert.doesNotMatch(source, /open to any AI role/i);
	assert.doesNotMatch(source, /tel:|github\.com/i);
});

test('Hero title misprints in amber and the screen carries a vertical running head', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(source, /class=["']running-head["'][^>]*aria-hidden=["']true["']/);
	assert.match(source, /作品集 · \{site\.name\}/);
	assert.match(source, /\.hero\s*\{[^}]*position:\s*relative/s);
	assert.doesNotMatch(source, /\.running-head\s*\{[^}]*font-style:\s*italic/s);
	assert.doesNotMatch(source, /\.running-head\s*\{[^}]*box-shadow/s);
	assert.doesNotMatch(source, /_serif500\.ttf/);
});

test('Hero work titles link to the same case and pick up window hover', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(
		source,
		/<a class=["']hero__work-title["'] href=\{workCaseHref\(work\.slug\)\}>\{work\.title\} →<\/a>/,
	);
	assert.match(
		source,
		/\.hero__pair:has\(\.window:hover\) \.hero__work-title,\s*\n\s*\.hero__pair:has\(\.window:focus-visible\) \.hero__work-title\s*\{[^}]*color:\s*var\(--color-accent\)/s,
	);
	assert.doesNotMatch(source, /\.hero__work-title[^{]*\{[^}]*animation:/s);
	assert.doesNotMatch(source, /@keyframes\s+hero-title/);
});

test('wide Hero pulls the second window screen at least a quarter into a 900px viewport', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');
	const wide = source.match(/@media\s*\(\s*min-width:\s*1100px\s*\)\s*\{([\s\S]*?)\n\t\}/);
	assert.ok(wide, 'expected a wide-screen Hero block');
	const block = wide[1];

	assert.match(block, /\.hero\s*\{[^}]*padding-top:\s*4rem/s);
	assert.match(block, /\.hero__sub\s*\{[^}]*margin-bottom:\s*1\.25rem/s);
	assert.match(block, /\.hero \.window__screen\s*\{[^}]*max-height:\s*16rem/s);
	assert.doesNotMatch(block, /aspect-ratio:\s*16\s*\/\s*9/);
});

test('Hero windows enter once with a short stagger, then rest', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(source, /@keyframes\s+hero-window-in/);
	assert.match(source, /translateY\(12px\)/);
	assert.match(source, /animation:\s*hero-window-in\s+380ms\s+ease-out\s+backwards/);
	assert.match(source, /\.hero__pair--end\s+\.window\s*\{[^}]*animation-delay:\s*90ms/s);
	assert.match(source, /prefers-reduced-motion:\s*no-preference/);
	assert.doesNotMatch(source, /animation-iteration-count:\s*infinite/);
	assert.doesNotMatch(source, /animation:[^;\n]*infinite/);
});

test('Hero opposite cells hold static 01/02 marks, not looping ornaments', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(source, /class=["']hero__mark["'][^>]*aria-hidden=["']true["']/);
	assert.match(source, /hero__mark-folio/);
	assert.match(source, /hero__mark-rule/);
	assert.match(source, /hero__mark-dot/);
	assert.match(source, /padStart\(\s*2,\s*['"]0['"]\s*\)/);
	assert.match(source, /font-family:\s*var\(--font-mono\)/);
	assert.match(source, /var\(--color-rule\)/);
	assert.match(source, /var\(--color-amber-ink\)/);
	assert.doesNotMatch(source, /\.hero__mark-dot\s*\{[^}]*background:\s*var\(--color-amber\)\s*;/s);
	assert.match(source, /\.hero__mark\s*\{[^}]*pointer-events:\s*none/s);
	assert.match(source, /@media\s*\(\s*max-width:\s*899px\s*\)[\s\S]*grid-template-columns:\s*1fr/);
	assert.match(source, /@media\s*\(\s*max-width:\s*899px\s*\)[\s\S]*\.hero__pair \.window\s*\{[^}]*width:\s*100%/);
	assert.match(source, /@media\s*\(\s*max-width:\s*899px\s*\)[\s\S]*\.hero__mark\s*\{[^}]*display:\s*none/);
	assert.match(source, /@media\s*\(\s*max-width:\s*639px\s*\)[\s\S]*width:\s*min\(22rem,\s*100%\)/);
	assert.doesNotMatch(source, /max-width:\s*40rem/);
	assert.doesNotMatch(source, /1101px/);
	assert.doesNotMatch(source, /\.hero__mark[^{]*\{[^}]*animation:/s);
	assert.doesNotMatch(source, /lottie|particle|feTurbulence/i);
});
