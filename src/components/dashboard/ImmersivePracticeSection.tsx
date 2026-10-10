import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeHub } from "./PracticeHub";
import { AILanguagePartnerWidget } from "./trends/AILanguagePartnerWidget";
import { AIPromptCraftingWidget } from "./trends/AIPromptCraftingWidget";
import { AIStudyCoachWidget } from "./trends/AIStudyCoachWidget";
import { AuthenticMaterialsWidget } from "./trends/AuthenticMaterialsWidget";
import { CLILWidget } from "./trends/CLILWidget";
import { CommunicativeRoleplayWidget } from "./trends/CommunicativeRoleplayWidget";
import { CriticalPedagogyWidget } from "./trends/CriticalPedagogyWidget";
import { DDLWidget } from "./trends/DDLWidget";
import { DEIBWidget } from "./trends/DEIBWidget";
import { DogmeELTWidget } from "./trends/DogmeELTWidget";
import { ExperientialLearningWidget } from "./trends/ExperientialLearningWidget";
import { FlippedClassroomWidget } from "./trends/FlippedClassroomWidget";
import { GamificationWidget } from "./trends/GamificationWidget";
import { GlobalEnglishesWidget } from "./trends/GlobalEnglishesWidget";
import { GreenELTWidget } from "./trends/GreenELTWidget";
import { HyFlexLearningWidget } from "./trends/HyFlexLearningWidget";
import { InquiryBasedLearningWidget } from "./trends/InquiryBasedLearningWidget";
import { LexicalApproachWidget } from "./trends/LexicalApproachWidget";
import { MALLWidget } from "./trends/MALLWidget";
import { MindfulWidget } from "./trends/MindfulWidget";
import { MultimodalLearningWidget } from "./trends/MultimodalLearningWidget";
import { NanoLearningWidget } from "./trends/NanoLearningWidget";
import { NeuroELTWidget } from "./trends/NeuroELTWidget";
import { PBLWidget } from "./trends/PBLWidget";
import { PlurilingualismWidget } from "./trends/PlurilingualismWidget";
import { SELWidget } from "./trends/SELWidget";
import { SocialMediaReelsWidget } from "./trends/SocialMediaReelsWidget";
import { SpacedRepetitionWidget } from "./trends/SpacedRepetitionWidget";
import { TBLTWidget } from "./trends/TBLTWidget";
import { TranslanguagingWidget } from "./trends/TranslanguagingWidget";
import { VRLearningWidget } from "./trends/VRLearningWidget";
import { VisualThinkingWidget } from "./trends/VisualThinkingWidget";
import { EdutainmentWidget } from "./trends/EdutainmentWidget";
import { CALLWidget } from "./trends/CALLWidget";

export function ImmersivePracticeSection() {
	return (
		<section
			aria-labelledby="immersive-practice-title"
			className="space-y-4 mt-8"
		>
			<h3
				id="immersive-practice-title"
				className="text-2xl font-bold text-foreground tracking-tight"
			>
				Tendências 2025 & Prática Imersiva
			</h3>
			<Tabs defaultValue="digital">
				<TabsList className="flex flex-wrap gap-2 mb-4">
					<TabsTrigger
						value="digital"
					>
						Digital & IA
					</TabsTrigger>
					<TabsTrigger
						value="social"
					>
						Conexão Humana & Social
					</TabsTrigger>
					<TabsTrigger
						value="cultura"
					>
						Cultura
					</TabsTrigger>
					<TabsTrigger
						value="metodologias"
					>
						Metodologias
					</TabsTrigger>
					<TabsTrigger
						value="essenciais"
					>
						Essenciais
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="digital"
					className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				>
					<AIPromptCraftingWidget />
					<HyFlexLearningWidget />
					<AILanguagePartnerWidget />
					<AIStudyCoachWidget />
					<VRLearningWidget />
					<SocialMediaReelsWidget />
					<NanoLearningWidget />
					<MALLWidget />
					<CALLWidget />
				</TabsContent>

				<TabsContent
					value="social"
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
				>
					<GreenELTWidget />
					<DEIBWidget />
					<CriticalPedagogyWidget />
					<MindfulWidget />
					<SELWidget />
				</TabsContent>

				<TabsContent
					value="cultura"
					className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				>
					<AuthenticMaterialsWidget />
					<GlobalEnglishesWidget />
				</TabsContent>

				<TabsContent
					value="metodologias"
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
				>
					<DogmeELTWidget />
					<LexicalApproachWidget />
					<TranslanguagingWidget />
					<ExperientialLearningWidget />
					<InquiryBasedLearningWidget />
					<TBLTWidget />
					<CLILWidget />
					<PBLWidget />
					<DDLWidget />
					<FlippedClassroomWidget />
					<GamificationWidget />
					<SpacedRepetitionWidget />
					<CommunicativeRoleplayWidget />
					<NeuroELTWidget />
					<PlurilingualismWidget />
					<MultimodalLearningWidget />
					<VisualThinkingWidget />
					<EdutainmentWidget />
				</TabsContent>

				<TabsContent value="essenciais">
					<PracticeHub />
				</TabsContent>
			</Tabs>
		</section>
	);
}
