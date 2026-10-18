import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

test('global.css defines getdesign-preview paper tokens and shared utilities', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /--c-paper:\s*#f4f3ef/);
	assert.match(css, /--c-surface:\s*#ffffff/);
	assert.match(css, /--c-ink:\s*#1c1c1c/);
	assert.match(css, /--c-body:\s*#3f3d39/);
	assert.match(css, /--c-muted:\s*#6f6c66/);
	assert.match(css, /--c-hairline:\s*#e4e1d8/);
	assert.match(css, /--c-exhibit-bg:\s*#17171c/);
	assert.match(css, /--c-exhibit-ink:\s*#e8e6e0/);
	assert.match(css, /--c-amber:\s*#c29857/);
	assert.match(css, /--c-amber-ink:\s*#a87c3f/);
	assert.match(css, /--c-amber-text:\s*#8a6432/);
	assert.match(css, /--c-accent:\s*var\(--c-amber-text\)/);
	assert.doesNotMatch(css, /--c-accent:\s*var\(--c-amber-ink\)/);
	assert.match(css, /--color-bg:\s*var\(--c-paper\)/);
	assert.match(css, /--color-surface:\s*var\(--c-surface\)/);
	assert.match(css, /--color-text:\s*var\(--c-ink\)/);
	assert.match(css, /--color-body:\s*var\(--c-body\)/);
	assert.match(css, /--color-muted:\s*var\(--c-muted\)/);
	assert.match(css, /--color-amber:\s*var\(--c-amber\)/);
	assert.match(css, /--color-amber-ink:\s*var\(--c-amber-ink\)/);
	assert.match(css, /--color-accent:\s*var\(--c-accent\)/);
	assert.match(css, /--c-rule:\s*rgba\(27,\s*26,\s*23,\s*\.18\)/);
	assert.match(css, /--color-rule:\s*var\(--c-rule\)/);
	assert.match(css, /--color-node:\s*rgba\(27,\s*26,\s*23,\s*\.22\)/);
	assert.match(css, /--chapter-rule-width:\s*clamp\(12rem,\s*42vw,\s*15\.5rem\)/);
	assert.match(css, /--color-border:\s*rgba\(27,\s*26,\s*23,\s*\.11\)/);
	assert.match(css, /--c-window-bar:\s*#e6e2d9/i);
	assert.match(css, /--color-window-bar:\s*var\(--c-window-bar\)/);
	assert.match(css, /--text-display-1:\s*clamp\(2\.6rem,\s*5\.2vw,\s*3\.5rem\)/);
	assert.match(css, /--leading-display-1:\s*1\.14/);
	assert.match(css, /--tracking-display-1:\s*-0\.01em/);
	assert.match(css, /--text-display-2:\s*2\.125rem/);
	assert.match(css, /--leading-display-2:\s*1\.3/);
	assert.match(css, /--text-title:\s*1\.75rem/);
	assert.match(css, /--leading-title:\s*1\.55/);
	assert.match(css, /--text-lead:\s*1\.1875rem/);
	assert.match(css, /--leading-lead:\s*1\.7/);
	assert.match(css, /--text-body:\s*1\.0625rem/);
	assert.match(css, /--leading-body:\s*1\.75/);
	assert.match(css, /--text-small:\s*0\.875rem/);
	assert.match(css, /--tracking-small:\s*0\.02em/);
	assert.match(css, /--text-caption:\s*0\.75rem/);
	assert.match(css, /--tracking-caption:\s*0\.06em/);
	assert.match(css, /--text-micro:\s*0\.6875rem/);
	assert.match(css, /--tracking-micro:\s*0\.12em/);
	assert.match(css, /--text-hero:\s*var\(--text-display-1\)/);
	assert.match(css, /--text-thesis:\s*var\(--text-title\)/);
	assert.match(css, /--text-section:\s*var\(--text-display-2\)/);
	assert.match(css, /--dur-1:\s*120ms/);
	assert.match(css, /--dur-2:\s*220ms/);
	assert.match(css, /--dur-3:\s*380ms/);
	assert.match(css, /--dur-4:\s*720ms/);
	assert.match(css, /--ease-out:\s*cubic-bezier\(\.2,\s*\.7,\s*\.2,\s*1\)/);
	assert.match(css, /--ease-in-out:\s*cubic-bezier\(\.4,\s*0,\s*\.2,\s*1\)/);
	assert.match(css, /--ease-pen:\s*cubic-bezier\(\.2,\s*\.85,\s*\.15,\s*1\)/);
	assert.match(css, /--ease-quart:\s*cubic-bezier\(\.77,\s*0,\s*\.175,\s*1\)/);
	assert.match(css, /--r-xs:\s*4px/);
	assert.match(css, /--r-sm:\s*8px/);
	assert.match(css, /--r-md:\s*18px/);
	assert.match(css, /--r-pill:\s*999px/);
	assert.match(css, /--radius:\s*var\(--r-md\)/);
	assert.match(css, /--shadow-exhibit:\s*0\s+24px\s+60px/);
	assert.match(css, /--shadow-exhibit-hover:\s*0\s+28px\s+68px/);
	assert.match(css, /--shadow:\s*var\(--shadow-exhibit\)/);
	assert.match(css, /--z-content:\s*0/);
	assert.match(css, /--z-header:\s*1/);
	assert.match(css, /--z-rail:\s*2/);
	assert.match(css, /--z-grain:\s*3/);
	assert.match(css, /--z-skip:\s*4/);
	assert.match(css, /--measure:\s*36rem/);
	assert.match(css, /--measure-note:\s*24rem/);
	assert.match(css, /--measure-exhibit:\s*52rem/);
	assert.match(css, /--label-col:\s*6rem/);
	assert.match(css, /--window-max:\s*var\(--measure-exhibit\)/);
	assert.match(css, /--space-section:\s*96px/);
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
	assert.match(css, /\.chapter h1,\s*\n\s*\.chapter h2\s*\{[^}]*font-size:\s*var\(--text-display-2\)/s);
	assert.match(css, /\.chapter__thesis\s*\{[^}]*font-size:\s*var\(--text-title\)/s);
	assert.match(css, /\.chapter__thesis\s*\{[^}]*border-left:\s*2px\s+solid\s+var\(--color-amber-ink\)/s);
	assert.match(css, /\.chapter__lede\s*\{[^}]*margin:\s*0\s+0\s+2\.25rem/s);
	assert.doesNotMatch(css, /\.chapter__lede\s*\{[^}]*margin:\s*0\s+auto/s);
	assert.doesNotMatch(css, /\.ink-wash\b/);
	assert.match(css, /\.window\b/);

	assert.match(css, /color-scheme:\s*light/);
	assert.match(css, /body\s*\{[^}]*background:\s*var\(--color-bg\)/s);
	assert.match(css, /body\s*\{[^}]*color:\s*var\(--color-text\)/s);
	assert.match(css, /body\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
	assert.match(css, /body\s*\{[^}]*font-size:\s*var\(--text-body\)/s);
	assert.match(css, /body\s*\{[^}]*line-height:\s*var\(--leading-body\)/s);
	assert.doesNotMatch(css, /radial-gradient/);
	assert.match(css, /\.chapter__kicker\s*\{[^}]*letter-spacing:\s*0\.04em/s);
	assert.doesNotMatch(css, /\.chapter__kicker\s*\{[^}]*letter-spacing:\s*0\.08em/s);
	assert.match(css, /\.chapter h1,\s*\n\s*\.chapter h2\s*\{[^}]*letter-spacing:\s*var\(--tracking-display-2\)/s);
	assert.match(css, /\.chapter h1,\s*\n\s*\.chapter h2\s*\{[^}]*line-height:\s*var\(--leading-display-2\)/s);
	assert.match(css, /\.btn\s*\{[^}]*min-height:\s*44px/s);
	assert.match(css, /\.btn\s*\{[^}]*border-radius:\s*var\(--r-pill\)/s);
	assert.match(css, /\.btn:hover\s*\{[^}]*background:\s*#3f3d39/s);
	assert.match(css, /\.btn:active\s*\{[^}]*translateY\(1px\)/s);
	assert.match(css, /\.btn\s*\{[^}]*var\(--dur-1\)/s);
	assert.match(css, /\.btn-ghost\b/);
	assert.match(css, /\.btn-ghost\s*\{[^}]*min-height:\s*44px/s);
	assert.match(css, /\.btn-ghost\s*\{[^}]*border-radius:\s*var\(--r-pill\)/s);
	assert.match(css, /\.btn-ghost:hover\s*\{[^}]*border-color:\s*var\(--c-ink\)/s);
	assert.match(
		css,
		/\.btn:disabled,\s*\n\s*\.btn\[aria-disabled="true"\],\s*\n\s*\.btn-ghost:disabled,\s*\n\s*\.btn-ghost\[aria-disabled="true"\]\s*\{[^}]*background:\s*#e4e1d8;[^}]*color:\s*#6f6c66;[^}]*cursor:\s*not-allowed;[^}]*transform:\s*none/s,
	);
	assert.match(css, /code\s*\{[^}]*border-radius:\s*var\(--r-xs\)/s);
	assert.match(css, /:focus-visible\s*\{[^}]*outline:\s*2px\s+solid\s+var\(--c-amber-ink\)/s);
	assert.match(css, /:focus-visible\s*\{[^}]*outline-offset:\s*2px/s);
	assert.match(css, /\.nav-current::after\s*\{[^}]*background:\s*var\(--color-amber-ink\)/s);
	assert.doesNotMatch(css, /\.nav-current\s*\{[^}]*box-shadow/s);
	assert.doesNotMatch(css, /letter-spacing:\s*-0\.03em/);
});

test('window chrome is a floating exhibit: 18px radius, soft shadow, gray lights', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /\.window__bar\s*\{[^}]*background:\s*var\(--color-window-bar\)/s);
	assert.match(css, /\.window__bar\s*\{[^}]*font-family:\s*var\(--font-mono\)/s);
	assert.match(css, /\.window__bar\s*\{[^}]*color:\s*#5c5954/s);
	assert.doesNotMatch(css, /\.window__bar\s*\{[^}]*color:\s*var\(--color-muted\)/s);
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
	assert.match(css, /\.window__bar i\s*\{[^}]*font-style:\s*normal/s);
	assert.doesNotMatch(css, /\.window__screen\s*\{[^}]*background:\s*var\(--color-window-screen\)/s);
	assert.match(css, /--shadow-exhibit:\s*0\s+24px\s+60px/);
	assert.match(css, /--shadow:\s*var\(--shadow-exhibit\)/);
	assert.match(css, /--r-xs:\s*4px/);
	assert.match(css, /--r-sm:\s*8px/);
	assert.match(css, /--r-md:\s*18px/);
	assert.match(css, /--r-pill:\s*999px/);
	assert.match(css, /--radius:\s*var\(--r-md\)/);
	assert.match(css, /\.window\s*\{[^}]*border-radius:\s*var\(--r-md\)/s);
	assert.match(css, /\.window\s*\{[^}]*transition:[^}]*box-shadow/s);
	assert.match(css, /\.window\s*\{[^}]*transition:[^}]*transform/s);
	assert.match(
		css,
		/@media\s*\(\s*hover:\s*hover\s*\)\s*\{[\s\S]*?\.window:hover,\s*\n\s*\.window:focus-visible\s*\{[^}]*translateY\(-2px\)/s,
	);
	assert.match(
		css,
		/@media\s*\(\s*hover:\s*hover\s*\)\s*\{[\s\S]*?\.window:hover,\s*\n\s*\.window:focus-visible\s*\{[^}]*box-shadow:\s*var\(--shadow-exhibit-hover\)/s,
	);
	assert.doesNotMatch(css, /window--portrait/);
	assert.match(css, /prefers-reduced-motion:\s*no-preference/);
	assert.match(css, /prefers-reduced-motion:\s*reduce/);
	assert.doesNotMatch(css, /#ff5f57|#febc2e|#28c840|#ff5f56|#27c93f/i);
});

test('paper grain, misprint, running head, and folios stay flat and non-interactive', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /body::before\s*\{[^}]*content:\s*""/s);
	assert.match(css, /body::before\s*\{[^}]*position:\s*fixed/s);
	assert.match(css, /body::before\s*\{[^}]*inset:\s*0/s);
	assert.match(css, /body::before\s*\{[^}]*pointer-events:\s*none/s);
	assert.match(css, /body::before\s*\{[^}]*z-index:\s*var\(--z-grain\)/s);
	assert.match(css, /body::before\s*\{[^}]*opacity:\s*\.05/s);
	assert.match(css, /feTurbulence/);
	assert.doesNotMatch(css, /_serif500\.ttf/);
	assert.doesNotMatch(css, /body::before\s*\{[^}]*box-shadow/s);

	assert.match(css, /\.misprint\s*\{[^}]*position:\s*relative/s);
	assert.match(css, /\.misprint::after\s*\{[^}]*content:\s*attr\(data-text\)/s);
	assert.match(css, /\.misprint::after\s*\{[^}]*color:\s*var\(--c-amber-ink\)/s);
	assert.match(css, /\.misprint::after\s*\{[^}]*translate\(3px,\s*-2px\)/s);
	assert.match(css, /\.misprint::after\s*\{[^}]*mix-blend-mode:\s*multiply/s);
	assert.match(css, /\.misprint::after\s*\{[^}]*opacity:\s*\.5/s);
	assert.match(css, /\.misprint::after\s*\{[^}]*pointer-events:\s*none/s);
	assert.doesNotMatch(css, /\.misprint::after\s*\{[^}]*color:\s*var\(--c-amber-text\)/s);

	assert.match(css, /\.running-head\s*\{[^}]*writing-mode:\s*vertical-rl/s);
	assert.match(css, /\.running-head\s*\{[^}]*text-orientation:\s*upright/s);
	assert.match(css, /\.running-head\s*\{[^}]*font-family:\s*var\(--font-serif\)/s);
	assert.match(css, /\.running-head\s*\{[^}]*font-size:\s*var\(--text-caption\)/s);
	assert.match(css, /\.running-head\s*\{[^}]*font-weight:\s*500/s);
	assert.match(css, /\.running-head\s*\{[^}]*line-height:\s*1[\s;]/s);
	assert.match(css, /\.running-head\s*\{[^}]*letter-spacing:\s*0\.18em/s);
	assert.match(css, /\.running-head\s*\{[^}]*color:\s*var\(--c-muted\)/s);
	assert.match(css, /@media\s*\(\s*max-width:\s*899px\s*\)[\s\S]*\.running-head\s*\{[^}]*display:\s*none/);
	assert.doesNotMatch(css, /\.running-head\s*\{[^}]*box-shadow/s);

	assert.match(css, /\.folio\s*\{[^}]*font-family:\s*var\(--font-mono\)/s);
	assert.match(css, /\.folio\s*\{[^}]*font-size:\s*var\(--text-micro\)/s);
	assert.match(css, /\.folio\s*\{[^}]*font-weight:\s*500/s);
	assert.match(css, /\.folio\s*\{[^}]*line-height:\s*var\(--leading-micro\)/s);
	assert.match(css, /\.folio\s*\{[^}]*letter-spacing:\s*var\(--tracking-micro\)/s);
	assert.match(css, /\.folio\s*\{[^}]*color:\s*var\(--c-muted\)/s);
	assert.match(css, /\.folio\s*\{[^}]*align-self:\s*flex-end/s);
});

test('main is the positioning context for the chapter spine', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /body\s*>\s*main\s*\{[^}]*position:\s*relative/s);
});

test('header stays on paper and does not frost the page', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /body\s*>\s*header\s*\{[^}]*position:\s*sticky/s);
	assert.match(css, /body\s*>\s*header\s*\{[^}]*background:\s*var\(--color-bg\)/s);
	assert.match(css, /body\s*>\s*header\s*\{[^}]*color:\s*var\(--color-text\)/s);
	assert.doesNotMatch(css, /body\s*>\s*header\s*\{[^}]*mix-blend-mode:\s*difference/s);
	assert.doesNotMatch(css, /body\s*>\s*header\s*\{[^}]*backdrop-filter/s);
	assert.doesNotMatch(css, /body\s*>\s*header\s*\{[^}]*color-mix\(/s);
	assert.doesNotMatch(css, /backdrop-filter/);
	assert.doesNotMatch(css, /body\s*>\s*footer\s*\{[^}]*mix-blend-mode:\s*difference/s);
});

test('wide viewports keep chapter text inside the spine with shared page tokens', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(
		css,
		/body\s*>\s*header\s*>\s*\*,\s*\n\s*body\s*>\s*main\s*>\s*\*,\s*\n\s*body\s*>\s*footer\s*>\s*\*\s*\{[^}]*max-width:\s*var\(--page-max\)/s,
	);
	assert.match(css, /\.chapter\s*\{[^}]*padding:\s*var\(--space-section\)\s+var\(--page-pad\)\s+4\.5rem/s);
	assert.match(css, /@media\s*\(\s*max-width:\s*639px\s*\)\s*\{[^}]*--space-section:\s*48px/s);
	assert.match(css, /@media\s*\(\s*max-width:\s*639px\s*\)[\s\S]*\.chapter\s*\{[^}]*padding:\s*var\(--space-section\)\s+20px/s);
	assert.match(css, /@media\s*\(\s*max-width:\s*639px\s*\)[\s\S]*\.window\s*\{[^}]*max-width:\s*22rem/s);
	assert.match(
		css,
		/@media\s*\(\s*min-width:\s*1100px\s*\)\s*\{[^}]*\.chapter\s*\{[^}]*padding-inline:\s*var\(--page-pad-wide\)/s,
	);
	assert.doesNotMatch(css, /1101px/);
	assert.doesNotMatch(css, /max-width:\s*640px/);
	assert.doesNotMatch(css, /720px/);
	assert.doesNotMatch(css, /max-width:\s*72rem/);
});

test('html uses the paper background so an empty layout still fills the viewport', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /html[^{]*\{[^}]*background:\s*var\(--color-bg\)/s);
});

test('chinese prose wraps pretty, balances short titles, and keeps digits tabular', async () => {
	const css = await readFile(join(here, 'global.css'), 'utf8');

	assert.match(css, /p,\s*\n\s*li\s*\{[^}]*text-wrap:\s*pretty/s);
	assert.match(css, /h1,\s*\n\s*h2,\s*\n\s*\.thesis,\s*\n\s*\.chapter__thesis\s*\{[^}]*text-wrap:\s*balance/s);
	assert.match(css, /body\s*\{[^}]*line-break:\s*strict/s);
	assert.match(css, /body\s*\{[^}]*hanging-punctuation:\s*allow-end/s);
	assert.match(css, /body\s*\{[^}]*text-autospace:\s*normal/s);
	assert.match(css, /body\s*\{[^}]*font-variant-numeric:\s*tabular-nums/s);
	assert.match(
		css,
		/\.num,\s*\n\s*\.result-number,\s*\n\s*\.folio\s*\{[^}]*font-variant-numeric:\s*tabular-nums/s,
	);
	assert.match(css, /\.lat\s*\{[^}]*margin-inline:\s*0\.06em/s);
	assert.match(
		css,
		/@supports\s*\(\s*text-autospace:\s*normal\s*\)\s*\{[^}]*\.lat\s*\{[^}]*margin-inline:\s*0;/s,
	);
	assert.doesNotMatch(css, /overflow-wrap:\s*anywhere/);
	assert.doesNotMatch(css, /font-style:\s*italic/);
});

async function sourceFiles(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files: string[] = [];
	for (const entry of entries) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
		else if (/\.(astro|css|mdx|ts)$/.test(entry.name)) files.push(path);
	}
	return files;
}

test('site sources do not set font-style italic', async () => {
	const files = await sourceFiles(join(here, '..'));
	for (const file of files) {
		const source = await readFile(file, 'utf8');
		assert.doesNotMatch(source, /font-style:\s*italic/, file);
	}
});
