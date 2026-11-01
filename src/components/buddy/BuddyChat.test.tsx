import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BuddyChat } from "./BuddyChat";

const base = {
	messages: [
		{ role: "assistant" as const, content: "Hi! What did you eat today?" },
	],
	status: "idle" as const,
	muted: false,
	onToggleMute: vi.fn(),
	onSend: vi.fn(),
	onRestart: vi.fn(),
};

describe("BuddyChat", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => ({
				ok: true,
				json: async () => ({
					corrected: "I like apples.",
					note: "Faltou o s.",
				}),
			})),
		);
	});
	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
	});

	it("mostra a correção em tempo real e aplica no campo", async () => {
		render(<BuddyChat {...base} />);
		const input = screen.getByLabelText("Sua mensagem em inglês");
		fireEvent.change(input, { target: { value: "I like apple." } });
		await act(async () => {
			await vi.advanceTimersByTimeAsync(800);
		});
		expect(screen.getByText("Faltou o s.")).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: /Aplicar/ }));
		expect((input as HTMLInputElement).value).toBe("I like apples.");
	});

	it("envia a mensagem e limpa o campo", () => {
		render(<BuddyChat {...base} />);
		const input = screen.getByLabelText(
			"Sua mensagem em inglês",
		) as HTMLInputElement;
		fireEvent.change(input, { target: { value: "Hello" } });
		fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
		expect(base.onSend).toHaveBeenCalledWith("Hello");
		expect(input.value).toBe("");
	});

	it("depois do Bye! oferece conversar de novo", () => {
		render(<BuddyChat {...base} status="ended" />);
		fireEvent.click(screen.getByRole("button", { name: "Conversar de novo" }));
		expect(base.onRestart).toHaveBeenCalled();
	});
});
