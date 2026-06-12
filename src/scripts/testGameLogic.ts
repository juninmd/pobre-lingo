import {
	calculateMultiplier,
	calculateScore,
	calculateTimeBonus,
} from "../lib/gameLogic";

function runTests() {
	console.log("Running Game Logic Tests...");
	let passed = 0;
	let failed = 0;

	const assert = (condition: boolean, message: string) => {
		if (condition) {
			console.log(`✅ PASS: ${message}`);
			passed++;
		} else {
			console.error(`❌ FAIL: ${message}`);
			failed++;
		}
	};

	// Test Multiplier
	assert(calculateMultiplier(0) === 1, "Multiplier for streak 0 should be 1");
	assert(calculateMultiplier(4) === 1, "Multiplier for streak 4 should be 1");
	assert(calculateMultiplier(5) === 2, "Multiplier for streak 5 should be 2");
	assert(calculateMultiplier(9) === 2, "Multiplier for streak 9 should be 2");
	assert(calculateMultiplier(10) === 3, "Multiplier for streak 10 should be 3");
	assert(calculateMultiplier(19) === 3, "Multiplier for streak 19 should be 3");
	assert(calculateMultiplier(20) === 4, "Multiplier for streak 20 should be 4");
	assert(
		calculateMultiplier(100) === 4,
		"Multiplier for streak 100 should be 4",
	);

	// Test Score Calculation
	assert(
		calculateScore(0, 0) === 10,
		"Score for streak 0 (mult 1) should add 10",
	);
	assert(
		calculateScore(100, 5) === 120,
		"Score for streak 5 (mult 2) should add 20 to 100 -> 120",
	);
	assert(
		calculateScore(0, 10) === 30,
		"Score for streak 10 (mult 3) should add 30",
	);
	assert(
		calculateScore(0, 20) === 40,
		"Score for streak 20 (mult 4) should add 40",
	);

	// Test Time Bonus
	assert(calculateTimeBonus(true, 50) === 52, "Match should add 2 seconds");
	assert(calculateTimeBonus(true, 59) === 60, "Match should cap time at 60s");
	assert(
		calculateTimeBonus(false, 10) === 7,
		"Mismatch should subtract 3 seconds",
	);
	assert(
		calculateTimeBonus(false, 2) === 0,
		"Mismatch should floor time at 0s",
	);

	console.log(`\nTests Complete. Passed: ${passed}, Failed: ${failed}`);

	if (failed > 0) {
		process.exit(1);
	}
}

runTests();
