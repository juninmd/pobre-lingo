import {
	AILanguagePartnerWidget,
	AIPromptCraftingWidget,
	AuthenticMaterialsWidget,
	CLILWidget,
	CriticalPedagogyWidget,
	DEIBWidget,
	DogmeELTWidget,
	ExperientialLearningWidget,
	GlobalEnglishesWidget,
	GreenELTWidget,
	HyFlexLearningWidget,
	InquiryBasedLearningWidget,
	LexicalApproachWidget,
	MindfulWidget,
	SocialMediaReelsWidget,
	TranslanguagingWidget,
} from "@/components/dashboard/elt-trends";
import { PracticeHub } from "@/components/dashboard/PracticeHub";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ImmersivePracticeSection() {
	return (
		<section
			aria-labelledby="immersive-practice-title"
			className="space-y-6 mt-8"
		>
			<h3
				id="immersive-practice-title"
				className="text-2xl font-black tracking-tight"
			>
				Tendências 2025 & Prática Imersiva
			</h3>

			<Tabs defaultValue="praticas" className="w-full">
				<TabsList className="w-full grid grid-cols-2 lg:grid-cols-5 h-auto rounded-xl p-1 bg-card/50 backdrop-blur-md border border-border">
					<TabsTrigger
						value="praticas"
						className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold py-2.5"
					>
						Essenciais
					</TabsTrigger>
					<TabsTrigger
						value="digital"
						className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold py-2.5"
					>
						Digital & IA
					</TabsTrigger>
					<TabsTrigger
						value="social"
						className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold py-2.5"
					>
						Social
					</TabsTrigger>
					<TabsTrigger
						value="cultura"
						className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold py-2.5"
					>
						Cultura
					</TabsTrigger>
					<TabsTrigger
						value="metodologias"
						className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold py-2.5"
					>
						Metodologias
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="praticas"
					className="mt-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<PracticeHub />
				</TabsContent>

				<TabsContent
					value="digital"
					className="mt-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
						<AIPromptCraftingWidget />
						<HyFlexLearningWidget />
						<AILanguagePartnerWidget />
					</div>
				</TabsContent>

				<TabsContent
					value="social"
					className="mt-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
						<SocialMediaReelsWidget />
						<GreenELTWidget />
						<DEIBWidget />
						<CriticalPedagogyWidget />
						<MindfulWidget />
					</div>
				</TabsContent>

				<TabsContent
					value="cultura"
					className="mt-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
						<GlobalEnglishesWidget />
						<AuthenticMaterialsWidget />
						<TranslanguagingWidget />
					</div>
				</TabsContent>

				<TabsContent
					value="metodologias"
					className="mt-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
