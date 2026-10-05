import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  validateLeadFields,
  isValidMessage,
  VALIDATION_MESSAGES,
} from '@/lib/formValidation';
import { submitLead } from '@/lib/submitLead';

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-destructive text-xs mt-1">{message}</p>;
}

export default function ContactBlock() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [consent, setConsent] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) return;

    const leadErrors = validateLeadFields({
      name: form.name,
      email: form.email,
      phone: form.phone,
      phoneRequired: false,
    }).errors;

    const nextErrors = { ...leadErrors };
    if (!isValidMessage(form.message)) {
      nextErrors.message = VALIDATION_MESSAGES.message;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    try {
      const source = [
        window.location.pathname,
        'контактная форма',
        form.subject && `тема: ${form.subject}`,
        `сообщение: ${form.message.trim()}`,
      ].filter(Boolean).join(' | ');

      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        source,
        consent: true,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      setConsent(false);
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('idle');
    }
  };

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">Свяжитесь с нами</h2>
          <p className="text-muted-foreground">Задайте вопрос или оставьте обращение — мы ответим в течение ближайших 15 минут.</p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass rounded-2xl p-10 text-center"
          >
            <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Сообщение отправлено</h3>
            <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Имя *"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`bg-transparent border-b rounded-none focus:border-primary px-0 ${errors.name ? 'border-destructive' : 'border-border/50'}`}
                />
                <FieldError message={errors.name} />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`bg-transparent border-b rounded-none focus:border-primary px-0 ${errors.email ? 'border-destructive' : 'border-border/50'}`}
                />
                <FieldError message={errors.email} />
              </div>
              <div>
                <Input
                  placeholder="Телефон"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={`bg-transparent border-b rounded-none focus:border-primary px-0 ${errors.phone ? 'border-destructive' : 'border-border/50'}`}
                />
                <FieldError message={errors.phone} />
              </div>
              <Input
                placeholder="Тема обращения"
                value={form.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0"
              />
            </div>
            <div>
              <Textarea
                placeholder="Сообщение *"
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                rows={4}
                className={`bg-transparent border-b rounded-none focus:border-primary px-0 resize-none ${errors.message ? 'border-destructive' : 'border-border/50'}`}
              />
              <FieldError message={errors.message} />
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
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={status === 'sending' || !consent}
                className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2"
              >
                {status === 'sending' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Отправка...</>
                ) : (
                  <><Send className="w-4 h-4" /> Отправить</>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
