import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ShareStreakButtons } from "@/components/streaks/ShareStreakButtons";

vi.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: vi.fn() }) }));

describe("ShareStreakButtons", () => {
	afterEach(() => vi.restoreAllMocks());

	it("opens WhatsApp without handing the new tab a reference to this window", () => {
		const open = vi.spyOn(window, "open").mockReturnValue(null);
		render(<ShareStreakButtons streak={3} />);

		fireEvent.click(screen.getByRole("button", { name: /WhatsApp/ }));

		expect(open).toHaveBeenCalledTimes(1);
		const [url, target, features] = open.mock.calls[0];
		expect(String(url)).toContain("https://wa.me/?text=");
		expect(target).toBe("_blank");
		expect(features).toBe("noopener,noreferrer");
	});

	it("renders nothing when there is no streak to share", () => {
		const { container } = render(<ShareStreakButtons streak={0} />);
		expect(container).toBeEmptyDOMElement();
	});
});
