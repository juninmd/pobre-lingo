import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePersistentState } from "@/hooks/usePersistentState";
import { isStringArray } from "@/lib/storageGuards";

describe("usePersistentState", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.spyOn(console, "warn").mockImplementation(() => {});
	});
	afterEach(() => vi.restoreAllMocks());

	it("persists updates and reloads them", () => {
		const first = renderHook(() => usePersistentState<string[]>("k", []));
		act(() => first.result.current[1](["a"]));
		first.unmount();

		const second = renderHook(() => usePersistentState<string[]>("k", []));
		expect(second.result.current[0]).toEqual(["a"]);
	});

	it("starts from the default when the stored shape is wrong", () => {
		localStorage.setItem("k", '{"not":"an array"}');
		const { result } = renderHook(() =>
			usePersistentState<string[]>("k", [], isStringArray),
		);
		expect(result.current[0]).toEqual([]);
	});

	it("keeps the in-memory value when the disk is full", () => {
		const { result } = renderHook(() => usePersistentState<string[]>("k", []));
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});

		act(() => result.current[1](["a"]));

		expect(result.current[0]).toEqual(["a"]);
	});

	it("follows writes made by another tab", () => {
		const { result } = renderHook(() =>
			usePersistentState<string[]>("k", [], isStringArray),
		);
		localStorage.setItem("k", '["from-other-tab"]');

		act(() => {
			window.dispatchEvent(new StorageEvent("storage", { key: "k" }));
		});

		expect(result.current[0]).toEqual(["from-other-tab"]);
	});

	it("ignores other tabs' writes to unrelated keys and corrupt values", () => {
		const { result } = renderHook(() =>
			usePersistentState<string[]>("k", ["mine"], isStringArray),
		);
		localStorage.setItem("other", '["x"]');
		act(() => {
			window.dispatchEvent(new StorageEvent("storage", { key: "other" }));
		});
		expect(result.current[0]).toEqual(["mine"]);

		localStorage.setItem("k", "garbage");
		act(() => {
			window.dispatchEvent(new StorageEvent("storage", { key: "k" }));
		});
		expect(result.current[0]).toEqual(["mine"]);
	});
});
