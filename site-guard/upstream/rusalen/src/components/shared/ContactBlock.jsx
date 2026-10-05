import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactBlock() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await base44.entities.ContactRequest.create(form);
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
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
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Имя *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0"
              />
              <Input
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0"
              />
              <Input
                placeholder="Телефон"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0"
              />
              <Input
                placeholder="Тема обращения"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0"
              />
            </div>
            <Textarea
              placeholder="Сообщение *"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={4}
              className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0 resize-none"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={status === 'sending'}
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