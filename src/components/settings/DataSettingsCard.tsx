import { Check, Download, Upload } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { ResetProgressDialog } from "@/components/settings/ResetProgressDialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	hasAnalyticsConsent,
	setAnalyticsConsent,
} from "@/lib/analyticsConsent";
import { collectAppStorage, parseBackup, restoreBackup } from "@/lib/backup";

export function DataSettingsCard() {
	const [exported, setExported] = useState(false);
	const [importError, setImportError] = useState<string | null>(null);
	const [consent, setConsent] = useState(hasAnalyticsConsent);
	const fileInput = useRef<HTMLInputElement>(null);

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
	};

	const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		const result = parseBackup(await file.text());
		if (!result.ok) {
			setImportError(result.error);
			return;
		}
		restoreBackup(result.entries);
		window.location.href = "/";
	};

	const handleConsent = (checked: boolean) => {
		setAnalyticsConsent(checked);
		setConsent(checked);
	};

	return (
		<Card className="glass-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<Download className="h-5 w-5 text-primary" aria-hidden="true" />
					Seus dados
				</CardTitle>
				<CardDescription>
					Todo o seu progresso fica salvo apenas neste navegador. Exporte um
					backup para trocar de aparelho e restaure-o no novo.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5">
				<div className="flex flex-col sm:flex-row flex-wrap gap-3">
					<Button variant="outline" className="gap-2" onClick={handleExport}>
						{exported ? (
							<Check className="h-4 w-4 text-brand-aqua" aria-hidden="true" />
						) : (
							<Download className="h-4 w-4" aria-hidden="true" />
						)}
						{exported ? "Backup baixado" : "Exportar progresso"}
					</Button>
					<Button
						variant="outline"
						className="gap-2"
						onClick={() => fileInput.current?.click()}
					>
						<Upload className="h-4 w-4" aria-hidden="true" />
						Restaurar backup
					</Button>
					<input
						ref={fileInput}
						type="file"
						accept="application/json,.json"
						className="sr-only"
						aria-label="Arquivo de backup"
						onChange={handleImport}
					/>
					<ResetProgressDialog />
				</div>
				{importError && (
					<p role="alert" className="text-sm text-destructive">
						{importError}
					</p>
				)}
				<div className="flex items-start justify-between gap-4">
					<Label htmlFor="analytics-consent" className="space-y-1">
						<span className="block font-semibold">Ajudar a melhorar o app</span>
						<span className="block text-sm font-normal text-muted-foreground">
							Grava sessões anônimas (LogRocket) para achar bugs. Desligado por
							padrão; vale a partir da próxima abertura do app.
						</span>
					</Label>
					<Switch
						id="analytics-consent"
						checked={consent}
						onCheckedChange={handleConsent}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
