/** Chama um comando Rust. O pacote do Tauri só carrega no desktop (import dinâmico). */
export async function desktopInvoke<T>(
	command: string,
	args?: Record<string, unknown>,
): Promise<T> {
	const { invoke } = await import("@tauri-apps/api/core");
	return invoke<T>(command, args);
}
