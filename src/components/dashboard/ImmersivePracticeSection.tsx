import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeHub } from "@/components/dashboard/PracticeHub";
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

/**
 * ImmersivePracticeSection organizes ELT trends and practice tools into tabs.
 */
export function ImmersivePracticeSection() {
	return (
		<section
			aria-labelledby="immersive-practice-title"
			className="space-y-6 mt-8"
		>
			<h3
				id="immersive-practice-title"
				className="text-2xl font-bold text-foreground tracking-tight"
			>
				Tendências 2025 & Prática Imersiva
			</h3>

			<Tabs defaultValue="digital-ia" className="w-full">
				<TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2 p-1 bg-muted/50 rounded-xl">
					<TabsTrigger value="digital-ia" className="rounded-lg py-2">
						Digital & IA
					</TabsTrigger>
					<TabsTrigger value="social" className="rounded-lg py-2">
						Conexão Social
					</TabsTrigger>
					<TabsTrigger value="cultura" className="rounded-lg py-2">
						Cultura & Mundo
					</TabsTrigger>
					<TabsTrigger value="metodologias" className="rounded-lg py-2">
						Metodologias
					</TabsTrigger>
					<TabsTrigger value="essenciais" className="rounded-lg py-2">
						Essenciais
					</TabsTrigger>
				</TabsList>

				<div className="mt-6">
					<TabsContent
						value="digital-ia"
						className="grid grid-cols-1 sm:grid-cols-2 gap-4 outline-none"
					>
						<AIPromptCraftingWidget />
						<HyFlexLearningWidget />
					</TabsContent>

					<TabsContent
						value="social"
						className="grid grid-cols-1 sm:grid-cols-2 gap-4 outline-none"
					>
						<GreenELTWidget />
						<DEIBWidget />
						<MindfulWidget />
						<CriticalPedagogyWidget />
					</TabsContent>

					<TabsContent
						value="cultura"
						className="grid grid-cols-1 sm:grid-cols-2 gap-4 outline-none"
					>
						<AuthenticMaterialsWidget />
						<GlobalEnglishesWidget />
					</TabsContent>

					<TabsContent
						value="metodologias"
						className="grid grid-cols-1 sm:grid-cols-2 gap-4 outline-none"
					>
						<LexicalApproachWidget />
						<TranslanguagingWidget />
						<DogmeELTWidget />
						<ExperientialLearningWidget />
						<InquiryBasedLearningWidget />
					</TabsContent>

					<TabsContent value="essenciais" className="outline-none">
						<PracticeHub />
					</TabsContent>
				</div>
			</Tabs>
		</section>
	);
}
