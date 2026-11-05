import os

# There was another duplicate 'import { vi } from "vitest";' which caused "Identifier `vi` has already been declared".
tests_to_fix = [
    "src/components/dashboard/AIStudyCoachWidget.test.tsx",
    "src/components/dashboard/CommunicativeRoleplayWidget.test.tsx"
]

for t in tests_to_fix:
    if os.path.exists(t):
        with open(t, "r") as f:
            content = f.read()

        while content.count('import { vi } from "vitest";\n') > 0 and 'import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";' in content:
            content = content.replace('import { vi } from "vitest";\n', '', 1)

        with open(t, "w") as f:
            f.write(content)
