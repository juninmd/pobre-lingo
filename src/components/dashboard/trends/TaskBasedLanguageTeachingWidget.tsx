import { ClipboardList } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * TaskBasedLanguageTeachingWidget
 *
 * Implements the Ensino Baseado em Tarefas trend using the shared TrendWidget architecture.
 */
export function TaskBasedLanguageTeachingWidget() {
	return (
		<TrendWidget
			title="Ensino Baseado em Tarefas"
			description="Foco no uso da linguagem autêntica para concluir tarefas significativas, promovendo a fluência através da prática real."
			icon={<ClipboardList className="h-5 w-5" />}
			xpReward={20}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						O Task-Based Language Teaching (TBLT) prioriza a comunicação e o
						significado sobre a precisão gramatical. Os alunos aprendem
						resolvendo problemas, planejando eventos ou realizando tarefas onde
						a língua é a ferramenta, não apenas o objeto de estudo.
					</p>
				</div>
			}
		/>
	);
}
