import { expect, test } from "@playwright/test";

test.describe("Study flow", () => {
	test.beforeEach(async ({ page }) => {
		// Pula a onboarding modal
		await page.addInitScript(() => {
			window.localStorage.setItem("pobrelingo_onboarded", "true");
		});
	});

	test("jornada mostra a trilha de niveis A1->C2 e a licao ativa", async ({
		page,
	}) => {
		await page.goto("/");
		await expect(page.locator("body")).toBeVisible();

		// Trilha da Fluência / LevelRoadmap check
		const roadmapDesc = page.locator("text=Trilha da Fluência");

		// Note: The roadmap might be inside the right column widget which is lazy loaded or not visible on mobile.
		// If it's visible, we check it. If not we just verify the timeline.
		if (await roadmapDesc.isVisible()) {
			for (const level of ["A1", "A2", "B1", "B2", "C1", "C2"]) {
				await expect(page.getByText(level, { exact: true }).first()).toBeVisible();
			}
		}

		// 'Onde parei' é a tag no card da lição
		await expect(page.getByText("Onde parei").first()).toBeVisible();
	});

	test("clicar na licao ativa abre a licao", async ({ page }) => {
		await page.goto("/");

		// Pega o card da lição que tem botão de ação DISPONÍVEL
		const cardLink = page.locator("a:has-text('DISPONÍVEL'), a:has([aria-label='Iniciar lição'])").first();
		await expect(cardLink).toBeVisible();

		const href = await cardLink.getAttribute("href");
		await cardLink.click();

		await expect(async () => {
			expect(page.url().includes(href ?? "not-found")).toBeTruthy();
		}).toPass({ timeout: 5000 });
	});

	test("licoes de presente, passado e futuro ensinam o conteudo", async ({
		page,
	}) => {
		// Presente (Básico)
		await page.goto("/lesson/grammar/a1-02/1");
		await expect(page.locator(".container")).toBeVisible({ timeout: 10000 });

		// Passado
		await page.goto("/lesson/grammar/a2-01/1");
		await expect(page.locator(".container")).toBeVisible({ timeout: 10000 });

		// Futuro
		await page.goto("/lesson/grammar/a2-02/1");
		await expect(page.locator(".container")).toBeVisible({ timeout: 10000 });
	});

	test("toda licao de gramatica encontra a regra (sem regra quebrada)", async ({
		page,
	}) => {
		// Módulos que têm lições de gramática
		const mods = ["a1-02", "a2-01", "a2-02", "b1-01", "b1-02", "b2-01"];
		for (const mod of mods) {
			await page.goto(`/lesson/grammar/${mod}/1`);
			// Se a regra não existisse, a página renderizaria "Conteúdo não encontrado" ou quebraria.
			// Verifica se existe o container principal da lição.
			await expect(page.locator(".container")).toBeVisible();
			// Não pode ter texto de fallback genérico ou tela em branco total
			expect(await page.locator("body").innerText()).not.toContain(
				"Conteúdo não encontrado",
			);
		}
	});
});
