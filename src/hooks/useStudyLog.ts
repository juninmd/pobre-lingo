// @ts-nocheck
import { useEffect, useRef, useSyncExternalStore } from "react";
import {
	getStudyLog,
	recordStudy,
	subscribeStudyLog,
} from "@/lib/studyLogStore";
import type { StudyKind } from "@/lib/studyTime";

export function useStudyLog() {
	return useSyncExternalStore(subscribeStudyLog, getStudyLog, getStudyLog);
}

const TICK_MS = 15_000;
/** Sem interação por este tempo, o aluno provavelmente saiu: para de contar. */
const IDLE_MS = 90_000;

/**
 * Conta tempo ativo na tela: aba visível e interação recente (clique,
 * tecla, rolagem). `busy` mantém a contagem sem interação (ex.: áudio tocando).
 */
export function useStudyTimer(kind: StudyKind, busy = false) {
	const lastActivity = useRef(Date.now());
	const busyRef = useRef(busy);
	busyRef.current = busy;

	useEffect(() => {
		const touch = () => {
			lastActivity.current = Date.now();
		};
		const events = ["pointerdown", "keydown", "scroll", "touchstart"];
		for (const name of events) {
			window.addEventListener(name, touch, { passive: true, capture: true });
		}
		let last = Date.now();
		const timer = window.setInterval(() => {
			const now = Date.now();
			const elapsed = (now - last) / 1000;
			last = now;
			const visible = document.visibilityState === "visible";
			const active = busyRef.current || now - lastActivity.current < IDLE_MS;
			if (visible && active) recordStudy(kind, elapsed);
		}, TICK_MS);
		return () => {
			window.clearInterval(timer);
			for (const name of events) {
				window.removeEventListener(name, touch, { capture: true });
			}
		};
	}, [kind]);
}
