import { Languages } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function TranslanguagingWidget() {
  return (
    <TrendWidget
      title="Translanguaging"
      description="Use seu português como ponte para construir fluência no inglês."
      icon={Languages}
      actionText="Acessar"
    />
  );
}
