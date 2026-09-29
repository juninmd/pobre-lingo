import { TrendWidget } from "./TrendWidget";

export function LexicalApproachWidget() {
	return (
		<TrendWidget
			id="lexical-approach"
			title="Abordagem Lexical"
			description="Aprenda por chunks (blocos de palavras) e não apenas gramática."
			icon="Puzzle"
			actionText="Aprender Chunks"
		>
			<div className="p-3 bg-muted/50 rounded-md border border-border">
				<p className="text-sm font-semibold">Chunk do dia:</p>
				<p className="text-sm italic">"By the way..." (Por falar nisso...)</p>
			</div>
		</TrendWidget>
	);
}
