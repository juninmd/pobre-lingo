import { chromium } from "@playwright/test";

const base = "https://pobrelingo.netlify.app";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(base + "/review", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

// Quem cobre o item "Teste de Nível"?
const info = await page.evaluate(() => {
	const alvo = Array.from(document.querySelectorAll("a[href]")).find((a) =>
		a.innerText.includes("Teste de Nível"),
	);
	if (!alvo) return { erro: "alvo nao encontrado" };
	const r = alvo.getBoundingClientRect();
	const topo = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
	const est = topo ? getComputedStyle(topo) : null;
	return {
		alvoRect: { top: r.top, bottom: r.bottom, left: r.left, right: r.right },
		cobertoPor: topo?.className?.toString().slice(0, 200),
		textoCobertura: topo?.innerText?.slice(0, 80),
		posicao: est?.position,
		zIndex: est?.zIndex,
		coberturaRect: topo?.getBoundingClientRect(),
	};
});
console.log(JSON.stringify(info, null, 2));

// Qual botão está sem nome acessível?
const semNome = await page.evaluate(() =>
	Array.from(document.querySelectorAll("button"))
		.filter((b) => !b.innerText.trim() && !b.getAttribute("aria-label") && !b.getAttribute("title"))
		.map((b) => ({ classe: b.className.slice(0, 160), html: b.outerHTML.slice(0, 260) })),
);
console.log("--- BOTOES SEM NOME ---");
console.log(JSON.stringify(semNome, null, 2));

await browser.close();
