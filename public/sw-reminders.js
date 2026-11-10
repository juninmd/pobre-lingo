// Importado pelo Service Worker gerado pelo Workbox (vite.config.ts).
// Mantenha as constantes em sincronia com src/lib/streakReminder.ts.
const REMINDER_CACHE = "pobrelingo-meta";
const LAST_STUDY_URL = "/__pobrelingo/last-study";
const REMINDER_TAG = "streak-reminder";
// Base em que o app é servido ("/" ou "/pobre-lingo/"): o escopo do próprio SW.
const BASE = new URL(self.registration.scope).pathname;

function localDay(date) {
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}

async function remindIfIdle() {
	const cache = await caches.open(REMINDER_CACHE);
	const stored = await cache.match(LAST_STUDY_URL);
	const lastDay = stored ? await stored.text() : null;
	if (lastDay === localDay(new Date())) return;
	await self.registration.showNotification("Sua ofensiva está esperando 🔥", {
		body: "Cinco minutos de inglês hoje mantêm a sequência viva.",
		icon: `${BASE}pwa-192x192.png`,
		tag: REMINDER_TAG,
		data: { href: BASE },
	});
}

self.addEventListener("periodicsync", (event) => {
	if (event.tag === REMINDER_TAG) event.waitUntil(remindIfIdle());
});

self.addEventListener("notificationclick", (event) => {
	if (event.notification.tag !== REMINDER_TAG) return;
	event.notification.close();
	event.waitUntil(
		self.clients.openWindow(event.notification.data?.href ?? BASE),
	);
});
