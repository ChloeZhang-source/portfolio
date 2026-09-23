export const site = {
	name: '张晓雪',
	headlinePath: '翻硕出身 · 前互联网教育主管 · 现在用 AI 当开发工具',
	headlineRole: '把想法，跑成闭环',
	headlineProof: 'Chloe Zhang｜在语言、规则与 AI 之间，搭建可用的系统',
	headline: '把想法，跑成闭环Chloe Zhang｜在语言、规则与 AI 之间，搭建可用的系统',
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
		'我是 Chloe，翻译硕士背景，拥有互联网教育行业的管理经验。作为非技术背景的产品实践者，我依托 AI 工具完成从 0 到 1 的产品落地，独立产出两款已经真实运行的 AI 产品：AI 口语陪练工具、教师招聘线上面试系统。',
		'我相信产品的起点不是完备的架构，而是一个能够跑通的最小闭环。面对需求，我习惯先拆解一轮完整业务流程，验证真实价值之后，再迭代扩展功能。',
		'在项目推进中，我会平衡体验、安全、现实资源之间的矛盾，主动做取舍：为降低使用门槛暂缓账号体系；为保护隐私坚持脱敏演示；将权限隐私规则前置，宁可拉长上线周期。',
		'目前我持续深耕 AI 产品实践，沉淀标准化业务模板，优化 Prompt 工程，补充产品分析方法论。',
		'如果你对非技术背景的 AI 产品落地感兴趣，欢迎联系，也可以查阅我的完整简历。',
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
