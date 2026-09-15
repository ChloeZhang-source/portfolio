export const site = {
	name: '张晓雪',
	headlineRole: 'AI 教育产品经理',
	headlineProof: '从 0 到 1 做过口语陪练和面试系统',
	headline: 'AI 教育产品经理，从 0 到 1 做过口语陪练和面试系统',
	headlineEn:
		'Product manager in AI education. Built two 0-to-1 products: AI speaking practice and an AI interview system.',
	statusLines: ['目前优先考虑 AI 教育方向', '也关注对话式 / 智能体产品机会'] as const,
	status: '目前优先考虑 AI 教育方向，也关注对话式 / 智能体产品机会',
	statusEn:
		'Prioritizing AI education roles; also open to conversational / agent products.',
	facts: ['独立完成 2 款 AI 教育产品 0-1', '英语教研累计授课 1000+ 课次'] as const,
	email: 'chloechangzxx@outlook.com',
	resumeHref: '/resume.pdf',
	resumeDownloadName: '张晓雪-AI教育产品经理.pdf',
	resumeLabel: '下载简历',
	wechatQrSrc: '/wechat-qr.png',
	wechatHint: '微信 · 约时间',
	avatarSrc: '/avatar.jpg',
	about:
		'英语笔译硕士，四年以上教育内容与项目管理经验，兼具 AI 产品落地、英语教研与本地化背景。独立完成两款 AI 教育产品，从需求分析、Prompt 设计做到前端上线。持阿里云大模型 ACP 与 CAIE 认证。',
	acpCert: {
		src: '/certs/alibaba-acp-llm.jpg',
		label: '查看 ACP 证书',
		closeLabel: '关闭',
		alt: '阿里云大模型 ACP 证书，Xiaoxue Zhang，编号 ACP26260802754212，有效期至 2028 年 8 月 9 日',
	},
	aboutSkillsPrimary: ['AI 产品落地', '英语教研', '项目管理'] as const,
	aboutSkillsSecondary: ['Prompt 工程', '课程与习题研发'] as const,
	experience: [
		{
			org: '小站赢教育科技有限公司',
			role: '英语教学主管',
			period: '2024.03 — 至今',
			bullets: [
				'主导小站雅思 / 托福 APP 内容体系迭代：梳理课程内容结构与难度梯度，牵头上线 AI 互动课新板块，协同教研、设计、研发推进落地，带动内容使用量提升 20%。',
				'主导课程内容迭代，将教学经验沉淀为标准化课程产品，学员续费率近 80%',
				'从 0 到 1 做了线上老师招聘面试系统；推动大模型生成教学素材与讲解方案，提升内容生产效率',
			],
		},
		{
			org: '中电金信软件有限公司',
			role: '本地化项目经理',
			period: '2022.07 — 2023.12',
			bullets: [
				'负责两大海内外客户的双语本地化项目，月均承接 100+ 项目，独立对接需求并输出报价与交付方案',
				'统筹 14+ 语种译员与技术、排版团队协同交付，具备从 0 到 1 搭建项目流程的经验',
				'建立双语内容审校标准与术语库，为 AI 翻译 / 本地化产品沉淀结构化内容资产',
			],
		},
		{
			org: 'RWS 中国（全球本地化服务商）',
			role: '项目协调（实习）',
			period: '2021.03 — 2021.09',
			bullets: [
				'对接世界 500 强企业本地化项目 900 余个，统筹建卷、分配、审校、返稿全流程，0 投诉交付',
			],
		},
	],
	nav: [
		{ label: '首页', href: '/#home' },
		{ label: '作品', href: '/#work' },
		{ label: '经历', href: '/#experience' },
	],
	updatedAt: '2026-09',
} as const;

export type Site = typeof site;
