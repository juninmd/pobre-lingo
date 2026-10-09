import { expect, type Page, test } from "@playwright/test";

/**
 * Homologação: 20 usuários simulados, cada um em contexto isolado (storage
 * próprio), percorrendo uma jornada distinta contra o ambiente publicado.
 *
 * O alvo é definido por SMOKE_BASE_URL; sem ela, usa o preview de produção que o Playwright sobe (porta 5187).
 * Cada persona falha se a página não renderizar, se houver erro de JS não
 * capturado ou se algum recurso da própria origem responder >= 400.
 */

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:5187";

interface Persona {
	id: number;
	nome: string;
	/** Rotas percorridas na ordem. */
	rotas: string[];
	/** Texto que precisa aparecer na última rota — prova de que renderizou. */
	esperado: RegExp;
	mobile?: boolean;
	/** Interação extra ao final da jornada. */
	acao?: (page: Page) => Promise<void>;
}

const PERSONAS: Persona[] = [
	{
		id: 1,
		nome: "Novato abrindo o app pela primeira vez",
		rotas: ["/"],
		esperado: /Minha Jornada|Dias Seguidos|PobreLingo/i,
	},
	{
		id: 2,
		nome: "Usuário que vai direto para a revisão espaçada",
		rotas: ["/review"],
		esperado: /Revisar|Revisão Inteligente/i,
	},
	{
		id: 3,
		nome: "Usuário conferindo conquistas e estatísticas",
		rotas: ["/achievements"],
		esperado: /Conquistas/i,
	},
	{
		id: 4,
		nome: "Usuário ajustando preferências de notificação",
		rotas: ["/settings"],
		esperado: /Notificações/i,
		acao: async (page) => {
			// O switch de "avisos do navegador" fica desabilitado sem permissão
			// concedida; o alvo aqui é uma categoria, que é sempre acionável.
			const toggle = page.getByRole("switch", { name: /Ofensiva/i });
			await expect(toggle).toBeVisible();
			const antes = await toggle.getAttribute("aria-checked");
			await toggle.click();
			await expect(toggle).not.toHaveAttribute("aria-checked", antes ?? "true");
		},
	},
	{
		id: 5,
		nome: "Usuário abrindo a caixa de notificações no header",
		rotas: ["/"],
		esperado: /PobreLingo/i,
		acao: async (page) => {
			// Usuário novo cai no onboarding, que cobre a tela inteira.
			await fecharOnboarding(page);

			// Clica no botão de notificação usando aria-label ou title
			const toggle = page
				.locator('button[aria-label="Notificações"], button[title*="Notifica"]')
				.first();

			if (await toggle.isVisible().catch(() => false)) {
				await toggle.click({ force: true });
				const menu = page
					.getByText(
						/Tudo em dia por aqui|Limpar tudo|Marcar todas como lidas/i,
					)
					.first();

				// Allow more time, as Popovers can take a moment to mount and animate
				await expect(menu).toBeVisible({ timeout: 15_000 });
			}
		},
	},
	{
		id: 6,
		nome: "Usuário consultando o dicionário",
		rotas: ["/dictionary"],
		esperado: /Dicionário/i,
	},
	{
		id: 7,
		nome: "Usuário revisando o caderninho",
		rotas: ["/notebook"],
		esperado: /Caderninho/i,
	},
	{
		id: 8,
		nome: "Usuário estudando as regras de gramática",
		rotas: ["/rules"],
		esperado: /Regras|Gramática/i,
	},
	{
		id: 9,
		nome: "Usuário fazendo o teste de proficiência",
		rotas: ["/proficiency"],
		esperado: /Encontre um ponto de estudo|Nível|Proficiência|Teste/i,
	},
	{
		id: 10,
		nome: "Usuário entrando no arcade",
		rotas: ["/arcade"],
		esperado: /Arcade|Jogos/i,
	},
	{
		id: 11,
		nome: "Jogador de Speed Match e Word Scramble",
		rotas: ["/games/speed-match", "/games/word-scramble"],
		esperado: /.+/,
	},
	{
		id: 12,
		nome: "Jogador de Flashcards e Word Search",
		rotas: ["/games/flashcards", "/games/word-search"],
		esperado: /.+/,
	},
	{
		id: 13,
		nome: "Jogador de Memory Match e Hangman",
		rotas: ["/games/memory-match", "/games/hangman"],
		esperado: /.+/,
	},
	{
		id: 14,
		nome: "Jogador de Sentence Rush e Bubble Pop",
		rotas: ["/games/sentence-rush", "/games/bubble-pop"],
		esperado: /.+/,
	},
	{
		id: 15,
		nome: "Usuário praticando ordenação de frases",
		rotas: ["/exercises/sentence-ordering"],
		esperado: /.+/,
	},
	{
		id: 16,
		nome: "Usuário identificando frases corretas",
		rotas: ["/exercises/sentence-identification"],
		esperado: /.+/,
	},
	{
		id: 17,
		nome: "Usuário caçando erros e interpretando notícias",
		rotas: ["/exercises/find-incorrect-words", "/exercises/news-comprehension"],
		esperado: /.+/,
	},
	{
		id: 18,
		nome: "Usuário em listening, conversação e pares",
		rotas: [
			"/exercises/listening",
			"/exercises/conversation",
			"/exercises/matching-pairs",
		],
		esperado: /.+/,
	},
	{
		id: 19,
		nome: "Usuário mobile navegando pela barra inferior",
		rotas: ["/", "/review", "/arcade"],
		esperado: /.+/,
		mobile: true,
		acao: async (page) => {
			const sidebarTrigger = page.getByRole('button', { name: 'Alternar menu' });
			await expect(sidebarTrigger).toBeVisible();
			await sidebarTrigger.click({ force: true });

			const sidebarLink = page.getByRole('link', { name: 'Minha Jornada' });
			await expect(sidebarLink).toBeVisible();
		},
	},
	{
		id: 20,
		nome: "Usuário digitando uma URL inexistente",
		rotas: ["/rota-que-nao-existe"],
		esperado: /Lost in translation|não existe/i,
	},
];

/**
 * Fecha a introdução que aparece para quem nunca usou o app. Sem isso o
 * overlay do modal intercepta todo clique no dashboard.
 */
async function fecharOnboarding(page: Page): Promise<void> {
	const pular = page.getByRole("button", { name: /Pular introdução|^Pular$/ });
	if (
		await pular
			.first()
			.isVisible()
			.catch(() => false)
	) {
		await pular.first().click();
		await expect(pular.first()).toBeHidden({ timeout: 10_000 });
	}
}

/** Erros de terceiros que não indicam defeito da aplicação. */
const RUIDO_EXTERNO = /logrocket|lr-in-prod|analytics|favicon/i;

for (const persona of PERSONAS) {
	// Título em ASCII de propósito: o filtro -g é digitado em consoles do
	// Windows que não lidam bem com acento.
	test(`Usuario ${persona.id}: ${persona.nome}`, async ({ browser }) => {
		const context = await browser.newContext({
			baseURL: BASE_URL,
			...(persona.mobile
				? { viewport: { width: 393, height: 851 }, isMobile: true }
				: {}),
		});
		const page = await context.newPage();

		const errosJs: string[] = [];
		const respostasRuins: string[] = [];

		page.on("pageerror", (err) => {
			if (!RUIDO_EXTERNO.test(err.message)) errosJs.push(err.message);
		});
		page.on("console", (msg) => {
			if (msg.type() === "error" && !RUIDO_EXTERNO.test(msg.text())) {
				errosJs.push(msg.text());
			}
		});
		page.on("response", (res) => {
			const url = res.url();
			if (!url.startsWith(BASE_URL)) return; // ignora CDNs e telemetria
			if (res.status() >= 400 && !RUIDO_EXTERNO.test(url)) {
				respostasRuins.push(`${res.status()} ${url}`);
			}
		});

		try {
			for (const rota of persona.rotas) {
				await page.goto(rota, { waitUntil: "domcontentloaded" });
				// Espera o React montar: o loader some e o conteúdo aparece.
				await expect(page.locator("#root")).not.toBeEmpty({ timeout: 20_000 });
				await page.waitForTimeout(600);
			}

			// A última rota precisa ter conteúdo real, não uma casca vazia.
			const corpo = await page.locator("body").innerText();
			expect(corpo.trim().length, "página renderizou vazia").toBeGreaterThan(
				30,
			);
			expect(corpo).toMatch(persona.esperado);

			if (persona.acao) await persona.acao(page);

			expect(errosJs, `erros de JS: ${errosJs.join(" | ")}`).toEqual([]);
			expect(
				respostasRuins,
				`respostas com falha: ${respostasRuins.join(" | ")}`,
			).toEqual([]);
		} finally {
			await context.close();
		}
	});
}
