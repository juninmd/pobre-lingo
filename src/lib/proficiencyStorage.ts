import { CEFR_ORDER } from "./levels";
import { getLocalStorageItem, setLocalStorageItem } from "./localStorage";
import { proficiencyProfiles } from "./proficiencyProfiles";
import { type ProficiencyResult, SKILL_LABELS } from "./proficiencyTypes";

export const PROFICIENCY_RESULT_KEY = "pobrelingo_proficiency_result";

export function readProficiencyResult(
	value: unknown,
): ProficiencyResult | null {
	if (!value || typeof value !== "object") return null;
	const result = value as ProficiencyResult;
	if (
		result.version !== 2 ||
		result.basis !== "recognition" ||
		!CEFR_ORDER.includes(result.level)
	)
		return null;
	if (
		!Number.isInteger(result.total) ||
		result.total < 0 ||
		result.total > 100 ||
		!Number.isInteger(result.score) ||
		result.score < 0 ||
		result.score > result.total ||
		typeof result.date !== "string" ||
		!Number.isFinite(Date.parse(result.date))
	)
		return null;
	if (!Array.isArray(result.skillReports) || result.skillReports.length > 4)
		return null;
	const seen = new Set<string>();
	for (const report of result.skillReports) {
		if (
			!report ||
			!Object.hasOwn(SKILL_LABELS, report.skill) ||
			seen.has(report.skill) ||
			!Number.isInteger(report.total) ||
			report.total < 0 ||
			report.total > result.total ||
			!Number.isInteger(report.correct) ||
			report.correct < 0 ||
			report.correct > report.total ||
			report.percent !==
				(report.total
					? Math.round((report.correct / report.total) * 100)
					: null)
		)
			return null;
		seen.add(report.skill);
	}
	if (
		result.skillReports.reduce((sum, report) => sum + report.total, 0) !==
			result.total ||
		result.skillReports.reduce((sum, report) => sum + report.correct, 0) !==
			result.score
	)
		return null;
	const measured = result.skillReports.filter((report) => report.total > 0);
	const weakestSkill =
		measured.sort((a, b) => (a.percent ?? 0) - (b.percent ?? 0))[0]?.skill ??
		null;
	const profile = proficiencyProfiles[result.level];
	// Derive display text from the catalog; old exam mappings never enter the UI.
	return {
		version: 2,
		basis: "recognition",
		level: result.level,
		score: result.score,
		total: result.total,
		date: result.date,
		skillReports: result.skillReports,
		weakestSkill,
		focus: profile.focus,
		dailyPlan: profile.dailyPlan,
		todayTip: profile.tips[0],
	};
}

export function loadProficiencyResult() {
	return readProficiencyResult(
		getLocalStorageItem<unknown>(PROFICIENCY_RESULT_KEY, null),
	);
}

export function saveProficiencyResult(result: ProficiencyResult) {
	const validated = readProficiencyResult(result);
	if (!validated) return false;
	setLocalStorageItem(PROFICIENCY_RESULT_KEY, validated);
	return JSON.stringify(loadProficiencyResult()) === JSON.stringify(validated);
}
