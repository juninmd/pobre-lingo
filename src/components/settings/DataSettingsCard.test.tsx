import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DataSettingsCard } from "@/components/settings/DataSettingsCard";
import { localDay } from "@/lib/localDay";

const CONSENT_KEY = "pobrelingo_analytics_consent";

const chooseFile = (contents: unknown) => {
	const file = new File([JSON.stringify(contents)], "backup.json", {
		type: "application/json",
	});
	fireEvent.change(screen.getByLabelText("Arquivo de backup"), {
		target: { files: [file] },
	});
};

describe("DataSettingsCard", () => {
	beforeEach(() => localStorage.clear());
	afterEach(() => vi.restoreAllMocks());

	it("keeps the current progress and explains why when the restore cannot be saved", async () => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
		localStorage.setItem("pl_xp", "999");
		const realSetItem = Storage.prototype.setItem;
		let writes = 0;
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (
			this: Storage,
			key: string,
			value: string,
		) {
			writes += 1;
			if (writes === 1) throw new DOMException("Full", "QuotaExceededError");
			realSetItem.call(this, key, value);
		});
		render(<DataSettingsCard />);

		chooseFile({ pl_xp: "1", pl_gems: "2" });

		const alert = await screen.findByRole("alert");
		expect(alert).toHaveTextContent(/espaço/i);
		expect(localStorage.getItem("pl_xp")).toBe("999");
	});

	describe("restoring a backup with corrupted entries", () => {
		const hrefWrites: string[] = [];

		beforeEach(() => {
			hrefWrites.length = 0;
			vi.useFakeTimers({ shouldAdvanceTime: true });
			vi.stubGlobal("location", {
				get href() {
					return "http://localhost/settings";
				},
				set href(value: string) {
					hrefWrites.push(value);
				},
			});
			localStorage.setItem("pl_achievements", '["first_steps"]');
		});
		afterEach(() => {
			vi.useRealTimers();
			vi.unstubAllGlobals();
		});

		it("tells the user how many items were ignored before reloading", async () => {
			render(<DataSettingsCard />);

			chooseFile({ pl_xp: "120", pl_achievements: "{}", pl_gems: "x" });

			const notice = await screen.findByRole("status");
			expect(notice).toHaveTextContent(
				"2 itens do backup foram ignorados por estarem inválidos",
			);
			expect(hrefWrites).toEqual([]);
			expect(localStorage.getItem("pl_achievements")).toBe('["first_steps"]');

			await vi.advanceTimersByTimeAsync(5_000);
			expect(hrefWrites).toEqual(["/"]);
		});

		it("uses the singular for one ignored item", async () => {
			render(<DataSettingsCard />);

			chooseFile({ pl_xp: "120", pl_achievements: "{}" });

			expect(await screen.findByRole("status")).toHaveTextContent(
				"1 item do backup foi ignorado por estar inválido",
			);
		});

		it("reloads right away when nothing was ignored", async () => {
			render(<DataSettingsCard />);

			chooseFile({ pl_xp: "120" });

			await waitFor(() => expect(hrefWrites).toEqual(["/"]));
			expect(screen.queryByRole("status")).toBeNull();
		});
	});

	it("shows the parse error for a file that is not a backup", async () => {
		render(<DataSettingsCard />);

		chooseFile({ theme: "dark" });

		expect(await screen.findByRole("alert")).toHaveTextContent(
			"Entrada inválida no backup: theme",
		);
	});

	it("exports a file named with the local day and without the analytics choice", async () => {
		localStorage.setItem("pl_xp", "10");
		localStorage.setItem(CONSENT_KEY, "granted");
		let exported: Blob | undefined;
		URL.createObjectURL = vi.fn((blob: Blob) => {
			exported = blob;
			return "blob:backup";
		});
		URL.revokeObjectURL = vi.fn();
		let fileName = "";
		vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
			this: HTMLAnchorElement,
		) {
			fileName = this.download;
		});
		render(<DataSettingsCard />);

		fireEvent.click(
			screen.getByRole("button", { name: /exportar progresso/i }),
		);

		await waitFor(() => expect(exported).toBeDefined());
		expect(fileName).toBe(`pobrelingo-backup-${localDay()}.json`);
		expect(JSON.parse(await (exported as Blob).text())).toEqual({
			pl_xp: "10",
		});
	});
});
