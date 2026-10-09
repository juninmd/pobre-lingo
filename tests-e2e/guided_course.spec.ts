import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() =>
		localStorage.setItem("pobrelingo_onboarded", "true"),
	);
});

test("complete a first lesson, restore it, and unlock the second", async ({
	page,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto("/course/hello");
	await expect(
		page.getByRole("heading", { name: "Seu primeiro diálogo", exact: true }),
	).toBeVisible();
	await page.getByRole("button", { name: "Praticar com ajuda" }).click();
	await page.getByLabel("Como você diz olá?").fill("bye");
	await page.getByRole("button", { name: "Conferir resposta" }).click();
	await expect(page.getByText("Vamos ajustar essa resposta.")).toBeVisible();
	await page.reload();
	await expect(page.getByText("Resposta esperada:")).toBeVisible();
	await page.getByRole("button", { name: "Próxima questão" }).click();
	await page.getByLabel("Complete: My ___ is Ana.").fill("name");
	await page.getByRole("button", { name: "Conferir resposta" }).click();
	await page.getByRole("button", { name: "Começar checagem" }).click();
	for (const answer of ["Hi!", "My name is Leo.", "meet"]) {
		await page.locator("#course-answer").fill(answer);
		await page.getByRole("button", { name: "Conferir resposta" }).click();
		await page
			.getByRole("button", { name: /Próxima questão|Ver resultado/ })
			.click();
	}
	await expect(
		page.getByRole("heading", { name: "Você lembrou sem ajuda" }),
	).toBeVisible();
	await page.getByRole("button", { name: "Ir para a missão" }).click();
	await expect(
		page.getByRole("button", { name: "Salvar produção e concluir aula" }),
	).toBeDisabled();
	await page
		.getByLabel("Minha produção em inglês")
		.fill("Hello! My name is Lu. Nice to meet you.");
	await page.reload();
	await expect(page.getByLabel("Minha produção em inglês")).toHaveValue(
		"Hello! My name is Lu. Nice to meet you.",
	);
	await page
		.getByRole("button", { name: "Salvar produção e concluir aula" })
		.click();
	await expect(
		page.getByRole("heading", { name: "Aula concluída" }),
	).toBeVisible();
	await page
		.getByRole("link", { name: "Próxima aula: Peça ajuda sem travar" })
		.click();
	await expect(
		page.getByRole("heading", { name: "Peça ajuda sem travar", exact: true }),
	).toBeVisible();
	await page.goto("/course/portfolio");
	await expect(
		page.getByText("Hello! My name is Lu. Nice to meet you.", { exact: true }),
	).toBeVisible();
	expect(errors).toEqual([]);
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= window.innerWidth,
		),
	).toBe(true);
});

test("locked and unknown lessons recover through the plan", async ({
	page,
}) => {
	await page.goto("/course/precision");
	await expect(
		page.getByRole("heading", { name: "Prepare-se para esta aula" }),
	).toBeVisible();
	await page.getByRole("link", { name: "Ver plano do curso" }).click();
	await expect(
		page.getByRole("heading", { name: "Seu curso guiado de inglês" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Estudar: Seu primeiro diálogo" }),
	).toBeVisible();
	await page.goto("/course/missing");
	await expect(
		page.getByRole("heading", { name: "Aula não encontrada" }),
	).toBeVisible();
});

test("wrong independent answers do not unlock the next lesson", async ({
	page,
}) => {
	await page.goto("/course/hello");
	await page.getByRole("button", { name: "Praticar com ajuda" }).click();
	for (const answer of ["hello", "name", "goodbye", "my name is Leo", "meet"]) {
		await page.locator("#course-answer").fill(answer);
		await page.getByRole("button", { name: "Conferir resposta" }).click();
		await page
			.getByRole("button", {
				name: /Próxima questão|Começar checagem|Ver resultado/,
			})
			.click();
	}
	await expect(
		page.getByRole("heading", { name: "Revise antes de avançar" }),
	).toBeVisible();
	await page.goto("/course/help");
	await expect(
		page.getByRole("heading", { name: "Prepare-se para esta aula" }),
	).toBeVisible();
});
