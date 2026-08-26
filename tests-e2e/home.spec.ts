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
		const sidebarContainer = page.locator(".hidden.md\\:flex.border-r");
		await expect(sidebarContainer).toBeVisible();

		// Mobile Nav tem a classe `md:hidden`, ou seja, não deve estar visível no desktop
		const mobileNav = page.locator(".md\\:hidden.fixed.bottom-0");
		await expect(mobileNav).toBeHidden();
	});

	test("should adapt to mobile layout", async ({ page }) => {
		// Define resolução mobile
		await page.setViewportSize({ width: 375, height: 812 });

		// O Sidebar deve estar oculto
		const sidebarContainer = page.locator(".hidden.md\\:flex.border-r");
		await expect(sidebarContainer).toBeHidden();

		// O MobileNav deve estar visível
		const mobileNav = page.locator(".md\\:hidden.fixed.bottom-0");
		await expect(mobileNav).toBeVisible();
	});

	test("should display the bookmark (Onde parei) on active lesson", async ({
		page,
	}) => {
		// Espera a página carregar
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });

		// Procura pelo texto "Onde parei"
		const bookmark = page.locator('text="Onde parei"').first();
		await expect(bookmark).toBeVisible();

		// Verifica se o card da lição ativa tem o botão COMEÇAR
		const startButton = page.locator('text="COMEÇAR"').first();
		await expect(startButton).toBeVisible();
	});
});
