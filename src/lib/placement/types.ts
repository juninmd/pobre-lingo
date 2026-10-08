import type { CEFRLevel } from "../curriculumData";

export type PlacementSkill = "grammar" | "vocabulary" | "reading" | "listening";

export type PlacementItem = {
	id: string;
	level: CEFRLevel;
	skill: PlacementSkill;
	prompt: string;
	/* for listening: text to be spoken by TTS */
	audioText?: string;
	options: string[];
	answer: number;
};
