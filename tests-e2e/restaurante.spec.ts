import { expect, type Page, test } from "@playwright/test";

/**
 * Smoke test da simulação de restaurante (módulo "ordering-food").
 *
 * São 10 clientes independentes — contexto isolado por cliente — pedindo
 * comida com padrões de resposta diferentes: quem acerta de primeira, quem
 * erra e se corrige, e quem alterna. O diálogo é ramificado e concede XP ao
 * final, então cada padrão exercita um caminho distinto da máquina de estados.
 */

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:5173";

const ROTA_RESTAURANTE =
	"/exercises/conversation?module=ordering-food-module&lesson=ordering-food-sim";

/** Trechos das falas corretas, na ordem dos três passos do atendimento. */
const PEDIDO_CORRETO = ["have the steak", "Medium rare", "Just water"];

/** Falas erradas disponíveis por passo (o passo 3 só tem a opção correta). */
const PEDIDO_ERRADO: (string | null)[] = ["menu is paper", "With a fork", null];

type Padrao = "sempre-certo" | "erra-e-corrige" | "alterna";

interface Cliente {
	mesa: number;
	perfil: string;
	padrao: Padrao;
}

const CLIENTES: Cliente[] = [
	{ mesa: 1, perfil: "Cliente decidido", padrao: "sempre-certo" },
	{
		mesa: 2,
		perfil: "Cliente inseguro no primeiro passo",
		padrao: "erra-e-corrige",
	},
	{ mesa: 3, perfil: "Cliente apressado", padrao: "sempre-certo" },
	{ mesa: 4, perfil: "Cliente que confunde a pergunta", padrao: "alterna" },
	{ mesa: 5, perfil: "Cliente iniciante", padrao: "erra-e-corrige" },
	{ mesa: 6, perfil: "Cliente confiante", padrao: "sempre-certo" },
	{ mesa: 7, perfil: "Cliente distraído", padrao: "alterna" },
	{ mesa: 8, perfil: "Cliente que testa o garçom", padrao: "erra-e-corrige" },
	{ mesa: 9, perfil: "Cliente experiente", padrao: "sempre-certo" },
	{ mesa: 10, perfil: "Cliente hesitante", padrao: "alterna" },
];

/** Erros de terceiros que não indicam defeito da aplicação. */
const RUIDO_EXTERNO = /logrocket|lr-in-prod|analytics|favicon/i;

/** Decide se este passo deve começar com uma resposta errada. */
function erraNoPasso(padrao: Padrao, passo: number): boolean {
	if (padrao === "sempre-certo") return false;
	if (padrao === "erra-e-corrige") return passo === 0;
	return passo % 2 === 0; // alterna
}

/**
 * Clica numa fala do diálogo. O botão traz a frase em inglês e a tradução em
 * linhas separadas, por isso o filtro é por trecho. As opções ficam
 * desabilitadas enquanto o mascote "digita" — esperar por `toBeEnabled` é o
 * que garante que a simulação destravou de verdade.
 */
async function falar(page: Page, trecho: string): Promise<void> {
	const opcao = page.locator("button").filter({ hasText: trecho }).first();
	await expect(opcao).toBeVisible({ timeout: 15_000 });
	await expect(opcao).toBeEnabled({ timeout: 15_000 });
	await opcao.click();
	await page.waitForTimeout(1200);
}

for (const cliente of CLIENTES) {
	test(`Restaurante mesa ${cliente.mesa}: ${cliente.perfil}`, async ({
		browser,
	}) => {
		const context = await browser.newContext({ baseURL: BASE_URL });
		const page = await context.newPage();

		const errosJs: string[] = [];
		page.on("pageerror", (err) => {
			if (!RUIDO_EXTERNO.test(err.message)) errosJs.push(err.message);
		});
		page.on("console", (msg) => {
			if (msg.type() === "error" && !RUIDO_EXTERNO.test(msg.text())) {
				errosJs.push(msg.text());
			}
		});

		try {
			await page.goto(ROTA_RESTAURANTE, { waitUntil: "domcontentloaded" });
			await expect(page.locator("#root")).not.toBeEmpty({ timeout: 20_000 });

			// O garçom precisa abrir o atendimento.
			await expect(page.getByText(/ready to order/i).first()).toBeVisible({
				timeout: 20_000,
			});

			for (let passo = 0; passo < PEDIDO_CORRETO.length; passo++) {
				const errada = PEDIDO_ERRADO[passo];
				if (errada && erraNoPasso(cliente.padrao, passo)) {
					// Resposta fora de contexto: o diálogo deve segurar o cliente
					// no mesmo passo em vez de avançar.
					await falar(page, errada);
				}
				await falar(page, PEDIDO_CORRETO[passo]);
			}

			// Pedido fechado: a simulação precisa reconhecer a conclusão.
			await expect(
				page.getByText(/Parabéns|Conclu|Completo|XP/i).first(),
			).toBeVisible({ timeout: 20_000 });

			expect(errosJs, `erros de JS: ${errosJs.join(" | ")}`).toEqual([]);
		} finally {
			await context.close();
		}
	});
}
