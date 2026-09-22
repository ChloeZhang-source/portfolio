export const site = {
	name: '张晓雪',
	headlineRole: '从 0 做到能用',
	headlineProof: '口语陪练与面试系统，都推到了可试用或可演示',
	headline: '从 0 做到能用，口语陪练与面试系统，都推到了可试用或可演示',
	headlineEn: 'From zero to something you can try. Two AI education products, shipped.',
	email: 'chloechangzxx@outlook.com',
	resumeHref: '/resume.pdf',
	resumeDownloadName: '张晓雪.pdf',
	resumeLabel: '简历',
	wechatQrSrc: '/wechat-qr.png',
	wechatHint: '微信',
	avatarSrc: '/avatar.jpg',
	about:
		'我做产品时看重一件事：从 0 推到能用。口语陪练已公开试用，面试系统有完整流程可看。站点主要放这两件作品；想联系，邮件或微信都可以。',
	nav: [
		{ label: '首页', href: '/#home' },
		{ label: '作品', href: '/#work' },
		{ label: '关于', href: '/#about' },
	],
	updatedAt: '2026-09',
} as const;

export type Site = typeof site;
