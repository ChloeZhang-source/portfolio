import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('global.css defines getdesign-preview paper tokens and shared utilities', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /--color-bg:\s*#f4f3ef/);
	assert.match(css, /--color-surface:\s*#ffffff/);
	assert.match(css, /--color-text:\s*#1c1c1c/);
	assert.match(css, /--color-muted:/);
	assert.match(css, /--color-amber:\s*#c29857/);
	assert.match(css, /--color-amber-ink:\s*#a87c3f/);
	assert.match(css, /--color-accent:\s*var\(--color-amber-ink\)/);
	assert.match(css, /--color-rule:\s*rgba\(27,\s*26,\s*23,\s*\.18\)/);
	assert.match(css, /--color-node:\s*rgba\(27,\s*26,\s*23,\s*\.22\)/);
	assert.match(css, /--chapter-rule-width:\s*clamp\(12rem,\s*42vw,\s*15\.5rem\)/);
	assert.match(css, /--color-border:\s*rgba\(27,\s*26,\s*23,\s*\.11\)/);
	assert.match(css, /--color-window-bar:\s*#e6e2d9/i);
	assert.match(css, /--text-thesis:\s*1\.8rem/);
	assert.match(css, /--text-section:\s*1\.8rem/);
	assert.match(css, /--radius:\s*18px/);
	assert.match(css, /--shadow:\s*0\s+24px\s+60px/);
	assert.match(css, /--window-max:\s*52rem/);
	assert.match(css, /--page-max:\s*72rem/);
	assert.match(css, /--rail-width:\s*4\.25rem/);
	assert.match(css, /--spine-gap:\s*1\.25rem/);
	assert.match(css, /--page-pad:\s*1\.25rem/);
	assert.match(css, /--page-pad-wide:\s*calc\(\s*var\(--rail-width\)\s*\+\s*var\(--spine-gap\)\s*\)/);
	assert.doesNotMatch(css, /--color-window-screen/);
	assert.match(css, /--font-sans:/);
	assert.match(css, /--font-serif:/);
	assert.match(css, /--font-mono:/);
	assert.match(css, /--font-size-muted:/);
	assert.match(css, /ui-sans-serif,\s*system-ui,\s*sans-serif/);
	assert.match(css, /Noto Serif SC/);
	assert.match(css, /ui-monospace,\s*monospace/);
	assert.match(css, /h1,\s*\n\s*h2\s*\{[^}]*font-family:\s*var\(--font-serif\)/s);

	assert.doesNotMatch(css, /--color-bg:\s*#0b0f14/);
	assert.doesNotMatch(css, /--color-accent:\s*#f5b942/);
	assert.doesNotMatch(css, /--color-accent:\s*#4a667a\b/i);
	assert.doesNotMatch(css, /--color-accent:\s*#1c1c1c/);
	assert.doesNotMatch(css, /@import|fonts\.google|@font-face/);
	assert.doesNotMatch(css, /particle|parallax/i);

	assert.match(css, /\.btn\b/);
	assert.match(css, /\.result-number\b/);
	assert.match(css, /\.nav-current\b/);
	assert.match(css, /\.muted\b/);
	assert.match(css, /\.chapter\b/);
	assert.match(css, /\.chapter__art\s*\{[^}]*align-self:\s*center/s);
	assert.match(css, /\.chapter__art\s*\{[^}]*width:\s*var\(--chapter-rule-width\)/s);
	assert.match(css, /\.chapter__art\s*\{[^}]*margin:\s*0\s+auto\s+1\.75rem/s);
	assert.match(css, /\.chapter\s*\{[^}]*align-items:\s*flex-start/s);
	assert.match(css, /\.chapter\s*\{[^}]*text-align:\s*left/s);
	assert.doesNotMatch(css, /\.chapter\s*\{[^}]*align-items:\s*center/s);
	assert.doesNotMatch(css, /\.chapter\s*\{[^}]*text-align:\s*center/s);
	assert.match(css, /\.chapter h1,\s*\n\s*\.chapter h2\s*\{[^}]*font-size:\s*var\(--text-section\)/s);
	assert.match(css, /\.chapter__thesis\s*\{[^}]*font-size:\s*var\(--text-thesis\)/s);
	assert.match(css, /\.chapter__thesis\s*\{[^}]*border-left:\s*2px\s+solid\s+var\(--color-amber-ink\)/s);
	assert.match(css, /\.chapter__lede\s*\{[^}]*margin:\s*0\s+0\s+2\.25rem/s);
	assert.doesNotMatch(css, /\.chapter__lede\s*\{[^}]*margin:\s*0\s+auto/s);
	assert.doesNotMatch(css, /\.ink-wash\b/);
	assert.match(css, /\.window\b/);

	assert.match(css, /color-scheme:\s*light/);
	assert.match(css, /body\s*\{[^}]*color:\s*var\(--color-text\)/s);
	assert.match(css, /body\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
	assert.match(css, /\.chapter h1,\s*\n\s*\.chapter h2\s*\{[^}]*letter-spacing:\s*0\.02em/s);
	assert.doesNotMatch(css, /letter-spacing:\s*-0\.03em/);
});

test('window chrome is a floating exhibit: 18px radius, soft shadow, gray lights', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /\.window__bar\s*\{[^}]*background:\s*var\(--color-window-bar\)/s);
	assert.match(css, /\.window__bar\s*\{[^}]*font-family:\s*var\(--font-mono\)/s);
	assert.match(css, /\.window__bar\s*\{[^}]*color:\s*var\(--color-muted\)/s);
	assert.doesNotMatch(css, /\.window__bar\s*\{[^}]*color:\s*#8a857a/s);
	assert.match(css, /\.window__bar\s*\{[^}]*gap:/s);
	assert.match(css, /\.nav-current::after\s*\{[^}]*height:\s*2px/s);
	assert.match(css, /\.nav-current::after\s*\{[^}]*background:\s*var\(--color-amber-ink\)/s);
	assert.match(css, /\.window__screen\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
	assert.doesNotMatch(css, /window--portrait/);
	assert.match(css, /\.window__screen img,\s*\.window__screen video\s*\{[^}]*height:\s*100%/s);
	assert.match(css, /\.window__screen img,\s*\.window__screen video\s*\{[^}]*object-fit:\s*cover/s);
	assert.doesNotMatch(
		css,
		/\.window__screen img,\s*\.window__screen video\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s,
	);
	assert.doesNotMatch(css, /#131110|#2a251e/);
	assert.match(css, /\.window__bar i\b/);
	assert.match(css, /\.window__bar i\s*\{[^}]*width:\s*8px/s);
	assert.match(css, /\.window__bar i\s*\{[^}]*height:\s*8px/s);
	assert.match(css, /\.window__bar i\s*\{[^}]*border-radius:\s*50%/s);
	assert.doesNotMatch(css, /\.window__screen\s*\{[^}]*background:\s*var\(--color-window-screen\)/s);
	assert.match(css, /--shadow:\s*0\s+24px\s+60px/);
	assert.match(css, /--radius:\s*18px/);
	assert.match(css, /\.window\s*\{[^}]*transition:[^}]*box-shadow/s);
	assert.match(css, /\.window\s*\{[^}]*transition:[^}]*transform/s);
	assert.match(css, /\.window:hover,\s*\n\s*\.window:focus-visible\s*\{[^}]*translateY\(-2px\)/s);
	assert.doesNotMatch(css, /window--portrait/);
	assert.match(css, /prefers-reduced-motion:\s*no-preference/);
	assert.match(css, /prefers-reduced-motion:\s*reduce/);
	assert.doesNotMatch(css, /#ff5f57|#febc2e|#28c840|#ff5f56|#27c93f/i);
});

test('main is the positioning context for the chapter spine', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /body\s*>\s*main\s*\{[^}]*position:\s*relative/s);
});

test('wide viewports keep chapter text inside the spine with shared page tokens', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(
		css,
		/body\s*>\s*header\s*>\s*\*,\s*\n\s*body\s*>\s*main\s*>\s*\*,\s*\n\s*body\s*>\s*footer\s*>\s*\*\s*\{[^}]*max-width:\s*var\(--page-max\)/s,
	);
	assert.match(css, /\.chapter\s*\{[^}]*padding:\s*6rem\s+var\(--page-pad\)\s+4\.5rem/s);
	assert.match(
		css,
		/@media\s*\(\s*min-width:\s*1101px\s*\)\s*\{[^}]*\.chapter\s*\{[^}]*padding-inline:\s*var\(--page-pad-wide\)/s,
	);
	assert.doesNotMatch(css, /max-width:\s*72rem/);
});

test('html uses the paper background so an empty layout still fills the viewport', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /html[^{]*\{[^}]*background:\s*var\(--color-bg\)/s);
});
