import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { selectProvider } from "@/lib/ai/selectProvider";
import { translateToPortuguese } from "@/lib/ai/translator";
import {
	buildEssayMessage,
	buildWritingSystemPrompt,
	parseWritingFeedback,
	type WritingFeedback,
} from "@/lib/ai/writingPrompt";
import type { CEFRLevel } from "@/lib/curriculumData";

type AiWritingFeedbackProps = { topic: string; text: string; level: CEFRLevel };

type State =
	| { kind: "idle" }
	| { kind: "working"; label: string }
	| { kind: "done"; feedback: WritingFeedback }
	| { kind: "error"; message: string };

export function AiWritingFeedback({
	topic,
	text,
	level,
}: AiWritingFeedbackProps) {
	const [state, setState] = useState<State>({ kind: "idle" });

	const run = async () => {
		setState({ kind: "working", label: "Procurando a IA do aparelho…" });
		const { provider } = await selectProvider();
		if (!provider) {
			setState({
				kind: "error",
				message:
					"Seu navegador não roda IA local (precisa de Chrome/Edge atualizado ou WebGPU).",
			});
			return;
		}
		try {
			const language = provider.speaksPortuguese ? "Portuguese" : "English";
			await provider.load(buildWritingSystemPrompt(level, language), (value) =>
				setState({
					kind: "working",
					label: `Carregando o modelo… ${Math.round(value * 100)}%`,
				}),
			);
			setState({ kind: "working", label: "Corrigindo seu texto…" });
			const raw = await provider.reply([
				{ role: "user", content: buildEssayMessage(topic, text) },
			]);
			const feedback = parseWritingFeedback(raw);
			if (!provider.speaksPortuguese) {
				feedback.notes =
					(await translateToPortuguese(feedback.notes)) ?? feedback.notes;
			}
			setState({ kind: "done", feedback });
		} catch (cause) {
			setState({
				kind: "error",
				message: cause instanceof Error ? cause.message : String(cause),
			});
		} finally {
			provider.dispose();
		}
	};

	return (
		<div className="space-y-3">
			<Button
				type="button"
				variant="outline"
				className="gap-2"
				disabled={state.kind === "working" || text.trim().length < 20}
				onClick={run}
			>
				<Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
				Corrigir com IA do aparelho
			</Button>
			<div aria-live="polite">
				{state.kind === "working" && (
					<p className="flex items-center gap-2 text-sm text-muted-foreground">
						<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
						{state.label}
					</p>
				)}
				{state.kind === "error" && (
					<p role="alert" className="text-sm text-destructive">
						{state.message}
					</p>
				)}
				{state.kind === "done" && (
					<div className="rounded-xl border border-border bg-card p-4 space-y-3 text-sm">
						<p className="whitespace-pre-line">{state.feedback.notes}</p>
						{state.feedback.corrected && (
							<p lang="en" className="rounded-lg bg-brand-aqua/10 p-3">
								{state.feedback.corrected}
							</p>
						)}
						<p className="text-xs text-muted-foreground">
							Correção gerada por IA local: pode errar. Confira com as regras.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
