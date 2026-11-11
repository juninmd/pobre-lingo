import { BookOpen, type LucideIcon } from "lucide-react";
import { arcadeGames } from "@/components/arcade/arcadeGames";
import { allNavItems } from "@/components/layout/navigationData";
import {
	LEARN_REFERENCE,
	LEARN_SKILLS,
	ME_LINKS,
	PLAY_DRILLS,
} from "@/components/shell/hubData";
import { NAV_TABS } from "@/components/shell/navTabs";
import { grammarCategories } from "@/lib/grammarRules";

export interface SearchResult {
	type: "page" | "rule" | "category";
	title: string;
	subtitle?: string;
	href: string;
	icon: LucideIcon;
	tags?: string[];
	categoryName?: string;
}
/** Tudo o que tem tela: abas, menu antigo, jogos e treinos (sem repetir rota). */
const pageEntries: SearchResult[] = [
	...NAV_TABS.map((t) => ({ title: t.label, href: t.href, icon: t.icon })),
	...allNavItems.map((i) => ({ title: i.label, href: i.href, icon: i.icon })),
	...arcadeGames.map((g) => ({
		title: g.title,
		subtitle: g.description,
		href: g.href,
		icon: g.icon,
	})),
	...[...PLAY_DRILLS, ...LEARN_SKILLS, ...LEARN_REFERENCE, ...ME_LINKS].map(
		(l) => ({
			title: l.title,
			subtitle: l.description,
			href: l.href,
			icon: l.icon,
		}),
	),
].map((entry) => ({ ...entry, type: "page" as const }));

export const navPages: SearchResult[] = pageEntries.filter(
	(entry, i) => pageEntries.findIndex((e) => e.href === entry.href) === i,
);

export function getRuleSearchResults(): SearchResult[] {
	return grammarCategories.flatMap((category) => [
		{
			type: "category" as const,
			title: category.name_pt,
			subtitle: category.description_pt,
			href: `/rules/${category.id}`,
			icon: BookOpen,
		},
		...category.rules.map((rule) => ({
			type: "rule" as const,
			title: rule.title_pt,
			subtitle: rule.title_en,
			href: `/rules/${category.id}/${rule.id}`,
			icon: BookOpen,
			tags: rule.tags,
			categoryName: category.name_pt,
		})),
	]);
}

export function searchResults(term: string, results: SearchResult[]) {
	const query = term.trim().toLocaleLowerCase("pt-BR");
	if (!query) return navPages.slice(0, 5);
	const filtered = results
		.filter((result) =>
			[
				result.title,
				result.subtitle,
				result.categoryName,
				...(result.tags ?? []),
			].some((text) => text?.toLocaleLowerCase("pt-BR").includes(query)),
		)
		.slice(0, 10);
	return ["page", "category", "rule"].flatMap((type) =>
		filtered.filter((result) => result.type === type),
	);
}
