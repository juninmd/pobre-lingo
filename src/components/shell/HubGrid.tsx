import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { HubLink, HubTone } from "./hubData";

const TONE: Record<HubTone, string> = {
	violet: "bg-brand-violet text-ink",
	aqua: "bg-brand-aqua text-ink",
	gold: "bg-gold text-gold-foreground",
	coral: "bg-coral text-white dark:text-ink",
};

interface HubGridProps {
	title: string;
	eyebrow?: string;
	links: HubLink[];
	className?: string;
}

/** Seção de portas de um hub: cada cartão leva a uma tela do app. */
export function HubGrid({ title, eyebrow, links, className }: HubGridProps) {
	const id = `hub-${title.toLowerCase().replace(/\W+/g, "-")}`;
	return (
		<section aria-labelledby={id} className={cn("space-y-3", className)}>
			<div>
				{eyebrow && <p className="eyebrow">{eyebrow}</p>}
				<h2 id={id} className="text-2xl font-extrabold">
					{title}
				</h2>
			</div>
			<ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{links.map((link, i) => (
					<li
						key={link.href}
						className="reveal"
						style={{ "--i": i } as CSSProperties}
					>
						<Link
							to={link.href}
							className="lift group flex h-full items-center gap-3 rounded-2xl border bg-card p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							<span
								className={cn(
									"grid h-11 w-11 shrink-0 place-items-center rounded-xl",
									TONE[link.tone],
								)}
							>
								<link.icon className="h-5 w-5" aria-hidden="true" />
							</span>
							<span className="min-w-0 flex-1">
								<span className="block font-semibold">{link.title}</span>
								<span className="block text-sm text-muted-foreground">
									{link.description}
								</span>
							</span>
							<ArrowUpRight
								className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
								aria-hidden="true"
							/>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
