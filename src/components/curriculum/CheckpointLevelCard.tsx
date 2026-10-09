import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CEFRLevel } from "@/lib/curriculumData";
import { canDoStatements, checkpointQuestions } from "@/lib/levelCheckpoints";
import { CanDoChecklist } from "./CanDoChecklist";
import { CheckpointQuiz } from "./CheckpointQuiz";

export function CheckpointLevelCard({
	level,
	passed,
	isChecked,
	onToggle,
	onPass,
}: {
	level: CEFRLevel;
	passed: boolean;
	isChecked: (id: string) => boolean;
	onToggle: (id: string) => void;
	onPass: () => boolean;
}) {
	const [open, setOpen] = useState(false);
	return (
		<section
			className="rounded-xl border border-border bg-card p-5 space-y-4"
			aria-labelledby={`checkpoint-${level}`}
		>
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h2 id={`checkpoint-${level}`} className="text-xl font-bold">
					Conteúdos {level}
				</h2>
				{passed && (
					<span className="text-sm text-primary">
						Checagem de conteúdo concluída
					</span>
				)}
				<Button
					variant="outline"
					onClick={() => setOpen(!open)}
					aria-expanded={open}
				>
					{open
						? "Fechar checagem"
						: `${passed ? "Repetir" : "Fazer"} checagem ${level}`}
				</Button>
			</div>
			<CanDoChecklist
				statements={canDoStatements[level]}
				isChecked={isChecked}
				onToggle={onToggle}
			/>
			{open && (
				<CheckpointQuiz
					level={level}
					questions={checkpointQuestions[level]}
					onPass={() => {
						const saved = onPass();
						if (saved) setOpen(false);
						return saved;
					}}
				/>
			)}
		</section>
	);
}
