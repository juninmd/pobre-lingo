import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DogmeELTWidget } from "./DogmeELTWidget";

describe("DogmeELTWidget", () => {
	it("renders correctly", () => {
		render(<DogmeELTWidget />);
		expect(screen.getByText("Dogme ELT")).toBeInTheDocument();
		expect(screen.getByText("TREND 2025")).toBeInTheDocument();
	});
});

vi.mock("@/contexts/NotificationContext", () => ({ useNotifications: () => ({ notify: vi.fn() }), NotificationProvider: ({ children }: any) => <>{children}</> }));

vi.mock("@/contexts/GamificationContext", () => ({ useGamification: () => ({ addXp: vi.fn(), gems: 0, addGem: vi.fn() }), GamificationProvider: ({ children }: any) => <>{children}</> }));
