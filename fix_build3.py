import os

with open("src/pages/rules/[categoryId]/[ruleId]/page.tsx", "r") as f:
    c = f.read()
if "useStudyTimer" not in c and "const { start, stop, time } = useStudyTimer();" not in c:
    c = "import { useStudyTimer } from '@/hooks/useStudyTimer';\n" + c
    with open("src/pages/rules/[categoryId]/[ruleId]/page.tsx", "w") as f:
        f.write(c)

with open("src/pages/vocabulary/[moduleId]/[lessonId]/page.tsx", "r") as f:
    c = f.read()
if "useStudyTimer" not in c and "const { start, stop, time } = useStudyTimer();" not in c:
    c = "import { useStudyTimer } from '@/hooks/useStudyTimer';\n" + c
    with open("src/pages/vocabulary/[moduleId]/[lessonId]/page.tsx", "w") as f:
        f.write(c)
