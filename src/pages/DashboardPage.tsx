import {
	Coins,
	Flame,
	GraduationCap,
	Lightbulb,
	Loader2,
	RefreshCw,
	Sparkles,
	Trophy,
} from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { AILanguagePartnerWidget } from "@/components/dashboard/AILanguagePartnerWidget";
import { CertificationPlanCard } from "@/components/dashboard/CertificationPlanCard";
import { CLILWidget } from "@/components/dashboard/CLILWidget";
import { CommunityChallengeWidget } from "@/components/dashboard/CommunityChallengeWidget";
import { DailyQuestsWidget } from "@/components/dashboard/DailyQuestsWidget";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DataDrivenLearningWidget } from "@/components/dashboard/DataDrivenLearningWidget";
import { ImmersivePracticeSection } from "@/components/dashboard/ImmersivePracticeSection";
import { InteractiveAudioWidget } from "@/components/dashboard/InteractiveAudioWidget";
import { LiveTutorWidget } from "@/components/dashboard/LiveTutorWidget";
import { MicroLessonWidget } from "@/components/dashboard/MicroLessonWidget";
import { MindfulWidget } from "@/components/dashboard/MindfulWidget";
import { PeerReviewWidget } from "@/components/dashboard/PeerReviewWidget";
import { PopCultureWidget } from "@/components/dashboard/PopCultureWidget";
import { ProjectBasedLearningWidget } from "@/components/dashboard/ProjectBasedLearningWidget";
import { PronunciationWidget } from "@/components/dashboard/PronunciationWidget";
import { RealWorldARWidget } from "@/components/dashboard/RealWorldARWidget";
import { RightColumnWidgets } from "@/components/dashboard/RightColumnWidgets";
import { SmartReviewWidget } from "@/components/dashboard/SmartReviewWidget";
import { SocialMediaReelsWidget } from "@/components/dashboard/SocialMediaReelsWidget";
import { StorytellingWidget } from "@/components/dashboard/StorytellingWidget";
import { TaskMissionWidget } from "@/components/dashboard/TaskMissionWidget";
import { TranslanguagingWidget } from "@/components/dashboard/TranslanguagingWidget";
import { VirtualImmersionWidget } from "@/components/dashboard/VirtualImmersionWidget";
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

const LearningTimeline = lazy(() =>
	import("@/components/curriculum/LearningTimeline").then((m) => ({
		default: m.LearningTimeline,
	})),
);

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

			<div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
				{/* Left Column: Learning Timeline */}
				<div className="lg:col-span-2 space-y-6 lg:space-y-8 flex flex-col">
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