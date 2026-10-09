/**
 * Núcleo do sistema de notificações.
 *
 * Duas origens alimentam a mesma caixa de entrada:
 *  - eventos disparados pelo app (conquista desbloqueada, nível novo, etc.);
 *  - regras avaliadas periodicamente sobre o estado local (ofensiva em risco,
 *    revisões vencidas, meta diária incompleta).
 *
 * Tudo é client-side: sem servidor, sem push remoto. Este arquivo só reexporta
 * os módulos por responsabilidade, para os imports existentes continuarem iguais.
 */

export * from "@/lib/notificationBrowser";
export * from "@/lib/notificationCatalog";
export * from "@/lib/notificationRules";
export * from "@/lib/notificationStorage";
export { isSafeInternalHref } from "@/lib/safeHref";
