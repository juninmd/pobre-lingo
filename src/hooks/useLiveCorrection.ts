import { useEffect, useState } from "react";
import { type Correction, correctText } from "@/lib/buddy/api";
import { isMeaningfulChange } from "@/lib/buddy/diff";

const DEBOUNCE_MS = 700;
const MIN_CHARS = 3;

export type LiveCorrection = {
	checking: boolean;
	result: (Correction & { source: string }) | null;
};

/** Corrige o rascunho enquanto o aluno digita (debounce + cancelamento). */
export function useLiveCorrection(
	text: string,
	enabled = true,
): LiveCorrection {
	const [state, setState] = useState<LiveCorrection>({
		checking: false,
		result: null,
	});

	useEffect(() => {
		const source = text.trim();
		if (!enabled || source.length < MIN_CHARS) {
			setState({ checking: false, result: null });
			return;
		}
		const controller = new AbortController();
		const timer = setTimeout(async () => {
			setState((prev) => ({ ...prev, checking: true }));
			try {
				const data = await correctText(source, controller.signal);
				const changed = isMeaningfulChange(source, data.corrected);
				setState({
					checking: false,
					result: changed ? { ...data, source } : null,
				});
			} catch {
				if (!controller.signal.aborted)
					setState({ checking: false, result: null });
			}
		}, DEBOUNCE_MS);
		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	}, [text, enabled]);

	return state;
}
