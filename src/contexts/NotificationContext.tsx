import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	type AppNotification,
	collectSignals,
	createNotification,
	currentPermission,
	evaluateRules,
	loadNotifications,
	loadPrefs,
	markDispatched,
	type NotificationCategory,
	type NotificationPrefs,
	requestBrowserPermission,
	saveNotifications,
	savePrefs,
	showBrowserNotification,
	wasDispatched,
} from "@/lib/notifications";

/** De quanto em quanto tempo as regras são reavaliadas com a aba aberta. */
const RULE_TICK_MS = 60_000;

interface NotificationContextValue {
	notifications: AppNotification[];
	unreadCount: number;
	prefs: NotificationPrefs;
	permission: NotificationPermission | "unsupported";
	/** Publica uma notificação avulsa (eventos do app). */
	notify: (input: {
		category: NotificationCategory;
		title: string;
		body: string;
		href?: string;
		/** Se informada, a notificação só é publicada uma vez por chave. */
		dedupeKey?: string;
	}) => void;
	markRead: (id: string) => void;
	markAllRead: () => void;
	remove: (id: string) => void;
	clearAll: () => void;
	updatePrefs: (patch: Partial<NotificationPrefs>) => void;
	setCategoryEnabled: (category: NotificationCategory, value: boolean) => void;
	enableBrowserNotifications: () => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
	undefined,
);

export function NotificationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [notifications, setNotifications] =
		useState<AppNotification[]>(loadNotifications);
	const [prefs, setPrefs] = useState<NotificationPrefs>(loadPrefs);
	const [permission, setPermission] = useState(currentPermission);

	const push = useCallback((item: AppNotification, browserEnabled: boolean) => {
		setNotifications((prev) => {
			const next = [item, ...prev];
			saveNotifications(next);
			return next;
		});
		if (browserEnabled) showBrowserNotification(item);
	}, []);

	const notify = useCallback<NotificationContextValue["notify"]>(
		({ category, title, body, href, dedupeKey }) => {
			if (!prefs.categories[category]) return;
			if (dedupeKey && wasDispatched(dedupeKey)) return;
			if (dedupeKey) markDispatched(dedupeKey);
			push(
				createNotification({ category, title, body, href }),
				prefs.browserEnabled,
			);
		},
		[prefs, push],
	);

	// Motor de regras: roda ao montar, a cada minuto e ao voltar para a aba.
	useEffect(() => {
		const run = () => {
			const signals = collectSignals(prefs);
			for (const candidate of evaluateRules(signals)) {
				if (!prefs.categories[candidate.category]) continue;
				if (wasDispatched(candidate.key)) continue;
				markDispatched(candidate.key);
				push(
					createNotification({
						category: candidate.category,
						title: candidate.title,
						body: candidate.body,
						href: candidate.href,
					}),
					prefs.browserEnabled,
				);
			}
		};

		run();
		const interval = setInterval(run, RULE_TICK_MS);
		const onVisible = () => {
			if (document.visibilityState === "visible") run();
		};
		document.addEventListener("visibilitychange", onVisible);

		return () => {
			clearInterval(interval);
			document.removeEventListener("visibilitychange", onVisible);
		};
	}, [prefs, push]);

	const markRead = useCallback((id: string) => {
		setNotifications((prev) => {
			const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
			saveNotifications(next);
			return next;
		});
	}, []);

	const markAllRead = useCallback(() => {
		setNotifications((prev) => {
			const next = prev.map((n) => ({ ...n, read: true }));
			saveNotifications(next);
			return next;
		});
	}, []);

	const remove = useCallback((id: string) => {
		setNotifications((prev) => {
			const next = prev.filter((n) => n.id !== id);
			saveNotifications(next);
			return next;
		});
	}, []);

	const clearAll = useCallback(() => {
		setNotifications([]);
		saveNotifications([]);
	}, []);

	const updatePrefs = useCallback((patch: Partial<NotificationPrefs>) => {
		setPrefs((prev) => {
			const next = { ...prev, ...patch };
			savePrefs(next);
			return next;
		});
	}, []);

	const setCategoryEnabled = useCallback(
		(category: NotificationCategory, value: boolean) => {
			setPrefs((prev) => {
				const next = {
					...prev,
					categories: { ...prev.categories, [category]: value },
				};
				savePrefs(next);
				return next;
			});
		},
		[],
	);

	const enableBrowserNotifications = useCallback(async () => {
		const result = await requestBrowserPermission();
		setPermission(result);
		const granted = result === "granted";
		updatePrefs({ browserEnabled: granted });
		return granted;
	}, [updatePrefs]);

	const value = useMemo<NotificationContextValue>(
		() => ({
			notifications,
			unreadCount: notifications.filter((n) => !n.read).length,
			prefs,
			permission,
			notify,
			markRead,
			markAllRead,
			remove,
			clearAll,
			updatePrefs,
			setCategoryEnabled,
			enableBrowserNotifications,
		}),
		[
			notifications,
			prefs,
			permission,
			notify,
			markRead,
			markAllRead,
			remove,
			clearAll,
			updatePrefs,
			setCategoryEnabled,
			enableBrowserNotifications,
		],
	);

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotifications() {
	const context = useContext(NotificationContext);
	if (context === undefined) {
		throw new Error(
			"useNotifications must be used within a NotificationProvider",
		);
	}
	return context;
}
