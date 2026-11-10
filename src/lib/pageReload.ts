import { withBase } from "@/lib/baseUrl";

/**
 * Costuras para teste: o jsdom não deixa trocar `window.location`, então quem
 * precisa recarregar ou sair da SPA passa por aqui e os testes fazem mock disto.
 */
export const reloadPage = () => window.location.reload();

/**
 * Navegação com recarga completa: recria o app a partir do armazenamento.
 * Recebe um caminho interno ("/") e acrescenta a base do site.
 */
export const hardNavigate = (href: string) => {
	window.location.href = withBase(href);
};
