/** Escuta um evento emitido pelo Rust. Retorna a função que cancela a escuta. */
export async function listenDesktop<T>(
	name: string,
	handler: (payload: T) => void,
): Promise<() => void> {
	const { listen } = await import("@tauri-apps/api/event");
	return listen<T>(name, (event) => handler(event.payload));
}
