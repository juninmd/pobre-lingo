import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("https://pobrelingo.netlify.app/review", {
	waitUntil: "domcontentloaded",
});
await page.waitForTimeout(3500);

const info = await page.evaluate(() =>
	Array.from(document.querySelectorAll("button"))
		.filter(
			(b) =>
				!b.innerText.trim() &&
				!b.getAttribute("aria-label") &&
				!b.getAttribute("title"),
		)
		.map((b) => {
			const r = b.getBoundingClientRect();
			return {
				rect: { top: r.top, left: r.left, w: r.width, h: r.height },
				paiClasse: b.parentElement?.className?.toString().slice(0, 120),
				svg: b.querySelector("svg")?.getAttribute("class"),
				html: b.outerHTML.slice(0, 500),
			};
		}),
);
console.log(JSON.stringify(info, null, 2));
await browser.close();
