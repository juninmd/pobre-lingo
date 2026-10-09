import { GraduationCap, Search as SearchIcon, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LearningStreakDisplay } from "@/components/streaks/LearningStreakDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInput,
	useSidebar,
} from "@/components/ui/sidebar";
import { NavGroupList } from "./NavGroupList";

// Agrupamento de navegação por categorias
export { allNavItems, navGroups } from "./navigationData";

import { allNavItems, navGroups } from "./navigationData";

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
					<NavGroupList
						groups={filteredGroups}
						isCollapsed={isCollapsed}
						pathname={pathname}
						handleLinkClick={handleLinkClick}
					/>
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
