import { cn } from "@/lib/utils";

interface WheelStatusProps {
	draft: string;
	copy: { text: string; tone: string } | null;
	/** Muda a cada palpite: remonta a faixa para a animação tocar de novo. */
	feedbackKey?: number;
}

/** Faixa acima da roda: a palavra sendo montada ou o retorno do último palpite. */
export function WheelStatus({ draft, copy, feedbackKey }: WheelStatusProps) {
	return (
		<div className="ww-status" aria-live="polite">
			{draft ? (
				<span className="ww-draft">{draft}</span>
			) : copy ? (
				<span
					key={feedbackKey}
					className={cn("ww-feedback", `is-${copy.tone}`)}
				>
					{copy.text}
				</span>
			) : (
				<span className="text-sm text-muted-foreground">
					Arraste pelas letras ou digite no teclado
				</span>
			)}
		</div>
	);
}
