import { describe, expect, it } from "vitest";
import { travelTrack, workTrack } from "@/lib/tracks";
import {
	buildTutorSystemPrompt,
	getScenario,
	parseTutorReply,
	TUTOR_SCENARIOS,
} from "./tutorPrompt";

describe("tutor prompt", () => {
	it("falls back to free conversation for unknown or missing scenarios", () => {
		expect(getScenario("does-not-exist").id).toBe("free");
		expect(getScenario(null).id).toBe("free");
	});

	it("offers every scenario the goal tracks link to", () => {
		const ids = TUTOR_SCENARIOS.map((s) => s.id);
		const linked = [...travelTrack.steps, ...workTrack.steps]
			.filter((step) => step.kind === "tutor")
			.map((step) =>
				new URL(step.href, "http://x").searchParams.get("scenario"),
			);
		expect(linked.length).toBeGreaterThan(0);
		expect(ids).toEqual(expect.arrayContaining(linked));
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("asks for corrections in Portuguese only when the model can write it", () => {
		const scenario = getScenario("restaurant");
		expect(buildTutorSystemPrompt(scenario, "A2", "Portuguese")).toContain(
			"Brazilian Portuguese",
		);
		expect(buildTutorSystemPrompt(scenario, "A2", "English")).not.toContain(
			"Portuguese",
		);
	});

	it("splits the character's line from the correction tip", () => {
		expect(
			parseTutorReply(
				"Sure, table for two?\nTIP: Diga 'I would like', não 'I want'.",
			),
		).toEqual({
			message: "Sure, table for two?",
			tip: "Diga 'I would like', não 'I want'.",
		});
	});

	it("returns no tip when the student made no mistake", () => {
		expect(parseTutorReply("Great! Where are you from?")).toEqual({
			message: "Great! Where are you from?",
			tip: null,
		});
		expect(parseTutorReply("Nice.\nTIP:   ").tip).toBeNull();
	});
});
