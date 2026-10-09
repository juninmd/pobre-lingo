import { Volume2 } from "lucide-react";
import { useMemo } from "react";
import { InteractiveText } from "@/components/input/InteractiveText";
import { Button } from "@/components/ui/button";
import type { WordToken } from "@/lib/input/tokenize";
import { tokenizeText } from "@/lib/input/tokenize";
import { tts } from "@/lib/tts";

type LibraryParagraphProps = {
	text: string;
	isKnown: (token: WordToken) => boolean;
	onToggleKnown: (key: string) => void;
};

/** Um parágrafo do leitor livre: palavras clicáveis + "Ouvir parágrafo". */
export function LibraryParagraph({
	text,
	isKnown,
	onToggleKnown,
}: LibraryParagraphProps) {
	const tokens = useMemo(() => tokenizeText(text), [text]);
	return (
		<div className="space-y-2" data-private>
			<InteractiveText
				tokens={tokens}
				isKnown={isKnown}
				onToggleKnown={onToggleKnown}
			/>
			<Button
				variant="ghost"
				size="sm"
				className="gap-1.5 text-muted-foreground"
				onClick={() => tts.speak(text, "en-US", 0.9)}
			>
				<Volume2 className="h-3.5 w-3.5" />
				Ouvir parágrafo
			</Button>
		</div>
	);
}
