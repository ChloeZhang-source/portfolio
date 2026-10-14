export interface MarginJudgment {
	what: string;
	cost: string;
}

export function heroMarginNotes<T extends MarginJudgment>(judgments: readonly T[]): T[] {
	return [judgments[0], judgments[3]];
}

export function aboutMarginNotes<T extends MarginJudgment>(judgments: readonly T[]): T[] {
	return [judgments[1], judgments[2]];
}
