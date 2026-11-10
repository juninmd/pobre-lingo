import { type RefObject, useEffect, useRef, useState } from "react";

/**
 * Largura real do elemento, em px. Os gráficos desenham nessa medida em vez de
 * esticar um viewBox: texto e linhas de 1px saem na grade de pixels, nítidos.
 */
export function useElementWidth<T extends HTMLElement>(
	fallback = 640,
): [RefObject<T | null>, number] {
	const ref = useRef<T>(null);
	const [width, setWidth] = useState(fallback);

	useEffect(() => {
		const node = ref.current;
		if (!node || typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(([entry]) => {
			const next = Math.round(entry.contentRect.width);
			if (next > 0) setWidth(next);
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return [ref, width];
}
