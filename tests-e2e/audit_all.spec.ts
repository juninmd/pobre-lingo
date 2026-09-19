import { expect, test } from "@playwright/test";

/**
 * Auditoria: percorre TODAS as rotas em desktop e mobile, mede erros de JS e
 * overflow/corte horizontal, e guarda um print de cada tela.
 */

type Route = { name: string; path: string };

const ROUTES: Route[] = [
	{ name: "home", path: "/" },
	{ name: "arcade", path: "/arcade" },
	{ name: "game-bubble-pop", path: "/games/bubble-pop" },
	{ name: "game-speed-match", path: "/games/speed-match" },
	{ name: "game-memory-match", path: "/games/memory-match" },
	{ name: "game-word-scramble", path: "/games/word-scramble" },
	{ name: "game-flashcards", path: "/games/flashcards" },
	{ name: "game-word-search", path: "/games/word-search" },
	{ name: "game-sentence-rush", path: "/games/sentence-rush" },
	{ name: "game-hangman", path: "/games/hangman" },
	{ name: "dictionary", path: "/dictionary" },
	{ name: "rules", path: "/rules" },
	{ name: "rules-category", path: "/rules/fundamentos-1" },
	{ name: "rules-rule", path: "/rules/fundamentos-1/verb-to-be" },
	{
		name: "rules-rule-curriculum",
		path: "/rules/fundamentos-1/verb-to-be?module=foundations&lesson=classes-de-palavras",
	},
	{ name: "rules-tenses", path: "/rules/tempos-verbais" },
	{ name: "vocabulary-vault", path: "/vocabulary" },
	{
		name: "vocabulary-lesson",
		path: "/vocabulary/foundations/alphabet-pronunciation",
	},
	{ name: "quiz-lesson", path: "/quiz/verb-tenses/tenses-quiz" },
	{ name: "reading", path: "/reading" },
	{ name: "reading-view", path: "/reading/a1-my-morning" },
	{ name: "fluency", path: "/fluency" },
	{ name: "pronunciation", path: "/pronunciation" },
	{ name: "tracks", path: "/tracks" },
	{ name: "tutor", path: "/tutor" },
	{ name: "library", path: "/library" },
	{ name: "listening-lab", path: "/listening-lab" },
	{ name: "progress", path: "/progress" },
	{ name: "writing", path: "/writing" },
	{ name: "checkpoints", path: "/checkpoints" },
	{ name: "proficiency", path: "/proficiency" },
	{ name: "ex-sentence-ordering", path: "/exercises/sentence-ordering" },
	{
		name: "ex-sentence-identification",
		path: "/exercises/sentence-identification",
	},
	{ name: "ex-find-incorrect-words", path: "/exercises/find-incorrect-words" },
	{ name: "ex-news-comprehension", path: "/exercises/news-comprehension" },
	{ name: "ex-matching-pairs", path: "/exercises/matching-pairs" },
	{ name: "ex-listening", path: "/exercises/listening" },
	{ name: "ex-conversation", path: "/exercises/conversation" },
	{ name: "notebook", path: "/notebook" },
	{ name: "review", path: "/review" },
	{ name: "achievements", path: "/achievements" },
	{ name: "settings", path: "/settings" },
	{ name: "not-found", path: "/rota-que-nao-existe" },
];

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("vite-ui-theme", "pobre-lingo");
		localStorage.setItem("pobrelingo_onboarded", "true");
	});
});

for (const route of ROUTES) {
	test(`audit ${route.name}`, async ({ page }, testInfo) => {
		const prefix = testInfo.project.name.startsWith("Mobile") ? "m" : "d";
		const errors: string[] = [];
		page.on("pageerror", (error) => errors.push(error.message));

		await page.goto(route.path);
		await expect(page.locator("#root")).toBeVisible();
		await page.waitForTimeout(2000);

		const metrics = await page.evaluate(() => {
			const scroller = document.querySelector(
				".overflow-y-auto",
			) as HTMLElement | null;
			const vw = window.innerWidth;
			const offenders: string[] = [];
			document.querySelectorAll("*").forEach((el) => {
				const rect = el.getBoundingClientRect();
				if (rect.width < 30) return;
				if (rect.right > vw + 2 || rect.left < -2) {
					const className = (el.className || "").toString().slice(0, 50);
					offenders.push(
						`${el.tagName}.${className} L=${Math.round(rect.left)} R=${Math.round(rect.right)}`,
					);
				}
			});
			return {
				vw,
				docScroll: document.documentElement.scrollWidth,
				scrollerScroll: scroller?.scrollWidth ?? null,
				scrollerClient: scroller?.clientWidth ?? null,
				offenders: offenders.slice(0, 6),
			};
		});

		await page.screenshot({
			path: `e2e-screenshots/audit-${prefix}-${route.name}.png`,
		});

		const overflow =
			(metrics.scrollerScroll ?? 0) - (metrics.scrollerClient ?? 0) > 1 ||
			metrics.offenders.length > 0;
		if (errors.length || overflow) {
			console.log(
				`AUDIT ${prefix} ${route.name} ${JSON.stringify({ errors, metrics })}`,
			);
		}
	});
}
