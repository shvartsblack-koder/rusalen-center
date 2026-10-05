import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { Loader2, Ticket, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function TicketDialog({ event, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', quantity: '1' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  if (!event) return null;

  const total = (event.price || 0) * Number(form.quantity);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Укажите имя и email');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await base44.entities.TicketOrder.create({
        event_id: event.id,
        event_title: event.title,
        event_star: event.star,
        event_date: event.date,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        quantity: Number(form.quantity),
      });
      setDone(true);
    } catch (e) {
      setError('Не удалось оформить заказ. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    setDone(false);
    setError('');
    setForm({ name: '', email: '', phone: '', quantity: '1' });
    onClose();
  };

  return (
    <Dialog open={!!event} onOpenChange={(o) => !o && close()}>
      <DialogContent className="bg-card border-border max-w-md">
        {done ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">Билет оформлен</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Заявка на «{event.title}» принята. Подтверждение и детали оплаты придут на {form.email}.
            </p>
            <Button onClick={close} className="w-full">Готово</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" /> Покупка билета
              </DialogTitle>
              <DialogDescription>
                {event.star && <span className="block text-foreground font-medium">{event.star}</span>}
                {event.title} · {format(new Date(event.date), 'd MMMM yyyy', { locale: ru })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1.5">
                <Label>Имя</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Телефон</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7..." />
              </div>
              <div className="flex items-end gap-3">
                <div className="space-y-1.5 flex-1">
                  <Label>Количество</Label>
                  <Select value={form.quantity} onValueChange={(v) => setForm({ ...form, quantity: v })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-right pb-2.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Итого</p>
                  <p className="text-primary font-semibold">{total > 0 ? `${total.toLocaleString()} ₽` : 'Бесплатно'}</p>
                </div>
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button onClick={handleSubmit} disabled={submitting} className="w-full gap-2">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ticket className="w-4 h-4" />}
                {total > 0 ? `Купить за ${total.toLocaleString()} ₽` : 'Забронировать'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}