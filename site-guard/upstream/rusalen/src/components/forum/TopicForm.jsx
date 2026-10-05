import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';

const CATEGORIES = [
  { id: 'publication', label: 'Научные публикации' },
  { id: 'method', label: 'Методики' },
  { id: 'general', label: 'Общие обсуждения' },
];

export default function TopicForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('publication');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Заполните заголовок и текст темы');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await onSubmit({ title: title.trim(), category, content: content.trim() });
      setTitle('');
      setContent('');
      setCategory('publication');
    } catch (err) {
      setError(err.message || 'Не удалось создать тему');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
      <div className="space-y-2">
        <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Заголовок</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="О чём хотите обсудить?"
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Категория</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors ${
                category === c.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Сообщение</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Опишите тему для обсуждения..."
          rows={6}
          className="bg-background/50 resize-none"
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <Button type="submit" disabled={submitting} className="gap-2">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Создать тему
      </Button>
    </form>
  );
}