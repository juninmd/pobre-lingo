import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	getRuleSearchResults,
	navPages,
	type SearchResult,
	searchResults,
} from "./searchData";

export function useGlobalSearch(
	open: boolean,
	onOpenChange: (open: boolean) => void,
) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const allResults = useMemo(
		() => [...navPages, ...getRuleSearchResults()],
		[],
	);
	const results = useMemo(
		() => searchResults(searchTerm, allResults),
		[searchTerm, allResults],
	);
	const select = useCallback(
		(result: SearchResult) => {
			navigate(result.href);
			onOpenChange(false);
			setSearchTerm("");
		},
		[navigate, onOpenChange],
	);
	useEffect(() => {
		if (!open) return;
		setSearchTerm("");
		setSelectedIndex(0);
		const timer = window.setTimeout(() => inputRef.current?.focus(), 100);
		return () => window.clearTimeout(timer);
	}, [open]);
	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (!results.length) return;
			if (event.key === "ArrowDown" || event.key === "ArrowUp") {
				event.preventDefault();
				const direction = event.key === "ArrowDown" ? 1 : -1;
				setSelectedIndex(
					(index) => (index + direction + results.length) % results.length,
				);
			} else if (event.key === "Enter" && results[selectedIndex]) {
				event.preventDefault();
				select(results[selectedIndex]);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, results, selectedIndex, select]);
	const updateTerm = (term: string) => {
		setSearchTerm(term);
		setSelectedIndex(0);
	};
	return { searchTerm, updateTerm, selectedIndex, inputRef, results, select };
}
