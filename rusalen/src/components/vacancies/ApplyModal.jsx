import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { validateLeadFields } from '@/lib/formValidation';
import { submitLead } from '@/lib/submitLead';

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-destructive text-xs mt-1">{message}</p>;
}

export default function ApplyModal({ vacancy, open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) return;

    const { valid, errors: validationErrors } = validateLeadFields({
      ...form,
      phoneRequired: true,
    });
    setErrors(validationErrors);
    if (!valid) return;

    setLoading(true);
    try {
      const source = [
        window.location.pathname,
        'отклик на вакансию',
        vacancy?.title && `вакансия: ${vacancy.title}`,
        form.message?.trim() && `письмо: ${form.message.trim()}`,
      ].filter(Boolean).join(' | ');

      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        source,
        consent: true,
      });
      setSuccess(true);
    } catch (err) {
      console.error('Job application error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setForm({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    setConsent(false);
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
          <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Имя *</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ваше имя"
                className={`bg-secondary ${errors.name ? 'border-destructive' : 'border-border'}`}
              />
              <FieldError message={errors.name} />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Email *</label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`bg-secondary ${errors.email ? 'border-destructive' : 'border-border'}`}
              />
              <FieldError message={errors.email} />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Телефон *</label>
              <Input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
                className={`bg-secondary ${errors.phone ? 'border-destructive' : 'border-border'}`}
              />
              <FieldError message={errors.phone} />
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
            <label className="flex items-start gap-2 text-xs leading-snug cursor-pointer text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 shrink-0"
              />
              <span>
                Я даю согласие на обработку персональных данных в соответствии с{' '}
                <Link to="/privacy" className="text-primary underline" onClick={(e) => e.stopPropagation()}>
                  политикой конфиденциальности
                </Link>
              </span>
            </label>
            {!consent && (
              <p className="text-destructive text-xs">
                Необходимо согласие на обработку персональных данных
              </p>
            )}
            <Button
              type="submit"
              disabled={loading || !consent}
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
