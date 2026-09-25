import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeHub } from "@/components/dashboard/PracticeHub";
import { AIPromptCraftingWidget } from "./AIPromptCraftingWidget";
import { HyFlexLearningWidget } from "./HyFlexLearningWidget";
import { AILanguagePartnerWidget } from "./AILanguagePartnerWidget";
import { SocialMediaReelsWidget } from "./SocialMediaReelsWidget";
import { GreenELTWidget } from "./GreenELTWidget";
import { DEIBWidget } from "./DEIBWidget";
import { CriticalPedagogyWidget } from "./CriticalPedagogyWidget";
import { ExperientialLearningWidget } from "./ExperientialLearningWidget";
import { InquiryBasedLearningWidget } from "./InquiryBasedLearningWidget";
import { GlobalEnglishesWidget } from "./GlobalEnglishesWidget";
import { LexicalApproachWidget } from "./LexicalApproachWidget";
import { DogmeELTWidget } from "./DogmeELTWidget";
import { AuthenticMaterialsWidget } from "./AuthenticMaterialsWidget";
import { TranslanguagingWidget } from "./TranslanguagingWidget";
import { SpacedRepetitionWidget } from "./SpacedRepetitionWidget";
import { MindfulWidget } from "./MindfulWidget";

const LearningTimeline = lazy(() =>
	import("@/components/curriculum/LearningTimeline").then((m) => ({
		default: m.LearningTimeline,
	})),
);

export function ImmersivePracticeSection() {
	return (
		<section className="space-y-6 mt-8">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold tracking-tight text-foreground">
					Tendências 2025 & Prática Imersiva
				</h2>
				<p className="text-muted-foreground">
					Explore as metodologias de ensino de inglês mais recentes e eficientes.
				</p>
			</div>

			<Tabs defaultValue="digital" className="w-full">
				<TabsList className="w-full flex flex-wrap h-auto gap-2 p-1 bg-muted/50 rounded-xl mb-6">
					<TabsTrigger value="digital" className="flex-1 min-w-[120px] rounded-lg">
						Digital & IA
					</TabsTrigger>
					<TabsTrigger value="social" className="flex-1 min-w-[120px] rounded-lg">
						Social & Conexão
					</TabsTrigger>
					<TabsTrigger value="cultura" className="flex-1 min-w-[120px] rounded-lg">
						Cultura & Global
					</TabsTrigger>
					<TabsTrigger value="metodologias" className="flex-1 min-w-[120px] rounded-lg">
						Metodologias
					</TabsTrigger>
					<TabsTrigger value="essenciais" className="flex-1 min-w-[120px] rounded-lg">
						Prática Essencial
					</TabsTrigger>
				</TabsList>

				<TabsContent value="digital" className="mt-0 focus-visible:outline-none">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<AIPromptCraftingWidget />
						<HyFlexLearningWidget />
						<AILanguagePartnerWidget />
						<SpacedRepetitionWidget />
					</div>
				</TabsContent>

				<TabsContent value="social" className="mt-0 focus-visible:outline-none">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<SocialMediaReelsWidget />
						<GreenELTWidget />
						<DEIBWidget />
						<CriticalPedagogyWidget />
					</div>
				</TabsContent>

				<TabsContent value="cultura" className="mt-0 focus-visible:outline-none">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<GlobalEnglishesWidget />
						<TranslanguagingWidget />
						<AuthenticMaterialsWidget />
						<MindfulWidget />
					</div>
				</TabsContent>

				<TabsContent value="metodologias" className="mt-0 focus-visible:outline-none">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<ExperientialLearningWidget />
						<InquiryBasedLearningWidget />
						<LexicalApproachWidget />
						<DogmeELTWidget />
					</div>
				</TabsContent>

				<TabsContent value="essenciais" className="mt-0 focus-visible:outline-none">
					<div className="bg-card/30 rounded-xl p-4 border border-border/50">
						<PracticeHub />
					</div>
				</TabsContent>
			</Tabs>

			<div className="pt-8">
				<Suspense
					fallback={
						<Loader2 className="w-8 h-8 animate-spin mx-auto my-12 text-primary" />
					}
				>
					<LearningTimeline />
				</Suspense>
			</div>
		</section>
	);
}
