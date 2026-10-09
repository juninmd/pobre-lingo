import { expect, test } from "@playwright/test";

/**
 * Fluxos das novas vertentes (Nation): input extensivo, output escrito,
 * fluencia, vocabulario por frequencia e checkpoints por nivel.
 */

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("vite-ui-theme", "pobre-lingo");
		localStorage.setItem("pobrelingo_onboarded", "true");
	});
});

test("vocabulario: marcar palavra como conhecida", async ({ page }) => {
	await page.goto("/vocabulary");
	await expect(page.getByText("Vocabulário Essencial")).toBeVisible();

	const before = await page.getByRole("button", { name: /^Já sei/ }).count();
	await page
		.getByRole("button", { name: /^Já sei/ })
		.first()
		.click();
	const after = await page.getByRole("button", { name: /^Já sei/ }).count();
	expect(after).toBe(before - 1);
	await page.screenshot({ path: "e2e-screenshots/hub-vocabulary.png" });
});

test("leitura: concluir um texto graduado", async ({ page }) => {
	await page.goto("/reading/a1-my-morning");
	await expect(page.getByText("My Morning")).toBeVisible();
	await page.getByRole("button", { name: /Marcar como lido/ }).click();
	await expect(page).toHaveURL(/\/reading$/);
	await expect(page.getByText("Lido").first()).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/hub-reading.png" });
});

test("ditado: escrever a frase correta recebe feedback", async ({ page }) => {
	await page.goto("/writing");
	await page.locator("textarea").first().fill("I am a student.");
	await page.getByRole("button", { name: "Verificar" }).click();
	await expect(page.getByText("Perfeito!")).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/hub-dictation.png" });
});

test("fluencia: iniciar a rodada 4/3/2", async ({ page }) => {
	await page.goto("/fluency");
	await page.getByRole("button", { name: "Iniciar", exact: true }).click();
	await expect(page.getByText(/Rodada 1 de 3/)).toBeVisible();
	await page.waitForTimeout(1200);
	await page.screenshot({ path: "e2e-screenshots/hub-fluency.png" });
});

test("checkpoint: acertar tudo aprova o nivel A1", async ({ page }) => {
	await page.goto("/checkpoints");
	await page.getByRole("button", { name: "Fazer checagem A1" }).first().click();
	await page.getByRole("button", { name: "I am", exact: true }).click();
	await page.getByRole("button", { name: "drinks", exact: true }).click();
	await page
		.getByRole("button", { name: "There is a book.", exact: true })
		.click();
	await page.getByRole("button", { name: /Salvar checagem de conteúdo/ }).click();
	await expect(page.getByText("Checagem de conteúdo concluída").first()).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/hub-checkpoint.png" });
});
