import { BadgeCheck, GraduationCap, Trophy } from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { QuestionCard } from "@/components/proficiency/QuestionCard";
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
	calculateProficiency,
	loadProficiencyResult,
	type ProficiencyResult,
	saveProficiencyResult,
} from "@/lib/proficiency";
import { proficiencyQuestions } from "@/lib/proficiencyQuestions";

export default function ProficiencyTestPage() {
	const { level: appLevel, xp, streak } = useGamification();
	const [started, setStarted] = useState(false);
	const [index, setIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [result, setResult] = useState<ProficiencyResult | null>(() =>
		loadProficiencyResult(),
	);
	const question = proficiencyQuestions[index];

	const start = () => {
		setStarted(true);
		setIndex(0);
		setAnswers({});
	};

	const next = () => {
		if (index < proficiencyQuestions.length - 1) {
			setIndex((current) => current + 1);
			return;
		}
		const calculated = calculateProficiency(answers);
		setResult(calculated);
		saveProficiencyResult(calculated);
		setStarted(false);
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

	if (started) {
		return (
			<PageContainer>
				<div className="mx-auto max-w-2xl">
					<QuestionCard
						question={question}
						index={index}
						total={proficiencyQuestions.length}
						value={answers[question.id] || ""}
						onAnswer={(value) =>
							setAnswers((current) => ({ ...current, [question.id]: value }))
						}
						onNext={next}
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
							Descubra seu nível provável A1-C2 e receba um plano diário ligado
							a IELTS, TOEFL iBT e Cambridge.
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
