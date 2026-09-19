import { describe, expect, it } from "vitest";
import { curriculumData } from "@/lib/curriculumData";
import { gradedReaders } from "@/lib/gradedReaders";
import { tracks } from "@/lib/tracks";

const lessonIds = new Set(
	curriculumData.modules.flatMap((m) =>
		m.lessons.map((l) => `${m.id}:${l.id}`),
	),
);
const readerIds = new Set(gradedReaders.map((r) => r.id));

describe("tracks", () => {
	it("has two tracks: viagem and trabalho", () => {
		expect(tracks.map((t) => t.id).sort()).toEqual(["trabalho", "viagem"]);
	});

	for (const track of tracks) {
		describe(`track: ${track.id}`, () => {
			it("has at least 10 steps", () => {
				expect(track.steps.length).toBeGreaterThanOrEqual(10);
			});

			it("has no duplicate step ids", () => {
				const ids = track.steps.map((s) => s.id);
				expect(new Set(ids).size).toBe(ids.length);
			});

			it("every step has a non-empty title and href", () => {
				for (const step of track.steps) {
					expect(step.title.length).toBeGreaterThan(0);
					expect(step.href.length).toBeGreaterThan(0);
				}
			});

			it("every lesson step points to a real curriculum lesson", () => {
				for (const step of track.steps.filter((s) => s.kind === "lesson")) {
					expect(step.moduleId).toBeTruthy();
					expect(step.lessonId).toBeTruthy();
					expect(lessonIds.has(`${step.moduleId}:${step.lessonId}`)).toBe(true);
				}
			});

			it("every reader step points to a real graded reader", () => {
				for (const step of track.steps.filter((s) => s.kind === "reader")) {
					expect(step.readerId).toBeTruthy();
					expect(readerIds.has(step.readerId as string)).toBe(true);
				}
			});

			it("every rule/pronunciation/tutor step has a valid href shape", () => {
				for (const step of track.steps) {
					if (step.kind === "rule") {
						expect(step.href).toMatch(/^\/rules\?ruleIds=/);
					}
					if (step.kind === "pronunciation") {
						expect(step.href).toBe("/pronunciation");
					}
					if (step.kind === "tutor") {
						expect(step.href).toMatch(/^\/tutor\?scenario=/);
					}
				}
			});
		});
	}
});
