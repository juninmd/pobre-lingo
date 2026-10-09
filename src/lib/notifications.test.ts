import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { localDay } from "@/lib/localDay";
import {
	collectSignals,
	createNotification,
	DEFAULT_PREFS,
	evaluateRules,
	isSafeInternalHref,
	markDispatched,
	type NotificationSignals,
	showBrowserNotification,
	wasDispatched,
} from "@/lib/notifications";
import {
	EVENING_LOCAL_DAY,
	EVENING_UTC_DAY,
	setupLocalEvening,
} from "@/test-utils/localEvening";

const at = (hour: number, minute = 0) => new Date(2026, 6, 30, hour, minute);

const signals = (
	overrides: Partial<NotificationSignals> = {},
): NotificationSignals => ({
	now: at(20),
	streak: 0,
	lastActivityDate: null,
	activityToday: 0,
	dueReviews: 0,
	reminderHour: 19,
	reminderMinute: 0,
	...overrides,
});

const keys = (s: NotificationSignals) =>
	evaluateRules(s).map((c) => c.key.split(":")[0]);

describe("evaluateRules", () => {
	it("warns about a streak at risk only at night and only before studying", () => {
		expect(keys(signals({ streak: 4 }))).toContain("streak-risk");
		expect(keys(signals({ streak: 4, now: at(10) }))).not.toContain(
			"streak-risk",
		);
		expect(keys(signals({ streak: 4, activityToday: 1 }))).not.toContain(
			"streak-risk",
		);
		expect(keys(signals({ streak: 0 }))).not.toContain("streak-risk");
	});

	it("invites a comeback after three idle days", () => {
		const idle = signals({ lastActivityDate: "2026-07-26T10:00:00" });
		expect(keys(idle)).toContain("comeback");
		const recent = signals({ lastActivityDate: "2026-07-29T10:00:00" });
		expect(keys(recent)).not.toContain("comeback");
	});

	it("nudges reviews only when cards are due, linking to the review page", () => {
		expect(keys(signals())).not.toContain("reviews-due");
		const due = evaluateRules(signals({ dueReviews: 3 })).find((c) =>
			c.key.startsWith("reviews-due"),
		);
		expect(due?.href).toBe("/review");
		expect(due?.title).toContain("3 cards prontos");
	});

	it("reminds at the chosen hour and pushes the half-done daily goal", () => {
		expect(keys(signals({ now: at(18) }))).not.toContain("daily-reminder");
		expect(keys(signals({ now: at(19) }))).toContain("daily-reminder");
		const half = signals({ now: at(14), activityToday: 2 });
		expect(keys(half)).toContain("daily-goal");
		expect(keys({ ...half, activityToday: 5 })).not.toContain("daily-goal");
	});

	it("only ever emits internal hrefs", () => {
		const all = evaluateRules(
			signals({ streak: 3, dueReviews: 2, lastActivityDate: "2026-07-20" }),
		);
		for (const candidate of all) {
			expect(isSafeInternalHref(candidate.href ?? "/")).toBe(true);
		}
	});
});

describe("day keys at a local evening already past UTC midnight", () => {
	setupLocalEvening();
	beforeEach(() => localStorage.clear());

	it("scopes day rules to the learner's local day, not UTC", () => {
		const [first] = evaluateRules(signals({ now: new Date(), streak: 2 }));

		expect(first.key).toBe(`streak-risk:${EVENING_LOCAL_DAY}`);
		expect(first.key).not.toContain(EVENING_UTC_DAY);
	});

	it("counts today's activity by the local day key and ignores the UTC one", () => {
		localStorage.setItem(
			"pobrelingo_activity_log",
			JSON.stringify([
				{ date: EVENING_LOCAL_DAY, count: 4 },
				{ date: EVENING_UTC_DAY, count: 9 },
			]),
		);

		expect(collectSignals(DEFAULT_PREFS, new Date()).activityToday).toBe(4);
	});
});

describe("collectSignals", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.spyOn(console, "warn").mockImplementation(() => {});
	});
	afterEach(() => vi.restoreAllMocks());

	it("survives garbage in every key it reads", () => {
		for (const key of [
			"pobrelingo_activity_log",
			"pobrelingo_streak",
			"pobrelingo_last_activity_date",
			"pobrelingo_srs_cards",
		]) {
			localStorage.setItem(key, '{"x":1}');
		}
		const result = collectSignals(
			{ ...DEFAULT_PREFS, reminderTime: "x" },
			at(9),
		);
		expect(result).toMatchObject({
			streak: 0,
			lastActivityDate: null,
			activityToday: 0,
			dueReviews: 0,
			reminderHour: 19,
			reminderMinute: 0,
		});
	});
});

describe("dispatch dedupe", () => {
	beforeEach(() => localStorage.clear());

	it("remembers a key once marked", () => {
		expect(wasDispatched("streak-risk:2026-07-30")).toBe(false);
		markDispatched("streak-risk:2026-07-30");
		expect(wasDispatched("streak-risk:2026-07-30")).toBe(true);
	});

	it("never forgets level-up or achievement keys, however many days pass", () => {
		markDispatched("level-up:3");
		markDispatched("achievement:scholar");
		for (let day = 1; day <= 150; day++) {
			const stamp = new Date(2025, 0, day);
			markDispatched(`daily-reminder:${localDay(stamp)}`);
		}

		expect(wasDispatched("level-up:3")).toBe(true);
		expect(wasDispatched("achievement:scholar")).toBe(true);
	});

	it("still caps the day-scoped keys so storage does not grow forever", () => {
		for (let day = 0; day < 400; day++) {
			markDispatched(`daily-reminder:${localDay(new Date(2025, 0, 1 + day))}`);
		}
		const stored = JSON.parse(
			localStorage.getItem("pobrelingo_notification_dispatched") ?? "[]",
		) as string[];

		expect(stored.length).toBeLessThanOrEqual(120);
		expect(
			wasDispatched(`daily-reminder:${localDay(new Date(2025, 0, 1))}`),
		).toBe(false);
		expect(
			wasDispatched(`daily-reminder:${localDay(new Date(2025, 0, 400))}`),
		).toBe(true);
	});
});

describe("isSafeInternalHref", () => {
	it.each(["/", "/review", "/lessons/1?x=2#top"])("accepts %s", (href) => {
		expect(isSafeInternalHref(href)).toBe(true);
	});

	it.each([
		"//evil.example",
		"/\\evil.example",
		"/\t/evil.example",
		"https://evil.example",
		"javascript:alert(1)",
		"data:text/html,x",
		"review",
		"",
		" /review",
		"/re view",
		undefined,
		null,
		42,
	])("rejects %j", (href) => {
		expect(isSafeInternalHref(href)).toBe(false);
	});
});

describe("hrefs on outgoing notifications", () => {
	it("createNotification drops an unsafe href", () => {
		const unsafe = createNotification({
			category: "content",
			title: "t",
			body: "b",
			href: "//evil.example",
		});
		expect(unsafe.href).toBeUndefined();
		const safe = createNotification({
			category: "content",
			title: "t",
			body: "b",
			href: "/review",
		});
		expect(safe.href).toBe("/review");
	});

	describe("browser notification click", () => {
		let lastShown: { onclick: (() => void) | null } | undefined;

		beforeEach(() => {
			lastShown = undefined;
			class FakeNotification {
				static permission = "granted";
				onclick: (() => void) | null = null;
				constructor() {
					lastShown = this;
				}
				close() {}
			}
			vi.stubGlobal("Notification", FakeNotification);
			vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
			window.history.replaceState(null, "", "/");
		});
		afterEach(() => {
			vi.unstubAllGlobals();
			vi.restoreAllMocks();
		});

		const show = (href: string) => {
			showBrowserNotification({
				id: "n1",
				category: "content",
				title: "t",
				body: "b",
				href,
				createdAt: "2026-01-01T00:00:00.000Z",
				read: false,
			});
			lastShown?.onclick?.();
		};

		it("follows a safe internal link", () => {
			show("/#opened");
			expect(window.location.hash).toBe("#opened");
		});

		it("does not navigate to a protocol-relative link planted in storage", () => {
			show("//evil.example/#opened");
			expect(window.location.hash).toBe("");
			expect(window.location.hostname).not.toBe("evil.example");
		});
	});
});
