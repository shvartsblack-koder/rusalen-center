import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brain, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function FreudAssistant() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Ты — нейронный ассистент проекта РУСАЛЕН, вдохновлённый классиками психологии (Фрейд, Юнг, Адлер, Перлз, Роджерс). 
Отвечай на вопросы пользователя о психологии, психосоматике, сознании. Будь профессиональным, глубоким, но доступным. 
Используй терминологию, но объясняй простым языком. Отвечай по-русски.

Вопрос пользователя: ${question}`,
    });
    setAnswer(result);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Нейронный ассистент</h4>
            <p className="text-xs text-muted-foreground">Задайте ваш вопрос</p>
          </div>
        </div>

        <form onSubmit={handleAsk} className="flex gap-2 mb-6">
          <Input
            placeholder="Например: Что такое коллективное бессознательное?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-secondary border-border flex-1"
          />
          <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/80 shrink-0">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>

        {answer && (
          <div className="glass-light rounded-xl p-4 mb-4">
            <ReactMarkdown className="text-sm prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              {answer}
            </ReactMarkdown>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-accent text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Обработка запроса...</span>
          </div>
        )}

        <p className="text-[10px] font-mono text-muted-foreground/50 mt-4">
          Ответ носит информационный характер и не заменяет консультацию специалиста.
        </p>
      </div>
    </div>
  );
}