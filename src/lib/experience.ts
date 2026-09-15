export type ExperiencePeriod = {
	start: string;
	end: string;
	current: boolean;
};

const PERIOD_SEP = /\s+[—–-]\s+/;

export function splitExperiencePeriod(period: string): ExperiencePeriod {
	const [startRaw = period.trim(), endRaw = ''] = period.split(PERIOD_SEP);
	const start = startRaw.trim();
	const end = endRaw.trim();
	const current = end === '至今';

	return {
		start: current ? `${start} —` : start,
		end,
		current,
	};
}
