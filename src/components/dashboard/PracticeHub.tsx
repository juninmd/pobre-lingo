import {
	AudioLines,
	BookOpen,
	Bot,
	Compass,
	Flag,
	Gamepad2,
	Library,
	type LucideIcon,
	Mic,
	PenLine,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PronunciationWidget } from "@/components/dashboard/PronunciationWidget";

type PracticeLink = {
	to: string;
	title: string;
	description: string;
	icon: LucideIcon;
};

const PRACTICES: PracticeLink[] = [
	{
		to: "/tutor",
		title: "Tutor de conversa",
		description: "Converse com uma IA que roda no seu aparelho",
		icon: Bot,
	},
	{
		to: "/pronunciation",
		title: "Pronúncia",
		description: "TH, schwa, -ed e os sons que o brasileiro troca",
		icon: AudioLines,
	},
	{
		to: "/tracks",
		title: "Trilhas por objetivo",
		description: "Inglês para viagem e para o trabalho",
		icon: Compass,
	},
	{
		to: "/reading",
		title: "Leitura & Escuta",
		description: "Textos graduados com áudio",
		icon: BookOpen,
	},
	{
		to: "/vocabulary",
		title: "Vocabulário",
		description: "As palavras mais frequentes, por nível",
		icon: Library,
	},
	{
		to: "/fluency",
		title: "Fluência",
		description: "4/3/2 cronometrado e shadowing",
		icon: Mic,
	},
	{
		to: "/writing",
		title: "Escrita & Ditado",
		description: "Ditado e redação com correção",
		icon: PenLine,
	},
	{
		to: "/checkpoints",
		title: "Checkpoints",
		description: "Prove seu nível e libere o próximo",
		icon: Flag,
	},
	{
		to: "/arcade",
		title: "Arcade",
		description: "Jogos para fixar vocabulário",
		icon: Gamepad2,
	},
];

export function PracticeHub() {
	return (
		<section aria-labelledby="practice-hub-title" className="space-y-4 mt-8">
			<h3
				id="practice-hub-title"
				className="text-2xl font-bold text-foreground tracking-tight"
			>
				Pratique além da trilha
			</h3>
			<ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
				{PRACTICES.map(({ to, title, description, icon: Icon }) => (
					<li key={to}>
						<Link
							to={to}
							className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							<span className="rounded-lg bg-primary/10 p-2 text-primary">
								<Icon className="h-5 w-5" aria-hidden="true" />
							</span>
							<span className="min-w-0">
								<span className="block font-semibold text-foreground">
									{title}
								</span>
								<span className="block text-sm text-muted-foreground">
									{description}
								</span>
							</span>
						</Link>
					</li>
				))}
			</ul>
			<PronunciationWidget />
		</section>
	);
}
