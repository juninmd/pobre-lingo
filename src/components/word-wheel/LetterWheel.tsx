import { Check } from "lucide-react";
import {
	type CSSProperties,
	type PointerEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/utils";
import { wheelPositions } from "@/lib/wordWheel/logic";
import { useSyncedPath, useWheelKeyboard } from "./useWheelKeyboard";
import { type Point, WheelLinks } from "./WheelLinks";

interface LetterWheelProps {
	letters: string;
	/** Ordem de exibição: order[slot] = índice da letra em `letters`. */
	order: number[];
	disabled?: boolean;
	onSubmit: (word: string) => void;
	onWordChange?: (word: string) => void;
}

/** Letras em círculo: arraste e solte para enviar, ou toque/tecle e confirme no centro. */
export function LetterWheel(props: LetterWheelProps) {
	const { letters, order, disabled, onSubmit, onWordChange } = props;
	const [path, pathRef, setPath] = useSyncedPath();
	const [pointer, setPointer] = useState<Point | null>(null);
	const ref = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);
	const moved = useRef(false);
	const positions = wheelPositions(order.length);
	const word = path.map((slot) => letters[order[slot]]).join("");

	useEffect(() => onWordChange?.(word), [word, onWordChange]);
	// biome-ignore lint/correctness/useExhaustiveDependencies: embaralhar invalida a seleção
	useEffect(() => setPath([]), [order]);

	const commit = (slots: number[]) => {
		const w = slots.map((s) => letters[order[s]]).join("");
		setPath([]);
		if (w) onSubmit(w);
	};

	const add = (slot: number) =>
		setPath((p) => {
			if (p.includes(slot)) return p.at(-1) === slot ? p.slice(0, -1) : p;
			return [...p, slot];
		});

	useWheelKeyboard({
		active: !disabled,
		onEnter: () => pathRef.current.length && commit(pathRef.current),
		onBack: () => setPath((p) => p.slice(0, -1)),
		onClear: () => setPath([]),
		onLetter: (ch) => {
			const slot = order.findIndex(
				(li, s) => letters[li] === ch && !pathRef.current.includes(s),
			);
			if (slot >= 0) setPath((p) => [...p, slot]);
		},
	});

	const toPercent = (e: PointerEvent): Point | null => {
		const r = ref.current?.getBoundingClientRect();
		if (!r?.width) return null;
		return {
			x: ((e.clientX - r.left) / r.width) * 100,
			y: ((e.clientY - r.top) / r.height) * 100,
		};
	};

	const onMove = (e: PointerEvent) => {
		if (!dragging.current) return;
		setPointer(toPercent(e));
		const hit = document
			.elementFromPoint?.(e.clientX, e.clientY)
			?.closest<HTMLElement>("[data-slot]");
		if (!hit) return;
		const slot = Number(hit.dataset.slot);
		setPath((p) => {
			if (!p.includes(slot)) {
				moved.current = true;
				return [...p, slot];
			}
			if (p.at(-2) === slot) return p.slice(0, -1);
			return p;
		});
	};

	const end = () => {
		if (!dragging.current) return;
		dragging.current = false;
		setPointer(null);
		if (moved.current && pathRef.current.length > 1) commit(pathRef.current);
	};

	return (
		<div
			ref={ref}
			className={cn("ww-wheel", disabled && "opacity-60")}
			onPointerMove={onMove}
			onPointerUp={end}
			onPointerCancel={end}
			onPointerLeave={end}
		>
			<WheelLinks points={path.map((s) => positions[s])} pointer={pointer} />
			{order.map((letterIndex, slot) => (
				<button
					// biome-ignore lint/suspicious/noArrayIndexKey: o slot é a identidade estável da posição
					key={slot}
					type="button"
					data-slot={slot}
					disabled={disabled}
					aria-pressed={path.includes(slot)}
					aria-label={`Letra ${letters[letterIndex]}`}
					className={cn("ww-letter", path.includes(slot) && "is-active")}
					style={
						{
							left: `${positions[slot].x}%`,
							top: `${positions[slot].y}%`,
							"--i": slot,
						} as CSSProperties
					}
					onPointerDown={(e) => {
						e.currentTarget.releasePointerCapture?.(e.pointerId);
						dragging.current = true;
						moved.current = false;
						setPointer(toPercent(e));
						add(slot);
					}}
					onClick={(e) => e.detail === 0 && add(slot)}
				>
					{letters[letterIndex]}
				</button>
			))}
			<button
				type="button"
				className="ww-hub"
				disabled={disabled || path.length === 0}
				onClick={() => commit(path)}
				aria-label={word ? `Enviar ${word}` : "Enviar palavra"}
			>
				<Check className="h-1/2 w-1/2" strokeWidth={3} aria-hidden="true" />
			</button>
		</div>
	);
}
