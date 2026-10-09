export const MAIN_CONTENT_ID = "main-content";

/** First tab stop: lets keyboard users jump past the sidebar and header. */
export function SkipLink() {
	return (
		<a
			href={`#${MAIN_CONTENT_ID}`}
			onClick={(event) => {
				// Focus directly so the URL does not gain a stray hash.
				event.preventDefault();
				document.getElementById(MAIN_CONTENT_ID)?.focus();
			}}
			className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
		>
			Pular para o conteúdo
		</a>
	);
}
