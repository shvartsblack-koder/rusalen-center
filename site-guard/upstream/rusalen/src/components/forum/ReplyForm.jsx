import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Reply } from 'lucide-react';

export default function ReplyForm({ onSubmit, disabled }) {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Введите текст ответа');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await onSubmit(content.trim());
      setContent('');
    } catch (err) {
      setError(err.message || 'Не удалось отправить ответ');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-5 space-y-3">
      <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Ваш ответ
      </Label>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Поделитесь своим мнением..."
        rows={4}
        className="bg-background/50 resize-none"
        disabled={disabled}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <Button type="submit" disabled={submitting || disabled} className="gap-2">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Reply className="w-4 h-4" />}
        Ответить
      </Button>
    </form>
  );
}