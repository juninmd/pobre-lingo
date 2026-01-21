import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { Pobrelingo } from '@/components/mascot/Pobrelingo';

interface Message {
  id: string;
  speaker: 'mascot' | 'user';
  text_en: string;
  text_pt?: string;
  audio?: boolean;
}

interface ConversationOption {
  id: string;
  text_en: string;
  text_pt: string;
  isCorrect: boolean;
  feedback?: string;
}

interface ConversationStep {
  id: string;
  mascotMessage: string;
  options: ConversationOption[];
}

// Scenarios based on modules
const SCENARIOS: Record<string, ConversationStep[]> = {
  'default': [
    {
      id: 'step1',
      mascotMessage: "Hello! My name is Pobrelingo. What is your name?",
      options: [
        { id: 'opt1', text_en: "I am fine, thanks.", text_pt: "Estou bem, obrigado.", isCorrect: false, feedback: "I asked for your name!" },
        { id: 'opt2', text_en: "My name is [Name].", text_pt: "Meu nome é [Nome].", isCorrect: true },
        { id: 'opt3', text_en: "Goodbye!", text_pt: "Tchau!", isCorrect: false, feedback: "We just started!" },
      ]
    },
    {
      id: 'step2',
      mascotMessage: "Nice to meet you! How are you today?",
      options: [
        { id: 'opt1', text_en: "I am very happy!", text_pt: "Estou muito feliz!", isCorrect: true },
        { id: 'opt2', text_en: "Yes, I am.", text_pt: "Sim, eu sou.", isCorrect: false, feedback: "That doesn't answer 'how' you are." },
        { id: 'opt3', text_en: "Blue.", text_pt: "Azul.", isCorrect: false },
      ]
    },
    {
      id: 'step3',
      mascotMessage: "That is great! Are you ready to learn English?",
      options: [
        { id: 'opt1', text_en: "No, I want to sleep.", text_pt: "Não, quero dormir.", isCorrect: false, feedback: "Come on, it will be fun!" },
        { id: 'opt2', text_en: "Yes, let's go!", text_pt: "Sim, vamos lá!", isCorrect: true },
      ]
    }
  ],
  'daily-conversations': [
    {
      id: 'c1',
      mascotMessage: "Hi there! Welcome to the coffee shop. What can I get for you?",
      options: [
        { id: 'o1', text_en: "I am a student.", text_pt: "Eu sou um estudante.", isCorrect: false, feedback: "The barista asked for your order." },
        { id: 'o2', text_en: "I would like a coffee, please.", text_pt: "Eu gostaria de um café, por favor.", isCorrect: true },
        { id: 'o3', text_en: "Where is the bathroom?", text_pt: "Onde fica o banheiro?", isCorrect: false, feedback: "Maybe order first?" },
      ]
    },
    {
      id: 'c2',
      mascotMessage: "Sure thing! Do you want milk and sugar with that?",
      options: [
        { id: 'o1', text_en: "Yes, please.", text_pt: "Sim, por favor.", isCorrect: true },
        { id: 'o2', text_en: "No, I like dogs.", text_pt: "Não, eu gosto de cachorros.", isCorrect: false, feedback: "Unrelated!" },
        { id: 'o3', text_en: "It is five dollars.", text_pt: "São cinco dólares.", isCorrect: false },
      ]
    },
    {
      id: 'c3',
      mascotMessage: "Here you go. Have a nice day!",
      options: [
        { id: 'o1', text_en: "You too, thanks!", text_pt: "Você também, obrigado!", isCorrect: true },
        { id: 'o2', text_en: "I am sorry.", text_pt: "Desculpe.", isCorrect: false },
      ]
    }
  ]
};

export default function ConversationExercise() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get('module');
  const lessonId = searchParams.get('lesson');
  const { completeLesson } = useCurriculumProgress();

  const [history, setHistory] = useState<Message[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [typing, setTyping] = useState(false);

  const steps = SCENARIOS[moduleId === 'daily-conversations' ? 'daily-conversations' : 'default'] || SCENARIOS['default'];
  const currentStep = steps[currentStepIndex];
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize first message
  useEffect(() => {
    if (history.length === 0 && currentStep) {
      setTyping(true);
      setTimeout(() => {
        setHistory([{
          id: `mascot-${currentStep.id}`,
          speaker: 'mascot',
          text_en: currentStep.mascotMessage,
          audio: true
        }]);
        setTyping(false);
        speak(currentStep.mascotMessage);
      }, 1000);
    }
  }, [currentStep, history.length]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, typing]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOptionSelect = (option: ConversationOption) => {
    // 1. Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      speaker: 'user',
      text_en: option.text_en,
      text_pt: option.text_pt
    };
    setHistory(prev => [...prev, userMsg]);

    if (option.isCorrect) {
      // 2. Correct! Move to next step or finish
      if (currentStepIndex < steps.length - 1) {
        setTyping(true);
        setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1);
          // New step will trigger useEffect to add mascot message
        }, 1000);
      } else {
        // Finished
        setTimeout(() => {
            setHistory(prev => [...prev, {
                id: 'mascot-finish',
                speaker: 'mascot',
                text_en: "Great job! You completed the conversation!",
                text_pt: "Ótimo trabalho! Você completou a conversa!"
            }]);
            setIsCompleted(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            if (moduleId && lessonId) {
                completeLesson(moduleId, lessonId, 125); // XP Reward
            }
        }, 1000);
      }
    } else {
      // 3. Incorrect. Mascot gives feedback.
      setTyping(true);
      setTimeout(() => {
        setHistory(prev => [...prev, {
            id: `mascot-feedback-${Date.now()}`,
            speaker: 'mascot',
            text_en: option.feedback || "That doesn't sound right. Try again.",
            text_pt: "Isso não soa certo. Tente novamente."
        }]);
        setTyping(false);
        speak(option.feedback || "Try again.");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold">Conversação</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-40">
        {history.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex w-full max-w-[85%] md:max-w-[70%]",
              msg.speaker === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
            )}
          >
            <div className={cn(
              "flex gap-3",
              msg.speaker === 'user' ? "flex-row-reverse" : "flex-row"
            )}>
              {/* Avatar */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
                {msg.speaker === 'mascot' ? (
                   <Pobrelingo emotion="happy" className="w-12 h-12 mt-2" />
                ) : (
                   <div className="bg-blue-500 text-white w-full h-full flex items-center justify-center font-bold">EU</div>
                )}
              </div>

              {/* Bubble */}
              <div className={cn(
                "p-4 rounded-2xl shadow-sm relative group",
                msg.speaker === 'user'
                  ? "bg-blue-500 text-white rounded-tr-sm"
                  : "bg-white dark:bg-zinc-800 border border-border rounded-tl-sm"
              )}>
                 <div className="flex items-start gap-2">
                    <p className="text-base leading-relaxed">{msg.text_en}</p>
                    {msg.speaker === 'mascot' && (
                        <button onClick={() => speak(msg.text_en)} className="opacity-50 hover:opacity-100 transition-opacity">
                            <Volume2 className="w-4 h-4" />
                        </button>
                    )}
                 </div>
                 {msg.text_pt && (
                   <p className={cn(
                     "text-xs mt-1 border-t pt-1",
                     msg.speaker === 'user' ? "text-blue-100 border-blue-400" : "text-muted-foreground border-border"
                   )}>
                     {msg.text_pt}
                   </p>
                 )}
              </div>
            </div>
          </div>
        ))}

        {typing && (
           <div className="flex w-full max-w-[85%] mr-auto justify-start animate-in fade-in slide-in-from-bottom-2">
             <div className="flex gap-3 flex-row">
               <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-white dark:border-zinc-800">
                  <Pobrelingo emotion="happy" className="w-12 h-12 mt-2" />
               </div>
               <div className="bg-white dark:bg-zinc-800 border border-border p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                 <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
               </div>
             </div>
           </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Options Area */}
      <div className="sticky bottom-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-border p-4 pb-8 shadow-lg z-20">
         {!isCompleted ? (
             <div className="max-w-3xl mx-auto grid gap-2">
                <p className="text-sm font-medium text-muted-foreground mb-2 text-center">Como você responde?</p>
                {currentStep?.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full text-left p-4 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all active:scale-[0.99] flex items-center justify-between group"
                    >
                      <div>
                        <span className="block font-semibold text-foreground group-hover:text-primary transition-colors">{option.text_en}</span>
                        <span className="block text-xs text-muted-foreground">{option.text_pt}</span>
                      </div>
                      <Send className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                    </button>
                ))}
             </div>
         ) : (
             <div className="max-w-md mx-auto">
                <Button className="w-full text-lg h-14" size="lg" onClick={() => navigate(-1)}>
                  Continuar
                </Button>
             </div>
         )}
      </div>
    </div>
  );
}
