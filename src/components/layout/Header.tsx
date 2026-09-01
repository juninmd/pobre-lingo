import { Coins, GraduationCap, Menu, Moon, Sparkles, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import { GlobalSearchTrigger } from "@/components/common/GlobalSearch";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { useGamification } from "@/contexts/GamificationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { allNavItems } from "./NavMenu";

export function Header({ onSearchOpen }: { onSearchOpen: () => void }) {
	const { theme, setTheme } = useTheme();
	const { gems } = useGamification();
	const { userLevel } = useCurriculumProgress();
	const location = useLocation();

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
				<GlobalSearchTrigger onClick={() => onSearchOpen()} />
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
	);
}
