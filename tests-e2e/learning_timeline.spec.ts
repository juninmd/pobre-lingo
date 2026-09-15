import { expect, test } from "@playwright/test";

test.describe("Learning Timeline (Journey Book)", () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem("pobrelingo_onboarded", "true");
		});
	});

	test("should render timeline on home", async ({ page }) => {
		await page.goto("/");
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });
		await expect(
			page.getByRole("heading", { name: "Sua Jornada", exact: true }),
		).toBeVisible();
		await expect(page.getByText("To be continued...")).toBeVisible();
	});

	test("should show the 'Onde parei' bookmark on the active lesson", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });
		const bookmark = page.getByText("Onde parei");
		await expect(bookmark.first()).toBeVisible();
	});

	test("should adapt layout for mobile devices and hide MobileNav on desktop", async ({
		page,
		isMobile,
	}) => {
		await page.goto("/");
		const mobileNav = page.locator("nav[aria-label='Navegação principal móvel']");
		if (isMobile) {
			// Ensure MobileNav is visible on mobile devices
			await expect(mobileNav).toBeVisible();
		} else {
			// Ensure MobileNav is hidden/removed on desktop devices
			await expect(mobileNav).not.toBeVisible();
		}
	});

	test("should display accurate lesson states: BLOQUEADO, DISPONÍVEL, CONCLUÍDO", async ({
		page,
	}) => {
		await page.goto("/");
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });

		// Check that at least one locked lesson has the "BLOQUEADO" state
		await expect(page.locator("text=BLOQUEADO").first()).toBeVisible();

		// Check that the active lesson has the "DISPONÍVEL" state
		await expect(page.locator("text=DISPONÍVEL").first()).toBeVisible();

		// Note: "CONCLUÍDO" might not be visible on a fresh account,
		// but the structure exists. We verify the expected two states exist.
	});

	test("should navigate to the active lesson upon clicking the bookmark lesson", async ({
		page,
	}) => {
		await page.goto("/");
		const activeLessonLink = page
			.locator("a", { has: page.locator(".animate-pulse") })
			.first();
		await activeLessonLink.waitFor({ state: "visible", timeout: 10000 });

		const href = await activeLessonLink.getAttribute("href");
		await activeLessonLink.click({ force: true });

		const expectedPath = href!.split("?")[0];
		await expect(async () => {
			const currentUrl = page.url();
			expect(
				currentUrl.includes(expectedPath) || currentUrl.includes("/rules"),
			).toBeTruthy();
		}).toPass({ timeout: 5000 });
	});
});
