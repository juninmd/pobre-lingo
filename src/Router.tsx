import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import {
	createBrowserRouter,
	Navigate,
	type RouteObject,
	RouterProvider,
} from "react-router-dom";
import { RouteError } from "./components/layout/RouteError";
import Layout from "./Layout";
import { pageRoutes } from "./pageRoutes";

export const appRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		// Layout itself failed: nothing of the shell survives, so show a full page.
		errorElement: <RouteError fullPage />,
		children: [
			{
				// A page that fails (e.g. a stale chunk) keeps the sidebar and header.
				errorElement: <RouteError />,
				children: [
					{ path: "curriculum", element: <Navigate to="/" replace /> },
					...pageRoutes.map(({ Component, ...route }) => ({
						...route,
						element: (
							<Suspense
								fallback={
									<div
										role="status"
										aria-label="Carregando página"
										className="flex justify-center py-12"
									>
										<Loader2 className="h-8 w-8 animate-spin text-primary" />
									</div>
								}
							>
								<Component />
							</Suspense>
						),
					})),
				],
			},
		],
	},
];

let browserRouter: ReturnType<typeof createBrowserRouter> | undefined;

export function Router() {
	// Created on first render, not on import, so tests can reuse `appRoutes`.
	browserRouter ??= createBrowserRouter(appRoutes);
	return <RouterProvider router={browserRouter} />;
}
