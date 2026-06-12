import LogRocket from "logrocket";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "./Router";
import "./globals.css";
import { GamificationProvider } from "./contexts/GamificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

LogRocket.init("g2noug/pobre-lingo");

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<GamificationProvider>
				<HelmetProvider>
					<Router />
				</HelmetProvider>
			</GamificationProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
