import { Search as SearchIcon, Sparkles, X } from "lucide-react";
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
import { BrandMark } from "./BrandMark";
import { NavGroupList } from "./NavGroupList";
import { allNavItems, navGroups } from "./navigationData";

export { allNavItems, navGroups };

export function NavMenu() {
	const { pathname } = useLocation();
	const { setOpenMobile, state, isMobile } = useSidebar();
	const [sidebarSearchTerm, setSidebarSearchTerm] = useState("");
	// The mobile drawer is always full width, whatever the desktop state is.
	const isCollapsed = state === "collapsed" && !isMobile;

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
						<SearchIcon
							aria-hidden="true"
							className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sidebar-foreground/50"
						/>
						<SidebarInput
							type="search"
							aria-label="Buscar no menu"
							placeholder="Buscar..."
							value={sidebarSearchTerm}
							onChange={(e) => setSidebarSearchTerm(e.target.value)}
							className="w-full pl-8 h-8 text-xs bg-sidebar-accent/30 border-sidebar-border/50 placeholder:text-sidebar-foreground/50 text-sidebar-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary/50 [data-theme=pobre-lingo]:rounded-xl [data-theme=pobre-lingo]:border-primary/20"
						/>
						{sidebarSearchTerm && (
							<button
								type="button"
								onClick={() => setSidebarSearchTerm("")}
								aria-label="Limpar busca do menu"
								className="absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-foreground/50 hover:text-sidebar-foreground"
							>
								<X className="h-3.5 w-3.5" aria-hidden="true" />
							</button>
						)}
					</div>
				)}
			</SidebarHeader>

			<ScrollArea className="flex-1">
				<SidebarContent className="p-2">
					<nav aria-label="Menu principal">
						<NavGroupList
							groups={filteredGroups}
							isCollapsed={isCollapsed}
							pathname={pathname}
							handleLinkClick={handleLinkClick}
						/>
					</nav>
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
