import { ListeningExercise } from '@/components/exercises/ListeningExercise';
import { PageContainer } from '@/components/common/PageContainer';

export default function ListeningPage() {
  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">Listening Practice</h1>
        <p className="text-muted-foreground">Improve your listening skills with native audio</p>
      </div>
      <ListeningExercise />
    </PageContainer>
  );
}
