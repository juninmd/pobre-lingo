import { Award } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * MicrocredentialsWidget
 *
 * Implements the Microcredenciais em ELT trend using the shared TrendWidget architecture.
 */
export function MicrocredentialsWidget() {
	return (
		<TrendWidget
			title="Microcredenciais em ELT"
			description="Certificações de curta duração focadas em habilidades específicas e tendências emergentes."
			icon={<Award className="h-5 w-5" />}
			xpReward={30}
			actionText="Ver Microcredenciais"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						As microcredenciais oferecem uma forma flexível e ágil para
						professores de inglês comprovarem novas competências e se manterem
						atualizados, desde metodologias ágeis até uso de tecnologias
						específicas.
					</p>
				</div>
			}
		/>
	);
}
