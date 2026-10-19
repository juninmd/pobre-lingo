import { FileQuestion } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * TTTWidget
 *
 * Implements the TTT (Test-Teach-Test) trend using the shared TrendWidget architecture.
 */
export function TTTWidget() {
	return (
		<TrendWidget
			title="TTT (Test-Teach-Test)"
			description="Abordagem focada em identificar as necessidades dos alunos antes do ensino explícito."
			icon={<FileQuestion className="h-5 w-5" />}
			xpReward={25}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						O método TTT inverte a ordem tradicional, permitindo que os
						professores avaliem primeiro o conhecimento prévio, ensinem as
						lacunas e testem novamente para verificar a compreensão.
					</p>
				</div>
			}
		/>
	);
}
