import { expect, type Page, test } from "@playwright/test";

/**
 * Fluxos das melhorias do benchmark: painel sem widgets falsos, cofre com
 * paginação e revisão, backup restaurável, tutor de IA local, pronúncia,
 * trilhas por objetivo, conversas por cenário e nivelamento adaptativo.
 */

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("vite-ui-theme", "pobre-lingo");
		localStorage.setItem("pobrelingo_onboarded", "true");
	});
});

const readStorage = (page: Page, key: string) =>
	page.evaluate((k) => localStorage.getItem(k), key);

test("painel: só práticas reais, sem widgets simulados", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByText("Pratique além da trilha")).toBeVisible();
	await expect(page.getByText(/Tendências 2025/)).toHaveCount(0);
	await page
		.getByRole("link", { name: /Tutor de conversa/ })
		.first()
		.click();
	await expect(page).toHaveURL(/\/tutor/);
});

test("cofre: busca, paginação e envio para revisão", async ({ page }) => {
	await page.goto("/vocabulary");
	await expect(
		page.getByRole("button", { name: /Mostrar mais/ }),
	).toBeVisible();
	await page.getByRole("searchbox", { name: "Buscar palavra" }).fill("give");
	await expect(
		page.getByRole("heading", { name: "give", exact: true }),
	).toBeVisible();
	await page.getByRole("button", { name: 'Revisar "give" depois' }).click();
	await expect(
		page.getByRole("button", { name: 'Revisar "give" depois' }),
	).toBeDisabled();
	expect(await readStorage(page, "pobrelingo_srs_cards")).toContain(
		"core-give",
	);
});

test("configurações: restaura backup válido e recusa arquivo estranho", async ({
	page,
}) => {
	await page.goto("/settings");
	const fileInput = page.getByLabel("Arquivo de backup");
	await fileInput.setInputFiles({
		name: "ruim.json",
		mimeType: "application/json",
		buffer: Buffer.from('{"theme":"dark"}'),
	});
	await expect(page.getByRole("alert")).toContainText("Entrada inválida");

	await fileInput.setInputFiles({
		name: "backup.json",
		mimeType: "application/json",
		buffer: Buffer.from('{"pl_xp":"777"}'),
	});
	await expect(page).toHaveURL(/\/$/);
	expect(await readStorage(page, "pl_xp")).toBe("777");
});

test("tutor: explica quando o aparelho não roda IA local", async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(Navigator.prototype, "gpu", { get: () => undefined });
		Object.assign(window, { LanguageModel: undefined, Translator: undefined });
	});
	await page.goto("/tutor");
	await expect(
		page.getByText("Seu navegador ainda não roda IA local"),
	).toBeVisible();
});

test("tutor: conversa com a IA embutida e mostra a correção", async ({
	page,
}) => {
	await page.addInitScript(() => {
		const session = {
			async *promptStreaming() {
				yield "Great! How many nights will you stay?";
				yield "\nTIP: Say 'I have a reservation'.";
			},
			prompt: async () => "",
			destroy() {},
		};
		Object.assign(window, {
			Translator: undefined,
			LanguageModel: {
				availability: async () => "available",
				create: async () => session,
			},
		});
	});
	await page.goto("/tutor?scenario=hotel-checkin");
	await page.getByRole("button", { name: "Começar conversa" }).click();
	await expect(page.getByText(/Welcome to the Riverside Hotel/)).toBeVisible();
	await page.getByLabel("Sua resposta em inglês").fill("I have reservation");
	await page.getByRole("button", { name: "Enviar" }).click();
	await expect(
		page.getByText("Great! How many nights will you stay?"),
	).toBeVisible();
	await expect(page.getByText("Say 'I have a reservation'.")).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/feat-tutor.png" });
});

test("pronúncia: abre um foco e começa pela discriminação auditiva", async ({
	page,
}) => {
	await page.goto("/pronunciation");
	await page.getByRole("button", { name: /TH/ }).first().click();
	await expect(
		page.getByRole("button", { name: "Ouvir palavra" }),
	).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/feat-pronunciation.png" });
});

test("trilhas: viagem e trabalho com próximo passo", async ({ page }) => {
	await page.goto("/tracks");
	await expect(page.getByText("Próximo passo").first()).toBeVisible();
	await page.getByRole("tab", { name: /Trabalho/ }).click();
	await expect(
		page.getByRole("tabpanel").getByRole("link").first(),
	).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/feat-tracks.png" });
});

test("conversa guiada abre direto pelo cenário da trilha", async ({ page }) => {
	await page.goto("/exercises/conversation?scenario=hotel-checkin");
	await expect(
		page.getByText("Welcome! Do you have a reservation?"),
	).toBeVisible();
});

test("nivelamento adaptativo termina e indica por onde começar", async ({
	page,
}) => {
	await page.goto("/proficiency");
	await page.getByRole("button", { name: "Começar checagem de conteúdo" }).click();
	const next = page.getByRole("button", { name: /^(Próxima|Finalizar)$/ });
	const skip = page.getByRole("button", { name: /pular sem avaliar/ });
	for (let i = 0; i < 25 && (await next.isVisible()); i++) {
		if (await skip.isVisible()) {
			await skip.click();
			continue;
		}
		await page.getByRole("radio").first().click();
		await next.click();
	}
	await expect(
		page.getByRole("link", { name: "Revisar conteúdo sugerido" }),
	).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/feat-placement.png" });
});
