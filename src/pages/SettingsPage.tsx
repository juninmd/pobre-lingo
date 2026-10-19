import { Bell, Check, Moon, Palette, Sparkles, Sun } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { CloudSyncCard } from "@/components/settings/CloudSyncCard";
import { DataSettingsCard } from "@/components/settings/DataSettingsCard";
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
import { setStreakReminder } from "@/lib/streakReminder";
import { cn } from "@/lib/utils";

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

	const permissionDenied = permission === "denied";
	const unsupported = permission === "unsupported";

	const handleToggleBrowser = async (checked: boolean) => {
		if (!checked) {
			updatePrefs({ browserEnabled: false });
			void setStreakReminder(false);
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

			<CloudSyncCard />
			<DataSettingsCard />
		</PageContainer>
	);
}
