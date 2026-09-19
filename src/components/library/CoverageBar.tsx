import { Progress } from "@/components/ui/progress";
import type { Coverage } from "@/lib/input/coverage";
import { cn } from "@/lib/utils";

const BAND_LABEL: Record<Coverage["band"], string> = {
	comfortable: "Confortável",
	challenging: "Desafiador",
	hard: "Difícil",
};

const BAND_CLASS: Record<Coverage["band"], string> = {
	comfortable: "text-brand-aqua",
	challenging: "text-brand-gold",
	hard: "text-destructive",
};

type CoverageBarProps = { coverage: Coverage };

/** Barra de cobertura lexical: % conhecida, palavras novas e a dica de nível. */
export function CoverageBar({ coverage }: CoverageBarProps) {
	const percent = Math.round(coverage.ratio * 100);
	return (
		<div className="space-y-1.5">
			<div className="flex items-center justify-between text-sm">
				<span className={cn("font-semibold", BAND_CLASS[coverage.band])}>
					{percent}% conhecido · {BAND_LABEL[coverage.band]}
				</span>
				<span className="text-muted-foreground">
					{coverage.unknownTypes.length} palavras novas
				</span>
			</div>
			<Progress value={percent} className="h-2" />
		</div>
	);
}
