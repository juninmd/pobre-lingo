/**
 * Auditor de página do PobreLingo.
 *
 * Abre uma rota em desktop e mobile e reporta problemas objetivos, das classes
 * que já morderam este projeto: erro de JS, página em branco, elemento
 * interativo coberto pela barra de navegação fixa, overflow horizontal,
 * controle permanentemente desabilitado e falha de acessibilidade básica.
 *
 * Uso:
 *   node scripts/audit-page.mjs "/review" [baseUrl]
 *
 * Saída: JSON com { rota, viewport, problemas[] }. Sai com código 1 se houver
 * algum problema de severidade "alta".
 */

import { chromium, devices } from "@playwright/test";

const rota = process.argv[2];
const base =
	process.argv[3] ?? process.env.SMOKE_BASE_URL ?? "http://localhost:5173";

if (!rota) {
	console.error('uso: node scripts/audit-page.mjs "/rota" [baseUrl]');
	process.exit(2);
}

/** Ruído de terceiros que não é defeito da aplicação. */
const RUIDO = /logrocket|lr-in-prod|analytics|favicon|sourcemap/i;

async function auditar(nomeViewport, opcoesContexto) {
	const browser = await chromium.launch();
	const context = await browser.newContext(opcoesContexto);
	const page = await context.newPage();

	const problemas = [];
	const add = (severidade, tipo, detalhe) =>
		problemas.push({ severidade, tipo, detalhe });

	page.on("pageerror", (e) => {
		if (!RUIDO.test(e.message))
			add("alta", "erro-js", e.message.slice(0, 300));
	});
	page.on("console", (m) => {
		if (m.type() === "error" && !RUIDO.test(m.text()))
			add("alta", "console-error", m.text().slice(0, 300));
	});
	page.on("response", (r) => {
		if (r.url().startsWith(base) && r.status() >= 400 && !RUIDO.test(r.url()))
			add("alta", "http", `${r.status()} ${r.url()}`);
	});

	try {
		await page.goto(base + rota, {
			waitUntil: "domcontentloaded",
			timeout: 30_000,
		});
		await page.waitForTimeout(3500);

		// 1. Página em branco / casca vazia.
		const texto = (await page.locator("body").innerText()).trim();
		if (texto.length < 40)
			add("alta", "pagina-vazia", `body tem ${texto.length} chars`);

		// 2. Overflow horizontal — quebra a leitura no celular.
		const overflow = await page.evaluate(() => {
			const d = document.documentElement;
			return { scroll: d.scrollWidth, client: d.clientWidth };
		});
		if (overflow.scroll > overflow.client + 2)
			add(
				"media",
				"overflow-horizontal",
				`scrollWidth ${overflow.scroll} > clientWidth ${overflow.client}`,
			);

		// 3. Interativo coberto por elemento fixo (a barra inferior no mobile).
		//    Foi exatamente esse o bug da prática de conversa.
		const cobertos = await page.evaluate(() => {
			const achados = [];
			const alvos = document.querySelectorAll("button, a[href], [role=switch]");
			for (const el of alvos) {
				const r = el.getBoundingClientRect();
				if (r.width === 0 || r.height === 0) continue;
				if (r.top < 0 || r.bottom > window.innerHeight) continue;
				const x = r.left + r.width / 2;
				const y = r.top + r.height / 2;
				const topo = document.elementFromPoint(x, y);
				if (!topo || el === topo || el.contains(topo) || topo.contains(el))
					continue;
				achados.push({
					alvo: (el.innerText || el.getAttribute("aria-label") || el.tagName)
						.trim()
						.slice(0, 60),
					cobertoPor: (
						topo.innerText ||
						topo.getAttribute("aria-label") ||
						topo.tagName
					)
						.trim()
						.slice(0, 60),
				});
			}
			return achados.slice(0, 8);
		});
		for (const c of cobertos)
			add(
				"alta",
				"interativo-coberto",
				`"${c.alvo}" está sob "${c.cobertoPor}"`,
			);

		// 4. Controles desabilitados que nunca liberam (sintoma de estado travado).
		const desabilitados = await page.evaluate(() =>
			Array.from(document.querySelectorAll("button[disabled]"))
				.map((e) => (e.innerText || e.getAttribute("aria-label") || "")
					.trim()
					.slice(0, 50))
				.filter(Boolean)
				.slice(0, 8),
		);
		for (const d of desabilitados)
			add("baixa", "botao-desabilitado", `"${d}" (confirmar se é esperado)`);

		// 5. Acessibilidade básica.
		const semNome = await page.evaluate(
			() =>
				Array.from(document.querySelectorAll("button")).filter(
					(b) =>
						!b.innerText.trim() &&
						!b.getAttribute("aria-label") &&
						!b.getAttribute("title"),
				).length,
		);
		if (semNome > 0)
			add("media", "a11y", `${semNome} botão(ões) sem nome acessível`);

		const imgSemAlt = await page.evaluate(
			() =>
				Array.from(document.querySelectorAll("img")).filter(
					(i) => !i.hasAttribute("alt"),
				).length,
		);
		if (imgSemAlt > 0)
			add("media", "a11y", `${imgSemAlt} imagem(ns) sem alt`);
	} catch (e) {
		add("alta", "falha-navegacao", String(e.message).slice(0, 300));
	} finally {
		await browser.close();
	}

	return { viewport: nomeViewport, problemas };
}

const resultados = [
	await auditar("desktop", { viewport: { width: 1280, height: 800 } }),
	await auditar("mobile", { ...devices["Pixel 5"] }),
];

const relatorio = { rota, base, resultados };
console.log(JSON.stringify(relatorio, null, 2));

const temAlta = resultados.some((r) =>
	r.problemas.some((p) => p.severidade === "alta"),
);
process.exit(temAlta ? 1 : 0);
