import { Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdaptiveLearningWidget } from "./AdaptiveLearningWidget";
import { InteractiveAudioWidget } from "./InteractiveAudioWidget";
import { PopCultureWidget } from "./PopCultureWidget";
import { PracticeHub } from "./PracticeHub";
import { RealWorldARWidget } from "./RealWorldARWidget";
import { StorytellingWidget } from "./StorytellingWidget";
import { ActionOrientedApproachWidget } from "./trends/ActionOrientedApproachWidget";
import { AgenticLearningWidget } from "./trends/AgenticLearningWidget";
import { AIEthicsWidget } from "./trends/AIEthicsWidget";
import { AILanguagePartnerWidget } from "./trends/AILanguagePartnerWidget";
import { AIPromptCraftingWidget } from "./trends/AIPromptCraftingWidget";
import { AIStudyCoachWidget } from "./trends/AIStudyCoachWidget";
import { AudioLingualWidget } from "./trends/AudioLingualWidget";
import { AuthenticMaterialsWidget } from "./trends/AuthenticMaterialsWidget";
import { BiteSizedLearningWidget } from "./trends/BiteSizedLearningWidget";
import { BlendedLearningWidget } from "./trends/BlendedLearningWidget";
import { CALLWidget } from "./trends/CALLWidget";
import { CBLTWidget } from "./trends/CBLTWidget";
import { CLILWidget } from "./trends/CLILWidget";
import { CLTWidget } from "./trends/CLTWidget";
import { CollaborativeLearningWidget } from "./trends/CollaborativeLearningWidget";
import { CommunicativeRoleplayWidget } from "./trends/CommunicativeRoleplayWidget";
import { ContentBasedInstructionWidget } from "./trends/ContentBasedInstructionWidget";
import { CRTWidget } from "./trends/CRTWidget";
import { CriticalPedagogyWidget } from "./trends/CriticalPedagogyWidget";
import { DDLWidget } from "./trends/DDLWidget";
import { DEIBWidget } from "./trends/DEIBWidget";
import { DecolonialELTWidget } from "./trends/DecolonialELTWidget";
import { DirectMethodWidget } from "./trends/DirectMethodWidget";
import { DogmeELTWidget } from "./trends/DogmeELTWidget";
import { EclecticApproachWidget } from "./trends/EclecticApproachWidget";
import { EduScrumWidget } from "./trends/EduScrumWidget";
import { EdutainmentWidget } from "./trends/EdutainmentWidget";
import { EFLPedagogyWidget } from "./trends/EFLPedagogyWidget";
import { EMIWidget } from "./trends/EMIWidget";
import { ESPWidget } from "./trends/ESPWidget";
import { ExperientialLearningWidget } from "./trends/ExperientialLearningWidget";
import { FlippedClassroomWidget } from "./trends/FlippedClassroomWidget";
import { FlippedLearning30Widget } from "./trends/FlippedLearning30Widget";
import { GamificationWidget } from "./trends/GamificationWidget";
import { GenAIWidget } from "./trends/GenAIWidget";
import { GlobalCitizenshipWidget } from "./trends/GlobalCitizenshipWidget";
import { GlobalEnglishesWidget } from "./trends/GlobalEnglishesWidget";
import { GrammarTranslationWidget } from "./trends/GrammarTranslationWidget";
import { GreenELTWidget } from "./trends/GreenELTWidget";
import { HeutagogyWidget } from "./trends/HeutagogyWidget";
import { HyFlexLearningWidget } from "./trends/HyFlexLearningWidget";
import { ICCWidget } from "./trends/ICCWidget";
import { ImmersiveStorytellingWidget } from "./trends/ImmersiveStorytellingWidget";
import { InclusivePracticesWidget } from "./trends/InclusivePracticesWidget";
import { InquiryBasedLearningWidget } from "./trends/InquiryBasedLearningWidget";
import { InvisibleLearningWidget } from "./trends/InvisibleLearningWidget";
import { LexicalApproachWidget } from "./trends/LexicalApproachWidget";
import { MALLWidget } from "./trends/MALLWidget";
import { MediationWidget } from "./trends/MediationWidget";
import { MicrocredentialsWidget } from "./trends/MicrocredentialsWidget";
import { MindfulWidget } from "./trends/MindfulWidget";
import { MultimodalLearningWidget } from "./trends/MultimodalLearningWidget";
import { NanoLearningWidget } from "./trends/NanoLearningWidget";
import { NaturalApproachWidget } from "./trends/NaturalApproachWidget";
import { NeuroELTWidget } from "./trends/NeuroELTWidget";
import { PBLWidget } from "./trends/PBLWidget";
import { PhenomenonBasedLearningWidget } from "./trends/PhenomenonBasedLearningWidget";
import { PlurilingualismWidget } from "./trends/PlurilingualismWidget";
import { PodcastingWidget } from "./trends/PodcastingWidget";
import { PPPWidget } from "./trends/PPPWidget";
import { ProjectBasedLearningWidget } from "./trends/ProjectBasedLearningWidget";
import { SELWidget } from "./trends/SELWidget";
import { SilentWayWidget } from "./trends/SilentWayWidget";
import { SocialMediaReelsWidget } from "./trends/SocialMediaReelsWidget";
import { SpacedRepetitionWidget } from "./trends/SpacedRepetitionWidget";
import { StoryBasedApproachWidget } from "./trends/StoryBasedApproachWidget";
import { SuggestopediaWidget } from "./trends/SuggestopediaWidget";
import { TaskBasedLanguageTeachingWidget } from "./trends/TaskBasedLanguageTeachingWidget";
import { TBLTWidget } from "./trends/TBLTWidget";
import { TeacherpreneurshipWidget } from "./trends/TeacherpreneurshipWidget";
import { TPRWidget } from "./trends/TPRWidget";
import { TranslanguagingWidget } from "./trends/TranslanguagingWidget";
import { TraumaInformedELTWidget } from "./trends/TraumaInformedELTWidget";
import { TTTWidget } from "./trends/TTTWidget";
import { UDLWidget } from "./trends/UDLWidget";
import { VisualThinkingWidget } from "./trends/VisualThinkingWidget";
import { VRLearningWidget } from "./trends/VRLearningWidget";
import { WellBeingWidget } from "./trends/WellBeingWidget";
import { VirtualImmersionWidget } from "./VirtualImmersionWidget";

export function ImmersivePracticeSection() {
	return (
		<section
			aria-labelledby="immersive-practice-title"
			className="space-y-4 mt-8"
		>
			<div className="flex items-center gap-2 mb-2">
				<Sparkles className="h-6 w-6 text-primary animate-pulse" />
				<h3
					id="immersive-practice-title"
					className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
				>
					Tendências 2025 & Prática Imersiva
				</h3>
			</div>
			<Tabs defaultValue="digital">
				<TabsList className="flex flex-wrap gap-2 mb-4">
					<TabsTrigger value="digital">Digital & IA</TabsTrigger>
					<TabsTrigger value="social">Conexão Humana & Social</TabsTrigger>
					<TabsTrigger value="cultura">Cultura</TabsTrigger>
					<TabsTrigger value="metodologias">Metodologias</TabsTrigger>
					<TabsTrigger value="interativas">Interativas</TabsTrigger>
					<TabsTrigger value="essenciais">Essenciais</TabsTrigger>
				</TabsList>

				<TabsContent
					value="digital"
					className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				>
					<GenAIWidget />
					<TeacherpreneurshipWidget />
					<AIPromptCraftingWidget />
					<HyFlexLearningWidget />
					<AILanguagePartnerWidget />
					<AIStudyCoachWidget />
					<VRLearningWidget />
					<SocialMediaReelsWidget />
					<NanoLearningWidget />
					<MALLWidget />
					<BiteSizedLearningWidget />
					<CALLWidget />
					<AIEthicsWidget />
					<MicrocredentialsWidget />
				</TabsContent>

				<TabsContent
					value="social"
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
				>
					<InclusivePracticesWidget />
					<GlobalCitizenshipWidget />
					<WellBeingWidget />
					<GreenELTWidget />
					<DEIBWidget />
					<CriticalPedagogyWidget />
					<MindfulWidget />
					<SELWidget />
					<TraumaInformedELTWidget />
					<DecolonialELTWidget />
					<CollaborativeLearningWidget />
				</TabsContent>

				<TabsContent
					value="cultura"
					className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				>
					<AuthenticMaterialsWidget />
					<GlobalEnglishesWidget />
					<ICCWidget />
				</TabsContent>

				<TabsContent
					value="metodologias"
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
				>
					<HeutagogyWidget />
					<EduScrumWidget />
					<InvisibleLearningWidget />
					<PhenomenonBasedLearningWidget />
					<ActionOrientedApproachWidget />
					<EclecticApproachWidget />
					<CBLTWidget />
					<StoryBasedApproachWidget />
					<TaskBasedLanguageTeachingWidget />
					<ProjectBasedLearningWidget />
					<ContentBasedInstructionWidget />
					<MediationWidget />
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
					<FlippedLearning30Widget />
					<GamificationWidget />
					<SpacedRepetitionWidget />
					<CommunicativeRoleplayWidget />
					<NeuroELTWidget />
					<PlurilingualismWidget />
					<MultimodalLearningWidget />
					<VisualThinkingWidget />
					<EdutainmentWidget />
					<TPRWidget />
					<CLTWidget />
					<SuggestopediaWidget />
					<AudioLingualWidget />
					<DirectMethodWidget />
					<SilentWayWidget />
					<ESPWidget />
					<BlendedLearningWidget />
					<AgenticLearningWidget />
					<EMIWidget />
					<EFLPedagogyWidget />
					<PPPWidget />
					<TTTWidget />
					<NaturalApproachWidget />
					<GrammarTranslationWidget />
					<UDLWidget />
					<CRTWidget />
				</TabsContent>

				<TabsContent
					value="interativas"
					className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				>
					<PodcastingWidget />
					<AdaptiveLearningWidget />
					<RealWorldARWidget />
					<InteractiveAudioWidget />
					<VirtualImmersionWidget />
					<StorytellingWidget />
					<ImmersiveStorytellingWidget />
					<PopCultureWidget />
				</TabsContent>

				<TabsContent value="essenciais">
					<PracticeHub />
				</TabsContent>
			</Tabs>
		</section>
	);
}
