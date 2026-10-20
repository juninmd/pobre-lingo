import { BookOpenText } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * ContentBasedInstructionWidget
 *
 * Implements the Instrução Baseada em Conteúdo trend using the shared TrendWidget architecture.
 */
export function ContentBasedInstructionWidget() {
	return (
		<TrendWidget
			title="Instrução Baseada em Conteúdo"
			description="Ensino de idioma através do estudo de um assunto acadêmico, onde a língua é o meio de aprender o conteúdo."
			icon={<BookOpenText className="h-5 w-5" />}
			xpReward={15}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						Na Content-Based Instruction (CBI), os alunos aprendem sobre tópicos
						como ciência, história ou geografia em inglês. O foco duplo no
						idioma e no conteúdo melhora a motivação e fornece um contexto
						significativo para a aprendizagem.
					</p>
				</div>
			}
		/>
	);
}
