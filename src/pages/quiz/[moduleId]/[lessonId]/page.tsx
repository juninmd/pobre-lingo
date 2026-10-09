import { ArrowLeft, CheckCircle2, Star, Trophy } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { LessonProgressBar } from "@/components/curriculum/LessonProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { useSrs } from "@/hooks/useSrs";
import { curriculumData } from "@/lib/curriculumData";
import { quizData } from "@/lib/quizData";
import { cn } from "@/lib/utils";
import { QuizLiveStatus } from "./QuizLiveStatus";
import { QuizReviewItem } from "./QuizReviewItem";

export default function QuizLessonPage() {
	const { moduleId, lessonId } = useParams<{
		moduleId: string;
		lessonId: string;
	}>();
	const navigate = useNavigate();
	const { completeLesson, isLessonCompleted } = useCurriculumProgress();
	const { addCard } = useSrs();

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
	const [showResults, setShowResults] = useState(false);
	const [quizCompleted, setQuizCompleted] = useState(false);

	// Encontrar a lição
	const module = curriculumData.modules.find((m) => m.id === moduleId);
	const lesson = module?.lessons.find((l) => l.id === lessonId);
	const questions = quizData[lessonId || ""] || [];

	if (!module || !lesson || questions.length === 0) {
		return (
			<PageContainer>
				<Card>
					<CardHeader>
						<CardTitle>Quiz não encontrado</CardTitle>
					</CardHeader>
					<CardContent>
						<Button onClick={() => navigate("/")}>
							Voltar para o Currículo
						</Button>
					</CardContent>
				</Card>
			</PageContainer>
		);
	}

	const completed = isLessonCompleted(moduleId!, lessonId!);
	const currentQ = questions[currentQuestion];
	const progress = ((currentQuestion + 1) / questions.length) * 100;

	const handleSelectAnswer = (answerIndex: number) => {
		const newAnswers = [...selectedAnswers];
		newAnswers[currentQuestion] = answerIndex;
		setSelectedAnswers(newAnswers);
	};

	/** Manda cada questão errada para a fila de repetição espaçada. */
	const enqueueMistakes = () => {
		questions.forEach((q, idx) => {
			if (selectedAnswers[idx] === q.correctAnswer) return;
			addCard({
				id: `quiz-${lessonId}-${idx}`,
				source: "quiz",
				front: q.question,
				back: q.options[q.correctAnswer],
				hint: q.explanation,
				href: `/quiz/${moduleId}/${lessonId}`,
			});
		});
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion((prev) => prev + 1);
		} else {
			enqueueMistakes();
			setShowResults(true);
		}
	};

	const handlePrevious = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1);
		}
	};

	const calculateScore = () => {
		let correct = 0;
		questions.forEach((q, idx) => {
			if (selectedAnswers[idx] === q.correctAnswer) {
				correct++;
			}
		});
		return {
			correct,
			total: questions.length,
			percentage: Math.round((correct / questions.length) * 100),
		};
	};

	const handleFinish = () => {
		const score = calculateScore();
		if (score.percentage >= 70 && !completed) {
			completeLesson(moduleId!, lessonId!, lesson.xpReward);
			setQuizCompleted(true);
		} else {
			navigate("/", { replace: true });
		}
	};

	const handleRetry = () => {
		setCurrentQuestion(0);
		setSelectedAnswers([]);
		setShowResults(false);
	};

	if (quizCompleted) {
		const score = calculateScore();
		return (
			<PageContainer>
				<QuizLiveStatus>
					{`Quiz concluído com ${score.percentage}%. Você ganhou ${lesson.xpReward} XP.`}
				</QuizLiveStatus>
				<div className="max-w-2xl mx-auto">
					<Card className="border-2 border-green-500">
						<CardHeader className="text-center">
							<div className="flex justify-center mb-4">
								<div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
									<Trophy className="h-10 w-10 text-green-600 dark:text-green-400" />
								</div>
							</div>
							<CardTitle className="text-3xl">
								Parabéns! Quiz Completo!
							</CardTitle>
							<CardDescription>
								Você concluiu "{lesson.title_pt}" com sucesso!
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="text-center">
								<div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
									{score.percentage}%
								</div>
								<p className="text-muted-foreground">
									{score.correct} de {score.total} questões corretas
								</p>
							</div>

							<div className="flex items-center justify-center gap-8">
								<div className="text-center">
									<Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
									<p className="text-2xl font-bold">+{lesson.xpReward}</p>
									<p className="text-sm text-muted-foreground">XP Ganhos</p>
								</div>
							</div>

							<div className="flex gap-2">
								<Button onClick={() => navigate("/")} className="flex-1">
									Voltar ao Currículo
								</Button>
								<Button
									onClick={handleRetry}
									variant="outline"
									className="flex-1"
								>
									Refazer Quiz
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</PageContainer>
		);
	}

	if (showResults) {
		const score = calculateScore();
		const passed = score.percentage >= 70;

		return (
			<PageContainer>
				<QuizLiveStatus>
					{`Resultado do quiz: ${score.percentage}%, ${score.correct} de ${score.total} corretas. ${passed ? "Aprovado." : "Reprovado: você precisa de 70% para passar."}`}
				</QuizLiveStatus>
				<div className="max-w-2xl mx-auto">
					<Card
						className={cn(
							passed ? "border-green-500" : "border-yellow-500",
							"border-2",
						)}
					>
						<CardHeader>
							<CardTitle className="text-2xl">Resultados do Quiz</CardTitle>
							<CardDescription>{lesson.title_pt}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="text-center p-6 bg-muted/50 rounded-lg">
								<div
									className={cn(
										"text-5xl font-bold mb-2",
										passed
											? "text-green-600 dark:text-green-400"
											: "text-yellow-600 dark:text-yellow-400",
									)}
								>
									{score.percentage}%
								</div>
								<p className="text-lg">
									{score.correct} de {score.total} questões corretas
								</p>
								{passed ? (
									<p className="text-green-600 dark:text-green-400 font-semibold mt-2">
										✓ Aprovado! Você pode avançar.
									</p>
								) : (
									<p className="text-yellow-600 dark:text-yellow-400 font-semibold mt-2">
										Você precisa de 70% para passar. Tente novamente!
									</p>
								)}
							</div>

							{/* Revisão das questões */}
							<div className="space-y-4">
								<h3 className="font-semibold text-lg">Revisão:</h3>
								{questions.map((q, idx) => (
									<QuizReviewItem
										key={q.question}
										index={idx}
										question={q}
										userAnswer={selectedAnswers[idx]}
									/>
								))}
							</div>

							<div className="flex gap-2">
								{passed ? (
									<Button onClick={handleFinish} className="flex-1">
										<CheckCircle2 className="h-4 w-4 mr-2" />
										Concluir (+{lesson.xpReward} XP)
									</Button>
								) : (
									<Button onClick={handleRetry} className="flex-1">
										Tentar Novamente
									</Button>
								)}
								<Button onClick={() => navigate("/")} variant="outline">
									Voltar ao Currículo
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<QuizLiveStatus>
				{`Questão ${currentQuestion + 1} de ${questions.length}`}
			</QuizLiveStatus>
			<div className="max-w-2xl mx-auto">
				{/* Barra de Progresso da Jornada */}
				<LessonProgressBar
					moduleId={moduleId!}
					lessonId={lessonId!}
					showCompleteButton={false}
					className="mb-6"
				/>

				{/* Header */}
				<div className="mb-6">
					<Button
						variant="ghost"
						onClick={() => navigate("/")}
						className="mb-4"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Voltar para o Currículo
					</Button>
					<div className="flex items-center justify-between mb-2">
						<h1 className="text-3xl font-bold">{lesson.title_pt}</h1>
						{completed && (
							<Badge className="bg-green-500">
								<CheckCircle2 className="h-4 w-4 mr-1" />
								Completo
							</Badge>
						)}
					</div>
					<p className="text-muted-foreground">{lesson.description_pt}</p>
				</div>

				{/* Progresso */}
				<Card className="mb-6">
					<CardContent className="pt-6">
						<div className="flex justify-between text-sm mb-2">
							<span>Progresso do Quiz</span>
							<span className="font-medium">
								Questão {currentQuestion + 1} de {questions.length}
							</span>
						</div>
						<Progress value={progress} className="h-2" />
					</CardContent>
				</Card>

				{/* Questão */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle id="quiz-question-title">
							Questão {currentQuestion + 1}
						</CardTitle>
						<CardDescription id="quiz-question-text" className="text-lg pt-2">
							{currentQ.question}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RadioGroup
							aria-labelledby="quiz-question-title quiz-question-text"
							// "" keeps the group controlled; undefined flipped it to uncontrolled and dropped repeat picks.
							value={selectedAnswers[currentQuestion]?.toString() ?? ""}
							onValueChange={(value) => handleSelectAnswer(parseInt(value, 10))}
						>
							<div className="space-y-3">
								{currentQ.options.map((option, idx) => (
									<Label
										key={option}
										htmlFor={`option-${idx}`}
										className={cn(
											"flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors",
											selectedAnswers[currentQuestion] === idx
												? "border-primary bg-primary/5"
												: "border-border hover:border-primary/40",
										)}
									>
										<RadioGroupItem
											value={idx.toString()}
											id={`option-${idx}`}
										/>
										<span className="flex-1">{option}</span>
									</Label>
								))}
							</div>
						</RadioGroup>
					</CardContent>
				</Card>

				{/* Navegação */}
				<div className="flex justify-between">
					<Button
						onClick={handlePrevious}
						disabled={currentQuestion === 0}
						variant="outline"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Anterior
					</Button>

					<Button
						onClick={handleNext}
						disabled={
							selectedAnswers[currentQuestion] === null ||
							selectedAnswers[currentQuestion] === undefined
						}
					>
						{currentQuestion === questions.length - 1
							? "Ver Resultados"
							: "Próxima"}
					</Button>
				</div>
			</div>
		</PageContainer>
	);
}
