---
version: alpha
name: Kosmik-getdesign-preview
description: Layout and visual language taken from the getdesign.md Kosmik catalog preview — a near-white, centered, chaptered landing (Home / Explore / Experience). Each chapter is illustration → short title → narrow lede → a rounded browser window holding the artifact. Quiet ink on paper, no peach-chip moodboard, no dark résumé chrome. Not affiliated with Kosmik.
reference: https://getdesign.md/design-md/kosmik

colors:
  canvas: "#f4f3ef"
  canvas-mist: "#ffffff"
  ink: "#1c1c1c"
  body: "#3f3d39"
  muted: "#6f6c66"
  hairline: "#e4e1d8"
  surface: "#ffffff"
  window-bar: "#f0eee8"
  window-screen: "#111111"
  accent: "#1c1c1c"
  on-accent: "#f4f3ef"

typography:
  display:
    fontFamily: "ui-sans-serif, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei UI', sans-serif"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.03em
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
---

# Kosmik preview (getdesign)

Source of truth for this site: the [getdesign Kosmik preview landing](https://getdesign.md/design-md/kosmik), not kosmik.app and not the getdesign catalog chrome.

## Layout

Three stacked chapters, one vertical axis, centered.

1. **Home** — line illustration; short centered identity (name, role, one proof); two smaller staggered windows as an index of both works (no CTA, no result numbers). Explore keeps the full catalog.
2. **Explore** — same rhythm; each work is title + sentence + windowed cover.
3. **Experience** — about, skills as plain text, experience notes, contact inside the same calm column. Contact shows a small circular likeness beside mail and WeChat.

Top nav: wordmark left, `Home / Explore / Experience` centered, resume as a text link right.

## Color

Page floor `{colors.canvas}` `#f4f3ef`. Optional white mist at the top. Ink `#1c1c1c`. No gold, no apricot CTA, no dark navy.

The only deep black is **inside** the browser window screen.

## Type

Humanist system sans. Chapter titles ~28px / 500, not 72px magazine, not condensed bold. Lede ~16px, max-width 36rem, centered.

## Window

Rounded 18px card. Top bar `#f0eee8` with three 8px dots and an optional caption. Screen fills the rest. Soft shadow `0 24px 60px rgba(28,28,28,0.1)`. This is the only elevation.

## Do / Don't

Do: center everything; one idea per chapter; keep the window as the exhibit.

Don't: two-column résumé hero (photo beside CV facts); gold outline buttons; fat pastel chips; sticky dense header chrome; getdesign “Request a DESIGN.md” cards; full-bleed plaster texture or a likeness in the Home window.
