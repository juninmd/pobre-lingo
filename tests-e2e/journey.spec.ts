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

	test("should render home with the persistent sidebar and no bottom bar on desktop", async ({
		page, isMobile
	}) => {
		test.skip(isMobile, "Desktop test only");

		await page.setViewportSize({ width: 1280, height: 720 });

		const sidebarLink = page.getByRole('link', { name: 'Minha Jornada' });
		await expect(sidebarLink).toBeVisible();

		// The bottom bar is mobile-only: in the DOM but hidden from md up.
		const bottomNav = page.getByRole("navigation", { name: "Atalhos" });
		await expect(bottomNav).toBeHidden();
	});

	test("should use a drawer behind the menu trigger plus a bottom bar on mobile", async ({ page, isMobile }) => {
		test.skip(!isMobile, "Mobile test only");

		const sidebarTrigger = page.getByRole("button", { name: "Alternar menu" });
		await expect(sidebarTrigger).toBeVisible();

		// The sidebar is not pinned on mobile: content keeps the full width.
		const viewportWidth = page.viewportSize()?.width ?? 0;
		const mainBox = await page.locator("main").boundingBox();
		expect(mainBox?.width).toBeGreaterThanOrEqual(viewportWidth - 1);

		await expect(page.getByRole("navigation", { name: "Atalhos" })).toBeVisible();

		await sidebarTrigger.click();
		await expect(page.getByRole("dialog").getByRole("link", { name: "Minha Jornada" })).toBeVisible();
	});

	test("should display 'Onde parei' bookmark and navigate to active lesson", async ({
		page, isMobile
	}) => {
		test.skip(!isMobile, "Mobile test only");

		const timelineContainer = page.locator(".max-w-2xl").first();

		const bookmark = timelineContainer.locator('text="Onde parei"');
		await expect(bookmark).toBeVisible();

		// The "DISPONÍVEL" label is sm:inline only; on mobile the play icon is the visible control.
		const startButton = timelineContainer.getByLabel("Iniciar lição").first();
		await expect(startButton).toBeVisible();

		await startButton.click();

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
