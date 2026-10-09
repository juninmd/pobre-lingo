import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import { pageRoutes } from "./pageRoutes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
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
]);

export function Router() {
	return <RouterProvider router={router} />;
}
