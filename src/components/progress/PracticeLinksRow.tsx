import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LINKS: { label: string; href: string }[] = [
	{ label: "Biblioteca", href: "/library" },
	{ label: "Listening Lab", href: "/listening-lab" },
	{ label: "Tutor", href: "/tutor" },
	{ label: "Fluência", href: "/fluency" },
	{ label: "Escrita", href: "/writing" },
	{ label: "Revisão", href: "/review" },
];

export function PracticeLinksRow() {
	return (
		<nav aria-label="Praticar cada habilidade" className="flex flex-wrap gap-2">
			{LINKS.map((link) => (
				<Button key={link.href} asChild size="sm" variant="outline">
					<Link to={link.href}>{link.label}</Link>
				</Button>
			))}
		</nav>
	);
}
