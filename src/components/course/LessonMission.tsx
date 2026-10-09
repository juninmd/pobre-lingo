import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePersistentState } from "@/hooks/usePersistentState";
import { readMissionDraft, saveMission } from "@/lib/course/portfolio";
import type { GuidedLesson } from "@/lib/course/types";

export function LessonMission({
	lesson,
	onComplete,
}: {
	lesson: GuidedLesson;
	onComplete: () => boolean;
}) {
	const [stored, save] = usePersistentState<unknown>(
		`pobrelingo_course_draft_${lesson.id}`,
		{},
	);
	const draft = readMissionDraft(stored);
	const { text, reflection } = draft;
	const [error, setError] = useState(false);
	return (
		<section className="space-y-4" aria-labelledby="mission-title">
			<h2 id="mission-title" className="text-xl font-bold">
				4. Use no mundo real
			</h2>
			<p className="leading-relaxed">{lesson.mission}</p>
			<p className="text-sm text-muted-foreground">
				Faça a tarefa e registre sua produção. Se falou, transcreva o que disse.
				Este registro não recebe nota automática de correção ou pronúncia.
			</p>
			<label htmlFor="mission-text" className="block font-semibold">
				Minha produção em inglês
			</label>
			<textarea
				id="mission-text"
				value={text}
				maxLength={4000}
				rows={5}
				className="w-full rounded-lg border border-input bg-background p-3"
				onChange={(event) => save({ ...draft, text: event.target.value })}
				aria-describedby="mission-review"
			/>
			<p id="mission-review" className="text-sm text-muted-foreground">
				Confira: comuniquei o objetivo da aula? Usei as expressões estudadas? O
				que ainda preciso esclarecer? Revise os exemplos antes de salvar.
			</p>
			<label htmlFor="mission-reflection" className="block font-semibold">
				Dúvidas e pontos para melhorar (opcional)
			</label>
			<textarea
				id="mission-reflection"
				value={reflection}
				maxLength={1000}
				rows={2}
				className="w-full rounded-lg border border-input bg-background p-3"
				onChange={(event) => save({ ...draft, reflection: event.target.value })}
			/>
			<Button asChild variant="outline">
				<Link to={lesson.practiceRoute}>Abrir prática complementar</Link>
			</Button>
			<Button
				className="block h-auto whitespace-normal text-left"
				disabled={!text.trim()}
				onClick={() => {
					const saved =
						saveMission(lesson.id, text, reflection) && onComplete();
					setError(!saved);
				}}
			>
				Salvar produção e concluir aula
			</Button>
			{error && (
				<p role="alert">
					Não foi possível salvar. Permita o armazenamento neste navegador ou
					libere espaço e tente novamente. Copie seu texto para preservá-lo.
				</p>
			)}
			<p className="text-sm text-muted-foreground">
				O portfólio fica neste navegador. Guarde uma cópia e busque feedback de
				um professor ou parceiro.
			</p>
		</section>
	);
}
