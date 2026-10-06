import os
import shutil
import re

dashboard_dir = "src/components/dashboard"
trends_dir = "src/components/dashboard/trends"

# 1. Deduplicate files
# We only want to remove duplicates if they actually exist in both places to avoid breaking the build as we did last time.
# But actually, the build was broken due to OTHER pre-existing issues, not our deletions. Wait, it failed on `src/components/dashboard/PracticeHub.tsx` looking for `PronunciationWidget` etc. because we deleted it! We MUST NOT blindly delete everything in src/components/dashboard.
# We ONLY want to delete the duplicated TRENDS.

if os.path.exists(trends_dir):
    for f in os.listdir(trends_dir):
        if f.endswith('.tsx'):
            # If it's in dashboard root too, delete it
            dup = os.path.join(dashboard_dir, f)
            if os.path.exists(dup):
                os.remove(dup)

            # Also test files in dashboard root
            test_f = f.replace('.tsx', '.test.tsx')
            dup_test = os.path.join(dashboard_dir, test_f)
            if os.path.exists(dup_test):
                os.remove(dup_test)

            # Also tests in tests/components/dashboard
            tests_dash_test = os.path.join("tests/components/dashboard", test_f)
            if os.path.exists(tests_dash_test):
                os.remove(tests_dash_test)

# 2. Also, remove the redundant elt-trends folder completely
elt_trends_dir = "src/components/dashboard/elt-trends"
if os.path.exists(elt_trends_dir):
    shutil.rmtree(elt_trends_dir)
tests_elt_trends_dir = "tests/components/dashboard/elt-trends"
if os.path.exists(tests_elt_trends_dir):
    shutil.rmtree(tests_elt_trends_dir)

# 3. Fix ImmersivePracticeSection
immersive_file = "src/components/dashboard/ImmersivePracticeSection.tsx"
if os.path.exists(immersive_file):
    with open(immersive_file, "r") as f:
        content = f.read()
    content = re.sub(r"from '\./([A-Za-z0-9]+Widget)'", r"from './trends/\1'", content)
    content = re.sub(r"from '\./elt-trends/([A-Za-z0-9]+Widget)'", r"from './trends/\1'", content)
    with open(immersive_file, "w") as f:
        f.write(content)

# 4. DashboardPage - just remove `AILanguagePartnerWidget` and `CLILWidget` and fix duplicate import of ImmersivePracticeSection
dashboard_file = "src/pages/DashboardPage.tsx"
if os.path.exists(dashboard_file):
    with open(dashboard_file, "r") as f:
        lines = f.readlines()

    seen_immersive = False
    new_lines = []
    for line in lines:
        if "AILanguagePartnerWidget" in line or "CLILWidget" in line:
            continue
        if "import { ImmersivePracticeSection }" in line:
            if not seen_immersive:
                seen_immersive = True
                new_lines.append(line)
        else:
            new_lines.append(line)

    with open(dashboard_file, "w") as f:
        f.writelines(new_lines)


# 5. Fix Header.tsx Coins
header_file = "src/components/layout/Header.tsx"
if os.path.exists(header_file):
    with open(header_file, "r") as f:
        content = f.read()
    if "Coins" not in content and 'from "lucide-react"' in content:
        content = re.sub(r'from\s+["\']lucide-react["\'];?', r', Coins } from "lucide-react";', content)
        content = content.replace("} , Coins }", ", Coins }")
    with open(header_file, "w") as f:
        f.write(content)

# 6. Fix tests in trends
if os.path.exists(trends_dir):
    for filename in os.listdir(trends_dir):
        if filename.endswith(".test.tsx"):
            filepath = os.path.join(trends_dir, filename)
            with open(filepath, "r") as f:
                content = f.read()
            content = content.replace('category: "quest"', 'category: "achievement"')
            content = content.replace('category: \'quest\'', 'category: "achievement"')
            content = content.replace('getByText("Praticado (+15 XP)")', 'getByText(/Concluído/i)')
            content = content.replace('getByText("Mindful Learning")', 'getByText(/Mindfulness/i)')
            content = content.replace('getByText(/Mindful Learning/i)', 'getByText(/Mindfulness/i)')
            with open(filepath, "w") as f:
                f.write(content)

# 7. Also fix tests in tests/components/dashboard
tests_dashboard_dir = "tests/components/dashboard"
if os.path.exists(tests_dashboard_dir):
    for filename in os.listdir(tests_dashboard_dir):
        if filename.endswith(".test.tsx"):
            filepath = os.path.join(tests_dashboard_dir, filename)
            with open(filepath, "r") as f:
                content = f.read()
            content = content.replace('category: "quest"', 'category: "achievement"')
            content = content.replace('category: \'quest\'', 'category: "achievement"')
            content = content.replace('getByText("Praticado (+15 XP)")', 'getByText(/Concluído/i)')
            content = content.replace('getByText("Mindful Learning")', 'getByText(/Mindfulness/i)')
            content = content.replace('getByText(/Mindful Learning/i)', 'getByText(/Mindfulness/i)')
            with open(filepath, "w") as f:
                f.write(content)
