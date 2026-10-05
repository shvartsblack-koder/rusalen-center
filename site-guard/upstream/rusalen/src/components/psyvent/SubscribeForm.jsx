import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Bell, CheckCircle2 } from 'lucide-react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    try {
      await base44.entities.PsyventSubscriber.create({ email: email.trim() });
      setStatus('done');
      setEmail('');
    } catch (err) {
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
        <p className="font-display text-xl font-semibold mb-1">Вы подписаны</p>
        <p className="text-sm text-muted-foreground">
          Первым узнаете об анонсах выступлений, семинаров и интенсивов PSYVENT
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 sm:p-8">
      <p className="text-sm text-muted-foreground mb-4 max-w-xl">
        Анонсы новых событий, предзаказы и специальные условия — раньше всех.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
          className="bg-background/50 flex-1 h-11"
        />
        <Button type="submit" disabled={status === 'sending'} className="gap-2 h-11 px-6">
          {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
          Подписаться
        </Button>
      </div>
    </form>
  );
}