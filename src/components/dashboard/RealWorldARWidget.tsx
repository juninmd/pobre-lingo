import {
	Scan,
	Smartphone,
	CheckCircle2,
	Sparkles,
	Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGamification } from "@/contexts/GamificationContext";

export function RealWorldARWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isScanning, setIsScanning] = useState(false);
	const [scannedItem, setScannedItem] = useState<{
		en: string;
		pt: string;
	} | null>(null);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_ar_scan_claimed") === todayStr);
	}, []);

	const handleScan = () => {
		if (claimed || isScanning) return;
		setIsScanning(true);

		// Simulate AR scanning process
		setTimeout(() => {
			setIsScanning(false);
			setScannedItem({ en: "Coffee Mug", pt: "Caneca de café" });

			// Auto claim after short delay
			setTimeout(() => {
				setClaimed(true);
				addXp(15);
				const todayStr = new Date().toISOString().split("T")[0];
				localStorage.setItem("daily_ar_scan_claimed", todayStr);
			}, 1500);
		}, 2000);
	};

	return (
		<Card
			className="glass-card hover:animate-float group bg-gradient-to-br from-cyan-50/70 to-blue-50/70 dark:from-cyan-950/30 dark:to-blue-950/30 border-cyan-200/50 dark:border-cyan-800/50 shadow-lg hover:shadow-cyan-500/10 relative overflow-hidden"
			style={{ animationDelay: "0.1s" }}
		>
			<div className="absolute -left-4 -bottom-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2024
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
						<Scan className="w-5 h-5" />
						<span>AR Vocab Scanner</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div className="text-sm font-medium text-muted-foreground">
					Aprenda vocabulário escaneando objetos do mundo real com Realidade
					Aumentada.
				</div>

				<div className="relative aspect-[4/3] bg-black/5 dark:bg-white/5 rounded-xl border-2 border-dashed border-cyan-300/50 dark:border-cyan-700/50 flex flex-col items-center justify-center overflow-hidden group-hover:border-cyan-400 dark:group-hover:border-cyan-500 transition-colors">
					{isScanning && (
						<div className="absolute inset-0 z-10 bg-cyan-500/10 flex flex-col items-center justify-center">
							<div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] absolute top-0 animate-scan" />
							<Loader2 className="w-8 h-8 text-cyan-600 dark:text-cyan-400 animate-spin mb-2" />
							<span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 animate-pulse">
								Analisando objeto...
							</span>
						</div>
					)}

					{!isScanning && !scannedItem && (
						<div className="text-center p-4">
							<Smartphone className="w-8 h-8 text-cyan-600/50 dark:text-cyan-400/50 mx-auto mb-2" />
							<span className="text-xs font-bold text-cyan-700/70 dark:text-cyan-300/70">
								Pronto para escanear
							</span>
						</div>
					)}

					{scannedItem && (
						<div className="z-20 p-4 w-full h-full flex flex-col items-center justify-center bg-cyan-50/90 dark:bg-cyan-950/90 backdrop-blur-sm animate-in zoom-in duration-300">
							<div className="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm border border-cyan-100 dark:border-cyan-800 text-center w-full max-w-[80%]">
								<p className="text-xl font-black text-cyan-700 dark:text-cyan-400">
									{scannedItem.en}
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									{scannedItem.pt}
								</p>
							</div>
						</div>
					)}
				</div>

				<Button
					variant={claimed ? "secondary" : "gamified"}
					className={`w-full font-bold shadow-sm ${!claimed ? "bg-cyan-600 hover:bg-cyan-700 text-white" : ""}`}
					onClick={handleScan}
					disabled={claimed || isScanning || !!scannedItem}
				>
					{isScanning ? (
						<span className="flex items-center gap-1.5">Escaneando...</span>
					) : claimed ? (
						<span className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400">
							<CheckCircle2 className="w-4 h-4" />
							Descoberta Feita!
						</span>
					) : !!scannedItem ? (
						<span className="flex items-center gap-1.5 animate-pulse">
							Validando descoberta...
						</span>
					) : (
						<span className="flex items-center gap-2">
							<Scan className="w-4 h-4" /> Escanear Objeto (+15 XP)
						</span>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
