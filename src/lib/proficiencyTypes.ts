import type { CEFRLevel } from "./curriculumData";
import type { PlacementSkill } from "./placement/types";

export interface SkillReport {
	skill: PlacementSkill;
	correct: number;
	total: number;
	percent: number | null;
}

export interface ProficiencyResult {
	version: 2;
	basis: "recognition";
	/** Suggested content band; never a certified ability level. */
	level: CEFRLevel;
	score: number;
	total: number;
	date: string;
	focus: string;
	dailyPlan: string[];
	skillReports: SkillReport[];
	weakestSkill: PlacementSkill | null;
	todayTip: string;
}

export const SKILL_LABELS: Record<PlacementSkill, string> = {
	grammar: "Reconhecimento de estruturas",
	vocabulary: "Vocabulário",
	reading: "Compreensão de trechos",
	listening: "Escuta com voz sintetizada",
};
