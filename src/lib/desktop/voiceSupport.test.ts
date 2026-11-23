import { describe, expect, it } from "vitest";
import { hasEnglishVoice } from "./voiceSupport";

describe("hasEnglishVoice", () => {
	it("detects en-* voices in any casing", () => {
		expect(hasEnglishVoice([{ lang: "pt-BR" }, { lang: "en-GB" }])).toBe(true);
		expect(hasEnglishVoice([{ lang: "EN_us".replace("_", "-") }])).toBe(true);
	});
	it("is false without English voices", () => {
		expect(hasEnglishVoice([{ lang: "pt-BR" }, { lang: "pt-PT" }])).toBe(false);
		expect(hasEnglishVoice([])).toBe(false);
	});
});
