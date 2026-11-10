import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";
import { normalizeBase } from "./config/base";
import { codeSplittingGroups } from "./config/chunks";
import { preloadHomeRoute } from "./config/preloadHomeRoute";
import { pwaOptions } from "./config/pwa";
import { spaFallback } from "./config/spaFallback";

// Subcaminho de hospedagem (GitHub Pages: "/pobre-lingo/"); na Netlify, a raiz.
const base = normalizeBase(process.env.VITE_BASE);

export default defineConfig({
	base,
	plugins: [
		react(),
		preloadHomeRoute(base),
		spaFallback(),
		VitePWA(pwaOptions(base)),
	],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	build: {
		rolldownOptions: {
			output: { codeSplitting: { groups: codeSplittingGroups } },
		},
		chunkSizeWarningLimit: 800,
	},
	test: {
		globals: true,
		environment: "jsdom",
		pool: "vmThreads",
		setupFiles: "./src/test-utils/setup.ts",
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"**/.{idea,git,cache,output,temp}/**",
			"tests-e2e/**",
		],
	},
});
