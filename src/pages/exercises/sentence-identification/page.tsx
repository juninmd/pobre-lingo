import { CheckSquare } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { CorrectSentenceIdentification } from "@/components/exercises/CorrectSentenceIdentification";
import { Badge } from "@/components/ui/badge";

export default function SentenceIdentificationPage() {
	return (
		<PageContainer>
			<PageHeader
				title="Identificar Frases Corretas"
				description="Selecione as frases que estão gramaticalmente corretas."
				icon={CheckSquare}
				iconClassName="text-brand-aqua"
				backLink="/"
				backLabel="Voltar ao Início"
			>
				<Badge variant="secondary">Marque todas as opções corretas</Badge>
			</PageHeader>

			<CorrectSentenceIdentification />
		</PageContainer>
	);
}
