import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RightColumnWidgets } from "@/components/dashboard/RightColumnWidgets";
import { MascotGreeting } from "@/components/mascot/MascotGreeting";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { TodayQueue } from "@/components/today/TodayQueue";

/**
 * Aba Hoje: o mascote narra, o próximo passo vem primeiro e a fila do dia
 * mostra o resto. A trilha e o deck de métodos moraram para Aprender.
 */
export default function DashboardPage() {
	return (
		<PageContainer className="space-y-5 sm:space-y-6 relative">
			<div aria-hidden="true" className="ambient-backdrop hidden md:block" />
			<SEO
				title="Hoje"
				description="Seu próximo passo, a fila do dia e o progresso no PobreLingo."
			/>
			<OnboardingModal />

			<MascotGreeting />
			<ContinueLearningCard />
			<DashboardStats />

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
				<div className="min-w-0 space-y-6 lg:col-span-2">
					<TodayQueue />
				</div>
				<RightColumnWidgets />
			</div>
		</PageContainer>
	);
}
