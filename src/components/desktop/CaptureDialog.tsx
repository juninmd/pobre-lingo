import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildCaptureCard } from "@/lib/desktop/capture";
import { upsertCard } from "@/lib/srs";
import { updateCards } from "@/lib/srsStore";

interface CaptureDialogProps {
	initialText: string;
	onClose: () => void;
}

/** Cria um card de revisão com o texto copiado em outro app (atalho Ctrl+Alt+D). */
export function CaptureDialog({ initialText, onClose }: CaptureDialogProps) {
	const [front, setFront] = useState(initialText);
	const [back, setBack] = useState("");
	const card = buildCaptureCard(front, back);

	const save = () => {
		if (!card) return;
		updateCards((cards) => upsertCard(cards, card));
		onClose();
	};

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Salvar para revisar</DialogTitle>
					<DialogDescription>
						Texto copiado de outro app. Ele entra na sua fila de revisão.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-3">
					<Label htmlFor="capture-front">Em inglês</Label>
					<Input
						id="capture-front"
						value={front}
						onChange={(e) => setFront(e.target.value)}
					/>
					<Label htmlFor="capture-back">Significado</Label>
					<Input
						id="capture-back"
						value={back}
						autoFocus
						onChange={(e) => setBack(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && save()}
					/>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button disabled={!card} onClick={save}>
						Salvar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
