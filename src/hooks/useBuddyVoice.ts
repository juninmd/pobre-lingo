import { useCallback, useEffect, useState } from "react";
import { tts } from "@/lib/tts";

/** Fala as respostas da Lia (voz do navegador) e avisa quando está falando, para animar a boca. */
export function useBuddyVoice() {
	const [speaking, setSpeaking] = useState(false);
	const [muted, setMuted] = useState(false);

	useEffect(() => () => tts.cancel(), []);

	const speak = useCallback(
		(text: string) => {
			if (muted) return;
			tts.speak(text, "en-US", 0.95, 1.15, {
				onStart: () => setSpeaking(true),
				onEnd: () => setSpeaking(false),
			});
		},
		[muted],
	);

	const toggleMute = useCallback(() => {
		tts.cancel();
		setSpeaking(false);
		setMuted((value) => !value);
	}, []);

	return { speaking, muted, speak, toggleMute };
}
