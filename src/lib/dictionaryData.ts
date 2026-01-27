
export interface DictionaryEntry {
  id: string;
  word: string;
  phonetic_transcription_en?: string; // e.g., /həˈloʊ/
  meaning_en: string;
  translation_pt: string;
  example_sentence_en?: string;
  example_sentence_pt?: string;
  category?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'expression' | 'preposition' | 'pronoun' | 'conjunction' | 'interjection';
  tags?: string[];
}

export const dictionaryEntries: DictionaryEntry[] = [
  // --- EXISTING DICTIONARY ENTRIES (General) ---
  {
    id: 'dict1',
    word: 'hello',
    phonetic_transcription_en: '/həˈloʊ/',
    meaning_en: 'A greeting or salutation.',
    translation_pt: 'olá',
    example_sentence_en: 'She said hello to her new neighbors.',
    example_sentence_pt: 'Ela disse olá para seus novos vizinhos.',
    tags: ['general', 'greetings']
  },
  {
    id: 'dict2',
    word: 'world',
    phonetic_transcription_en: '/wɜːrld/',
    meaning_en: 'The earth, together with all of its countries and peoples.',
    translation_pt: 'mundo',
    example_sentence_en: 'He traveled the world.',
    example_sentence_pt: 'Ele viajou o mundo.',
    tags: ['general']
  },
  {
    id: 'dict3',
    word: 'learn',
    phonetic_transcription_en: '/lɜːrn/',
    meaning_en: 'Gain or acquire knowledge of or skill in (something) by study, experience, or being taught.',
    translation_pt: 'aprender',
    example_sentence_en: 'They are eager to learn English.',
    example_sentence_pt: 'Eles estão ansiosos para aprender inglês.',
    tags: ['general']
  },
  // ... (Keeping core entries but adding tags for searchability)
  {
    id: 'dict4',
    word: 'book',
    meaning_en: 'A written or printed work consisting of pages glued or sewn together along one side and bound in covers.',
    translation_pt: 'livro',
    example_sentence_en: 'I am reading an interesting book.',
    tags: ['general']
  },
  {
    id: 'dict5',
    word: 'house',
    meaning_en: 'A building for human habitation.',
    translation_pt: 'casa',
    example_sentence_en: 'They bought a new house.',
    tags: ['general']
  },

  // --- MIGRATED LESSON DATA (Alphabet) ---
  { id: 'alpha1', word: 'A (ei)', translation_pt: 'Letra A', meaning_en: 'The first letter of the alphabet.', example_sentence_en: 'Apple, Ate, Amazing', tags: ['alphabet'] },
  { id: 'alpha2', word: 'B (bi)', translation_pt: 'Letra B', meaning_en: 'The second letter.', example_sentence_en: 'Book, Beautiful, Big', tags: ['alphabet'] },
  { id: 'alpha3', word: 'C (si)', translation_pt: 'Letra C', meaning_en: 'The third letter.', example_sentence_en: 'Cat, City, Circle', tags: ['alphabet'] },
  { id: 'alpha4', word: 'D (di)', translation_pt: 'Letra D', meaning_en: 'The fourth letter.', example_sentence_en: 'Dog, Dance, Day', tags: ['alphabet'] },
  { id: 'alpha5', word: 'E (i)', translation_pt: 'Letra E', meaning_en: 'The fifth letter.', example_sentence_en: 'Egg, Elephant, End', tags: ['alphabet'] },
  { id: 'alpha6', word: 'F (éf)', translation_pt: 'Letra F', meaning_en: 'The sixth letter.', example_sentence_en: 'Fish, Friend, Fun', tags: ['alphabet'] },
  { id: 'alpha7', word: 'G (dji)', translation_pt: 'Letra G', meaning_en: 'The seventh letter.', example_sentence_en: 'Game, Great, Good', tags: ['alphabet'] },
  { id: 'alpha8', word: 'H (eitch)', translation_pt: 'Letra H', meaning_en: 'The eighth letter.', example_sentence_en: 'House, Happy, Help', tags: ['alphabet'] },
  { id: 'alpha9', word: 'I (ai)', translation_pt: 'Letra I', meaning_en: 'The ninth letter.', example_sentence_en: 'Ice, Island, Idea', tags: ['alphabet'] },
  { id: 'alpha10', word: 'J (djei)', translation_pt: 'Letra J', meaning_en: 'The tenth letter.', example_sentence_en: 'Jump, Just, Joy', tags: ['alphabet'] },
  { id: 'alpha11', word: 'K (kei)', translation_pt: 'Letra K', meaning_en: 'The eleventh letter.', example_sentence_en: 'King, Keep, Kind', tags: ['alphabet'] },
  { id: 'alpha12', word: 'L (él)', translation_pt: 'Letra L', meaning_en: 'The twelfth letter.', example_sentence_en: 'Love, Learn, Life', tags: ['alphabet'] },
  { id: 'alpha13', word: 'M (êm)', translation_pt: 'Letra M', meaning_en: 'The thirteenth letter.', example_sentence_en: 'Mother, Music, Magic', tags: ['alphabet'] },
  { id: 'alpha14', word: 'N (ên)', translation_pt: 'Letra N', meaning_en: 'The fourteenth letter.', example_sentence_en: 'Name, Night, New', tags: ['alphabet'] },
  { id: 'alpha15', word: 'O (ou)', translation_pt: 'Letra O', meaning_en: 'The fifteenth letter.', example_sentence_en: 'Ocean, Open, Old', tags: ['alphabet'] },
  { id: 'alpha16', word: 'P (pi)', translation_pt: 'Letra P', meaning_en: 'The sixteenth letter.', example_sentence_en: 'People, Perfect, Place', tags: ['alphabet'] },
  { id: 'alpha17', word: 'Q (kiu)', translation_pt: 'Letra Q', meaning_en: 'The seventeenth letter.', example_sentence_en: 'Queen, Question, Quick', tags: ['alphabet'] },
  { id: 'alpha18', word: 'R (ar)', translation_pt: 'Letra R', meaning_en: 'The eighteenth letter.', example_sentence_en: 'Run, Really, Right', tags: ['alphabet'] },
  { id: 'alpha19', word: 'S (és)', translation_pt: 'Letra S', meaning_en: 'The nineteenth letter.', example_sentence_en: 'Sun, Smile, Story', tags: ['alphabet'] },
  { id: 'alpha20', word: 'T (ti)', translation_pt: 'Letra T', meaning_en: 'The twentieth letter.', example_sentence_en: 'Time, True, Take', tags: ['alphabet'] },
  { id: 'alpha21', word: 'U (iu)', translation_pt: 'Letra U', meaning_en: 'The twenty-first letter.', example_sentence_en: 'Use, Under, Up', tags: ['alphabet'] },
  { id: 'alpha22', word: 'V (vi)', translation_pt: 'Letra V', meaning_en: 'The twenty-second letter.', example_sentence_en: 'Very, Voice, View', tags: ['alphabet'] },
  { id: 'alpha23', word: 'W (dâbliu)', translation_pt: 'Letra W', meaning_en: 'The twenty-third letter.', example_sentence_en: 'Water, World, Why', tags: ['alphabet'] },
  { id: 'alpha24', word: 'X (éks)', translation_pt: 'Letra X', meaning_en: 'The twenty-fourth letter.', example_sentence_en: 'Example, Exit, Box', tags: ['alphabet'] },
  { id: 'alpha25', word: 'Y (uai)', translation_pt: 'Letra Y', meaning_en: 'The twenty-fifth letter.', example_sentence_en: 'Yes, Year, Young', tags: ['alphabet'] },
  { id: 'alpha26', word: 'Z (zi)', translation_pt: 'Letra Z', meaning_en: 'The twenty-sixth letter.', example_sentence_en: 'Zero, Zoo, Zigzag', tags: ['alphabet'] },

  // --- MIGRATED LESSON DATA (Basic Sounds) ---
  { id: 'sound1', word: '/æ/ (cat)', translation_pt: 'Som do A em "gato" (curto)', meaning_en: 'Short A sound.', example_sentence_en: 'Cat, hat, mat, bat, sad', tags: ['basic-sounds'] },
  { id: 'sound2', word: '/eɪ/ (cake)', translation_pt: 'Som do A em "bolo" (longo)', meaning_en: 'Long A sound.', example_sentence_en: 'Cake, make, take, late, name', tags: ['basic-sounds'] },
  { id: 'sound3', word: '/iː/ (see)', translation_pt: 'Som do I longo', meaning_en: 'Long E sound.', example_sentence_en: 'See, tree, bee, free, meet', tags: ['basic-sounds'] },
  { id: 'sound4', word: '/ɪ/ (sit)', translation_pt: 'Som do I curto', meaning_en: 'Short I sound.', example_sentence_en: 'Sit, hit, bit, fit, big', tags: ['basic-sounds'] },

  // --- MIGRATED LESSON DATA (Greetings) ---
  { id: 'greet1', word: 'Hello', translation_pt: 'Olá', meaning_en: 'Common greeting.', example_sentence_en: 'Hello! How are you?', tags: ['greetings'] },
  { id: 'greet2', word: 'Good morning', translation_pt: 'Bom dia', meaning_en: 'Greeting used in the morning.', example_sentence_en: 'Good morning, everyone!', tags: ['greetings'] },
  { id: 'greet3', word: 'Good afternoon', translation_pt: 'Boa tarde', meaning_en: 'Greeting used in the afternoon.', example_sentence_en: 'Good afternoon, sir.', tags: ['greetings'] },
  { id: 'greet4', word: 'Good evening', translation_pt: 'Boa noite (chegada)', meaning_en: 'Greeting used in the evening.', example_sentence_en: 'Good evening, folks!', tags: ['greetings'] },
  { id: 'greet5', word: 'Good night', translation_pt: 'Boa noite (saída/dormir)', meaning_en: 'Farewell used at night.', example_sentence_en: 'Good night, sleep well!', tags: ['greetings'] },
  { id: 'greet6', word: 'Goodbye', translation_pt: 'Adeus', meaning_en: 'Farewell.', example_sentence_en: 'Goodbye! See you later.', tags: ['greetings'] },
  { id: 'greet7', word: 'See you', translation_pt: 'Até logo', meaning_en: 'Casual farewell.', example_sentence_en: 'See you tomorrow!', tags: ['greetings'] },
  { id: 'greet8', word: 'How are you?', translation_pt: 'Como você está?', meaning_en: 'Question about well-being.', example_sentence_en: 'Hi! How are you today?', tags: ['greetings'] },
  { id: 'greet9', word: 'I\'m fine', translation_pt: 'Estou bem', meaning_en: 'Response to "How are you?".', example_sentence_en: 'I\'m fine, thank you!', tags: ['greetings'] },
  { id: 'greet10', word: 'Thank you', translation_pt: 'Obrigado(a)', meaning_en: 'Expression of gratitude.', example_sentence_en: 'Thank you very much!', tags: ['greetings', 'politeness'] },

  // --- MIGRATED LESSON DATA (Numbers) ---
  { id: 'num1', word: 'One', translation_pt: 'Um', meaning_en: 'Number 1.', example_sentence_en: 'I have one apple.', tags: ['numbers'] },
  { id: 'num2', word: 'Two', translation_pt: 'Dois', meaning_en: 'Number 2.', example_sentence_en: 'Two cats.', tags: ['numbers'] },
  { id: 'num3', word: 'Three', translation_pt: 'Três', meaning_en: 'Number 3.', example_sentence_en: 'Three dogs.', tags: ['numbers'] },
  { id: 'num4', word: 'Four', translation_pt: 'Quatro', meaning_en: 'Number 4.', example_sentence_en: 'Four cars.', tags: ['numbers'] },
  { id: 'num5', word: 'Five', translation_pt: 'Cinco', meaning_en: 'Number 5.', example_sentence_en: 'Five stars.', tags: ['numbers'] },
  { id: 'num6', word: 'Six', translation_pt: 'Seis', meaning_en: 'Number 6.', example_sentence_en: 'Six days.', tags: ['numbers'] },
  { id: 'num7', word: 'Seven', translation_pt: 'Sete', meaning_en: 'Number 7.', example_sentence_en: 'Seven wonders.', tags: ['numbers'] },
  { id: 'num8', word: 'Eight', translation_pt: 'Oito', meaning_en: 'Number 8.', example_sentence_en: 'Eight hours.', tags: ['numbers'] },
  { id: 'num9', word: 'Nine', translation_pt: 'Nove', meaning_en: 'Number 9.', example_sentence_en: 'Nine lives.', tags: ['numbers'] },
  { id: 'num10', word: 'Ten', translation_pt: 'Dez', meaning_en: 'Number 10.', example_sentence_en: 'Ten fingers.', tags: ['numbers'] },

  // --- MIGRATED LESSON DATA (Colors) ---
  { id: 'col1', word: 'Red', translation_pt: 'Vermelho', meaning_en: 'Color of blood.', example_sentence_en: 'The apple is red.', tags: ['colors'] },
  { id: 'col2', word: 'Blue', translation_pt: 'Azul', meaning_en: 'Color of the sky.', example_sentence_en: 'The sky is blue.', tags: ['colors'] },
  { id: 'col3', word: 'Green', translation_pt: 'Verde', meaning_en: 'Color of grass.', example_sentence_en: 'The grass is green.', tags: ['colors'] },
  { id: 'col4', word: 'Yellow', translation_pt: 'Amarelo', meaning_en: 'Color of the sun.', example_sentence_en: 'The sun is yellow.', tags: ['colors'] },
  { id: 'col5', word: 'Black', translation_pt: 'Preto', meaning_en: 'Darkest color.', example_sentence_en: 'The night is black.', tags: ['colors'] },
  { id: 'col6', word: 'White', translation_pt: 'Branco', meaning_en: 'Color of snow.', example_sentence_en: 'Snow is white.', tags: ['colors'] },

  // --- MIGRATED LESSON DATA (Family) ---
  { id: 'fam1', word: 'Father', translation_pt: 'Pai', meaning_en: 'Male parent.', example_sentence_en: 'My father is tall.', tags: ['family'] },
  { id: 'fam2', word: 'Mother', translation_pt: 'Mãe', meaning_en: 'Female parent.', example_sentence_en: 'My mother is kind.', tags: ['family'] },
  { id: 'fam3', word: 'Brother', translation_pt: 'Irmão', meaning_en: 'Male sibling.', example_sentence_en: 'I have a brother.', tags: ['family'] },
  { id: 'fam4', word: 'Sister', translation_pt: 'Irmã', meaning_en: 'Female sibling.', example_sentence_en: 'I have a sister.', tags: ['family'] },

  // --- MIGRATED LESSON DATA (Introductions) ---
  { id: 'intro1', word: 'My name is...', translation_pt: 'Meu nome é...', meaning_en: 'Self introduction.', example_sentence_en: 'My name is John.', tags: ['introductions'] },
  { id: 'intro2', word: 'I am from...', translation_pt: 'Eu sou de...', meaning_en: 'Origin.', example_sentence_en: 'I am from Brazil.', tags: ['introductions'] },
  { id: 'intro3', word: 'Nice to meet you', translation_pt: 'Prazer em conhecê-lo', meaning_en: 'Greeting someone for the first time.', example_sentence_en: 'Nice to meet you too.', tags: ['introductions'] },

  // --- MIGRATED LESSON DATA (Idioms) ---
  { id: 'idm1', word: 'Break a leg', translation_pt: 'Boa sorte', meaning_en: 'Good luck (theatrical).', example_sentence_en: 'Break a leg on stage!', tags: ['idioms-common'] },
  { id: 'idm2', word: 'Piece of cake', translation_pt: 'Muito fácil', meaning_en: 'Something very easy to do.', example_sentence_en: 'The test was a piece of cake.', tags: ['idioms-common'] },
  { id: 'idm3', word: 'Hit the books', translation_pt: 'Estudar', meaning_en: 'To study hard.', example_sentence_en: 'I have an exam, I need to hit the books.', tags: ['idioms-common'] },
  { id: 'idm4', word: 'Under the weather', translation_pt: 'Doente/indisposto', meaning_en: 'Feeling sick.', example_sentence_en: 'I am feeling a bit under the weather.', tags: ['idioms-common'] },

  // --- MIGRATED LESSON DATA (Phrasal Verbs) ---
  { id: 'pv1', word: 'Look forward to', translation_pt: 'Aguardar ansiosamente', meaning_en: 'To await with excitement.', example_sentence_en: 'I look forward to meeting you.', tags: ['phrasal-verbs-advanced'] },
  { id: 'pv2', word: 'Put up with', translation_pt: 'Tolerar', meaning_en: 'To tolerate.', example_sentence_en: 'I cannot put up with this noise.', tags: ['phrasal-verbs-advanced'] },
  { id: 'pv3', word: 'Run into', translation_pt: 'Encontrar por acaso', meaning_en: 'Meet unexpectedly.', example_sentence_en: 'I ran into Tom yesterday.', tags: ['phrasal-verbs-advanced'] },

  // --- MIGRATED LESSON DATA (Slang/Colloquial) ---
  { id: 'sl1', word: 'Cool', translation_pt: 'Legal', meaning_en: 'Fashionable or impressive.', example_sentence_en: 'That car is cool.', tags: ['slang'] },
  { id: 'sl2', word: 'Awesome', translation_pt: 'Incrível', meaning_en: 'Extremely impressive.', example_sentence_en: 'The movie was awesome.', tags: ['slang'] },
  { id: 'col1_1', word: 'You bet', translation_pt: 'Com certeza', meaning_en: 'Certainly.', example_sentence_en: 'Are you coming? You bet!', tags: ['colloquialisms'] },
  { id: 'col1_2', word: 'No way', translation_pt: 'De jeito nenhum', meaning_en: 'Incredulity or refusal.', example_sentence_en: 'No way! Did that really happen?', tags: ['colloquialisms'] },

  // --- ADVANCED VOCABULARY (C1/C2) ---
  { id: 'adv_adj1', word: 'ephemeral', translation_pt: 'efêmero', meaning_en: 'Lasting for a very short time.', example_sentence_en: 'Fashions are ephemeral, changing with every season.', tags: ['advanced-adjectives', 'c2-vocabulary'] },
  { id: 'adv_adj2', word: 'ubiquitous', translation_pt: 'onipresente', meaning_en: 'Present, appearing, or found everywhere.', example_sentence_en: 'Smartphones have become ubiquitous.', tags: ['advanced-adjectives', 'c2-vocabulary'] },
  { id: 'adv_adj3', word: 'meticulous', translation_pt: 'meticuloso', meaning_en: 'Showing great attention to detail; very careful and precise.', example_sentence_en: 'He was meticulous about his appearance.', tags: ['advanced-adjectives', 'c2-vocabulary'] },
  { id: 'adv_adj4', word: 'pragmatic', translation_pt: 'pragmático', meaning_en: 'Dealing with things sensibly and realistically.', example_sentence_en: 'We need a pragmatic solution to this crisis.', tags: ['advanced-adjectives', 'c2-vocabulary'] },
  { id: 'adv_adj5', word: 'eloquent', translation_pt: 'eloquente', meaning_en: 'Fluent or persuasive in speaking or writing.', example_sentence_en: 'She made an eloquent speech.', tags: ['advanced-adjectives', 'c2-vocabulary'] },

  // --- BUSINESS VOCABULARY ---
  { id: 'bus1', word: 'leverage', translation_pt: 'alavancar/aproveitar', meaning_en: 'Use (something) to maximum advantage.', example_sentence_en: 'We need to leverage our key resources.', tags: ['business-negotiation'] },
  { id: 'bus2', word: 'synergy', translation_pt: 'sinergia', meaning_en: 'The interaction of elements that when combined produce a total effect greater than the sum of the individual elements.', example_sentence_en: 'There is a lot of synergy between the two departments.', tags: ['business-negotiation'] },
  { id: 'bus3', word: 'consensus', translation_pt: 'consenso', meaning_en: 'General agreement.', example_sentence_en: 'We reached a consensus on the proposal.', tags: ['business-negotiation', 'debate'] },
  { id: 'bus4', word: 'stakeholder', translation_pt: 'parte interessada', meaning_en: 'A person with an interest or concern in something, especially a business.', example_sentence_en: 'We must consider the needs of all stakeholders.', tags: ['business-negotiation', 'leadership'] },

  // --- LEADERSHIP ---
  { id: 'lead1', word: 'empower', translation_pt: 'empoderar', meaning_en: 'Give (someone) the authority or power to do something.', example_sentence_en: 'We want to empower our employees to make decisions.', tags: ['leadership'] },
  { id: 'lead2', word: 'visionary', translation_pt: 'visionário', meaning_en: 'Thinking about or planning the future with imagination or wisdom.', example_sentence_en: 'He is a visionary leader.', tags: ['leadership'] },
  { id: 'lead3', word: 'delegate', translation_pt: 'delegar', meaning_en: 'Entrust (a task or responsibility) to another person.', example_sentence_en: 'A good manager knows how to delegate.', tags: ['leadership'] },

  // --- DEBATE ---
  { id: 'deb1', word: 'furthermore', translation_pt: 'além disso', meaning_en: 'In addition; more importantly.', example_sentence_en: 'Furthermore, we must consider the cost.', tags: ['debate'] },
  { id: 'deb2', word: 'however', translation_pt: 'contudo', meaning_en: 'Used to introduce a statement that contrasts with or contradicts something that has been said previously.', example_sentence_en: 'It is expensive; however, it is worth it.', tags: ['debate'] },
  { id: 'deb3', word: 'consequently', translation_pt: 'consequentemente', meaning_en: 'As a result.', example_sentence_en: 'He didn\'t study; consequently, he failed.', tags: ['debate'] },
];

export const getWordsByTopic = (topic: string): DictionaryEntry[] => {
  return dictionaryEntries.filter(entry => entry.tags?.includes(topic));
};

export const getWordsByCategory = (category: string): DictionaryEntry[] => {
  return dictionaryEntries.filter(entry => entry.category === category);
};
