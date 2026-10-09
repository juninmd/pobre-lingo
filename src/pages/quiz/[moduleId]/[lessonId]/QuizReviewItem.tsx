import { CheckCircle2, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/lib/quizData";
import { cn } from "@/lib/utils";

interface QuizReviewItemProps {
	index: number;
	question: QuizQuestion;
	userAnswer: number | null | undefined;
}

export function QuizReviewItem({
	index,
	question,
	userAnswer,
}: QuizReviewItemProps) {
	const isCorrect = userAnswer === question.correctAnswer;

	return (
		<div
			className={cn(
				"p-4 rounded-lg border-2",
				isCorrect
					? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/20"
					: "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20",
			)}
		>
			<div className="flex items-start gap-2 mb-2">
				{isCorrect ? (
					<CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
				) : (
					<XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
				)}
				<span className="sr-only">
					{isCorrect ? "Resposta correta" : "Resposta incorreta"}
				</span>
				<div className="flex-1">
					<p className="font-medium mb-2">
						{index + 1}. {question.question}
					</p>
					{!isCorrect && (
						<>
							<p className="text-sm text-red-700 dark:text-red-400 mb-1">
								Sua resposta: {question.options[userAnswer ?? -1]}
							</p>
							<p className="text-sm text-green-700 dark:text-green-400 mb-1">
								Resposta correta: {question.options[question.correctAnswer]}
							</p>
						</>
					)}
					<p className="text-sm text-muted-foreground italic">
						{question.explanation}
					</p>
				</div>
			</div>
		</div>
	);
}
