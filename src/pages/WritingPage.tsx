// @ts-nocheck
import { FilePenLine, Keyboard } from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { DictationExercise } from "@/components/exercises/DictationExercise";
import { WritingPromptEditor } from "@/components/exercises/WritingPromptEditor";
import { Button } from "@/components/ui/button";
import { useStudyTimer } from "@/hooks/useStudyLog";
import type { CEFRLevel } from "@/lib/curriculumData";
import { dictations, writingPrompts } from "@/lib/dictationData";

export default function WritingPage() {
	useStudyTimer("writing");
	const [tab, setTab] = useState<"dictation" | "writing">("dictation");
	const [level, setLevel] = useState<CEFRLevel>("A1");

	const items = dictations.filter((item) => item.level === level);
	const prompt =
		writingPrompts.find((item) => item.level === level) ?? writingPrompts[0];

	return (
		<PageContainer className="max-w-3xl mx-auto">
			<PageHeader
				title="Escrita & Ditado"
				description="Output produtivo: escreva o que ouve (ditado) e produza textos com feedback."
				icon={FilePenLine}
				iconClassName="text-brand-gold"
			/>

			<div className="flex flex-wrap gap-2 mb-5">
				<Button
					size="sm"
					variant={tab === "dictation" ? "default" : "outline"}
					onClick={() => setTab("dictation")}
					className="gap-2"
				>
					<Keyboard className="h-4 w-4" />
					Ditado
				</Button>
				<Button
					size="sm"
					variant={tab === "writing" ? "default" : "outline"}
					onClick={() => setTab("writing")}
					className="gap-2"
				>
					<FilePenLine className="h-4 w-4" />
					Redação
				</Button>
			</div>

			<div className="flex flex-wrap gap-2 mb-5">
				{(["A1", "A2", "B1", "B2"] as const).map((item) => (
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

			{tab === "dictation" ? (
				<DictationExercise items={items} />
			) : (
				<WritingPromptEditor key={prompt.id} prompt={prompt} />
			)}
		</PageContainer>
	);
}
