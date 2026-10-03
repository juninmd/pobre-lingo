// @ts-nocheck
import { Ear } from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { FocusPicker } from "@/components/pronunciation/FocusPicker";
import { FocusSession } from "@/components/pronunciation/FocusSession";
import { usePersistentState } from "@/hooks/usePersistentState";
import { useStudyTimer } from "@/hooks/useStudyLog";
import type { PronunciationFocus } from "@/lib/pronunciation/types";

type BestScores = Partial<Record<PronunciationFocus, number>>;

export default function PronunciationPage() {
	useStudyTimer("speaking");
	const [focus, setFocus] = useState<PronunciationFocus | null>(null);
	const [bestScores, setBestScores] = usePersistentState<BestScores>(
		"pobrelingo_pron_best_scores",
		{},
	);

	const registerScore = (score: number) => {
		if (!focus) return;
		setBestScores((prev) => ({
			...prev,
			[focus]: Math.max(prev[focus] ?? 0, score),
		}));
	};

	return (
		<PageContainer className="max-w-4xl mx-auto">
			<SEO
				title="Pronúncia para brasileiros"
				description="Treine os sons do inglês que mais confundem brasileiros: TH, vogais, -ED e acento tônico."
			/>
			<PageHeader
				title="Pronúncia para brasileiros"
				description="Ouça, discrimine e produza os sons que o português não tem. Primeiro o ouvido, depois a fala."
				icon={Ear}
				iconClassName="text-brand-aqua"
			/>

			{focus ? (
				<FocusSession
					focus={focus}
					onExit={() => setFocus(null)}
					onBestScore={registerScore}
				/>
			) : (
				<FocusPicker bestScores={bestScores} onSelect={setFocus} />
			)}
		</PageContainer>
	);
}
