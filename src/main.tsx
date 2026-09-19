import LogRocket from "logrocket";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "./Router";
import "./globals.css";
import { GamificationProvider } from "./contexts/GamificationContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

LogRocket.init("g2noug/pobre-lingo");

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
