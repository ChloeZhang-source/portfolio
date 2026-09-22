# 张晓雪 · 个人作品集

Astro 静态多页。首页放作品与一点自我介绍，两篇案例页讲口语陪练和面试系统。

视觉以 `DESIGN.md` 为准（Kosmik 纸面语言：居中章节 + 窗口展柜）。改文案只动数据，不改组件逻辑。

## 本地

需要 Node `>=22.12`。

```bash
npm install
npm run dev
```

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地预览 |
| `npm test` | 源码断言测试 |
| `npm run build` | 静态构建，产物在 `dist/` |
| `npm run preview` | 预览构建结果 |

路由：本地 `astro preview` 带 GitHub Pages 前缀，首页是 `/portfolio/`，案例是 `/portfolio/work/speaking` 与 `/portfolio/work/interview`，简历是 `/portfolio/resume.pdf`。没有 `/works`、没有 `/en`。开发时 `npm run dev` 同样走 `/portfolio/`。

## 部署

仓库：[ChloeZhang-source/portfolio](https://github.com/ChloeZhang-source/portfolio)

GitHub Pages 仓库站：<https://chloezhang-source.github.io/portfolio/>

- `site`: `https://chloezhang-source.github.io`
- `base`: `/portfolio/`
- 构建命令：`npm run build`
- 发布目录：`dist/`

push `main` 时 `.github/workflows/pages.yml` 会跑 `npm ci`、`npm test`、`npm run build`，并把 `dist/` 发到 GitHub Pages。仓库设置里把 Pages 源选成 GitHub Actions。

## 改内容（不要改组件）

身份与联系：`src/data/site.ts`

| 字段 | 现在 |
| --- | --- |
| `name` | 张晓雪 |
| `email` | chloechangzxx@outlook.com |
| `resumeHref` / `resumeDownloadName` | `/resume.pdf` / `{name}.pdf` |
| `wechatQrSrc` / `avatarSrc` | `/wechat-qr.png` / `/avatar.jpg` |
| `nav` | 首页、作品、关于 |

作品正文和封面：`src/content/works/speaking.mdx`、`src/content/works/interview.mdx`

- 口语 `productUrl`、`ctaLabel: 打开产品`、`access: public`
- 面试无 `productUrl`、无演示账号；`access: demo` + `demoNotes`；主 CTA「看流程」指向页内画廊

首页/案例短文案：`src/data/home.ts`、`src/data/case.ts`。英文字段（`headlineEn`、`summaryEn`）只留在数据里，页面不展示。

## public/

| 路径 | 用途 |
| --- | --- |
| `resume.pdf` | 中文简历（About 内小链下载） |
| `favicon.svg` | 纸面风格站点图标 |
| `avatar.jpg` | 首页窗口头像 |
| `wechat-qr.png` | 联系区微信码 |
| `fonts/noto-serif-sc-title.woff2` | Hero 标题子集字体 |
| `work/speaking/cover.jpg` + `gallery-1..3.jpg` | 口语封面与流程截图 |
| `work/interview/cover.jpg` + `gallery-1..3.jpg` | 面试封面与脱敏流程截图 |

截图不要包含真实学员、真实简历、可识别人脸。微信码若仍是占位图，替换 `public/wechat-qr.png` 即可。
