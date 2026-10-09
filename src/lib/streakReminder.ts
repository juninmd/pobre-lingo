/**
 * Lembrete de ofensiva sem servidor: o Service Worker acorda via Periodic
 * Background Sync (PWA instalado, Chromium) e avisa se não houve estudo hoje.
 * O SW não lê localStorage, então a data do último estudo vai para o Cache API.
 */

import { localDay } from "./localDay";

export const REMINDER_CACHE = "pobrelingo-meta";
export const LAST_STUDY_URL = "/__pobrelingo/last-study";
export const REMINDER_TAG = "streak-reminder";
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

type PeriodicSyncRegistration = ServiceWorkerRegistration & {
	periodicSync?: {
		register(tag: string, options: { minInterval: number }): Promise<void>;
		unregister(tag: string): Promise<void>;
	};
};

/** Same local day the SW compares; kept as a re-export for existing importers. */
export { localDay };

export async function publishLastStudyDay(date: Date = new Date()) {
	if (typeof caches === "undefined") return;
	try {
		const cache = await caches.open(REMINDER_CACHE);
		await cache.put(LAST_STUDY_URL, new Response(localDay(date)));
	} catch {
		// Cache API indisponível (modo privado): o lembrete só perde precisão.
	}
}

/** Liga ou desliga o lembrete; devolve true se o navegador aceitou. */
export async function setStreakReminder(enabled: boolean): Promise<boolean> {
	if (!("serviceWorker" in navigator)) return false;
	try {
		const registration = (await navigator.serviceWorker
			.ready) as PeriodicSyncRegistration;
		if (!registration.periodicSync) return false;
		if (!enabled) {
			await registration.periodicSync.unregister(REMINDER_TAG);
			return true;
		}
		const status = await navigator.permissions.query({
			name: "periodic-background-sync" as PermissionName,
		});
		if (status.state !== "granted") return false;
		await registration.periodicSync.register(REMINDER_TAG, {
			minInterval: TWELVE_HOURS,
		});
		return true;
	} catch {
		return false;
	}
}
