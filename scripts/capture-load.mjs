/**
 * Mostra o que a pessoa vê enquanto o app carrega numa rede lenta: tira uma
 * foto em cada instante pedido depois de abrir a página, com a rede e a CPU
 * limitadas pelo DevTools (4G lento: 1,6 Mbps, 150 ms de latência, CPU 4x).
 *
 * Uso:
 *   node scripts/capture-load.mjs <baseUrl> <pastaDeSaída> <prefixo> [rota]
 *
 * Variáveis: MOMENTS (ms separados por vírgula), CHROMIUM_PATH.
 */
import { chromium, devices } from "@playwright/test";

const [base, out, tag, route = "/"] = process.argv.slice(2);
if (!base || !out || !tag) {
	console.error(
		"uso: node scripts/capture-load.mjs <baseUrl> <pasta> <prefixo> [rota]",
	);
	process.exit(2);
}
const moments = (process.env.MOMENTS ?? "1000,2000,3000,4500")
	.split(",")
	.map(Number);

const browser = await chromium.launch({
	executablePath: process.env.CHROMIUM_PATH || undefined,
});
const context = await browser.newContext({
	...devices["Pixel 5"],
	serviceWorkers: "block",
});
await context.addInitScript(() => {
	localStorage.setItem("pobrelingo_onboarded", "true");
});
const page = await context.newPage();
const devtools = await context.newCDPSession(page);
await devtools.send("Network.enable");
await devtools.send("Network.emulateNetworkConditions", {
	offline: false,
	latency: 150,
	downloadThroughput: (1.6 * 1024 * 1024) / 8,
	uploadThroughput: (750 * 1024) / 8,
});
await devtools.send("Emulation.setCPUThrottlingRate", { rate: 4 });

const start = Date.now();
void page.goto(base + route, { waitUntil: "commit" }).catch(() => {});
for (const moment of moments) {
	const wait = moment - (Date.now() - start);
	if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
	await page.screenshot({
		path: `${out}/${tag}-load-${String(moment).padStart(5, "0")}ms.jpg`,
		type: "jpeg",
		quality: 85,
	});
}
await browser.close();
