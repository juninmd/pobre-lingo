import { FindIncorrectWords } from '@/components/exercises/FindIncorrectWords';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { SearchX } from 'lucide-react';

export default function FindIncorrectWordsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Encontrar Palavras Incorretas"
        description="Identifique os erros gramaticais clicando nas palavras incorretas."
        icon={SearchX}
        iconClassName="text-red-500"
        backLink="/"
        backLabel="Voltar ao Início"
      >
        <Badge variant="secondary">
          Clique nas palavras com erros
        </Badge>
      </PageHeader>

      <FindIncorrectWords />
    </PageContainer>
  );
}
