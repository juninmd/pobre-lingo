import { Headphones } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { ListeningExercise } from "@/components/exercises/ListeningExercise";
import { useStudyTimer } from "@/hooks/useStudyLog";

export default function ListeningPage() {
	useStudyTimer("listening");
	return (
		<PageContainer>
			<PageHeader
				title="Prática de Escuta"
				description="Melhore sua compreensão auditiva com áudio em inglês"
				icon={Headphones}
				iconClassName="text-primary"
				backLink="/"
				backLabel="Voltar ao Início"
			/>
			<ListeningExercise />
		</PageContainer>
	);
}
