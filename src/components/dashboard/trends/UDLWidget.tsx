import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * UDLWidget
 *
 * Implements the Universal Design for Learning (UDL) trend using the shared TrendWidget architecture.
 */
export function UDLWidget() {
	return (
		<TrendWidget
			title="Universal Design for Learning (UDL)"
			description="Estrutura educacional para otimizar o ensino e a aprendizagem para todos os alunos."
			icon={<Globe className="h-5 w-5" />}
			xpReward={25}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						O UDL na educação de línguas busca remover barreiras na
						aprendizagem, fornecendo múltiplos meios de engajamento,
						representação e ação/expressão para atender à diversidade dos
						alunos.
					</p>
				</div>
			}
		/>
	);
}
