/**
 * Renders the PWA PNG icons from public/pwa-512x512.svg with Chromium.
 *
 * Usage: node scripts/generate-pwa-icons.mjs
 *
 * Outputs (public/): pwa-192x192.png, pwa-512x512.png (rounded, transparent
 * corners), pwa-maskable-512x512.png and apple-touch-icon.png (full-bleed
 * background; iOS paints transparent corners black).
 */

import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const SOURCE = new URL("../public/pwa-512x512.svg", import.meta.url);
const OUT = (name) => new URL(`../public/${name}`, import.meta.url);

const rounded = await readFile(SOURCE, "utf8");
// Artwork spans 50% of the canvas, inside the 80% maskable safe zone.
const fullBleed = rounded.replace(/ rx="\d+"/, "");
if (fullBleed === rounded) throw new Error("source SVG has no rounded rect");

const JOBS = [
	{ file: "pwa-192x192.png", size: 192, svg: rounded, transparent: true },
	{ file: "pwa-512x512.png", size: 512, svg: rounded, transparent: true },
	{ file: "pwa-maskable-512x512.png", size: 512, svg: fullBleed },
	{ file: "apple-touch-icon.png", size: 180, svg: fullBleed },
];

const browser = await chromium.launch();
try {
	for (const { file, size, svg, transparent = false } of JOBS) {
		const page = await browser.newPage({ viewport: { width: size, height: size } });
		await page.setContent(
			`<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
		);
		const png = await page.screenshot({ omitBackground: transparent });
		await writeFile(OUT(file), png);
		console.log(`${file} ${size}x${size} ${png.length} bytes`);
		await page.close();
	}
} finally {
	await browser.close();
}
