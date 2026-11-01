import { useEffect, useRef, useState } from "react";
import { Pobrelingo } from "@/components/mascot/Pobrelingo";
import type { VrmScene } from "./vrmScene";

export const DEFAULT_VRM_URL =
	(import.meta.env.VITE_VRM_URL as string | undefined) ??
	"https://raw.githubusercontent.com/pixiv/three-vrm/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm";

type Props = {
	modelUrl: string;
	speaking: boolean;
	mood: "neutral" | "happy" | "sad";
};

/** Palco 3D da personagem; se o VRM ou o WebGL falharem, mostra o mascote pixel art. */
export function VrmStage({ modelUrl, speaking, mood }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sceneRef = useRef<VrmScene | null>(null);
	const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		let cancelled = false;
		setState("loading");
		import("./vrmScene")
			.then(async ({ createVrmScene }) => {
				if (cancelled) return;
				sceneRef.current ??= createVrmScene(canvas);
				await sceneRef.current.load(modelUrl);
				if (!cancelled) setState("ready");
			})
			.catch(() => !cancelled && setState("failed"));
		return () => {
			cancelled = true;
		};
	}, [modelUrl]);

	useEffect(() => () => sceneRef.current?.dispose(), []);
	useEffect(() => sceneRef.current?.setSpeaking(speaking), [speaking]);
	useEffect(() => sceneRef.current?.setMood(mood), [mood]);

	return (
		<div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-800 dark:to-slate-900">
			<canvas
				ref={canvasRef}
				role="img"
				aria-label="Mika, sua parceira de conversa"
				className={`h-full w-full ${state === "failed" ? "hidden" : ""}`}
			/>
			{state === "loading" && (
				<p className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
					Carregando a Mika…
				</p>
			)}
			{state === "failed" && (
				<div className="absolute inset-0 grid place-items-center">
					<Pobrelingo
						width={144}
						height={144}
						emotion={speaking ? "happy" : "neutral"}
						animated
						decorative
					/>
				</div>
			)}
		</div>
	);
}
