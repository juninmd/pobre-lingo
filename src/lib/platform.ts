/**
 * Alvo do build: o app desktop (Tauri) é compilado com `vite build --mode desktop`.
 * É uma constante de build, então o ramo web é eliminado do bundle desktop e vice-versa.
 */
export const IS_DESKTOP = import.meta.env.MODE === "desktop";
