import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	CheckCircle2,
	Star,
	Volume2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { CultureLessonView } from "@/components/curriculum/CultureLessonView";
import { GrammarLessonView } from "@/components/curriculum/GrammarLessonView";
import { LessonProgressBar } from "@/components/curriculum/LessonProgressBar";
import { QuizView } from "@/components/curriculum/QuizView";
import ConversationExercise from "@/components/exercises/ConversationExercise";
import { FindIncorrectWords } from "@/components/exercises/FindIncorrectWords";
import { ListeningExercise } from "@/components/exercises/ListeningExercise";
import { SentenceOrdering } from "@/components/exercises/SentenceOrdering";
import { SpeakingExercise } from "@/components/exercises/SpeakingExercise";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { useStudyTimer } from "@/hooks/useStudyLog";
import { curriculumData } from "@/lib/curriculumData";
import { getWordsByTopic } from "@/lib/dictionaryData";
import { speakingData } from "@/lib/speakingData";
import { tts } from "@/lib/tts";
import { MatchingPairsGame } from "./MatchingPairsGame";
import { ReadingLessonWrapper } from "./ReadingLessonWrapper";

export default function LessonPage() {
	useStudyTimer("study");
	const { moduleId, lessonId } = useParams<{
		moduleId: string;
		lessonId: string;
	}>();
	const navigate = useNavigate();
	const { completeLesson, isLessonCompleted } = useCurriculumProgress();

	const [currentIndex, setCurrentIndex] = useState(0);
	const [showTranslation, setShowTranslation] = useState(false);
	const [mastered, setMastered] = useState<Set<number>>(new Set());

	// Encontrar a lição
	const module = curriculumData.modules.find((m) => m.id === moduleId);
	const lesson = module?.lessons.find((l) => l.id === lessonId);

	if (!module || !lesson) {
		return (
			<PageContainer>
				<Card>
					<CardHeader>
						<CardTitle>Lição não encontrada</CardTitle>
					</CardHeader>
					<CardContent>
						<Button onClick={() => navigate("/")}>Voltar para o Início</Button>
					</CardContent>
				</Card>
			</PageContainer>
		);
	}

	const completed = isLessonCompleted(moduleId || "", lessonId || "");

	const handleComplete = () => {
		if (!completed) {
			completeLesson(moduleId || "", lessonId || "", lesson.xpReward);
			navigate("/", { replace: true });
		}
		navigate("/");
	};

	// Render Logic based on Type
	const renderContent = () => {
		switch (lesson.type) {
			case "speaking": {
				const speakingTopics = lesson.speakingTopics || [];
				const speakingPhrases = speakingTopics.flatMap(
					(topic) => speakingData[topic] || [],
				);
				return (
					<SpeakingExercise
						phrases={speakingPhrases}
						onComplete={handleComplete}
					/>
				);
			}

			case "exercise":
				if (lesson.exerciseType === "sentence-ordering") {
					return <SentenceOrdering />;
				}
				if (lesson.exerciseType === "find-incorrect-words") {
					return <FindIncorrectWords />;
				}
				if (lesson.exerciseType === "matching-pairs") {
					return <MatchingPairsGame onComplete={handleComplete} />;
				}
				if (lesson.exerciseType === "conversation") {
					return <ConversationExercise />;
				}
				if (lesson.exerciseType === "listening") {
					return <ListeningExercise />;
				}
				return (
					<div className="p-4">
						Tipo de exercício não suportado: {lesson.exerciseType}
					</div>
				);

			case "reading": {
				return (
					<ReadingLessonWrapper
						key={lesson.id}
						navigate={navigate}
						xpReward={lesson.xpReward}
						moduleId={moduleId || ""}
						lessonId={lessonId || ""}
						completeLesson={completeLesson}
					/>
				);
			}

			case "grammar":
				return (
					<GrammarLessonView
						ruleIds={lesson.grammarRuleIds || []}
						onComplete={handleComplete}
						isCompleted={completed}
					/>
				);

			case "culture":
				return (
					<CultureLessonView
						lesson={lesson}
						onComplete={handleComplete}
						isCompleted={completed}
					/>
				);

			case "quiz":
				return (
					<QuizView
						lesson={lesson}
						onComplete={handleComplete}
						isCompleted={completed}
					/>
				);
			default: {
				const topics = lesson.vocabularyTopics || [];
				// New Logic: Fetch from centralized dictionary
				const allWordsEntries = topics.flatMap((topic) =>
					getWordsByTopic(topic),
				);

				// Map to local format
				const allWords = allWordsEntries.map((entry) => ({
					word: entry.word,
					translation: entry.translation_pt,
					example: entry.example_sentence_en || "",
				}));

				const currentWord = allWords[currentIndex];
				const progress =
					allWords.length > 0
						? ((currentIndex + 1) / allWords.length) * 100
						: 0;

				// Helpers for vocab
				const handleNext = () => {
					if (currentIndex < allWords.length - 1) {
						setCurrentIndex((prev) => prev + 1);
						setShowTranslation(false);
					}
				};

				const handlePrevious = () => {
					if (currentIndex > 0) {
						setCurrentIndex((prev) => prev - 1);
						setShowTranslation(false);
					}
				};

				const handleMaster = () => {
					setMastered((prev) => new Set(prev).add(currentIndex));
				};

				const getTextToSpeak = (word: string) => {
					if (word.startsWith("/") && word.includes("(")) {
						const match = word.match(/\(([^)]+)\)/);
						return match ? match[1] : word;
					}
					if (word.includes("(")) {
						return word.split("(")[0].trim();
					}
					return word;
				};

				const handleSpeak = () => {
					if (!currentWord) return;
					const text = getTextToSpeak(currentWord.word);
					tts.speak(text, "en-US", 0.8);
				};

				if (allWords.length === 0) {
					return (
						<Card>
							<CardContent className="p-8 text-center">
								<p>Nenhuma palavra encontrada para este tópico.</p>
								<Button onClick={() => navigate("/")} className="mt-4">
									Voltar
								</Button>
							</CardContent>
						</Card>
					);
				}

				return (
					<div className="max-w-4xl mx-auto">
						{/* Progresso */}
						<Card className="mb-6">
							<CardContent className="pt-6">
								<div className="flex justify-between text-sm mb-2">
									<span>Progresso</span>
									<span className="font-medium">
										{currentIndex + 1} / {allWords.length}
									</span>
								</div>
								<Progress
									value={progress}
									className="h-2"
									aria-label="Progresso da lição"
								/>
								<div className="mt-2 text-sm text-muted-foreground">
									{mastered.size} palavras dominadas
								</div>
							</CardContent>
						</Card>

						{/* Card de Vocabulário */}
						{currentWord && (
							<Card className="mb-6">
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle className="text-2xl">
											Palavra {currentIndex + 1}
										</CardTitle>
										<Button
											variant="outline"
											size="sm"
											onClick={() => setShowTranslation(!showTranslation)}
										>
											<BookOpen className="h-4 w-4 mr-2" />
											{showTranslation ? "Ocultar" : "Mostrar"} Tradução
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-6">
										{/* Palavra em Inglês */}
										<div className="text-center p-8 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
											<h2 className="text-4xl font-bold mb-4">
												{currentWord.word}
											</h2>
											<Button
												variant="ghost"
												size="sm"
												onClick={handleSpeak}
												aria-label="Ouvir a pronúncia"
											>
												<Volume2 className="h-5 w-5" aria-hidden="true" />
											</Button>
										</div>

										{/* Tradução */}
										{showTranslation && (
											<div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-900">
												<p className="text-2xl font-semibold text-green-900 dark:text-green-300">
													{currentWord.translation}
												</p>
											</div>
										)}

										{/* Exemplo */}
										<div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
											<h3 className="font-semibold mb-2">Exemplo:</h3>
											<p className="text-lg italic">{currentWord.example}</p>
										</div>

										{/* Botão Dominar */}
										<div className="text-center">
											<Button
												onClick={handleMaster}
												disabled={mastered.has(currentIndex)}
												variant={
													mastered.has(currentIndex) ? "outline" : "default"
												}
											>
												{mastered.has(currentIndex) ? (
													<>
														<CheckCircle2 className="h-4 w-4 mr-2" />
														Dominada
													</>
												) : (
													<>
														<Star className="h-4 w-4 mr-2" />
														Marcar como Dominada
													</>
												)}
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Navegação */}
						<div className="flex justify-between items-center">
							<Button
								onClick={handlePrevious}
								disabled={currentIndex === 0}
								variant="outline"
							>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Anterior
							</Button>

							{currentIndex === allWords.length - 1 ? (
								<Button onClick={handleComplete} size="lg">
									<CheckCircle2 className="h-4 w-4 mr-2" />
									{completed ? "Voltar ao Currículo" : "Concluir Lição"}
									{!completed && ` (+${lesson.xpReward} XP)`}
								</Button>
							) : (
								<Button onClick={handleNext}>
									Próxima
									<ArrowRight className="h-4 w-4 ml-2" />
								</Button>
							)}
						</div>
					</div>
				);
			}
		}
	};

	return (
		<PageContainer>
			<div className="max-w-4xl mx-auto">
				{/* Barra de Progresso da Jornada Global */}
				<LessonProgressBar
					moduleId={moduleId || ""}
					lessonId={lessonId || ""}
					showCompleteButton={false} // Handled individually by components
					className="mb-6"
				/>

				{/* Header Comum */}
				<div className="mb-6">
					<Button
						variant="ghost"
						onClick={() => navigate("/")}
						className="mb-4"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Voltar para o Início
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

				{/* Content Render */}
				{renderContent()}
			</div>
		</PageContainer>
	);
}
