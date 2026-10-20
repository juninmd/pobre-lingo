import { Presentation } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * ProjectBasedLearningWidget
 *
 * Implements the Aprendizagem Baseada em Projetos trend using the shared TrendWidget architecture.
 */
export function ProjectBasedLearningWidget() {
	return (
		<TrendWidget
			title="Aprendizagem Baseada em Projetos"
			description="Alunos adquirem conhecimento e habilidades trabalhando por um longo período para investigar e responder a um desafio ou problema complexo."
			icon={<Presentation className="h-5 w-5" />}
			xpReward={25}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						A Aprendizagem Baseada em Projetos (PBL) em ELT permite que os
						alunos colaborem em projetos extensos (como criar um podcast ou
						planejar uma campanha) usando o inglês. Isso desenvolve habilidades
						do século 21 junto com a proficiência linguística.
					</p>
				</div>
			}
		/>
	);
}
