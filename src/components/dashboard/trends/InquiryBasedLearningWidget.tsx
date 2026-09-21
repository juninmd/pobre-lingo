import { TrendWidget } from "./TrendWidget";

export function InquiryBasedLearningWidget() {
	return (
		<TrendWidget
			id="inquiry-based-learning"
			title="Inquiry-Based Learning"
			description="Aprenda através de perguntas e investigação."
			icon="Lightbulb"
			actionText="Investigar"
		>
			<p className="text-sm text-muted-foreground">
				Pergunta: Por que algumas palavras no plural em inglês não recebem 's'?
			</p>
		</TrendWidget>
	);
}
