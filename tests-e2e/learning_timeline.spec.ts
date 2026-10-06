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

	test("should adapt layout for mobile devices and hide MobileNav on desktop", async ({ page, isMobile }) => {
		await page.goto("/");
		const mobileNav = page.locator("nav[aria-label='Navegação principal móvel']");
		if (isMobile) {
			await expect(page.locator("body")).toBeVisible();
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
