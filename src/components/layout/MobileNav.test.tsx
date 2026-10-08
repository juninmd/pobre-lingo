import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { MobileNav } from "./MobileNav";

vi.mock("@/hooks/useSrs", () => ({
	useSrs: () => ({ stats: { due: 3 } }),
}));

describe("MobileNav", () => {
	it("renders all navigation items correctly", () => {
		render(
			<BrowserRouter>
				<MobileNav />
			</BrowserRouter>,
		);

		expect(screen.getByText("Jornada")).toBeInTheDocument();
		expect(screen.getByText("Revisar")).toBeInTheDocument();
		expect(screen.getByText("Jogos")).toBeInTheDocument();
		expect(screen.getByText("Regras")).toBeInTheDocument();
		expect(screen.getByText("Dicionário")).toBeInTheDocument();
	});

	it("displays SRS due badge correctly", () => {
		render(
			<BrowserRouter>
				<MobileNav />
			</BrowserRouter>,
		);

		// Expect badge '3' from mocked useSrs
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("applies active state classes for the current path", () => {
		render(
			<MemoryRouter initialEntries={["/review"]}>
				<MobileNav />
			</MemoryRouter>,
		);

		// Revisa item should be active, looking at specific aria-current flag
		const reviewLink = screen.getByRole("link", { name: /Revisar/i });
		expect(reviewLink).toHaveAttribute("aria-current", "page");
	});
});
