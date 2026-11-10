/**
 * Caminho em que o app é servido: "/" na Netlify e num domínio próprio,
 * "/pobre-lingo/" num site de projeto do GitHub Pages. Vem de `VITE_BASE`.
 */
export function normalizeBase(raw: string | undefined): string {
	const trimmed = (raw ?? "").trim();
	if (!trimmed || trimmed === "/") return "/";
	return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
}
