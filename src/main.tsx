import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "./app/AppProviders";
import { Router } from "./app/Router";
import { startAnalyticsIfConsented } from "./lib/analyticsConsent";
import "./globals.css";

void startAnalyticsIfConsented();

const root = document.getElementById("root");
if (!root) throw new Error("Elemento #root ausente no index.html");

createRoot(root).render(
	<StrictMode>
		<AppProviders>
			<Router />
		</AppProviders>
	</StrictMode>,
);
