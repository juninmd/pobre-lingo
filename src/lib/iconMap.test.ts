import { CircleHelp, Drama } from "lucide-react";
import { describe, expect, it } from "vitest";
import { ACHIEVEMENTS_LIST } from "@/contexts/GamificationContext";
import { curriculumData } from "./curriculumData";
import { getIcon, hasIcon } from "./iconMap";

describe("iconMap", () => {
	// A new icon name in data must be registered, or users silently see a "?".
	it("resolves every module icon used by the curriculum", () => {
		const missing = [
			...new Set(curriculumData.modules.map((m) => m.icon)),
		].filter((name) => !hasIcon(name));
		expect(missing).toEqual([]);
	});

	it("resolves every achievement icon", () => {
		const missing = ACHIEVEMENTS_LIST.map((a) => a.icon).filter(
			(name) => !hasIcon(name),
		);
		expect(missing).toEqual([]);
	});

	it("returns a real icon for known names and the fallback otherwise", () => {
		expect(getIcon("Rocket")).not.toBe(CircleHelp);
		expect(getIcon("NoSuchIcon")).toBe(CircleHelp);
		expect(getIcon("NoSuchIcon", Drama)).toBe(Drama);
	});

	it("does not resolve inherited object keys as icons", () => {
		expect(hasIcon("constructor")).toBe(false);
		expect(getIcon("toString")).toBe(CircleHelp);
	});
});
