import { Newspaper } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AuthenticMaterialsWidget() {
  return (
    <TrendWidget
      title="Materiais Autênticos"
      description="Estude com textos e áudios reais, não adaptados para estudantes."
      icon={Newspaper}
      actionText="Acessar"
    />
  );
}
