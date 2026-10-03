// @ts-nocheck
import { ArrowLeft, CheckCircle2, Star, Trophy, XCircle } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface QuizQuestion {
	question: string;
	options: string[];
	correctAnswer: number;
	explanation: string;
}

// Banco de questões por quiz
const quizData: Record<string, QuizQuestion[]> = {
	"foundations-quiz": [
		{
			question: 'Qual é a forma correta do Present Simple para "he/she/it"?',
			options: ["Add -s or -es", "Add -ed", "Use base form", "Add -ing"],
			correctAnswer: 0,
			explanation:
				"Na terceira pessoa do singular (he/she/it), adicionamos -s ou -es ao verbo.",
		},
		{
			question: "Como formamos a negativa no Present Simple?",
			options: [
				"subject + not + verb",
				"subject + do/does + not + verb",
				"subject + verb + not",
				"not + subject + verb",
			],
			correctAnswer: 1,
			explanation: "Usamos do/does + not + verbo na forma base para negativas.",
		},
		{
			question: "Qual frase está correta?",
			options: [
				"She go to school",
				"She goes to school",
				"She going to school",
				"She is go to school",
			],
			correctAnswer: 1,
			explanation: 'Para he/she/it, adicionamos -es ao verbo "go" → "goes".',
		},
		{
			question: 'O que significa "Good morning"?',
			options: ["Boa noite", "Boa tarde", "Bom dia", "Olá"],
			correctAnswer: 2,
			explanation: '"Good morning" é usado para cumprimentar alguém de manhã.',
		},
		{
			question: 'Qual é a tradução de "Thank you"?',
			options: ["Por favor", "Desculpe", "Obrigado(a)", "De nada"],
			correctAnswer: 2,
			explanation: '"Thank you" significa "Obrigado(a)" em português.',
		},
	],
	"conversations-quiz": [
		{
			question: "Como você pergunta o nome de alguém em inglês?",
			options: [
				"What your name?",
				"What is your name?",
				"What are your name?",
				"How is your name?",
			],
			correctAnswer: 1,
			explanation:
				'A forma correta é "What is your name?" (pode ser contraído para "What\'s your name?").',
		},
		{
			question: 'Qual é a resposta adequada para "How are you?"?',
			options: [
				"I am John",
				"I have 25 years",
				"I am fine, thank you",
				"Yes, I am",
			],
			correctAnswer: 2,
			explanation: '"I am fine, thank you" é uma resposta comum e educada.',
		},
		{
			question: 'O que significa "Nice to meet you"?',
			options: ["Até logo", "Prazer em conhecê-lo", "Como vai?", "Boa sorte"],
			correctAnswer: 1,
			explanation:
				'"Nice to meet you" é usado quando você conhece alguém pela primeira vez.',
		},
		{
			question: 'Como você diz "De onde você é?" em inglês?',
			options: [
				"Where you from?",
				"Where are you from?",
				"From where you are?",
				"You are from where?",
			],
			correctAnswer: 1,
			explanation: 'A forma correta é "Where are you from?"',
		},
	],
	"tenses-quiz": [
		{
			question: 'Qual é a forma correta do Past Simple de "go"?',
			options: ["goed", "went", "gone", "going"],
			correctAnswer: 1,
			explanation: '"Go" é irregular. O Past Simple é "went".',
		},
		{
			question: "Como formamos o Present Continuous?",
			options: [
				"am/is/are + verb-ing",
				"do/does + verb",
				"verb-ed",
				"will + verb",
			],
			correctAnswer: 0,
			explanation: "Present Continuous usa am/is/are + verbo com -ing.",
		},
		{
			question: "Qual frase está no Past Simple?",
			options: ["I am playing", "I play", "I played", "I will play"],
			correctAnswer: 2,
			explanation: '"I played" está no Past Simple (verbo regular com -ed).',
		},
		{
			question: "Quando usamos Present Continuous?",
			options: [
				"Para hábitos",
				"Para ações acontecendo agora",
				"Para fatos gerais",
				"Para o passado",
			],
			correctAnswer: 1,
			explanation:
				"Present Continuous é usado para ações em andamento no momento.",
		},
		{
			question: 'Qual é o Past Simple de "study"?',
			options: ["studyed", "studied", "studiing", "studies"],
			correctAnswer: 1,
			explanation:
				"Verbos terminados em -y precedido de consoante mudam para -ied.",
		},
	],
	"perfect-reading-quiz": [
		{
			question: "Quando usamos Present Perfect?",
			options: [
				"Para ações no passado distante",
				"Para conectar passado e presente",
				"Apenas para o futuro",
				"Para ações habituais",
			],
			correctAnswer: 1,
			explanation: "Present Perfect conecta ações passadas com o presente.",
		},
		{
			question: "Qual a estrutura do Present Perfect?",
			options: [
				"have/has + past participle",
				"did + verb",
				"am/is/are + verb-ing",
				"will + verb",
			],
			correctAnswer: 0,
			explanation: "Present Perfect usa have/has + particípio passado.",
		},
		{
			question: 'Qual é o particípio de "eat"?',
			options: ["eated", "ate", "eaten", "eating"],
			correctAnswer: 2,
			explanation: '"Eat" é irregular: eat-ate-eaten.',
		},
	],
	"conditionals-practice-quiz": [
		{
			question: "Qual é a estrutura do First Conditional?",
			options: [
				"if + present, will + verb",
				"if + past, would + verb",
				"if + present, present",
				"if + past perfect, would have + verb",
			],
			correctAnswer: 0,
			explanation: "First Conditional: if + present simple, will + verbo.",
		},
		{
			question: "Quando usamos Second Conditional?",
			options: [
				"Situações reais",
				"Situações hipotéticas no presente",
				"Verdades gerais",
				"Passado",
			],
			correctAnswer: 1,
			explanation:
				"Second Conditional expressa situações hipotéticas ou improváveis no presente.",
		},
	],
	"passive-reading-quiz": [
		{
			question: "Qual é a estrutura da voz passiva?",
			options: [
				"subject + verb + object",
				"object + be + past participle",
				"subject + be + verb-ing",
				"subject + have + past participle",
			],
			correctAnswer: 1,
			explanation: "Voz passiva: objeto + verbo to be + particípio passado.",
		},
		{
			question: 'Transforme para passiva: "They built this house"',
			options: [
				"This house built by them",
				"This house was built by them",
				"This house is built by them",
				"This house has built by them",
			],
			correctAnswer: 1,
			explanation: "Passado simples na passiva: was/were + particípio passado.",
		},
	],
	"advanced-grammar-practice-quiz": [
		{
			question: "Como formamos Reported Speech no passado?",
			options: [
				"Mantém o tempo verbal",
				"Volta um tempo verbal",
				"Usa will",
				"Usa presente",
			],
			correctAnswer: 1,
			explanation: "Em Reported Speech, voltamos um tempo verbal (backshift).",
		},
		{
			question: "Qual modal expressa dedução no passado?",
			options: ["can", "must have", "should", "will"],
			correctAnswer: 1,
			explanation:
				'"Must have + past participle" expressa dedução sobre o passado.',
		},
	],
	"idioms-practice-quiz": [
		{
			question: 'O que significa "break a leg"?',
			options: ["Quebrar a perna", "Boa sorte", "Ter azar", "Cair"],
			correctAnswer: 1,
			explanation: '"Break a leg" é uma expressão que significa "boa sorte".',
		},
		{
			question: 'O que significa "piece of cake"?',
			options: [
				"Um pedaço de bolo",
				"Muito difícil",
				"Muito fácil",
				"Delicioso",
			],
			correctAnswer: 2,
			explanation: '"Piece of cake" significa algo muito fácil de fazer.',
		},
	],
	"mastery-quiz": [
		{
			question: "Qual tempo verbal expressa ações antes de outras no passado?",
			options: [
				"Past Simple",
				"Past Perfect",
				"Present Perfect",
				"Past Continuous",
			],
			correctAnswer: 1,
			explanation:
				"Past Perfect expressa ações anteriores a outras no passado.",
		},
		{
			question: 'Qual é o superlativo de "good"?',
			options: ["gooder", "goodest", "better", "best"],
			correctAnswer: 3,
			explanation: '"Good" é irregular: good - better - best.',
		},
		{
			question: 'Complete: "If I ___ rich, I would travel the world"',
			options: ["am", "was", "were", "will be"],
			correctAnswer: 2,
			explanation: 'Second Conditional usa "were" para todas as pessoas.',
		},
		{
			question: "Qual modal expressa obrigação?",
			options: ["can", "may", "must", "would"],
			correctAnswer: 2,
			explanation: '"Must" expressa obrigação ou necessidade.',
		},
		{
			question: 'O que é uma "phrasal verb"?',
			options: [
				"Verbo irregular",
				"Verbo + preposição/advérbio",
				"Verbo no passado",
				"Verbo auxiliar",
			],
			correctAnswer: 1,
			explanation:
				"Phrasal verbs são verbos combinados com preposições ou advérbios.",
		},
		{
			question: 'Qual é a voz passiva de "They are building a house"?',
			options: [
				"A house is built",
				"A house is being built",
				"A house was built",
				"A house has been built",
			],
			correctAnswer: 1,
			explanation:
				"Present Continuous passivo: is/are being + particípio passado.",
		},
		{
			question: 'Complete: "I wish I ___ speak French"',
			options: ["can", "could", "will", "would"],
			correctAnswer: 1,
			explanation:
				'"I wish" + past simple/could para expressar desejos impossíveis no presente.',
		},
		{
			question: 'O que significa "get the hang of it"?',
			options: ["Desistir", "Entender/pegar o jeito", "Pendurar", "Decorar"],
			correctAnswer: 1,
			explanation: '"Get the hang of it" significa entender como fazer algo.',
		},
		{
			question: 'Qual é a diferença entre "used to" e "would"?',
			options: [
				"Não há diferença",
				"Used to é para estados, would para ações",
				"Would é para estados",
				"Ambos são iguais",
			],
			correctAnswer: 1,
			explanation:
				'"Used to" descreve estados e hábitos passados, "would" apenas hábitos.',
		},
		{
			question: 'Complete: "The book ___ by millions"',
			options: ["read", "was read", "is read", "has read"],
			correctAnswer: 1,
			explanation: "Voz passiva no passado: was/were + particípio passado.",
		},
	],
};

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
								{questions.map((q, idx) => {
									const userAnswer = selectedAnswers[idx];
									const isCorrect = userAnswer === q.correctAnswer;

									return (
										<div
											key={idx}
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
												<div className="flex-1">
													<p className="font-medium mb-2">
														{idx + 1}. {q.question}
													</p>
													{!isCorrect && (
														<>
															<p className="text-sm text-red-700 dark:text-red-400 mb-1">
																Sua resposta: {q.options[userAnswer ?? -1]}
															</p>
															<p className="text-sm text-green-700 dark:text-green-400 mb-1">
																Resposta correta: {q.options[q.correctAnswer]}
															</p>
														</>
													)}
													<p className="text-sm text-muted-foreground italic">
														{q.explanation}
													</p>
												</div>
											</div>
										</div>
									);
								})}
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
						<CardTitle>Questão {currentQuestion + 1}</CardTitle>
						<CardDescription className="text-lg pt-2">
							{currentQ.question}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RadioGroup
							value={selectedAnswers[currentQuestion]?.toString()}
							onValueChange={(value) => handleSelectAnswer(parseInt(value, 10))}
						>
							<div className="space-y-3">
								{currentQ.options.map((option, idx) => (
									<div
										key={idx}
										className={cn(
											"flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors",
											selectedAnswers[currentQuestion] === idx
												? "border-primary bg-primary/5"
												: "border-border hover:border-primary/40",
										)}
										onClick={() => handleSelectAnswer(idx)}
									>
										<RadioGroupItem
											value={idx.toString()}
											id={`option-${idx}`}
										/>
										<Label
											htmlFor={`option-${idx}`}
											className="flex-1 cursor-pointer"
										>
											{option}
										</Label>
									</div>
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
