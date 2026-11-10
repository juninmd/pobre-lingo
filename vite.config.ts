import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";
import { codeSplittingGroups } from "./config/chunks";
import { preloadHomeRoute } from "./config/preloadHomeRoute";
import { pwaOptions } from "./config/pwa";

export default defineConfig({
	plugins: [react(), preloadHomeRoute(), VitePWA(pwaOptions)],
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
