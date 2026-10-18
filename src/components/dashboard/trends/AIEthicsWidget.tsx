import { Scale } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * AIEthicsWidget
 *
 * Implements the Ética em IA no ELT trend using the shared TrendWidget architecture.
 */
export function AIEthicsWidget() {
	return (
		<TrendWidget
			title="Ética em IA no ELT"
			description="Compreendendo o uso ético e responsável da Inteligência Artificial no ensino e aprendizagem de idiomas."
			icon={<Scale className="h-5 w-5" />}
			xpReward={20}
			actionText="Explorar Ética"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						Com o rápido avanço da IA, é crucial que educadores e alunos
						entendam como utilizar essas ferramentas de forma ética, evitando
						plágio, vieses e promovendo a autonomia e o pensamento crítico
						genuíno.
					</p>
				</div>
			}
		/>
	);
}
