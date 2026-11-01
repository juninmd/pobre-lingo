import { Check, Loader2 } from "lucide-react";
import type { LiveCorrection } from "@/hooks/useLiveCorrection";
import { diffWords } from "@/lib/buddy/diff";
import { cn } from "@/lib/utils";

type Props = { live: LiveCorrection; onApply: (text: string) => void };

/** Mostra, em tempo real, o que mudar no rascunho (riscado = tirar, verde = pôr). */
export function CorrectionHint({ live, onApply }: Props) {
	const { result, checking } = live;
	return (
		<div className="min-h-6 text-sm" aria-live="polite">
			{result ? (
				<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
					<span>
						{diffWords(result.source, result.corrected).map((part, index) =>
							part.kind === "same" ? (
								<span key={`${part.text}-${index}`}>{part.text} </span>
							) : (
								<span
									key={`${part.text}-${index}`}
									className={cn(
										part.kind === "removed"
											? "text-destructive line-through"
											: "font-semibold text-emerald-700 dark:text-emerald-400",
									)}
								>
									{part.text}{" "}
								</span>
							),
						)}
					</span>
					<button
						type="button"
						onClick={() => onApply(result.corrected)}
						className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs hover:bg-accent"
					>
						<Check className="size-3" aria-hidden="true" /> Aplicar
					</button>
					{result.note && (
						<span className="text-muted-foreground">{result.note}</span>
					)}
				</div>
			) : (
				checking && (
					<span className="inline-flex items-center gap-1 text-muted-foreground">
						<Loader2 className="size-3 animate-spin" aria-hidden="true" />{" "}
						Revisando…
					</span>
				)
			)}
		</div>
	);
}
