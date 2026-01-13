// Sistema de Currículo Progressivo - PobreLingo
// Define a estrutura de aprendizado do básico ao avançado

export type DifficultyLevel = 'basico' | 'intermediario' | 'avancado';
export type ModuleType = 'grammar' | 'vocabulary' | 'exercise' | 'reading' | 'quiz' | 'culture';

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
  exerciseType?: 'sentence-ordering' | 'sentence-identification' | 'find-incorrect-words' | 'news-comprehension' | 'matching-pairs' | 'listening';
  vocabularyTopics?: string[];
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
}

export interface LearningPath {
  id: string;
  name_pt: string;
  name_en: string;
  description_pt: string;
  modules: Module[];
}

export const curriculumData: LearningPath = {
  id: 'english-mastery',
  name_pt: 'Jornada de Domínio do Inglês',
  name_en: 'English Mastery Journey',
  description_pt: 'Um caminho estruturado do básico ao avançado para dominar o inglês',
  modules: [
    // ========== NÍVEL BÁSICO ==========
    {
      id: 'foundations',
      title_pt: 'Fundamentos do Inglês',
      title_en: 'English Foundations',
      description_pt: 'Comece sua jornada com os conceitos fundamentais da língua inglesa',
      difficulty: 'basico',
      icon: 'Rocket',
      color: 'bg-blue-500',
      order: 1,
      lessons: [
        {
          id: 'alphabet-pronunciation',
          title_pt: 'Alfabeto e Pronúncia',
          title_en: 'Alphabet and Pronunciation',
          description_pt: 'Aprenda o alfabeto inglês e sons básicos',
          type: 'vocabulary',
          estimatedMinutes: 15,
          xpReward: 50,
          vocabularyTopics: ['alphabet', 'basic-sounds'],
          order: 1,
        },
        {
          id: 'present-simple-intro',
          title_pt: 'Introdução ao Present Simple',
          title_en: 'Introduction to Present Simple',
          description_pt: 'Aprenda o tempo verbal mais básico do inglês',
          type: 'grammar',
          estimatedMinutes: 20,
          xpReward: 100,
          grammarRuleIds: ['present-simple'],
          order: 2,
        },
        {
          id: 'basic-vocabulary',
          title_pt: 'Vocabulário Essencial',
          title_en: 'Essential Vocabulary',
          description_pt: 'Palavras do dia a dia que você precisa conhecer',
          type: 'vocabulary',
          estimatedMinutes: 25,
          xpReward: 75,
          vocabularyTopics: ['greetings', 'numbers', 'colors', 'family'],
          order: 3,
        },
        {
          id: 'basic-pairs',
          title_pt: 'Jogar: Pares de Palavras',
          title_en: 'Play: Word Pairs',
          description_pt: 'Combine palavras e significados (Jogo)',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 100,
          exerciseType: 'matching-pairs',
          order: 4,
        },
        {
          id: 'simple-sentences-practice',
          title_pt: 'Prática: Frases Simples',
          title_en: 'Practice: Simple Sentences',
          description_pt: 'Monte suas primeiras frases em inglês',
          type: 'exercise',
          estimatedMinutes: 15,
          xpReward: 100,
          exerciseType: 'sentence-ordering',
          order: 5,
        },
        {
          id: 'foundations-listening',
          title_pt: 'Prática: Escuta',
          title_en: 'Practice: Listening',
          description_pt: 'Treine seu ouvido com frases simples',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 100,
          exerciseType: 'listening',
          order: 6,
        },
        {
          id: 'foundations-quiz',
          title_pt: 'Quiz: Fundamentos',
          title_en: 'Quiz: Foundations',
          description_pt: 'Teste seus conhecimentos básicos',
          type: 'quiz',
          estimatedMinutes: 10,
          xpReward: 150,
          order: 7,
        },
      ],
    },
    {
      id: 'culture-tips-basic',
      title_pt: 'Dicas Culturais & Normas',
      title_en: 'Culture Tips & Norms',
      description_pt: 'Entenda como os nativos realmente pensam e agem',
      difficulty: 'basico',
      icon: 'Globe',
      color: 'bg-teal-500',
      order: 2,
      lessons: [
         {
          id: 'tipping-culture',
          title_pt: 'Cultura de Gorjetas',
          title_en: 'Tipping Culture',
          description_pt: 'Como funcionam as gorjetas nos EUA e UK',
          type: 'culture',
          estimatedMinutes: 10,
          xpReward: 50,
          order: 1,
        },
        {
          id: 'politeness-levels',
          title_pt: 'Níveis de Polidez',
          title_en: 'Levels of Politeness',
          description_pt: 'Como ser educado em inglês (Please, Thank you, Sorry)',
          type: 'vocabulary',
          estimatedMinutes: 15,
          xpReward: 75,
          vocabularyTopics: ['politeness'],
          order: 2,
        }
      ]
    },
    {
      id: 'daily-conversations',
      title_pt: 'Conversações do Dia a Dia',
      title_en: 'Daily Conversations',
      description_pt: 'Aprenda a se comunicar em situações cotidianas',
      difficulty: 'basico',
      icon: 'MessageCircle',
      color: 'bg-green-500',
      order: 3,
      prerequisites: ['foundations'],
      lessons: [
        {
          id: 'greetings-introductions',
          title_pt: 'Saudações e Apresentações',
          title_en: 'Greetings and Introductions',
          description_pt: 'Como cumprimentar e se apresentar',
          type: 'vocabulary',
          estimatedMinutes: 20,
          xpReward: 75,
          vocabularyTopics: ['greetings', 'introductions'],
          order: 1,
        },
        {
          id: 'questions-basics',
          title_pt: 'Perguntas Básicas',
          title_en: 'Basic Questions',
          description_pt: 'Aprenda a fazer e responder perguntas simples',
          type: 'grammar',
          estimatedMinutes: 25,
          xpReward: 100,
          grammarRuleIds: ['question-words', 'yes-no-questions'],
          order: 2,
        },
        {
          id: 'conversation-practice',
          title_pt: 'Prática: Diálogos',
          title_en: 'Practice: Dialogues',
          description_pt: 'Identifique frases corretas em conversações',
          type: 'exercise',
          estimatedMinutes: 20,
          xpReward: 125,
          exerciseType: 'sentence-identification',
          order: 3,
        },
        {
          id: 'conversations-quiz',
          title_pt: 'Quiz: Conversações',
          title_en: 'Quiz: Conversations',
          description_pt: 'Avalie seu progresso em conversações',
          type: 'quiz',
          estimatedMinutes: 15,
          xpReward: 150,
          order: 4,
        },
      ],
    },
    {
      id: 'past-present',
      title_pt: 'Passado e Presente',
      title_en: 'Past and Present',
      description_pt: 'Domine os tempos verbais essenciais',
      difficulty: 'basico',
      icon: 'Clock',
      color: 'bg-purple-500',
      order: 3,
      prerequisites: ['daily-conversations'],
      lessons: [
        {
          id: 'past-simple-intro',
          title_pt: 'Past Simple',
          title_en: 'Past Simple',
          description_pt: 'Fale sobre o passado com confiança',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 100,
          grammarRuleIds: ['past-simple'],
          order: 1,
        },
        {
          id: 'present-continuous-intro',
          title_pt: 'Present Continuous',
          title_en: 'Present Continuous',
          description_pt: 'Descreva ações em andamento',
          type: 'grammar',
          estimatedMinutes: 25,
          xpReward: 100,
          grammarRuleIds: ['present-continuous'],
          order: 2,
        },
        {
          id: 'tense-comparison',
          title_pt: 'Comparando Tempos Verbais',
          title_en: 'Comparing Tenses',
          description_pt: 'Entenda quando usar cada tempo verbal',
          type: 'grammar',
          estimatedMinutes: 20,
          xpReward: 75,
          grammarRuleIds: ['present-simple', 'past-simple', 'present-continuous'],
          order: 3,
        },
        {
          id: 'tenses-practice',
          title_pt: 'Prática: Tempos Verbais',
          title_en: 'Practice: Verb Tenses',
          description_pt: 'Encontre erros em frases com diferentes tempos',
          type: 'exercise',
          estimatedMinutes: 25,
          xpReward: 150,
          exerciseType: 'find-incorrect-words',
          order: 4,
        },
        {
          id: 'tenses-quiz',
          title_pt: 'Quiz: Tempos Verbais',
          title_en: 'Quiz: Verb Tenses',
          description_pt: 'Teste seu domínio dos tempos verbais',
          type: 'quiz',
          estimatedMinutes: 15,
          xpReward: 175,
          order: 5,
        },
      ],
    },

    // ========== TRAVEL & BASICS ==========
    {
      id: 'travel-basics',
      title_pt: 'Inglês para Viagem',
      title_en: 'Travel English',
      description_pt: 'Vocabulário e frases essenciais para viajar',
      difficulty: 'basico',
      icon: 'Plane',
      color: 'bg-cyan-500',
      order: 4,
      prerequisites: ['past-present'],
      lessons: [
        {
          id: 'airport-vocabulary',
          title_pt: 'No Aeroporto',
          title_en: 'At the Airport',
          description_pt: 'Check-in, segurança e embarque',
          type: 'vocabulary',
          estimatedMinutes: 20,
          xpReward: 80,
          vocabularyTopics: ['airport', 'travel-documents'],
          order: 1,
        },
        {
          id: 'hotel-checkin',
          title_pt: 'No Hotel',
          title_en: 'At the Hotel',
          description_pt: 'Fazendo check-in e pedindo serviços',
          type: 'vocabulary',
          estimatedMinutes: 20,
          xpReward: 80,
          vocabularyTopics: ['hotel'],
          order: 2,
        },
        {
          id: 'directions',
          title_pt: 'Pedindo Informações',
          title_en: 'Asking for Directions',
          description_pt: 'Como chegar onde você quer',
          type: 'exercise',
          estimatedMinutes: 15,
          xpReward: 100,
          exerciseType: 'listening',
          order: 3,
        }
      ]
    },
    // ========== NÍVEL INTERMEDIÁRIO ==========
    {
      id: 'perfect-tenses',
      title_pt: 'Tempos Perfeitos',
      title_en: 'Perfect Tenses',
      description_pt: 'Avance com os tempos verbais perfeitos',
      difficulty: 'intermediario',
      icon: 'Award',
      color: 'bg-orange-500',
      order: 4,
      prerequisites: ['past-present'],
      lessons: [
        {
          id: 'present-perfect-intro',
          title_pt: 'Present Perfect',
          title_en: 'Present Perfect',
          description_pt: 'Conecte o passado com o presente',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['present-perfect'],
          order: 1,
        },
        {
          id: 'past-perfect-intro',
          title_pt: 'Past Perfect',
          title_en: 'Past Perfect',
          description_pt: 'Fale sobre ações antes de outras no passado',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['past-perfect'],
          order: 2,
        },
        {
          id: 'perfect-vs-simple',
          title_pt: 'Perfect vs Simple',
          title_en: 'Perfect vs Simple',
          description_pt: 'Entenda as diferenças sutis',
          type: 'grammar',
          estimatedMinutes: 25,
          xpReward: 100,
          order: 3,
        },
        {
          id: 'perfect-tenses-practice',
          title_pt: 'Prática: Tempos Perfeitos',
          title_en: 'Practice: Perfect Tenses',
          description_pt: 'Aplique seu conhecimento em exercícios',
          type: 'exercise',
          estimatedMinutes: 30,
          xpReward: 175,
          exerciseType: 'sentence-identification',
          order: 4,
        },
        {
          id: 'perfect-reading',
          title_pt: 'Leitura: Experiências de Vida',
          title_en: 'Reading: Life Experiences',
          description_pt: 'Leia textos que usam tempos perfeitos',
          type: 'reading',
          estimatedMinutes: 25,
          xpReward: 150,
          exerciseType: 'news-comprehension',
          order: 5,
        },
      ],
    },
    {
      id: 'conditionals',
      title_pt: 'Condicionais',
      title_en: 'Conditionals',
      description_pt: 'Expresse possibilidades e hipóteses',
      difficulty: 'intermediario',
      icon: 'GitBranch',
      color: 'bg-cyan-500',
      order: 5,
      prerequisites: ['perfect-tenses'],
      lessons: [
        {
          id: 'zero-first-conditional',
          title_pt: 'Zero e First Conditional',
          title_en: 'Zero and First Conditional',
          description_pt: 'Situações reais e prováveis',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['zero-conditional', 'first-conditional'],
          order: 1,
        },
        {
          id: 'second-conditional',
          title_pt: 'Second Conditional',
          title_en: 'Second Conditional',
          description_pt: 'Situações hipotéticas no presente',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['second-conditional'],
          order: 2,
        },
        {
          id: 'third-conditional',
          title_pt: 'Third Conditional',
          title_en: 'Third Conditional',
          description_pt: 'Situações hipotéticas no passado',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['third-conditional'],
          order: 3,
        },
        {
          id: 'conditionals-practice',
          title_pt: 'Prática: Condicionais',
          title_en: 'Practice: Conditionals',
          description_pt: 'Domine as estruturas condicionais',
          type: 'exercise',
          estimatedMinutes: 35,
          xpReward: 200,
          exerciseType: 'find-incorrect-words',
          order: 4,
        },
      ],
    },
    {
      id: 'passive-voice',
      title_pt: 'Voz Passiva',
      title_en: 'Passive Voice',
      description_pt: 'Aprenda a usar a voz passiva em diferentes contextos',
      difficulty: 'intermediario',
      icon: 'Repeat',
      color: 'bg-pink-500',
      order: 6,
      prerequisites: ['conditionals'],
      lessons: [
        {
          id: 'passive-basics',
          title_pt: 'Introdução à Voz Passiva',
          title_en: 'Introduction to Passive Voice',
          description_pt: 'Entenda a estrutura básica',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['passive-voice'],
          order: 1,
        },
        {
          id: 'passive-tenses',
          title_pt: 'Voz Passiva em Diferentes Tempos',
          title_en: 'Passive Voice in Different Tenses',
          description_pt: 'Use a passiva em vários tempos verbais',
          type: 'grammar',
          estimatedMinutes: 35,
          xpReward: 150,
          order: 2,
        },
        {
          id: 'active-passive-conversion',
          title_pt: 'Convertendo Voz Ativa e Passiva',
          title_en: 'Converting Active and Passive Voice',
          description_pt: 'Pratique conversões entre vozes',
          type: 'exercise',
          estimatedMinutes: 30,
          xpReward: 175,
          exerciseType: 'sentence-ordering',
          order: 3,
        },
        {
          id: 'passive-reading',
          title_pt: 'Leitura: Textos Formais',
          title_en: 'Reading: Formal Texts',
          description_pt: 'Leia textos que usam voz passiva',
          type: 'reading',
          estimatedMinutes: 25,
          xpReward: 150,
          exerciseType: 'news-comprehension',
          order: 4,
        },
      ],
    },

    // ========== BUSINESS ENGLISH ==========
    {
      id: 'business-english',
      title_pt: 'Inglês para Negócios',
      title_en: 'Business English',
      description_pt: 'Vocabulário e situações do mundo corporativo',
      difficulty: 'intermediario',
      icon: 'Briefcase',
      color: 'bg-slate-500',
      order: 7,
      prerequisites: ['passive-voice'],
      lessons: [
        {
          id: 'emails',
          title_pt: 'Emails Profissionais',
          title_en: 'Professional Emails',
          description_pt: 'Como escrever emails formais',
          type: 'vocabulary',
          estimatedMinutes: 25,
          xpReward: 100,
          vocabularyTopics: ['business-writing'],
          order: 1,
        },
        {
          id: 'meetings',
          title_pt: 'Reuniões',
          title_en: 'Meetings',
          description_pt: 'Vocabulário para participar de reuniões',
          type: 'exercise',
          estimatedMinutes: 20,
          xpReward: 100,
          exerciseType: 'listening',
          order: 2,
        },
        {
          id: 'presentations',
          title_pt: 'Apresentações',
          title_en: 'Presentations',
          description_pt: 'Dicas para apresentar em inglês',
          type: 'reading',
          estimatedMinutes: 30,
          xpReward: 120,
          exerciseType: 'news-comprehension',
          order: 3,
        }
      ]
    },

    // ========== NÍVEL AVANÇADO ==========
    {
      id: 'advanced-grammar',
      title_pt: 'Gramática Avançada',
      title_en: 'Advanced Grammar',
      description_pt: 'Estruturas gramaticais complexas e sofisticadas',
      difficulty: 'avancado',
      icon: 'Brain',
      color: 'bg-red-500',
      order: 7,
      prerequisites: ['passive-voice'],
      lessons: [
        {
          id: 'reported-speech',
          title_pt: 'Discurso Indireto',
          title_en: 'Reported Speech',
          description_pt: 'Relate o que outros disseram',
          type: 'grammar',
          estimatedMinutes: 35,
          xpReward: 150,
          grammarRuleIds: ['reported-speech'],
          order: 1,
        },
        {
          id: 'modal-verbs-advanced',
          title_pt: 'Verbos Modais Avançados',
          title_en: 'Advanced Modal Verbs',
          description_pt: 'Nuances dos verbos modais',
          type: 'grammar',
          estimatedMinutes: 35,
          xpReward: 150,
          grammarRuleIds: ['modals'],
          order: 2,
        },
        {
          id: 'relative-clauses',
          title_pt: 'Orações Relativas',
          title_en: 'Relative Clauses',
          description_pt: 'Conecte ideias com cláusulas relativas',
          type: 'grammar',
          estimatedMinutes: 35,
          xpReward: 150,
          grammarRuleIds: ['relative-clauses'],
          order: 3,
        },
        {
          id: 'advanced-grammar-practice',
          title_pt: 'Prática: Gramática Avançada',
          title_en: 'Practice: Advanced Grammar',
          description_pt: 'Exercícios complexos de gramática',
          type: 'exercise',
          estimatedMinutes: 40,
          xpReward: 225,
          exerciseType: 'find-incorrect-words',
          order: 4,
        },
      ],
    },
    {
      id: 'idiomatic-expressions',
      title_pt: 'Expressões Idiomáticas',
      title_en: 'Idiomatic Expressions',
      description_pt: 'Fale como um nativo com expressões idiomáticas',
      difficulty: 'avancado',
      icon: 'Sparkles',
      color: 'bg-yellow-500',
      order: 8,
      prerequisites: ['advanced-grammar'],
      lessons: [
        {
          id: 'common-idioms',
          title_pt: 'Idiomas Comuns',
          title_en: 'Common Idioms',
          description_pt: 'Expressões do dia a dia',
          type: 'vocabulary',
          estimatedMinutes: 30,
          xpReward: 150,
          vocabularyTopics: ['idioms-common'],
          order: 1,
        },
        {
          id: 'phrasal-verbs-advanced',
          title_pt: 'Phrasal Verbs Avançados',
          title_en: 'Advanced Phrasal Verbs',
          description_pt: 'Domine phrasal verbs complexos',
          type: 'vocabulary',
          estimatedMinutes: 35,
          xpReward: 150,
          vocabularyTopics: ['phrasal-verbs-advanced'],
          order: 2,
        },
        {
          id: 'colloquialisms',
          title_pt: 'Coloquialismos',
          title_en: 'Colloquialisms',
          description_pt: 'Linguagem informal e gírias',
          type: 'vocabulary',
          estimatedMinutes: 30,
          xpReward: 150,
          vocabularyTopics: ['slang', 'colloquialisms'],
          order: 3,
        },
        {
          id: 'idioms-practice',
          title_pt: 'Prática: Expressões Idiomáticas',
          title_en: 'Practice: Idiomatic Expressions',
          description_pt: 'Use expressões em contexto',
          type: 'exercise',
          estimatedMinutes: 30,
          xpReward: 200,
          exerciseType: 'sentence-identification',
          order: 4,
        },
      ],
    },
    {
      id: 'advanced-reading',
      title_pt: 'Leitura Avançada',
      title_en: 'Advanced Reading',
      description_pt: 'Compreenda textos complexos e literários',
      difficulty: 'avancado',
      icon: 'BookOpen',
      color: 'bg-indigo-500',
      order: 9,
      prerequisites: ['idiomatic-expressions'],
      lessons: [
        {
          id: 'literary-texts',
          title_pt: 'Textos Literários',
          title_en: 'Literary Texts',
          description_pt: 'Analise literatura em inglês',
          type: 'reading',
          estimatedMinutes: 40,
          xpReward: 200,
          exerciseType: 'news-comprehension',
          order: 1,
        },
        {
          id: 'academic-writing',
          title_pt: 'Escrita Acadêmica',
          title_en: 'Academic Writing',
          description_pt: 'Entenda textos acadêmicos',
          type: 'reading',
          estimatedMinutes: 40,
          xpReward: 200,
          exerciseType: 'news-comprehension',
          order: 2,
        },
        {
          id: 'critical-analysis',
          title_pt: 'Análise Crítica',
          title_en: 'Critical Analysis',
          description_pt: 'Desenvolva pensamento crítico em inglês',
          type: 'reading',
          estimatedMinutes: 45,
          xpReward: 225,
          exerciseType: 'news-comprehension',
          order: 3,
        },
        {
          id: 'mastery-quiz',
          title_pt: 'Quiz Final: Domínio do Inglês',
          title_en: 'Final Quiz: English Mastery',
          description_pt: 'Teste completo de todos os níveis',
          type: 'quiz',
          estimatedMinutes: 45,
          xpReward: 500,
          order: 4,
        },
      ],
    },
  ],
};

// Função auxiliar para obter estatísticas do currículo
export function getCurriculumStats(data: LearningPath = curriculumData) {
  const modules = data.modules;
  const totalModules = modules.length;

  let totalLessons = 0;
  let totalXP = 0;
  let totalMinutes = 0;
  let basicModules = 0;
  let intermediateModules = 0;
  let advancedModules = 0;

  for (const module of modules) {
    if (module.difficulty === 'basico') basicModules++;
    else if (module.difficulty === 'intermediario') intermediateModules++;
    else if (module.difficulty === 'avancado') advancedModules++;

    const lessons = module.lessons;
    const lessonCount = lessons.length;
    totalLessons += lessonCount;

    for (let i = 0; i < lessonCount; i++) {
      const lesson = lessons[i];
      totalXP += lesson.xpReward;
      totalMinutes += lesson.estimatedMinutes;
    }
  }

  return {
    totalModules,
    totalLessons,
    totalXP,
    totalMinutes,
    totalHours: Math.round(totalMinutes / 60),
    basicModules,
    intermediateModules,
    advancedModules,
  };
}
