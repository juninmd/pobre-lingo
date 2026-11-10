/**
 * O app pode ser servido num subcaminho (GitHub Pages: "/pobre-lingo/").
 * Rotas do React Router já recebem o `basename`; tudo o que vai direto ao
 * navegador (`window.location`, ícones de notificação) passa por aqui.
 */

/** Une a base ("/" ou "/x/") a um caminho interno ("/review", "review"). */
export function joinBase(base: string, path: string): string {
	return `${base}${path.replace(/^\/+/, "")}`;
}

/** "/" ou "/pobre-lingo/" (sempre com barra no fim). */
export const BASE_URL = import.meta.env.BASE_URL;

/** `basename` do roteador: a base sem a barra final ("/" quando na raiz). */
export const ROUTER_BASENAME = BASE_URL === "/" ? "/" : BASE_URL.slice(0, -1);

export const withBase = (path: string) => joinBase(BASE_URL, path);
