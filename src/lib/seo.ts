export function resolveDocumentTitle(customTitle: string | undefined, defaultTitle: string): string {
	const trimmed = customTitle?.trim();
	return trimmed ? trimmed : defaultTitle;
}

export function absoluteOgImageUrl(siteOrigin: string | URL | undefined, imagePath: string): string {
	if (!siteOrigin) {
		throw new Error('astro.config site is required for Open Graph URLs');
	}

	return new URL(imagePath, siteOrigin).href;
}

const PERSON_ID = 'https://chloezhang-source.github.io/portfolio/#person';
const SITE_URL = 'https://chloezhang-source.github.io/portfolio/';

export function buildHomeJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': PERSON_ID,
				name: '张晓雪',
				alternateName: 'Chloe',
				url: SITE_URL,
				jobTitle: 'AI 产品设计',
				description: '张晓雪 Chloe。翻硕背景，不写业务代码，以 AI 为工具把想法落地成可复用产品闭环。',
				knowsAbout: ['AI 产品设计', 'AI 口语练习', '教师招聘面试流程', '教育科技'],
				alumniOf: { '@type': 'CollegeOrUniversity', name: '翻译硕士' },
				sameAs: ['https://httpsaitalk.win/', 'https://github.com/chloezhang-source'],
			},
			{
				'@type': 'WebSite',
				'@id': 'https://chloezhang-source.github.io/portfolio/#website',
				url: SITE_URL,
				name: '张晓雪 · 作品集',
				inLanguage: 'zh-CN',
				author: { '@id': PERSON_ID },
			},
			{
				'@type': 'ItemList',
				name: '作品',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: {
							'@type': 'CreativeWork',
							name: 'AI 口语陪练',
							url: 'https://chloezhang-source.github.io/portfolio/work/speaking/',
							description:
								'口语练习的最大阻碍是过高的启动成本。剥离前置流程与账号体系，实现打开即用、无需注册、一轮即成。公开内测累计 100+ 轮真实对话训练。',
							inLanguage: 'zh-CN',
							author: { '@id': PERSON_ID },
						},
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@type': 'CreativeWork',
							name: '标准化可复评面试系统',
							url: 'https://chloezhang-source.github.io/portfolio/work/interview/',
							description:
								'传统面试依赖个人经验，标准不可见、过程不可溯、结果不可评。将口头经验结构化为可录制、可打分、可复评、可复盘的体系。已落地 50+ 场真实教师招聘面试。',
							author: { '@id': PERSON_ID },
						},
					},
				],
			},
		],
	};
}

export function buildCaseJsonLd(work: { name: string; url: string; description: string }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: work.name,
		url: work.url,
		description: work.description,
		inLanguage: 'zh-CN',
		author: { '@id': PERSON_ID },
	};
}
