import {
	AlertTriangle,
	Bell,
	Check,
	Download,
	Moon,
	Palette,
	Sparkles,
	Sun,
	Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from "@/contexts/NotificationContext";
import { type Theme, useTheme } from "@/contexts/ThemeContext";
import {
	CATEGORY_DESCRIPTIONS,
	CATEGORY_LABELS,
	type NotificationCategory,
} from "@/lib/notifications";
import { cn } from "@/lib/utils";

/** Chaves gravadas pelo app — base para exportar e apagar dados. */
const APP_STORAGE_PREFIXES = ["pobrelingo_", "pl_", "daily_"];

const THEME_OPTIONS: {
	value: Theme;
	label: string;
	icon: typeof Sun;
	hint: string;
}[] = [
	{ value: "light", label: "Claro", icon: Sun, hint: "Alto contraste de dia" },
	{ value: "dark", label: "Escuro", icon: Moon, hint: "Confortável à noite" },
	{
		value: "pobre-lingo",
		label: "PobreLingo",
		icon: Sparkles,
		hint: "Obsidiana, esmeralda e ouro",
	},
];

function collectAppStorage(): Record<string, string> {
	const data: Record<string, string> = {};
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key) continue;
		if (APP_STORAGE_PREFIXES.some((p) => key.startsWith(p))) {
			data[key] = localStorage.getItem(key) ?? "";
		}
	}
	return data;
}

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const {
		prefs,
		permission,
		updatePrefs,
		setCategoryEnabled,
		enableBrowserNotifications,
		notify,
	} = useNotifications();
	const [exported, setExported] = useState(false);
	const exportTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const permissionDenied = permission === "denied";
	const unsupported = permission === "unsupported";

	const handleToggleBrowser = async (checked: boolean) => {
		if (!checked) {
			updatePrefs({ browserEnabled: false });
			return;
		}
		const granted = await enableBrowserNotifications();
		if (granted) {
			notify({
				category: "content",
				title: "Notificações ativadas 🔔",
				body: "É assim que os avisos do PobreLingo vão aparecer para você.",
			});
		}
	};

	const handleExport = () => {
		const blob = new Blob([JSON.stringify(collectAppStorage(), null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `pobrelingo-backup-${new Date().toISOString().slice(0, 10)}.json`;
		link.click();
		URL.revokeObjectURL(url);

		setExported(true);
		if (exportTimer.current) clearTimeout(exportTimer.current);
		exportTimer.current = setTimeout(() => setExported(false), 2500);
	};

	const handleReset = () => {
		for (const key of Object.keys(collectAppStorage())) {
			localStorage.removeItem(key);
		}
		window.location.href = "/";
	};

	return (
		<PageContainer className="space-y-6 max-w-3xl mx-auto">
			<SEO
				title="Configurações"
				description="Ajuste notificações, tema e seus dados no PobreLingo."
			/>

			<PageHeader
				icon={Bell}
				iconClassName="text-primary"
				title="Configurações"
				description="Controle como o PobreLingo te lembra de estudar e como ele se parece."
			/>

			{/* Notificações ------------------------------------------------------ */}
			<Card className="glass-card">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<Bell className="h-5 w-5 text-primary" />
						Notificações
					</CardTitle>
					<CardDescription>
						Lembretes chegam pela caixa de entrada do sino. Ative os avisos do
						navegador para receber também com a aba fechada.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-5">
					<div className="flex items-start justify-between gap-4 rounded-xl border bg-muted/20 p-4">
						<div className="min-w-0">
							<Label htmlFor="browser-notifications" className="font-semibold">
								Avisos do navegador
							</Label>
							<p className="text-xs text-muted-foreground mt-1 leading-relaxed">
								{unsupported
									? "Seu navegador não suporta notificações."
									: permissionDenied
										? "Permissão bloqueada. Libere as notificações nas configurações do site para ativar."
										: "Recebe alertas mesmo com o PobreLingo em segundo plano."}
							</p>
						</div>
						<Switch
							id="browser-notifications"
							checked={prefs.browserEnabled}
							disabled={unsupported || permissionDenied}
							onCheckedChange={handleToggleBrowser}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="reminder-time" className="font-semibold">
							Horário do lembrete diário
						</Label>
						<Input
							id="reminder-time"
							type="time"
							value={prefs.reminderTime}
							onChange={(e) => updatePrefs({ reminderTime: e.target.value })}
							className="w-40"
						/>
						<p className="text-xs text-muted-foreground">
							Se você ainda não tiver estudado até esse horário, mandamos um
							empurrãozinho.
						</p>
					</div>

					<div className="space-y-3">
						<Label className="font-semibold">Tipos de aviso</Label>
						{(Object.keys(CATEGORY_LABELS) as NotificationCategory[]).map(
							(category) => (
								<div
									key={category}
									className="flex items-start justify-between gap-4 rounded-xl border border-border/60 p-3"
								>
									<div className="min-w-0">
										<p className="text-sm font-medium">
											{CATEGORY_LABELS[category]}
										</p>
										<p className="text-xs text-muted-foreground leading-relaxed">
											{CATEGORY_DESCRIPTIONS[category]}
										</p>
									</div>
									<Switch
										checked={prefs.categories[category]}
										onCheckedChange={(v) => setCategoryEnabled(category, v)}
										aria-label={CATEGORY_LABELS[category]}
									/>
								</div>
							),
						)}
					</div>

					<Button
						variant="outline"
						size="sm"
						className="gap-2"
						onClick={() =>
							notify({
								category: "content",
								title: "Teste de notificação ✨",
								body: "Se você está lendo isso no sino, está tudo funcionando.",
							})
						}
					>
						<Bell className="h-3.5 w-3.5" />
						Enviar notificação de teste
					</Button>
				</CardContent>
			</Card>

			{/* Aparência --------------------------------------------------------- */}
			<Card className="glass-card">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<Palette className="h-5 w-5 text-primary" />
						Aparência
					</CardTitle>
					<CardDescription>Escolha o tema da plataforma.</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					{THEME_OPTIONS.map(({ value, label, icon: Icon, hint }) => (
						<button
							key={value}
							type="button"
							onClick={() => setTheme(value)}
							className={cn(
								"rounded-xl border-2 p-4 text-left transition-all active:scale-[0.98]",
								theme === value
									? "border-primary bg-primary/5 shadow-sm"
									: "border-border/60 hover:border-primary/40 hover:bg-muted/40",
							)}
						>
							<div className="flex items-center justify-between mb-1.5">
								<Icon className="h-5 w-5 text-primary" />
								{theme === value && <Check className="h-4 w-4 text-primary" />}
							</div>
							<p className="font-semibold text-sm">{label}</p>
							<p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
						</button>
					))}
				</CardContent>
			</Card>

			{/* Dados ------------------------------------------------------------- */}
			<Card className="glass-card">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<Download className="h-5 w-5 text-primary" />
						Seus dados
					</CardTitle>
					<CardDescription>
						Todo o seu progresso fica salvo apenas neste navegador. Exporte um
						backup antes de limpar o cache ou trocar de aparelho.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col sm:flex-row gap-3">
					<Button variant="outline" className="gap-2" onClick={handleExport}>
						{exported ? (
							<Check className="h-4 w-4 text-emerald-500" />
						) : (
							<Download className="h-4 w-4" />
						)}
						{exported ? "Backup baixado" : "Exportar progresso"}
					</Button>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="outline"
								className="gap-2 text-red-600 border-red-300 hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/30"
							>
								<Trash2 className="h-4 w-4" />
								Apagar tudo
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className="flex items-center gap-2">
									<AlertTriangle className="h-5 w-5 text-red-500" />
									Apagar todo o progresso?
								</AlertDialogTitle>
								<AlertDialogDescription>
									Ofensiva, XP, PobreCoins, conquistas, cards de revisão e
									caderninho serão perdidos. Não dá para desfazer.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleReset}
									className="bg-red-600 hover:bg-red-700"
								>
									Apagar tudo
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</CardContent>
			</Card>
		</PageContainer>
	);
}
