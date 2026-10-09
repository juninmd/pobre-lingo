import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { reloadPage } from "@/lib/pageReload";
import { RouteError } from "./RouteError";

vi.mock("@/lib/pageReload", () => ({ reloadPage: vi.fn() }));

function Boom({ error }: { error: Error }): never {
	throw error;
}

function renderFailingRoute(error: Error) {
	const router = createMemoryRouter(
		[
			{
				path: "/",
				element: <Boom error={error} />,
				errorElement: <RouteError />,
			},
		],
		{ initialEntries: ["/"] },
	);
	return render(<RouterProvider router={router} />);
}

describe("RouteError", () => {
	beforeEach(() => {
		sessionStorage.clear();
		localStorage.clear();
		vi.mocked(reloadPage).mockClear();
		// React logs the thrown render error; keep the test output readable.
		vi.spyOn(console, "error").mockImplementation(() => {});
	});
	afterEach(() => vi.restoreAllMocks());

	it("offers a retry that reloads the page for an ordinary crash", () => {
		renderFailingRoute(new Error("boom"));

		expect(screen.getByRole("alert")).toHaveTextContent("Algo deu errado");
		expect(reloadPage).not.toHaveBeenCalled();

		fireEvent.click(screen.getByRole("button", { name: "Tentar de novo" }));
		expect(reloadPage).toHaveBeenCalledTimes(1);
	});

	it("auto-reloads once for a stale chunk and then stops, never looping", () => {
		const chunkError = new TypeError(
			"Failed to fetch dynamically imported module: https://app.test/assets/x.js",
		);

		const first = renderFailingRoute(chunkError);
		expect(reloadPage).toHaveBeenCalledTimes(1);
		first.unmount();

		renderFailingRoute(chunkError);
		expect(reloadPage).toHaveBeenCalledTimes(1);
		expect(screen.getByRole("alert")).toHaveTextContent("nova versão");
	});

	it("keeps local data when the user declines the confirmation", () => {
		localStorage.setItem("pobrelingo_onboarded", "true");
		vi.spyOn(window, "confirm").mockReturnValue(false);
		renderFailingRoute(new Error("boom"));

		fireEvent.click(
			screen.getByRole("button", { name: "Limpar dados locais e recarregar" }),
		);

		expect(localStorage.getItem("pobrelingo_onboarded")).toBe("true");
		expect(reloadPage).not.toHaveBeenCalled();
	});

	it("clears app data, keeps the theme and reloads once confirmed", () => {
		localStorage.setItem("pobrelingo_onboarded", "true");
		localStorage.setItem("vite-ui-theme", "dark");
		vi.spyOn(window, "confirm").mockReturnValue(true);
		renderFailingRoute(new Error("boom"));

		fireEvent.click(
			screen.getByRole("button", { name: "Limpar dados locais e recarregar" }),
		);

		expect(localStorage.getItem("pobrelingo_onboarded")).toBeNull();
		expect(localStorage.getItem("vite-ui-theme")).toBe("dark");
		expect(reloadPage).toHaveBeenCalledTimes(1);
	});
});
