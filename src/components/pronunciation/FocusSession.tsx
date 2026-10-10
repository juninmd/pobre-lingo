import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/contexts/GamificationContext";
import { useSrs } from "@/hooks/useSrs";
import type { DiscriminationSummary } from "@/lib/pronunciation/drill";
import { pronunciationFocuses } from "@/lib/pronunciation/focuses";
import { minimalPairs } from "@/lib/pronunciation/pairs";
import { stressItems } from "@/lib/pronunciation/stress";
import type { PronunciationFocus } from "@/lib/pronunciation/types";
import { DiscriminationStep } from "./DiscriminationStep";
import { ProductionStep } from "./ProductionStep";
import { WordStressStep } from "./WordStressStep";

type Step = "listen" | "produce" | "stress";

const XP_DISCRIMINATION = 15;
const XP_PRODUCTION_PER_WORD = 3;
const XP_STRESS_PER_WORD = 3;

interface FocusSessionProps {
	focus: PronunciationFocus;
	onExit: () => void;
	onBestScore: (score: number) => void;
}

export function FocusSession({
	focus,
	onExit,
	onBestScore,
}: FocusSessionProps) {
	const info = pronunciationFocuses.find((f) => f.id === focus);
	const pairs = useMemo(
		() => minimalPairs.filter((p) => p.focus === focus),
		[focus],
	);
	const isStressFocus = focus === "word-stress";
	const hasPairs = pairs.length > 0;
	const [step, setStep] = useState<Step>(
		isStressFocus && !hasPairs ? "stress" : "listen",
	);
	const { addXp } = useGamification();
	const { addCard } = useSrs();

	const handleDiscriminationComplete = (summary: DiscriminationSummary) => {
		addXp(XP_DISCRIMINATION);
		onBestScore(summary.score);
		for (const pair of summary.missedPairs) {
			addCard({
				id: `pron-${pair.id}`,
				source: "vocabulary",
				front: `${pair.a} × ${pair.b}`,
				back: pair.tipPt,
				href: "/pronunciation",
			});
		}
		setStep(isStressFocus ? "stress" : "produce");
	};

	const handleProductionComplete = (attempted: number, passed: number) => {
		if (passed > 0) addXp(passed * XP_PRODUCTION_PER_WORD);
		setStep(isStressFocus ? "stress" : "listen");
		if (!isStressFocus) onExit();
		void attempted;
	};

	const handleStressComplete = (attempted: number, correct: number) => {
		if (correct > 0) addXp(correct * XP_STRESS_PER_WORD);
		void attempted;
		onExit();
	};

	if (!info || (!hasPairs && !isStressFocus)) return null;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<Button variant="ghost" size="sm" onClick={onExit} className="pl-0">
					<ArrowLeft className="h-4 w-4 mr-2" /> Voltar
				</Button>
				<span className="text-sm text-muted-foreground">{info.title}</span>
			</div>

			<div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
				{info.howPt}
			</div>

			{step === "listen" && (
				<DiscriminationStep
					pairs={pairs}
					onComplete={handleDiscriminationComplete}
				/>
			)}
			{step === "produce" && (
				<ProductionStep pairs={pairs} onComplete={handleProductionComplete} />
			)}
			{step === "stress" && isStressFocus && (
				<WordStressStep items={stressItems} onComplete={handleStressComplete} />
			)}
		</div>
	);
}
