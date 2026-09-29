import { test, expect } from '@playwright/test';

test.describe('Home / Interactive Journey Book', () => {
  test('should render the timeline structure successfully', async ({ page }) => {
    await page.goto('/');

	test("should render home properly and display desktop layout", async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, "Desktop only test");

		// Define resolução desktop
		await page.setViewportSize({ width: 1280, height: 720 });

		const sidebarContainer = page.locator(".hidden.md\\:flex.border-r");
		await expect(sidebarContainer).toBeVisible();

  test('should not show legacy MobileNav component on desktop', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Reason: Only applicable to desktop');
    await page.goto('/');

	test("should adapt to mobile layout", async ({ page, isMobile }) => {
		test.skip(!isMobile, "Mobile only test");

		// Define resolução mobile
		await page.setViewportSize({ width: 375, height: 812 });

		// O Sidebar deve estar oculto
		const sidebarContainer = page.locator(".hidden.md\\:flex.border-r");
		await expect(sidebarContainer).toBeHidden();

		// O MobileNav deve estar visível
		const mobileNav = page.locator(".md\\:hidden.fixed.bottom-0");
		await expect(mobileNav).toBeVisible();
	});

	test("should display the bookmark (Onde parei) on active lesson and navigate to it", async ({
		page,
	}) => {
		// Espera a página carregar
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });
		await expect(page.locator(".max-w-2xl").first()).toBeVisible();

		// Procura pelo texto "Onde parei"
		const bookmark = page
			.locator(".max-w-2xl")
			.locator('text="Onde parei"')
			.first();
		await expect(bookmark).toBeVisible();

		// Verifica se o card da lição ativa tem o botão DISPONÍVEL
		const startButton = page
			.locator(".max-w-2xl")
			.locator('text="DISPONÍVEL"')
			.first();
		await expect(startButton).toBeVisible();

		// Clica na lição ativa para verificar a navegação
		await startButton.click({ force: true });

		await expect(async () => {
			expect(
				page.url().includes("/vocabulary/") ||
					page.url().includes("/quiz/") ||
					page.url().includes("/grammar/") ||
					page.url().includes("/speaking/"),
			).toBeTruthy();
		}).toPass({ timeout: 5000 });
	});
});
