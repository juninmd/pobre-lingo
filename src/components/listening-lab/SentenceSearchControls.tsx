import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { CEFRLevel } from "@/lib/curriculumData";
import { CEFR_ORDER } from "@/lib/levels";

type SentenceSearchControlsProps = {
	level: CEFRLevel;
	onLevelChange: (level: CEFRLevel) => void;
	topic: string;
	onTopicChange: (topic: string) => void;
	onSearch: () => void;
	loading: boolean;
	hasResults: boolean;
};

export function SentenceSearchControls({
	level,
	onLevelChange,
	topic,
	onTopicChange,
	onSearch,
	loading,
	hasResults,
}: SentenceSearchControlsProps) {
	return (
		<div className="flex flex-wrap items-end gap-2">
			<Select
				value={level}
				onValueChange={(v) => onLevelChange(v as CEFRLevel)}
			>
				<SelectTrigger className="w-24" aria-label="Nível CEFR">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{CEFR_ORDER.map((lvl) => (
						<SelectItem key={lvl} value={lvl}>
							{lvl}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Input
				value={topic}
				onChange={(e) => onTopicChange(e.target.value)}
				placeholder="Tema (opcional): airport, work..."
				aria-label="Tema"
				className="max-w-xs"
			/>
			<Button onClick={onSearch} disabled={loading}>
				{hasResults ? "Buscar mais" : "Buscar frases"}
			</Button>
		</div>
	);
}
