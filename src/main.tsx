import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "./Router";
import "./globals.css";
import { GamificationProvider } from "./contexts/GamificationContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { startAnalyticsIfConsented } from "./lib/analyticsConsent";

void startAnalyticsIfConsented();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			{/* Notificações ficam acima da gamificação: conquistas e níveis publicam avisos. */}
			<NotificationProvider>
				<GamificationProvider>
					<HelmetProvider>
						<Router />
					</HelmetProvider>
				</GamificationProvider>
			</NotificationProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
