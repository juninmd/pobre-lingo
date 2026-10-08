/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.svg",
				"apple-touch-icon.svg",
				"pwa-192x192.svg",
				"pwa-512x512.svg",
			],
			manifest: {
				name: "PobreLingo - Aprenda Inglês",
				short_name: "PobreLingo",
				description: "Aplicativo grátis e infinito para aprender inglês",
				theme_color: "#22c55e", // Updated to match the new mascot color (green-500)
				background_color: "#ffffff",
				display: "standalone",
				lang: "pt-BR",
				orientation: "portrait",
				scope: "/",
				start_url: "/",
				categories: ["education", "language"],
				icons: [
					{
						src: "pwa-192x192.svg",
						sizes: "192x192",
						type: "image/svg+xml",
						purpose: "any",
					},
					{
						src: "pwa-512x512.svg",
						sizes: "512x512",
						type: "image/svg+xml",
						purpose: "any",
					},
					{
						src: "pwa-512x512.svg",
						sizes: "512x512",
						type: "image/svg+xml",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				importScripts: ["sw-reminders.js"],
				// O motor de IA (~6 MB) só baixa para quem abrir o tutor.
				globIgnores: ["**/web-llm-*.js", "**/webllm.worker-*.js"],
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "gstatic-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
			devOptions: {
				enabled: true,
			},
		}),
	],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						// Carregados sob demanda: fora do vendor para não pesar no primeiro acesso.
						if (id.includes("@mlc-ai")) {
							return "web-llm";
						}
						if (id.includes("logrocket")) {
							return "logrocket";
						}
						if (id.includes("lucide-react")) {
							return "lucide";
						}
						if (id.includes("react") || id.includes("scheduler")) {
							return "react-core";
						}
						if (id.includes("recharts") || id.includes("d3")) {
							return "recharts";
						}
						if (id.includes("firebase")) {
							return "firebase";
						}
						return "vendor";
					}
				},
			},
		},
		chunkSizeWarningLimit: 800,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"**/cypress/**",
			"**/.{idea,git,cache,output,temp}/**",
			"**/{karma,rollup,webpack,vite,vitest}.config.*",
			"tests-e2e/**",
		],
	},
});
