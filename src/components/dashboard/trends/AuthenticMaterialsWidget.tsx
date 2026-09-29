import { Newspaper } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AuthenticMaterialsWidget() {
    return (
        <TrendWidget
            title="Authentic Materials"
            description="Estude com menus, notícias e materiais reais."
            icon={<Newspaper className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
