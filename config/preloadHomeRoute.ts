import type { Plugin } from "vite";

const APP_ENTRY = "src/main.tsx";
const HOME_PAGE = "src/pages/DashboardPage.tsx";

interface Chunk {
	type: "chunk";
	fileName: string;
	isEntry: boolean;
	imports: string[];
	moduleIds: string[];
}

/** Um chunk e tudo o que ele importa de forma estática. */
function closure(start: Chunk, chunks: Map<string, Chunk>): Set<string> {
	const seen = new Set<string>();
	const visit = (fileName: string) => {
		if (seen.has(fileName)) return;
		seen.add(fileName);
		for (const next of chunks.get(fileName)?.imports ?? []) visit(next);
	};
	visit(start.fileName);
	return seen;
}

/**
 * Adianta o download do chunk da tela inicial. Ela é carregada com `lazy()`,
 * então o navegador só a descobria depois de baixar e executar a entrada: uma
 * ida e volta a mais antes do conteúdo.
 *
 * O build escreve a lista em `<link rel="home-preload">`, que o navegador
 * ignora; `public/boot.js` os converte em `modulepreload` só quando a URL é
 * "/". Assim as outras rotas não pagam por um chunk que não vão usar, e
 * nada de script inline (a CSP não permite). O boot.js fica no início do
 * `<body>`: quando roda, os links do `<head>` já existem.
 */
export function preloadHomeRoute(): Plugin {
	return {
		name: "pobrelingo:preload-home-route",
		apply: "build",
		transformIndexHtml: {
			order: "post",
			handler(html, context) {
				const chunks = new Map<string, Chunk>();
				for (const item of Object.values(context.bundle ?? {})) {
					if (item.type === "chunk") chunks.set(item.fileName, item as Chunk);
				}
				const all = [...chunks.values()];
				const owner = (file: string) =>
					all.find((chunk) => chunk.moduleIds.some((id) => id.endsWith(file)));
				const entry = owner(APP_ENTRY);
				const home = owner(HOME_PAGE);
				if (!entry || !home) {
					this.warn(`chunk de ${HOME_PAGE} não encontrado: sem preload`);
					return html;
				}
				const already = closure(entry, chunks);
				return [...closure(home, chunks)]
					.filter((fileName) => !already.has(fileName))
					.map((fileName) => ({
						tag: "link",
						attrs: { rel: "home-preload", href: `/${fileName}` },
						injectTo: "head" as const,
					}));
			},
		},
	};
}
