export const caseCopy = {
	resultFacts: {
		speaking: ['公开内测', '无需登录', '核心闭环'],
		interview: ['前司用于招聘线上老师', '已完成 50+ 场面试', '真实环境不开放登录'],
	},
	demoEn: 'Built for teacher hiring at my previous company. No public login.',
	accessTitle: '访问说明',
	walkthroughLabel: '看流程截图',
	walkthroughHref: '#gallery',
	requestLabel: '预约讲解',
	requestHref: '/#contact',
	wechatSeeHome: '回首页看微信',
	wechatHref: '/#contact',
} as const;

export function resultFactsFor(slug: string, fallback: string): readonly string[] {
	if (slug in caseCopy.resultFacts) {
		return caseCopy.resultFacts[slug as keyof typeof caseCopy.resultFacts];
	}

	return [fallback];
}
