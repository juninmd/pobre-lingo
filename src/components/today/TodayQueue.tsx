import {
	Bot,
	Brain,
	ChevronRight,
	Disc3,
	MessageCircleHeart,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useSrs } from "@/hooks/useSrs";
import { cn } from "@/lib/utils";
import { loadSave } from "@/lib/wordWheel/logic";

interface QueueItem {
	href: string;
	title: string;
	detail: string;
	badge: string;
	icon: typeof Bot;
	tone: string;
}

/** Fila do dia: revisão, um jogo e uma conversa, na ordem em que valem mais. */
export function TodayQueue() {
	const { dueCards } = useSrs();
	const wheelLevel = loadSave().level + 1;
	const due = dueCards.length;

	const items: QueueItem[] = [
		{
			href: "/review",
			title: due
				? `Revisar ${due} ${due === 1 ? "carta" : "cartas"}`
				: "Revisão em dia",
			detail: due
				? "Repetição espaçada · poucos minutos"
				: "Volte amanhã ou adicione palavras",
			badge: "SRS",
			icon: Brain,
			tone: "bg-brand-violet text-ink",
		},
		{
			href: "/games/word-wheel",
			title: `Roda de Palavras · nível ${wheelLevel}`,
			detail: "Arraste pelas letras · 3 min",
			badge: "ABC",
			icon: Disc3,
			tone: "bg-gold text-gold-foreground",
		},
		{
			href: "/buddy",
			title: "Conversa com a Mika",
			detail: "4 turnos com correção ao vivo",
			badge: "MIK",
			icon: MessageCircleHeart,
			tone: "bg-brand-aqua text-ink",
		},
		{
			href: "/tutor",
			title: "Tutor de conversa",
			detail: "IA no seu aparelho, sem conta",
			badge: "IA",
			icon: Bot,
			tone: "bg-coral text-white dark:text-ink",
		},
	];

	return (
		<section aria-labelledby="today-queue" className="space-y-3">
			<div className="flex items-baseline justify-between">
				<h2 id="today-queue" className="text-2xl font-extrabold">
					Fila do dia
				</h2>
				<span className="eyebrow">{items.length} passos</span>
			</div>
			<ol className="space-y-2">
				{items.map((item, i) => (
					<li
						key={item.href}
						className="reveal"
						style={{ "--i": i } as CSSProperties}
					>
						<Link
							to={item.href}
							className="lift group flex items-center gap-3 rounded-2xl border bg-card p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							<span
								className={cn(
									"pixel-num grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[11px]",
									item.tone,
								)}
								aria-hidden="true"
							>
								{item.badge}
							</span>
							<span className="min-w-0 flex-1">
								<span className="block font-semibold">{item.title}</span>
								<span className="block text-sm text-muted-foreground">
									{item.detail}
								</span>
							</span>
							<ChevronRight
								className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1"
								aria-hidden="true"
							/>
						</Link>
					</li>
				))}
			</ol>
		</section>
	);
}
