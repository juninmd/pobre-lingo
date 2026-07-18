import {
	BookOpen,
	ChevronLeft,
	ChevronRight,
	Gamepad2,
	GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useOnboarding } from "@/hooks/useOnboarding";
import { cn } from "@/lib/utils";

const STEPS = [
	{
		icon: GraduationCap,
		iconColor: "text-blue-500",
		iconBg: "bg-blue-50 dark:bg-blue-950/40",
		title: "Descubra seu nível",
		description:
			"Faça um teste rápido de 10 minutos para sabermos qual é o seu nível atual de inglês e personalizar sua jornada.",
		cta: "Fazer o teste",
		href: "/proficiency",
	},
	{
		icon: BookOpen,
		iconColor: "text-green-500",
		iconBg: "bg-green-50 dark:bg-green-950/40",
		title: "Comece a primeira lição",
		description:
			"Explore o currículo estruturado do básico ao avançado. Sua primeira lição cobre o Alfabeto e Pronúncia.",
		cta: "Ir para a jornada",
		href: "/vocabulary/foundations/alphabet-pronunciation",
	},
	{
		icon: Gamepad2,
		iconColor: "text-purple-500",
		iconBg: "bg-purple-50 dark:bg-purple-950/40",
		title: "Explore os jogos",
		description:
			"Aprenda se divertindo! Temos 8 jogos diferentes: Hangman, Memory Match, Word Search, Flashcards e muito mais.",
		cta: "Ver os jogos",
		href: "/arcade",
	},
];

export function OnboardingModal() {
	const { isOnboarded, completeOnboarding } = useOnboarding();
	const [step, setStep] = useState(0);

	if (isOnboarded) return null;

	const current = STEPS[step];
	const Icon = current.icon;
	const isLast = step === STEPS.length - 1;

	return (
		<Dialog open={true} onOpenChange={() => {}}>
			<DialogContent
				className="max-w-sm sm:max-w-md"
				onPointerDownOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<div className="flex flex-col items-center text-center gap-4 pt-2">
						{/* Step dots */}
						<div className="flex items-center gap-1.5">
							{STEPS.map((_, i) => (
								<div
									key={i}
									className={cn(
										"rounded-full transition-all duration-300",
										i === step
											? "w-6 h-2 bg-primary"
											: "w-2 h-2 bg-muted-foreground/30",
									)}
								/>
							))}
						</div>

						{/* Icon */}
						<div
							className={cn(
								"w-16 h-16 rounded-2xl flex items-center justify-center",
								current.iconBg,
							)}
						>
							<Icon className={cn("w-8 h-8", current.iconColor)} />
						</div>

						<div>
							<DialogTitle className="text-xl font-bold">
								{current.title}
							</DialogTitle>
							<DialogDescription className="mt-2 text-sm leading-relaxed">
								{current.description}
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="flex flex-col gap-3 mt-4">
					<Button asChild onClick={completeOnboarding} className="w-full gap-2">
						<Link to={current.href}>
							{current.cta}
							<ChevronRight className="w-4 h-4" />
						</Link>
					</Button>

					<div className="flex items-center justify-between">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setStep((s) => s - 1)}
							disabled={step === 0}
							className="gap-1"
						>
							<ChevronLeft className="w-4 h-4" />
							Anterior
						</Button>

						{isLast ? (
							<Button variant="ghost" size="sm" onClick={completeOnboarding}>
								Pular
							</Button>
						) : (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setStep((s) => s + 1)}
								className="gap-1"
							>
								Próximo
								<ChevronRight className="w-4 h-4" />
							</Button>
						)}
					</div>

					<button
						onClick={completeOnboarding}
						className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors text-center mt-1"
					>
						Pular introdução
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
