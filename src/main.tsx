import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "./app/AppProviders";
import { Router } from "./app/Router";
import { startAnalyticsIfConsented } from "./lib/analyticsConsent";
import { IS_DESKTOP } from "./lib/platform";
import "./globals.css";

void startAnalyticsIfConsented();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Elemento #root ausente no index.html");
const root = createRoot(rootElement);

const app = (
	<AppProviders>
		<Router />
	</AppProviders>
);

async function start() {
	// Desktop: restaura o estado do arquivo antes de renderizar (o app lê o localStorage).
	const firstRun = IS_DESKTOP
		? await import("./lib/desktop/boot").then((m) => m.bootDesktop())
		: false;
	if (!firstRun) return root.render(<StrictMode>{app}</StrictMode>);
	const { FirstRunGate } = await import("./components/desktop/FirstRunGate");
	root.render(
		<StrictMode>
			<FirstRunGate>{app}</FirstRunGate>
		</StrictMode>,
	);
}

void start();
