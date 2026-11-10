import { useEffect, useRef, useState } from "react";

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

function prefersStill(): boolean {
	// Sem matchMedia (testes, navegadores antigos) não há como saber: não anima.
	if (typeof window === "undefined" || !window.matchMedia) return true;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Conta de onde o número estava até `target`. Na primeira montagem parte do
 * zero; depois, do valor anterior (ex.: moedas subindo ao ganhar uma). Com
 * movimento reduzido devolve o valor final direto.
 */
export function useCountUp(target: number, durationMs = 700): number {
	const [value, setValue] = useState(() => (prefersStill() ? target : 0));
	const shown = useRef(value);

	useEffect(() => {
		const from = shown.current;
		if (from === target) return;
		if (prefersStill()) {
			shown.current = target;
			setValue(target);
			return;
		}
		const start = performance.now();
		let frame = requestAnimationFrame(function tick(now) {
			const progress = Math.min((now - start) / durationMs, 1);
			const next = Math.round(from + (target - from) * easeOutCubic(progress));
			shown.current = next;
			setValue(next);
			if (progress < 1) frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	}, [target, durationMs]);

	return value;
}
