import { Header } from "./components/layout/Header";
import { NavMenu, allNavItems } from "./components/layout/NavMenu";
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
					<Header onSearchOpen={() => setSearchOpen(true)} />

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
