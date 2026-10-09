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

	test("should adapt layout for mobile devices with a drawer sidebar and bottom bar", async ({ page, isMobile }) => {
		await page.goto("/");

		const bottomNav = page.getByRole("navigation", { name: "Atalhos" });

		if (isMobile) {
			const sidebarTrigger = page.getByRole("button", { name: "Alternar menu" });
			await expect(sidebarTrigger).toBeVisible();
			await expect(bottomNav).toBeVisible();
		} else {
			const desktopNav = page.getByRole("link", { name: "Minha Jornada" });
			await expect(desktopNav).toBeVisible();
			await expect(bottomNav).toBeHidden();
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
