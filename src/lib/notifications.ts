/**
 * Núcleo do sistema de notificações.
 *
 * Duas origens alimentam a mesma caixa de entrada:
 *  - eventos disparados pelo app (conquista desbloqueada, nível novo, etc.);
 *  - regras avaliadas periodicamente sobre o estado local (ofensiva em risco,
 *    revisões vencidas, meta diária incompleta).
 *
 * Tudo é client-side: sem servidor, sem push remoto. As notificações do
 * navegador usam a Notification API e só disparam com permissão concedida.
 */

import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import { getDueCards, loadCards } from "@/lib/srs";

export const NOTIFICATIONS_KEY = "pobrelingo_notifications";
export const NOTIFICATION_PREFS_KEY = "pobrelingo_notification_prefs";
const DISPATCHED_KEYS_KEY = "pobrelingo_notification_dispatched";

const MAX_STORED = 50;
const MAX_DISPATCH_KEYS = 120;
const DAILY_GOAL = 5;

export type NotificationCategory =
	| "streak"
	| "review"
	| "quest"
	| "achievement"
	| "content";

export const CATEGORY_LABELS: Record<NotificationCategory, string> = {
	streak: "Ofensiva",
	review: "Revisões",
	quest: "Missões diárias",
	achievement: "Conquistas",
	content: "Conteúdo novo",
};

export const CATEGORY_DESCRIPTIONS: Record<NotificationCategory, string> = {
	streak: "Avisos quando sua sequência de dias estiver em risco.",
	review: "Lembretes de cards com revisão vencida.",
	quest: "Progresso das missões e da meta diária.",
	achievement: "Conquistas desbloqueadas e novos níveis.",
	content: "Palavra do dia, dicas e novidades.",
};

export interface AppNotification {
	id: string;
	category: NotificationCategory;
	title: string;
	body: string;
	/** Rota interna aberta ao clicar. */
	href?: string;
	createdAt: string;
	read: boolean;
}

export interface NotificationPrefs {
	/** Espelha a permissão do navegador + opt-in do usuário. */
	browserEnabled: boolean;
	/** Hora do lembrete diário, formato "HH:mm". */
	reminderTime: string;
	categories: Record<NotificationCategory, boolean>;
}

export const DEFAULT_PREFS: NotificationPrefs = {
	browserEnabled: false,
	reminderTime: "19:00",
	categories: {
		streak: true,
		review: true,
		quest: true,
		achievement: true,
		content: true,
	},
};

export function loadPrefs(): NotificationPrefs {
	const stored = getLocalStorageItem<Partial<NotificationPrefs>>(
		NOTIFICATION_PREFS_KEY,
		{},
	);
	return {
		...DEFAULT_PREFS,
		...stored,
		categories: { ...DEFAULT_PREFS.categories, ...stored.categories },
	};
}

export function savePrefs(prefs: NotificationPrefs): void {
	setLocalStorageItem(NOTIFICATION_PREFS_KEY, prefs);
}

export function loadNotifications(): AppNotification[] {
	return getLocalStorageItem<AppNotification[]>(NOTIFICATIONS_KEY, []);
}

export function saveNotifications(items: AppNotification[]): void {
	setLocalStorageItem(NOTIFICATIONS_KEY, items.slice(0, MAX_STORED));
}

/* -------------------------------------------------------------------------- */
/* Notificações do navegador                                                  */
/* -------------------------------------------------------------------------- */

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
	// Só notifica fora da aba: dentro do app o sino já dá o feedback.
	if (typeof document !== "undefined" && document.visibilityState === "visible")
		return;

	try {
		const notification = new Notification(item.title, {
			body: item.body,
			icon: "/pwa-192x192.svg",
			badge: "/pwa-192x192.svg",
			tag: item.id,
		});
		notification.onclick = () => {
			window.focus();
			if (item.href) window.location.href = item.href;
			notification.close();
		};
	} catch (error) {
		console.warn("Falha ao exibir notificação do navegador:", error);
	}
}

/* -------------------------------------------------------------------------- */
/* Deduplicação                                                               */
/* -------------------------------------------------------------------------- */

function loadDispatchedKeys(): string[] {
	return getLocalStorageItem<string[]>(DISPATCHED_KEYS_KEY, []);
}

function saveDispatchedKeys(keys: string[]): void {
	setLocalStorageItem(DISPATCHED_KEYS_KEY, keys.slice(-MAX_DISPATCH_KEYS));
}

export function wasDispatched(key: string): boolean {
	return loadDispatchedKeys().includes(key);
}

export function markDispatched(key: string): void {
	const keys = loadDispatchedKeys();
	if (!keys.includes(key)) saveDispatchedKeys([...keys, key]);
}

/* -------------------------------------------------------------------------- */
/* Motor de regras                                                            */
/* -------------------------------------------------------------------------- */

export interface NotificationSignals {
	now: Date;
	streak: number;
	lastActivityDate: string | null;
	activityToday: number;
	dueReviews: number;
	reminderHour: number;
	reminderMinute: number;
}

function todayKey(now: Date): string {
	// Chave local (não UTC): o "dia" do usuário é o do fuso dele.
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, "0");
	const d = String(now.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

function daysSince(iso: string | null, now: Date): number | null {
	if (!iso) return null;
	const then = new Date(iso);
	if (Number.isNaN(then.getTime())) return null;
	const a = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
	).getTime();
	const b = new Date(
		then.getFullYear(),
		then.getMonth(),
		then.getDate(),
	).getTime();
	return Math.round((a - b) / 86_400_000);
}

/** Lê o estado persistido que as regras precisam avaliar. */
export function collectSignals(
	prefs: NotificationPrefs,
	now: Date = new Date(),
): NotificationSignals {
	const [hourRaw, minuteRaw] = prefs.reminderTime.split(":");
	const reminderHour = Number.parseInt(hourRaw, 10);
	const reminderMinute = Number.parseInt(minuteRaw, 10);

	const activityLog = getLocalStorageItem<{ date: string; count: number }[]>(
		"pobrelingo_activity_log",
		[],
	);

	return {
		now,
		streak: getLocalStorageItem<number>("pobrelingo_streak", 0),
		lastActivityDate: getLocalStorageItem<string | null>(
			"pobrelingo_last_activity_date",
			null,
		),
		activityToday:
			activityLog.find((e) => e.date === todayKey(now))?.count ?? 0,
		dueReviews: getDueCards(loadCards(), now).length,
		reminderHour: Number.isNaN(reminderHour) ? 19 : reminderHour,
		reminderMinute: Number.isNaN(reminderMinute) ? 0 : reminderMinute,
	};
}

export interface NotificationCandidate {
	/** Chave de dedupe — normalmente `regra:AAAA-MM-DD`. */
	key: string;
	category: NotificationCategory;
	title: string;
	body: string;
	href?: string;
}

/**
 * Avalia todas as regras e devolve o que deveria ser notificado agora.
 * A dedupe por chave é responsabilidade de quem consome.
 */
export function evaluateRules(
	signals: NotificationSignals,
): NotificationCandidate[] {
	const { now, streak, activityToday, dueReviews, lastActivityDate } = signals;
	const day = todayKey(now);
	const hour = now.getHours();
	const idleDays = daysSince(lastActivityDate, now);
	const studiedToday = activityToday > 0;
	const candidates: NotificationCandidate[] = [];

	// Ofensiva em risco: só faz sentido à noite e se ainda não estudou hoje.
	if (streak > 0 && !studiedToday && hour >= 18) {
		candidates.push({
			key: `streak-risk:${day}`,
			category: "streak",
			title: `🔥 Sua ofensiva de ${streak} ${streak === 1 ? "dia" : "dias"} está em risco`,
			body: "Faça uma atividade rápida antes da meia-noite para manter a sequência viva.",
			href: "/",
		});
	}

	// Volta por cima depois de sumir.
	if (idleDays !== null && idleDays >= 3) {
		candidates.push({
			key: `comeback:${day}`,
			category: "streak",
			title: "Bora retomar? 👋",
			body: `Você está há ${idleDays} dias sem estudar. Cinco minutos já recolocam você nos trilhos.`,
			href: "/",
		});
	}

	// Revisões vencidas: o sinal de maior valor pedagógico.
	if (dueReviews > 0) {
		candidates.push({
			key: `reviews-due:${day}`,
			category: "review",
			title: `🧠 ${dueReviews} ${dueReviews === 1 ? "card pronto" : "cards prontos"} para revisão`,
			body: "Revisar no momento certo é o que fixa o vocabulário de verdade.",
			href: "/review",
		});
	}

	// Lembrete diário no horário escolhido.
	if (!studiedToday && hour >= signals.reminderHour) {
		candidates.push({
			key: `daily-reminder:${day}`,
			category: "quest",
			title: "Hora do inglês ⏰",
			body: "Sua sessão de hoje ainda não começou. Que tal uma lição rápida agora?",
			href: "/",
		});
	}

	// Meta diária pela metade: empurrãozinho para fechar o dia.
	if (studiedToday && activityToday < DAILY_GOAL && hour >= 12) {
		const missing = DAILY_GOAL - activityToday;
		candidates.push({
			key: `daily-goal:${day}`,
			category: "quest",
			title: "Você está quase lá 🎯",
			body: `Faltam ${missing} ${missing === 1 ? "atividade" : "atividades"} para completar a meta de hoje.`,
			href: "/",
		});
	}

	// Palavra do dia — conteúdo leve para quem já cumpriu o resto.
	candidates.push({
		key: `word-of-day:${day}`,
		category: "content",
		title: "📖 Palavra do dia disponível",
		body: "Uma palavra nova te espera no painel. Leva 30 segundos.",
		href: "/",
	});

	return candidates;
}

/** Cria uma notificação pronta para a caixa de entrada. */
export function createNotification(
	input: Omit<AppNotification, "id" | "createdAt" | "read"> & { id?: string },
): AppNotification {
	return {
		id:
			input.id ??
			`${input.category}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
		category: input.category,
		title: input.title,
		body: input.body,
		href: input.href,
		createdAt: new Date().toISOString(),
		read: false,
	};
}
