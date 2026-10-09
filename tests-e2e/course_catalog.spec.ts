import { expect, test } from "@playwright/test";
import { courseLessons } from "../src/lib/course/catalog";

test("all authored lessons work sequentially through C2", async ({ page }) => {
	test.setTimeout(120_000);
	await page.addInitScript(() =>
		localStorage.setItem("pobrelingo_onboarded", "true"),
	);
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto("/course/hello");
	for (const [index, lesson] of courseLessons.entries()) {
		await expect(
			page.getByRole("heading", { name: lesson.title, exact: true }),
		).toBeVisible();
		await page.getByRole("button", { name: "Praticar com ajuda" }).click();
		for (const question of [...lesson.practice, ...lesson.check]) {
			await page.locator("#course-answer").fill(question.answers[0]);
			await page.getByRole("button", { name: "Conferir resposta" }).click();
			await expect(
				page.getByText("Resposta correta!", { exact: true }),
			).toBeVisible();
			await page
				.getByRole("button", {
					name: /Próxima questão|Começar checagem|Ver resultado/,
				})
				.click();
		}
		await page.getByRole("button", { name: "Ir para a missão" }).click();
		await page
			.getByLabel("Minha produção em inglês")
			.fill(lesson.examples.map((example) => example.en).join(" "));
		await page
			.getByRole("button", { name: "Salvar produção e concluir aula" })
			.click();
		await expect(
			page.getByRole("heading", { name: "Aula concluída" }),
		).toBeVisible();
		if (index + 1 < courseLessons.length)
			await page
				.getByRole("link", {
					name: `Próxima aula: ${courseLessons[index + 1].title}`,
				})
				.click();
	}
	await page.reload();
	await expect(
		page.getByRole("heading", { name: "Aula concluída" }),
	).toBeVisible();
	await page.getByRole("link", { name: "Voltar ao plano do curso" }).click();
	await expect(page.getByText("14 de 14 aulas concluídas")).toBeVisible();
	expect(errors).toEqual([]);
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= window.innerWidth,
		),
	).toBe(true);
	await page.screenshot({
		path: `e2e-screenshots/course-plan-${test.info().project.name}.png`,
		fullPage: true,
	});
});
