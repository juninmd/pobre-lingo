import {
	BookA,
	BookMarked,
	BookOpen,
	Brain,
	CheckSquare,
	Coins,
	FileText,
	Gamepad2,
	Gauge,
	GraduationCap,
	ListChecks,
	Map as MapIcon,
	Menu,
	Moon,
	PenLine,
	Search as SearchIcon,
	SearchX,
	Settings,
	Sparkles,
	Sun,
	Trophy,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
	GlobalSearch,
	GlobalSearchTrigger,
} from "@/components/common/GlobalSearch";
import { BrandMark } from "@/components/layout/BrandMark";
import { PobrelingoAssistant } from "@/components/mascot/PobrelingoAssistant";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";
import { LearningStreakDisplay } from "@/components/streaks/LearningStreakDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { cn } from "@/lib/utils";

// Agrupamento de navegação por categorias
export const navGroups = [
	{
		title: "Principal",
		items: [
			{ href: "/", label: "Minha Jornada", icon: MapIcon },
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
		title: "Habilidades",
		items: [
			{ href: "/reading", label: "Leitura & Escuta", icon: BookOpen },
			{ href: "/vocabulary", label: "Vocabulário", icon: BookMarked },
			{ href: "/writing", label: "Escrita & Ditado", icon: PenLine },
			{ href: "/fluency", label: "Fluência", icon: Gauge },
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
			{ href: "/checkpoints", label: "Checkpoints", icon: Trophy },
			{ href: "/achievements", label: "Conquistas", icon: Trophy },
			{ href: "/settings", label: "Configurações", icon: Settings },
		],
	},
];

// Flatten para busca
export const allNavItems = navGroups.flatMap((group) => group.items);

export function NavMenu() {
	const { pathname } = useLocation();
	const { setOpenMobile, state } = useSidebar();
	const [sidebarSearchTerm, setSidebarSearchTerm] = useState("");
	const isCollapsed = state === "collapsed";

	const filteredGroups = sidebarSearchTerm
		? [
				{
					title: "Resultados",
					items: allNavItems.filter((item) =>
						item.label.toLowerCase().includes(sidebarSearchTerm.toLowerCase()),
					),
				},
			]
		: navGroups;

	const handleLinkClick = () => {
		setOpenMobile(false);
	};

	return (
		<>
			<SidebarHeader className="p-3 border-b border-sidebar-border/50">
				<BrandMark variant="sidebar" compact={isCollapsed} />

				{!isCollapsed && (
					<div className="mt-4 relative">
						<SearchIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sidebar-foreground/50" />
						<SidebarInput
							type="search"
							placeholder="Buscar..."
							value={sidebarSearchTerm}
							onChange={(e) => setSidebarSearchTerm(e.target.value)}
							className="w-full pl-8 h-8 text-xs bg-sidebar-accent/60 border-sidebar-border/60 placeholder:text-sidebar-foreground/60 text-sidebar-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary/50 [data-theme=pobre-lingo]:rounded-xl [data-theme=pobre-lingo]:border-primary/20"
						/>
						{sidebarSearchTerm && (
							<button
								type="button"
								onClick={() => setSidebarSearchTerm("")}
								className="absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-foreground/50 hover:text-sidebar-foreground"
							>
								<X className="h-3.5 w-3.5" />
							</button>
						)}
					</div>
				)}
			</SidebarHeader>

			<ScrollArea className="flex-1">
				<SidebarContent className="p-2">
					{filteredGroups.map((group, groupIndex) => (
						<div key={group.title} className={groupIndex > 0 ? "mt-4" : ""}>
							{!isCollapsed && (
								<h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/55 [data-theme=pobre-lingo]:text-accent/80 [data-theme=pobre-lingo]:tracking-[0.12em]">
									{group.title}
								</h3>
							)}
							<SidebarMenu>
								{group.items.length > 0
									? group.items.map((item) => {
											const isActive =
												pathname === item.href ||
												(item.href !== "/" && pathname.startsWith(item.href));
											return (
												<SidebarMenuItem key={item.href}>
													<SidebarMenuButton
														asChild
														isActive={isActive}
														tooltip={{ children: item.label }}
														className={cn(
															"justify-start h-10 transition-all duration-300 rounded-lg group [data-theme=pobre-lingo]:sidebar-menu-btn",
															isActive
																? "bg-primary/10 text-primary font-bold shadow-sm [data-theme=pobre-lingo]:sidebar-active"
																: "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:translate-x-1",
														)}
														onClick={handleLinkClick}
													>
														<Link
															to={item.href}
															className="flex items-center gap-3"
														>
															<item.icon
																className={cn(
																	"h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110",
																	isActive && "text-primary",
																)}
															/>
															{!isCollapsed && (
																<span className="truncate text-sm">
																	{item.label}
																</span>
															)}
															{!isCollapsed && item.badge && (
																<Badge
																	variant="secondary"
																	className="ml-auto text-[9px] px-1.5 py-0 h-4 bg-accent/15 text-accent border border-accent/25"
																>
																	{item.badge}
																</Badge>
															)}
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})
									: !isCollapsed && (
											<p className="px-3 py-2 text-xs text-sidebar-foreground/50">
												Nenhum item encontrado
											</p>
										)}
							</SidebarMenu>
						</div>
					))}
				</SidebarContent>
			</ScrollArea>

			<SidebarFooter className="p-3 border-t border-sidebar-border/50">
				{!isCollapsed ? (
					<LearningStreakDisplay variant="compact" />
				) : (
					<div className="flex justify-center py-2">
						<div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
							<Sparkles className="h-4 w-4 text-accent" />
						</div>
					</div>
				)}
			</SidebarFooter>
		</>
	);
}
