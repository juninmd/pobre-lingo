import { useState } from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { CheckpointLevelCard } from "@/components/curriculum/CheckpointLevelCard";
import { useCanDo } from "@/hooks/useCanDo";
import { CEFR_ORDER } from "@/lib/levels";

export default function CheckpointsPage() {
	const { isChecked, toggleChecked, isPassed, markPassed } = useCanDo();
	const [saveError, setSaveError] = useState(false);
	return (
		<PageContainer className="max-w-4xl mx-auto space-y-6">
			<header className="space-y-3">
				<h1 className="text-3xl font-bold">Checkpoints & Can-do</h1>
				<p>
					Revise conteúdos e registre o que já consegue fazer. As checagens
					abaixo avaliam pequenas amostras gramaticais; não aprovam um nível
					CEFR nem liberam aulas do curso.
				</p>
				<p className="text-sm text-muted-foreground">
					A autoavaliação é separada da checagem. Para avaliar comunicação,
					reúna exemplos de leitura, escuta, fala e escrita com feedback.
				</p>
				<Link to="/course/portfolio" className="block text-primary underline">
					Ver produções no meu portfólio
				</Link>
				<Link to="/course" className="block text-primary underline">
					Seguir o curso desde o início
				</Link>
			</header>
			{saveError && (
				<p role="alert">
					Não foi possível salvar. Permita o armazenamento ou libere espaço e
					tente novamente.
				</p>
			)}
			{CEFR_ORDER.map((level) => (
				<CheckpointLevelCard
					key={level}
					level={level}
					passed={isPassed(level)}
					isChecked={isChecked}
					onToggle={(id) => setSaveError(!toggleChecked(id))}
					onPass={() => {
						const saved = markPassed(level);
						setSaveError(!saved);
						return saved;
					}}
				/>
			))}
		</PageContainer>
	);
}
