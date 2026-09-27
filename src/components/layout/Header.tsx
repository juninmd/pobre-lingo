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
import { BrandMark } from "@/components/layout/BrandMark";
import { useGamification } from "@/contexts/GamificationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
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
		<header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-1.5 sm:gap-3 md:gap-4 border-b bg-background/80 backdrop-blur-xl px-3 sm:px-4 md:px-6 glass supports-[backdrop-filter]:bg-background/70">
			<div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
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

				<BrandMark className="md:hidden shrink-0" />

				<Separator
					orientation="vertical"
					className="h-6 hidden md:block bg-border/60"
				/>

				<div className="hidden sm:flex items-center gap-2.5 min-w-0">
					<span className="hidden lg:inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-violet to-brand-aqua" />
					<h1 className="font-headline font-semibold text-base md:text-lg truncate">
						{getCurrentPageTitle()}
					</h1>
				</div>
			</div>

			<div className="flex-1 flex justify-center max-w-md mx-auto min-w-0 px-1">
				{/* Barra de Pesquisa Global */}
				<GlobalSearchTrigger onClick={() => onSearchOpen()} />
			</div>

			<div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
				{/* Gamification Stats */}
				<div className="flex items-center gap-2 sm:gap-4 font-sans">
					{/* Level Badge */}
					<div
						className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/20 text-primary font-sans shadow-sm transition-all hover:bg-primary/15"
						title="Nível"
					>
						<GraduationCap className="h-4 w-4 opacity-70" strokeWidth={1.5} />
						<span className="text-[13px] font-semibold tracking-tight">
							Nvl {userLevel}
						</span>
					</div>

					{/* Gems / PobreCoins */}
					<div
						className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-50/50 dark:bg-amber-950/40 backdrop-blur-xl border border-amber-200/30 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 font-sans shadow-sm transition-all group cursor-default hover:bg-amber-50/70 dark:hover:bg-amber-900/50"
						title="Pobrecoins"
					>
						<Coins
							className="h-4 w-4 text-amber-500 group-hover:animate-bounce"
							strokeWidth={1.5}
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
