/** Polite live region; kept at the same spot in every screen so screen readers hear each change. */
export function QuizLiveStatus({ children }: { children: string }) {
	return (
		<p role="status" aria-live="polite" className="sr-only">
			{children}
		</p>
	);
}
