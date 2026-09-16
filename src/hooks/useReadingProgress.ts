import { useCallback, useMemo } from "react";
import { usePersistentState } from "./usePersistentState";

export function useReadingProgress() {
	const [ids, setIds] = usePersistentState<string[]>(
		"pobrelingo_reading_done",
		[],
	);

	const completed = useMemo(() => new Set(ids), [ids]);

	const markRead = useCallback(
		(id: string) => {
			setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
		},
		[setIds],
	);

	const isRead = useCallback((id: string) => completed.has(id), [completed]);

	return { completed, isRead, markRead };
}
