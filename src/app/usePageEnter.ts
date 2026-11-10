import { type RefObject, useLayoutEffect } from "react";

const ENTER_KEYFRAMES: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
const ENTER_TIMING: KeyframeAnimationOptions = {
	duration: 180,
	easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
};

/**
 * A cada troca de rota: volta a rolagem ao topo e faz a página surgir.
 * Só opacidade no contêiner: um `transform` aqui viraria bloco de contenção
 * dos elementos `fixed` das páginas e os faria pular durante a animação.
 */
export function usePageEnter(
	scroller: RefObject<HTMLElement | null>,
	content: RefObject<HTMLElement | null>,
	pathname: string,
) {
	useLayoutEffect(() => {
		if (!pathname) return;
		scroller.current?.scrollTo({ top: 0, behavior: "instant" });
		const node = content.current;
		if (!node || typeof node.animate !== "function") return;
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
		const animation = node.animate(ENTER_KEYFRAMES, ENTER_TIMING);
		return () => animation.cancel();
	}, [pathname, scroller, content]);
}
