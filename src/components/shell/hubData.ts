import {
	AudioLines,
	BookA,
	BookMarked,
	BookOpen,
	CheckSquare,
	Compass,
	FolderOpen,
	GraduationCap,
	Headphones,
	LibraryBig,
	type LucideIcon,
	Mic,
	PenLine,
} from "lucide-react";

export type HubTone = "violet" | "aqua" | "gold" | "coral";

export interface HubLink {
	href: string;
	title: string;
	description: string;
	icon: LucideIcon;
	tone: HubTone;
}

/** Aprender → Habilidades: uma porta para cada habilidade. */
export const LEARN_SKILLS: HubLink[] = [
	{
		href: "/course",
		title: "Curso guiado",
		description: "Lições em ordem, com missão no fim",
		icon: GraduationCap,
		tone: "gold",
	},
	{
		href: "/reading",
		title: "Leitura e escuta",
		description: "Textos graduados com áudio",
		icon: BookOpen,
		tone: "aqua",
	},
	{
		href: "/listening-lab",
		title: "Laboratório de escuta",
		description: "Áudio real e seus vídeos com legenda",
		icon: Headphones,
		tone: "violet",
	},
	{
		href: "/library",
		title: "Leitor livre",
		description: "Qualquer texto, tocando nas palavras",
		icon: LibraryBig,
		tone: "coral",
	},
	{
		href: "/vocabulary",
		title: "Vocabulário",
		description: "As palavras mais frequentes, por nível",
		icon: BookA,
		tone: "gold",
	},
	{
		href: "/writing",
		title: "Escrita e ditado",
		description: "Ditado e redação com correção",
		icon: PenLine,
		tone: "aqua",
	},
	{
		href: "/fluency",
		title: "Fluência",
		description: "4/3/2 cronometrado e shadowing",
		icon: Mic,
		tone: "violet",
	},
	{
		href: "/pronunciation",
		title: "Pronúncia",
		description: "TH, schwa, -ed e os sons que trocamos",
		icon: AudioLines,
		tone: "coral",
	},
	{
		href: "/tracks",
		title: "Trilhas por objetivo",
		description: "Inglês para viagem e para o trabalho",
		icon: Compass,
		tone: "gold",
	},
	{
		href: "/checkpoints",
		title: "Checkpoints",
		description: "Provas curtas para fechar cada nível",
		icon: CheckSquare,
		tone: "aqua",
	},
];

/** Aprender → Referência: consulta rápida. */
export const LEARN_REFERENCE: HubLink[] = [
	{
		href: "/rules",
		title: "Regras",
		description: "Gramática explicada com exemplos",
		icon: BookOpen,
		tone: "violet",
	},
	{
		href: "/dictionary",
		title: "Dicionário",
		description: "Palavras com pronúncia e exemplos",
		icon: BookA,
		tone: "aqua",
	},
	{
		href: "/notebook",
		title: "Caderninho",
		description: "O que você salvou para rever",
		icon: BookMarked,
		tone: "gold",
	},
	{
		href: "/course/portfolio",
		title: "Portfólio",
		description: "As missões que você escreveu no curso",
		icon: FolderOpen,
		tone: "coral",
	},
];

export { ME_LINKS, PLAY_DRILLS } from "./hubLinksPlayMe";
