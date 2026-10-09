import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
	createMemoryRouter,
	type NonIndexRouteObject,
	type RouteObject,
	RouterProvider,
} from "react-router-dom";
import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import { GamificationProvider } from "./contexts/GamificationContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { appRoutes } from "./Router";

// Same provider order as main.tsx.
function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<NotificationProvider>
				<GamificationProvider>
					<HelmetProvider>{children}</HelmetProvider>
				</GamificationProvider>
			</NotificationProvider>
		</ThemeProvider>
	);
}

function renderRoutes(routes: RouteObject[], path: string) {
	const router = createMemoryRouter(routes, { initialEntries: [path] });
	return render(
		<Providers>
			<RouterProvider router={router} />
		</Providers>,
	);
}

function Boom(): never {
	throw new TypeError("Failed to fetch dynamically imported module: /x.js");
}

beforeAll(() => {
	// jsdom lacks these browser APIs used by the shell.
	Element.prototype.scrollTo = vi.fn();
	Element.prototype.scrollIntoView = vi.fn();
	window.matchMedia ??= ((query: string) => ({
		matches: false,
		media: query,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
	})) as unknown as typeof window.matchMedia;
});

beforeEach(() => {
	localStorage.setItem("pobrelingo_onboarded", "true");
});

afterEach(() => {
	localStorage.clear();
	sessionStorage.clear();
});

describe("App shell", () => {
	it("renders the shell and the dashboard at /", async () => {
		renderRoutes(appRoutes, "/");

		expect(await screen.findByRole("main")).toBeInTheDocument();
		const labels = screen
			.getAllByRole("navigation")
			.map((n) => n.getAttribute("aria-label"));
		expect(labels).toEqual(
			expect.arrayContaining(["Menu principal", "Atalhos"]),
		);
		expect(
			screen.getByRole("link", { name: "Pular para o conteúdo" }),
		).toBeInTheDocument();
		// The dashboard is a lazy route: wait for the real page, not a stub.
		expect(
			await screen.findByRole(
				"heading",
				{ name: /Sua Jornada/i },
				{ timeout: 10000 },
			),
		).toBeInTheDocument();
	}, 20000);

	it("renders the 404 page inside the shell for an unknown path", async () => {
		renderRoutes(appRoutes, "/rota-que-nao-existe");

		expect(
			await screen.findByRole("heading", { name: "Lost in translation" }),
		).toBeInTheDocument();
		expect(screen.getByRole("main")).toBeInTheDocument();
		expect(screen.getAllByRole("navigation").length).toBeGreaterThan(0);
	});

	it("keeps the sidebar when a page chunk fails and offers a retry", async () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		const root = appRoutes[0] as NonIndexRouteObject;
		const guard = root.children?.[0] as NonIndexRouteObject;
		const routes: RouteObject[] = [
			{
				...root,
				children: [
					{ ...guard, children: [{ path: "boom", element: <Boom /> }] },
				],
			},
		];

		renderRoutes(routes, "/boom");

		const alert = await screen.findByRole("alert");
		expect(
			within(alert).getByRole("button", { name: "Tentar de novo" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("navigation", { name: "Menu principal" }),
		).toBeInTheDocument();
	});
});
