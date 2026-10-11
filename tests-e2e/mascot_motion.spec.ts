import { type CSSAnimation, expect, type Page, test } from "@playwright/test";

/**
 * The greeting mascot is excited: it hops, flaps and twinkles while motion is
 * allowed. With reduced motion it holds the still pose, both sparkles shown
 * and no animation running.
 */

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("pobrelingo_onboarded", "true");
		localStorage.setItem("vite-ui-theme", "light");
	});
});

const greetingMascot = (page: Page) =>
	page
		.getByRole("button", { name: "Coletar bônus diário de XP" })
		.locator("svg");

test("reduced motion: the still pose shows both sparkles and nothing animates", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/");
	const svg = greetingMascot(page);
	await expect(svg).toBeVisible();

	const state = await svg.evaluate((el) => {
		const opacity = (cls: string) =>
			getComputedStyle(el.querySelector(cls) as Element).opacity;
		return {
			animating: el
				.getAnimations({ subtree: true })
				.filter((a) => (a as CSSAnimation).animationName?.startsWith("pl-"))
				.length,
			twinkleB: opacity(".pl-twinkle-b"),
			eyesShut: opacity(".pl-eyes-shut"),
		};
	});
	expect(state).toEqual({ animating: 0, twinkleB: "1", eyesShut: "0" });
});

test("motion allowed: the excited mascot hops, flaps and twinkles", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "no-preference" });
	await page.goto("/");
	const svg = greetingMascot(page);
	await expect(svg).toBeVisible();

	const names = await svg.evaluate((el) =>
		el
			.getAnimations({ subtree: true })
			.map((a) => (a as CSSAnimation).animationName),
	);
	expect(names).toEqual(
		expect.arrayContaining(["pl-hop", "pl-first-half", "pl-second-half"]),
	);
});
