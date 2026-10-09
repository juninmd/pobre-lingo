import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	NotificationProvider,
	useNotifications,
} from "@/contexts/NotificationContext";
import {
	DEFAULT_PREFS,
	NOTIFICATION_CATEGORIES,
	NOTIFICATION_PREFS_KEY,
	NOTIFICATIONS_KEY,
} from "@/lib/notifications";

const wrapper = ({ children }: { children: ReactNode }) => (
	<NotificationProvider>{children}</NotificationProvider>
);

const mount = () => renderHook(() => useNotifications(), { wrapper });

/** Rules would otherwise add their own notices on mount and muddy the inbox assertions. */
const muteAllCategories = () =>
	localStorage.setItem(
		NOTIFICATION_PREFS_KEY,
		JSON.stringify({
			categories: Object.fromEntries(
				NOTIFICATION_CATEGORIES.map((category) => [category, false]),
			),
		}),
	);

const base = {
	category: "content",
	title: "t",
	body: "b",
	createdAt: "2026-01-01T00:00:00.000Z",
	read: false,
};

describe("NotificationProvider", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.spyOn(console, "warn").mockImplementation(() => {});
	});
	afterEach(() => vi.restoreAllMocks());

	it.each(["x", "null", "5", "[]", '{"categories":"x"}', "{oops"])(
		"mounts with default prefs when the stored prefs are %s",
		(raw) => {
			localStorage.setItem(NOTIFICATION_PREFS_KEY, raw);
			const { result } = mount();
			expect(result.current.prefs).toEqual(DEFAULT_PREFS);
		},
	);

	it("keeps valid stored prefs and repairs only the broken fields", () => {
		localStorage.setItem(
			NOTIFICATION_PREFS_KEY,
			JSON.stringify({
				browserEnabled: "yes",
				reminderTime: "07:30",
				categories: { streak: false, review: "nope" },
			}),
		);
		const { prefs } = mount().result.current;
		expect(prefs.reminderTime).toBe("07:30");
		expect(prefs.browserEnabled).toBe(false);
		expect(prefs.categories.streak).toBe(false);
		expect(prefs.categories.review).toBe(true);
	});

	it.each(["x", "null", '{"a":1}', "7"])(
		"mounts with an empty inbox when the stored inbox is %s",
		(raw) => {
			muteAllCategories();
			localStorage.setItem(NOTIFICATIONS_KEY, raw);
			const { result } = mount();
			expect(result.current.notifications).toEqual([]);
		},
	);

	it("drops malformed inbox entries but keeps the good ones", () => {
		muteAllCategories();
		const good = { ...base, id: "a", category: "streak" };
		localStorage.setItem(
			NOTIFICATIONS_KEY,
			JSON.stringify([good, null, { id: 1 }, { ...good, category: "spam" }]),
		);
		const { result } = mount();
		expect(result.current.notifications.map((n) => n.id)).toEqual(["a"]);
	});

	it("never keeps an off-site or scripted href from storage", () => {
		muteAllCategories();
		localStorage.setItem(
			NOTIFICATIONS_KEY,
			JSON.stringify([
				{ ...base, id: "ok", href: "/review" },
				{ ...base, id: "proto", href: "//evil.example/x" },
				{ ...base, id: "scheme", href: "javascript:alert(1)" },
				{ ...base, id: "abs", href: "https://evil.example" },
			]),
		);
		const hrefs = Object.fromEntries(
			mount().result.current.notifications.map((n) => [n.id, n.href]),
		);
		expect(hrefs).toEqual({
			ok: "/review",
			proto: undefined,
			scheme: undefined,
			abs: undefined,
		});
	});
});
