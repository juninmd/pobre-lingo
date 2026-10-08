import confetti from "canvas-confetti";
import {
	ArrowLeft,
	Bot,
	CheckCircle2,
	Send,
	User,
	Volume2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { type ConversationOption, SCENARIOS } from "@/lib/conversationData";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";

interface Message {
	id: string;
	speaker: "mascot" | "user";
	text_en: string;
	text_pt?: string;
	audio?: boolean;
}

// Map modules/lessons to scenarios
const SCENARIO_MAP: Record<string, string> = {
	// Unit 2
	"daily-conversations": "daily-conversations",
	"conversation-practice": "daily-conversations",
	"ordering-food-sim": "ordering-food",
	"ordering-food-module": "ordering-food",
	"shopping-clothes": "shopping-clothes",
	"shopping-module": "shopping-clothes",

	// Unit 3
	"first-date": "first-date",
	"dating-sim-module": "first-date",

	// Unit 4
	"airport-checkin-sim": "airport-checkin",
	"travel-conversation-module": "airport-checkin",
	"doctor-appointment": "doctor-appointment",
	"doctor-module": "doctor-appointment",
	"asking-directions": "asking-directions",

	// Intermediate / Advanced
	"job-interview-sim": "job-interview",
	"job-interview-sim-mid": "job-interview",
	"business-negotiation": "business-negotiation",
	"business-negotiation-module": "business-negotiation",
	"debate-tech": "debate-tech",
	"debate-tech-module": "debate-tech",
};

export default function ConversationExercise() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const moduleId = searchParams.get("module") || "";
	const lessonId = searchParams.get("lesson") || "";
	const { completeLesson } = useCurriculumProgress();

	const [history, setHistory] = useState<Message[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const [typing, setTyping] = useState(false);

	// Determine scenario
	const scenarioKey = useMemo(() => {
		return SCENARIO_MAP[lessonId] || SCENARIO_MAP[moduleId] || "default";
	}, [lessonId, moduleId]);

	const steps = useMemo(() => {
		return SCENARIOS[scenarioKey] || SCENARIOS.default;
	}, [scenarioKey]);

	const currentStep = steps[currentStepIndex];
	const chatEndRef = useRef<HTMLDivElement>(null);

	// Handle mascot messages for current step
	useEffect(() => {
		if (currentStep) {
			// Small delay to make it feel natural
			setTyping(true);
			const timer = setTimeout(() => {
				setHistory((prev) => {
					// Check if this step's mascot message is already present as the last message
					const last = prev[prev.length - 1];
					if (last && last.id === `mascot-${currentStep.id}`) return prev;

					return [
						...prev,
						{
							id: `mascot-${currentStep.id}`,
							speaker: "mascot",
							text_en: currentStep.mascotMessage,
							audio: true,
						},
					];
				});
				setTyping(false);
				tts.speak(currentStep.mascotMessage);
			}, 800);
			return () => clearTimeout(timer);
		}
		// Só depende do passo atual. Havia um `speak` aqui, recriado a cada
		// render: o efeito reexecutava sempre, o cleanup matava o timer de 800ms
		// e `typing` nunca voltava a false — as opções ficavam desabilitadas
		// para sempre e a conversa era impossível de responder.
	}, [currentStep]);

	// Auto-scroll
	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleOptionSelect = (option: ConversationOption) => {
		if (typing) return; // Prevent clicking while mascot is "typing"

		// 1. Add user message
		const userMsg: Message = {
			id: `user-${Date.now()}`,
			speaker: "user",
			text_en: option.text_en,
			text_pt: option.text_pt,
		};
		setHistory((prev) => [...prev, userMsg]);

		if (option.isCorrect) {
			// 2. Correct! Move to next step or finish
			if (currentStepIndex < steps.length - 1) {
				// Wait a bit before showing mascot typing
				setTimeout(() => {
					setCurrentStepIndex((prev) => prev + 1);
				}, 600);
			} else {
				// Finished
				setTimeout(() => {
					setHistory((prev) => [
						...prev,
						{
							id: "mascot-finish",
							speaker: "mascot",
							text_en: "Excellent! You have mastered this conversation.",
							text_pt: "Excelente! Você dominou esta conversa.",
						},
					]);
					setIsCompleted(true);
					confetti({
						particleCount: 150,
						spread: 80,
						origin: { y: 0.6 },
					});
					if (moduleId && lessonId) {
						completeLesson(moduleId, lessonId, 150);
					}
				}, 1000);
			}
		} else {
			// 3. Incorrect.
			setTyping(true);
			setTimeout(() => {
				setHistory((prev) => [
					...prev,
					{
						id: `mascot-feedback-${Date.now()}`,
						speaker: "mascot",
						text_en:
							option.feedback || "That doesn't sound right. Let's try again.",
						text_pt: "Isso não soa certo. Vamos tentar novamente.",
					},
				]);
				setTyping(false);
				tts.speak(option.feedback || "Try again.");
			}, 1000);
		}
	};

	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			{/* Header */}
			<header className="sticky top-0 z-30 glass border-b border-primary/10 p-4">
				<div className="max-w-5xl mx-auto flex items-center justify-between">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate(-1)}
						className="hover:bg-primary/10 hover:text-primary transition-colors"
					>
						<ArrowLeft className="w-6 h-6" />
					</Button>
					<div className="flex flex-col items-center">
						<h1 className="text-xl font-bold tracking-tight text-gold">
							Prática de Conversa
						</h1>
						<p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
							Simulação Realista
						</p>
					</div>
					<div className="w-10 flex justify-end">
						<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
					</div>
				</div>
			</header>

			{/* Chat Area */}
			<div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-48 max-w-5xl mx-auto w-full">
				{history.map((msg) => (
					<div
						key={msg.id}
						className={cn(
							"flex w-full animate-in fade-in slide-in-from-bottom-3 duration-500",
							msg.speaker === "user" ? "justify-end" : "justify-start",
						)}
					>
						<div
							className={cn(
								"flex gap-4 max-w-[90%] md:max-w-[80%]",
								msg.speaker === "user"
									? "flex-row-reverse text-right"
									: "flex-row",
							)}
						>
							{/* Avatar */}
							<div
								className={cn(
									"shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border transition-transform duration-500",
									msg.speaker === "mascot"
										? "bg-slate-900 border-primary/20 text-primary"
										: "bg-primary border-primary shadow-primary/20 text-primary-foreground",
								)}
							>
								{msg.speaker === "mascot" ? (
									<Bot className="w-6 h-6 animate-pulse" />
								) : (
									<User className="w-6 h-6" />
								)}
							</div>

							{/* Bubble */}
							<div
								className={cn(
									"p-5 rounded-2xl shadow-xl relative group transition-all duration-300",
									msg.speaker === "user"
										? "bg-primary text-primary-foreground rounded-tr-none hover:shadow-primary/30"
										: "glass-card rounded-tl-none hover:shadow-gold/10",
								)}
							>
								<div
									className={cn(
										"flex items-start gap-3",
										msg.speaker === "user" ? "flex-row-reverse" : "flex-row",
									)}
								>
									<p className="text-lg font-medium leading-relaxed">
										{msg.text_en}
									</p>
									{msg.speaker === "mascot" && (
										<button
											type="button"
											onClick={() => tts.speak(msg.text_en)}
											className="mt-1 p-1 rounded-full hover:bg-primary/20 text-primary transition-colors"
										>
											<Volume2 className="w-5 h-5" />
										</button>
									)}
								</div>
								{msg.text_pt && (
									<div
										className={cn(
											"text-sm mt-3 border-t pt-2 opacity-80 italic font-light",
											msg.speaker === "user"
												? "border-white/20"
												: "border-primary/10",
										)}
									>
										{msg.text_pt}
									</div>
								)}
							</div>
						</div>
					</div>
				))}

				{typing && (
					<div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
						<div className="flex gap-4 flex-row items-center">
							<div className="shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-primary/20 flex items-center justify-center text-primary shadow-lg">
								<Bot className="w-6 h-6 animate-bounce" />
							</div>
							<div className="glass-card px-6 py-4 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xl">
								<div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.32s]"></div>
								<div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.16s]"></div>
								<div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
							</div>
						</div>
					</div>
				)}
				<div ref={chatEndRef} />
			</div>

			{/* Options Area */}
			<div className="fixed bottom-0 left-0 right-0 z-40 pb-8 pt-4 px-4 sm:px-6">
				<div className="max-w-3xl mx-auto glass rounded-2xl border border-primary/10 shadow-2xl p-4 md:p-6 overflow-hidden relative">
					{!isCompleted ? (
						<div className="space-y-4">
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-sm font-bold uppercase tracking-wider text-primary/70">
									Escolha sua resposta
								</h3>
								<div className="flex gap-1">
									{steps.map((_, i) => (
										<div
											key={i}
											className={cn(
												"w-1.5 h-1.5 rounded-full transition-all duration-300",
												i === currentStepIndex
													? "w-4 bg-primary"
													: i < currentStepIndex
														? "bg-primary/50"
														: "bg-muted",
											)}
										/>
									))}
								</div>
							</div>
							<div className="grid gap-3">
								{currentStep?.options.map((option) => (
									<button
										type="button"
										key={option.id}
										disabled={typing}
										onClick={() => handleOptionSelect(option)}
										className={cn(
											"w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group h-20 active:scale-[0.98]",
											"bg-background/40 hover:bg-primary/5 hover:border-primary/40 glass-button-surface",
											typing
												? "opacity-50 cursor-not-allowed"
												: "cursor-pointer",
										)}
									>
										<div className="flex-1">
											<span className="block text-lg font-bold text-foreground group-hover:text-primary transition-colors">
												{option.text_en}
											</span>
											<span className="block text-sm text-muted-foreground font-medium">
												{option.text_pt}
											</span>
										</div>
										<div className="ml-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-3 group-hover:translate-x-0">
											<Send className="w-5 h-5 ml-1" />
										</div>
									</button>
								))}
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center py-4 space-y-6">
							<div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(251,191,36,0.2)]">
								<CheckCircle2 className="w-10 h-10" />
							</div>
							<div className="text-center">
								<h2 className="text-2xl font-bold text-gold">
									Conversa Concluída!
								</h2>
								<p className="text-muted-foreground">
									Você praticou com sucesso esta situação.
								</p>
							</div>
							<Button
								className="w-full text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20"
								size="lg"
								onClick={() => navigate(-1)}
							>
								Continuar Jornada
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
