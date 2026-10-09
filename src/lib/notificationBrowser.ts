/** Browser notifications (Notification API); only fire with permission. */

import type { AppNotification } from "@/lib/notificationCatalog";
import { isSafeInternalHref } from "@/lib/safeHref";

export function browserNotificationsSupported(): boolean {
	return typeof window !== "undefined" && "Notification" in window;
}

export function currentPermission(): NotificationPermission | "unsupported" {
	if (!browserNotificationsSupported()) return "unsupported";
	return Notification.permission;
}

export async function requestBrowserPermission(): Promise<
	NotificationPermission | "unsupported"
> {
	if (!browserNotificationsSupported()) return "unsupported";
	try {
		return await Notification.requestPermission();
	} catch {
		return Notification.permission;
	}
}

export function showBrowserNotification(item: AppNotification): void {
	if (!browserNotificationsSupported()) return;
	if (Notification.permission !== "granted") return;
	// Notify only from a background tab: inside the app the bell already gives feedback.
	if (typeof document !== "undefined" && document.visibilityState === "visible")
		return;

	try {
		const notification = new Notification(item.title, {
			body: item.body,
			icon: "/pwa-192x192.png",
			badge: "/pwa-192x192.png",
			tag: item.id,
		});
		notification.onclick = () => {
			window.focus();
			if (isSafeInternalHref(item.href)) window.location.href = item.href;
			notification.close();
		};
	} catch (error) {
		console.warn("Failed to show browser notification:", error);
	}
}
