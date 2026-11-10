import { useEffect, useState } from "react";

/**
 * Vira `true` quando o navegador fica ocioso depois da primeira pintura.
 * Serve para montar o que não é crítico (mascote flutuante, convite de
 * instalação) sem disputar a thread principal com a tela em si.
 */
export function useIdleReady(timeoutMs = 1500): boolean {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (typeof window.requestIdleCallback === "function") {
			const id = window.requestIdleCallback(() => setReady(true), {
				timeout: timeoutMs,
			});
			return () => window.cancelIdleCallback(id);
		}
		const id = window.setTimeout(() => setReady(true), 1);
		return () => window.clearTimeout(id);
	}, [timeoutMs]);

	return ready;
}
