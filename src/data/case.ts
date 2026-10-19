export const caseCopy = {
	resultFacts: {
		speaking: ['公开内测中', '无需登录', '约 300 人次体验'],
		interview: ['前公司正式招聘流程', '已完成 50+ 场', '不开放登录'],
	},
	demoEn: 'Built for teacher hiring at my previous company. No public login.',
	accessTitle: '访问说明',
	walkthroughLabel: '查看脱敏流程截图',
	walkthroughHref: '#gallery',
	requestLabel: '约 20 分钟讲解',
	requestHref: '/#contact',
	otherWorkPrefix: '查看另一个作品：',
	mailLabel: '发邮件',
	wechatSeeHome: '返回首页查看微信二维码',
	wechatHref: '/#contact',
} as const;

export function resultFactsFor(slug: string, fallback: string): readonly string[] {
	if (slug in caseCopy.resultFacts) {
		return caseCopy.resultFacts[slug as keyof typeof caseCopy.resultFacts];
	}

	return [fallback];
}
