import { Sparkles } from "lucide-react";
import { AILanguagePartnerWidget } from "@/components/dashboard/AILanguagePartnerWidget";
import { CLILWidget } from "@/components/dashboard/CLILWidget";
import { CommunityChallengeWidget } from "@/components/dashboard/CommunityChallengeWidget";
import { DataDrivenLearningWidget } from "@/components/dashboard/DataDrivenLearningWidget";
import { InteractiveAudioWidget } from "@/components/dashboard/InteractiveAudioWidget";
import { LiveTutorWidget } from "@/components/dashboard/LiveTutorWidget";
import { MicroLessonWidget } from "@/components/dashboard/MicroLessonWidget";
import { PeerReviewWidget } from "@/components/dashboard/PeerReviewWidget";
import { PopCultureWidget } from "@/components/dashboard/PopCultureWidget";
import { ProjectBasedLearningWidget } from "@/components/dashboard/ProjectBasedLearningWidget";
import { PronunciationWidget } from "@/components/dashboard/PronunciationWidget";
import { RealWorldARWidget } from "@/components/dashboard/RealWorldARWidget";
import { SocialMediaReelsWidget } from "@/components/dashboard/SocialMediaReelsWidget";
import { StorytellingWidget } from "@/components/dashboard/StorytellingWidget";
import { TaskMissionWidget } from "@/components/dashboard/TaskMissionWidget";
import { TranslanguagingWidget } from "@/components/dashboard/TranslanguagingWidget";
import { VirtualImmersionWidget } from "@/components/dashboard/VirtualImmersionWidget";

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
								Tendências 2024 & Prática Imersiva
							</h3>
						</div>

						<div className="space-y-8">
							{/* Category 1: Imersão Digital & IA */}
							<div className="space-y-3">
								<h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
									<span>🤖</span> Imersão Digital & IA
								</h4>
								<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
									<AILanguagePartnerWidget />
									<InteractiveAudioWidget />
									<RealWorldARWidget />
									<PronunciationWidget />
									<DataDrivenLearningWidget />
									<VirtualImmersionWidget />
								</div>
							</div>

							{/* Category 2: Conexão Humana & Social */}
							<div className="space-y-3">
								<h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
									<span>👥</span> Conexão Humana & Social
								</h4>
								<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
									<LiveTutorWidget />
									<CommunityChallengeWidget />
									<PeerReviewWidget />
								</div>
							</div>

							{/* Category 3: Nano-Learning & Cultura */}
							<div className="space-y-3">
								<h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
									<span>📱</span> Nano-Learning & Cultura
								</h4>
								<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
									<SocialMediaReelsWidget />
									<PopCultureWidget />
								</div>
							</div>

							{/* Category 4: Metodologias Ativas */}
							<div className="space-y-3">
								<h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
									<span>🧠</span> Metodologias Ativas
								</h4>
								<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
									<TranslanguagingWidget />
									<TaskMissionWidget />
									<ProjectBasedLearningWidget />
									<CLILWidget />
									<StorytellingWidget />
									<MicroLessonWidget />
								</div>
							</div>
						</div>
					</section>
						</>
	);
}
