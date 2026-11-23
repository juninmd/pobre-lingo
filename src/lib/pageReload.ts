import { withBase } from "@/lib/baseUrl";
import { IS_DESKTOP } from "@/lib/platform";

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
	if (IS_DESKTOP) {
		// Roteador por hash: trocar o hash não recarrega, então recarrega em seguida.
		window.location.hash = href;
		window.location.reload();
		return;
	}
	window.location.href = withBase(href);
};
