import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { START_TIMEOUT_MS, useSpeechInput } from "./useSpeechInput";

type Fake = {
	onstart?: () => void;
	onend: (() => void) | null;
	start: () => void;
	abort: () => void;
	stop: () => void;
};
let instances: Fake[] = [];
let startsOnStart = false;

class FakeRecognition {
	lang = "";
	interimResults = false;
	maxAlternatives = 1;
	onresult = null;
	onend: (() => void) | null = null;
	onerror = null;
	onstart?: () => void;
	abort = vi.fn();
	stop = vi.fn();
	constructor() {
		instances.push(this as unknown as Fake);
	}
	start() {
		if (startsOnStart) queueMicrotask(() => this.onstart?.());
	}
}

describe("useSpeechInput watchdog", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		instances = [];
		(
			window as unknown as { webkitSpeechRecognition: unknown }
		).webkitSpeechRecognition = FakeRecognition;
	});
	afterEach(() => {
		vi.useRealTimers();
		(
			window as unknown as { webkitSpeechRecognition?: unknown }
		).webkitSpeechRecognition = undefined;
	});

	it("hides the mic when recognition never starts", () => {
		startsOnStart = false;
		const { result } = renderHook(() => useSpeechInput(() => undefined));
		expect(result.current.supported).toBe(true);
		act(() => result.current.toggle());
		expect(result.current.listening).toBe(true);
		act(() => vi.advanceTimersByTime(START_TIMEOUT_MS + 10));
		expect(result.current.listening).toBe(false);
		expect(result.current.supported).toBe(false);
	});

	it("keeps working when recognition starts in time", async () => {
		startsOnStart = true;
		const { result } = renderHook(() => useSpeechInput(() => undefined));
		act(() => result.current.toggle());
		await act(async () => {
			await Promise.resolve();
			vi.advanceTimersByTime(START_TIMEOUT_MS + 10);
		});
		expect(result.current.listening).toBe(true);
		expect(result.current.supported).toBe(true);
	});
});
