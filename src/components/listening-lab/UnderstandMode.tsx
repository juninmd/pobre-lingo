// @ts-nocheck
import { useMemo, useState } from "react";
import { InteractiveText } from "@/components/input/InteractiveText";
import { Button } from "@/components/ui/button";
import { useWordKnowledge } from "@/hooks/useWordKnowledge";
import { tokenizeText } from "@/lib/input/tokenize";
import type { NativeSentence } from "@/lib/sources/tatoeba";

/** Modo "Entender": ouvir antes de ver o texto, depois conferir a tradução. */
export function UnderstandMode({ sentence }: { sentence: NativeSentence }) {
	const [revealed, setRevealed] = useState(false);
	const { isKnown, toggleKnown } = useWordKnowledge();
	const tokens = useMemo(() => tokenizeText(sentence.text), [sentence.text]);

	if (!revealed) {
		return (
			<Button variant="secondary" onClick={() => setRevealed(true)}>
				Mostrar texto
			</Button>
		);
	}

	return (
		<div className="space-y-2">
			<InteractiveText
				tokens={tokens}
				isKnown={isKnown}
				onToggleKnown={toggleKnown}
			/>
			{sentence.translation && (
				<p className="text-sm text-muted-foreground" lang="pt-BR">
					{sentence.translation}
				</p>
			)}
		</div>
	);
}
