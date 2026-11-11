import { describe, expect, it } from "vitest";
import { pageRoutes } from "@/app/routes";
import { navPages } from "@/components/common/searchData";
import { NAV_TABS, tabForPath } from "./navTabs";

const staticPaths = pageRoutes
	.map((r) => ("index" in r && r.index ? "/" : `/${"path" in r ? r.path : ""}`))
	.filter((p) => !p.includes(":") && !p.includes("*"));

describe("nenhuma feature se perde no redesign", () => {
	it.each(staticPaths)("%s tem porta na busca ⌘K e nos hubs", (path) => {
		expect(navPages.map((p) => p.href)).toContain(path);
	});

	it.each(staticPaths)("%s acende uma das quatro abas", (path) => {
		expect(NAV_TABS.map((t) => t.id)).toContain(tabForPath(path));
	});

	it("mapeia rotas para a aba certa", () => {
		expect(tabForPath("/")).toBe("hoje");
		expect(tabForPath("/rules/tenses/x")).toBe("aprender");
		expect(tabForPath("/games/word-wheel")).toBe("jogar");
		expect(tabForPath("/exercises/listening")).toBe("jogar");
		expect(tabForPath("/settings")).toBe("eu");
		expect(tabForPath("/readingx")).toBe("hoje");
	});
});
