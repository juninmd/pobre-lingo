export interface SpeakingPhrase {
	phrase: string;
	translation: string;
}

export const speakingData: Record<string, SpeakingPhrase[]> = {
	"pronunciation-basics": [
		{ phrase: "Hello", translation: "Olá" },
		{ phrase: "Good morning", translation: "Bom dia" },
		{ phrase: "How are you?", translation: "Como você está?" },
		{ phrase: "My name is Pobrelingo", translation: "Meu nome é Pobrelingo" },
		{ phrase: "Nice to meet you", translation: "Prazer em conhecê-lo" },
		{
			phrase: "I love learning English",
			translation: "Eu amo aprender inglês",
		},
		{ phrase: "Thank you very much", translation: "Muito obrigado" },
		{ phrase: "See you later", translation: "Até logo" },
	],
	"travel-phrases": [
		{ phrase: "Where is the bathroom?", translation: "Onde fica o banheiro?" },
		{
			phrase: "I would like a coffee, please",
			translation: "Eu gostaria de um café, por favor",
		},
		{ phrase: "How much does this cost?", translation: "Quanto custa isso?" },
		{ phrase: "Can you help me?", translation: "Você pode me ajudar?" },
		{ phrase: "I am lost", translation: "Estou perdido" },
		{ phrase: "Do you speak Portuguese?", translation: "Você fala português?" },
	],
	"business-talk": [
		{
			phrase: "Let's schedule a meeting",
			translation: "Vamos marcar uma reunião",
		},
		{
			phrase: "I agree with your proposal",
			translation: "Eu concordo com sua proposta",
		},
		{
			phrase: "Please send me the report",
			translation: "Por favor, me envie o relatório",
		},
		{
			phrase: "Thank you for your time",
			translation: "Obrigado pelo seu tempo",
		},
		{
			phrase: "We need to increase efficiency",
			translation: "Precisamos aumentar a eficiência",
		},
	],
	"fluency-challenge": [
		{
			phrase: "The quick brown fox jumps over the lazy dog",
			translation: "A rápida raposa marrom pula sobre o cachorro preguiçoso",
		},
		{
			phrase: "She sells seashells by the seashore",
			translation: "Ela vende conchas na beira do mar",
		},
		{
			phrase: "I have been studying English for five years",
			translation: "Estudo inglês há cinco anos",
		},
		{
			phrase: "If I had known, I would have come earlier",
			translation: "Se eu soubesse, teria vindo mais cedo",
		},
		{
			phrase: "Although it was raining, we went for a walk",
			translation: "Embora estivesse chovendo, fomos caminhar",
		},
	],
	"debate-openers": [
		{
			phrase: "I see your point, however, I must disagree.",
			translation: "Entendo seu ponto, contudo, devo discordar.",
		},
		{
			phrase: "From my perspective, this is not the case.",
			translation: "Da minha perspectiva, este não é o caso.",
		},
		{
			phrase: "Let me play devil's advocate for a moment.",
			translation: "Deixe-me bancar o advogado do diabo por um momento.",
		},
		{
			phrase: "There are two sides to every story.",
			translation: "Toda história tem dois lados.",
		},
		{
			phrase: "I am convinced that we can find a solution.",
			translation: "Estou convencido de que podemos encontrar uma solução.",
		},
	],
	"presentation-phrases": [
		{
			phrase: "Good morning ladies and gentlemen.",
			translation: "Bom dia senhoras e senhores.",
		},
		{
			phrase: "Today I would like to talk about our progress.",
			translation: "Hoje eu gostaria de falar sobre nosso progresso.",
		},
		{
			phrase: "Let's move on to the next slide.",
			translation: "Vamos passar para o próximo slide.",
		},
		{
			phrase: "To sum up, we have achieved our goals.",
			translation: "Para resumir, nós alcançamos nossos objetivos.",
		},
		{
			phrase: "Does anyone have any questions?",
			translation: "Alguém tem alguma pergunta?",
		},
	],
	"complex-shadowing": [
		{
			phrase: "It was the weather that caused the delay, not the traffic.",
			translation: "Foi o clima que causou o atraso, não o trânsito.",
		},
		{
			phrase: "Never have I witnessed such a display of incompetence.",
			translation: "Nunca testemunhei tamanha demonstração de incompetência.",
		},
		{
			phrase: "Had I known you were coming, I would have baked a cake.",
			translation: "Se eu soubesse que você viria, teria feito um bolo.",
		},
		{
			phrase: "By the time you read this, I will have left the country.",
			translation: "Quando você ler isso, eu já terei deixado o país.",
		},
		{
			phrase: "Not only is he intelligent, but he is also hardworking.",
			translation: "Ele não é apenas inteligente, mas também trabalhador.",
		},
	],
};
