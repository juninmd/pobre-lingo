import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { NavigationGroup } from "./navigationData";

interface NavGroupListProps {
	groups: NavigationGroup[];
	isCollapsed: boolean;
	pathname: string;
	handleLinkClick: () => void;
}
export function NavGroupList({
	groups,
	isCollapsed,
	pathname,
	handleLinkClick,
}: NavGroupListProps) {
	return (
		<>
			{groups.map((group, groupIndex) => (
				<div key={group.title} className={groupIndex > 0 ? "mt-4" : ""}>
					{!isCollapsed && (
						<h3 className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-sidebar-foreground/55 [data-theme=pobre-lingo]:text-accent/80 [data-theme=pobre-lingo]:tracking-[0.12em]">
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
													<item.icon className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
													{!isCollapsed && (
														<span className="truncate text-sm">
															{item.label}
														</span>
													)}
													{!isCollapsed && item.badge && (
														<Badge
															variant="secondary"
															className="ml-auto text-[11px] px-1.5 py-0 h-4 bg-accent/20 text-accent-foreground border-0"
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
		</>
	);
}
