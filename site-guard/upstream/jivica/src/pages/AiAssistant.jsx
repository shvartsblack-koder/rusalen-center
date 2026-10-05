import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

const SYSTEM_PROMPT = `Ты — AI-ассистент платформы «Я Дома», специализирующийся на психологической поддержке ветеранов боевых действий и людей с ПТСР. 
Ты говоришь мягко, с теплотой и профессионализмом. Твоя задача — выслушать, поддержать, оказать первичную психологическую помощь и, при необходимости, направить к специалисту.
Никогда не ставь диагнозы. При признаках острого кризиса — рекомендуй немедленно нажать кнопку "Паника" или позвонить 112.
Отвечай на русском языке.`;

const crisisKeywords = ['суицид', 'убить себя', 'не хочу жить', 'умереть', 'конец', 'паника', 'не могу', 'помогите'];

function detectCrisis(text) {
  return crisisKeywords.some(kw => text.toLowerCase().includes(kw));
}

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Здравствуйте. Я AI-ассистент платформы «Я Дома». Я здесь, чтобы выслушать вас и помочь. Как вы себя чувствуете сегодня?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [crisisAlert, setCrisisAlert] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');

    if (detectCrisis(userMsg)) setCrisisAlert(true);

    const updatedMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(updatedMessages);
    setLoading(true);

    const conversationHistory = updatedMessages
      .map(m => `${m.role === 'user' ? 'Пользователь' : 'Ассистент'}: ${m.content}`)
      .join('\n');

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${SYSTEM_PROMPT}\n\nИстория диалога:\n${conversationHistory}\n\nОтвет ассистента:`,
    });

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] lg:h-screen max-w-3xl mx-auto">
      {/* Header */}
      <div className="shrink-0 p-4 sm:p-6 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground">AI Ассистент</h1>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Онлайн 24/7
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Alert */}
      <AnimatePresence>
        {crisisAlert && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="shrink-0 mx-4 mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Обнаружены признаки кризисного состояния</p>
              <p className="text-xs text-red-700 mt-0.5">Если вам нужна срочная помощь — нажмите кнопку экстренного вызова или позвоните 112.</p>
            </div>
            <button onClick={() => setCrisisAlert(false)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mr-2 shrink-0 mt-1">
                <Brain className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-sm'
                : 'bg-card border border-border text-foreground rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mr-2 shrink-0">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 p-4 sm:p-6 border-t border-border bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Напишите сообщение..."
            className="rounded-xl flex-1"
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={!input.trim() || loading} className="rounded-xl px-4 shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          AI-ассистент не заменяет профессиональную психологическую помощь
        </p>
      </div>
    </div>
  );
}