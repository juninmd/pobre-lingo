import { BookOpen, type LucideIcon } from "lucide-react";
import { allNavItems } from "@/components/layout/navigationData";
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
export const navPages: SearchResult[] = allNavItems.map((item) => ({
	type: "page",
	title: item.label,
	href: item.href,
	icon: item.icon,
}));

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
