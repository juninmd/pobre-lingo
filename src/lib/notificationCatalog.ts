/** Types, labels and defaults for the notification system. */

export const NOTIFICATION_CATEGORIES = [
	"streak",
	"review",
	"quest",
	"achievement",
	"content",
] as const;

export type NotificationCategory = (typeof NOTIFICATION_CATEGORIES)[number];

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
	/** Internal route opened on click. */
	href?: string;
	createdAt: string;
	read: boolean;
}

export interface NotificationPrefs {
	/** Mirrors the browser permission plus the user's opt-in. */
	browserEnabled: boolean;
	/** Daily reminder time, "HH:mm" format. */
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
