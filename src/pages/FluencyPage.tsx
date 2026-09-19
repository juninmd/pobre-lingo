import { Gauge, Mic } from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SpeakingExercise } from "@/components/exercises/SpeakingExercise";
import { Fluency432 } from "@/components/fluency/Fluency432";
import { ShadowingPanel } from "@/components/fluency/ShadowingPanel";
import { Button } from "@/components/ui/button";
import type { CEFRLevel } from "@/lib/curriculumData";
import { shadowingLines } from "@/lib/fluencyData";

export default function FluencyPage() {
	const [tab, setTab] = useState<"432" | "shadowing">("432");
	const [level, setLevel] = useState<CEFRLevel>("A1");
	const [practicing, setPracticing] = useState(false);

	if (practicing) {
		const lines = shadowingLines.filter((line) => line.level === level);
		return (
			<PageContainer className="max-w-3xl mx-auto">
				<PageHeader
					title="Shadowing"
					description="Ouça e repita imitando ritmo e entonação."
					icon={Mic}
				/>
				<SpeakingExercise
					phrases={lines.map((line) => ({ phrase: line.en, translation: line.pt }))}
					onComplete={() => setPracticing(false)}
				/>
				<Button
					variant="ghost"
					className="mt-4"
					onClick={() => setPracticing(false)}
				>
					Voltar
				</Button>
			</PageContainer>
		);
	}

	return (
		<PageContainer className="max-w-4xl mx-auto">
			<PageHeader
				title="Treino de Fluência"
				description="4/3/2 e shadowing: fale o mesmo conteúdo em menos tempo para automatizar o que você já sabe."
				icon={Gauge}
				iconClassName="text-brand-gold"
			/>

			<div className="flex flex-wrap gap-2 mb-5">
				<Button
					size="sm"
					variant={tab === "432" ? "default" : "outline"}
					onClick={() => setTab("432")}
				>
					4/3/2
				</Button>
				<Button
					size="sm"
					variant={tab === "shadowing" ? "default" : "outline"}
					onClick={() => setTab("shadowing")}
				>
					Shadowing
				</Button>
			</div>

			<div className="flex flex-wrap gap-2 mb-5">
				{(["A1", "A2", "B1", "B2", "C1"] as const).map((item) => (
					<Button
						key={item}
						size="sm"
						variant={item === level ? "secondary" : "ghost"}
						onClick={() => setLevel(item)}
					>
						{item}
					</Button>
				))}
			</div>

			{tab === "432" ? (
				<Fluency432 level={level} />
			) : (
				<ShadowingPanel level={level} onPractice={() => setPracticing(true)} />
			)}
		</PageContainer>
	);
}
