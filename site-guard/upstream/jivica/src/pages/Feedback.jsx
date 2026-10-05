import React, { useState } from 'react';
import { MessageSquare, Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';

export default function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.integrations.Core.SendEmail({
      to: 'feedback@yadoma.ru',
      subject: `Обратная связь от ${name || 'пользователя'}`,
      body: `Имя: ${name}\nEmail: ${email}\n\nСообщение:\n${message}`,
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Обратная связь</h1>
          <p className="text-muted-foreground text-sm">Ваше мнение помогает нам становиться лучше</p>
        </div>
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl p-6">
        {sent ? (
          <div className="flex flex-col items-center py-12 text-center">
            <CheckCircle className="w-14 h-14 text-emerald-500 mb-4" />
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">Спасибо!</h2>
            <p className="text-muted-foreground">Ваше сообщение отправлено. Мы обязательно его рассмотрим.</p>
            <Button variant="outline" className="mt-6 rounded-xl" onClick={() => { setSent(false); setName(''); setEmail(''); setMessage(''); }}>
              Отправить ещё
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Ждём вашей обратной связи и предложений по улучшению сервиса. Расскажите, что работает хорошо, а что можно улучшить — каждое сообщение важно для нас.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input id="name" placeholder="Иван Иванов" value={name} onChange={e => setName(e.target.value)} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email для ответа</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Сообщение <span className="text-destructive">*</span></Label>
                <Textarea
                  id="message"
                  placeholder="Опишите ваши предложения или замечания..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="rounded-xl min-h-[160px] resize-none"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl font-semibold" disabled={loading || !message.trim()}>
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Отправка...</>
                ) : (
                  <><Send className="w-4 h-4 mr-2" />Отправить</>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}