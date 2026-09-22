export const caseCopy = {
	resultFacts: {
		speaking: ['公开内测中', '无需登录', '100+ 轮次'],
		interview: ['前司正式招聘流程', '已完成 50+ 场', '不开放登录'],
	},
	demoEn: 'Built for teacher hiring at my previous company. No public login.',
	accessTitle: '访问说明',
	walkthroughLabel: '看流程截图',
	walkthroughHref: '#gallery',
	requestLabel: '约 20 分钟讲解',
	requestHref: '/#contact',
	otherWorkPrefix: '看另一个作品：',
	mailLabel: '邮件说两句',
	wechatSeeHome: '首页有微信',
	wechatHref: '/#contact',
} as const;

export function resultFactsFor(slug: string, fallback: string): readonly string[] {
	if (slug in caseCopy.resultFacts) {
		return caseCopy.resultFacts[slug as keyof typeof caseCopy.resultFacts];
	}

	return [fallback];
}
