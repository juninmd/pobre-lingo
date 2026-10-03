// @ts-nocheck
import type { SpeechScore } from "@/lib/speechMatch";
import { PASS_THRESHOLD } from "@/lib/speechMatch";
import { cn } from "@/lib/utils";

/** Mostra a frase alvo palavra a palavra (verde = ouvida) e a pontuação final. */
export function SpeechScoreView({ result }: { result: SpeechScore }) {
	return (
		<div className="space-y-2" role="status">
			<p className="flex flex-wrap gap-1.5 text-sm">
				{result.words.map((w, index) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: words are positional and may repeat
						key={`${w.word}-${index}`}
						className={cn(
							"rounded px-1",
							w.heard
								? "bg-green-500/15 text-green-700 dark:text-green-400"
								: "bg-red-500/15 text-red-700 dark:text-red-400",
						)}
					>
						{w.word}
					</span>
				))}
			</p>
			<p className="text-sm font-medium">
				{result.score}% —{" "}
				{result.passed
					? "Aprovado"
					: `Abaixo de ${PASS_THRESHOLD}%, siga praticando`}
			</p>
		</div>
	);
}
