import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Star, CheckCircle2 } from 'lucide-react';

const FORMATS = ['Выступление', 'Семинар', 'Тренинг', 'Интенсив', 'Другое'];

export default function PrebookingForm() {
  const [form, setForm] = useState({ star_name: '', format: 'Выступление', city: '', name: '', email: '', phone: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.star_name.trim() || !form.email.trim()) {
      setError('Укажите имя спикера и ваш email');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await base44.entities.StarPrebooking.create({
        star_name: form.star_name.trim(),
        format: form.format,
        city: form.city.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        comment: form.comment.trim(),
      });
      setDone(true);
    } catch (err) {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
        <p className="font-display text-xl font-semibold mb-1">Заявка принята</p>
        <p className="text-sm text-muted-foreground">
          Мы изучим пред-букинг на {form.star_name || 'спикера'} и свяжемся с вами по организационным вопросам
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 sm:p-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Кого привезти *</Label>
          <Input value={form.star_name} onChange={set('star_name')} placeholder="Имя спикера" className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label>Город</Label>
          <Input value={form.city} onChange={set('city')} placeholder="Москва, онлайн..." className="bg-background/50" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Формат мероприятия</Label>
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setForm({ ...form, format: f })}
              className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors ${
                form.format === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label>Ваше имя</Label>
          <Input value={form.name} onChange={set('name')} placeholder="Имя" className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label>Email *</Label>
          <Input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label>Телефон</Label>
          <Input value={form.phone} onChange={set('phone')} placeholder="+7..." className="bg-background/50" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Комментарий</Label>
        <Textarea
          value={form.comment}
          onChange={set('comment')}
          placeholder="Почему именно этот спикер, какая тема, примерные сроки..."
          rows={3}
          className="bg-background/50 resize-none"
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <Button type="submit" disabled={submitting} className="gap-2">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
        Отправить пред-букинг
      </Button>
    </form>
  );
}