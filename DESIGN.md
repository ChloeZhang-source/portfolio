---
version: alpha
name: Kosmik-getdesign-preview
description: Layout and visual language taken from the getdesign.md Kosmik catalog preview — a near-white, chaptered landing (Home / Explore / About), adapted to an author left axis and dual amber tokens. Quiet ink on paper, no peach-chip moodboard, no dark résumé chrome. Not affiliated with Kosmik.
reference: https://getdesign.md/design-md/kosmik

colors:
  canvas: "#f4f3ef"
  canvas-mist: "#ffffff"
  ink: "#1c1c1c"
  body: "#3f3d39"
  muted: "#6f6c66"
  hairline: "#e4e1d8"
  surface: "#ffffff"
  window-bar: "#e6e2d9"
  amber: "#c29857"
  amber-ink: "#a87c3f"
  accent: "#a87c3f"
  on-accent: "#f4f3ef"

typography:
  display:
    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif"
    fontSize: 1.8rem
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0.02em
  thesis:
    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif"
    fontSize: 1.8rem
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0.02em
  lede:
    fontFamily: "ui-sans-serif, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei UI', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  kicker:
    fontSize: 13px
    fontWeight: 500
    letterSpacing: 0.08em
    textTransform: uppercase
  ui:
    fontSize: 14px
    fontWeight: 500

rounded:
  window: 18px
  control: 999px
  media: 0px

spacing:
  chapter-y: 96px
  lede-max: 36rem
  window-max: 52rem
  about-block-gap: 2.4rem
---

# Kosmik preview (getdesign)

Source of truth for this site: the [getdesign Kosmik preview landing](https://getdesign.md/design-md/kosmik), not kosmik.app and not the getdesign catalog chrome — with two portfolio adaptations: a left reading axis, and dual amber tokens for contrast.

## Layout

Three stacked chapters on one **left** vertical axis (author stance, not catalog symmetry).

1. **Home** — path line + identity claim + proof; two staggered windows as an index of both works (no CTA, no result numbers). Explore keeps the full catalog.
2. **Explore** — work thesis strip (left border in amber-ink); each work is title + judgment tagline + windowed cover, left-aligned.
3. **About** — path story, decision timeline, and “现在”; contact invite sits below in the same left column. Resume is only a quiet text link inside About.

**Left axis applies to:** Hero, chapter titles / thesis, work cards, About, Contact.

**Stay centered:** ChapterRule divider and Footer only. Do not leave `margin: auto` or `justify-items: center` centering on left-axis blocks.

Top nav: wordmark left, `首页 / 作品 / 关于` on the right; no resume CTA in the header.

Narrow viewports (≤1100px): hide the side rails; show a top 2px `--scroll-progress` line in amber-ink. Prefer `prefers-reduced-motion` static behavior.

## Color

Page floor `{colors.canvas}` `#f4f3ef`. Optional white mist at the top. Ink `#1c1c1c`.

Amber is intentional and split into two tokens — do not merge them:

| Token | Value | Use |
| --- | --- | --- |
| `--color-amber` | `#c29857` | Marks on deep / dark surfaces (screenshots, dark UI chrome) |
| `--color-amber-ink` | `#a87c3f` | Marks on paper / canvas (~3.37:1 vs `#f4f3ef`) |
| `--color-accent` | points to amber-ink | Focus rings, nav underline, paper accents, contact links |

Paper-side amber (Hero marks, thesis border, timeline nodes, nav current, progress line, ChapterRule center dot, Header underline) must use `--color-amber-ink`. Window bar is `#e6e2d9`.

No purple gradients, no apricot CTA chips, no dark navy résumé chrome.

## Type

Chapter / section titles and thesis use Noto Serif SC (~1.8rem / 500, `letter-spacing: 0.02em`) — one serif face for headings, no mixed display stacks. Body and proof stay humanist system sans. Lede ~16px, max-width 36rem, left-aligned on the content axis.

## Window

Rounded 18px card. Top bar `#e6e2d9` with three 8px dots and an optional caption. Screen fills the rest (16:9). Soft shadow `0 24px 60px rgba(28,28,28,0.1)`. This is the only elevation.

## Do / Don't

Do: left-align the author column; one idea per chapter; keep the window as the exhibit; use amber-ink on paper and amber on deep surfaces; keep About story / judgments / now gaps ≥2.4rem.

Don't: center Hero / chapters / work cards / About / Contact; put amber (`#c29857`) marks on paper; two-column résumé hero; gold outline buttons; fat pastel chips; sticky dense header chrome; getdesign “Request a DESIGN.md” cards; full-bleed plaster texture or a likeness in the Home window.
