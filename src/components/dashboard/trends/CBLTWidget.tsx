import { Target } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * CBLTWidget
 *
 * Implements the Ensino Baseado em Competências trend using the shared TrendWidget architecture.
 */
export function CBLTWidget() {
	return (
		<TrendWidget
			title="Ensino Baseado em Competências"
			description="Foco no que os alunos podem fazer com o idioma, focando em habilidades práticas e resultados mensuráveis."
			icon={<Target className="h-5 w-5" />}
			xpReward={15}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						O Competency-Based Language Teaching (CBLT) concentra-se em preparar
						os alunos para usar o idioma em situações do mundo real, avaliando
						seu sucesso através do desempenho em tarefas específicas.
					</p>
				</div>
			}
		/>
	);
}
