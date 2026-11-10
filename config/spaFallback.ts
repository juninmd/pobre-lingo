import { copyFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";

/**
 * O GitHub Pages não tem regra de reescrita (a Netlify tem, em
 * public/_redirects): numa URL que não é arquivo, como /pobre-lingo/review,
 * ele serve o `404.html`. Com uma cópia do index.html no lugar, o app abre e
 * o roteador resolve a rota.
 */
export function spaFallback(): Plugin {
	let outDir = "dist";
	return {
		name: "pobrelingo:spa-fallback",
		apply: "build",
		configResolved(config) {
			outDir = join(config.root, config.build.outDir);
		},
		closeBundle: {
			// Antes do plugin de PWA, que lê a pasta para montar o precache.
			order: "pre",
			handler() {
				copyFileSync(join(outDir, "index.html"), join(outDir, "404.html"));
			},
		},
	};
}
