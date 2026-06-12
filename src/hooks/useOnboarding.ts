import { useCallback, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

const ONBOARDING_KEY = "pobrelingo_onboarded";

export function useOnboarding() {
	const [isOnboarded, setIsOnboarded] = useState<boolean>(() =>
		getLocalStorageItem<boolean>(ONBOARDING_KEY, false),
	);

	const completeOnboarding = useCallback(() => {
		setLocalStorageItem(ONBOARDING_KEY, true);
		setIsOnboarded(true);
	}, []);

	return { isOnboarded, completeOnboarding };
}
