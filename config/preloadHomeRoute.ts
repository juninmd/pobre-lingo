import type { Plugin } from "vite";

const APP_ENTRY = "src/main.tsx";
const HOME_PAGE = "src/pages/DashboardPage.tsx";
const BOOT_SCRIPT = /<script src="[^"]*boot\.js"><\/script>/;

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
 * nada de script inline (a CSP não permite). Os links entram logo antes da
 * tag do boot.js, para já existirem quando ele roda.
 */
/** `base`: caminho em que o app é servido ("/" ou "/pobre-lingo/"), já normalizado. */
export function preloadHomeRoute(base: string): Plugin {
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
				const hints = [...closure(home, chunks)]
					.filter((fileName) => !already.has(fileName))
					.map(
						(fileName) =>
							`<link rel="home-preload" href="${base}${fileName}" data-home="${base}" />`,
					)
					.join("\n    ");
				const bootTag = html.match(BOOT_SCRIPT)?.[0];
				if (!bootTag) {
					this.warn("tag do boot.js não está no index.html: sem preload");
					return html;
				}
				return html.replace(bootTag, `${hints}\n    ${bootTag}`);
			},
		},
	};
}
