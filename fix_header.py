import os
import re

header_file = "src/components/layout/Header.tsx"
if os.path.exists(header_file):
    with open(header_file, "r") as f:
        content = f.read()

    # The string `} , Coins }` needs to be `, Coins }`
    content = content.replace("} , Coins }", ", Coins }")

    with open(header_file, "w") as f:
        f.write(content)
