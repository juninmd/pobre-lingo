import type { ReactNode } from "react";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

/** Provedores globais, na ordem em que dependem uns dos outros. */
export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			{/* Notificações ficam acima da gamificação: conquistas e níveis publicam avisos. */}
			<NotificationProvider>
				<GamificationProvider>{children}</GamificationProvider>
			</NotificationProvider>
		</ThemeProvider>
	);
}
