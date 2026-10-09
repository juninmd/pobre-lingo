import {
	BookA,
	BookMarked,
	BookOpen,
	Bot,
	Brain,
	CheckSquare,
	FileText,
	Gamepad2,
	GraduationCap,
	Headphones,
	LibraryBig,
	ListChecks,
	type LucideIcon,
	Map as MapIcon,
	SearchX,
	Settings,
	TrendingUp,
	Trophy,
} from "lucide-react";
export interface NavigationItem {
	href: string;
	label: string;
	icon: LucideIcon;
	badge?: string;
}
export interface NavigationGroup {
	title: string;
	items: NavigationItem[];
}
export const navGroups: NavigationGroup[] = [
	{
		title: "Principal",
		items: [
			{ href: "/", label: "Minha Jornada", icon: MapIcon },
			{ href: "/course", label: "Curso guiado", icon: GraduationCap },
			{ href: "/review", label: "Revisar", icon: Brain, badge: "SRS" },
			{ href: "/arcade", label: "Arcade", icon: Gamepad2, badge: "Fun" },
		],
	},
	{
		title: "Referência",
		items: [
			{ href: "/rules", label: "Regras", icon: BookOpen },
			{ href: "/dictionary", label: "Dicionário", icon: BookA },
			{ href: "/notebook", label: "Caderninho", icon: BookMarked },
		],
	},
	{
		title: "Exercícios",
		items: [
			{
				href: "/exercises/sentence-ordering",
				label: "Ordenar Frases",
				icon: ListChecks,
			},
			{
				href: "/exercises/sentence-identification",
				label: "Identificar Frases",
				icon: CheckSquare,
			},
			{
				href: "/exercises/find-incorrect-words",
				label: "Encontrar Erros",
				icon: SearchX,
			},
			{
				href: "/exercises/news-comprehension",
				label: "Interpretação",
				icon: FileText,
			},
		],
	},
	{
		title: "Status",
		items: [
			{ href: "/proficiency", label: "Teste de Nível", icon: GraduationCap },
			{ href: "/achievements", label: "Conquistas", icon: Trophy },
			{ href: "/settings", label: "Configurações", icon: Settings },
		],
	},
	{
		title: "Habilidades",
		items: [
			{ href: "/reading", label: "Leitura e escuta", icon: BookOpen },
			{ href: "/vocabulary", label: "Vocabulário", icon: BookA },
			{ href: "/writing", label: "Escrita e ditado", icon: FileText },
			{ href: "/fluency", label: "Fluência", icon: TrendingUp },
			{ href: "/pronunciation", label: "Pronúncia", icon: Headphones },
			{ href: "/tracks", label: "Trilhas por objetivo", icon: MapIcon },
			{ href: "/tutor", label: "Tutor de conversa", icon: Bot },
			{ href: "/checkpoints", label: "Checkpoints", icon: CheckSquare },
			{ href: "/library", label: "Leitor livre", icon: LibraryBig },
			{
				href: "/listening-lab",
				label: "Laboratório de escuta",
				icon: Headphones,
			},
			{ href: "/progress", label: "Meu progresso", icon: TrendingUp },
		],
	},
];

// Flatten para busca
export const allNavItems = navGroups.flatMap((group) => group.items);
