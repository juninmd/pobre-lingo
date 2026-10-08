import { BadgeCheck, GraduationCap, Trophy } from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { AdaptiveQuestionCard } from "@/components/proficiency/AdaptiveQuestionCard";
import { ResultCard } from "@/components/proficiency/ResultCard";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import {
	type AdaptiveState,
	applyAnswer,
	createAdaptiveState,
	isComplete,
	pickNextItem,
} from "@/lib/placement/adaptive";
import { placementBank } from "@/lib/placement/bank";
import type { PlacementItem } from "@/lib/placement/types";
import {
	loadProficiencyResult,
	type ProficiencyResult,
	saveProficiencyResult,
} from "@/lib/proficiency";
import { calculateProficiencyFromAdaptive } from "@/lib/proficiencyAdaptive";

export default function ProficiencyTestPage() {
	const { level: appLevel, xp, streak } = useGamification();
	const [started, setStarted] = useState(false);
	const [state, setState] = useState<AdaptiveState>(() =>
		createAdaptiveState(),
	);
	const [current, setCurrent] = useState<PlacementItem | null>(null);
	const [result, setResult] = useState<ProficiencyResult | null>(() =>
		loadProficiencyResult(),
	);

	const start = () => {
		const initial = createAdaptiveState();
		setState(initial);
		setCurrent(pickNextItem(placementBank, initial));
		setResult(null);
		setStarted(true);
	};

	const finish = (finalState: AdaptiveState) => {
		const calculated = calculateProficiencyFromAdaptive(
			finalState.answers,
			finalState.finalLevel,
		);
		setResult(calculated);
		saveProficiencyResult(calculated);
		setStarted(false);
	};

	const answer = (optionIndex: number) => {
		if (!current) return;
		const nextState = applyAnswer(
			state,
			current,
			optionIndex === current.answer,
		);
		setState(nextState);
		const nextItem = isComplete(nextState)
			? null
			: pickNextItem(placementBank, nextState);
		if (!nextItem) {
			finish(nextState);
			return;
		}
		setCurrent(nextItem);
	};

	if (result && !started) {
		return (
			<PageContainer>
				<div className="mx-auto max-w-2xl">
					<ResultCard result={result} onRestart={start} />
				</div>
			</PageContainer>
		);
	}

	if (started && current) {
		return (
			<PageContainer>
				<div className="mx-auto max-w-2xl">
					<AdaptiveQuestionCard
						item={current}
						index={state.answers.length}
						onAnswer={answer}
					/>
				</div>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<div className="mx-auto max-w-2xl space-y-6">
				<Card className="border-primary/20">
					<CardHeader className="text-center">
						<div className="mx-auto mb-2 rounded-full bg-primary/10 p-4">
							<GraduationCap className="h-10 w-10 text-primary" />
						</div>
						<CardTitle className="text-2xl">Diagnóstico CEFR</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4 text-center text-sm text-muted-foreground">
						<p>
							Teste adaptativo (até 20 questões): as perguntas se ajustam ao seu
							nível para descobrir seu CEFR provável, com equivalência IELTS,
							TOEFL iBT e Cambridge.
						</p>
						<div className="flex flex-wrap justify-center gap-3 font-medium">
							<span className="inline-flex items-center gap-1">
								<Trophy className="h-4 w-4 text-brand-gold" /> {xp} XP
							</span>
							<span>App nível {appLevel}</span>
							<span>{streak} dias seguidos</span>
						</div>
						{result && (
							<p className="inline-flex items-center gap-2 rounded-full bg-brand-aqua/10 px-3 py-1 text-brand-aqua">
								<BadgeCheck className="h-4 w-4" /> Último resultado:{" "}
								{result.level}
							</p>
						)}
					</CardContent>
					<CardFooter className="justify-center">
						<Button size="lg" onClick={start} className="w-full sm:w-auto">
							Começar diagnóstico
						</Button>
					</CardFooter>
				</Card>
			</div>
		</PageContainer>
	);
}
