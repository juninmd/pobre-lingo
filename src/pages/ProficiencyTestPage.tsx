import { useState } from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { AdaptiveQuestionCard } from "@/components/proficiency/AdaptiveQuestionCard";
import { ResultCard } from "@/components/proficiency/ResultCard";
import { Button } from "@/components/ui/button";
import {
	applyAnswer,
	createAdaptiveState,
	isComplete,
	pickNextItem,
} from "@/lib/placement/adaptive";
import { placementBank } from "@/lib/placement/bank";
import {
	loadProficiencyResult,
	type ProficiencyResult,
	saveProficiencyResult,
} from "@/lib/proficiency";
import { calculateProficiencyFromAdaptive } from "@/lib/proficiencyAdaptive";

export default function ProficiencyTestPage() {
	const [started, setStarted] = useState(false);
	const [state, setState] = useState(createAdaptiveState);
	const [item, setItem] = useState(() => pickNextItem(placementBank, state));
	const [result, setResult] = useState<ProficiencyResult | null>(
		loadProficiencyResult,
	);
	const [saveError, setSaveError] = useState(false);
	const start = () => {
		const initial = createAdaptiveState();
		setState(initial);
		setItem(pickNextItem(placementBank, initial));
		setStarted(true);
		setSaveError(false);
	};
	const answer = (optionIndex: number | null) => {
		if (!item) return;
		const next = applyAnswer(
			state,
			item,
			optionIndex === null ? null : optionIndex === item.answer,
		);
		setState(next);
		const following = isComplete(next)
			? null
			: pickNextItem(placementBank, next);
		setItem(following);
		if (!following) {
			const calculated = calculateProficiencyFromAdaptive(next.answers);
			setResult(calculated);
			setSaveError(!saveProficiencyResult(calculated));
			setStarted(false);
		}
	};
	return (
		<PageContainer className="max-w-2xl mx-auto space-y-6">
			{saveError && (
				<p role="alert">
					Não foi possível salvar a sugestão neste navegador. O resultado
					continua abaixo; permita o armazenamento ou libere espaço para salvar.
				</p>
			)}
			{result && !started ? (
				<ResultCard
					result={result}
					onRestart={start}
					onSave={() => setSaveError(!saveProficiencyResult(result))}
				/>
			) : started && item ? (
				<AdaptiveQuestionCard
					key={item.id}
					item={item}
					index={state.answers.length}
					onAnswer={answer}
				/>
			) : (
				<section className="space-y-4 rounded-xl border border-border p-5">
					<h1 className="text-2xl font-bold">Encontre um ponto de estudo</h1>
					<p>
						Já conhece um pouco de inglês? Responda até 20 questões para
						escolher conteúdos de revisão. O percurso ajusta a dificuldade pelas
						respostas.
					</p>
					<p className="text-sm text-muted-foreground">
						Esta checagem usa estruturas, vocabulário, leitura e escuta com voz
						sintetizada. Não avalia sua fala, escrita livre ou interação e não
						fornece certificação ou equivalência de exames.
					</p>
					<Button onClick={start}>Começar checagem de conteúdo</Button>
					<Link to="/course/hello" className="block text-primary underline">
						Sei zero: começar minha primeira aula
					</Link>
				</section>
			)}
		</PageContainer>
	);
}
