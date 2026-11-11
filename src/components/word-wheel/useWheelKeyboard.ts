import { useCallback, useEffect, useRef, useState } from "react";

type PathUpdate = number[] | ((p: number[]) => number[]);

/** Caminho na roda com espelho síncrono: pointerup pode chegar antes do re-render do último move. */
export function useSyncedPath() {
	const [path, setState] = useState<number[]>([]);
	const ref = useRef<number[]>([]);
	const set = useCallback((next: PathUpdate) => {
		ref.current = typeof next === "function" ? next(ref.current) : next;
		setState(ref.current);
	}, []);
	return [path, ref, set] as const;
}

interface WheelKeys {
	active: boolean;
	onEnter: () => void;
	onBack: () => void;
	onClear: () => void;
	onLetter: (upper: string) => void;
}

/** Teclado físico: letras montam a palavra, Enter envia, Backspace/Esc desfazem. */
export function useWheelKeyboard(keys: WheelKeys) {
	const latest = useRef(keys);
	latest.current = keys;

	useEffect(() => {
		if (!keys.active) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			const k = latest.current;
			const target = e.target as Partial<HTMLElement> | null;
			if (target?.closest?.("input, textarea, [contenteditable=true]")) return;
			if (e.key === "Enter") {
				// Enter num botão focado já o aciona: só envia quando o foco está fora.
				if (target?.tagName === "BUTTON") return;
				return k.onEnter();
			}
			if (e.key === "Backspace") return k.onBack();
			if (e.key === "Escape") return k.onClear();
			if (/^[a-zA-Z]$/.test(e.key)) k.onLetter(e.key.toUpperCase());
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [keys.active]);
}
