/** Alvo do build: "desktop" é o app Tauri (WebView2); qualquer outro modo é o site/PWA. */
export const DESKTOP_MODE = "desktop";

export const isDesktopMode = (mode: string): boolean => mode === DESKTOP_MODE;

/**
 * Base de URL do build. No desktop os assets são servidos da raiz do protocolo do
 * Tauri, então ignora `VITE_BASE` (herdado do CI do GitHub Pages) e usa "/".
 */
export const resolveBase = (
	mode: string,
	normalized: string,
): string => (isDesktopMode(mode) ? "/" : normalized);
