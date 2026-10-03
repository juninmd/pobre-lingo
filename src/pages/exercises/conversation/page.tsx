// @ts-nocheck
import { MessageCircle } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import ConversationExercise from "@/components/exercises/ConversationExercise";

export default function ConversationPage() {
	return (
		<PageContainer>
			<PageHeader
				title="Prática de Conversa"
				description="Pratique situações reais e melhore sua fluência"
				icon={MessageCircle}
				iconClassName="text-gold"
				backLink="/"
				backLabel="Voltar para Início"
			/>
			<ConversationExercise />
		</PageContainer>
	);
}
