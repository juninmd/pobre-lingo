import { expect, test } from "@playwright/test";
import { curriculumData } from "../src/lib/curriculumData";

/**
 * Fluxo de estudo: garante que a jornada, a trilha de niveis e as licoes de
 * gramatica funcionam de ponta a ponta, incluindo presente/passado/futuro.
 */

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("vite-ui-theme", "pobre-lingo");
		localStorage.setItem("pobrelingo_onboarded", "true");
	});
});

test("jornada mostra a trilha de niveis A1->C2 e a licao ativa", async ({
	page,
}) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { name: "Sua Jornada" })).toBeVisible({
		timeout: 10_000,
	});

	const roadmap = page.getByText("Trilha da Fluência").first();
	await expect(roadmap).toBeVisible();

	for (const level of ["A1", "A2", "B1", "B2", "C1", "C2"]) {
		await expect(page.getByText(level, { exact: true }).first()).toBeVisible();
	}

	await expect(page.getByText("Você está aqui").first()).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/flow-journey.png" });

	await page
		.locator("section.rounded-3xl")
		.first()
		.screenshot({ path: "e2e-screenshots/flow-roadmap.png" });

	const tensesModule = page
		.getByText("Verbos: Presente, Passado e Futuro")
		.first();
	await tensesModule.scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
	await page.screenshot({ path: "e2e-screenshots/flow-tenses-module.png" });
});

test("clicar na licao ativa abre a licao", async ({ page }) => {
	await page.goto("/");
	const activeLesson = page
		.locator('a[href="/vocabulary/foundations/alphabet-pronunciation"]')
		.first();
	await expect(activeLesson).toBeVisible({ timeout: 10_000 });
	await activeLesson.click();

	await expect(page).toHaveURL(/alphabet-pronunciation/);
	await expect(page.getByText(/Alfabeto/i).first()).toBeVisible();
	await page.screenshot({ path: "e2e-screenshots/flow-lesson-open.png" });
});

test("licoes de presente, passado e futuro ensinam o conteudo", async ({
	page,
}) => {
	const cases = [
		{
			id: "present-tenses-lesson",
			ruleIds: "present-tenses,present-simple,present-continuous",
			slug: "present-tenses",
			heading: /Presente: hábitos e agora/,
		},
		{
			id: "past-tenses-lesson",
			ruleIds: "past-tenses,past-simple,past-continuous",
			slug: "past-tenses",
			heading: /Passado: o que já aconteceu/,
		},
		{
			id: "future-tenses-lesson",
			ruleIds: "future-tenses,future-simple-will,future-simple-going-to",
			slug: "future-tenses",
			heading: /Futuro: will e going to/,
		},
	];

	for (const item of cases) {
		await page.goto(
			`/rules?module=verb-tenses&lesson=${item.id}&ruleIds=${item.ruleIds}`,
		);
		await page.waitForURL(new RegExp(`/rules/tempos-verbais/${item.slug}`), {
			timeout: 10_000,
		});
		await expect(page.getByRole("heading", { name: item.heading })).toBeVisible(
			{ timeout: 10_000 },
		);
		await page.screenshot({ path: `e2e-screenshots/flow-${item.id}.png` });
	}
});

const grammarLessons = curriculumData.modules.flatMap((module) =>
	module.lessons
		.filter(
			(lesson) => lesson.type === "grammar" && lesson.grammarRuleIds?.length,
		)
		.map((lesson) => ({
			moduleId: module.id,
			lessonId: lesson.id,
			ruleIds: (lesson.grammarRuleIds ?? []).join(","),
		})),
);

test("toda licao de gramatica encontra a regra (sem regra quebrada)", async ({
	page,
}) => {
	test.setTimeout(180_000);
	expect(grammarLessons.length).toBeGreaterThan(10);

	for (const lesson of grammarLessons) {
		await page.goto(
			`/rules?module=${lesson.moduleId}&lesson=${lesson.lessonId}&ruleIds=${lesson.ruleIds}`,
		);
		await expect(
			page.getByText("Nenhuma regra gramatical encontrada"),
		).toHaveCount(0);
		await expect(
			page.locator("h1, h2").filter({ visible: true }).first(),
		).toBeVisible({
			timeout: 10_000,
		});
	}
});
