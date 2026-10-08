import { BookA, BookOpen, Brain, Gamepad2, Map as MapIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSrs } from "@/hooks/useSrs";
import { cn } from "@/lib/utils";

const ITEMS = [
	{ href: "/", label: "Jornada", icon: MapIcon },
	{ href: "/review", label: "Revisar", icon: Brain },
	{ href: "/arcade", label: "Jogos", icon: Gamepad2 },
	{ href: "/rules", label: "Regras", icon: BookOpen },
	{ href: "/dictionary", label: "Dicionário", icon: BookA },
];

/** Barra inferior de navegação: visível só em telas pequenas. */
export function MobileNav() {
	const { pathname } = useLocation();
	const { stats } = useSrs();
	const due = stats.due;

	return (
		<nav
			aria-label="Navegação principal"
			className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur pb-safe"
		>
			<ul className="flex items-stretch justify-around">
				{ITEMS.map(({ href, label, icon: Icon }) => {
					const active =
						href === "/" ? pathname === "/" : pathname.startsWith(href);
					return (
						<li key={href} className="flex-1">
							<Link
								to={href}
								aria-current={active ? "page" : undefined}
								className={cn(
									"relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary",
									active ? "text-primary" : "text-muted-foreground",
								)}
							>
								<Icon className="h-5 w-5" aria-hidden="true" />
								<span>{label}</span>
								{href === "/review" && due > 0 && (
									<span className="absolute right-1/4 top-1.5 min-w-4 rounded-full bg-destructive px-1 text-center text-[11px] leading-4 text-destructive-foreground">
										{due}
									</span>
								)}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
