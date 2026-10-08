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

	test("should render home properly and display desktop layout without old MobileNav", async ({
		page, isMobile
	}) => {
		test.skip(isMobile, "Desktop test only");

		await page.setViewportSize({ width: 1280, height: 720 });

		// Verify Sidebar link exists instead of specific hidden classes
		const sidebarLink = page.getByRole('link', { name: 'Minha Jornada' });
		await expect(sidebarLink).toBeVisible();

		// Old mobile nav should be gone
		const oldMobileNav = page.locator('.md\\:hidden.fixed.bottom-0');
		await expect(oldMobileNav).toHaveCount(0);
	});

	test("should break elegantly to mobile layout with unified sidebar trigger", async ({ page, isMobile }) => {
		test.skip(!isMobile, "Mobile test only");

		// Mobile should show a sidebar trigger
		const sidebarTrigger = page.getByRole("button", { name: "Toggle menu" });
		await expect(sidebarTrigger).toBeVisible();

		// Old MobileNav should not exist
		const oldMobileNav = page.locator('.md\\:hidden.fixed.bottom-0');
		await expect(oldMobileNav).toHaveCount(0);
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
