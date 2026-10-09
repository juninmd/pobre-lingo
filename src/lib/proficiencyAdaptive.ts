import { type AdaptiveAnswer, computeFinalLevel } from "./placement/adaptive";
import { getDailyTip } from "./proficiency";
import { proficiencyProfiles } from "./proficiencyProfiles";
import {
	type ProficiencyResult,
	SKILL_LABELS,
	type SkillReport,
} from "./proficiencyTypes";

export function calculateProficiencyFromAdaptive(
	answers: AdaptiveAnswer[],
	now = new Date(),
): ProficiencyResult {
	const assessed = answers.filter((answer) => answer.correct !== null);
	const level = computeFinalLevel(answers);
	const skillReports: SkillReport[] = Object.keys(SKILL_LABELS).map((key) => {
		const skill = key as SkillReport["skill"];
		const items = assessed.filter((a) => a.skill === skill);
		const correct = items.filter((a) => a.correct).length;
		return {
			skill,
			correct,
			total: items.length,
			percent: items.length ? Math.round((correct / items.length) * 100) : null,
		};
	});
	return {
		version: 2,
		basis: "recognition",
		level,
		score: assessed.filter((a) => a.correct).length,
		total: assessed.length,
		date: now.toISOString().split("T")[0],
		skillReports,
		weakestSkill:
			[...skillReports]
				.filter((r) => r.total > 0)
				.sort((a, b) => (a.percent ?? 0) - (b.percent ?? 0))[0]?.skill ?? null,
		focus: proficiencyProfiles[level].focus,
		dailyPlan: proficiencyProfiles[level].dailyPlan,
		todayTip: getDailyTip(level, now),
	};
}
