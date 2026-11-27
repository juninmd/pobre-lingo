import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const here = fileURLToPath(new URL(".", import.meta.url));
const repo = fileURLToPath(new URL("../..", import.meta.url));

// Serve só a página de comparação, com o CSS real do app e o Sonido instalado.
// O Tailwind entra pelo postcss.config.mjs da raiz do repositório.
export default defineConfig({
	root: here,
	plugins: [react()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("../../src", import.meta.url)),
		},
	},
	css: { postcss: repo },
	server: {
		port: 5311,
		strictPort: true,
		fs: { allow: [repo] },
	},
});
