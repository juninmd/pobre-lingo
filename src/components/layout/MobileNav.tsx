import { BookMarked, BookOpen, Brain, Compass, Gamepad2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSrs } from "@/hooks/useSrs";
import { cn } from "@/lib/utils";

export function MobileNav() {
	const { pathname } = useLocation();
	const { stats } = useSrs();

	const navItems = [
		{ href: "/", label: "Jornada", icon: Compass, badge: 0 },
		{ href: "/review", label: "Revisar", icon: Brain, badge: stats.due },
		{ href: "/arcade", label: "Jogos", icon: Gamepad2, badge: 0 },
		{ href: "/rules", label: "Regras", icon: BookOpen, badge: 0 },
		{ href: "/dictionary", label: "Dicionário", icon: BookMarked, badge: 0 },
	];

	return (
		<div
			className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] pointer-events-none"
			style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}
		>
			<div className="mx-3 mb-2 pointer-events-auto">
				<nav
					aria-label="Navegação principal móvel"
					className="flex justify-around items-center h-[4.5rem] px-1.5 bg-background/95 backdrop-blur-2xl border border-border/50 shadow-lg rounded-[1.75rem] ring-1 ring-border/10 relative overflow-hidden supports-[backdrop-filter]:bg-background/90"
				>
					{/* Subtle gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent pointer-events-none" />

					{navItems.map((item) => {
						const isActive =
							pathname === item.href ||
							(item.href !== "/" && pathname.startsWith(item.href));

						return (
							<Link
								key={item.href}
								to={item.href}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"relative flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 touch-manipulation select-none group active:scale-95",
									isActive
										? "-translate-y-1.5"
										: "hover:scale-105 active:scale-95",
								)}
							>
								{/* Active indicator glow */}
								{isActive && (
									<div className="absolute -top-12 pointer-events-none">
										<div className="w-14 h-14 rounded-full bg-primary/25 dark:bg-primary/20 blur-2xl animate-pulse" />
									</div>
								)}

								{/* Icon container */}
								<div
									className={cn(
										"relative flex items-center justify-center p-3 rounded-[1.125rem] transition-all duration-300 will-change-transform",
										isActive
											? "bg-gradient-to-br from-primary to-primary/90 text-white shadow-lg shadow-primary/40 dark:shadow-primary/30 scale-105"
											: "bg-transparent text-muted-foreground group-hover:bg-muted/80 group-hover:text-primary group-active:bg-muted",
									)}
								>
									{/* Shimmer effect on active */}
									{isActive && (
										<div className="absolute inset-0 rounded-[1.125rem] bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
									)}
									<item.icon
										className={cn(
											"h-[1.375rem] w-[1.375rem] transition-all duration-300 relative z-10",
											isActive && "scale-110 drop-shadow-sm",
										)}
									/>
									{item.badge > 0 && (
										<span className="absolute -top-1 -right-1 z-20 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-background tabular-nums">
											{item.badge > 9 ? "9+" : item.badge}
										</span>
									)}
								</div>

								{/* Label */}
								<span
									className={cn(
										"text-[0.625rem] font-bold tracking-wide transition-all duration-300 tabular-nums",
										isActive
											? "text-primary dark:text-primary opacity-100 scale-105 translate-y-0.5"
											: "text-muted-foreground/80 opacity-75 group-hover:opacity-100 group-hover:text-foreground",
									)}
								>
									{item.label}
								</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);
}
