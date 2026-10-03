// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import {
	activeCueIndex,
	type Cue,
	parseSubtitles,
} from "@/lib/input/subtitles";
import { isSubtitleFileValid, mediaKindFor } from "@/lib/listeningLab";
import { CueList } from "./CueList";
import { MediaFileInputs } from "./MediaFileInputs";
import { MediaPlayerControls } from "./MediaPlayerControls";

/** Seu áudio/vídeo + legenda: nada sai do aparelho, tudo roda com blob URLs. */
export function MediaSubtitleTab({
	onPlayingChange,
}: {
	onPlayingChange: (playing: boolean) => void;
}) {
	const [mediaFile, setMediaFile] = useState<File | null>(null);
	const [mediaUrl, setMediaUrl] = useState<string | null>(null);
	const [cues, setCues] = useState<Cue[]>([]);
	const [subtitleError, setSubtitleError] = useState<string | null>(null);
	const [activeIndex, setActiveIndex] = useState(-1);
	const [hidden, setHidden] = useState(false);
	const [loop, setLoop] = useState(false);
	const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

	useEffect(() => {
		return () => {
			if (mediaUrl) URL.revokeObjectURL(mediaUrl);
		};
	}, [mediaUrl]);

	const handleMediaFile = (file: File) => {
		if (mediaUrl) URL.revokeObjectURL(mediaUrl);
		setMediaFile(file);
		setMediaUrl(URL.createObjectURL(file));
	};

	const handleSubtitleFile = async (file: File) => {
		if (!isSubtitleFileValid(file)) {
			setSubtitleError("Arquivo inválido: use .srt/.vtt de até 2MB.");
			setCues([]);
			return;
		}
		setSubtitleError(null);
		setCues(parseSubtitles(await file.text()));
	};

	const handleTimeUpdate = () => {
		const media = mediaRef.current;
		if (!media) return;
		const index = activeCueIndex(cues, media.currentTime);
		setActiveIndex(index);
		if (loop && index >= 0 && media.currentTime >= cues[index].end) {
			media.currentTime = cues[index].start;
		}
	};

	const seek = (start: number) => {
		if (mediaRef.current) mediaRef.current.currentTime = start;
	};

	const repeatActive = () => {
		const media = mediaRef.current;
		if (!media || activeIndex < 0) return;
		media.currentTime = cues[activeIndex].start;
		media.play();
	};

	return (
		<div className="space-y-4">
			<p className="text-xs text-muted-foreground">
				Seus arquivos não saem do aparelho.
			</p>
			<MediaFileInputs
				onMediaFile={handleMediaFile}
				onSubtitleFile={handleSubtitleFile}
				subtitleError={subtitleError}
			/>
			{mediaUrl && mediaFile && (
				<div className="space-y-3">
					{mediaKindFor(mediaFile) === "video" ? (
						<video
							ref={mediaRef as React.RefObject<HTMLVideoElement>}
							src={mediaUrl}
							controls
							className="w-full rounded-lg"
							onTimeUpdate={handleTimeUpdate}
							onPlay={() => onPlayingChange(true)}
							onPause={() => onPlayingChange(false)}
							onEnded={() => onPlayingChange(false)}
						>
							<track kind="captions" />
						</video>
					) : (
						// biome-ignore lint/a11y/useMediaCaption: legenda é exibida ao lado, fora do elemento nativo
						<audio
							ref={mediaRef as React.RefObject<HTMLAudioElement>}
							src={mediaUrl}
							controls
							className="w-full"
							onTimeUpdate={handleTimeUpdate}
							onPlay={() => onPlayingChange(true)}
							onPause={() => onPlayingChange(false)}
							onEnded={() => onPlayingChange(false)}
						/>
					)}
					<MediaPlayerControls
						onRepeat={repeatActive}
						loop={loop}
						onToggleLoop={() => setLoop((v) => !v)}
						hidden={hidden}
						onToggleHidden={() => setHidden((v) => !v)}
						disabled={activeIndex < 0}
					/>
					{cues.length > 0 && (
						<CueList
							cues={cues}
							activeIndex={activeIndex}
							hidden={hidden}
							onSeek={seek}
						/>
					)}
				</div>
			)}
		</div>
	);
}
