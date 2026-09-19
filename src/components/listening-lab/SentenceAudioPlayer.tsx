import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { NativeSentence } from "@/lib/sources/tatoeba";
import { SentenceAttribution } from "./SentenceAttribution";

type SentenceAudioPlayerProps = {
	sentence: NativeSentence;
	onPlayingChange?: (playing: boolean) => void;
};

/** Player de áudio nativo com toggle de velocidade e atribuição obrigatória. */
export function SentenceAudioPlayer({
	sentence,
	onPlayingChange,
}: SentenceAudioPlayerProps) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [rate, setRate] = useState<0.75 | 1>(1);

	const toggleRate = () => {
		const next = rate === 1 ? 0.75 : 1;
		setRate(next);
		if (audioRef.current) audioRef.current.playbackRate = next;
	};

	return (
		<div className="space-y-2">
			{/** biome-ignore lint/a11y/useMediaCaption: player de frase curta, sem faixa de legenda disponível */}
			<audio
				ref={audioRef}
				src={sentence.audioUrl}
				controls
				preload="none"
				onPlay={() => onPlayingChange?.(true)}
				onPause={() => onPlayingChange?.(false)}
				onEnded={() => onPlayingChange?.(false)}
				className="w-full"
			/>
			<div className="flex items-center justify-between gap-2">
				<Button size="sm" variant="outline" onClick={toggleRate}>
					{rate === 1 ? "1×" : "0.75×"}
				</Button>
				<SentenceAttribution sentence={sentence} />
			</div>
		</div>
	);
}
