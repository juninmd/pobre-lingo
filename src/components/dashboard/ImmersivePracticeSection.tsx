import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationContext";
import { useGamification } from "@/contexts/GamificationContext";
import {
	BrainCircuit, Smartphone, Laptop, Sparkles, MessageSquare,
	Leaf, Heart, Users, Scale, Globe, BookOpen, Languages, Map,
	Puzzle, Search, Beaker, type LucideIcon
} from "lucide-react";

export function TrendWidget({ title, description, icon: Icon, actionText = "Explorar" }: { title: string, description: string, icon: LucideIcon, actionText?: string }) {
	const { notify } = useNotifications();
	const { addXp } = useGamification();

	const handleAction = () => {
		addXp(10);
		notify({
			title: "Recurso explorado!",
			body: `Você ganhou 10 XP explorando ${title}. Em breve mais novidades!`,
			category: "achievement",
		});
	};

	return (
		<div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60">
			<span className="rounded-lg bg-primary/10 p-2 text-primary">
				<Icon className="h-5 w-5" aria-hidden="true" />
			</span>
			<div className="flex flex-col min-w-0 flex-1">
				<span className="block font-semibold text-foreground">{title}</span>
				<span className="block text-sm text-muted-foreground mb-2">{description}</span>
				<Button variant="outline" size="sm" onClick={handleAction} className="w-fit">{actionText}</Button>
			</div>
		</div>
	);
}

// Digital & IA
export const AIPromptCraftingWidget = () => <TrendWidget title="Prompt Engineering" description="Aprenda a falar com IAs em inglês." icon={BrainCircuit} />
export const HyFlexLearningWidget = () => <TrendWidget title="HyFlex Learning" description="Ensino híbrido e flexível adaptado a você." icon={Laptop} />
export const AILanguagePartnerWidget = () => <TrendWidget title="AI Language Partner" description="Treine conversa livre com IA inteligente." icon={Sparkles} />
export const SocialMediaReelsWidget = () => <TrendWidget title="Social Media Reels" description="Aprenda com pílulas e vídeos curtos." icon={Smartphone} />

// Social
export const GreenELTWidget = () => <TrendWidget title="Green ELT" description="Vocabulário de ecologia e sustentabilidade." icon={Leaf} />
export const DEIBWidget = () => <TrendWidget title="DEIB" description="Inglês com diversidade e inclusão global." icon={Users} />
export const MindfulWidget = () => <TrendWidget title="Mindfulness" description="Afirmações diárias e ensino socioemocional." icon={Heart} />
export const CriticalPedagogyWidget = () => <TrendWidget title="Pedagogia Crítica" description="Reflita criticamente sobre a língua." icon={Scale} />

// Cultura
export const DogmeELTWidget = () => <TrendWidget title="Dogme ELT" description="Prática autêntica sem materiais guiados." icon={MessageSquare} />
export const AuthenticMaterialsWidget = () => <TrendWidget title="Materiais Autênticos" description="Textos nativos e conteúdo do mundo real." icon={Map} />
export const GlobalEnglishesWidget = () => <TrendWidget title="Global Englishes" description="Sotaques diversos e ELF." icon={Globe} />
export const TranslanguagingWidget = () => <TrendWidget title="Translanguaging" description="Crie pontes comparando inglês e português." icon={Languages} />

// Metodologias
export const LexicalApproachWidget = () => <TrendWidget title="Abordagem Lexical" description="Aprenda por chunks (blocos)." icon={BookOpen} />
export const ExperientialLearningWidget = () => <TrendWidget title="Experiential Learning" description="Aprenda fazendo e refletindo na prática." icon={Puzzle} />
export const InquiryBasedLearningWidget = () => <TrendWidget title="Inquiry-Based" description="Aprenda investigando problemas." icon={Search} />
export const CLILWidget = () => <TrendWidget title="CLIL" description="Integração de conteúdo não linguístico." icon={Beaker} />

export function ImmersivePracticeSection() {
	return (
		<section aria-labelledby="immersive-practice-title" className="space-y-4 mt-8">
			<h3 id="immersive-practice-title" className="text-2xl font-bold text-foreground tracking-tight">
				Tendências 2025 & Prática Imersiva
			</h3>
			<Tabs defaultValue="digital" className="w-full">
				<TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
					<TabsTrigger value="digital" className="py-2">Digital & IA</TabsTrigger>
					<TabsTrigger value="social" className="py-2">Conexão Social</TabsTrigger>
					<TabsTrigger value="cultura" className="py-2">Cultura</TabsTrigger>
					<TabsTrigger value="metodologias" className="py-2">Metodologias</TabsTrigger>
				</TabsList>
				<TabsContent value="digital" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
					<AIPromptCraftingWidget />
					<HyFlexLearningWidget />
					<AILanguagePartnerWidget />
					<SocialMediaReelsWidget />
				</TabsContent>
				<TabsContent value="social" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
					<GreenELTWidget />
					<DEIBWidget />
					<MindfulWidget />
					<CriticalPedagogyWidget />
				</TabsContent>
				<TabsContent value="cultura" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
					<DogmeELTWidget />
					<AuthenticMaterialsWidget />
					<GlobalEnglishesWidget />
					<TranslanguagingWidget />
				</TabsContent>
				<TabsContent value="metodologias" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
					<LexicalApproachWidget />
					<ExperientialLearningWidget />
					<InquiryBasedLearningWidget />
					<CLILWidget />
				</TabsContent>
			</Tabs>
		</section>
	);
}
