import { describe, expect, it } from "vitest";
import { coreVocabulary } from "@/lib/coreVocabulary";
import { curriculumData } from "@/lib/curriculumData";
import * as exerciseData from "@/lib/exerciseData";
import { gradedReaders } from "@/lib/gradedReaders";
import { grammarCategories } from "@/lib/grammarRules";
import { quizData } from "@/lib/quizData";

// Level modules (a1-01 ... c2-05). The index*.ts files only aggregate them.
const levelModulePattern = /\/[a-c][12]-\d{2}\.ts$/;
const readerModules = import.meta.glob<Record<string, unknown>>(
	"/src/lib/readers/*.ts",
	{ eager: true },
);
const vocabModules = import.meta.glob<Record<string, unknown>>(
	"/src/lib/vocab/*.ts",
	{ eager: true },
);

type IdEntry = { id: string };

function levelModules(modules: Record<string, Record<string, unknown>>) {
	return Object.entries(modules)
		.filter(([path]) => levelModulePattern.test(path))
		.map(([path, mod]) => ({
			name: path.split("/").pop() ?? path,
			entries: Object.values(mod).flatMap((value) =>
				Array.isArray(value) ? (value as IdEntry[]) : [],
			),
		}));
}

function collectGrammarRuleRefs(node: unknown, refs: string[] = []): string[] {
	if (Array.isArray(node)) {
		for (const item of node) collectGrammarRuleRefs(item, refs);
	} else if (node && typeof node === "object") {
		for (const [key, value] of Object.entries(node)) {
			if (key === "grammarRuleIds" && Array.isArray(value)) {
				refs.push(...(value as string[]));
			} else {
				collectGrammarRuleRefs(value, refs);
			}
		}
	}
	return refs;
}

function duplicates(ids: string[]): string[] {
	return ids.filter((id, index) => ids.indexOf(id) !== index);
}

describe("content wiring: graded readers", () => {
	const modules = levelModules(readerModules);
	const combined = new Set<unknown>(gradedReaders);

	it("finds the reader level modules", () => {
		expect(modules.length).toBeGreaterThan(0);
	});

	for (const mod of modules) {
		it(`${mod.name} contributes its readers to gradedReaders`, () => {
			expect(mod.entries.length).toBeGreaterThan(0);
			const missing = mod.entries
				.filter((reader) => !combined.has(reader))
				.map((reader) => reader.id);
			expect(missing).toEqual([]);
		});
	}

	it("reader ids are unique", () => {
		expect(duplicates(gradedReaders.map((r) => r.id))).toEqual([]);
	});
});

describe("content wiring: core vocabulary", () => {
	const modules = levelModules(vocabModules);
	const combined = new Set<unknown>(coreVocabulary);

	it("finds the vocab level modules", () => {
		expect(modules.length).toBeGreaterThan(0);
	});

	for (const mod of modules) {
		it(`${mod.name} contributes its entries to coreVocabulary`, () => {
			expect(mod.entries.length).toBeGreaterThan(0);
			const missing = mod.entries
				.filter((word) => !combined.has(word))
				.map((word) => word.id);
			expect(missing).toEqual([]);
		});
	}

	it("entry ids are unique within coreVocabulary", () => {
		expect(duplicates(coreVocabulary.map((w) => w.id))).toEqual([]);
	});
});

describe("content wiring: curriculum quizzes", () => {
	const lessons = curriculumData.modules.flatMap((m) =>
		m.lessons.map((l) => ({ moduleId: m.id, ...l })),
	);
	const quizLessons = lessons.filter((l) => l.type === "quiz");

	it("curriculum lesson ids are unique", () => {
		expect(duplicates(lessons.map((l) => l.id))).toEqual([]);
	});

	it("every quiz lesson resolves to a quizData bank with questions", () => {
		expect(quizLessons.length).toBeGreaterThan(0);
		const empty = quizLessons
			.filter((l) => (quizData[l.id]?.length ?? 0) === 0)
			.map((l) => `${l.moduleId}:${l.id}`);
		expect(empty).toEqual([]);
	});

	it("every quiz question's correctAnswer indexes one of its options", () => {
		const invalid = Object.entries(quizData).flatMap(([key, questions]) =>
			questions
				.filter(
					(q) =>
						!Number.isInteger(q.correctAnswer) ||
						q.correctAnswer < 0 ||
						q.correctAnswer >= q.options.length,
				)
				.map((q) => `${key}: ${q.question}`),
		);
		expect(invalid).toEqual([]);
	});
});

describe("content wiring: exercise grammar references", () => {
	const ruleIds = new Set(
		grammarCategories.flatMap((c) => c.rules.map((r) => r.id)),
	);
	const refs = collectGrammarRuleRefs(exerciseData);

	it("exerciseData.ts references grammar rules", () => {
		expect(refs.length).toBeGreaterThan(0);
	});

	it("every grammarRuleIds value in exerciseData.ts exists in grammarRules.ts", () => {
		expect(refs.filter((id) => !ruleIds.has(id))).toEqual([]);
	});
});
