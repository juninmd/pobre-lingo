import { BookType } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * StoryBasedApproachWidget
 *
 * Implements the Abordagem Baseada em Histórias trend using the shared TrendWidget architecture.
 */
export function StoryBasedApproachWidget() {
	return (
		<TrendWidget
			title="Abordagem Baseada em Histórias"
			description="Uso de narrativas e histórias como o veículo principal para o ensino de idiomas, contextualizando o vocabulário e a gramática."
			icon={<BookType className="h-5 w-5" />}
			xpReward={10}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						Através de histórias, os alunos se engajam emocionalmente com o
						idioma. Isso ajuda na retenção de vocabulário e na compreensão da
						estrutura narrativa, sendo altamente eficaz para todas as idades.
					</p>
				</div>
			}
		/>
	);
}
