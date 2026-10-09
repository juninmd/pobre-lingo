import { act, fireEvent } from "@testing-library/react";

// user-event is not a dependency: emulate the browser's tab order and native button activation.
function tabbables(): HTMLElement[] {
	return Array.from(document.body.querySelectorAll<HTMLElement>("*")).filter(
		(el) => el.tabIndex >= 0 && !el.matches(":disabled"),
	);
}

/** Moves focus like the Tab key; only elements a real keyboard could reach are candidates. */
export function tab({ shift = false } = {}): HTMLElement {
	const order = tabbables();
	if (order.length === 0) throw new Error("nothing is reachable by Tab");
	const at = order.indexOf(document.activeElement as HTMLElement);
	const next = order[(at + (shift ? -1 : 1) + order.length) % order.length];
	act(() => next.focus());
	return next;
}

/** Presses a key on the focused element; native buttons click on Enter (keydown) and Space (keyup). */
export function press(key: "Enter" | " "): void {
	const el = document.activeElement as HTMLElement;
	const isButton = el instanceof HTMLButtonElement && !el.disabled;
	const keyDownDefault = fireEvent.keyDown(el, { key });
	if (key === "Enter" && isButton && keyDownDefault) fireEvent.click(el);
	const keyUpDefault = fireEvent.keyUp(el, { key });
	if (key === " " && isButton && keyDownDefault && keyUpDefault) {
		fireEvent.click(el);
	}
}

/** Holds an arrow key for a moment: widgets that move focus on a timeout only select while it is down. */
export async function holdArrow(
	key: "ArrowDown" | "ArrowUp",
	holdMs = 60,
): Promise<void> {
	await act(async () => {
		fireEvent.keyDown(document.activeElement as HTMLElement, { key });
		await new Promise((resolve) => setTimeout(resolve, holdMs));
		fireEvent.keyUp(document.activeElement as HTMLElement, { key });
	});
}
