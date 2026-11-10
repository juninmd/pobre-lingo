import type { VitePWAOptions } from "vite-plugin-pwa";

const shortcutIcon = [
	{ src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
];

const icon = (file: string, purpose: "any" | "maskable", size = "512x512") => ({
	src: file,
	sizes: size,
	type: "image/png",
	purpose,
});

export const pwaOptions: Partial<VitePWAOptions> = {
	registerType: "autoUpdate",
	includeAssets: [
		"favicon.svg",
		"apple-touch-icon.png",
		"pwa-192x192.png",
		"pwa-512x512.png",
		"pwa-maskable-512x512.png",
	],
	manifest: {
		name: "PobreLingo - Aprenda Inglês",
		short_name: "PobreLingo",
		description: "Aplicativo grátis e infinito para aprender inglês",
		// Light-theme primary (hsl 210 90% 50%); keep in sync with index.html.
		theme_color: "#0b6bcb",
		background_color: "#ffffff",
		display: "standalone",
		lang: "pt-BR",
		orientation: "portrait",
		id: "/",
		scope: "/",
		start_url: "/",
		display_override: ["standalone", "minimal-ui"],
		categories: ["education", "language"],
		shortcuts: [
			{ name: "Revisão de hoje", url: "/review", icons: shortcutIcon },
			{ name: "Meu progresso", url: "/progress", icons: shortcutIcon },
			{ name: "Tutor de IA", url: "/tutor", icons: shortcutIcon },
		],
		icons: [
			icon("pwa-192x192.png", "any", "192x192"),
			icon("pwa-512x512.png", "any"),
			icon("pwa-maskable-512x512.png", "maskable"),
		],
	},
	workbox: {
		importScripts: ["sw-reminders.js"],
		cleanupOutdatedCaches: true,
		// Abre o app offline em qualquer rota, mas nunca serve o index no lugar do cache de meta.
		navigateFallbackDenylist: [/^\/__pobrelingo/],
		// O motor de IA (~6 MB) e o three só baixam para quem abrir o tutor ou a Mika.
		globIgnores: ["**/web-llm-*.js", "**/webllm.worker-*.js", "**/three-*.js"],
		// As fontes agora são do próprio app (woff2): entram no precache e valem offline.
		globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
	},
	devOptions: { enabled: false },
};
