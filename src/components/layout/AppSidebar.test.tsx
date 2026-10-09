import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

let mobile = true;
vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => mobile }));
vi.mock("./NavMenu", () => ({ NavMenu: () => <nav>menu</nav> }));

function Opener() {
	const { setOpenMobile } = useSidebar();
	return (
		<button type="button" onClick={() => setOpenMobile(true)}>
			open
		</button>
	);
}

function Shell() {
	return (
		<MemoryRouter>
			<SidebarProvider>
				<Opener />
				<AppSidebar />
			</SidebarProvider>
		</MemoryRouter>
	);
}

describe("AppSidebar", () => {
	beforeEach(() => {
		mobile = true;
	});

	it("does not reopen a drawer left open when a rotation crosses the breakpoint and returns", async () => {
		const { rerender } = render(<Shell />);
		await act(async () => screen.getByText("open").click());
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		mobile = false;
		rerender(<Shell />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

		mobile = true;
		rerender(<Shell />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("keeps the drawer content out of the mobile dialog until the trigger opens it", () => {
		render(<Shell />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
});
