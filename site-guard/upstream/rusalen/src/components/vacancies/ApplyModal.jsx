import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function ApplyModal({ vacancy, open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.JobApplication.create({
      vacancy_id: vacancy.id,
      vacancy_title: vacancy.title,
      ...form,
    });
    setLoading(false);
    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setForm({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {success ? 'Отклик отправлен' : `Откликнуться на вакансию`}
          </DialogTitle>
          {!success && (
            <p className="text-sm text-muted-foreground">{vacancy?.title}</p>
          )}
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ваш отклик получен. Мы свяжемся с вами в ближайшее время.
            </p>
            <Button onClick={handleClose} className="bg-primary text-primary-foreground">
              Закрыть
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Имя *</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ваше имя"
                required
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Email *</label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Телефон</label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Сопроводительное письмо</label>
              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Расскажите о себе и почему вас интересует эта позиция..."
                rows={4}
                className="bg-secondary border-border resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Отправить отклик'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}