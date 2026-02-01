import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { Pobrelingo } from '@/components/mascot/Pobrelingo';
import { SCENARIOS, ConversationOption } from '@/lib/conversationData';
import { tts } from '@/lib/tts';

interface Message {
  id: string;
  speaker: 'mascot' | 'user';
  text_en: string;
  text_pt?: string;
  audio?: boolean;
}

// Map modules/lessons to scenarios
const SCENARIO_MAP: Record<string, string> = {
  'daily-conversations': 'daily-conversations',
  'airport-checkin-sim': 'airport-checkin',
  'job-interview-sim': 'job-interview',
  'job-interview-sim-mid': 'job-interview',
  'ordering-food-sim': 'ordering-food',
  'conversation-practice': 'daily-conversations',
  'doctor-appointment': 'doctor-appointment',
  'shopping-clothes': 'shopping-clothes',
  'business-negotiation': 'business-negotiation',
  'debate-tech': 'debate-tech',
  'dating-scenario': 'dating-scenario'
};

export default function ConversationExercise() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get('module') || '';
  const lessonId = searchParams.get('lesson') || '';
  const { completeLesson } = useCurriculumProgress();

  const [history, setHistory] = useState<Message[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [typing, setTyping] = useState(false);

  // Determine scenario
  const scenarioKey = SCENARIO_MAP[lessonId] || SCENARIO_MAP[moduleId] || 'default';
  const steps = SCENARIOS[scenarioKey] || SCENARIOS['default'];
  const currentStep = steps[currentStepIndex];
  const chatEndRef = useRef<HTMLDivElement>(null);

  const speak = (text: string) => {
    tts.speak(text);
  };

  // Initialize first message
  // Handle mascot messages for current step
  useEffect(() => {
    // Check if we have a valid step and if the last message wasn't already this step's mascot message
    // This prevents duplicate messages but allows flow to continue
    if (currentStep) {
      const lastMsg = history[history.length - 1];
      const isMascotTurn = !lastMsg || lastMsg.speaker === 'user';

      if (isMascotTurn) {
        setTyping(true);
        const timer = setTimeout(() => {
          setHistory(prev => {
            // Double check to prevent race conditions
            const last = prev[prev.length - 1];
            if (last && last.id === `mascot-${currentStep.id}`) return prev;

            return [...prev, {
              id: `mascot-${currentStep.id}`,
              speaker: 'mascot',
              text_en: currentStep.mascotMessage,
              audio: true
            }];
          });
          setTyping(false);
          speak(currentStep.mascotMessage);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentStep, history.length]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, typing]);

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
      <header className="sticky top-0 z-10 glass border-b border-border p-4 flex items-center justify-between">
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
      <div className="sticky bottom-0 glass border-t border-border p-4 pb-8 shadow-lg z-20">
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
