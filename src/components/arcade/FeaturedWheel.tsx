import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loadSave } from "@/lib/wordWheel/logic";
import { WORD_WHEEL_PUZZLES } from "@/lib/wordWheel/puzzles";

/** Destaque da aba Jogar: a Roda de Palavras com as letras do nível atual girando. */
export function FeaturedWheel() {
	const { level, found } = loadSave();
	const puzzle = WORD_WHEEL_PUZZLES[level % WORD_WHEEL_PUZZLES.length];
	const letters = [...puzzle.letters];
	const total = Object.keys(puzzle.words).length;

	return (
		<section
			aria-labelledby="featured-wheel"
			className="next-step grid items-center gap-6 rounded-3xl border p-5 sm:grid-cols-[1fr_auto] sm:p-7"
		>
			<div className="space-y-3">
				<p className="eyebrow">
					Novo · nível {level + 1} · {puzzle.theme}
				</p>
				<h2 id="featured-wheel" className="text-3xl font-extrabold sm:text-4xl">
					Roda de Palavras
				</h2>
				<p className="max-w-prose text-muted-foreground">
					Arraste pelas letras e ache todas as palavras escondidas. Palavras do
					dicionário que cabem na roda valem bônus.
				</p>
				<p className="pixel-num text-sm text-primary">
					{found.length}/{total} palavras
				</p>
				<Button asChild variant="gamified" size="lg" className="gap-2">
					<Link to="/games/word-wheel">
						Jogar agora <ArrowRight className="h-4 w-4" aria-hidden="true" />
					</Link>
				</Button>
			</div>
			<div className="featured-wheel mx-auto" aria-hidden="true">
				{letters.map((ch, i) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: letras podem repetir; a posição é a identidade
						key={i}
						style={
							{
								"--a": `${(i / letters.length) * 360}deg`,
								"--i": i,
							} as CSSProperties
						}
					>
						{ch}
					</span>
				))}
			</div>
		</section>
	);
}
