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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdaptiveLearningWidget } from "./AdaptiveLearningWidget";
import { AIPromptCraftingWidget } from "./AIPromptCraftingWidget";
import { AuthenticMaterialsWidget } from "./AuthenticMaterialsWidget";
import { CriticalPedagogyWidget } from "./CriticalPedagogyWidget";
import { DogmeELTWidget } from "./DogmeELTWidget";
import { FlippedClassroomWidget } from "./FlippedClassroomWidget";
import { HyFlexLearningWidget } from "./HyFlexLearningWidget";
import { NeuroELTWidget } from "./NeuroELTWidget";
import { PlurilingualismWidget } from "./PlurilingualismWidget";

export function ImmersivePracticeSection() {
	return (
		<>
			{/* Prática Imersiva Section */}
			<section className="space-y-6 sm:space-y-8 mt-8">
				<div className="flex items-center gap-2 mb-4">
					<div className="p-1.5 bg-primary/10 rounded-lg">
						<Sparkles className="w-5 h-5 text-primary" />
					</div>
					<h3 className="text-2xl font-bold text-foreground tracking-tight">
						Tendências 2025 & Prática Imersiva
					</h3>
				</div>

				<Tabs defaultValue="digital-ai" className="w-full">
					<TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden bg-background/50 backdrop-blur-md border border-border/50 h-auto p-1.5 gap-2 rounded-xl flex-nowrap md:flex-wrap mb-6 scrollbar-hide">
						<TabsTrigger
							value="digital-ai"
							className="whitespace-nowrap px-4 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
						>
							<span className="mr-2">🤖</span> Digital & IA
						</TabsTrigger>
						<TabsTrigger
							value="social"
							className="whitespace-nowrap px-4 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
						>
							<span className="mr-2">👥</span> Social
						</TabsTrigger>
						<TabsTrigger
							value="culture"
							className="whitespace-nowrap px-4 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
						>
							<span className="mr-2">📱</span> Cultura
						</TabsTrigger>
						<TabsTrigger
							value="methodologies"
							className="whitespace-nowrap px-4 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
						>
							<span className="mr-2">🧠</span> Metodologias
						</TabsTrigger>
					</TabsList>

					<div className="space-y-8">
						<TabsContent
							value="digital-ai"
							className="mt-0 focus-visible:outline-none focus-visible:ring-0"
						>
							<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
								<AIPromptCraftingWidget />
								<AILanguagePartnerWidget />
								<InteractiveAudioWidget />
								<RealWorldARWidget />
								<PronunciationWidget />
								<DataDrivenLearningWidget />
								<VirtualImmersionWidget />
								<FlippedClassroomWidget />
								<AdaptiveLearningWidget />
							</div>
						</TabsContent>

						<TabsContent
							value="social"
							className="mt-0 focus-visible:outline-none focus-visible:ring-0"
						>
							<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
								<LiveTutorWidget />
								<CommunityChallengeWidget />
								<PeerReviewWidget />
								<MindfulWidget />
								<DEIBWidget />
								<GreenELTWidget />
								<PlurilingualismWidget />
								<CriticalPedagogyWidget />
							</div>
						</TabsContent>

						<TabsContent
							value="culture"
							className="mt-0 focus-visible:outline-none focus-visible:ring-0"
						>
							<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
								<SocialMediaReelsWidget />
								<PopCultureWidget />
							</div>
						</TabsContent>

						<TabsContent
							value="methodologies"
							className="mt-0 focus-visible:outline-none focus-visible:ring-0"
						>
							<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
								<HyFlexLearningWidget />
								<AIStudyCoachWidget />
								<CommunicativeRoleplayWidget />
								<TranslanguagingWidget />
								<TaskMissionWidget />
								<ProjectBasedLearningWidget />
								<CLILWidget />
								<StorytellingWidget />
								<MicroLessonWidget />
								<GlobalEnglishesWidget />
								<LexicalApproachWidget />
								<SpacedRepetitionWidget />
								<DogmeELTWidget />
								<AuthenticMaterialsWidget />
								<NeuroELTWidget />
							</div>
						</TabsContent>
					</div>
				</Tabs>
			</section>
		</>
	);
}
