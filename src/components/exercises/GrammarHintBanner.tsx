import { BookOpen, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { findRuleCategory, grammarCategories } from "@/lib/grammarRules";

interface GrammarHintBannerProps {
	ruleIds: string[];
	onDismiss?: () => void;
}

export function GrammarHintBanner({
	ruleIds,
	onDismiss,
}: GrammarHintBannerProps) {
	if (!ruleIds || ruleIds.length === 0) return null;

	const links = ruleIds.flatMap((ruleId) => {
		const categoryId = findRuleCategory(ruleId);
		if (!categoryId) return [];
		const category = grammarCategories.find((c) => c.id === categoryId);
		const rule = category?.rules.find((r) => r.id === ruleId);
		if (!rule) return [];
		return [{ ruleId, categoryId, label: rule.title_pt }];
	});

	if (links.length === 0) return null;

	return (
		<Alert
			role="status"
			className="bg-amber-50/80 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700 animate-in fade-in slide-in-from-top-2 duration-300"
		>
			<BookOpen
				className="w-4 h-4 text-amber-600 dark:text-amber-400"
				aria-hidden="true"
			/>
			<AlertDescription className="flex items-center justify-between gap-2">
				<span className="text-sm text-amber-800 dark:text-amber-200">
					<span className="font-semibold">Dica gramatical: </span>
					{links.map((l, i) => (
						<React.Fragment key={l.ruleId}>
							{i > 0 && ", "}
							<Link
								to={`/rules/${l.categoryId}/${l.ruleId}`}
								className="underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-100 font-medium"
							>
								{l.label}
							</Link>
						</React.Fragment>
					))}
				</span>
				{onDismiss && (
					<button
						type="button"
						onClick={onDismiss}
						className="shrink-0 text-amber-600/70 hover:text-amber-800 dark:text-amber-400/70 dark:hover:text-amber-200 transition-colors"
						aria-label="Fechar dica"
					>
						<X className="w-4 h-4" aria-hidden="true" />
					</button>
				)}
			</AlertDescription>
		</Alert>
	);
}
