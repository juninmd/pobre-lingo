import { ChevronRight, Clock, Newspaper } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { LessonProgressBar } from "@/components/curriculum/LessonProgressBar";
import { NewsComprehension } from "@/components/exercises/NewsComprehension";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { newsComprehensionExercises } from "@/lib/exerciseData";

export default function NewsComprehensionPage() {
	const [selectedExercise, setSelectedExercise] = useState<any>(null);
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [searchParams] = useSearchParams();
	const {} = useCurriculumProgress();

	const moduleId = searchParams.get("module");
	const lessonId = searchParams.get("lesson");
	const isFromCurriculum = moduleId !== null && lessonId !== null;

	const handleQuizComplete = (score: number, totalQuestions: number) => {
		// Se acertou mais de 60%, considera como exercício completo
		if (score / totalQuestions >= 0.6) {
			setQuizCompleted(true);
		}
	};

	if (selectedExercise) {
		return (
			<PageContainer>
				{isFromCurriculum && moduleId && lessonId && (
					<div className="mb-6">
						<LessonProgressBar
							moduleId={moduleId}
							lessonId={lessonId}
							showCompleteButton={quizCompleted}
						/>
					</div>
				)}
				<NewsComprehension
					exercise={selectedExercise}
					onBackToList={() => {
						setSelectedExercise(null);
						setQuizCompleted(false);
					}}
					onQuizComplete={handleQuizComplete}
				/>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			{isFromCurriculum && moduleId && lessonId && (
				<div className="mb-6">
					<LessonProgressBar
						moduleId={moduleId}
						lessonId={lessonId}
						showCompleteButton={false}
					/>
				</div>
			)}

			<PageHeader
				title="Interpretação de Artigos"
				description="Pratique leitura e compreensão de texto em inglês com artigos reais."
				icon={Newspaper}
				iconClassName="text-brand-aqua"
				backLink="/"
				backLabel="Voltar ao Início"
			>
				<Badge variant="secondary">
					{newsComprehensionExercises.length} artigos disponíveis
				</Badge>
			</PageHeader>

			<div className="grid gap-4 md:grid-cols-2">
				{newsComprehensionExercises.map((exercise) => (
					<Card
						key={exercise.id}
						className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group p-0 focus-within:ring-2 focus-within:ring-ring"
					>
						<button
							type="button"
							onClick={() => setSelectedExercise(exercise)}
							className="w-full text-left focus:outline-none"
							aria-label={`Abrir artigo: ${exercise.article.title}`}
						>
							<CardContent className="p-5">
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1">
										<h2 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
											{exercise.article.title}
										</h2>
										<div className="flex items-center gap-3 text-sm text-muted-foreground">
											<span>{exercise.article.source}</span>
											<span>•</span>
											<span className="flex items-center gap-1">
												<Clock className="h-3 w-3" aria-hidden="true" />
												{exercise.article.date}
											</span>
										</div>
									</div>
									<ChevronRight
										className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1"
										aria-hidden="true"
									/>
								</div>
							</CardContent>
						</button>
					</Card>
				))}
			</div>
		</PageContainer>
	);
}
