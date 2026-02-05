import React from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { SEO } from '@/components/common/SEO';
import { LearningTimeline } from '@/components/curriculum/LearningTimeline';

export default function CurriculumPage() {
  return (
    <PageContainer>
      <SEO title="Jornada de Aprendizado" description="Sua trilha personalizada para dominar o inglês, do básico ao avançado." />
      <LearningTimeline />
    </PageContainer>
  );
}
