import type { CEFRLevel } from "./curriculumData";
import { CEFR_ORDER } from "./levels";
import { proficiencyProfiles } from "./proficiencyProfiles";
import { proficiencyQuestions } from "./proficiencyQuestions";
import type { ProficiencyResult, SkillReport } from "./proficiencyTypes";

export {
	loadProficiencyResult,
	PROFICIENCY_RESULT_KEY,
	saveProficiencyResult,
} from "./proficiencyStorage";
export type { ProficiencyResult, SkillReport } from "./proficiencyTypes";

export function calculateProficiency(
	answers: Record<number, string>,
	now = new Date(),
): ProficiencyResult {
	const correct = proficiencyQuestions.filter(
		(q) => answers[q.id] === q.correctAnswer,
	);
	const level = inferLevel(correct.map((q) => q.cefr));
	const skillReports = buildSkillReports(answers);
	return {
		version: 2,
		basis: "recognition",
		level,
		score: correct.length,
		total: proficiencyQuestions.length,
		date: now.toISOString().split("T")[0],
		skillReports,
		weakestSkill:
			[...skillReports].sort((a, b) => (a.percent ?? 0) - (b.percent ?? 0))[0]
				?.skill ?? null,
		focus: proficiencyProfiles[level].focus,
		dailyPlan: proficiencyProfiles[level].dailyPlan,
		todayTip: getDailyTip(level, now),
	};
}

export function buildSkillReports(
	answers: Record<number, string>,
): SkillReport[] {
	const skills = [...new Set(proficiencyQuestions.map((q) => q.skill))];
	return skills.map((skill) => {
		const questions = proficiencyQuestions.filter((q) => q.skill === skill);
		const correct = questions.filter(
			(q) => answers[q.id] === q.correctAnswer,
		).length;
		return {
			skill,
			correct,
			total: questions.length,
			percent: Math.round((correct / questions.length) * 100),
		};
	});
}

export function getDailyTip(level: CEFRLevel, now = new Date()) {
	const tips = proficiencyProfiles[level].tips;
	const day = Math.floor(now.getTime() / 86400000);
	return tips[day % tips.length];
}

/** Requires evidence in every preceding band; this is a content recommendation only. */
export function inferLevel(passedLevels: CEFRLevel[]): CEFRLevel {
	let suggested: CEFRLevel = "A1";
	for (const level of CEFR_ORDER) {
		const total = proficiencyQuestions.filter((q) => q.cefr === level).length;
		const passed = passedLevels.filter((value) => value === level).length;
		if (!total || passed / total < 0.75) break;
		suggested = level;
	}
	return suggested;
}
