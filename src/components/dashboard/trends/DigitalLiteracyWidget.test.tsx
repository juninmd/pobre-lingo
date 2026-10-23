import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { DigitalLiteracyWidget } from "./DigitalLiteracyWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: vi.fn(),
	}),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({
		notify: vi.fn(),
	}),
}));

describe("DigitalLiteracyWidget", () => {
	it("renders correctly", () => {
		render(<DigitalLiteracyWidget />);
		expect(screen.getByText("Digital & Media Literacy")).toBeInTheDocument();
	});
});
