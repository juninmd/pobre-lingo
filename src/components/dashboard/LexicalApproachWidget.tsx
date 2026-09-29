import { Blocks } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function LexicalApproachWidget() {
  return (
    <TrendWidget
      title="Abordagem Lexical"
      description="Aprenda blocos de palavras (chunks) em vez de gramática isolada."
      icon={Blocks}
      actionText="Acessar"
    />
  );
}
