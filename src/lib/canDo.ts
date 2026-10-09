import type { CEFRLevel } from "./curriculumData";
import { canDoStatements } from "./levelCheckpoints";
import { CEFR_ORDER } from "./levels";

export interface CanDoState {
	checked: string[];
	passed: CEFRLevel[];
}
export const CAN_DO_KEY = "pobrelingo_cando";
const statementIds = new Set(
	Object.values(canDoStatements)
		.flat()
		.map((item) => item.id),
);

export function readCanDo(value: unknown): CanDoState {
	if (!value || typeof value !== "object") return { checked: [], passed: [] };
	const state = value as CanDoState;
	return {
		checked: Array.isArray(state.checked)
			? [
					...new Set(
						state.checked.filter(
							(id) => typeof id === "string" && statementIds.has(id),
						),
					),
				]
			: [],
		passed: Array.isArray(state.passed)
			? [...new Set(state.passed.filter((level) => CEFR_ORDER.includes(level)))]
			: [],
	};
}
