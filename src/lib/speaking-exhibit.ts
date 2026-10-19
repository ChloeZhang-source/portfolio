/** Local frames of the public speaking product. Not a live session and not a score. */

export interface ExhibitStep {
	key: 'open' | 'speak' | 'summary';
	label: string;
	image: string;
	alt: string;
	text: string;
}

export const speakingExhibit = {
	caption: '口语陪练 · 打开即用',
	note: '不用注册。这是一轮的形状，不是正在连线。',
	caseSlug: 'speaking',
	steps: [
		{
			key: 'open',
			label: '打开',
			image: '/work/speaking/cover.jpg',
			alt: '口语陪练公开内测界面：打开即可开始，无需注册',
			text: '没有登录，也没有注册。打开就是这一轮。',
		},
		{
			key: 'speak',
			label: '开口',
			image: '/work/speaking/gallery-2.jpg',
			alt: '开口对话画面：陪练官字幕提问 What are you building，聊天区已有多轮往返',
			text: '陪练官问：What are you building?',
		},
		{
			key: 'summary',
			label: '小结',
			image: '/work/speaking/gallery-3.jpg',
			alt: '即时反馈画面：本场小结弹层列出流利度、用词、语法和下一步练习',
			text: '小结列出流利度、用词、语法，和下一步练习。',
		},
	] as const satisfies readonly ExhibitStep[],
} as const;

export function createExhibitSession() {
	let key: ExhibitStep['key'] = speakingExhibit.steps[0].key;

	function step() {
		return speakingExhibit.steps.find((item) => item.key === key) ?? speakingExhibit.steps[0];
	}

	return {
		snapshot() {
			return { step: step() };
		},
		select(next: string) {
			const match = speakingExhibit.steps.find((item) => item.key === next);
			if (match) key = match.key;
		},
	};
}
