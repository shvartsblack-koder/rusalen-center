import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Award, CreditCard, Building, Briefcase, Home, Users, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const topics = [
  { icon: Award, title: 'Льготы и привилегии', desc: 'Транспортные, коммунальные, медицинские льготы для ветеранов', color: 'bg-amber-500/10 text-amber-700' },
  { icon: CreditCard, title: 'Выплаты и пособия', desc: 'Единовременные выплаты, ежемесячные пособия, компенсации', color: 'bg-emerald-500/10 text-emerald-700' },
  { icon: Building, title: 'Инвалидность', desc: 'Оформление, перечень льгот, реабилитация', color: 'bg-blue-500/10 text-blue-700' },
  { icon: Briefcase, title: 'Трудовые права', desc: 'Защита прав при трудоустройстве, увольнении', color: 'bg-purple-500/10 text-purple-700' },
  { icon: Home, title: 'Жильё', desc: 'Жилищные субсидии, программы улучшения условий', color: 'bg-rose-500/10 text-rose-700' },
  { icon: Users, title: 'Социальная поддержка', desc: 'Программы реабилитации, социальные услуги', color: 'bg-teal-500/10 text-teal-700' },
];

const faqs = [
  { q: 'Какие льготы положены ветерану боевых действий?', a: 'Ветераны боевых действий имеют право на льготы по транспортному налогу, ЖКХ, медицинскому обслуживанию, пенсионным надбавкам и приоритетное право при получении жилья.' },
  { q: 'Как получить статус ветерана боевых действий?', a: 'Необходимо обратиться в военный комиссариат по месту регистрации с документами, подтверждающими участие в боевых действиях. Перечень документов уточняйте индивидуально.' },
  { q: 'Какие выплаты положены при ранении?', a: 'При ранении положена единовременная выплата согласно степени вреда здоровью. Точные суммы устанавливаются действующим законодательством.' },
];

export default function Legal() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [expanded, setExpanded] = useState(null);

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Ты — юридический консультант по правам ветеранов России. Отвечай чётко, профессионально, со ссылками на законодательство. Вопрос: ${question}`,
    });
    setAnswer(res);
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">Юридическая помощь</h1>
        <p className="text-muted-foreground">Льготы, выплаты, права ветеранов боевых действий</p>
      </div>

      {/* AI Consultant */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Юридический консультант</h3>
            <p className="text-xs text-muted-foreground">Задайте вопрос о ваших правах и льготах</p>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <input value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => e.key === 'Enter' && askAI()}
            placeholder="Например: какие льготы положены ветерану 1-й группы инвалидности?"
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <Button onClick={askAI} disabled={loading || !question.trim()} className="rounded-xl shrink-0">
            {loading ? '...' : <MessageCircle className="w-4 h-4" />}
          </Button>
        </div>
        {answer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border p-4 text-sm text-foreground leading-relaxed">
            {answer}
          </motion.div>
        )}
      </motion.div>

      {/* Topics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {topics.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl ${t.color.split(' ')[0]} flex items-center justify-center mb-3`}>
              <t.icon className={`w-5 h-5 ${t.color.split(' ')[1]}`} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{t.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Подробнее <ChevronRight className="w-3 h-3" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="font-display font-bold text-foreground text-lg mb-4">Часто задаваемые вопросы</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <button onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors">
                <span className="font-medium text-sm text-foreground">{f.q}</span>
                <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 ml-2 transition-transform ${expanded === i ? 'rotate-90' : ''}`} />
              </button>
              {expanded === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}