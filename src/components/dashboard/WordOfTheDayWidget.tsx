import { BookOpen, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGuidedCourse } from "@/hooks/useGuidedCourse";
import { useWordOfTheDay } from "@/hooks/useWordOfTheDay";
import { nextCourseLesson } from "@/lib/course/progress";
import { tts } from "@/lib/tts";

export function WordOfTheDayWidget() {
	const { progress } = useGuidedCourse();
	const lesson = nextCourseLesson(progress);
	const level = !lesson || lesson.level === "Pré-A1" ? "A1" : lesson.level;
	const word = useWordOfTheDay(level);
	const [revealed, setRevealed] = useState(false);
	const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
	useEffect(() => {
		return () => {
			if (canSpeak) window.speechSynthesis.cancel();
		};
	}, [canSpeak]);
	if (word === null) return null;
	if (!word) {
		// Mesma altura do cartão pronto: o resto da coluna não pula quando ele chega.
		return (
			<Card aria-busy="true" className="min-h-[19rem]">
				<CardHeader>
					<CardTitle className="text-base flex items-center gap-2">
						<BookOpen className="h-5 w-5 text-primary" /> Palavra do dia ·{" "}
						{level}
					</CardTitle>
				</CardHeader>
			</Card>
		);
	}
	return (
		<Card className="min-h-[19rem]">
			<CardHeader>
				<CardTitle className="text-base flex items-center gap-2">
					<BookOpen className="h-5 w-5 text-primary" /> Palavra do dia · {level}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-2xl font-bold" lang="en">
					{word.word}
				</p>
				<p className="text-sm text-muted-foreground">
					Tente lembrar o significado antes de revelar. A palavra acompanha o
					conteúdo da sua próxima aula; isso não mede seu nível.
				</p>
				<Button
					variant="outline"
					onClick={() => setRevealed(!revealed)}
					aria-expanded={revealed}
					aria-controls="daily-word-meaning"
				>
					{revealed ? "Ocultar significado" : "Revelar significado"}
				</Button>
				<div id="daily-word-meaning" hidden={!revealed}>
					{word.translation}
				</div>
				<Button
					variant="outline"
					disabled={!canSpeak}
					aria-label="Ouvir palavra do dia"
					onClick={() => tts.speak(word.word, "en-US", 0.75)}
				>
					<Volume2 className="h-4 w-4 mr-2" /> Ouvir
				</Button>
				<Link to="/vocabulary" className="block text-primary underline">
					Praticar no cofre de vocabulário
				</Link>
			</CardContent>
		</Card>
	);
}
