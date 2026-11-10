import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { LearningTimeline } from "@/components/curriculum/LearningTimeline";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { FluencyJourneyCard } from "@/components/dashboard/FluencyJourneyCard";
import { RightColumnWidgets } from "@/components/dashboard/RightColumnWidgets";
import { MascotGreeting } from "@/components/mascot/MascotGreeting";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { useIdleReady } from "@/hooks/useIdleReady";

// Abaixo da dobra: chunk próprio, montado quando o navegador fica ocioso.
const ImmersivePracticeSection = lazy(() =>
	import("@/components/dashboard/ImmersivePracticeSection").then((module) => ({
		default: module.ImmersivePracticeSection,
	})),
);

export default function DashboardPage() {
	const idle = useIdleReady();

	return (
		<PageContainer className="space-y-3 sm:space-y-6 lg:space-y-8 max-w-7xl mx-auto relative">
			<div aria-hidden="true" className="ambient-backdrop hidden md:block" />

			<SEO
				title="Dashboard"
				description="Acompanhe seu progresso e continue sua jornada de aprendizado no PobreLingo."
			/>
			<OnboardingModal />

			<MascotGreeting />
			<DashboardStats />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
				<div className="reveal-stagger min-w-0 lg:col-span-2 space-y-6 lg:space-y-8 flex flex-col">
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
					<div className="defer-render">
						{idle && (
							<Suspense fallback={null}>
								<ImmersivePracticeSection />
							</Suspense>
						)}
					</div>
				</div>
				<RightColumnWidgets />
			</div>
		</PageContainer>
	);
}
