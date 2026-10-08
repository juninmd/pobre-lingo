import { AlertTriangle, Trash2 } from "lucide-react";
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
import { collectAppStorage } from "@/lib/backup";

export function ResetProgressDialog() {
	const handleReset = () => {
		for (const key of Object.keys(collectAppStorage())) {
			localStorage.removeItem(key);
		}
		window.location.href = "/";
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="outline"
					className="gap-2 text-destructive border-destructive/40 hover:bg-destructive/10"
				>
					<Trash2 className="h-4 w-4" aria-hidden="true" />
					Apagar tudo
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-destructive" />
						Apagar todo o progresso?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Ofensiva, XP, PobreCoins, conquistas, cards de revisão e caderninho
						serão perdidos. Não dá para desfazer.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleReset}
						className="bg-destructive hover:bg-destructive/90"
					>
						Apagar tudo
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
