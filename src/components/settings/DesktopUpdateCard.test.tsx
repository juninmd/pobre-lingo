import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DesktopUpdateCard } from "@/components/settings/DesktopUpdateCard";
import type { UpdateInfo } from "@/lib/desktop/updater";

// Função simples (não vi.fn): o spy do vitest reporta a rejeição de um mock como não tratada.
let impl: () => Promise<UpdateInfo | null> = async () => null;
vi.mock("@/lib/desktop/updater", async (original) => ({
	...(await original<typeof import("@/lib/desktop/updater")>()),
	checkForUpdate: () => impl(),
}));

const clickCheck = () =>
	fireEvent.click(screen.getByRole("button", { name: "Verificar atualizações" }));

describe("DesktopUpdateCard", () => {
	it("reports when already up to date", async () => {
		impl = async () => null;
		render(<DesktopUpdateCard />);
		clickCheck();
		expect(await screen.findByText(/versão mais recente/)).toBeTruthy();
	});

	it("offers an update and installs only after the click", async () => {
		const install = vi.fn(async () => undefined);
		impl = async () => ({ version: "0.2.0", notes: null, install });
		render(<DesktopUpdateCard />);
		clickCheck();
		await screen.findByText(/Versão 0.2.0 disponível/);
		expect(install).not.toHaveBeenCalled();
		fireEvent.click(screen.getByRole("button", { name: "Baixar e reiniciar" }));
		await waitFor(() => expect(install).toHaveBeenCalledTimes(1));
	});

	it("shows a recoverable error when the check fails", async () => {
		impl = async () => {
			throw new Error("offline");
		};
		render(<DesktopUpdateCard />);
		clickCheck();
		expect(await screen.findByRole("alert")).toBeTruthy();
		expect(screen.getByRole("button", { name: "Verificar atualizações" })).toBeTruthy();
	});
});
