// @ts-nocheck
import { useEffect, useRef } from "react";
import { InteractiveText } from "@/components/input/InteractiveText";
import { useWordKnowledge } from "@/hooks/useWordKnowledge";
import type { Cue } from "@/lib/input/subtitles";
import { tokenizeText } from "@/lib/input/tokenize";
import { cn } from "@/lib/utils";

type CueListProps = {
	cues: Cue[];
	activeIndex: number;
	hidden: boolean;
	onSeek: (start: number) => void;
};

/** Lista de falas com a fala ativa destacada e centralizada na tela. */
export function CueList({ cues, activeIndex, hidden, onSeek }: CueListProps) {
	const { isKnown, toggleKnown } = useWordKnowledge();
	const activeRef = useRef<HTMLButtonElement>(null);
	const lastActive = useRef(-1);

	useEffect(() => {
		if (activeIndex !== lastActive.current) {
			lastActive.current = activeIndex;
			activeRef.current?.scrollIntoView({
				block: "center",
				behavior: "smooth",
			});
		}
	}, [activeIndex]);

	return (
		<ul className="max-h-80 space-y-1 overflow-y-auto" aria-label="Legendas">
			{cues.map((cue, index) => {
				const active = index === activeIndex;
				return (
					<li key={cue.start}>
						<button
							ref={active ? activeRef : undefined}
							type="button"
							onClick={() => onSeek(cue.start)}
							className={cn(
								"w-full rounded px-2 py-1 text-left text-sm",
								active ? "bg-primary/15 font-medium" : "hover:bg-muted",
							)}
						>
							{hidden && !active ? (
								<span className="text-muted-foreground">•••</span>
							) : (
								<InteractiveText
									tokens={tokenizeText(cue.text)}
									isKnown={isKnown}
									onToggleKnown={toggleKnown}
								/>
							)}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
