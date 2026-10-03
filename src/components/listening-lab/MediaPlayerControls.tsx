// @ts-nocheck
import { Eye, EyeOff, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

type MediaPlayerControlsProps = {
	onRepeat: () => void;
	loop: boolean;
	onToggleLoop: () => void;
	hidden: boolean;
	onToggleHidden: () => void;
	disabled: boolean;
};

export function MediaPlayerControls({
	onRepeat,
	loop,
	onToggleLoop,
	hidden,
	onToggleHidden,
	disabled,
}: MediaPlayerControlsProps) {
	return (
		<div className="flex flex-wrap gap-2">
			<Button
				size="sm"
				variant="outline"
				onClick={onRepeat}
				disabled={disabled}
			>
				<Repeat className="mr-2 h-4 w-4" />
				Repetir fala
			</Button>
			<Button
				size="sm"
				variant={loop ? "secondary" : "outline"}
				onClick={onToggleLoop}
				disabled={disabled}
			>
				Loop na fala
			</Button>
			<Button size="sm" variant="outline" onClick={onToggleHidden}>
				{hidden ? (
					<Eye className="mr-2 h-4 w-4" />
				) : (
					<EyeOff className="mr-2 h-4 w-4" />
				)}
				{hidden ? "Mostrar legenda" : "Esconder legenda"}
			</Button>
		</div>
	);
}
