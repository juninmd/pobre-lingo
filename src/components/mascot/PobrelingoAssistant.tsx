import { ArrowRight, Sparkles, Volume2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { curriculumData } from "@/lib/curriculumData";
import { getLessonLink } from "@/lib/lessonLink";
import { TIPS } from "@/lib/tips";
import { tts } from "@/lib/tts";
import { cn } from "@/lib/utils";
import { Pobrelingo } from "./Pobrelingo";

export function PobrelingoAssistant() {
	const [isOpen, setIsOpen] = useState(false);
	const { pathname } = useLocation();
	const { streak } = useGamification();
	const { isLessonCompleted } = useCurriculumProgress();
	const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

	const nextLesson = useMemo(() => {
		for (const module of [...curriculumData.modules].sort(
			(a, b) => a.order - b.order,
		)) {
			for (const lesson of [...module.lessons].sort(
				(a, b) => a.order - b.order,
			)) {
				if (!isLessonCompleted(module.id, lesson.id)) {
					return { module, lesson, link: getLessonLink(module, lesson) };
				}
			}
		}
		return null;
	}, [isLessonCompleted]);

	const speechText = useMemo(() => {
		if (streak > 0) {
			return `Sensacional! Ofensiva de ${streak} dias! 🔥 Minha dica de hoje: "${tip}"`;
		}
		return `Olá! Vamos treinar hoje para atingir sua meta? 🚀 Dica rápida: "${tip}"`;
	}, [streak, tip]);

	const handleSpeak = () => {
		tts.speak(speechText, "pt-BR");
	};

	// Em telas densas (jogos/exercícios), o botão flutuante cobriria células e
	// alternativas — escondemos para não bloquear interação no mobile.
	const denseRoutes = [
		"/games",
		"/exercises",
		"/reading/",
		"/writing",
		"/fluency",
	];
	if (denseRoutes.some((route) => pathname.startsWith(route))) {
		return null;
	}

	return (
		<div className="fixed bottom-mobile-nav right-4 z-40 sm:bottom-6 sm:right-6 flex flex-col items-end gap-3 pointer-events-none">
			{isOpen && (
				<Card className="w-80 glass-card border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-5 duration-300">
					<CardContent className="p-4 relative">
						<Button
							variant="ghost"
							size="icon"
							aria-label="Fechar assistente"
							className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-foreground"
							onClick={() => setIsOpen(false)}
						>
							<X className="h-4 w-4" />
						</Button>
						<div className="flex gap-3 items-start mt-2">
							<Pobrelingo
								width={64}
								height={64}
								emotion="winking"
								className="shrink-0"
							/>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-1.5 mb-1">
									<span className="font-bold text-xs uppercase text-primary tracking-wider flex items-center gap-1">
										<Sparkles className="w-3.5 h-3.5" /> Pobrelingo
									</span>
									<Button
										variant="ghost"
										size="icon"
										className="h-5 w-5 text-muted-foreground hover:text-primary"
										onClick={handleSpeak}
									>
										<Volume2 className="h-3.5 w-3.5" />
									</Button>
								</div>
								<div className="relative bg-muted/50 dark:bg-zinc-800/80 p-3 rounded-2xl rounded-tl-none border border-border/40 text-xs sm:text-sm leading-relaxed text-foreground">
									{speechText}
								</div>
							</div>
						</div>
						{nextLesson && (
							<Button
								asChild
								size="sm"
								className="w-full mt-4 font-bold text-xs gap-1.5 shadow-md shadow-primary/25"
								onClick={() => setIsOpen(false)}
							>
								<Link to={nextLesson.link}>
									Continuar: {nextLesson.lesson.title_pt}
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</Button>
						)}
					</CardContent>
				</Card>
			)}
			<Button
				onClick={() => setIsOpen(!isOpen)}
				aria-label={
					isOpen ? "Fechar assistente Pobrelingo" : "Abrir assistente Pobrelingo"
				}
				aria-expanded={isOpen}
				className={cn(
					"h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-2xl pointer-events-auto flex items-center justify-center transition-all duration-300 scale-100 hover:scale-105 active:scale-95 border border-primary/20 bg-primary text-primary-foreground",
					isOpen ? "bg-secondary border-border text-foreground" : "",
				)}
			>
				{isOpen ? (
					<X className="h-6 w-6" />
				) : (
					<div className="relative flex items-center justify-center">
						<Pobrelingo width={44} height={44} emotion="excited" />
						<div className="absolute -top-1 -right-1 flex h-3 w-3">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
							<span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
						</div>
					</div>
				)}
			</Button>
		</div>
	);
}
