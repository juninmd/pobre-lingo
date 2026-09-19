import { expect, test } from "@playwright/test";

/**
 * Laboratório de Escuta: frases de nativos (Tatoeba mockado, sem chamada de
 * rede real) e mídia própria + legenda (tudo em blob URL local).
 */

const SENTENCES = {
	data: [
		{
			id: 1,
			text: "I go to work every day.",
			translations: [{ lang: "por", text: "Eu vou trabalhar todos os dias." }],
			audios: [
				{
					author: "CK",
					license: "CC BY 2.0 FR",
					download_url: "https://api.tatoeba.org/v1/audio/1/file",
				},
			],
		},
		{
			id: 2,
			text: "She reads a book at night.",
			translations: [{ lang: "por", text: "Ela lê um livro à noite." }],
			audios: [
				{
					author: "spieler",
					license: "CC BY-NC-ND 4.0",
					download_url: "https://api.tatoeba.org/v1/audio/1/file",
				},
			],
		},
	],
};

const SRT = `1
00:00:00,000 --> 00:00:02,000
Hello there.

2
00:00:02,000 --> 00:00:04,000
How are you?
`;

// Minimal valid WAV header (44 bytes) + no samples: enough for <audio> to load metadata.
function wavBuffer(): Buffer {
	const header = Buffer.alloc(44);
	header.write("RIFF", 0);
	header.writeUInt32LE(36, 4);
	header.write("WAVE", 8);
	header.write("fmt ", 12);
	header.writeUInt32LE(16, 16);
	header.writeUInt16LE(1, 20);
	header.writeUInt16LE(1, 22);
	header.writeUInt32LE(8000, 24);
	header.writeUInt32LE(8000, 28);
	header.writeUInt16LE(1, 32);
	header.writeUInt16LE(8, 34);
	header.write("data", 36);
	header.writeUInt32LE(0, 40);
	return header;
}

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("vite-ui-theme", "pobre-lingo");
		localStorage.setItem("pobrelingo_onboarded", "true");
	});
	await page.route("https://api.tatoeba.org/v1/sentences**", (route) =>
		route.fulfill({ json: SENTENCES }),
	);
	await page.route("https://api.tatoeba.org/v1/audio/1/file", (route) =>
		route.fulfill({ status: 200, contentType: "audio/wav", body: wavBuffer() }),
	);
});

test("frases de nativos: atribuição e fluxo de ditado", async ({ page }) => {
	await page.goto("/listening-lab");
	await page.getByRole("button", { name: "Buscar frases" }).click();

	await expect(
		page.getByText(/Áudio: CK · CC BY 2.0 FR · Tatoeba/),
	).toBeVisible();

	await page.getByRole("tab", { name: "Ditado" }).click();
	const textarea = page.getByLabel("Escreva o que ouviu");

	await textarea.fill("I go to work every day.");
	await page.getByRole("button", { name: "Conferir" }).click();
	await expect(page.getByText("Aprovado")).toBeVisible();

	await textarea.fill("I go somewhere else.");
	await page.getByRole("button", { name: "Conferir" }).click();
	await expect(page.getByText(/Abaixo de 70%/)).toBeVisible();
});

test("seu áudio + legenda: cues aparecem após carregar os arquivos", async ({
	page,
}) => {
	await page.goto("/listening-lab");
	await page.getByRole("tab", { name: /Sua mídia/ }).click();

	await page.getByLabel(/Áudio ou vídeo/).setInputFiles({
		name: "clip.wav",
		mimeType: "audio/wav",
		buffer: wavBuffer(),
	});
	await page.getByLabel(/Legenda/).setInputFiles({
		name: "legenda.srt",
		mimeType: "text/plain",
		buffer: Buffer.from(SRT),
	});

	await expect(page.getByText("Hello there.")).toBeVisible();
	await expect(page.getByText("How are you?")).toBeVisible();

	await page.getByRole("button", { name: "Esconder legenda" }).click();
	await expect(page.getByText("Hello there.")).toHaveCount(0);
});

test("legenda inválida mostra erro", async ({ page }) => {
	await page.goto("/listening-lab");
	await page.getByRole("tab", { name: /Sua mídia/ }).click();

	await page.getByLabel(/Legenda/).setInputFiles({
		name: "legenda.txt",
		mimeType: "text/plain",
		buffer: Buffer.from("not a subtitle"),
	});

	await expect(page.getByRole("alert")).toContainText("Arquivo inválido");
});
