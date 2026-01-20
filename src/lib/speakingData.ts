
export interface SpeakingPhrase {
  phrase: string;
  translation: string;
}

export const speakingData: Record<string, SpeakingPhrase[]> = {
  'pronunciation-basics': [
    { phrase: 'Hello', translation: 'Olá' },
    { phrase: 'Good morning', translation: 'Bom dia' },
    { phrase: 'How are you?', translation: 'Como você está?' },
    { phrase: 'My name is Pobrelingo', translation: 'Meu nome é Pobrelingo' },
    { phrase: 'Nice to meet you', translation: 'Prazer em conhecê-lo' },
    { phrase: 'I love learning English', translation: 'Eu amo aprender inglês' },
    { phrase: 'Thank you very much', translation: 'Muito obrigado' },
    { phrase: 'See you later', translation: 'Até logo' }
  ],
  'travel-phrases': [
    { phrase: 'Where is the bathroom?', translation: 'Onde fica o banheiro?' },
    { phrase: 'I would like a coffee, please', translation: 'Eu gostaria de um café, por favor' },
    { phrase: 'How much does this cost?', translation: 'Quanto custa isso?' },
    { phrase: 'Can you help me?', translation: 'Você pode me ajudar?' },
    { phrase: 'I am lost', translation: 'Estou perdido' },
    { phrase: 'Do you speak Portuguese?', translation: 'Você fala português?' }
  ],
  'business-talk': [
    { phrase: 'Let\'s schedule a meeting', translation: 'Vamos marcar uma reunião' },
    { phrase: 'I agree with your proposal', translation: 'Eu concordo com sua proposta' },
    { phrase: 'Please send me the report', translation: 'Por favor, me envie o relatório' },
    { phrase: 'Thank you for your time', translation: 'Obrigado pelo seu tempo' },
    { phrase: 'We need to increase efficiency', translation: 'Precisamos aumentar a eficiência' }
  ],
  'fluency-challenge': [
    { phrase: 'The quick brown fox jumps over the lazy dog', translation: 'A rápida raposa marrom pula sobre o cachorro preguiçoso' },
    { phrase: 'She sells seashells by the seashore', translation: 'Ela vende conchas na beira do mar' },
    { phrase: 'I have been studying English for five years', translation: 'Eu tenho estudado inglês por cinco anos' },
    { phrase: 'If I had known, I would have come earlier', translation: 'Se eu soubesse, teria vindo mais cedo' },
    { phrase: 'Although it was raining, we went for a walk', translation: 'Embora estivesse chovendo, fomos caminhar' }
  ]
};
