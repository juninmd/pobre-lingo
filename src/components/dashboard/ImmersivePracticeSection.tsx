import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIPromptCraftingWidget } from "./trends/AIPromptCraftingWidget";
import { AuthenticMaterialsWidget } from "./trends/AuthenticMaterialsWidget";
import { CLILWidget } from "./trends/CLILWidget";
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
import { PracticeHub } from "./PracticeHub";

export function ImmersivePracticeSection() {
	return (
		<section className="mt-8 space-y-6">
			<div>
				<h3 className="text-2xl font-bold text-foreground tracking-tight mb-2">
					Tendências 2025 & Prática Imersiva
				</h3>
				<p className="text-muted-foreground">
					Explore novas metodologias e expanda seus horizontes além da gramática.
				</p>
			</div>

			<Tabs defaultValue="practice" className="w-full">
				<TabsList className="w-full flex flex-wrap justify-start h-auto p-1 bg-muted/50 rounded-xl mb-4 gap-1">
					<TabsTrigger value="practice" className="flex-1 rounded-lg">Essencial</TabsTrigger>
					<TabsTrigger value="digital" className="flex-1 rounded-lg">Digital & IA</TabsTrigger>
					<TabsTrigger value="social" className="flex-1 rounded-lg">Social</TabsTrigger>
					<TabsTrigger value="cultura" className="flex-1 rounded-lg">Cultura</TabsTrigger>
					<TabsTrigger value="metodologias" className="flex-1 rounded-lg">Metodologias</TabsTrigger>
				</TabsList>

				<TabsContent value="practice" className="mt-0 outline-none animate-in fade-in-50 duration-500">
					<PracticeHub />
				</TabsContent>

				<TabsContent value="digital" className="mt-0 outline-none animate-in fade-in-50 duration-500 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<AIPromptCraftingWidget />
						<HyFlexLearningWidget />
					</div>
				</TabsContent>

				<TabsContent value="social" className="mt-0 outline-none animate-in fade-in-50 duration-500 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<GreenELTWidget />
						<DEIBWidget />
						<MindfulWidget />
						<CriticalPedagogyWidget />
					</div>
				</TabsContent>

				<TabsContent value="cultura" className="mt-0 outline-none animate-in fade-in-50 duration-500 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<AuthenticMaterialsWidget />
						<TranslanguagingWidget />
						<GlobalEnglishesWidget />
					</div>
				</TabsContent>

				<TabsContent value="metodologias" className="mt-0 outline-none animate-in fade-in-50 duration-500 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<DogmeELTWidget />
						<LexicalApproachWidget />
						<ExperientialLearningWidget />
						<InquiryBasedLearningWidget />
						<CLILWidget />
					</div>
				</TabsContent>
			</Tabs>
		</section>
	);
}
