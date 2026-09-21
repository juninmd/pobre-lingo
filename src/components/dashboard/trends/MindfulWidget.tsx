import { TrendWidget } from "./TrendWidget";

export function MindfulWidget() {
	return (
		<TrendWidget
			id="mindfulness"
			title="Mindfulness & SEL"
			description="Aprendizado socioemocional e atenção plena."
			icon="Heart"
			actionText="Respirar e Focar"
		>
			<p className="text-sm italic text-muted-foreground text-center my-2">
				"I am capable of learning difficult things."
			</p>
		</TrendWidget>
	);
}
