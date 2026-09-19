export interface ConversationOption {
	id: string;
	text_en: string;
	text_pt: string;
	isCorrect: boolean;
	/** Optional English feedback, shown as secondary text. */
	feedback?: string;
	/** pt-BR feedback, shown as primary text for A1/A2 learners. */
	feedbackPt?: string;
}

export interface ConversationStep {
	id: string;
	mascotMessage: string;
	options: ConversationOption[];
}
