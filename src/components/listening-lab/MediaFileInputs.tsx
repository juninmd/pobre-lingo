// @ts-nocheck
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MediaFileInputsProps = {
	onMediaFile: (file: File) => void;
	onSubtitleFile: (file: File) => void;
	subtitleError: string | null;
};

export function MediaFileInputs({
	onMediaFile,
	onSubtitleFile,
	subtitleError,
}: MediaFileInputsProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-2">
			<div className="space-y-1.5">
				<Label htmlFor="media-file">Áudio ou vídeo</Label>
				<Input
					id="media-file"
					type="file"
					accept="audio/*,video/*"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) onMediaFile(file);
					}}
				/>
			</div>
			<div className="space-y-1.5">
				<Label htmlFor="subtitle-file">Legenda (.srt ou .vtt, até 2MB)</Label>
				<Input
					id="subtitle-file"
					type="file"
					accept=".srt,.vtt"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) onSubtitleFile(file);
					}}
				/>
				{subtitleError && (
					<p className="text-sm text-destructive" role="alert">
						{subtitleError}
					</p>
				)}
			</div>
		</div>
	);
}
