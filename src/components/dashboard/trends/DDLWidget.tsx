import { Database } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DDLWidget() {
    return (
        <TrendWidget
            title="Data-Driven Learning"
            description="Descubra padrões do idioma usando dados reais."
            icon={<Database className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
