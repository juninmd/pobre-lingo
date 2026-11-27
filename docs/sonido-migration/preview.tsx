import { EmptyState } from "@juninmd/sonido";
import {
	Bell,
	BookMarked,
	BookOpen,
	Flame,
	Play,
	Sparkles,
	Trophy,
} from "lucide-react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../../src/globals.css";
import { Badge } from "../../src/components/ui/badge";
import { Button } from "../../src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../src/components/ui/card";
import { Progress } from "../../src/components/ui/progress";
import { Badge as LegacyBadge } from "./legacy/Badge";
import { Button as LegacyButton } from "./legacy/Button";
import {
	Card as LegacyCard,
	CardContent as LegacyCardContent,
	CardDescription as LegacyCardDescription,
	CardFooter as LegacyCardFooter,
	CardHeader as LegacyCardHeader,
	CardTitle as LegacyCardTitle,
} from "./legacy/Card";
import { NotebookEmpty } from "./legacy/NotebookEmpty";
import { Progress as LegacyProgress } from "./legacy/Progress";
import "./preview.css";

const THEME =
	new URLSearchParams(location.search).get("theme") === "light"
		? "light"
		: "pobre-lingo";
const root = document.documentElement;
root.classList.remove("light", "dark", "pobre-lingo");
if (THEME === "light") {
	root.classList.add("light");
	root.setAttribute("data-theme", "light");
} else {
	root.classList.add("dark", "pobre-lingo");
	root.setAttribute("data-theme", "canto");
}

function Row({
	title,
	hint,
	before,
	after,
	beforeFile,
	afterFile,
}: {
	title: string;
	hint: string;
	before: ReactNode;
	after: ReactNode;
	beforeFile: string;
	afterFile: string;
}) {
	return (
		<section className="pv-row">
			<div className="pv-row__head">
				<h2>{title}</h2>
				<p>{hint}</p>
			</div>
			<div className="pv-cols">
				<div className="pv-col pv-col--before">
					<h3>Antes · componente do pobre-lingo</h3>
					<div className="pv-stage">{before}</div>
					<code className="pv-file">{beforeFile}</code>
				</div>
				<div className="pv-col pv-col--after">
					<h3>Depois · @juninmd/sonido</h3>
					<div className="pv-stage">{after}</div>
					<code className="pv-file">{afterFile}</code>
				</div>
			</div>
		</section>
	);
}

function Buttons({ Legacy }: { Legacy: boolean }) {
	const B = Legacy ? LegacyButton : Button;
	return (
		<>
			<div className="pv-stack">
				<div className="pv-actions">
					<B variant="gamified" className="gap-2">
						<Play className="h-4 w-4" />
						Jogar agora
					</B>
					<B className="gap-2">
						<BookOpen className="h-4 w-4" />
						Continuar lição
					</B>
					<B variant="outline">Rever palavras</B>
				</div>
				<div className="pv-actions">
					<B variant="secondary" size="sm">
						Praticar
					</B>
					<B variant="ghost" size="icon" aria-label="Notificações">
						<Bell className="h-4 w-4" />
					</B>
					<B variant="link">Ver histórico</B>
					<B variant="outline" disabled>
						Indisponível
					</B>
				</div>
			</div>
			<p className="pv-note">
				<Sparkles className="h-3.5 w-3.5" /> toque, hover e foco preservados
			</p>
		</>
	);
}

function Badges({ Legacy }: { Legacy: boolean }) {
	const B = Legacy ? LegacyBadge : Badge;
	return (
		<div className="pv-stack">
			<div className="pv-actions">
				<B>B2</B>
				<B variant="secondary">12 regras</B>
				<B variant="outline">gramática</B>
				<B variant="destructive">2 erros</B>
			</div>
			<div className="pv-actions">
				{Legacy ? (
					<LegacyButton
						variant="ghost"
						size="icon"
						className="relative"
						aria-label="Notificações, 3 não lidas"
					>
						<Bell className="h-4 w-4" />
						<span
							aria-hidden="true"
							className="absolute -top-0.5 -right-0.5 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-red-600 text-[11px] font-bold text-white flex items-center justify-center shadow-sm ring-2 ring-background tabular-nums"
						>
							3
						</span>
					</LegacyButton>
				) : (
					<Button
						variant="ghost"
						size="icon"
						className="relative"
						aria-label="Notificações, 3 não lidas"
					>
						<Bell className="h-4 w-4" />
						<Badge
							appearance="count"
							aria-hidden="true"
							className="absolute -top-0.5 -right-0.5 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-red-600 text-[11px] font-bold text-white shadow-sm ring-2 ring-background tabular-nums"
						>
							3
						</Badge>
					</Button>
				)}
				<span className="pv-note">contador da notificação</span>
			</div>
		</div>
	);
}

function Cards({ Legacy }: { Legacy: boolean }) {
	const C = Legacy ? LegacyCard : Card;
	const H = Legacy ? LegacyCardHeader : CardHeader;
	const T = Legacy ? LegacyCardTitle : CardTitle;
	const D = Legacy ? LegacyCardDescription : CardDescription;
	const Body = Legacy ? LegacyCardContent : CardContent;
	const F = Legacy ? LegacyCardFooter : CardFooter;
	const B = Legacy ? LegacyButton : Button;
	const P = Legacy ? LegacyProgress : Progress;
	return (
		<C className="glass-card">
			<H>
				<T className="text-base flex items-center gap-2">
					<Flame className="h-4 w-4 text-primary" />
					Ofensiva de 7 dias
				</T>
				<D>Você estudou 6 dos últimos 7 dias.</D>
			</H>
			<Body className="space-y-3">
				<P value={86} aria-label="Meta semanal" />
				<p className="text-xs text-muted-foreground">
					6 de 7 dias · 42 min hoje
				</p>
			</Body>
			<F>
				<B size="sm" variant="outline">
					Ver progresso
				</B>
			</F>
		</C>
	);
}

function ProgressRows({ Legacy }: { Legacy: boolean }) {
	const P = Legacy ? LegacyProgress : Progress;
	return (
		<div className="pv-stack">
			{[
				["Módulo 3", 32],
				["Conquistas", 68],
				["Meta diária", 94],
			].map(([label, value]) => (
				<div key={String(label)} className="pv-progress">
					<div className="pv-progress__label">
						<span>{label}</span>
						<span>{value}%</span>
					</div>
					<P value={Number(value)} className="h-2" aria-label={String(label)} />
				</div>
			))}
		</div>
	);
}

function Empties({ Legacy }: { Legacy: boolean }) {
	if (Legacy) return <NotebookEmpty />;
	return (
		<EmptyState
			className="py-10"
			icon={<BookMarked className="w-6 h-6 opacity-70" />}
			title="Nenhuma palavra salva ainda."
			description="No Dicionário, clique no ícone de marcador para salvar uma palavra."
		/>
	);
}

function App() {
	return (
		<main className="pv-page">
			<header className="pv-head">
				<p className="pv-kicker">pobre-lingo · @juninmd/sonido 2.4.0</p>
				<h1>Primitivas do app × design system</h1>
				<p>
					Mesmo CSS e mesmos tokens da aplicação (tema{" "}
					{THEME === "light" ? "claro" : "esmeralda"}, dados fictícios).
				</p>
			</header>

			<Row
				title="Button"
				hint="variantes primary, outline, ghost, link e gamified, size sm/icon e disabled"
				before={<Buttons Legacy />}
				after={<Buttons Legacy={false} />}
				beforeFile="src/components/ui/button.tsx (origin/master)"
				afterFile="src/components/ui/button.tsx → Sonido Button"
			/>
			<Row
				title="Badge"
				hint="pílulas de categoria e o contador compacto da notificação"
				before={<Badges Legacy />}
				after={<Badges Legacy={false} />}
				beforeFile="src/components/ui/badge.tsx (origin/master)"
				afterFile="Badge + appearance=&quot;count&quot;"
			/>
			<Row
				title="Card"
				hint="superfície, borda, raio e sombra vêm do Card do Sonido"
				before={<Cards Legacy />}
				after={<Cards Legacy={false} />}
				beforeFile="src/components/ui/card.tsx (origin/master)"
				afterFile="Card surface=&quot;solid&quot;"
			/>
			<Row
				title="Progress"
				hint="barra de 0–100 com aria-label e altura por className"
				before={<ProgressRows Legacy />}
				after={<ProgressRows Legacy={false} />}
				beforeFile="src/components/ui/progress.tsx (origin/master)"
				afterFile="ProgressBar (0–1, label obrigatório)"
			/>
			<Row
				title="EmptyState"
				hint="Caderninho vazio: ícone, título e descrição"
				before={<Empties Legacy />}
				after={<Empties Legacy={false} />}
				beforeFile="src/pages/NotebookPage.tsx (origin/master)"
				afterFile="EmptyState do Sonido"
			/>

			<footer className="pv-foot">
				<Trophy className="h-4 w-4" />
				Capturas em 1180×900 @2x, full page, com dados fictícios.
			</footer>
		</main>
	);
}

const el = document.getElementById("root");
if (!el) throw new Error("missing #root");
createRoot(el).render(<App />);
