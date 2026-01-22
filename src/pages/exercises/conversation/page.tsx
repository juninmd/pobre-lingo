import ConversationExercise from '@/components/exercises/ConversationExercise';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { MessageCircle } from 'lucide-react';

export default function ConversationPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Conversation Practice"
        description="Chat with Pobrelingo to improve your fluency"
        icon={MessageCircle}
        iconClassName="text-green-500"
        backLink="/"
        backLabel="Back to Home"
      />
      <ConversationExercise />
    </PageContainer>
  );
}
