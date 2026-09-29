import { Sparkles } from "lucide-react";
import { AILanguagePartnerWidget } from "@/components/dashboard/AILanguagePartnerWidget";
import { AIStudyCoachWidget } from "@/components/dashboard/AIStudyCoachWidget";
import { CLILWidget } from "@/components/dashboard/CLILWidget";
import { CommunicativeRoleplayWidget } from "@/components/dashboard/CommunicativeRoleplayWidget";
import { CommunityChallengeWidget } from "@/components/dashboard/CommunityChallengeWidget";
import { DataDrivenLearningWidget } from "@/components/dashboard/DataDrivenLearningWidget";
import { DEIBWidget } from "@/components/dashboard/DEIBWidget";
import { GlobalEnglishesWidget } from "@/components/dashboard/GlobalEnglishesWidget";
import { GreenELTWidget } from "@/components/dashboard/GreenELTWidget";
import { InteractiveAudioWidget } from "@/components/dashboard/InteractiveAudioWidget";
import { LexicalApproachWidget } from "@/components/dashboard/LexicalApproachWidget";
import { LiveTutorWidget } from "@/components/dashboard/LiveTutorWidget";
import { MicroLessonWidget } from "@/components/dashboard/MicroLessonWidget";
import { MindfulWidget } from "@/components/dashboard/MindfulWidget";
import { PeerReviewWidget } from "@/components/dashboard/PeerReviewWidget";
import { PopCultureWidget } from "@/components/dashboard/PopCultureWidget";
import { ProjectBasedLearningWidget } from "@/components/dashboard/ProjectBasedLearningWidget";
import { PronunciationWidget } from "@/components/dashboard/PronunciationWidget";
import { RealWorldARWidget } from "@/components/dashboard/RealWorldARWidget";
import { SocialMediaReelsWidget } from "@/components/dashboard/SocialMediaReelsWidget";
import { SpacedRepetitionWidget } from "@/components/dashboard/SpacedRepetitionWidget";
import { StorytellingWidget } from "@/components/dashboard/StorytellingWidget";
import { TaskMissionWidget } from "@/components/dashboard/TaskMissionWidget";
import { TranslanguagingWidget } from "@/components/dashboard/TranslanguagingWidget";
import { VirtualImmersionWidget } from "@/components/dashboard/VirtualImmersionWidget";
import { AdaptiveLearningWidget } from "./AdaptiveLearningWidget";
import { AuthenticMaterialsWidget } from "./AuthenticMaterialsWidget";
import { CriticalPedagogyWidget } from "./CriticalPedagogyWidget";
import { DogmeELTWidget } from "./DogmeELTWidget";
import { FlippedClassroomWidget } from "./FlippedClassroomWidget";
import { NeuroELTWidget } from "./NeuroELTWidget";
import { PlurilingualismWidget } from "./PlurilingualismWidget";

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
