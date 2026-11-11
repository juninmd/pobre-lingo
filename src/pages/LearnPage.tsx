import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { LearningTimeline } from "@/components/curriculum/LearningTimeline";
import { FluencyJourneyCard } from "@/components/dashboard/FluencyJourneyCard";
import { HubGrid } from "@/components/shell/HubGrid";
import { LEARN_REFERENCE, LEARN_SKILLS } from "@/components/shell/hubData";
import { useIdleReady } from "@/hooks/useIdleReady";

// O deck de métodos é grande: chunk próprio, montado quando o navegador fica ocioso.
const ImmersivePracticeSection = lazy(() =>
	import("@/components/dashboard/ImmersivePracticeSection").then((m) => ({
		default: m.ImmersivePracticeSection,
	})),
);

/** Aba Aprender: a jornada, as habilidades, a referência e o deck de métodos. */
export default function LearnPage() {
	const idle = useIdleReady();
	return (
		<PageContainer className="space-y-10">
			<SEO
				title="Aprender"
				description="Sua jornada, habilidades, referência e métodos de estudo no PobreLingo."
			/>
			<header className="space-y-1">
				<p className="eyebrow">Aprender</p>
				<h1 className="text-4xl font-extrabold sm:text-5xl">
					Tudo o que dá para estudar
				</h1>
			</header>

			<section>
				<Suspense
					fallback={
						<Loader2 className="mx-auto my-12 h-8 w-8 animate-spin text-primary" />
					}
				>
					<LearningTimeline />
				</Suspense>
			</section>
			<FluencyJourneyCard />
			<HubGrid eyebrow="Pratique" title="Habilidades" links={LEARN_SKILLS} />
			<HubGrid eyebrow="Consulte" title="Referência" links={LEARN_REFERENCE} />

			<div className="defer-render">
				{idle && (
					<Suspense fallback={null}>
						<ImmersivePracticeSection />
					</Suspense>
				)}
			</div>
		</PageContainer>
	);
}
