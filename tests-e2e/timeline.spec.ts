import { expect, test } from "@playwright/test";

test.describe("Learning Timeline", () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem("pobrelingo_onboarded", "true");
		});
		// Go to home page where the timeline is
		await page.goto("/");
	});

	test("should render the timeline structure", async ({ page }) => {
		// Verify "Sua Jornada" or similar title is present
		await expect(
			page
				.getByRole("heading", { name: "My Journey" })
				.or(page.getByRole("heading", { name: "Sua Jornada" })),
		).toBeVisible();

		// Verify at least one Unit title is visible (e.g. Unit 1)
		await expect(page.getByText("Capítulo 1: Primeiros Passos")).toBeVisible();
	});

	test("should adapt to mobile layout", async ({ page, isMobile }) => {
		if (isMobile) {
			// Check if main container has padding/margins
			await expect(page.locator(".max-w-2xl").first()).toBeVisible();
		}
	});

	test("should visually emphasize the active lesson bookmark", async ({
		page,
	}) => {
		// Find the first available lesson which has the animate-pulse class
		const activeLesson = page.locator(".animate-pulse").first();
		await expect(activeLesson).toBeVisible();
	});

	test("should navigate directly to lesson when clicking a lesson link", async ({
		page,
	}) => {
		// Find a direct lesson link within the new TimelineModule
		// Because of lazy loading, we wait for a lesson link to appear
		const lessonLink = page
			.locator(
				'a[href*="/vocabulary/"], a[href*="/exercises/"], a[href*="/quiz/"], a[href*="/rules"]',
			)
			.first();

		// Wait for lazy loaded elements
		await lessonLink.waitFor({ state: "visible", timeout: 5000 });

		if (await lessonLink.isVisible()) {
			const href = await lessonLink.getAttribute("href");

			// Check if it's not locked
			const classes = await lessonLink.getAttribute("class");
			if (classes && classes.includes("cursor-not-allowed")) {
				console.log("First link is locked, skipping navigation assertion.");
				return;
			}

			await lessonLink.click();
			// Verify URL - checking path prefix mostly
			const expectedPath = href!.split("?")[0];
			await expect(page).toHaveURL(new RegExp(expectedPath));
		}
	});
});
