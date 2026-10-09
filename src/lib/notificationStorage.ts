/** Notification persistence: inbox, preferences and dedupe. */

import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import {
	type AppNotification,
	DEFAULT_PREFS,
	NOTIFICATION_CATEGORIES,
	type NotificationCategory,
	type NotificationPrefs,
} from "@/lib/notificationCatalog";
import { isSafeInternalHref } from "@/lib/safeHref";
import { isRecord, isStringArray } from "@/lib/storageGuards";

export const NOTIFICATIONS_KEY = "pobrelingo_notifications";
export const NOTIFICATION_PREFS_KEY = "pobrelingo_notification_prefs";
const DISPATCHED_KEYS_KEY = "pobrelingo_notification_dispatched";

const MAX_STORED = 50;
const MAX_DAY_KEYS = 120;
const MAX_PERMANENT_KEYS = 500;
const REMINDER_TIME = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
const DAY_SCOPED_KEY = /:\d{4}-\d{2}-\d{2}$/;

const isDate = (value: unknown): value is string =>
	typeof value === "string" && !Number.isNaN(new Date(value).getTime());

function sanitizePrefs(raw: unknown): NotificationPrefs {
	const stored = isRecord(raw) ? raw : {};
	const categories = isRecord(stored.categories) ? stored.categories : {};
	return {
		browserEnabled:
			typeof stored.browserEnabled === "boolean"
				? stored.browserEnabled
				: DEFAULT_PREFS.browserEnabled,
		reminderTime:
			typeof stored.reminderTime === "string" &&
			REMINDER_TIME.test(stored.reminderTime)
				? stored.reminderTime
				: DEFAULT_PREFS.reminderTime,
		categories: Object.fromEntries(
			NOTIFICATION_CATEGORIES.map((category) => [
				category,
				typeof categories[category] === "boolean"
					? categories[category]
					: DEFAULT_PREFS.categories[category],
			]),
		) as Record<NotificationCategory, boolean>,
	};
}

export function loadPrefs(): NotificationPrefs {
	return sanitizePrefs(
		getLocalStorageItem<unknown>(NOTIFICATION_PREFS_KEY, null),
	);
}

export function savePrefs(prefs: NotificationPrefs): void {
	setLocalStorageItem(NOTIFICATION_PREFS_KEY, prefs);
}

function parseNotification(item: unknown): AppNotification | null {
	if (!isRecord(item)) return null;
	const { id, category, title, body, createdAt, read, href } = item;
	if (typeof id !== "string" || typeof title !== "string") return null;
	if (typeof body !== "string" || !isDate(createdAt)) return null;
	if (!NOTIFICATION_CATEGORIES.includes(category as NotificationCategory)) {
		return null;
	}
	return {
		id,
		category: category as NotificationCategory,
		title,
		body,
		// Storage is editable: only in-app paths may ever be navigated to.
		href: isSafeInternalHref(href) ? href : undefined,
		createdAt,
		read: read === true,
	};
}

export function loadNotifications(): AppNotification[] {
	const stored = getLocalStorageItem<unknown>(NOTIFICATIONS_KEY, []);
	if (!Array.isArray(stored)) return [];
	return stored.flatMap((item) => {
		const parsed = parseNotification(item);
		return parsed ? [parsed] : [];
	});
}

export function saveNotifications(items: AppNotification[]): void {
	setLocalStorageItem(NOTIFICATIONS_KEY, items.slice(0, MAX_STORED));
}

/* -------------------------------------------------------------------------- */
/* Dedupe                                                                     */
/* -------------------------------------------------------------------------- */

function loadDispatchedKeys(): string[] {
	return getLocalStorageItem<string[]>(DISPATCHED_KEYS_KEY, [], isStringArray);
}

/**
 * Only day-scoped keys (`rule:YYYY-MM-DD`) are pruned. Keys like `level-up:N`
 * and `achievement:id` must survive, or their alert would repeat.
 */
function saveDispatchedKeys(keys: string[]): void {
	const daily = keys.filter((key) => DAY_SCOPED_KEY.test(key));
	const permanent = keys.filter((key) => !DAY_SCOPED_KEY.test(key));
	setLocalStorageItem(DISPATCHED_KEYS_KEY, [
		...permanent.slice(-MAX_PERMANENT_KEYS),
		...daily.slice(-MAX_DAY_KEYS),
	]);
}

export function wasDispatched(key: string): boolean {
	return loadDispatchedKeys().includes(key);
}

export function markDispatched(key: string): void {
	const keys = loadDispatchedKeys();
	if (!keys.includes(key)) saveDispatchedKeys([...keys, key]);
}
