import { GraduationCap } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * EFLPedagogyWidget
 *
 * Implements the EFL Pedagogy trend using the shared TrendWidget architecture.
 */
export function EFLPedagogyWidget() {
	return (
		<TrendWidget
			title="EFL Pedagogy"
			description="Explorando os fundamentos do English as a Foreign Language e suas aplicações contemporâneas."
			icon={<GraduationCap className="h-5 w-5" />}
			xpReward={25}
			actionText="Estudar EFL"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						A pedagogia EFL continua a evoluir, integrando novas tecnologias e
						métodos focados no aluno. O foco está na comunicação autêntica e no
						engajamento ativo para superar as barreiras de não estar em um país
						onde a língua é falada.
					</p>
				</div>
			}
		/>
	);
}
