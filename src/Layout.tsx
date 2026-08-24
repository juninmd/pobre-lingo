import {
	BookA,
	BookMarked,
	BookOpen,
	Brain,
	CheckSquare,
	Coins,
	FileText,
	Gamepad2,
	GraduationCap,
	ListChecks,
	Map as MapIcon,
	Menu,
	Moon,
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
import { SEO } from "./components/common/SEO";
import { MobileNav } from "./components/layout/MobileNav";
import { useGamification } from "./contexts/GamificationContext";
import { useTheme } from "./contexts/ThemeContext";

// Agrupamento de navegação por categorias
const navGroups = [
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
];

// Flatten para busca
const allNavItems = navGroups.flatMap((group) => group.items);

function NavMenu() {
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
				<div className="flex items-center gap-3">
					<div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 border border-primary/10 [data-theme=pobre-lingo]:bg-primary/20 [data-theme=pobre-lingo]:border-primary/30">
						<GraduationCap className="h-5 w-5 text-primary" />
					</div>
					{!isCollapsed && (
						<div className="flex flex-col min-w-0">
							<span className="font-bold text-base text-sidebar-foreground truncate tracking-tight [data-theme=pobre-lingo]:text-gold">
								PobreLingo
							</span>
							<span className="text-[10px] text-sidebar-foreground/70 uppercase tracking-wider [data-theme=pobre-lingo]:text-accent/80 [data-theme=pobre-lingo]:font-semibold">
								Aprenda Grátis
							</span>
						</div>
					)}
				</div>

				{!isCollapsed && (
					<div className="mt-4 relative">
						<SearchIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sidebar-foreground/50" />
						<SidebarInput
							type="search"
							placeholder="Buscar..."
							value={sidebarSearchTerm}
							onChange={(e) => setSidebarSearchTerm(e.target.value)}
							className="w-full pl-8 h-8 text-xs bg-sidebar-accent/30 border-sidebar-border/50 placeholder:text-sidebar-foreground/50 text-sidebar-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary/50 [data-theme=pobre-lingo]:rounded-xl [data-theme=pobre-lingo]:border-primary/20"
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
								<h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/40 [data-theme=pobre-lingo]:text-accent/60 [data-theme=pobre-lingo]:tracking-[0.12em]">
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
																	className="ml-auto text-[9px] px-1.5 py-0 h-4 bg-accent/20 text-accent-foreground border-0"
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

export default function Layout() {
	const { theme, setTheme } = useTheme();
	const { gems } = useGamification();
	const { userLevel } = useCurriculumProgress();
	const location = useLocation();
	const [searchOpen, setSearchOpen] = useState(false);

	// Atalho de teclado para abrir pesquisa (Cmd+K ou Ctrl+K)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setSearchOpen(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Determinar título da página atual
	const getCurrentPageTitle = () => {
		const currentItem = allNavItems.find(
			(item) =>
				location.pathname === item.href ||
				(item.href !== "/" && location.pathname.startsWith(item.href)),
		);
		return currentItem?.label || "PobreLingo";
	};

	return (
		<div className="font-body antialiased h-svh overflow-hidden bg-background text-foreground flex flex-col">
			<SEO />
			<SidebarProvider
				defaultOpen
				className="h-full overflow-hidden flex flex-row w-full"
			>
				{/* Sidebar only visible on lg and up */}
				<Sidebar
					collapsible="icon"
					variant="sidebar"
					side="left"
					className="hidden md:flex border-r border-border/40"
				>
					<NavMenu />
				</Sidebar>

				<SidebarInset className="flex flex-col h-full overflow-hidden min-h-0 flex-1 w-full">
					<header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 md:gap-4 border-b bg-background/80 backdrop-blur-xl px-3 sm:px-4 md:px-6 glass supports-[backdrop-filter]:bg-background/70">
						<div className="flex items-center gap-2 sm:gap-3 min-w-0">
							<div className="hidden md:block">
								<SidebarTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9 text-muted-foreground hover:text-foreground transition-colors"
									>
										<Menu className="h-5 w-5" />
										<span className="sr-only">Toggle menu</span>
									</Button>
								</SidebarTrigger>
							</div>

							<div className="md:hidden flex-shrink-0 flex items-center gap-2">
								<div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 shadow-sm border border-primary/10 [data-theme=pobre-lingo]:bg-primary/20 [data-theme=pobre-lingo]:border-primary/30">
									<GraduationCap className="h-5 w-5 text-primary" />
								</div>
								<span className="font-bold text-base tracking-tight [data-theme=pobre-lingo]:text-gold">
									PobreLingo
								</span>
							</div>

							<Separator
								orientation="vertical"
								className="h-6 hidden md:block bg-border/60"
							/>

							<div className="hidden sm:flex items-center gap-2 min-w-0">
								<div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/10 [data-theme=pobre-lingo]:bg-primary/20 [data-theme=pobre-lingo]:border-primary/30">
									<GraduationCap className="h-4 w-4 text-primary" />
								</div>
								<h1 className="font-semibold text-base md:text-lg truncate">
									{getCurrentPageTitle()}
								</h1>
							</div>
						</div>

						<div className="flex-1 flex justify-center max-w-md mx-auto">
							{/* Barra de Pesquisa Global */}
							<GlobalSearchTrigger onClick={() => setSearchOpen(true)} />
						</div>

						<div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
							{/* Gamification Stats */}
							<div className="flex items-center gap-3 sm:gap-4 font-sans">
								{/* Level Badge */}
								<div
									className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-950/50 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-400 font-sans shadow-sm transition-all hover:bg-blue-100/80 dark:hover:bg-blue-900/60"
									title="Nível"
								>
									<GraduationCap
										className="h-3.5 w-3.5 opacity-70"
										strokeWidth={2.5}
									/>
									<span className="text-[13px] font-semibold tracking-tight">
										Nvl {userLevel}
									</span>
								</div>

								{/* Gems / PobreCoins */}
								<div
									className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50/80 dark:bg-amber-950/50 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 font-sans shadow-sm transition-all group cursor-default hover:bg-amber-100/80 dark:hover:bg-amber-900/60"
									title="Pobrecoins"
								>
									<Coins
										className="h-3.5 w-3.5 text-amber-500 group-hover:animate-bounce"
										strokeWidth={2.5}
									/>
									<span className="text-[13px] font-bold tabular-nums tracking-tight">
										{gems}
									</span>
								</div>
							</div>

							<Separator
								orientation="vertical"
								className="h-6 bg-border/60 hidden sm:block"
							/>

							{/* Caixa de notificações */}
							<NotificationCenter />

							{/* Theme Switcher */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9 text-muted-foreground hover:text-foreground transition-all hover:bg-muted/50 active:scale-95 flex items-center justify-center"
									>
										{theme === "light" && (
											<Sun className="h-5 w-5 transition-all text-amber-500" />
										)}
										{theme === "dark" && (
											<Moon className="h-5 w-5 transition-all text-blue-400" />
										)}
										{theme === "pobre-lingo" && (
											<Sparkles className="h-5 w-5 text-amber-500 animate-pulse transition-all" />
										)}
										<span className="sr-only">Alternar tema</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-44">
									<DropdownMenuItem
										onClick={() => setTheme("light")}
										className="gap-2 cursor-pointer"
									>
										<Sun className="h-4 w-4" />
										<span>Claro</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setTheme("dark")}
										className="gap-2 cursor-pointer"
									>
										<Moon className="h-4 w-4" />
										<span>Escuro</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => setTheme("pobre-lingo")}
										className="gap-2 cursor-pointer"
									>
										<Sparkles className="h-4 w-4" />
										<span>PobreLingo</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</header>

					<div className="flex-1 overflow-y-auto bg-muted/5 dark:bg-background smooth-scroll min-h-0">
						<div className="container mx-auto px-3 pt-4 pb-32 sm:pb-28 lg:pb-8 sm:px-6 sm:py-6 lg:px-8 max-w-7xl animate-in fade-in duration-500">
							<Outlet />
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
			<GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
			<div className="md:hidden">
				<MobileNav />
			</div>
			<PWAInstallPrompt />
			<PobrelingoAssistant />
			<Toaster />
		</div>
	);
}
