import { Volume2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { GuidedLesson } from "@/lib/course/types";
import { tts } from "@/lib/tts";

interface LessonStudyProps {
	lesson: GuidedLesson;
	onStart: () => void;
}
export function LessonStudy({ lesson, onStart }: LessonStudyProps) {
	const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
	useEffect(
		() => () => {
			if (canSpeak) window.speechSynthesis.cancel();
		},
		[canSpeak],
	);
	return (
		<section aria-labelledby="study-title" className="space-y-6">
			<h2 id="study-title" className="text-xl font-bold">
				1. Entenda e escute
			</h2>
			<p className="leading-relaxed">{lesson.explanation}</p>
			<p className="text-sm text-muted-foreground">
				Ouça em velocidade reduzida. Repita sem pressa e compare com o exemplo.
			</p>
			{!canSpeak && (
				<p role="status">
					Seu navegador não oferece áudio de voz. Você pode estudar pelos
					exemplos escritos.
				</p>
			)}
			<ul className="space-y-3">
				{lesson.examples.map((example) => (
					<li
						key={example.en}
						className="rounded-xl border border-border p-4 flex flex-wrap items-center justify-between gap-3"
					>
						<div>
							<p lang="en" className="font-semibold text-lg">
								{example.en}
							</p>
							<p className="text-muted-foreground">{example.pt}</p>
						</div>
						<Button
							variant="outline"
							size="sm"
							disabled={!canSpeak}
							aria-label={`Ouvir: ${example.en}`}
							onClick={() => tts.speak(example.en, "en-US", 0.75)}
						>
							<Volume2 className="h-4 w-4 mr-2" />
							Ouvir
						</Button>
					</li>
				))}
			</ul>
			<Button onClick={onStart}>Praticar com ajuda</Button>
		</section>
	);
}
