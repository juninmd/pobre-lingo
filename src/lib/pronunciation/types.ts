export type PronunciationFocus =
	| "th"
	| "short-long-i"
	| "schwa"
	| "ed-ending"
	| "final-consonant"
	| "h-vs-r"
	| "word-stress"
	| "ae-vs-e";

export type MinimalPair = {
	id: string;
	focus: PronunciationFocus;
	a: string;
	b: string;
	tipPt: string;
};

export type StressItem = {
	id: string;
	word: string;
	syllables: string[];
	stressed: number;
	tipPt?: string;
};

export type FocusInfo = {
	id: PronunciationFocus;
	title: string;
	whyPt: string;
	howPt: string;
};
