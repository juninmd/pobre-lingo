import { Flame, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Pobrelingo } from "@/components/mascot/Pobrelingo";
import { useLearningStreak } from "@/hooks/useLearningStreak";
import { cn } from "@/lib/utils";
import { NAV_TABS, tabForPath } from "./navTabs";

/**
 * As quatro abas. Uma só <nav>: barra fixa embaixo no celular, trilho fino
 * à esquerda do md para cima (com mascote, busca ⌘K e sequência).
 */
export function TabNav({ onSearchOpen }: { onSearchOpen: () => void }) {
	const { pathname } = useLocation();
	const active = tabForPath(pathname);
	const { streak } = useLearningStreak();

	return (
		<nav
			aria-label="Menu principal"
			className="tab-nav fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 backdrop-blur-xl md:static md:z-auto md:flex md:h-full md:w-24 md:shrink-0 md:flex-col md:items-center md:gap-6 md:border-t-0 md:border-r md:py-5"
		>
			<Link
				to="/"
				aria-label="PobreLingo, início"
				className="hidden md:block rounded-2xl"
			>
				<Pobrelingo width={48} height={48} decorative animated />
			</Link>

			<ul className="grid grid-cols-4 md:flex md:flex-col md:gap-2">
				{NAV_TABS.map((tab) => {
					const on = tab.id === active;
					return (
						<li key={tab.id}>
							<Link
								to={tab.href}
								aria-current={on ? "page" : undefined}
								data-active={on || undefined}
								className="tab-link group flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground data-[active]:text-foreground md:w-16 md:py-3"
							>
								<span
									className={cn(
										"grid h-9 w-12 place-items-center rounded-full transition-[background-color,transform] duration-300",
										on && "tab-pill bg-primary text-primary-foreground",
									)}
								>
									<tab.icon className="h-5 w-5" aria-hidden="true" />
								</span>
								{tab.label}
							</Link>
						</li>
					);
				})}
			</ul>

			<div className="hidden md:mt-auto md:flex md:flex-col md:items-center md:gap-3">
				<button
					type="button"
					onClick={onSearchOpen}
					aria-label="Buscar qualquer tela (Ctrl+K)"
					className="press press-muted grid h-11 w-11 place-items-center rounded-2xl border bg-background text-muted-foreground hover:text-foreground"
				>
					<Search className="h-5 w-5" aria-hidden="true" />
				</button>
				<div
					className="flex flex-col items-center text-coral"
					title={`${streak} ${streak === 1 ? "dia seguido" : "dias seguidos"}`}
				>
					<Flame className="h-5 w-5" aria-hidden="true" />
					<span className="pixel-num text-sm">{streak}</span>
					<span className="sr-only">dias seguidos</span>
				</div>
			</div>
		</nav>
	);
}
