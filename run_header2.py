import os
import re

header_file = "src/components/layout/Header.tsx"
if os.path.exists(header_file):
    with open(header_file, "r") as f:
        content = f.read()

    # Make sure we add Coins properly to lucide-react import
    if "Coins" not in content:
        content = re.sub(r'from\s+["\']lucide-react["\'];?', r', Coins } from "lucide-react";', content)
        content = content.replace("} , Coins }", ", Coins }")
    elif "} , Coins }" in content:
        content = content.replace("} , Coins }", ", Coins }")
    elif "} from \"lucide-react\"" in content and "Coins" not in content[:content.find("from \"lucide-react\"")]:
        # we might have added Coins somewhere else. Just simple replace
        pass

    with open(header_file, "w") as f:
        f.write(content)
