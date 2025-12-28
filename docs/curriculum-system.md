# Sistema de Currículo Interativo - PobreLingo

## 🎯 Visão Geral

O PobreLingo agora possui um **sistema de currículo progressivo e interativo** que guia os usuários do básico ao avançado com uma jornada estruturada de aprendizado.

## ✨ Principais Funcionalidades

### 1. **Jornada de Aprendizado Estruturada**
- **9 módulos progressivos** divididos em 3 níveis:
  - 🟢 **Básico** (3 módulos): Fundamentos, Conversações, Passado e Presente
  - 🟠 **Intermediário** (3 módulos): Tempos Perfeitos, Condicionais, Voz Passiva
  - 🔴 **Avançado** (3 módulos): Gramática Avançada, Expressões Idiomáticas, Leitura Avançada

### 2. **Sistema de Progresso e XP**
- ⭐ **Sistema de XP**: Ganhe XP ao completar lições
- 📈 **Níveis**: Suba de nível a cada 100 XP
- 📊 **Rastreamento**: Acompanhe seu progresso em tempo real
- 🎯 **Metas**: Veja quantas lições faltam para completar cada módulo

### 3. **Desbloqueio Progressivo**
- 🔒 Módulos são desbloqueados progressivamente
- ✅ Complete os pré-requisitos para avançar
- 🗺️ Timeline visual mostra seu caminho de aprendizado

### 4. **Lições Diversificadas**
Cada módulo contém lições de diferentes tipos:
- 📚 **Gramática**: Estudo de regras gramaticais
- 📝 **Vocabulário**: Expansão de vocabulário
- 🎯 **Exercícios**: Prática interativa
- 📖 **Leitura**: Compreensão de textos
- 🏆 **Quiz**: Avaliação de conhecimento

### 5. **Sistema de Conquistas**
- 🏅 8 conquistas desbloqueáveis
- 🎖️ Desde "Primeira Lição" até "Mestre"
- 🌟 Badges visuais e animadas

### 6. **Interface Interativa**
- 🎨 Timeline visual com cards coloridos
- 📱 Design responsivo
- 🎯 Indicadores de progresso em tempo real
- ✨ Filtros por nível de dificuldade
- 🔔 Mensagens motivacionais

## 📂 Estrutura de Arquivos

```
src/
├── lib/
│   └── curriculumData.ts          # Dados do currículo (9 módulos, 42+ lições)
├── hooks/
│   └── useCurriculumProgress.ts   # Hook para gerenciar progresso
├── components/
│   └── curriculum/
│       ├── CurriculumProgressCard.tsx      # Card de progresso para dashboard
│       ├── LessonCompletionDialog.tsx      # Dialog de conclusão de lição
│       └── AchievementsCard.tsx            # Card de conquistas
└── pages/
    └── curriculum/
        └── page.tsx               # Página principal da jornada
```

## 🚀 Como Usar

### 1. Acessar a Jornada
- No menu lateral, clique em **"Jornada de Aprendizado"**
- Ou acesse diretamente `/curriculum`

### 2. Começar a Aprender
1. O primeiro módulo ("Fundamentos do Inglês") já está desbloqueado
2. Clique em "Iniciar" em qualquer lição
3. Complete exercícios ou estude gramática
4. Ganhe XP e desbloqueie novos módulos

### 3. Acompanhar Progresso
- **Dashboard**: Veja resumo do progresso
- **Jornada**: Visualize todos os módulos e lições
- **Conquistas**: Desbloqueie badges especiais

## 🎮 Sistema de XP e Níveis

### Como Ganhar XP
- ✅ Complete lições (50-225 XP por lição)
- 📚 Varia de acordo com dificuldade e tipo
- 🎯 Quiz finais dão mais XP (até 500 XP)

### Progressão de Níveis
- **Nível 1**: 0-99 XP
- **Nível 2**: 100-199 XP
- **Nível 3**: 200-299 XP
- E assim por diante...

### XP Total Disponível
- 📊 **Total**: ~4.000+ XP
- 🎯 **Lições**: 42+ lições
- ⏱️ **Tempo**: ~20 horas de conteúdo

## 🏆 Conquistas Disponíveis

| Conquista | Descrição | Requisito |
|-----------|-----------|-----------|
| ⭐ Primeira Lição | Complete sua primeira lição | 1 lição |
| 🎯 Iniciante | Complete o primeiro módulo | 1 módulo |
| 🔥 Dedicado | Alcance o nível 5 | Nível 5 |
| 🏅 Avançado | Complete 50% do currículo | 50% progresso |
| ⚡ Expert | Alcance o nível 10 | Nível 10 |
| 👑 Mestre | Complete todo o currículo | 100% progresso |
| 🎖️ Colecionador de XP | Ganhe 500 XP | 500 XP |
| 🏆 Lenda do XP | Ganhe 1000 XP | 1000 XP |

## 📚 Módulos do Currículo

### 🟢 Nível Básico

#### 1. Fundamentos do Inglês (5 lições)
- Alfabeto e Pronúncia
- Present Simple
- Vocabulário Essencial
- Prática: Frases Simples
- Quiz: Fundamentos

#### 2. Conversações do Dia a Dia (4 lições)
- Saudações e Apresentações
- Perguntas Básicas
- Prática: Diálogos
- Quiz: Conversações

#### 3. Passado e Presente (5 lições)
- Past Simple
- Present Continuous
- Comparando Tempos Verbais
- Prática: Tempos Verbais
- Quiz: Tempos Verbais

### 🟠 Nível Intermediário

#### 4. Tempos Perfeitos (5 lições)
- Present Perfect
- Past Perfect
- Perfect vs Simple
- Prática: Tempos Perfeitos
- Leitura: Experiências de Vida

#### 5. Condicionais (4 lições)
- Zero e First Conditional
- Second Conditional
- Third Conditional
- Prática: Condicionais

#### 6. Voz Passiva (4 lições)
- Introdução à Voz Passiva
- Voz Passiva em Diferentes Tempos
- Convertendo Voz Ativa e Passiva
- Leitura: Textos Formais

### 🔴 Nível Avançado

#### 7. Gramática Avançada (4 lições)
- Discurso Indireto
- Verbos Modais Avançados
- Orações Relativas
- Prática: Gramática Avançada

#### 8. Expressões Idiomáticas (4 lições)
- Idiomas Comuns
- Phrasal Verbs Avançados
- Coloquialismos
- Prática: Expressões Idiomáticas

#### 9. Leitura Avançada (4 lições)
- Textos Literários
- Escrita Acadêmica
- Análise Crítica
- Quiz Final: Domínio do Inglês (500 XP!)

## 💾 Armazenamento

### LocalStorage
Todo o progresso é salvo no `localStorage`:
- `pobrelingo_curriculum_progress`: Lições completadas
- `pobrelingo_total_xp`: XP total acumulado
- `pobrelingo_user_level`: Nível atual do usuário

### Dados Salvos
```typescript
{
  lessonId: string,
  moduleId: string,
  completed: boolean,
  completedAt: string,
  xpEarned: number
}
```

## 🔧 Desenvolvimento

### Adicionar Novo Módulo
Edite `src/lib/curriculumData.ts`:

```typescript
{
  id: 'novo-modulo',
  title_pt: 'Título do Módulo',
  title_en: 'Module Title',
  description_pt: 'Descrição...',
  difficulty: 'basico' | 'intermediario' | 'avancado',
  icon: 'IconName', // Lucide icon
  color: 'bg-color-500',
  order: 10,
  prerequisites: ['modulo-anterior'],
  lessons: [...]
}
```

### Adicionar Nova Lição
```typescript
{
  id: 'nova-licao',
  title_pt: 'Título da Lição',
  title_en: 'Lesson Title',
  description_pt: 'Descrição...',
  type: 'grammar' | 'vocabulary' | 'exercise' | 'reading' | 'quiz',
  estimatedMinutes: 20,
  xpReward: 100,
  grammarRuleIds: ['rule-id'], // opcional
  exerciseType: 'sentence-ordering', // opcional
  order: 1
}
```

## 🎨 Customização

### Cores por Nível
- **Básico**: Verde (`bg-green-500`)
- **Intermediário**: Laranja (`bg-orange-500`)
- **Avançado**: Vermelho (`bg-red-500`)

### Ícones Disponíveis
Qualquer ícone do [Lucide React](https://lucide.dev/icons/):
- Rocket, MessageCircle, Clock, Award, GitBranch, Repeat
- Brain, Sparkles, BookOpen, etc.

## 📱 Responsividade

- ✅ Mobile-first design
- ✅ Grid adaptativo
- ✅ Cards responsivos
- ✅ Timeline vertical em mobile

## 🚀 Próximos Passos

Possíveis melhorias futuras:
- [ ] Integração com exercícios existentes para marcar lições como completas
- [ ] Sistema de streak para lições diárias
- [ ] Recomendações personalizadas baseadas em progresso
- [ ] Certificados ao completar níveis
- [ ] Modo revisão para lições completadas
- [ ] Estatísticas detalhadas por módulo
- [ ] Compartilhamento de progresso nas redes sociais

## 🎉 Conclusão

O sistema de currículo transforma o PobreLingo em uma plataforma de aprendizado completa e gamificada, guiando usuários do zero ao domínio do inglês com uma jornada clara, motivadora e interativa!
