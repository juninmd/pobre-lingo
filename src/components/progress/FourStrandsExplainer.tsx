// @ts-nocheck
import { Card, CardContent } from "@/components/ui/card";
import { LEVEL_HOURS } from "@/lib/fluencyGoals";
import { CEFR_ORDER } from "@/lib/levels";

const CAMBRIDGE_LEVELS = CEFR_ORDER.filter((level) => level !== "A1");

export function FourStrandsExplainer() {
	return (
		<Card className="glass-card">
			<CardContent className="p-4 sm:p-5 space-y-3 text-sm">
				<p className="font-display font-bold">
					As 4 vertentes de Nation (Paul Nation, four strands)
				</p>
				<p className="text-muted-foreground leading-relaxed">
					Aprender uma língua exige equilíbrio entre quatro tipos de prática,
					cada um com ~25% do seu tempo: <strong>input</strong> (ler e ouvir
					conteúdo compreensível), <strong>output</strong> (falar e escrever),{" "}
					<strong>estudo deliberado</strong> (gramática, vocabulário, regras) e{" "}
					<strong>fluência</strong> (praticar o que você já sabe, mais rápido).
					Nenhuma vertente sozinha compensa a falta das outras.
				</p>
				<p className="font-display font-bold pt-1">
					Horas guiadas de referência (Cambridge English)
				</p>
				<p className="text-muted-foreground leading-relaxed">
					Estimativas de horas guiadas para atingir cada nível a partir do zero:{" "}
					{CAMBRIDGE_LEVELS.map((level, index) => (
						<span key={level}>
							{index > 0 && " · "}
							{level} ~{LEVEL_HOURS[level]}h
						</span>
					))}
					. São estimativas, não uma régua exata — servem para calibrar
					expectativas de ritmo.
				</p>
			</CardContent>
		</Card>
	);
}
