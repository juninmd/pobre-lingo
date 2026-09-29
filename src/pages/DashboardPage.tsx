import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { AILanguagePartnerWidget } from "@/components/dashboard/AILanguagePartnerWidget";
import { CertificationPlanCard } from "@/components/dashboard/CertificationPlanCard";
import { CLILWidget } from "@/components/dashboard/CLILWidget";
import { CommunityChallengeWidget } from "@/components/dashboard/CommunityChallengeWidget";
import { DailyQuestsWidget } from "@/components/dashboard/DailyQuestsWidget";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { FluencyJourneyCard } from "@/components/dashboard/FluencyJourneyCard";
import { ImmersivePracticeSection } from "@/components/dashboard/ImmersivePracticeSection";
import { RightColumnWidgets } from "@/components/dashboard/RightColumnWidgets";
import { ImmersivePracticeSection } from "@/components/dashboard/ImmersivePracticeSection";
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
				<div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/15 blur-[140px] animate-pulse-glow" />
				<div
					className="absolute top-[20%] -left-[15%] w-[40%] h-[40%] rounded-full bg-blue-500/15 blur-[120px] animate-pulse-glow"
					style={{ animationDelay: "1s" }}
				/>
				<div
					className="absolute bottom-[-15%] right-[10%] w-[60%] h-[40%] rounded-full bg-emerald-500/10 blur-[130px] animate-pulse-glow"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			<SEO
				title="Dashboard"
				description="Acompanhe seu progresso e continue sua jornada de aprendizado no PobreLingo."
			/>
			<OnboardingModal />

			{/* Welcome Greeting with Mascot */}
			<MascotGreeting />
			<DashboardStats />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
				<div className="min-w-0 lg:col-span-2 space-y-6 lg:space-y-8 flex flex-col">
					<FluencyJourneyCard />
					<ContinueLearningCard />
					<section>
						<Suspense
							fallback={
								<Loader2 className="w-8 h-8 animate-spin mx-auto my-12 text-primary" />
							}
						>
							<LearningTimeline />
						</Suspense>
					</section>
					<ImmersivePracticeSection />
				</div>
				<RightColumnWidgets />
			</div>
		</PageContainer>
	);
}