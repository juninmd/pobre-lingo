import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PracticeHub } from "./PracticeHub";
import { NeuroELTWidget } from "./trends/NeuroELTWidget";
import { PlurilingualismWidget } from "./trends/PlurilingualismWidget";
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
import { MindfulWidget } from "./trends/MindfulWidget";
import { NanoLearningWidget } from "./trends/NanoLearningWidget";
import { PBLWidget } from "./trends/PBLWidget";
import { SocialMediaReelsWidget } from "./trends/SocialMediaReelsWidget";
import { SpacedRepetitionWidget } from "./trends/SpacedRepetitionWidget";
import { TBLTWidget } from "./trends/TBLTWidget";
import { TranslanguagingWidget } from "./trends/TranslanguagingWidget";
import { VRLearningWidget } from "./trends/VRLearningWidget";

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
						className="px-4 py-2 rounded-md bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						Digital & IA
					</TabsTrigger>
					<TabsTrigger
						value="social"
						className="px-4 py-2 rounded-md bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						Conexão Humana & Social
					</TabsTrigger>
					<TabsTrigger
						value="cultura"
						className="px-4 py-2 rounded-md bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						Cultura
					</TabsTrigger>
					<TabsTrigger
						value="metodologias"
						className="px-4 py-2 rounded-md bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						Metodologias
					</TabsTrigger>
					<TabsTrigger
						value="essenciais"
						className="px-4 py-2 rounded-md bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
				</TabsContent>

				<TabsContent
					value="social"
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
				>
					<GreenELTWidget />
					<DEIBWidget />
					<CriticalPedagogyWidget />
					<MindfulWidget />
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
				</TabsContent>

				<TabsContent value="essenciais">
					<PracticeHub />
				</TabsContent>
			</Tabs>
		</section>
	);
}
