import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../../components/shared/PageHero';
import SectionHeader from '../../components/shared/SectionHeader';
import GlassCard from '../../components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Rocket, CheckCircle, Users, Star, Lightbulb, TrendingUp, ArrowLeft } from 'lucide-react';

const stages = [
  { num: '01', title: 'Отбор', desc: 'Заявки проходят экспертную оценку по критериям инновационности и рыночного потенциала' },
  { num: '02', title: 'Акселерация', desc: '3-месячная интенсивная программа с менторами и трекерами' },
  { num: '03', title: 'Demo Day', desc: 'Презентация продукта перед инвесторами и партнёрами экосистемы РУСАЛЕН' },
  { num: '04', title: 'Масштабирование', desc: 'Поддержка выхода на рынок и привлечения раундового финансирования' },
];

const benefits = [
  { icon: TrendingUp, label: 'Финансирование', desc: 'Гранты и инвестиции от 500 тыс. до 5 млн рублей' },
  { icon: Users, label: 'Менторство', desc: 'Доступ к сети из 50+ менторов — экспертов в психологии, технологиях и бизнесе' },
  { icon: Lightbulb, label: 'Инфраструктура', desc: 'Коворкинг, лаборатории, юридическое и бухгалтерское сопровождение' },
  { icon: Star, label: 'Нетворкинг', desc: 'Участие в международных конференциях и форумах экосистемы РУСАЛЕН' },
];

export default function Accelerator() {
  return (
    <div>
      <PageHero
        label="PsyTech · Акселератор"
        title="Акселератор Русален"
        description="Программа поддержки стартапов и цифровых продуктов на стыке психологии, образования и искусственного интеллекта"
      />

      <section className="py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/psytech" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Назад к PsyTech
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">О программе</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Ваш стартап — следующий прорыв в психологии</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Акселератор РУСАЛЕН отбирает и поддерживает инновационные проекты, которые меняют подходы к психологической помощи, обучению и исследованиям.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Мы работаем со стартапами на ранних стадиях, цифровыми продуктами и исследовательскими командами, предоставляя им ресурсы, менторство и доступ к уникальной экспертизе.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <GlassCard key={i} delay={i * 0.1} className="text-center">
                  <b.icon className="w-7 h-7 text-accent mx-auto mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{b.label}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Программа" title="Этапы акселерации" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((s, i) => (
              <GlassCard key={i} delay={i * 0.1} className="text-center">
                <span className="text-gold-gradient font-display text-4xl font-bold block mb-3">{s.num}</span>
                <h4 className="font-semibold mb-2">{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4">Готовы подать заявку?</h2>
          <p className="text-muted-foreground mb-8">Набор в следующий поток открыт. Оставьте заявку, и наш менеджер свяжется с вами.</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80 px-8">
            <Link to="/contacts">Подать заявку</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}