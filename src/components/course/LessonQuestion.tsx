import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isCourseAnswerCorrect } from "@/lib/course/progress";
import type { CourseQuestion } from "@/lib/course/types";

interface LessonQuestionProps {
	question: CourseQuestion;
	answer: string | undefined;
	practice: boolean;
	position: number;
	total: number;
	onSubmit: (answer: string) => void;
	onNext: () => void;
}
export function LessonQuestion({
	question,
	answer,
	practice,
	position,
	total,
	onSubmit,
	onNext,
}: LessonQuestionProps) {
	const [draft, setDraft] = useState("");
	const [hint, setHint] = useState(false);
	const submitted = answer !== undefined;
	const correct = submitted && isCourseAnswerCorrect(question, answer);
	return (
		<section className="space-y-5" aria-labelledby="question-title">
			<h2 id="question-title" className="text-xl font-bold">
				{practice ? "2. Pratique com ajuda" : "3. Confira sem consultar"}
			</h2>
			<p className="text-sm text-muted-foreground">
				Questão {position + 1} de {total}.{" "}
				{practice
					? "Pode usar uma dica; errar faz parte."
					: "Responda com o que lembra. Todas as respostas precisam estar corretas para avançar."}
			</p>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					if (!submitted) onSubmit(draft);
				}}
				className="space-y-3"
			>
				<label htmlFor="course-answer" className="block text-lg font-medium">
					{question.prompt}
				</label>
				<Input
					id="course-answer"
					autoComplete="off"
					spellCheck={false}
					maxLength={500}
					value={submitted ? answer : draft}
					disabled={submitted}
					onChange={(event) => setDraft(event.target.value)}
				/>
				{!submitted && (
					<Button type="submit" disabled={!draft.trim()}>
						Conferir resposta
					</Button>
				)}
			</form>
			{practice && !submitted && (
				<>
					<Button variant="outline" onClick={() => setHint(true)}>
						Ver dica
					</Button>
					{hint && <p role="status">{question.explanation}</p>}
				</>
			)}
			{submitted && (
				<div
					role="status"
					className={`rounded-xl border p-4 space-y-2 ${correct ? "border-primary bg-primary/5" : "border-border bg-muted"}`}
				>
					<p className="font-semibold">
						{correct ? "Resposta correta!" : "Vamos ajustar essa resposta."}
					</p>
					{!correct && (
						<p>
							Resposta esperada:{" "}
							<span lang="en" className="font-semibold">
								{question.answers[0]}
							</span>
						</p>
					)}
					<p>{question.explanation}</p>
					{!correct && (
						<p className="text-sm">
							Este exercício aceita as formas indicadas. Outras formas podem ser
							válidas em uma conversa livre.
						</p>
					)}
				</div>
			)}
			{submitted && (
				<Button onClick={onNext}>
					{position + 1 === total
						? practice
							? "Começar checagem"
							: "Ver resultado"
						: "Próxima questão"}
				</Button>
			)}
		</section>
	);
}
