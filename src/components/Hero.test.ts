import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('Hero leads with identity, two real exits, and published evidence', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(source, /from\s+['"]\.\.\/data\/site['"]/);
	assert.match(source, /from\s+['"]\.\.\/data\/home['"]/);
	assert.match(source, /from\s+['"]\.\/SpeakingExhibit\.astro['"]/);
	assert.match(source, /id=["']home["']/);
	assert.match(source, /homeCopy\.heroKicker/);
	assert.doesNotMatch(source, /chapter__kicker[^>]*>\{site\.name\}/);
	assert.doesNotMatch(source, /headlinePath|headlineProof|hero__path|hero__proof/);
	assert.match(source, /site\.headlineRole/);
	assert.match(source, /site\.headlineSub/);
	assert.match(
		source,
		/<h1 class=["']hero__role misprint hero__beat hero__beat--title["'] data-text=\{site\.headlineRole\}>\{site\.headlineRole\}<\/h1>/,
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
	assert.match(source, /\.hero__role\s*\{[^}]*letter-spacing:\s*-0\.02em/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*font-size:\s*var\(--text-lead\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*line-height:\s*var\(--leading-lead\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*letter-spacing:\s*var\(--tracking-lead\)/s);
	assert.match(source, /\.hero__sub\s*\{[^}]*word-break:\s*keep-all/s);
	assert.doesNotMatch(source, /site\.statusLines/);
	assert.doesNotMatch(source, /site\.avatarSrc/);
	assert.doesNotMatch(source, /width=["']480["']\s+height=["']600["']/);
	assert.doesNotMatch(source, /site\.headlineEn/);
	assert.doesNotMatch(source, /work\.result/);
	assert.doesNotMatch(source, /work\.video/);
	assert.doesNotMatch(source, /works\.map/);
	assert.doesNotMatch(source, /work\.cover/);
	assert.doesNotMatch(source, /workImageSize/);
	assert.doesNotMatch(source, /homeCopy\.heroPreviews/);
	assert.doesNotMatch(source, /workCaseHref/);
	assert.doesNotMatch(source, /hero__pair/);
	assert.doesNotMatch(source, /hero__mark/);
	assert.doesNotMatch(source, /httpsaitalk\.win/);

	assert.match(
		source,
		/<a class=["']btn["'] href=\{homeCopy\.heroWorkHref\}>看作品<\/a>/,
	);
	assert.match(
		source,
		/<a class=["']btn-ghost["'] href=\{withBase\(site\.resumeHref\)\} download=\{site\.resumeDownloadName\}>\{site\.resumeLabel\}<\/a>/,
	);
	assert.match(source, /class=["']hero__actions["']/);
	assert.doesNotMatch(source, /\.hero__actions[^{]*\{[^}]*opacity:\s*0/s);
	assert.doesNotMatch(source, /\.hero__actions:hover/);
	assert.match(
		source,
		/口语陪练：约 <span class=["']num["']>300<\/span> 人次体验（含重复访问）<\/span>\s*<span>面试系统：教师招聘 <span class=["']num["']>50\+<\/span> 场（单一企业）/,
	);

	assert.match(source, /heroMarginNotes\(site\.judgments\)/);
	assert.match(source, /Annotation/);
	assert.match(source, /tag=\{note\.what\}/);
	assert.match(source, /text=\{note\.cost\}/);
	assert.match(source, /class=["']hero__notes["']/);
	assert.match(source, /<SpeakingExhibit\s*\/>/);
	assert.match(
		source,
		/@media\s*\(\s*min-width:\s*900px\s*\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*var\(--measure\)\)/,
	);
	assert.match(
		source,
		/@media\s*\(\s*min-width:\s*900px\s*\)[\s\S]*\.hero__exhibit\s*\{[^}]*grid-column:\s*2/s,
	);
	assert.doesNotMatch(source, /hero__intro/);
	assert.doesNotMatch(source, /grid-template-areas:\s*["']lede title["']/);
	assert.doesNotMatch(source, /factLabels|产品经验|授课经验|hero__fact-k/);
	assert.doesNotMatch(source, /rgba\(245,\s*244,\s*240,\s*0\.68\)/);
	assert.doesNotMatch(source, /#f2f1ed|#f3f1ea/);
	assert.doesNotMatch(source, /InkWash|#e9b37a/i);
	assert.doesNotMatch(source, /plaster|texture|canvas-filter|url\(/i);
	assert.doesNotMatch(source, /ChapterRule/);
	assert.doesNotMatch(source, /chapter__art/);

	assert.doesNotMatch(source, /<h1>\{site\.headline\}<\/h1>/);
	assert.match(source, /\.hero h1\s*\{/);
	assert.match(source, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(3\.25rem,\s*6\.5vw,\s*5\.25rem\)/s);
	assert.match(source, /\.hero h1\s*\{[^}]*max-width:\s*100%/s);
	assert.match(source, /\.hero h1\s*\{[^}]*line-height:\s*var\(--leading-display-1\)/s);
	assert.match(source, /\.hero h1\s*\{[^}]*letter-spacing:\s*-0\.02em/s);
	assert.doesNotMatch(source, /\.hero h1\s*\{[^}]*letter-spacing:\s*0\.04em/s);
	assert.doesNotMatch(source, /\.hero h1\s*\{[^}]*letter-spacing:\s*var\(--tracking-display-1\)/s);
	assert.doesNotMatch(source, /\.hero h1\s*\{[^}]*font-size:\s*var\(--text-display-1\)/s);
	assert.doesNotMatch(source, /\.hero h1\s*\{[^}]*position:\s*absolute/s);
	assert.doesNotMatch(source, /\.hero h1::after|\.hero__role::after/);
	assert.doesNotMatch(source, /clamp\(4rem,\s*18vw,\s*15rem\)/);
	assert.match(source, /\.hero h1\s*\{[^}]*text-align:\s*left/s);
	assert.match(source, /\.chapter__kicker\s*\{[^}]*letter-spacing:\s*0\.04em/s);
	assert.doesNotMatch(source, /letter-spacing:\s*0\.28em/);
	assert.match(source, /text-wrap:\s*balance/);
	assert.doesNotMatch(source, /letter-spacing:\s*-0\.03em/);
	assert.doesNotMatch(source, /\.hero h1\s*\{[^}]*text-align:\s*center/s);

	const order = [
		'homeCopy.heroKicker',
		'site.headlineRole',
		'site.headlineSub',
		'homeCopy.heroWorkHref',
		'site.resumeHref',
		'口语陪练：约',
		'<SpeakingExhibit',
		'heroMarginNotes',
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

test('wide Hero keeps the exhibit in the right column', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');
	const wide = source.match(/@media\s*\(\s*min-width:\s*1100px\s*\)\s*\{([\s\S]*?)\n\t\}/);
	assert.ok(wide, 'expected a wide-screen Hero block');
	const block = wide[1];

	assert.match(block, /\.hero\s*\{[^}]*padding-top:\s*4rem/s);
	assert.doesNotMatch(block, /aspect-ratio:\s*16\s*\/\s*9/);
	assert.doesNotMatch(source, /max-width:\s*40rem/);
	assert.doesNotMatch(source, /1101px/);
	assert.match(source, /@media\s*\(\s*max-width:\s*639px\s*\)[\s\S]*width:\s*min\(22rem,\s*100%\)/);
});

test('Hero entrance plays once from kicker to exhibit and stays under 800ms', async () => {
	const source = await readFile(join(here, 'Hero.astro'), 'utf8');

	assert.match(source, /@keyframes\s+hero-rise/);
	assert.match(source, /translateY\(12px\)/);
	assert.match(source, /animation:\s*hero-rise\s+var\(--dur-3\)\s+var\(--ease-out\)\s+backwards/);
	assert.match(source, /class=["']chapter__kicker hero__beat["']/);
	assert.match(source, /hero__beat--title/);
	assert.match(source, /hero__beat--arrive/);
	assert.match(source, /hero__beat--exhibit/);
	assert.match(source, /\.hero__beat--title\s*\{[^}]*animation-delay:\s*120ms/s);
	assert.match(source, /\.hero__beat--title\s*\{[^}]*animation-timing-function:\s*var\(--ease-quart\)/s);
	assert.match(source, /\.hero__beat--arrive\s*\{[^}]*animation-delay:\s*300ms/s);
	assert.match(source, /\.hero__beat--exhibit\s*\{[^}]*animation-delay:\s*400ms/s);
	assert.match(source, /prefers-reduced-motion:\s*no-preference/);
	assert.match(source, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)[\s\S]*\.hero__beat\s*\{[^}]*animation:\s*none/s);
	assert.match(source, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)[\s\S]*opacity:\s*1/);
	assert.doesNotMatch(source, /animation-iteration-count:\s*infinite/);
	assert.doesNotMatch(source, /animation:[^;\n]*infinite/);
	assert.doesNotMatch(source, /hero-window-in/);

	const delays = [...source.matchAll(/animation-delay:\s*(\d+)ms/g)].map((match) => Number(match[1]));
	assert.deepEqual(delays, [120, 300, 400]);
	assert.ok(Math.max(...delays) + 380 <= 800, 'entrance must finish within 800ms');
});
