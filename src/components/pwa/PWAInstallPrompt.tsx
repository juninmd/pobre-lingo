import { Download, Plus, Share, X } from "lucide-react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { cn } from "@/lib/utils";

interface PWAInstallPromptProps {
	className?: string;
}

export const PWAInstallPrompt: FC<PWAInstallPromptProps> = ({ className }) => {
	const { isInstallable, isIOS, isInstalled, promptInstall, dismissPrompt } =
		usePWAInstall();

	// Don't show if already installed
	if (isInstalled) return null;

	// Show iOS instructions
	if (isIOS && !isInstalled) {
		return (
			<Card
				className={cn(
					"fixed bottom-mobile-nav left-4 right-4 z-50 border-primary/20 bg-card shadow-lg lg:bottom-4 lg:left-auto lg:right-4 lg:w-96",
					className,
				)}
			>
				<CardContent className="p-4">
					<div className="flex items-start gap-3">
						<div className="rounded-full bg-primary/10 p-2">
							<Download className="h-5 w-5 text-primary" />
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-foreground">
								Instale o PobreLingo
							</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								Para instalar, toque em <Share className="inline h-4 w-4" /> e
								depois em{" "}
								<span className="inline-flex items-center gap-1">
									"Adicionar à Tela Inicial" <Plus className="inline h-4 w-4" />
								</span>
							</p>
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 shrink-0"
							onClick={dismissPrompt}
							aria-label="Fechar"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	// Show install prompt for other browsers
	if (!isInstallable) return null;

	return (
		<Card
			className={cn(
				"fixed bottom-mobile-nav left-4 right-4 z-50 border-primary/20 bg-card shadow-lg lg:bottom-4 lg:left-auto lg:right-4 lg:w-96",
				className,
			)}
		>
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<div className="rounded-full bg-primary/10 p-2">
						<Download className="h-5 w-5 text-primary" />
					</div>
					<div className="flex-1">
						<h3 className="font-semibold text-foreground">
							Instale o PobreLingo
						</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							Instale o app para acesso rápido e experiência offline
						</p>
						<div className="mt-3 flex gap-2">
							<Button size="sm" onClick={promptInstall}>
								Instalar
							</Button>
							<Button size="sm" variant="ghost" onClick={dismissPrompt}>
								Agora não
							</Button>
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 shrink-0"
						onClick={dismissPrompt}
						aria-label="Fechar"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default PWAInstallPrompt;
