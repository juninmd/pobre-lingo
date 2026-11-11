import { ArrowLeft, Lightbulb, Shuffle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { feedbackCopy } from "@/components/word-wheel/feedbackCopy";
import { LetterWheel } from "@/components/word-wheel/LetterWheel";
import { LevelComplete } from "@/components/word-wheel/LevelComplete";
import { WheelStatus } from "@/components/word-wheel/WheelStatus";
import { WordSlots } from "@/components/word-wheel/WordSlots";
import { useGamification } from "@/contexts/GamificationContext";
import { useActivityLog } from "@/hooks/useActivityLog";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { useWordWheel } from "@/hooks/useWordWheel";
import { fireConfetti } from "@/lib/confetti";
import { tts } from "@/lib/tts";
import { wheelBonusPool, wheelDictionary } from "@/lib/wordWheel/dictionary";
import "@/styles/word-wheel.css";
import "@/styles/word-wheel-ring.css";

export default function WordWheelPage() {
	const [params] = useSearchParams();
	const moduleId = params.get("module");
	const lessonId = params.get("lesson");
	const navigate = useNavigate();
	const { addXp } = useGamification();
	const { logActivity } = useActivityLog();
	const { completeLesson } = useCurriculumProgress();
	const game = useWordWheel(wheelBonusPool);
	const { puzzle, feedback, complete } = game;
	const [draft, setDraft] = useState("");
	const celebrated = useRef(complete);
	const translate = (w: string) => puzzle.words[w] ?? wheelDictionary.get(w);

	useEffect(() => {
		if (!complete || celebrated.current) return;
		celebrated.current = true;
		fireConfetti({ particleCount: 180, spread: 100, origin: { y: 0.6 } });
		logActivity();
		if (moduleId && lessonId) completeLesson(moduleId, lessonId, 100);
	}, [complete, completeLesson, lessonId, logActivity, moduleId]);

	const onSubmit = (word: string) => {
		const result = game.submit(word);
		if (result === "found") {
			addXp(10);
			tts.speak(word.toLowerCase());
		}
		if (result === "bonus") addXp(5);
	};

	const copy = feedback ? feedbackCopy(feedback, translate) : null;

	const next = () => {
		if (moduleId) return navigate("/");
		celebrated.current = false;
		game.nextLevel();
	};

	return (
		<PageContainer className="ww-page">
			<header className="flex items-center justify-between gap-3">
				<Button variant="ghost" asChild>
					<Link to={moduleId ? "/" : "/arcade"} className="gap-2">
						<ArrowLeft className="h-4 w-4" />
						{moduleId ? "Sair" : "Arcade"}
					</Link>
				</Button>
				<div className="ww-chip">
					Nível {game.level + 1} · {puzzle.cefr}
				</div>
			</header>

			<div className="text-center">
				<p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
					{puzzle.theme}
				</p>
				<h1 className="ww-title text-3xl font-black tracking-tight sm:text-4xl">
					Roda de Palavras
				</h1>
				<p className="text-sm text-muted-foreground">
					{game.found.length} de {game.targets.length} palavras
					{game.bonus.length > 0 && ` · ${game.bonus.length} bônus`}
				</p>
			</div>

			<div
				className="ww-meter"
				role="progressbar"
				aria-label="Palavras encontradas"
				aria-valuemin={0}
				aria-valuemax={game.targets.length}
				aria-valuenow={game.found.length}
			>
				<span
					style={{
						transform: `scaleX(${game.found.length / game.targets.length})`,
					}}
				/>
			</div>

			<WordSlots
				targets={game.targets}
				found={game.found}
				reveals={game.reveals}
				translations={puzzle.words}
				fresh={feedback?.result === "found" ? feedback.word : undefined}
			/>

			{complete ? (
				<LevelComplete
					found={game.found.length}
					bonus={game.bonus.length}
					inLesson={Boolean(moduleId)}
					onNext={next}
				/>
			) : (
				<>
					<WheelStatus draft={draft} copy={copy} feedbackKey={feedback?.key} />
					<LetterWheel
						letters={puzzle.letters}
						order={game.order}
						onSubmit={onSubmit}
						onWordChange={setDraft}
					/>
					<div className="flex justify-center gap-3">
						<Button
							variant="outline"
							onClick={game.shuffle}
							className="gap-2 rounded-full"
						>
							<Shuffle className="h-4 w-4" /> Embaralhar
						</Button>
						<Button
							variant="outline"
							onClick={game.hint}
							disabled={game.hintsLeft <= 0}
							className="gap-2 rounded-full"
						>
							<Lightbulb className="h-4 w-4" /> Dica ({game.hintsLeft})
						</Button>
					</div>
				</>
			)}
		</PageContainer>
	);
}
