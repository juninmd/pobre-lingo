import type { CanDoStatement } from "@/lib/levelCheckpoints";

export function CanDoChecklist({
	statements,
	isChecked,
	onToggle,
}: {
	statements: CanDoStatement[];
	isChecked: (id: string) => boolean;
	onToggle: (id: string) => void;
}) {
	return (
		<fieldset className="space-y-2">
			<legend className="font-semibold text-sm mb-2">
				Minha autoavaliação
			</legend>
			<p className="text-sm text-muted-foreground">
				Marque o que você já consegue realizar. Essa declaração é sua; confirme
				com produções e feedback.
			</p>
			{statements.map((statement) => (
				<label
					key={statement.id}
					className="flex items-start gap-2 rounded-lg p-2 text-sm cursor-pointer"
				>
					<input
						type="checkbox"
						checked={isChecked(statement.id)}
						className="mt-1 accent-primary"
						onChange={() => onToggle(statement.id)}
					/>
					<span>{statement.text}</span>
				</label>
			))}
		</fieldset>
	);
}
