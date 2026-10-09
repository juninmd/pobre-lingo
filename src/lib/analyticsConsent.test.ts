import { beforeEach, describe, expect, it, vi } from "vitest";

const init = vi.fn();
vi.mock("logrocket", () => ({ default: { init } }));

import {
	LOGROCKET_OPTIONS,
	setAnalyticsConsent,
	startAnalyticsIfConsented,
} from "./analyticsConsent";

describe("startAnalyticsIfConsented", () => {
	beforeEach(() => {
		localStorage.clear();
		init.mockClear();
	});

	it("records nothing without explicit consent (LGPD)", async () => {
		await startAnalyticsIfConsented();
		setAnalyticsConsent(false);
		await startAnalyticsIfConsented();
		expect(init).not.toHaveBeenCalled();
	});

	it("starts with input and private-text sanitizers so typed content is never replayed", async () => {
		setAnalyticsConsent(true);
		await startAnalyticsIfConsented();
		expect(init).toHaveBeenCalledTimes(1);
		const [, options] = init.mock.calls[0];
		expect(options).toBe(LOGROCKET_OPTIONS);
		expect(options.dom.inputSanitizer).toBe(true);
		expect(options.dom.textSanitizer).toContain("[data-private]");
	});
});
