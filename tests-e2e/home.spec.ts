import { expect, test } from "@playwright/test";

test.describe("Home Page - Learning Journey", () => {
	// Pula modal de onboarding caso exista para focar no teste da página principal
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.evaluate(() => {
			localStorage.setItem("pobrelingo_onboarded", "true");
		});
		await page.reload();
	});

	test("should render home properly and display desktop layout", async ({
		page,
	}) => {
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

	test("should adapt to mobile layout", async ({ page }) => {
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

		// Procura pelo texto "Onde parei"
		const bookmark = page.locator('text="Onde parei"').first();
		await expect(bookmark).toBeVisible();

		// Verifica se o card da lição ativa tem o botão DISPONÍVEL
		const startButton = page.locator('text="DISPONÍVEL"').first();
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
