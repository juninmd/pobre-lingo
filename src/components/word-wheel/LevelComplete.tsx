import { ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LevelCompleteProps {
	found: number;
	bonus: number;
	inLesson: boolean;
	onNext: () => void;
}

/** Fim de nível: resumo de XP e o próximo passo. */
export function LevelComplete({
	found,
	bonus,
	inLesson,
	onNext,
}: LevelCompleteProps) {
	const xp = found * 10 + bonus * 5;
	return (
		<section className="ww-complete pop-in" aria-labelledby="ww-complete-title">
			<Trophy className="h-14 w-14 text-yellow-500" aria-hidden="true" />
			<h2 id="ww-complete-title" className="ww-title text-2xl font-black">
				Roda completa!
			</h2>
			<p className="text-muted-foreground">
				{found} palavras{bonus > 0 && ` + ${bonus} bônus`} · +{xp} XP
			</p>
			<Button size="lg" onClick={onNext} className="gap-2 rounded-full">
				{inLesson ? "Continuar" : "Próximo nível"}
				<ArrowRight className="h-4 w-4" aria-hidden="true" />
			</Button>
		</section>
	);
}
