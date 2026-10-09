import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	getStudyLog,
	recordStudy,
	recordWordsRead,
	subscribeStudyLog,
} from "@/lib/studyLogStore";
import { STUDY_LOG_KEY, totalsByKind } from "@/lib/studyTime";

describe("studyLogStore", () => {
	beforeEach(() => localStorage.clear());
	afterEach(() => vi.restoreAllMocks());

	it("accumulates writes from independent callers instead of overwriting", () => {
		const staleView = getStudyLog();
		recordStudy("reading", 30);
		recordStudy("listening", 20);
		recordWordsRead(50);

		const log = getStudyLog();
		expect(staleView.wordsRead).toBe(0);
		expect(totalsByKind(log)).toMatchObject({ reading: 30, listening: 20 });
		expect(log.wordsRead).toBe(50);
	});

	it("returns a referentially stable snapshot until the data changes", () => {
		recordStudy("study", 10);
		const first = getStudyLog();
		expect(getStudyLog()).toBe(first);

		recordStudy("study", 10);
		expect(getStudyLog()).not.toBe(first);
	});

	it("caps a single chunk so a forgotten tab cannot inflate study time", () => {
		recordStudy("study", 100_000);
		expect(totalsByKind(getStudyLog()).study).toBe(120);
	});

	it("notifies subscribers on local writes and on other tabs' writes", () => {
		const onChange = vi.fn();
		const unsubscribe = subscribeStudyLog(onChange);

		recordStudy("reading", 5);
		expect(onChange).toHaveBeenCalledTimes(1);

		window.dispatchEvent(new StorageEvent("storage", { key: STUDY_LOG_KEY }));
		expect(onChange).toHaveBeenCalledTimes(2);

		window.dispatchEvent(new StorageEvent("storage", { key: "unrelated" }));
		expect(onChange).toHaveBeenCalledTimes(2);

		window.dispatchEvent(new StorageEvent("storage", { key: null }));
		expect(onChange).toHaveBeenCalledTimes(3);

		unsubscribe();
		recordStudy("reading", 5);
		expect(onChange).toHaveBeenCalledTimes(3);
	});

	it("falls back to an empty log when the stored value is corrupt", () => {
		localStorage.setItem(STUDY_LOG_KEY, "{oops");
		expect(getStudyLog()).toEqual({ days: {}, wordsRead: 0 });
		localStorage.setItem(STUDY_LOG_KEY, '"x"');
		expect(getStudyLog()).toEqual({ days: {}, wordsRead: 0 });
	});

	it("does not throw when the disk is full and does not announce a write that failed", () => {
		const onChange = vi.fn();
		subscribeStudyLog(onChange);
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});

		expect(() => recordStudy("reading", 5)).not.toThrow();
		expect(onChange).not.toHaveBeenCalled();
	});
});
