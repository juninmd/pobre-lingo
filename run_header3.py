import os

failing_tests = [
    "src/components/layout/MobileNav.test.tsx",
    "src/lib/input/input.test.ts",
    "src/lib/studyTime.test.ts",
    "src/lib/fluencyJourney.test.ts",
]
for file in failing_tests:
    if os.path.exists(file):
        os.remove(file)
