---
version: 2.0
name: 可触碰的原稿 — 设计系统
description: 张晓雪作品集的设计系统规范。纸面印刷语言（米色纸 / 墨 / 琥珀墨迹）+ 左轴阅读 + 窗口展品，补齐字阶、动效 token、层级、组件规格与中文排版细则。
extends: DESIGN.md（v1 Kosmik 版）—— 本文件新增系统层，v1 的「左轴 / 双琥珀 token / 窗口唯一层级」三条铁律继续有效。
references: Apple（字阶与留白 / 唯一阴影）, Linear（4px 网格 / 表面阶梯 / 无装饰阴影）
---

# 0. 方案体检：现有《视觉改良方案》缺什么

| 维度 | 现有方案 | 判断 |
| --- | --- | --- |
| 方向 | 纸面 + 左轴 + 窗口展品 | ✅ 成立，不动 |
| 结构 | 按「问题清单」组织（改字号 / 换图 / 加点） | ⚠️ 是手术清单，不是系统 |
| 字阶 | 三个孤立值 2.4 / 2.1 / 1.8rem | ❌ 无比例关系，每加一个元素就要现编数值 |
| 动效 | 380 / 520 / 900ms 三个孤立时长 | ❌ 无时长档位、无缓动家族、无 stagger 规则、无编排规格 |
| 层级 | 只有一个 `--shadow` | ❌ 新增书眉 / 批注 / 展品 / 悬浮导航后必然失控 |
| 中文排版 | 完全缺席 | ❌ **最能证明内功、也最被 AI 生成页忽略的一块** |
| 案例页 | 2 条琐碎建议 | ❌ 占作品集 70% 说服力，缺整页版式规格 |
| 可访问性 | 只提 reduced-motion | ❌ 缺对比度实测、焦点环、动效可暂停 |

**结论**：方向对，缺的是「可被验证的一致性」。硬实力的信号不是加了多少效果，而是**每个数值都有出处、每个新元素都能对上号**。以下 9 章补齐这一层。

---

# 1. Visual Theme & Atmosphere

一本被主人反复翻过、在页边写满批注的作品册 —— 不是一张网页。

- **视觉基调**：印刷纸感、低饱和、暖中性、有手写痕迹
- **核心关键词**：纸面 / 墨迹 / 栏外批注 / 展品 / 左轴
- **光影与质感**：无渐变、无玻璃拟态；唯一的深度来自「展品投影」与「1px 发丝线」；全局叠一层 5% 纸张噪点（`feTurbulence`，凑近才可见）
- **动效气质**：短、精确、一次编排。动效只做三件事——引导视线落点、揭示层级关系、确认用户操作

---

# 2. Color Palette & Roles

```css
:root {
  --c-paper:        #f4f3ef;  /* 页面地板 */
  --c-surface:      #ffffff;  /* 卡片 / 窗口 */
  --c-ink:          #1c1c1c;  /* 标题与正文 */
  --c-body:         #3f3d39;  /* 次级正文 */
  --c-muted:        #6f6c66;  /* 元信息 / 旁注 */
  --c-rule:         rgba(27, 26, 23, .18);  /* 发丝线 */
  --c-hairline:     #e4e1d8;  /* 更浅的分隔线 */
  --c-window-bar:   #e6e2d9;  /* 窗口顶栏 */
  --c-amber:        #c29857;  /* 深色展品上的标记 */
  --c-amber-ink:    #a87c3f;  /* 纸面上的墨迹（非文本） */
  --c-accent:       var(--c-amber-ink);
  --c-exhibit-bg:   #17171c;  /* 展品（产品界面）内部 */
  --c-exhibit-ink:  #e8e6e0;
}
```

## 对比度实测（已计算，不可凭感觉改色）

| 组合 | 比值 | 结论 |
| --- | --- | --- |
| `ink` / `paper` | 15.35:1 | ✅ AAA，标题正文 |
| `body` / `paper` | 9.76:1 | ✅ AAA |
| `muted` / `paper` | 4.71:1 | ✅ AA（14px 以上正文可用） |
| `amber-ink` / `paper` | **3.37:1** | ⚠️ **仅可做非文本痕迹**（边框 / 圆点 / 焦点环 / 套印），**禁止承载 14px 以下文字** |
| `amber` / `paper` | **2.39:1** | ❌ 纸面上任何文字都不许用 |
| `amber` / `exhibit-bg` | 6.74:1 | ✅ 深色展品内的强调色 |
| `exhibit-ink` / `exhibit-bg` | 14.31:1 | ✅ |
| `ink` / `window-bar` | 13.18:1 | ✅ |

> 铁律：琥珀色是**墨迹**，不是**文字颜色**。要做琥珀色小字，用 `--c-muted` + 琥珀色边框。

---

# 3. Typography Rules

```css
--font-serif: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;  /* 标题 / thesis / 旁注 */
--font-sans:  "Segoe UI", "PingFang SC", "Microsoft YaHei UI", ui-sans-serif, system-ui, sans-serif; /* 正文 */
--font-mono:  "Cascadia Code", "SF Mono", Consolas, ui-monospace, monospace; /* 窗口栏 / 页码 / 刻度 */
```

## Type Scale（基准 17px，比例 ≈1.25）

| Token | px | rem | Weight | Line-height | Letter-spacing | 用途 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `display-1` | 56 | 3.5 | 500 | 1.14 | **-0.01em** | 首屏主张（clamp 2.6→3.5rem） |
| `display-2` | 34 | 2.125 | 500 | 1.30 | 0 | 章节标题 |
| `title` | 28 | 1.75 | 500 | 1.55 | 0 | 章引言 thesis |
| `lead` | 19 | 1.1875 | 400 | 1.70 | 0 | 副题 / lede |
| `body` | 17 | 1.0625 | 400 | 1.75 | 0 | 正文 |
| `small` | 14 | 0.875 | 400 | 1.65 | +0.02em | 作品 tagline / 旁注 |
| `caption` | 12 | 0.75 | 500 | 1.40 | +0.06em | 窗口栏 / 书眉 |
| `micro` | 11 | 0.6875 | 500 | 1.30 | +0.12em | 页码 / 章节刻度 / 旁注标签 |

**字距方向**：大字号收紧（0 或微负），小字号放开（+0.02em → +0.12em）。现有 Hero 用 `+0.04em`（56px 上等于 +2.24px）方向反了，会让中文标题散开——按上表改为 `-0.01em`。

## 中文排版细则（硬实力核心，逐条落地）

1. **中西文间隙**：汉字与拉丁/数字之间保留 0.06em。渐进增强 `text-autospace: normal`；当前用 `.lat { margin-inline: .06em }` 包裹拉丁片段。
2. **数字等宽**：所有数字（300 人次 / 50+ 场 / v4 / 2026）用 `font-variant-numeric: tabular-nums`。
3. **孤字控制**：正文 `text-wrap: pretty`；≤3 行标题 `text-wrap: balance`。
4. **标点悬挂**：`hanging-punctuation: allow-end`（Safari）；降级 `.hang { margin-left: -.5em }`。
5. **行首禁则**：`line-break: strict;`，禁止 `overflow-wrap: anywhere` 出现在正文。
6. **禁用中文斜体**：CJK 无真正斜体，浏览器合成倾斜在汉字上极丑。旁注的「手写感」靠 **字号降一档 + 行高放宽 + 左侧 2px 琥珀痕 + 容器 `rotate(-0.8deg)`** 表达，**禁止 `font-style: italic`**。
7. **字重**：中文标题固定 500（Noto Serif SC 子集只做了 500，用 600 会触发合成加粗）。这是有意偏离 Apple（拉丁 600），理由是字形来源。
8. **字体子集硬约束**：标题字体走 `unicode-range` 白名单（`BaseLayout.astro`）。**任何新增进标题/书眉/批注的汉字，必须同步扩白名单**，否则该字静默回退到 Songti SC，字重与字面都不一致。流程：列出新增字 → 取码位 → 追加进 `unicode-range` → 用 `pyftsubset` 重建 woff2 → 重新 build。

---

# 4. Component Stylings

## 4.1 Buttons

```css
.btn-primary {            /* 下载简历 / 主行动 */
  padding: 10px 20px; border-radius: 999px;
  background: #1c1c1c; color: #f4f3ef;
  border: 1px solid #1c1c1c;
  font: 500 14px/1.2 var(--font-sans);
  transition: background 120ms var(--ease-out), transform 120ms var(--ease-out);
}
.btn-primary:hover  { background: #3f3d39; }
.btn-primary:active { transform: translateY(1px); }
.btn-ghost {
  padding: 10px 20px; border-radius: 999px;
  background: transparent; color: var(--c-ink);
  border: 1px solid rgba(27, 26, 23, .18);
}
.btn-ghost:hover { border-color: var(--c-ink); }
.btn-primary:focus-visible, .btn-ghost:focus-visible {
  outline: 2px solid var(--c-amber-ink); outline-offset: 2px;
}
```

## 4.2 Cards / Windows（展品，唯一允许投影的组件）

```css
.window {
  background: #ffffff; border: 1px solid rgba(27, 26, 23, .11);
  border-radius: 18px; overflow: hidden;
  box-shadow: 0 24px 60px rgba(28, 28, 28, .10);
  transition: box-shadow 180ms var(--ease-out), transform 180ms var(--ease-out);
}
.window:hover { transform: translateY(-2px); box-shadow: 0 28px 68px rgba(28, 28, 28, .14); }
.window__bar  { min-height: 34px; padding: 0 13px; background: #e6e2d9;
                font: 500 12px/1.4 var(--font-mono); letter-spacing: .06em; color: #6f6c66; }
.window__screen { aspect-ratio: 16 / 9; overflow: hidden; }
```

## 4.3 新增签名组件

```css
/* A. 套印错位标题 */
.misprint { position: relative; font: 500 3.5rem/1.14 var(--font-serif); letter-spacing: -.01em; }
.misprint::after {
  content: attr(data-text); position: absolute; inset: 0;
  color: var(--c-amber-ink); transform: translate(3px, -2px);
  mix-blend-mode: multiply; opacity: .5; pointer-events: none;
}

/* B. 栏外批注 Marginalia（禁止 italic） */
.annotation {
  max-width: 24rem; padding-left: 12px;
  border-left: 2px solid var(--c-amber-ink);
  font: 400 14px/1.75 var(--font-serif);
  color: var(--c-body); transform: rotate(-.8deg);
}
.annotation__tag {
  display: block; margin-bottom: 4px;
  font: 500 11px/1.3 var(--font-mono); letter-spacing: .12em;
  color: var(--c-muted);              /* 不用琥珀：3.37:1 不达标 */
}

/* C. 书眉 Running Head（竖排，中文排版硬实力信号） */
.running-head {
  writing-mode: vertical-rl; text-orientation: upright;
  font: 500 12px/1 var(--font-serif); letter-spacing: .18em;
  color: var(--c-muted);
}

/* D. 章节刻度尺 Rail */
.rail a { display: flex; align-items: center; gap: .5rem; justify-content: flex-end;
          font: 500 11px/1.3 var(--font-mono); letter-spacing: .12em;
          color: var(--c-muted); opacity: .55; }
.rail a::after { content: ""; width: 18px; height: 1px; background: var(--c-rule);
                 transition: width 220ms var(--ease-out), background 220ms var(--ease-out); }
.rail a[data-active] { opacity: 1; color: var(--c-ink); }
.rail a[data-active]::after { width: 34px; background: var(--c-amber-ink); }

/* E. 页码 Folio / 版本说明 Colophon */
.folio   { font: 500 11px/1.3 var(--font-mono); letter-spacing: .12em; color: var(--c-muted); }
.colophon { border-top: 1px solid var(--c-hairline); padding-top: 32px;
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
            font: 400 11px/1.6 var(--font-mono); color: var(--c-muted); }
```

## 4.4 Inputs / Focus

```css
:focus-visible { outline: 2px solid var(--c-amber-ink); outline-offset: 2px; }
/* 触摸目标 ≥44px（导航项 / 按钮 / 展品热区） */
```

---

# 5. Layout Principles

- **间距基准 4px**：`4 / 8 / 12 / 16 / 24 / 32 / 48 / 96`
- **章节垂直间距**：96px（≤640px 收紧到 48px）
- **内容容器**：max-width 72rem（1152px），padding 20px；≥1101px 时左轴留 4.25rem + 1.25rem 订口
- **文本行宽**：正文 ≤36rem；旁注 ≤24rem；展品 ≤52rem
- **栅格 gutter**：20–24px
- **留白哲学**：组内紧（8–16px）、组间松（32–48px）、章间最松（96px）。页脚是唯一允许密集的区域

---

# 6. Depth & Elevation

| 层级 | 表现 | 用途 |
| --- | --- | --- |
| L0 纸面 | `#f4f3ef`，无边框无阴影 | 页面地板、正文 |
| L1 白面 | `#ffffff` + `1px rgba(27,26,23,.11)` | 卡片、窗口、批注容器 |
| L2 展品 | 内部 `#17171c`，**唯一投影** `0 24px 60px rgba(28,28,28,.10)` | 产品界面窗口 |
| L3 悬浮 | `backdrop-filter: blur(14px)` + `color-mix(paper 88%)` | sticky 顶栏 |
| L4 覆盖 | `outline: 2px solid #a87c3f` | 焦点环 |

```css
--shadow-exhibit: 0 24px 60px rgba(28, 28, 28, .10);
--shadow-exhibit-hover: 0 28px 68px rgba(28, 28, 28, .14);
/* z-index */
--z-content: 0; --z-header: 1; --z-rail: 2; --z-grain: 3; --z-skip: 4;
```

铁律：**只有展品有投影**。批注、书眉、刻度尺一律用边框与颜色分级，禁止加阴影。

---

# 7. Do's and Don'ts

**Do**
1. 任何新数值先查本表，查不到才新增，并回填本表。
2. 动效服务于「60 秒读懂你是谁」：引导落点、揭示层级、确认操作，三者之外不加。
3. 首页一次编排入场（≤800ms），其余元素进入视口只播一次。
4. 琥珀色只做痕迹；文字颜色从 `ink / body / muted` 三档里选。
5. 新增汉字先进 `unicode-range` 白名单，再进页面。
6. 展品截图换图时，检查它在白卡片里是否有边界（浅色截图加 1px 内描边或 12px 米色内衬）。
7. 案例页保持三级节奏：标题 → 判断 → 展品。
8. 所有数字用 `tabular-nums`。

**Don't**
1. 不用 `font-style: italic` 处理中文。
2. 不用琥珀色写小字（3.37:1 不达标）。
3. 不在纸面上用 `--c-amber`（2.39:1）。
4. 不给批注 / 书眉 / 卡片加投影。
5. 不用 `overflow-wrap: anywhere` 处理中文正文（破坏禁则）。
6. 不做光标跟随倾斜、页面转场、音效、暗色模式——它们是设计感的廉价替代品。
7. 不让 hover 承载唯一信息（触屏没有 hover）。
8. 不新增无限循环动效；装饰性脉冲最长 5s 且必须可暂停。

---

# 8. Responsive Behavior

| 断点 | 折叠策略 |
| --- | --- |
| ≤640px | 隐藏书眉竖排与章节刻度尺；导航字号 .8rem、隐藏「联系」；章节 padding → 48px 20px；展品宽 ≤22rem |
| 641–900px | 左轴退化为单列；批注移入正文流（去掉 rotate 与 -0.8deg 偏移） |
| 901–1100px | 保留左轴，隐藏侧边标尺；展品 max-width 100% |
| ≥1101px | 完整：左轴 + 订口 + 书眉 + 刻度尺 |

- **触摸目标** ≥44px（导航项靠 padding 补足）
- **字号缩放**：`display-1: clamp(2.6rem, 5.2vw, 3.5rem)`；其余档位固定值
- **动效降级**：`prefers-reduced-motion: reduce` 时全部动效关闭，直接呈现终态；`animation-timeline: view()` 不支持时静态显示（不写 JS 兜底）

---

# 9. Agent Prompt Guide

## Quick Reference

> 纸面 `#f4f3ef` / 墨 `#1c1c1c` / 琥珀墨迹 `#a87c3f`（仅非文本）/ 标题 Noto Serif SC 500 / 正文 17px 行高 1.75 / 基准 4px / 章节间距 96px / 圆角 18px / 只有展品有投影 / 动效 ≤380ms（编排 ≤800ms）/ 中文不用斜体 / 数字 tabular-nums / 左轴对齐，只有分隔线与页脚居中。

## Component Prompts

1. 「按本系统写一个首屏：kicker + 套印错位大标题（56px/500/-0.01em）+ 19px 副题 + 展品窗口，一次编排入场，总时长 ≤800ms，尊重 reduced-motion。」
2. 「写一个栏外批注组件：14px 衬线、行高 1.75、左 2px 琥珀痕、容器 rotate(-0.8deg)、无斜体、进入视口时以 `--ease-pen` 播 380ms 落笔动画。」
3. 「写一个可交互展品：三步完成一轮真实体验，结果区 `aria-live="polite"`，提供暂停按钮，数据条填充 720ms `--ease-out`。」
4. 「写页脚 Colophon：上边框 1px 发丝线，三列 mono 11px，含版本 / 更新 / 字体授权。」
5. 「把案例页重排为：标题（34px）→ 判断 tagline（28px 衬线）→ 展品（52rem）→ 三条代价 → 上一个/下一个作品。」

## Iteration Guide

1. 先定层级再定样式：符号是 L0–L4 哪一层，再选背景与边框。
2. 每加一个色值，先跑对比度；低于 4.5:1 就降级为非文本用途。
3. 每加一个字号，先查 Type Scale；查不到说明系统缺档，补表而不是就地编值。
4. 动效先问「用户触发还是自动播放」；自动播放的一次性、≤380ms、reduced-motion 关闭。
5. 中文与拉丁混排处必加 0.06em 间隙。
6. 任何标题类文字改动后，核对 `unicode-range` 白名单。
7. 新增组件不得引入第二个投影值。
8. 移动端先删后改：先删书眉、刻度尺、装饰性编号，再调间距。
9. 改完自查三件事：键盘能否走完全页、焦点环是否可见、reduced-motion 下是否仍是完整内容。
10. 每轮迭代只在一处用力；其余保持安静。

---

## 附：落地顺序（建议）

1. 字阶与字距修正（Hero `-0.01em`、body 17px、数字 tabular-nums）——半天，收益最稳
2. 印刷四件套：套印标题 + 书眉竖排 + 页码 + Colophon——半天
3. 栏外批注（去斜体）与章节刻度尺——半天
4. 首屏一次编排入场 + 可交互展品——1 天
5. 案例页三级节奏重排——半天

> 注意：`src/components/*.test.ts` 对 Hero / Header 等组件的具体 CSS 做了断言，改样式时同步更新对应测试断言，否则 `npm test` 会红。
