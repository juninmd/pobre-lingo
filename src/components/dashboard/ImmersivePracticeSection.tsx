import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeHub } from "./PracticeHub";
import { AIPromptCraftingWidget } from "./trends/AIPromptCraftingWidget";
import { AuthenticMaterialsWidget } from "./trends/AuthenticMaterialsWidget";
import { CriticalPedagogyWidget } from "./trends/CriticalPedagogyWidget";
import { DEIBWidget } from "./trends/DEIBWidget";
import { DogmeELTWidget } from "./trends/DogmeELTWidget";
import { ExperientialLearningWidget } from "./trends/ExperientialLearningWidget";
import { GlobalEnglishesWidget } from "./trends/GlobalEnglishesWidget";
import { GreenELTWidget } from "./trends/GreenELTWidget";
import { HyFlexLearningWidget } from "./trends/HyFlexLearningWidget";
import { InquiryBasedLearningWidget } from "./trends/InquiryBasedLearningWidget";
import { LexicalApproachWidget } from "./trends/LexicalApproachWidget";
import { MindfulWidget } from "./trends/MindfulWidget";
import { TranslanguagingWidget } from "./trends/TranslanguagingWidget";

export function ImmersivePracticeSection() {
	return (
		<section className="space-y-6 mt-12">
			<div className="flex flex-col gap-2">
				<h3 className="text-2xl font-bold text-foreground tracking-tight">
					Tendências 2025 & Prática Imersiva
				</h3>
				<p className="text-muted-foreground text-sm">
					Explore métodos modernos para acelerar sua fluência, combinando IA, flexibilidade e metodologias ativas de ensino.
				</p>
			</div>

			<Tabs defaultValue="digital" className="w-full">
				<TabsList className="w-full flex flex-wrap h-auto p-1 bg-muted/50 border border-border/50 gap-1 sm:gap-0 justify-start sm:justify-between mb-6">
					<TabsTrigger value="digital" className="flex-1 min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
						Digital & IA
					</TabsTrigger>
					<TabsTrigger value="social" className="flex-1 min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
						Conexão Humana & Social
					</TabsTrigger>
					<TabsTrigger value="cultura" className="flex-1 min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
						Cultura & Mundo
					</TabsTrigger>
					<TabsTrigger value="methods" className="flex-1 min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
						Metodologias
					</TabsTrigger>
					<TabsTrigger value="essentials" className="flex-1 min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
						Essenciais
					</TabsTrigger>
				</TabsList>

				<TabsContent value="digital" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<AIPromptCraftingWidget />
						<HyFlexLearningWidget />
					</div>
				</TabsContent>

				<TabsContent value="social" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<GreenELTWidget />
						<DEIBWidget />
						<CriticalPedagogyWidget />
						<MindfulWidget />
					</div>
				</TabsContent>

				<TabsContent value="cultura" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<AuthenticMaterialsWidget />
						<GlobalEnglishesWidget />
					</div>
				</TabsContent>

				<TabsContent value="methods" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<DogmeELTWidget />
						<LexicalApproachWidget />
						<TranslanguagingWidget />
						<ExperientialLearningWidget />
						<InquiryBasedLearningWidget />
					</div>
				</TabsContent>

				<TabsContent value="essentials" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
					<div className="border border-border/50 rounded-xl bg-card/30 p-4 sm:p-6">
						<PracticeHub />
					</div>
				</TabsContent>
			</Tabs>
		</section>
	);
}
