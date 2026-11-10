/**
 * Agrupa dependências em chunks estáveis, pelo nome exato do pacote.
 * (Casar por substring punha todo `@radix-ui/react-*` e o roteador dentro do
 * chunk do React: qualquer atualização de um invalidava o cache de todos.)
 *
 * Só entra em grupo o que a casca usa em toda tela. O resto fica com o
 * bundler, que entrega cada pacote junto das páginas que o importam: um
 * "vendor" genérico obrigava a primeira visita a baixar o que só uma tela usa.
 */
const GROUPS: Record<string, readonly string[]> = {
	// Carregados sob demanda: fora do caminho do primeiro acesso.
	"web-llm": ["@mlc-ai/web-llm"],
	three: ["three", "@pixiv/three-vrm"],
	logrocket: ["logrocket"],
	// Base do app, do que muda menos para o que muda mais.
	react: ["react", "react-dom", "scheduler"],
	router: ["react-router", "react-router-dom"],
	// Um chunk só: soltos, os ícones viravam dezenas de arquivos de 200 bytes.
	icons: ["lucide-react"],
	ui: [
		"tailwind-merge",
		"clsx",
		"class-variance-authority",
		"react-remove-scroll",
		"react-remove-scroll-bar",
		"react-style-singleton",
		"aria-hidden",
		"use-sidecar",
		"use-callback-ref",
		"get-nonce",
		"tslib",
	],
};

const PREFIX_GROUPS: Record<string, string> = {
	"@radix-ui/": "ui",
	"@floating-ui/": "ui",
};

/** Primitivos Radix que só páginas usam (formulários, abas): fora do chunk da casca. */
const PAGE_ONLY = new Set([
	"@radix-ui/react-alert-dialog",
	"@radix-ui/react-checkbox",
	"@radix-ui/react-label",
	"@radix-ui/react-progress",
	"@radix-ui/react-radio-group",
	"@radix-ui/react-select",
	"@radix-ui/react-switch",
	"@radix-ui/react-tabs",
]);

const byPackage = new Map(
	Object.entries(GROUPS).flatMap(([chunk, packages]) =>
		packages.map((name) => [name, chunk] as const),
	),
);

/** `…/node_modules/.pnpm/x@1/node_modules/@scope/pkg/file.js` -> `@scope/pkg`. */
export function packageName(id: string): string | undefined {
	const path = id.split("node_modules/").pop();
	if (!path || path === id) return undefined;
	const [first, second] = path.split("/");
	return first.startsWith("@") ? `${first}/${second}` : first;
}

export function manualChunks(id: string): string | undefined {
	const name = packageName(id);
	if (!name || PAGE_ONLY.has(name)) return undefined;
	const exact = byPackage.get(name);
	if (exact) return exact;
	for (const [prefix, chunk] of Object.entries(PREFIX_GROUPS)) {
		if (name.startsWith(prefix)) return chunk;
	}
	return undefined;
}
