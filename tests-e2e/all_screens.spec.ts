import { expect, test } from "@playwright/test";

/**
 * Cobertura de telas: percorre TODAS as rotas do app, garante que a pagina
 * renderiza, que nenhum erro de JS nao capturado acontece e guarda um print
 * de cada tela em `e2e-screenshots/`.
 */

type Screen = { name: string; path: string; expect?: RegExp };

const SCREENS: Screen[] = [
	{ name: "01-home", path: "/", expect: /Sua Jornada|Minha Jornada/ },
	{ name: "02-arcade", path: "/arcade", expect: /Arcade/ },
	{ name: "03-game-bubble-pop", path: "/games/bubble-pop" },
	{ name: "04-game-speed-match", path: "/games/speed-match" },
	{ name: "05-game-memory-match", path: "/games/memory-match" },
	{ name: "06-game-word-scramble", path: "/games/word-scramble" },
	{ name: "07-game-flashcards", path: "/games/flashcards" },
	{ name: "08-game-word-search", path: "/games/word-search" },
	{ name: "09-game-sentence-rush", path: "/games/sentence-rush" },
	{ name: "10-game-hangman", path: "/games/hangman" },
	{ name: "11-dictionary", path: "/dictionary", expect: /Dicionário/ },
	{
		name: "12-vocabulary-lesson",
		path: "/vocabulary/foundations/alphabet-pronunciation",
		expect: /Alfabeto/,
	},
	{ name: "13-quiz-lesson", path: "/quiz/verb-tenses/tenses-quiz" },
	{ name: "14-proficiency", path: "/proficiency", expect: /Encontre um ponto de estudo|Nível|Teste/ },
	{ name: "15-ex-find-incorrect", path: "/exercises/find-incorrect-words" },
	{ name: "16-ex-news-comprehension", path: "/exercises/news-comprehension" },
	{
		name: "17-ex-sentence-identification",
		path: "/exercises/sentence-identification",
	},
	{ name: "18-ex-sentence-ordering", path: "/exercises/sentence-ordering" },
	{ name: "19-ex-matching-pairs", path: "/exercises/matching-pairs" },
	{ name: "20-ex-listening", path: "/exercises/listening" },
	{ name: "21-ex-conversation", path: "/exercises/conversation" },
	{ name: "22-notebook", path: "/notebook", expect: /Cadern/ },
	{ name: "23-review", path: "/review", expect: /Revis/ },
	{ name: "24-achievements", path: "/achievements", expect: /Conquistas/ },
	{ name: "25-settings", path: "/settings", expect: /Configura/ },
	{ name: "26-rules", path: "/rules", expect: /Regras/ },
	{
		name: "27-rules-category",
		path: "/rules/fundamentos-1",
		expect: /Fundamentos/,
	},
	{
		name: "28-rules-rule",
		path: "/rules/fundamentos-1/verb-to-be",
		expect: /TO BE/,
	},
	{
		name: "29-rules-tenses",
		path: "/rules/tempos-verbais",
		expect: /Tempos Verbais/,
	},
	{
		name: "30-rules-future",
		path: "/rules/tempos-verbais/future-tenses",
		expect: /will|going to/i,
	},
	{
		name: "32-vocabulary-vault",
		path: "/vocabulary",
		expect: /Vocabulário Essencial/,
	},
	{ name: "33-reading", path: "/reading", expect: /Leitura Extensiva/ },
	{
		name: "34-reading-view",
		path: "/reading/a1-my-morning",
		expect: /My Morning/,
	},
	{ name: "35-fluency", path: "/fluency", expect: /Treino de Fluência/ },
	{ name: "36-writing", path: "/writing", expect: /Output produtivo/ },
	{
		name: "37-checkpoints",
		path: "/checkpoints",
		expect: /Checkpoints & Can-do/,
	},
	{ name: "38-pronunciation", path: "/pronunciation", expect: /Pronúncia/ },
	{ name: "39-tracks", path: "/tracks", expect: /Trilhas/ },
	{ name: "40-tutor", path: "/tutor", expect: /Tutor de conversa/ },
	{ name: "42-library", path: "/library", expect: /Leitor livre/ },
	{
		name: "43-listening-lab",
		path: "/listening-lab",
		expect: /Laboratório de escuta/i,
	},
	{ name: "44-progress", path: "/progress", expect: /Rumo à fluência/ },
	{
		name: "41-ex-conversation-scenario",
		path: "/exercises/conversation?scenario=hotel-checkin",
	},
	{
		name: "31-not-found",
		path: "/rota-que-nao-existe",
		expect: /404|não encontrada|Página/i,
	},
];

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("vite-ui-theme", "pobre-lingo");
		localStorage.setItem("pobrelingo_onboarded", "true");
	});
});

for (const screen of SCREENS) {
	test(`tela: ${screen.name}`, async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (error) => errors.push(error.message));

		await page.goto(screen.path);
		await expect(page.locator("#root")).toBeVisible();
		await expect(page.locator("text=Algo deu errado")).toHaveCount(0);

		if (screen.expect) {
			await expect(
				page.getByText(screen.expect).filter({ visible: true }).first(),
			).toBeVisible({
				timeout: 10_000,
			});
		}

		await page.waitForTimeout(1200);
		await page.screenshot({ path: `e2e-screenshots/${screen.name}.png` });

		expect(
			errors,
			`Erros de JS em ${screen.path}: ${errors.join(" | ")}`,
		).toEqual([]);
	});
}
