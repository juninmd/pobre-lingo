import { Bot } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { TutorSession } from "@/components/tutor/TutorSession";
import { Button } from "@/components/ui/button";
import { getScenario, TUTOR_SCENARIOS } from "@/lib/ai/tutorPrompt";
import { loadProficiencyResult } from "@/lib/proficiency";

export default function TutorPage() {
	const [params, setParams] = useSearchParams();
	const scenario = getScenario(params.get("scenario"));
	const level = loadProficiencyResult()?.level ?? "A2";

	return (
		<PageContainer className="max-w-3xl mx-auto space-y-6">
			<SEO
				title="Tutor de conversa"
				description="Pratique conversação em inglês com uma IA que roda no seu aparelho, grátis e sem cadastro."
			/>
			<PageHeader
				title="Tutor de conversa"
				description="Uma IA que roda no seu aparelho: nada do que você escreve sai dele."
				icon={Bot}
			/>
			<fieldset className="flex flex-wrap gap-2">
				<legend className="sr-only">Escolha a situação</legend>
				{TUTOR_SCENARIOS.map((item) => (
					<Button
						key={item.id}
						size="sm"
						variant={item.id === scenario.id ? "default" : "outline"}
						aria-pressed={item.id === scenario.id}
						onClick={() => setParams({ scenario: item.id })}
					>
						{item.title}
					</Button>
				))}
			</fieldset>
			<TutorSession key={scenario.id} scenario={scenario} level={level} />
		</PageContainer>
	);
}
