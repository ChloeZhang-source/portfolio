export const site = {
	name: '张晓雪',
	headlinePath: '翻硕出身 · 前互联网教育主管 · 不写代码 · 现在用 AI 当开发工具',
	headlineRole: '文科生，不写代码，我把两个 AI 产品推到了有人用。',
	headlineProof:
		'口语陪练公开内测，打开就能练完一轮；教师招聘面试系统已在前司跑完 50+ 场。',
	headline:
		'文科生，不写代码，我把两个 AI 产品推到了有人用。口语陪练公开内测，打开就能练完一轮；教师招聘面试系统已在前司跑完 50+ 场。',
	headlineEn:
		"A liberal-arts graduate who doesn't write code. I shipped two AI products people actually use.",
	documentTitle: '张晓雪 · 文科生转 AI 的作品集｜口语陪练与面试系统',
	metaDescription:
		'文科生，不写代码，我用 AI 当开发工具，把两个产品推到了有人用：口语陪练公开内测、打开就能练完一轮；教师招聘面试系统已在前司跑完 50+ 场真实招聘。这里写清每个判断的取舍。',
	email: 'chloechangzxx@outlook.com',
	resumeHref: '/resume.pdf',
	resumeDownloadName: '张晓雪.pdf',
	resumeLabel: '简历',
	wechatQrSrc: '/wechat-qr.webp',
	wechatHint: '微信',
	avatarSrc: '/avatar.jpg',
	ogImage: '/og-home.png',
	aboutStory: [
		'翻硕出身，做过互联网教育主管。没上过计算机课，也没写过一行正式代码。',
		'2025年11月之后，我做的第一件事不是学技术，是学怎么把话说清楚——因为 AI 只会照着你说的做，说不清楚的地方，它会自己编一个。',
		'所以我做产品的方法一直很朴素：先把一轮流程做出来，再谈架构。口语陪练的第一版没有账号，面试系统的第一版只有一张评分表。都是先让第一轮自己成立。',
		'回头看，我做的事就是一句话——从 0 推到能用。',
	],
	judgments: [
		{
			what: '先做闭环，后做账号',
			cost: '拿不到留存数据，也做不了用户画像。迭代只能靠我自己一轮一轮试。',
		},
		{
			what: '演示只用脱敏数据',
			cost: '展示的说服力打了折。我没法用真实对话证明效果，只能用界面说明流程。',
		},
		{
			what: '先写权限和隐私，再做后台功能',
			cost: '上线更慢。前几十场只能半人工兜底，我没法一次交出一个完整的系统。',
		},
		// TODO: 替换占位 — 判断 04
		{
			what: '先不做复杂成长曲线',
			cost: '少了一条「坚持练下去」的钩子，用户走完一轮就离开了',
		},
	],
	// TODO: 替换占位 — 现在模块三行
	now: {
		doing: '在把面试系统的评分标准整理成一套可复用的模板',
		learning: '在补基础的产品分析方法，也在学怎么把 prompt 写得可维护',
		thinking: '非技术背景做产品，天花板到底在哪一层——我还没想清楚',
	},
	contactInvite:
		'如果你也在用 AI 做东西，或者想知道非技术背景怎么把想法推到能用——直接发邮件给我，我很想听你卡在哪一步。',
	nav: [
		{ label: '首页', href: '/#home' },
		{ label: '作品', href: '/#work' },
		{ label: '关于', href: '/#about' },
		{ label: '联系', href: '/#contact' },
	],
	updatedAt: '2026-09',
} as const;

export type Site = typeof site;
