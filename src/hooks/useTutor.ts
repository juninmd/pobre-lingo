import { useCallback, useEffect, useRef, useState } from "react";
import { selectProvider } from "@/lib/ai/selectProvider";
import { translateToPortuguese } from "@/lib/ai/translator";
import {
	buildTutorSystemPrompt,
	parseTutorReply,
	type TutorScenario,
} from "@/lib/ai/tutorPrompt";
import type { AiProvider, ChatMessage, ProviderStatus } from "@/lib/ai/types";
import type { CEFRLevel } from "@/lib/curriculumData";

export type TutorTurn = ChatMessage & { tip?: string | null };

export type TutorPhase =
	| "detecting"
	| "unavailable"
	| "idle"
	| "loading"
	| "ready"
	| "thinking"
	| "error";

export function useTutor(scenario: TutorScenario, level: CEFRLevel) {
	const providerRef = useRef<AiProvider | null>(null);
	const [status, setStatus] = useState<ProviderStatus>("unavailable");
	const [phase, setPhase] = useState<TutorPhase>("detecting");
	const [progress, setProgress] = useState<{ value: number; label?: string }>({
		value: 0,
	});
	const [turns, setTurns] = useState<TutorTurn[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		selectProvider().then(({ provider, status: found }) => {
			if (cancelled) return provider?.dispose();
			providerRef.current = provider;
			setStatus(found);
			setPhase(provider ? "idle" : "unavailable");
		});
		return () => {
			cancelled = true;
			providerRef.current?.dispose();
		};
	}, []);

	const start = useCallback(async () => {
		const provider = providerRef.current;
		if (!provider) return;
		setPhase("loading");
		setError(null);
		try {
			const tipLanguage = provider.speaksPortuguese ? "Portuguese" : "English";
			await provider.load(
				buildTutorSystemPrompt(scenario, level, tipLanguage),
				(value, label) => setProgress({ value, label }),
			);
			setTurns([{ role: "assistant", content: scenario.opening }]);
			setPhase("ready");
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : String(cause));
			setPhase("error");
		}
	}, [scenario, level]);

	const send = useCallback(
		async (text: string) => {
			const provider = providerRef.current;
			const content = text.trim();
			if (!provider || !content) return;
			const history: TutorTurn[] = [...turns, { role: "user", content }];
			setTurns([...history, { role: "assistant", content: "" }]);
			setPhase("thinking");
			try {
				const raw = await provider.reply(
					history.map(({ role, content: body }) => ({ role, content: body })),
					(partial) =>
						setTurns([
							...history,
							{ role: "assistant", content: parseTutorReply(partial).message },
						]),
				);
				const { message, tip } = parseTutorReply(raw);
				const tipPt =
					tip && !provider.speaksPortuguese
						? ((await translateToPortuguese(tip)) ?? tip)
						: tip;
				setTurns([
					...history,
					{ role: "assistant", content: message, tip: tipPt },
				]);
				setPhase("ready");
			} catch (cause) {
				setError(cause instanceof Error ? cause.message : String(cause));
				setTurns(history);
				setPhase("error");
			}
		},
		[turns],
	);

	return {
		phase,
		status,
		progress,
		turns,
		error,
		providerLabel: providerRef.current?.label ?? null,
		start,
		send,
	};
}
