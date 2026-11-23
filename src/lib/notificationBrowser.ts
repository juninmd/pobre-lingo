/** Browser notifications (Notification API); only fire with permission. */

import { routeHref, withBase } from "@/lib/baseUrl";
import type { AppNotification } from "@/lib/notificationCatalog";
import { sendDesktopNotification } from "@/lib/desktop/notify";
import { IS_DESKTOP } from "@/lib/platform";
import { isSafeInternalHref } from "@/lib/safeHref";

export function browserNotificationsSupported(): boolean {
	// Desktop: toast nativo do Windows, sem a permissão do navegador.
	if (IS_DESKTOP) return true;
	return typeof window !== "undefined" && "Notification" in window;
}

export function currentPermission(): NotificationPermission | "unsupported" {
	if (!browserNotificationsSupported()) return "unsupported";
	if (IS_DESKTOP) return "granted";
	return Notification.permission;
}

export async function requestBrowserPermission(): Promise<
	NotificationPermission | "unsupported"
> {
	if (!browserNotificationsSupported()) return "unsupported";
	if (IS_DESKTOP) return "granted";
	try {
		return await Notification.requestPermission();
	} catch {
		return Notification.permission;
	}
}

export function showBrowserNotification(item: AppNotification): void {
	if (!browserNotificationsSupported()) return;
	if (IS_DESKTOP) {
		// Com a janela em foco o sino já dá retorno; escondida na bandeja, vale o toast.
		if (!document.hasFocus()) void sendDesktopNotification(item.title, item.body);
		return;
	}
	if (Notification.permission !== "granted") return;
	// Notify only from a background tab: inside the app the bell already gives feedback.
	if (typeof document !== "undefined" && document.visibilityState === "visible")
		return;

	try {
		const notification = new Notification(item.title, {
			body: item.body,
			icon: withBase("pwa-192x192.png"),
			badge: withBase("pwa-192x192.png"),
			tag: item.id,
		});
		notification.onclick = () => {
			window.focus();
			if (isSafeInternalHref(item.href))
				window.location.href = routeHref(item.href);
			notification.close();
		};
	} catch (error) {
		console.warn("Failed to show browser notification:", error);
	}
}
