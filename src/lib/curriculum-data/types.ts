export type DifficultyLevel = 'basico' | 'intermediario' | 'avancado';
export type ModuleType = 'grammar' | 'vocabulary' | 'exercise' | 'reading' | 'quiz' | 'culture' | 'speaking';

export interface Lesson {
  id: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  type: ModuleType;
  estimatedMinutes: number;
  xpReward: number;
  // Referências para conteúdo existente
  grammarRuleIds?: string[]; // IDs de regras gramaticais
  exerciseType?: 'sentence-ordering' | 'sentence-identification' | 'find-incorrect-words' | 'news-comprehension' | 'matching-pairs' | 'listening' | 'conversation';
  gameType?: 'flashcards' | 'hangman' | 'word-search' | 'sentence-rush' | 'memory-match' | 'word-scramble' | 'speed-match' | 'bubble-pop';
  vocabularyTopics?: string[];
  speakingTopics?: string[];
  order: number;
}

export interface Module {
  id: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  difficulty: DifficultyLevel;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  lessons: Lesson[];
  prerequisites?: string[]; // IDs de módulos anteriores necessários
  order: number;
  unitId: string; // Link to the Unit
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  guidebookContent: string; // Markdown content for tips/rules
  order: number;
  difficulty: DifficultyLevel;
  sectionTitle?: string; // Optional: Defines if this unit starts a new section
}

export interface LearningPath {
  id: string;
  name_pt: string;
  name_en: string;
  description_pt: string;
  units: Unit[];
  modules: Module[];
}
