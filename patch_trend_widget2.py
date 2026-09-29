import re

with open("src/components/dashboard/TrendWidget.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'description: `Você ganhou ${xpReward} XP.`,',
    'body: `Você ganhou ${xpReward} XP.`,'
)

with open("src/components/dashboard/TrendWidget.tsx", "w", encoding="utf-8") as f:
    f.write(content)
