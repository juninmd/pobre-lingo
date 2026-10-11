import { expect, test } from "@playwright/test";

test.describe("Learning Journey - Interactive Book Interface", () => {
	test.beforeEach(async ({ page }) => {
		// Pula a onboarding modal para interagir com o dashboard direto
		await page.addInitScript(() => {
			window.localStorage.setItem("pobrelingo_onboarded", "true");
		});
	});

	test("should render home with the persistent sidebar and no bottom bar on desktop", async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, "Desktop only layout");
		await page.goto("/");

		// The sidebar uses a `<nav>` with aria-label="Menu principal"
		const desktopNav = page.getByRole("navigation", { name: "Menu principal" });
		await expect(desktopNav).toBeVisible();

		// The header should have a menu trigger that is hidden on desktop via CSS,
		// but Playwright checks visibility.
		const sidebarTrigger = page.getByRole("button", { name: "Alternar menu" });
		await expect(sidebarTrigger).toBeHidden();

		// O bottom nav legacy deve estar oculto ou removido (já foi removido na refatoração)
		await expect(
			page.getByRole("navigation", { name: "Atalhos" }),
		).toBeHidden();
	});

	test("should use a drawer behind the menu trigger on mobile", async ({
		page,
		isMobile,
	}) => {
		test.skip(!isMobile, "Mobile only layout");
		await page.goto("/");

		const sidebarTrigger = page.getByRole("button", { name: "Alternar menu" });
		await expect(sidebarTrigger).toBeVisible();

		// Main content takes full width
		const mainArea = page.locator("main").first();
		const viewportWidth = page.viewportSize()?.width || 0;
		const mainBox = await mainArea.boundingBox();
		if (mainBox) {
			expect(mainBox.width).toBeGreaterThanOrEqual(viewportWidth - 1);
		}

		await sidebarTrigger.click();
		await expect(
			page.getByRole("dialog").getByRole("link", { name: "Minha Jornada" }),
		).toBeVisible();
	});

	test("should display 'Onde parei' bookmark and navigate to active lesson", async ({
		page,
	}) => {
		await page.goto("/");

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
