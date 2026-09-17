import { expect, test } from "@playwright/test";

test.describe("Learning Journey - Interactive Book Interface", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.evaluate(() => {
			localStorage.setItem("pobrelingo_onboarded", "true");
		});
		await page.reload();
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });
	});

	test("should render home properly and display desktop layout without MobileNav", async ({
		page, isMobile
	}) => {
		test.skip(isMobile, "Desktop test only");

		await page.setViewportSize({ width: 1280, height: 720 });

		const sidebarContainer = page.locator('.hidden.md\\:flex.border-r').first();
		await expect(sidebarContainer).toBeVisible();

		const mobileNav = page.locator('.md\\:hidden nav');
		await expect(mobileNav).toBeHidden();
	});

	test("should break elegantly to mobile layout (stack vertical)", async ({ page, isMobile }) => {
		test.skip(!isMobile, "Mobile test only");

		const sidebarContainer = page.locator('.hidden.md\\:flex.border-r').first();
		await expect(sidebarContainer).toBeHidden();

		const mobileNav = page.locator('.md\\:hidden nav').first();
		await expect(mobileNav).toBeVisible();
	});

	test("should display 'Onde parei' bookmark and navigate to active lesson", async ({
		page, isMobile
	}) => {
		test.skip(!isMobile, "Mobile test only");

		const timelineContainer = page.locator(".max-w-2xl").first();

		const bookmark = timelineContainer.locator('text="Onde parei"');
		await expect(bookmark).toBeVisible();

		const startButton = timelineContainer.locator('text="DISPONÍVEL"').first();
		await expect(startButton).toBeVisible();

		await startButton.click({ force: true });

		await expect(async () => {
			expect(
				page.url().includes("/vocabulary/") ||
				page.url().includes("/quiz/") ||
				page.url().includes("/reading/") ||
				page.url().includes("/exercise/") ||
				page.url().includes("/speaking/")
			).toBeTruthy();
		}).toPass({ timeout: 5000 });
	});
});
