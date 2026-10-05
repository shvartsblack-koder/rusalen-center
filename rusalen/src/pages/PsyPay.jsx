import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateLeadFields } from '@/lib/formValidation';
import { submitLead } from '@/lib/submitLead';
import { motion } from 'framer-motion';
import PageHero from '../components/shared/PageHero';
import SectionHeader from '../components/shared/SectionHeader';
import GlassCard from '../components/shared/GlassCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  CreditCard, Banknote, Bitcoin, Smartphone, DollarSign,
  Globe, ArrowRightLeft, ShieldCheck, Headphones,
  ClipboardCheck, UserCheck, Key, Send, Loader2, CheckCircle
} from 'lucide-react';

const paymentMethods = [
  { icon: Banknote, label: 'Банковские переводы', desc: 'Стандартные банковские переводы SWIFT/SEPA' },
  { icon: CreditCard, label: 'Карты', desc: 'Платежи кредитными и дебетовыми картами' },
  { icon: Bitcoin, label: 'Криптовалюта', desc: 'Криптовалютные переводы и обмен' },
  { icon: Smartphone, label: 'Мобильные платежи', desc: 'Мобильные платёжные системы' },
  { icon: DollarSign, label: 'Наличные', desc: 'Приём и выдача наличных' },
];

const features = [
  { icon: Globe, label: 'Международные перечисления' },
  { icon: ArrowRightLeft, label: 'Переводы на карты' },
  { icon: Bitcoin, label: 'Покупка криптовалюты' },
  { icon: DollarSign, label: 'Получение наличных' },
];

const advantages = [
  { icon: DollarSign, label: 'Лояльные комиссии' },
  { icon: ClipboardCheck, label: 'Упрощённое открытие счёта' },
  { icon: ArrowRightLeft, label: 'Без лимитов на транзакции' },
  { icon: Headphones, label: 'Оперативная поддержка' },
];

const steps = [
  { icon: ClipboardCheck, num: '01', title: 'Подайте заявку', desc: 'Подайте заявку на открытие счёта в системе PsyPay' },
  { icon: UserCheck, num: '02', title: 'Верификация', desc: 'Пройдите процедуру верификации' },
  { icon: Key, num: '03', title: 'Доступ', desc: 'Получите доступ к счёту и платёжные реквизиты' },
];

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-destructive text-xs mt-1">{message}</p>;
}

export default function PsyPay() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', activity_type: '', expected_turnover: '', comment: '' });
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

    const { valid, errors: validationErrors } = validateLeadFields({
      name: form.name,
      email: form.email,
      phone: form.phone,
      phoneRequired: false,
    });
    setErrors(validationErrors);
    if (!valid) return;

    setStatus('sending');
    try {
      const source = [
        window.location.pathname,
        'PsyPay — открытие счёта',
        form.country && `страна: ${form.country}`,
        form.activity_type && `деятельность: ${form.activity_type}`,
        form.expected_turnover && `оборот: ${form.expected_turnover}`,
        form.comment?.trim() && `комментарий: ${form.comment.trim()}`,
      ].filter(Boolean).join(' | ');

      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        source,
        consent: true,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', country: '', activity_type: '', expected_turnover: '', comment: '' });
      setErrors({});
      setConsent(false);
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('PsyPay form error:', err);
      setStatus('idle');
    }
  };

  return (
    <div>
      <PageHero
        label="PsyPay"
        title="Финансовые сервисы для психологов"
        description="Первая специализированная платформа финансовых сервисов для психологов, консультантов, преподавателей и онлайн-специалистов"
      />

      {/* Currency banner */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-muted-foreground text-lg"
          >
            Платёжные решения PsyPay позволяют получать и отправлять платежи по всему миру в{' '}
            <span className="text-gold-gradient font-display font-bold text-2xl">27 видах валют</span>
          </motion.p>
        </div>
      </section>

      {/* Payment methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Формы получения платежей" title="Принимайте платежи удобным способом" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {paymentMethods.map((m, i) => (
              <GlassCard key={i} delay={i * 0.08} className="text-center">
                <m.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-sm mb-1">{m.label}</h4>
                <p className="text-[10px] text-muted-foreground">{m.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Advantages */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">Возможности</h3>
              <div className="space-y-3">
                {features.map((f, i) => (
                  <GlassCard key={i} delay={i * 0.1} className="flex items-center gap-4 !p-4">
                    <f.icon className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm">{f.label}</span>
                  </GlassCard>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">Преимущества</h3>
              <div className="space-y-3">
                {advantages.map((a, i) => (
                  <GlassCard key={i} delay={i * 0.1} className="flex items-center gap-4 !p-4">
                    <a.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{a.label}</span>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Как начать" title="Три шага к PsyPay" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <GlassCard key={i} delay={i * 0.15} className="text-center relative">
                <span className="text-gold-gradient font-display text-4xl font-bold block mb-4">{s.num}</span>
                <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{s.title}</h4>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="open-account-form" className="py-20 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Заявка" title="Открыть счёт" description="Заполните форму, и мы свяжемся с вами для прохождения верификации" />
          
          {status === 'success' ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass rounded-2xl p-10 text-center">
              <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Заявка отправлена</h3>
              <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input placeholder="Имя *" value={form.name} onChange={(e) => updateField('name', e.target.value)} className={`bg-transparent border-b rounded-none focus:border-primary px-0 ${errors.name ? 'border-destructive' : 'border-border/50'}`} />
                  <FieldError message={errors.name} />
                </div>
                <div>
                  <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => updateField('email', e.target.value)} className={`bg-transparent border-b rounded-none focus:border-primary px-0 ${errors.email ? 'border-destructive' : 'border-border/50'}`} />
                  <FieldError message={errors.email} />
                </div>
                <div>
                  <Input type="tel" placeholder="Телефон" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className={`bg-transparent border-b rounded-none focus:border-primary px-0 ${errors.phone ? 'border-destructive' : 'border-border/50'}`} />
                  <FieldError message={errors.phone} />
                </div>
                <Input placeholder="Страна" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0" />
                <Input placeholder="Вид деятельности" value={form.activity_type} onChange={(e) => setForm({ ...form, activity_type: e.target.value })} className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0" />
                <Input placeholder="Ожидаемый оборот" value={form.expected_turnover} onChange={(e) => setForm({ ...form, expected_turnover: e.target.value })} className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0" />
              </div>
              <Textarea placeholder="Комментарий" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={3} className="bg-transparent border-b border-border/50 rounded-none focus:border-primary px-0 resize-none" />
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
                <Button type="submit" disabled={status === 'sending' || !consent} className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2">
                  {status === 'sending' ? <><Loader2 className="w-4 h-4 animate-spin" /> Отправка...</> : <><Send className="w-4 h-4" /> Отправить заявку</>}
                </Button>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground/50">
                Доступность отдельных платёжных инструментов зависит от юрисдикции, комплаенс-проверки и требований партнёрских финансовых организаций.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}