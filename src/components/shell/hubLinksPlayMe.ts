import {
	CheckSquare,
	FileText,
	GraduationCap,
	ListChecks,
	MessagesSquare,
	Puzzle,
	SearchX,
	Settings,
	TrendingUp,
	Trophy,
} from "lucide-react";
import type { HubLink } from "./hubData";

/** Jogar → Treinos: exercícios curtos de frase e texto. */
export const PLAY_DRILLS: HubLink[] = [
	{
		href: "/exercises/sentence-ordering",
		title: "Ordenar frases",
		description: "Monte a frase na ordem certa",
		icon: ListChecks,
		tone: "violet",
	},
	{
		href: "/exercises/sentence-identification",
		title: "Identificar frases",
		description: "Qual frase está certa?",
		icon: CheckSquare,
		tone: "aqua",
	},
	{
		href: "/exercises/find-incorrect-words",
		title: "Encontrar erros",
		description: "Ache a palavra errada",
		icon: SearchX,
		tone: "coral",
	},
	{
		href: "/exercises/news-comprehension",
		title: "Interpretação",
		description: "Notícias curtas com perguntas",
		icon: FileText,
		tone: "gold",
	},
	{
		href: "/exercises/matching-pairs",
		title: "Pares",
		description: "Ligue inglês e português",
		icon: Puzzle,
		tone: "violet",
	},
	{
		href: "/exercises/conversation",
		title: "Diálogos",
		description: "Situações do dia a dia",
		icon: MessagesSquare,
		tone: "aqua",
	},
];

/** Eu: progresso, conquistas, nível e ajustes. */
export const ME_LINKS: HubLink[] = [
	{
		href: "/progress",
		title: "Meu progresso",
		description: "Gráficos de estudo e acertos",
		icon: TrendingUp,
		tone: "violet",
	},
	{
		href: "/achievements",
		title: "Conquistas",
		description: "Selos que você já ganhou",
		icon: Trophy,
		tone: "gold",
	},
	{
		href: "/proficiency",
		title: "Teste de nível",
		description: "Descubra seu CEFR em minutos",
		icon: GraduationCap,
		tone: "aqua",
	},
	{
		href: "/settings",
		title: "Configurações",
		description: "Tema, nuvem, backup e lembretes",
		icon: Settings,
		tone: "coral",
	},
];
