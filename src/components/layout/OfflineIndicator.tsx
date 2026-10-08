import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

/** Aviso discreto quando o navegador perde a conexão. */
export function OfflineIndicator() {
	const [online, setOnline] = useState(() => navigator.onLine);

	useEffect(() => {
		const update = () => setOnline(navigator.onLine);
		window.addEventListener("online", update);
		window.addEventListener("offline", update);
		return () => {
			window.removeEventListener("online", update);
			window.removeEventListener("offline", update);
		};
	}, []);

	if (online) return null;

	return (
		<div
			role="status"
			className="flex items-center justify-center gap-2 bg-amber-500 px-3 py-1 text-xs font-medium text-black"
		>
			<WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
			Você está offline. Lições salvas continuam funcionando.
		</div>
	);
}
