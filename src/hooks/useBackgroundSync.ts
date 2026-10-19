import { useEffect } from "react";
import { runSync } from "@/lib/cloudSync/session";
import { reloadPage } from "@/lib/pageReload";

const INTERVAL_MS = 5 * 60 * 1000;

/** Mantém o progresso em dia com a nuvem enquanto o app está aberto. */
export function useBackgroundSync() {
	useEffect(() => {
		const tick = async () => {
			// O estado em memória fica velho depois de baixar da nuvem.
			if ((await runSync())?.status === "pulled") reloadPage();
		};
		const onVisibility = () => void tick();
		void tick();
		window.addEventListener("online", onVisibility);
		document.addEventListener("visibilitychange", onVisibility);
		const timer = window.setInterval(() => {
			if (document.visibilityState === "visible") void tick();
		}, INTERVAL_MS);
		return () => {
			window.removeEventListener("online", onVisibility);
			document.removeEventListener("visibilitychange", onVisibility);
			window.clearInterval(timer);
		};
	}, []);
}
