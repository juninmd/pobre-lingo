/** Time to read the "ignored items" notice before the page reloads with the restored data. */
export const SKIPPED_NOTICE_MS = 4_000;

export const skippedMessage = (count: number) =>
	count === 1
		? "1 item do backup foi ignorado por estar inválido."
		: `${count} itens do backup foram ignorados por estarem inválidos.`;
