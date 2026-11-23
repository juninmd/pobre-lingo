import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";
import { normalizeBase } from "./config/base";
import { codeSplittingGroups } from "./config/chunks";
import { preloadHomeRoute } from "./config/preloadHomeRoute";
import { pwaOptions } from "./config/pwa";
import { spaFallback } from "./config/spaFallback";
import { isDesktopMode, resolveBase } from "./config/target";

export default defineConfig(({ mode }) => {
	// Subcaminho de hospedagem (GitHub Pages: "/pobre-lingo/"); em dev, a raiz.
	// No app desktop (`--mode desktop`) a base é sempre "/".
	const base = resolveBase(mode, normalizeBase(process.env.VITE_BASE));
	// O desktop empacota os assets: sem service worker nem 404.html do Pages.
	const web = !isDesktopMode(mode);

	return {
		base,
		plugins: [
			react(),
			preloadHomeRoute(base),
			...(web ? [spaFallback(), VitePWA(pwaOptions(base))] : []),
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
	};
});
