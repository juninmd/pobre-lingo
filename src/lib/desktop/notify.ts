/** Notificação nativa do Windows (toast). Falha em silêncio: o sino do app continua valendo. */
export async function sendDesktopNotification(title: string, body: string) {
	try {
		const { sendNotification } = await import(
			"@tauri-apps/plugin-notification"
		);
		sendNotification({ title, body });
	} catch (error) {
		console.warn("Falha ao enviar notificação nativa:", error);
	}
}
