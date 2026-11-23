import { MonitorUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEnglishVoiceStatus } from "@/lib/desktop/voiceSupport";

async function autostart() {
	return import("@tauri-apps/plugin-autostart");
}

/** Comportamento do app no Windows: início com o sistema e bandeja. */
export function DesktopShellCard() {
	const [enabled, setEnabled] = useState(false);
	const [failed, setFailed] = useState(false);
	const voice = useEnglishVoiceStatus();

	useEffect(() => {
		autostart()
			.then((m) => m.isEnabled())
			.then(setEnabled)
			.catch(() => setFailed(true));
	}, []);

	const toggle = async (next: boolean) => {
		try {
			const m = await autostart();
			await (next ? m.enable() : m.disable());
			setEnabled(next);
			setFailed(false);
		} catch {
			setFailed(true);
		}
	};

	return (
		<Card className="glass-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<MonitorUp className="h-5 w-5 text-primary" aria-hidden="true" />
					App no Windows
				</CardTitle>
				<CardDescription>
					Fechar a janela deixa o app na bandeja, para os lembretes seguirem
					ativos. Para sair de vez, use Sair no menu da bandeja.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<Label htmlFor="autostart" className="font-semibold">
							Iniciar com o Windows
						</Label>
						<p className="mt-1 text-xs text-muted-foreground">
							Abre minimizado na bandeja ao ligar o computador.
						</p>
					</div>
					<Switch id="autostart" checked={enabled} onCheckedChange={toggle} />
				</div>
				<p className="text-xs text-muted-foreground">
					Atalho global para salvar uma palavra copiada: Ctrl + Alt + D.
				</p>
				{voice === "missing" && (
					<p role="status" className="rounded-xl bg-muted/40 p-3 text-xs">
						Nenhuma voz em inglês instalada no Windows, então o áudio das
						palavras sairá com a pronúncia errada. Instale em Configurações
						do Windows &gt; Hora e idioma &gt; Idioma e região &gt; English &gt;
						Opções de idioma &gt; Fala.
					</p>
				)}
				{failed && (
					<p role="alert" className="text-sm text-destructive">
						Não foi possível alterar essa opção agora.
					</p>
				)}
			</CardContent>
		</Card>
	);
}
