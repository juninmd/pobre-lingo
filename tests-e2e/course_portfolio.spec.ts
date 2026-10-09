import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import { courseLessons } from "../src/lib/course/catalog";
import { PORTFOLIO_KEY } from "../src/lib/course/portfolio";

test.beforeEach(async ({ page }) => {
	const lesson = courseLessons[0];
	await page.addInitScript(
		({ practice, check }) => {
			localStorage.setItem("pobrelingo_onboarded", "true");
			localStorage.setItem(
				"pobrelingo_course_session_hello",
				JSON.stringify({ phase: "mission", cursor: 0, practice, check }),
			);
		},
		{
			practice: lesson.practice.map((q) => q.answers[0]),
			check: lesson.check.map((q) => q.answers[0]),
		},
	);
});

test("a failed portfolio save preserves the draft and keeps the next lesson locked", async ({
	page,
}) => {
	await page.goto("/course/hello");
	await page
		.getByLabel("Minha produção em inglês")
		.fill("Hello! My name is Lu.");
	await page.evaluate((key) => {
		const original = Storage.prototype.setItem;
		Storage.prototype.setItem = function (name, value) {
			if (name === key)
				throw new DOMException("Quota exceeded", "QuotaExceededError");
			return original.call(this, name, value);
		};
	}, PORTFOLIO_KEY);
	await page
		.getByRole("button", { name: "Salvar produção e concluir aula" })
		.click();
	await expect(
		page.getByRole("alert").filter({ hasText: "Não foi possível salvar" }),
	).toBeVisible();
	await expect(page.getByLabel("Minha produção em inglês")).toHaveValue(
		"Hello! My name is Lu.",
	);
	await page.goto("/course/help");
	await expect(
		page.getByRole("heading", { name: "Prepare-se para esta aula" }),
	).toBeVisible();
});

test("mission drafts resume and the portfolio can be downloaded", async ({
	page,
}) => {
	await page.goto("/course/hello");
	await page
		.getByLabel("Minha produção em inglês")
		.fill("Hello! My name is Lu.");
	await page
		.getByLabel("Dúvidas e pontos para melhorar (opcional)")
		.fill("Preciso repetir meet.");
	await page.reload();
	await expect(
		page.getByLabel("Dúvidas e pontos para melhorar (opcional)"),
	).toHaveValue("Preciso repetir meet.");
	await page
		.getByRole("button", { name: "Salvar produção e concluir aula" })
		.click();
	await page.getByRole("link", { name: "Ver meu portfólio" }).click();
	const title = page.getByRole("heading", {
		name: "Meu portfólio de comunicação",
	});
	await expect(title).toBeInViewport();
	const titleBounds = await title.boundingBox();
	expect(titleBounds?.y).toBeGreaterThanOrEqual(64);
	await expect(
		page.getByText("Hello! My name is Lu.", { exact: true }),
	).toBeVisible();
	const downloadPromise = page.waitForEvent("download");
	await page
		.getByRole("button", { name: "Baixar minhas produções (.txt)" })
		.click();
	const download = await downloadPromise;
	expect(download.suggestedFilename()).toBe("pobrelingo-portfolio.txt");
	expect(await download.failure()).toBeNull();
	const file = await download.path();
	expect(file).not.toBeNull();
	const content = await readFile(file as string, "utf8");
	expect(content).toContain("Hello! My name is Lu.");
	expect(content).toContain("Preciso repetir meet.");
	await page.screenshot({
		path: `e2e-screenshots/portfolio-${test.info().project.name}.png`,
		fullPage: true,
	});
});
