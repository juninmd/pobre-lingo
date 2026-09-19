import { expect, type Page, type Route, test } from "@playwright/test";

/**
 * Leitor livre: colar texto, ler com palavras clicáveis, marcar "Já sei",
 * concluir a leitura, e importar um artigo da Wikipedia (API mockada).
 */

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("vite-ui-theme", "pobre-lingo");
		localStorage.setItem("pobrelingo_onboarded", "true");
	});
});

const ARTICLE_TITLE = "Mock Test Article";
const ARTICLE_TEXT = "This is a mock article for testing the library reader.";

async function mockWikipedia(page: Page) {
	await page.route("**/w/api.php**", async (route: Route) => {
		const url = new URL(route.request().url());
		if (url.searchParams.get("generator") === "random") {
			await route.fulfill({
				json: {
					query: {
						pages: [{ title: ARTICLE_TITLE, length: ARTICLE_TEXT.length }],
					},
				},
			});
			return;
		}
		if (url.searchParams.get("list") === "search") {
			await route.fulfill({
				json: {
					query: {
						search: [{ title: ARTICLE_TITLE, snippet: "A mock <b>result</b>" }],
					},
				},
			});
			return;
		}
		await route.fulfill({
			json: {
				query: {
					pages: [
						{
							title: ARTICLE_TITLE,
							extract: ARTICLE_TEXT,
							fullurl: `https://simple.wikipedia.org/wiki/${ARTICLE_TITLE}`,
						},
					],
				},
			},
		});
	});
}

test("colar texto, ler, marcar palavra e concluir a leitura", async ({
	page,
}) => {
	await page.goto("/library");
	await expect(
		page.getByRole("heading", { name: "Leitor livre" }),
	).toBeVisible();

	await page
		.getByLabel("Texto para importar")
		.fill("The quick brown fox jumps over the lazy dog.");
	await page.getByRole("button", { name: "Importar" }).click();

	await expect(page).toHaveURL(/\/library\/.+/);
	// Forma flexionada: o léxico precisa achar o lema "jump" e traduzir.
	const word = page.getByRole("button", { name: "jumps", exact: true });
	await word.click();
	const popover = page.getByRole("dialog");
	await expect(popover.getByText("pular")).toBeVisible();
	await popover.getByRole("button", { name: "Já sei" }).click();
	await expect(
		popover.getByRole("button", { name: "Conhecida" }),
	).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(word).toHaveAttribute("data-known", "true");
	expect(
		await page.evaluate(() => localStorage.getItem("pobrelingo_known_words")),
	).toContain("jump");

	await page.getByRole("button", { name: "Terminei a leitura" }).click();
	await expect(page.getByText(/palavras lidas/)).toBeVisible();
});

test("importa artigo da Wikipedia (API mockada)", async ({ page }) => {
	await mockWikipedia(page);
	await page.goto("/library");

	await page.getByRole("tab", { name: "Wikipedia" }).click();
	await page.getByRole("button", { name: "Artigo aleatório" }).click();

	await expect(page).toHaveURL(/\/library\/.+/);
	await expect(
		page.getByRole("heading", { name: ARTICLE_TITLE }),
	).toBeVisible();
	await expect(page.getByText(/Simple English Wikipedia/)).toBeVisible();
});

test("busca artigo da Wikipedia e importa pelo resultado", async ({ page }) => {
	await mockWikipedia(page);
	await page.goto("/library");

	await page.getByRole("tab", { name: "Wikipedia" }).click();
	await page.getByLabel("Buscar artigo na Wikipedia").fill("mock");
	await page.getByRole("button", { name: "Buscar" }).click();

	await page.getByRole("button", { name: new RegExp(ARTICLE_TITLE) }).click();
	await expect(page).toHaveURL(/\/library\/.+/);
	await expect(
		page.getByRole("heading", { name: ARTICLE_TITLE }),
	).toBeVisible();
});
