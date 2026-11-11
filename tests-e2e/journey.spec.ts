import { expect, test } from "@playwright/test";

test.describe("Learning Journey - Interactive Book Interface", () => {
	test.beforeEach(async ({ page }) => {
		// Pula a onboarding modal para interagir com o dashboard direto
		await page.addInitScript(() => {
			window.localStorage.setItem("pobrelingo_onboarded", "true");
		});
	});

	test("shows the four tabs as a rail on desktop", async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, "Desktop only layout");
		await page.goto("/");

		const nav = page.getByRole("navigation", { name: "Menu principal" });
		await expect(nav).toBeVisible();
		for (const tab of ["Hoje", "Aprender", "Jogar", "Eu"]) {
			await expect(nav.getByRole("link", { name: tab })).toBeVisible();
		}
		const box = await nav.boundingBox();
		expect(box?.width ?? 999).toBeLessThan(120);
		await expect(page.getByRole("button", { name: "Alternar menu" })).toHaveCount(0);
	});

	test("shows the four tabs as a bottom bar on mobile", async ({
		page,
		isMobile,
	}) => {
		test.skip(!isMobile, "Mobile only layout");
		await page.goto("/");

		const nav = page.getByRole("navigation", { name: "Menu principal" });
		const viewport = page.viewportSize();
		const box = await nav.boundingBox();
		expect(box?.width).toBeGreaterThanOrEqual((viewport?.width ?? 0) - 1);
		expect((box?.y ?? 0) + (box?.height ?? 0)).toBeGreaterThanOrEqual((viewport?.height ?? 0) - 1);

		await nav.getByRole("link", { name: "Aprender" }).click();
		await expect(page).toHaveURL(/\/learn$/);
		await expect(page.getByRole("heading", { name: "Sua Jornada" })).toBeVisible();
	});

	test("should display 'Onde parei' bookmark and navigate to active lesson", async ({
		page,
	}) => {
		await page.goto("/learn");

		// Espera a timeline ser renderizada (substitui o antigo LessonMap)
		const timeline = page.locator(".max-w-2xl").first();
		await expect(timeline).toBeVisible();

		const bookmark = page.getByText("Onde parei").first();
		await expect(bookmark).toBeVisible();

		// Pega o card da lição ativa e clica nele
		const cardLink = page
			.locator("a:has-text('DISPONÍVEL'), a:has([aria-label='Iniciar lição'])")
			.first();
		await expect(cardLink).toBeVisible();

		const href = await cardLink.getAttribute("href");
		await cardLink.click();

		await expect(async () => {
			expect(page.url().includes(href ?? "not-found")).toBeTruthy();
		}).toPass({ timeout: 5000 });
	});
});
