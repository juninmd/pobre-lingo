const DEFAULT_API_URL = "https://pobre-lingo-api.antonio-code.duckdns.org";

/** `VITE_API_URL` em build; vazio desliga a sincronização. */
const configured = import.meta.env.VITE_API_URL as string | undefined;

export const API_URL = (configured ?? DEFAULT_API_URL).replace(/\/+$/, "");
export const CLOUD_SYNC_AVAILABLE = API_URL !== "";

/**
 * Chaves `plsync_` ficam fora de APP_STORAGE_PREFIXES: o código de sincronização
 * nunca entra no backup em arquivo e "apagar progresso" não desconecta o aparelho.
 */
export const SYNC_KEY_STORAGE = "plsync_key";
export const SYNC_META_STORAGE = "plsync_meta";
