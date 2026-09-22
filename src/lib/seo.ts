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
				description: '文科生，不写代码，用 AI 当开发工具，把两个 AI 产品推到了有人用。',
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
							description: '练口语卡在开口之前——所以我拆了注册墙，让第一轮先成立。',
							inLanguage: 'zh-CN',
							author: { '@id': PERSON_ID },
						},
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@type': 'CreativeWork',
							name: '教师招聘面试系统',
							url: 'https://chloezhang-source.github.io/portfolio/work/interview/',
							description: '口口相传的标准没法复评——所以我把它做成了一轮可以打分的工作流。',
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
