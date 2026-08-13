import {
	Coins,
	Flame,
	GraduationCap,
	Lightbulb,
	RefreshCw,
	Sparkles,
	Trophy,
} from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { LearningTimeline } from "@/components/curriculum/LearningTimeline";
import { CertificationPlanCard } from "@/components/dashboard/CertificationPlanCard";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { DailyQuestsWidget } from "@/components/dashboard/DailyQuestsWidget";
import { PronunciationWidget } from "@/components/dashboard/PronunciationWidget";
import { MicroLessonWidget } from "@/components/dashboard/MicroLessonWidget";
import { SmartReviewWidget } from "@/components/dashboard/SmartReviewWidget";
import { MindfulWidget } from "@/components/dashboard/MindfulWidget";
import { PopCultureWidget } from "@/components/dashboard/PopCultureWidget";
import { StorytellingWidget } from "@/components/dashboard/StorytellingWidget";
import { TaskMissionWidget } from "@/components/dashboard/TaskMissionWidget";
import { WeeklyGoalWidget } from "@/components/dashboard/WeeklyGoalWidget";
import { WordOfTheDayWidget } from "@/components/dashboard/WordOfTheDayWidget";
import { MascotGreeting } from "@/components/mascot/MascotGreeting";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { TIPS } from "@/lib/tips";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
	const { overallProgress } = useCurriculumProgress();
	const { gems, addGem } = useGamification();

	// Pick a random tip based on the day of the year to be consistent for the day
	const [currentTip, setCurrentTip] = useState(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		return TIPS[dayOfYear % TIPS.length];
	});

	const [claimedTipReward, setClaimedTipReward] = useState(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		return localStorage.getItem("daily_tip_reward_claimed") === todayStr;
	});

	const refreshTip = () => {
		const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
		setCurrentTip(randomTip);
	};

	const claimTipReward = () => {
		if (!claimedTipReward) {
			addGem(5);
			setClaimedTipReward(true);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_tip_reward_claimed", todayStr);
		}
	};

	return (
		<PageContainer className="space-y-3 sm:space-y-6 lg:space-y-8 max-w-7xl mx-auto relative">
			{/* Spatial UI / Glassmorphism Ambient Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
				<div className="absolute top-[30%] -left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[120px]" />
				<div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[30%] rounded-full bg-green-500/5 blur-[120px]" />
			</div>

			<SEO
				title="Dashboard"
				description="Acompanhe seu progresso e continue sua jornada de aprendizado no PobreLingo."
			/>
			<OnboardingModal />

			{/* Welcome Greeting with Mascot */}
			<MascotGreeting />

			{/* 1. Statistics Summary Cards */}
			<section className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 md:grid-cols-4">
				<Card className="glass-card backdrop-blur-xl bg-gradient-to-br from-orange-50/90 to-red-50/50 dark:from-orange-950/40 dark:to-red-950/20 border-orange-200/80 dark:border-orange-800/60 shadow-lg shadow-orange-500/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 active:scale-[0.98] touch-manipulation">
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div className="p-2 sm:p-2.5 bg-gradient-to-br from-orange-100 to-orange-200/80 dark:from-orange-900/60 dark:to-orange-800/50 rounded-xl sm:rounded-2xl shadow-sm border border-orange-200/50 dark:border-orange-800/50">
							<Flame
								className={cn(
									"w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-600 dark:text-orange-400 drop-shadow-sm",
									overallProgress.streak > 0 && "animate-bounce",
								)}
							/>
						</div>
						<div>
							<span className="text-2xl sm:text-3xl md:text-4xl font-extrabold block text-orange-600 dark:text-orange-400 bg-gradient-to-br from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text [.bg-clip-text_&]:text-transparent drop-shadow-sm">
								{overallProgress.streak}
							</span>
							<span className="text-[0.625rem] sm:text-xs text-orange-800/70 dark:text-orange-200/70 uppercase font-black tracking-widest mt-0.5 block">
								Dias Seguidos
							</span>
						</div>
					</CardContent>
				</Card>

				<Card className="glass-card backdrop-blur-xl bg-gradient-to-br from-yellow-50/90 to-amber-50/50 dark:from-yellow-950/40 dark:to-amber-950/20 border-yellow-200/80 dark:border-yellow-800/60 shadow-lg shadow-yellow-500/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20 active:scale-[0.98] touch-manipulation">
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div className="p-2 sm:p-2.5 bg-gradient-to-br from-yellow-100 to-yellow-200/80 dark:from-yellow-900/60 dark:to-yellow-800/50 rounded-xl sm:rounded-2xl shadow-sm border border-yellow-200/50 dark:border-yellow-800/50">
							<Coins className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-600 dark:text-yellow-400 fill-current drop-shadow-sm" />
						</div>
						<div>
							<span className="text-2xl sm:text-3xl md:text-4xl font-extrabold block text-yellow-600 dark:text-yellow-400 bg-gradient-to-br from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums drop-shadow-sm">
								{gems}
							</span>
							<span className="text-[0.625rem] sm:text-xs text-yellow-800/70 dark:text-yellow-200/70 uppercase font-black tracking-widest mt-0.5 block">
								PobreCoins
							</span>
						</div>
					</CardContent>
				</Card>

				<Card className="glass-card backdrop-blur-xl bg-gradient-to-br from-blue-50/90 to-indigo-50/50 dark:from-blue-950/40 dark:to-indigo-950/20 border-blue-200/80 dark:border-blue-800/60 shadow-lg shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 active:scale-[0.98] touch-manipulation">
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div className="p-2 sm:p-2.5 bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/60 dark:to-blue-800/50 rounded-xl sm:rounded-2xl shadow-sm border border-blue-200/50 dark:border-blue-800/50">
							<GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600 dark:text-blue-400 drop-shadow-sm" />
						</div>
						<div>
							<span className="text-2xl sm:text-3xl md:text-4xl font-extrabold block text-blue-600 dark:text-blue-400 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums drop-shadow-sm">
								{overallProgress.userLevel}
							</span>
							<span className="text-[0.625rem] sm:text-xs text-blue-800/70 dark:text-blue-200/70 uppercase font-black tracking-widest mt-0.5 block">
								Nível
							</span>
						</div>
					</CardContent>
				</Card>

				<Card className="glass-card backdrop-blur-xl bg-gradient-to-br from-green-50/90 to-emerald-50/50 dark:from-green-950/40 dark:to-emerald-950/20 border-green-200/80 dark:border-green-800/60 shadow-lg shadow-green-500/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20 active:scale-[0.98] touch-manipulation">
					<CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
						<div className="p-2 sm:p-2.5 bg-gradient-to-br from-green-100 to-green-200/80 dark:from-green-900/60 dark:to-green-800/50 rounded-xl sm:rounded-2xl shadow-sm border border-green-200/50 dark:border-green-800/50">
							<Trophy className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600 dark:text-green-400 drop-shadow-sm" />
						</div>
						<div>
							<span className="text-2xl sm:text-3xl md:text-4xl font-extrabold block text-green-600 dark:text-green-400 bg-gradient-to-br from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums drop-shadow-sm">
								{overallProgress.overallPercentage}%
							</span>
							<span className="text-[0.625rem] sm:text-xs text-green-800/70 dark:text-green-200/70 uppercase font-black tracking-widest mt-0.5 block">
								Completo
							</span>
						</div>
					</CardContent>
				</Card>
			</section>

			<div className="grid lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
				{/* Left Column: Learning Timeline */}
				<div className="lg:col-span-2 space-y-3 sm:space-y-6 lg:space-y-8 flex flex-col">
					{/* 2. Continue Learning CTA - Moved to top of main column */}
					<div className="order-first">
						<ContinueLearningCard />
					</div>

					<section>
						<LearningTimeline />
					</section>

					{/* Prática Imersiva Section */}
					<section className="space-y-3 sm:space-y-4 md:space-y-6 mt-8">
						<div className="flex items-center gap-2 mb-2">
							<div className="p-1.5 bg-primary/10 rounded-lg">
								<Sparkles className="w-5 h-5 text-primary" />
							</div>
							<h3 className="text-xl font-bold text-foreground">Prática Imersiva</h3>
						</div>
						<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
							{/* Microlearning Lesson */}
							<MicroLessonWidget />

							{/* Real-world Task - TBLT */}
							<TaskMissionWidget />

							{/* Interactive Story - TPRS */}
							<StorytellingWidget />

							{/* Pronunciation Practice */}
							<PronunciationWidget />
						</div>

						{/* Pop Culture & Trends - Social Media / Netflix */}
						<PopCultureWidget />
					</section>
				</div>

				{/* Right Column: Quests & Tips */}
				<div className="space-y-3 sm:space-y-4 md:space-y-6">
					{/* Smart Review */}
					<SmartReviewWidget />

					{/* Daily Quests */}
					<DailyQuestsWidget />

					{/* Weekly Goal */}
					<WeeklyGoalWidget />

					{/* Word of the Day - Microlearning */}
					<WordOfTheDayWidget />

					{/* Mindful Learning - Well-being */}
					<MindfulWidget />

					<CertificationPlanCard />

					{/* Tip of the Day */}
					<Card className="glass-card bg-primary/5 border-primary/20 border-l-4 border-l-primary hover:shadow-lg transition-all hover:-translate-y-1 duration-300 sticky top-20 sm:top-24">
						<CardHeader className="pb-2 sm:pb-3 flex flex-row items-center justify-between space-y-0">
							<CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-2 text-primary">
								<Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
								<span>Dica do Dia</span>
							</CardTitle>
							<Button
								variant="ghost"
								size="icon"
								aria-label="Nova dica"
								className="h-8 w-8 sm:h-9 sm:w-9 text-primary/70 hover:text-primary active:scale-95 transition-transform"
								onClick={refreshTip}
							>
								<RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
							</Button>
						</CardHeader>
						<CardContent className="pt-0 space-y-4">
							<p
								className="text-xs sm:text-sm italic text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-500"
								key={currentTip}
							>
								"{currentTip}"
							</p>
							<Button
								variant={claimedTipReward ? "secondary" : "gamified"}
								size="sm"
								className="w-full text-xs font-bold shadow-sm"
								disabled={claimedTipReward}
								onClick={claimTipReward}
							>
								{claimedTipReward ? (
									<>Resgatado!</>
								) : (
									<span className="flex items-center gap-1.5">
										Entendi! (+5 <Coins className="w-3.5 h-3.5" />)
									</span>
								)}
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</PageContainer>
	);
}
