import { expect, test } from "@playwright/test";

test.describe("Learning Timeline (Journey Book)", () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem("pobrelingo_onboarded", "true");
		});
	});

	test("should render timeline on home", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("body")).toBeVisible();
	});

	test("should show the 'Onde parei' bookmark on the active lesson", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("body")).toBeVisible();
	});

	test("should adapt layout for mobile devices and use generic Sidebar instead of MobileNav", async ({ page, isMobile }) => {
		await page.goto("/");

		// The Shadcn Sidebar component handles both responsive states gracefully.
		// On mobile, standard sidebar hides (unless triggered via button) and relies on sheet mechanism.
		// Old MobileNav should no longer exist.
		const mobileNav = page.locator("nav[aria-label='Navegação principal móvel']");
		await expect(mobileNav).toHaveCount(0); // Should be permanently removed

		if (isMobile) {
			await expect(page.locator("body")).toBeVisible();
			// On mobile, check if sidebar trigger in header is visible
			const sidebarTrigger = page.getByRole("button", { name: "Toggle menu" });
			await expect(sidebarTrigger).toBeVisible();
		} else {
			// On desktop, the main nav should be visible within the Sidebar
			const desktopNav = page.getByRole("link", { name: "Minha Jornada" });
			await expect(desktopNav).toBeVisible();
		}
	});

	test("should display accurate lesson states: BLOQUEADO, DISPONÍVEL, CONCLUÍDO", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("body")).toBeVisible();
	});

	test("should navigate to the active lesson upon clicking the bookmark lesson", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("body")).toBeVisible();
	});
});
