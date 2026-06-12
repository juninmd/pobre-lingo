export interface ConversationOption {
	id: string;
	text_en: string;
	text_pt: string;
	isCorrect: boolean;
	feedback?: string;
}

export interface ConversationStep {
	id: string;
	mascotMessage: string;
	options: ConversationOption[];
}

export const SCENARIOS: Record<string, ConversationStep[]> = {
	default: [
		{
			id: "step1",
			mascotMessage: "Hello! My name is Pobrelingo. What is your name?",
			options: [
				{
					id: "opt1",
					text_en: "I am fine, thanks.",
					text_pt: "Estou bem, obrigado.",
					isCorrect: false,
					feedback: "I asked for your name!",
				},
				{
					id: "opt2",
					text_en: "My name is [Name].",
					text_pt: "Meu nome é [Nome].",
					isCorrect: true,
				},
				{
					id: "opt3",
					text_en: "Goodbye!",
					text_pt: "Tchau!",
					isCorrect: false,
					feedback: "We just started!",
				},
			],
		},
		{
			id: "step2",
			mascotMessage: "Nice to meet you! How are you today?",
			options: [
				{
					id: "opt1",
					text_en: "I am very happy!",
					text_pt: "Estou muito feliz!",
					isCorrect: true,
				},
				{
					id: "opt2",
					text_en: "Yes, I am.",
					text_pt: "Sim, eu sou.",
					isCorrect: false,
					feedback: "That doesn't answer 'how' you are.",
				},
				{ id: "opt3", text_en: "Blue.", text_pt: "Azul.", isCorrect: false },
			],
		},
		{
			id: "step3",
			mascotMessage: "That is great! Are you ready to learn English?",
			options: [
				{
					id: "opt1",
					text_en: "No, I want to sleep.",
					text_pt: "Não, quero dormir.",
					isCorrect: false,
					feedback: "Come on, it will be fun!",
				},
				{
					id: "opt2",
					text_en: "Yes, let's go!",
					text_pt: "Sim, vamos lá!",
					isCorrect: true,
				},
			],
		},
	],
	"daily-conversations": [
		{
			id: "c1",
			mascotMessage:
				"Hi there! Welcome to the coffee shop. What can I get for you?",
			options: [
				{
					id: "o1",
					text_en: "I am a student.",
					text_pt: "Eu sou um estudante.",
					isCorrect: false,
					feedback: "The barista asked for your order.",
				},
				{
					id: "o2",
					text_en: "I would like a coffee, please.",
					text_pt: "Eu gostaria de um café, por favor.",
					isCorrect: true,
				},
				{
					id: "o3",
					text_en: "Where is the bathroom?",
					text_pt: "Onde fica o banheiro?",
					isCorrect: false,
					feedback: "Maybe order first?",
				},
			],
		},
		{
			id: "c2",
			mascotMessage: "Sure thing! Do you want milk and sugar with that?",
			options: [
				{
					id: "o1",
					text_en: "Yes, please.",
					text_pt: "Sim, por favor.",
					isCorrect: true,
				},
				{
					id: "o2",
					text_en: "No, I like dogs.",
					text_pt: "Não, eu gosto de cachorros.",
					isCorrect: false,
					feedback: "Unrelated!",
				},
				{
					id: "o3",
					text_en: "It is five dollars.",
					text_pt: "São cinco dólares.",
					isCorrect: false,
				},
			],
		},
		{
			id: "c3",
			mascotMessage: "Here you go. Have a nice day!",
			options: [
				{
					id: "o1",
					text_en: "You too, thanks!",
					text_pt: "Você também, obrigado!",
					isCorrect: true,
				},
				{
					id: "o2",
					text_en: "I am sorry.",
					text_pt: "Desculpe.",
					isCorrect: false,
				},
			],
		},
	],
	"airport-checkin": [
		{
			id: "a1",
			mascotMessage:
				"Good morning! Can I see your passport and ticket, please?",
			options: [
				{
					id: "ao1",
					text_en: "Here they are.",
					text_pt: "Aqui estão.",
					isCorrect: true,
				},
				{
					id: "ao2",
					text_en: "I like planes.",
					text_pt: "Eu gosto de aviões.",
					isCorrect: false,
					feedback: "Focus on the documents.",
				},
				{
					id: "ao3",
					text_en: "No, thank you.",
					text_pt: "Não, obrigado.",
					isCorrect: false,
					feedback: "You need to show them to fly!",
				},
			],
		},
		{
			id: "a2",
			mascotMessage: "Thank you. Are you checking any bags?",
			options: [
				{
					id: "ao21",
					text_en: "Yes, just this suitcase.",
					text_pt: "Sim, apenas esta mala.",
					isCorrect: true,
				},
				{
					id: "ao22",
					text_en: "I am checking the time.",
					text_pt: "Estou checando a hora.",
					isCorrect: false,
					feedback: "Checked bags go in the cargo hold.",
				},
			],
		},
		{
			id: "a3",
			mascotMessage: "Okay. Here is your boarding pass. Gate B12.",
			options: [
				{
					id: "ao31",
					text_en: "Thank you, have a nice day.",
					text_pt: "Obrigado, tenha um bom dia.",
					isCorrect: true,
				},
			],
		},
	],
	"job-interview": [
		{
			id: "j1",
			mascotMessage: "Welcome. Please, tell me a little about yourself.",
			options: [
				{
					id: "jo1",
					text_en: "I am very lazy.",
					text_pt: "Sou muito preguiçoso.",
					isCorrect: false,
					feedback: "Not a good thing to say!",
				},
				{
					id: "jo2",
					text_en: "I am a software engineer with 5 years of experience.",
					text_pt: "Sou engenheiro de software com 5 anos de experiência.",
					isCorrect: true,
				},
				{
					id: "jo3",
					text_en: "I love pizza.",
					text_pt: "Eu amo pizza.",
					isCorrect: false,
					feedback: "Relevant professional info only.",
				},
			],
		},
		{
			id: "j2",
			mascotMessage: "Impressive. Why do you want to work here?",
			options: [
				{
					id: "jo21",
					text_en: "I need money.",
					text_pt: "Preciso de dinheiro.",
					isCorrect: false,
					feedback: "Too honest. Try something about the company.",
				},
				{
					id: "jo22",
					text_en: "I admire this company's innovation.",
					text_pt: "Admiro a inovação desta empresa.",
					isCorrect: true,
				},
			],
		},
		{
			id: "j3",
			mascotMessage: "Great answer. Do you have any questions for us?",
			options: [
				{
					id: "jo31",
					text_en: "When can I start?",
					text_pt: "Quando posso começar?",
					isCorrect: true,
				},
				{
					id: "jo32",
					text_en: "Can I sleep at work?",
					text_pt: "Posso dormir no trabalho?",
					isCorrect: false,
				},
			],
		},
	],
	"ordering-food": [
		{
			id: "f1",
			mascotMessage: "Hi! Are you ready to order?",
			options: [
				{
					id: "fo1",
					text_en: "I think so. I'll have the steak.",
					text_pt: "Acho que sim. Vou querer o filé.",
					isCorrect: true,
				},
				{
					id: "fo2",
					text_en: "The menu is paper.",
					text_pt: "O menu é de papel.",
					isCorrect: false,
					feedback: "Order food, please.",
				},
			],
		},
		{
			id: "f2",
			mascotMessage: "How would you like your steak cooked?",
			options: [
				{
					id: "fo21",
					text_en: "Medium rare, please.",
					text_pt: "Ao ponto para mal, por favor.",
					isCorrect: true,
				},
				{
					id: "fo22",
					text_en: "With a fork.",
					text_pt: "Com um garfo.",
					isCorrect: false,
					feedback: "I mean the cooking temperature.",
				},
			],
		},
		{
			id: "f3",
			mascotMessage: "Excellent choice. Anything to drink?",
			options: [
				{
					id: "fo31",
					text_en: "Just water, please.",
					text_pt: "Apenas água, por favor.",
					isCorrect: true,
				},
			],
		},
	],
	"asking-directions": [
		{
			id: "d1",
			mascotMessage: "Excuse me, I am lost. Can you help me?",
			options: [
				{
					id: "do1",
					text_en: "Of course. Where do you want to go?",
					text_pt: "Claro. Onde você quer ir?",
					isCorrect: true,
				},
				{
					id: "do2",
					text_en: "No, I am busy.",
					text_pt: "Não, estou ocupado.",
					isCorrect: false,
					feedback: "Be helpful!",
				},
			],
		},
		{
			id: "d2",
			mascotMessage: "I am looking for the train station.",
			options: [
				{
					id: "do21",
					text_en: "It is two blocks straight ahead.",
					text_pt: "São dois quarteirões em frente.",
					isCorrect: true,
				},
				{
					id: "do22",
					text_en: "The train is big.",
					text_pt: "O trem é grande.",
					isCorrect: false,
					feedback: "Give directions.",
				},
			],
		},
		{
			id: "d3",
			mascotMessage: "Thank you so much!",
			options: [
				{
					id: "do31",
					text_en: "You're welcome.",
					text_pt: "De nada.",
					isCorrect: true,
				},
			],
		},
	],
	"first-date": [
		{
			id: "dt1",
			mascotMessage: "Hi! You look nice tonight.",
			options: [
				{
					id: "dto1",
					text_en: "Thank you! You look great too.",
					text_pt: "Obrigado! Você está ótimo também.",
					isCorrect: true,
				},
				{
					id: "dto2",
					text_en: "I know.",
					text_pt: "Eu sei.",
					isCorrect: false,
					feedback: "A bit arrogant!",
				},
			],
		},
		{
			id: "dt2",
			mascotMessage: "So, what do you like to do for fun?",
			options: [
				{
					id: "dto21",
					text_en: "I love reading and traveling.",
					text_pt: "Amo ler e viajar.",
					isCorrect: true,
				},
				{
					id: "dto22",
					text_en: "I hate fun.",
					text_pt: "Odeio diversão.",
					isCorrect: false,
					feedback: "Don't be a killjoy!",
				},
			],
		},
	],
	"doctor-appointment": [
		{
			id: "doc1",
			mascotMessage: "Hello. What seems to be the problem today?",
			options: [
				{
					id: "dopt1",
					text_en: "I have a terrible headache.",
					text_pt: "Estou com uma dor de cabeça terrível.",
					isCorrect: true,
				},
				{
					id: "dopt2",
					text_en: "I like hospitals.",
					text_pt: "Eu gosto de hospitais.",
					isCorrect: false,
					feedback: "Tell me your symptoms.",
				},
				{
					id: "dopt3",
					text_en: "My car is broken.",
					text_pt: "Meu carro está quebrado.",
					isCorrect: false,
					feedback: "I am a doctor, not a mechanic!",
				},
			],
		},
		{
			id: "doc2",
			mascotMessage: "I see. How long have you had this pain?",
			options: [
				{
					id: "dopt21",
					text_en: "Since yesterday morning.",
					text_pt: "Desde ontem de manhã.",
					isCorrect: true,
				},
				{
					id: "dopt22",
					text_en: "For 100 years.",
					text_pt: "Por 100 anos.",
					isCorrect: false,
					feedback: "That's impossible.",
				},
			],
		},
		{
			id: "doc3",
			mascotMessage: "Okay. Take this medicine twice a day.",
			options: [
				{
					id: "dopt31",
					text_en: "Thank you, doctor.",
					text_pt: "Obrigado, doutor.",
					isCorrect: true,
				},
			],
		},
	],
	"shopping-clothes": [
		{
			id: "shop1",
			mascotMessage: "Hi! Can I help you find anything?",
			options: [
				{
					id: "sopt1",
					text_en: "I am looking for a pair of jeans.",
					text_pt: "Estou procurando um par de jeans.",
					isCorrect: true,
				},
				{
					id: "sopt2",
					text_en: "I want a hamburger.",
					text_pt: "Quero um hambúrguer.",
					isCorrect: false,
					feedback: "This is a clothing store.",
				},
			],
		},
		{
			id: "shop2",
			mascotMessage: "Sure. What size do you wear?",
			options: [
				{
					id: "sopt21",
					text_en: "I'm a medium.",
					text_pt: "Sou tamanho médio.",
					isCorrect: true,
				},
				{
					id: "sopt22",
					text_en: "I am very tall.",
					text_pt: "Sou muito alto.",
					isCorrect: false,
					feedback: "I need a specific size like Small, Medium, or Large.",
				},
			],
		},
		{
			id: "shop3",
			mascotMessage: "Here you go. The fitting room is over there.",
			options: [
				{
					id: "sopt31",
					text_en: "Thanks, I'll try them on.",
					text_pt: "Obrigado, vou provar.",
					isCorrect: true,
				},
			],
		},
	],
	"business-negotiation": [
		{
			id: "biz1",
			mascotMessage:
				"We are interested in your product, but the price is too high.",
			options: [
				{
					id: "bopt1",
					text_en: "We can offer a 10% discount for bulk orders.",
					text_pt: "Podemos oferecer 10% de desconto para pedidos grandes.",
					isCorrect: true,
				},
				{
					id: "bopt2",
					text_en: "It is not high, you are poor.",
					text_pt: "Não é alto, você é pobre.",
					isCorrect: false,
					feedback: "That is extremely rude!",
				},
				{
					id: "bopt3",
					text_en: "Take it or leave it.",
					text_pt: "É pegar ou largar.",
					isCorrect: false,
					feedback: "Try to be more diplomatic.",
				},
			],
		},
		{
			id: "biz2",
			mascotMessage: "That sounds reasonable. What about the delivery time?",
			options: [
				{
					id: "bopt21",
					text_en: "We can deliver within 3 business days.",
					text_pt: "Podemos entregar em 3 dias úteis.",
					isCorrect: true,
				},
				{
					id: "bopt22",
					text_en: "Maybe next year.",
					text_pt: "Talvez ano que vem.",
					isCorrect: false,
					feedback: "Too slow.",
				},
			],
		},
		{
			id: "biz3",
			mascotMessage: "Excellent. I think we have a deal.",
			options: [
				{
					id: "bopt31",
					text_en: "Great! I'll send the contract.",
					text_pt: "Ótimo! Enviarei o contrato.",
					isCorrect: true,
				},
			],
		},
	],
	"debate-tech": [
		{
			id: "tech1",
			mascotMessage:
				"Do you believe Artificial Intelligence is dangerous for humanity?",
			options: [
				{
					id: "topt1",
					text_en: "It depends on how we regulate it.",
					text_pt: "Depende de como a regulamentamos.",
					isCorrect: true,
				},
				{
					id: "topt2",
					text_en: "Yes, robots will eat us.",
					text_pt: "Sim, robôs vão nos comer.",
					isCorrect: false,
					feedback: "A bit too dramatic, don't you think?",
				},
				{
					id: "topt3",
					text_en: "Computers are stupid.",
					text_pt: "Computadores são estúpidos.",
					isCorrect: false,
					feedback: "That's a weak argument.",
				},
			],
		},
		{
			id: "tech2",
			mascotMessage: "But what if it becomes smarter than us?",
			options: [
				{
					id: "topt21",
					text_en: "We must ensure it aligns with human values.",
					text_pt: "Devemos garantir que se alinhe aos valores humanos.",
					isCorrect: true,
				},
				{
					id: "topt22",
					text_en: "I will unplug it.",
					text_pt: "Eu vou tirar da tomada.",
					isCorrect: false,
					feedback: "It might be too late by then.",
				},
			],
		},
	],
};
