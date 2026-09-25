import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { FluencyJourneyCard } from "@/components/dashboard/FluencyJourneyCard";
import { ImmersivePracticeSection } from "@/components/dashboard/ImmersivePracticeSection";
import { RightColumnWidgets } from "@/components/dashboard/RightColumnWidgets";
import { MascotGreeting } from "@/components/mascot/MascotGreeting";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";



export default function DashboardPage() {
	return (
		<PageContainer className="space-y-3 sm:space-y-6 lg:space-y-8 max-w-7xl mx-auto relative">
			{/* Spatial UI / Aurora ambient background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[140px] animate-pulse-glow" />
				<div
					className="absolute top-[20%] -left-[15%] w-[40%] h-[40%] rounded-full bg-brand-aqua/15 blur-[120px] animate-pulse-glow"
					style={{ animationDelay: "1s" }}
				/>
				<div
					className="absolute bottom-[-15%] right-[10%] w-[60%] h-[40%] rounded-full bg-brand-gold/10 blur-[130px] animate-pulse-glow"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			<SEO
				title="Dashboard"
				description="Acompanhe seu progresso e continue sua jornada de aprendizado no PobreLingo."
			/>
			<OnboardingModal />

			<MascotGreeting />
			<DashboardStats />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
				<div className="min-w-0 lg:col-span-2 space-y-6 lg:space-y-8 flex flex-col">
					<FluencyJourneyCard />
					<ContinueLearningCard />
					<ImmersivePracticeSection />
				</div>
				<RightColumnWidgets />
			</div>
		</PageContainer>
	);
}
