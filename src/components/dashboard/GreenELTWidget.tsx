import { Leaf } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GreenELTWidget() {
  return (
    <TrendWidget
      title="Inglês Sustentável"
      description="Aprenda vocabulário sobre sustentabilidade e meio ambiente."
      icon={Leaf}
      actionText="Acessar"
    />
  );
}
