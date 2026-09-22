import os

widgets = [
    ("AIPromptCraftingWidget", "Digital & IA", "AI Literacy/Prompt Engineering"),
    ("HyFlexLearningWidget", "Digital & IA", "HyFlex learning"),
    ("DogmeELTWidget", "Metodologias", "Dogme ELT"),
    ("AuthenticMaterialsWidget", "Metodologias", "Authentic Materials"),
    ("GlobalEnglishesWidget", "Metodologias", "Global Englishes/ELF"),
    ("LexicalApproachWidget", "Metodologias", "Lexical Approach"),
    ("TranslanguagingWidget", "Metodologias", "Translanguaging"),
    ("ExperientialLearningWidget", "Metodologias", "Experiential Learning"),
    ("InquiryBasedLearningWidget", "Metodologias", "Inquiry-Based Learning"),
    ("CLILWidget", "Metodologias", "Content and Language Integrated Learning"),
    ("GreenELTWidget", "Conexão Humana & Social", "Green ELT"),
    ("DEIBWidget", "Conexão Humana & Social", "DEIB"),
    ("MindfulWidget", "Conexão Humana & Social", "Mindfulness and Social-emotional Teaching"),
    ("CriticalPedagogyWidget", "Conexão Humana & Social", "Critical Pedagogy"),
    ("SpacedRepetitionWidget", "Metodologias", "Spaced Repetition System"),
]

template = """import { useState } from "react";
import { TrendWidget } from "./TrendWidget";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";

/**
 * {desc} Widget
 */
export function {name}() {{
    const [interacted, setInteracted] = useState(false);
    const {{ addXp }} = useGamification();
    const {{ notify }} = useNotifications();

    const handleInteract = () => {{
        if (!interacted) {{
            setInteracted(true);
            addXp(10);
            notify({{
                category: "achievement",
                title: "{name} Completed",
                body: "You earned 10 XP!",
            }});
        }}
    }};

    return (
        <TrendWidget title="{desc}" description="Practice your skills with {desc}.">
            <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">Engage with this activity to gain XP.</p>
                <Button onClick={{handleInteract}} disabled={{interacted}}>
                    {{interacted ? "Completed" : "Start Activity"}}
                </Button>
            </div>
        </TrendWidget>
    );
}}
"""

os.makedirs("src/components/dashboard/widgets", exist_ok=True)
os.makedirs("tests/components/dashboard/widgets", exist_ok=True)

for name, cat, desc in widgets:
    with open(f"src/components/dashboard/widgets/{name}.tsx", "w") as f:
        f.write(template.format(name=name, desc=desc))

    test_template = f"""import {{ render, screen, fireEvent }} from "@testing-library/react";
import {{ describe, it, expect, vi }} from "vitest";
import {{ {name} }} from "@/components/dashboard/widgets/{name}";

vi.mock("@/contexts/GamificationContext", () => ({{
    useGamification: () => ({{ addXp: vi.fn() }}),
}}));

vi.mock("@/contexts/NotificationContext", () => ({{
    useNotifications: () => ({{ notify: vi.fn() }}),
}}));

describe("{name}", () => {{
    it("renders and interacts", () => {{
        render(<{name} />);
        expect(screen.getByText("{desc}")).toBeInTheDocument();
        const button = screen.getByText("Start Activity");
        fireEvent.click(button);
        expect(screen.getByText("Completed")).toBeInTheDocument();
    }});
}});
"""
    with open(f"tests/components/dashboard/widgets/{name}.test.tsx", "w") as f:
        f.write(test_template)
