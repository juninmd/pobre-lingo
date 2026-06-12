"use client";

import {
	ArrowLeft,
	CheckCircle,
	FileText,
	Newspaper,
	PartyPopper,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {
	ArticleQuestion,
	NewsComprehensionExercise,
} from "@/lib/exerciseData";

interface NewsComprehensionProps {
	exercise: NewsComprehensionExercise;
	onBackToList: () => void;
	onQuizComplete?: (score: number, totalQuestions: number) => void;
}

export function NewsComprehension({
	exercise,
	onBackToList,
	onQuizComplete,
}: NewsComprehensionProps) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showFeedback, setShowFeedback] = useState(false);
	const [score, setScore] = useState(0);
	const [quizFinished, setQuizFinished] = useState(false);

	// Shuffle questions/options on mount/init
	const [shuffledQuestions] = useState(() => {
		return exercise.questions.map((q) => {
			const options = [...q.options];
			for (let i = options.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[options[i], options[j]] = [options[j], options[i]];
			}
			return { ...q, options };
		});
	});

	const currentQuestion: ArticleQuestion | undefined =
		shuffledQuestions[currentQuestionIndex];

	const handleAnswerSubmit = () => {
		if (!selectedAnswer || !currentQuestion) return;
		setShowFeedback(true);
		if (selectedAnswer === currentQuestion.correctAnswer) {
			setScore((prevScore) => prevScore + 1);
		}
	};

	const handleNextQuestion = () => {
		setShowFeedback(false);
		setSelectedAnswer(null);
		if (currentQuestionIndex < exercise.questions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		} else {
			setQuizFinished(true);
			onQuizComplete?.(score, exercise.questions.length);
		}
	};

	if (quizFinished) {
		return (
			<PageContainer>
				<Button
					onClick={onBackToList}
					variant="outline"
					size="sm"
					className="mb-6"
				>
					<ArrowLeft className="mr-2 h-4 w-4" /> Voltar à Lista de Artigos
				</Button>
				<Card className="w-full max-w-3xl mx-auto shadow-xl bg-card">
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center text-primary">
							Exercício Concluído!
						</CardTitle>
						<CardDescription className="text-center text-muted-foreground">
							Artigo: {exercise.article.title}
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<PartyPopper className="mx-auto h-16 w-16 text-accent mb-4" />
						<p className="text-xl text-foreground">
							Você acertou {score} de {exercise.questions.length} perguntas.
						</p>
						<p className="text-lg text-muted-foreground mt-2">
							Sua pontuação:{" "}
							{((score / exercise.questions.length) * 100).toFixed(0)}%
						</p>
						<Button
							onClick={onBackToList}
							className="mt-6 bg-primary hover:bg-primary/90"
						>
							<FileText className="mr-2 h-4 w-4" /> Escolher Outro Artigo
						</Button>
					</CardContent>
				</Card>
			</PageContainer>
		);
	}

	if (!currentQuestion) {
		return (
			<PageContainer>
				<p>Carregando questão...</p>
				<Button
					onClick={onBackToList}
					variant="outline"
					size="sm"
					className="mt-4"
				>
					<ArrowLeft className="mr-2 h-4 w-4" /> Voltar à Lista
				</Button>
			</PageContainer>
		);
	}

	const progressValue =
		((currentQuestionIndex + 1) / exercise.questions.length) * 100;

	return (
		<PageContainer>
			<Button
				onClick={onBackToList}
				variant="outline"
				size="sm"
				className="mb-6"
			>
				<ArrowLeft className="mr-2 h-4 w-4" /> Voltar à Lista de Artigos
			</Button>
			<div className="space-y-6">
				<Card className="shadow-lg bg-card">
					<CardHeader>
						<CardTitle className="text-2xl text-primary flex items-center">
							<Newspaper className="mr-3 h-7 w-7" /> {exercise.article.title}
						</CardTitle>
						{exercise.article.source && exercise.article.date && (
							<CardDescription className="text-sm text-muted-foreground">
								Fonte: {exercise.article.source} | Data: {exercise.article.date}
							</CardDescription>
						)}
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-60 md:h-72 w-full rounded-md border p-4 bg-background/30">
							<div
								className="prose prose-sm max-w-none text-foreground/90"
								dangerouslySetInnerHTML={{ __html: exercise.article.content }}
							/>
						</ScrollArea>
					</CardContent>
				</Card>

				<Card className="w-full shadow-xl bg-card">
					<CardHeader>
						<Progress value={progressValue} className="w-full mb-3 h-2" />
						<CardTitle className="text-xl font-semibold text-primary">
							Questão {currentQuestionIndex + 1} de {exercise.questions.length}
						</CardTitle>
						<CardDescription className="text-lg text-foreground pt-2">
							{currentQuestion.questionText}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RadioGroup
							value={selectedAnswer ?? undefined}
							onValueChange={setSelectedAnswer}
							disabled={showFeedback}
						>
							{currentQuestion.options.map((option, index) => (
								<div
									key={index}
									className="flex items-center space-x-2 my-2 p-3 border rounded-md hover:bg-muted/50 transition-colors"
								>
									<RadioGroupItem
										value={option}
										id={`option-${index}-${currentQuestion.id}`}
									/>
									<Label
										htmlFor={`option-${index}-${currentQuestion.id}`}
										className="text-base text-foreground cursor-pointer flex-1"
									>
										{option}
									</Label>
								</div>
							))}
						</RadioGroup>

						{showFeedback && (
							<Alert
								className={`mt-4 ${selectedAnswer === currentQuestion.correctAnswer ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}
							>
								{selectedAnswer === currentQuestion.correctAnswer ? (
									<CheckCircle className="h-5 w-5 text-green-500" />
								) : (
									<XCircle className="h-5 w-5 text-red-500" />
								)}
								<AlertTitle
									className={
										selectedAnswer === currentQuestion.correctAnswer
											? "text-green-700"
											: "text-red-700"
									}
								>
									{selectedAnswer === currentQuestion.correctAnswer
										? "Correto!"
										: "Incorreto!"}
								</AlertTitle>
								<AlertDescription className="text-sm text-foreground/80">
									<span className="font-semibold">Resposta correta:</span>{" "}
									{currentQuestion.correctAnswer}
									<br />
									<span className="font-semibold">Explicação:</span>{" "}
									{currentQuestion.explanation}
								</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						{showFeedback ? (
							<Button
								onClick={handleNextQuestion}
								className="w-full bg-primary hover:bg-primary/90"
							>
								{currentQuestionIndex === exercise.questions.length - 1
									? "Finalizar Exercício"
									: "Próxima Pergunta"}
							</Button>
						) : (
							<Button
								onClick={handleAnswerSubmit}
								disabled={!selectedAnswer}
								className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
							>
								Responder
							</Button>
						)}
					</CardFooter>
				</Card>
			</div>
		</PageContainer>
	);
}
