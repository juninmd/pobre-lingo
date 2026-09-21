import { TrendWidget } from "./TrendWidget";

export function AIPromptCraftingWidget() {
	return (
		<TrendWidget
			id="ai-prompt-crafting"
			title="Prompt Engineering"
			description="Aprenda a dar instruções claras para a IA."
			icon="Bot"
			actionText="Praticar Prompt"
		>
			<div className="p-3 bg-muted/50 rounded-md border border-border">
				<p className="text-sm font-mono text-muted-foreground">
					"Act as an English teacher and correct my sentence: 'I is happy today.'"
				</p>
			</div>
		</TrendWidget>
	);
}
