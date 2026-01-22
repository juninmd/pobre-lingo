import { SentenceOrdering } from '@/components/exercises/SentenceOrdering';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Shuffle } from 'lucide-react';

export default function SentenceOrderingPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Ordenar Frases"
        description="Arraste as palavras para formar frases corretas em inglês."
        icon={Shuffle}
        iconClassName="text-purple-500"
        backLink="/"
        backLabel="Voltar ao Início"
      >
        <Badge variant="secondary">
          Clique nas palavras na ordem correta
        </Badge>
      </PageHeader>

      <SentenceOrdering />
    </PageContainer>
  );
}
