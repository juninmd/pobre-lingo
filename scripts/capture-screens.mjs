/**
 * Captura telas do app para comparar antes/depois de uma mudança visual.
 *
 * Uso:
 *   node scripts/capture-screens.mjs <baseUrl> <pastaDeSaída> <prefixo>
 *
 * Variáveis: ROUTES (rotas separadas por vírgula), THEMES (light,dark),
 * FORMAT (png ou jpeg), FULL=1 (página inteira), CHROMIUM_PATH (binário do
 * Chromium, se não for o do Playwright).
 * O app recebe 28 dias de estudo de exemplo, para os gráficos não saírem vazios.
 */
import { chromium, devices } from "@playwright/test";

const [base, out, tag] = process.argv.slice(2);
if (!base || !out || !tag) {
	console.error(
		"uso: node scripts/capture-screens.mjs <baseUrl> <pasta> <prefixo>",
	);
	process.exit(2);
}

const routes = (
	process.env.ROUTES ?? "/,/progress,/arcade,/achievements"
).split(",");
const themes = (process.env.THEMES ?? "light,dark").split(",");
const format = process.env.FORMAT === "jpeg" ? "jpeg" : "png";
const pad = (n) => String(n).padStart(2, "0");

function sampleStudyLog() {
	const days = {};
	for (let i = 0; i < 28; i++) {
		if (i % 6 === 4) continue;
		const d = new Date();
		d.setDate(d.getDate() - i);
		days[`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`] = {
			reading: 300 + ((i * 137) % 900),
			listening: 200 + ((i * 71) % 700),
			speaking: 100 + ((i * 53) % 400),
			writing: 60 + ((i * 31) % 300),
			study: 400 + ((i * 97) % 1100),
		};
	}
	return JSON.stringify({ days, wordsRead: 18450 });
}

const viewports = [
	["desktop", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }],
	["mobile", { ...devices["Pixel 5"] }],
];

const browser = await chromium.launch({
	executablePath: process.env.CHROMIUM_PATH || undefined,
});
for (const [name, options] of viewports) {
	for (const theme of themes) {
		const context = await browser.newContext({
			...options,
			colorScheme: theme,
			serviceWorkers: "block",
		});
		await context.addInitScript(
			([log, chosen]) => {
				localStorage.setItem("pobrelingo_onboarded", "true");
				localStorage.setItem("pobrelingo_study_log", log);
				localStorage.setItem("vite-ui-theme", chosen);
			},
			[sampleStudyLog(), theme],
		);
		const page = await context.newPage();
		for (const route of routes) {
			await page.goto(base + route, { waitUntil: "networkidle" });
			await page.waitForTimeout(1800);
			const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "_");
			await page.screenshot({
				path: `${out}/${tag}-${name}-${theme}-${slug}.${format === "jpeg" ? "jpg" : "png"}`,
				type: format,
				quality: format === "jpeg" ? 90 : undefined,
				fullPage: process.env.FULL === "1",
			});
		}
		await context.close();
	}
}
await browser.close();
