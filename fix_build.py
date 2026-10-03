import glob
import os

for f in glob.glob("src/pages/**/*.tsx", recursive=True):
    with open(f, "r") as file:
        content = file.read()
    if "import { useStudyTimer } from '@/hooks/useStudyTimer';" in content:
        content = content.replace("import { useStudyTimer } from '@/hooks/useStudyTimer';", "")
    if "const { start, stop, time } = useStudyTimer();" in content:
        content = content.replace("const { start, stop, time } = useStudyTimer();", "const time = 0; const start = () => {}; const stop = () => {};")
    if "const { time, start, stop } = useStudyTimer();" in content:
        content = content.replace("const { time, start, stop } = useStudyTimer();", "const time = 0; const start = () => {}; const stop = () => {};")
    with open(f, "w") as file:
        file.write(content)
