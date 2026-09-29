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

		// O Sidebar deve estar visível e o MobileNav deve estar oculto
		const sidebar = page
			.locator("nav")
			.filter({ hasText: "Navegação" })
			.first(); // Ajustar se a sidebar usar outra label

		// Como a sidebar original no Layout usa `.hidden md:flex`, verificamos se está visível
		const sidebarLink = page.getByRole('link', { name: 'Minha Jornada' });
		await expect(sidebarLink).toBeVisible();

		// Mobile Nav tem a classe `md:hidden`, ou seja, não deve estar visível no desktop
		const mobileNav = page.locator(".md\\:hidden.fixed.bottom-0");
		await expect(mobileNav).toHaveCount(0);
	});

		// Define resolução mobile
		await page.setViewportSize({ width: 375, height: 812 });

		// A sidebar foi alterada para aparecer também em mobile através do drawer nativo do shadcn
		// Precisamos clicar no trigger do sidebar para ver o link
		const sidebarTrigger = page.getByRole('button', { name: 'Toggle menu' });
		await expect(sidebarTrigger).toBeVisible();
		await sidebarTrigger.click({ force: true });

		const sidebarLink = page.getByRole('link', { name: 'Minha Jornada' });
		await expect(sidebarLink).toBeVisible();

		// O MobileNav não deve mais existir
		const mobileNav = page.locator(".md\\:hidden.fixed.bottom-0");
		await expect(mobileNav).toHaveCount(0);
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
			// Get actual url
			const url = page.url();
			// Accept any actual lesson-like url
			expect(
				url.includes("/vocabulary/") || url.includes("/quiz/") || url.includes("/rules"),
			).toBeTruthy();
		}).toPass({ timeout: 5000 });
	});
});
