export const calculateMultiplier = (currentStreak: number): number => {
	if (currentStreak >= 20) return 4;
	if (currentStreak >= 10) return 3;
	if (currentStreak >= 5) return 2;
	return 1;
};

export const calculateScore = (
	currentScore: number,
	currentStreak: number,
): number => {
	const multiplier = calculateMultiplier(currentStreak);
	const points = 10 * multiplier;
	return currentScore + points;
};

export const calculateTimeBonus = (
	match: boolean,
	currentTime: number,
): number => {
	if (match) {
		return Math.min(currentTime + 2, 60); // +2s, max 60s
	} else {
		return Math.max(currentTime - 3, 0); // -3s, min 0s
	}
};
